'use client';
import { useCallback, useEffect, useState } from 'react';
import { upload } from '@vercel/blob/client';

type Sender = { name: string; status: 'pending' | 'approved' };
type Msg = { id: number; kind: string; media_url: string | null; text: string | null; status: string; played_at: string | null; created_at: string };
type Kind = 'photo' | 'video' | 'text';

const MAX_VIDEO_SECONDS = 90;
const MAX_PHOTOS = 10;

async function shrinkPhoto(file: File): Promise<Blob> {
  if (file.type === 'image/gif') return file;
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((ok, fail) => {
      const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = url;
    });
    const scale = Math.min(1, 1920 / Math.max(img.naturalWidth, img.naturalHeight));
    if (scale === 1 && file.size < 1_500_000 && file.type === 'image/jpeg') return file;
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);
    c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
    return await new Promise((ok) => c.toBlob((b) => ok(b || file), 'image/jpeg', 0.85));
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function videoSeconds(file: File) {
  return new Promise<number>((ok) => {
    const v = document.createElement('video');
    v.preload = 'metadata';
    v.onloadedmetadata = () => { ok(v.duration || 0); URL.revokeObjectURL(v.src); };
    v.onerror = () => ok(0);
    v.src = URL.createObjectURL(file);
  });
}

function when(iso: string) {
  return new Intl.DateTimeFormat('en-NZ', { weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(iso));
}

export function SendApp({ slug, resident, code, initialSender }: {
  slug: string; resident: string; code: string; initialSender: Sender | null;
}) {
  const api = `/api/screens/${slug}`;
  const msgs = `${api}/messages`;
  const [sender, setSender] = useState<Sender | null>(initialSender);
  const [name, setName] = useState('');
  const [kind, setKind] = useState<Kind>('photo');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [history, setHistory] = useState<Msg[]>([]);

  const refresh = useCallback(async () => {
    const r = await fetch(msgs, { cache: 'no-store' }).then((r) => r.json()).catch(() => null);
    if (r?.sender) setSender(r.sender);
    if (r?.messages) setHistory(r.messages);
  }, [msgs]);

  useEffect(() => { if (sender) { refresh(); const t = setInterval(refresh, 30000); return () => clearInterval(t); } }, [sender?.name]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { try { const n = localStorage.getItem('fs_name'); if (n) setName(n); } catch {} }, []);
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  async function join(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setNote(null);
    const r = await fetch(msgs, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'join', code, name }) });
    const body = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) { setNote({ ok: false, text: body.error || 'That didn’t work. Please try again.' }); return; }
    try { localStorage.setItem('fs_name', name); } catch {}
    setSender(body.sender);
  }

  async function pick(list: FileList | null) {
    setNote(null);
    const chosen = Array.from(list || []);
    if (kind === 'photo') {
      if (chosen.length > MAX_PHOTOS) setNote({ ok: false, text: `Up to ${MAX_PHOTOS} photos at a time. We’ve kept the first ${MAX_PHOTOS}.` });
      setFiles(chosen.slice(0, MAX_PHOTOS));
    } else if (chosen[0]) {
      const secs = await videoSeconds(chosen[0]);
      if (secs > MAX_VIDEO_SECONDS + 1) {
        setNote({ ok: false, text: `That video is ${Math.round(secs)} seconds. Please trim it to ${MAX_VIDEO_SECONDS} seconds or less.` });
        setFiles([]);
        return;
      }
      setFiles([chosen[0]]);
    }
  }

  async function post(payload: Record<string, unknown>) {
    const r = await fetch(msgs, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(body.error || 'Sending failed.');
    return body;
  }

  async function send() {
    setBusy(true); setNote(null); setProgress(0);
    try {
      if (kind === 'text') {
        await post({ kind: 'text', text });
      } else {
        const total = files.length;
        for (let i = 0; i < total; i++) {
          const f = files[i];
          const blob = kind === 'photo' ? await shrinkPhoto(f) : f;
          const ext = kind === 'photo' ? (blob.type === 'image/gif' ? 'gif' : blob.type === 'image/png' ? 'png' : 'jpg') : (f.name.split('.').pop() || 'mp4').toLowerCase();
          const res = await upload(`fs/${slug}/${Date.now()}-${i}.${ext}`, blob, {
            access: 'public',
            handleUploadUrl: `${api}/upload`,
            multipart: blob.size > 8_000_000,
            onUploadProgress: (p) => setProgress(Math.round(((i + p.percentage / 100) / total) * 100)),
          });
          await post({ kind, media_url: res.url, bytes: blob.size, text: i === 0 ? text : '' });
        }
      }
      const pending = sender?.status !== 'approved';
      setNote({
        ok: true,
        text: pending
          ? `Sent. It will play on ${resident}’s TV once the family admin approves you.`
          : `Sent. It will play on ${resident}’s TV in the next minute or so.`,
      });
      setFiles([]); setText(''); setProgress(0);
      refresh();
    } catch (e) {
      setNote({ ok: false, text: e instanceof Error ? e.message : 'Sending failed. Please try again.' });
    } finally {
      setBusy(false);
    }
  }

  if (!sender) {
    return (
      <form onSubmit={join}>
        <h2 style={{ fontSize: 26 }}>First, your name</h2>
        <p className="muted">{resident} will see it on the TV with everything you send.</p>
        <label className="field">Your name
          <span className="help">For example “Sarah (granddaughter)” or “Tom in Perth”.</span>
          <input type="text" required minLength={2} maxLength={40} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        {note && <div className={`notice ${note.ok ? 'ok' : 'bad'}`} role="alert">{note.text}</div>}
        <button className="btn block" disabled={busy}>{busy ? 'Saving…' : 'Continue'}</button>
      </form>
    );
  }

  const canSend = !busy && (kind === 'text' ? text.trim().length > 0 : files.length > 0);

  return (
    <>
      {sender.status === 'pending' && (
        <div className="notice ok">
          Hi {sender.name}. The family admin needs to approve you once. You can send now, and it will play as soon as they do.
        </div>
      )}
      <div className="kinds" role="group" aria-label="What to send">
        {([['photo', 'Photos', '🖼️'], ['video', 'Video', '🎬'], ['text', 'Message', '💬']] as const).map(([k, label, ico]) => (
          <button key={k} type="button" className="kind" aria-pressed={kind === k} onClick={() => { setKind(k); setFiles([]); setNote(null); }}>
            <span className="ico" aria-hidden="true">{ico}</span>{label}
          </button>
        ))}
      </div>

      {kind !== 'text' && (
        <>
          <label className="picker">
            {files.length ? (kind === 'photo' ? `${files.length} photo${files.length > 1 ? 's' : ''} chosen. Tap to change.` : 'Video chosen. Tap to change.')
              : kind === 'photo' ? 'Tap to choose photos' : `Tap to choose a video (up to ${MAX_VIDEO_SECONDS} seconds)`}
            <input type="file" accept={kind === 'photo' ? 'image/*' : 'video/*'} multiple={kind === 'photo'} onChange={(e) => pick(e.target.files)} />
          </label>
          {previews.length > 0 && (
            <div className="thumbs">
              {previews.map((u, i) => kind === 'photo' ? <img key={u} src={u} alt={`Chosen photo ${i + 1}`} /> : <video key={u} src={u} muted playsInline />)}
            </div>
          )}
        </>
      )}

      <label className="field">
        {kind === 'text' ? 'Your message' : 'Add a few words (optional)'}
        <textarea maxLength={200} value={text} onChange={(e) => setText(e.target.value)}
          placeholder={kind === 'text' ? `Hi ${resident}, …` : 'e.g. Ruby’s first day at school!'} style={kind === 'text' ? undefined : { minHeight: 80 }} />
        <span className="help">{200 - text.length} characters left</span>
      </label>

      {busy && kind !== 'text' && <div className="progress" aria-label="Upload progress"><i style={{ width: `${progress}%` }} /></div>}
      {note && <div className={`notice ${note.ok ? 'ok' : 'bad'}`} role="status">{note.text}</div>}
      <button className="btn block" disabled={!canSend} onClick={send}>
        {busy ? (kind === 'text' ? 'Sending…' : `Sending… ${progress}%`) : `Send to ${resident}’s TV`}
      </button>

      {history.length > 0 && (
        <section style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 22 }}>What you’ve sent</h2>
          <ul className="history">
            {history.map((m) => (
              <li key={m.id}>
                <div className="th">
                  {m.kind === 'photo' && m.media_url ? <img src={m.media_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : m.kind === 'video' ? '🎬' : '💬'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.text || (m.kind === 'photo' ? 'Photo' : 'Video')}</div>
                  <div className="small muted">{when(m.created_at)}</div>
                </div>
                {m.status === 'pending' ? <span className="pill wait">Waiting for approval</span>
                  : m.played_at ? <span className="pill">Played {when(m.played_at)}</span>
                  : <span className="pill wait">On its way</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
