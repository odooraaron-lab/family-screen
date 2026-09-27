import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { getScreen, isOwner, base } from '@/lib/screens';
import { screenUrl, PRODUCT, PRICES } from '@/lib/config';
import { CopyLink } from '@/components/CopyLink';
import { ConfirmButton } from '@/components/ConfirmButton';
import { approveSender, blockSender, removeMessage, saveSettings, newTvLink, newSendLink, emailLinks } from './actions';

export const dynamic = 'force-dynamic';

const hours = Array.from({ length: 24 }, (_, h) => ({ h, label: `${h % 12 || 12}${h < 12 ? 'am' : 'pm'}` }));

function seen(iso: string | null) {
  if (!iso) return { text: 'The TV hasn’t been opened yet', ok: false };
  const mins = (Date.now() - new Date(iso).getTime()) / 60000;
  if (mins < 3) return { text: 'The TV is on now', ok: true };
  if (mins < 60) return { text: `TV last on ${Math.round(mins)} minutes ago`, ok: true };
  if (mins < 60 * 48) return { text: `TV last on ${Math.round(mins / 60)} hours ago`, ok: mins < 60 * 24 };
  return { text: `TV last on ${Math.round(mins / 1440)} days ago`, ok: false };
}

const Hidden = ({ slug, id }: { slug: string; id?: number }) => (
  <><input type="hidden" name="slug" value={slug} />{id !== undefined && <input type="hidden" name="id" value={id} />}</>
);

export default async function Family({ params, searchParams }: {
  params: { slug: string }; searchParams: { ok?: string; sent?: string };
}) {
  const s = await getScreen(params.slug);
  if (!s || s.status === 'pending') notFound();
  const b = base(s.slug);

  if (!isOwner(s)) {
    return (
      <main className="narrow" style={{ paddingTop: 50 }}>
        <h1 style={{ fontSize: 34 }}>{s.resident_name}’s family admin</h1>
        {searchParams.sent ? (
          <div className="notice ok">If you set up this screen, your links are on their way to your email.</div>
        ) : (
          <>
            <p>Open the admin link from your {PRODUCT} email on this device. If you’ve lost it, we can send it again to the email used at setup.</p>
            <form action={emailLinks}><Hidden slug={s.slug} /><button className="btn">Email my links again</button></form>
          </>
        )}
      </main>
    );
  }

  const sql = db();
  const [pending, people, messages, [usage]] = await Promise.all([
    sql`select p.*, (select count(*) from fs_messages m where m.sender_id = p.id and m.status = 'pending')::int as waiting
        from fs_senders p where p.slug = ${s.slug} and p.status = 'pending' order by p.id`,
    sql`select * from fs_senders where slug = ${s.slug} and status = 'approved' order by name`,
    sql`select m.*, p.name as sender from fs_messages m left join fs_senders p on p.id = m.sender_id
        where m.slug = ${s.slug} and m.status <> 'removed' order by m.id desc limit 60`,
    sql`select count(*)::int as n from fs_messages where slug = ${s.slug} and status = 'live'`,
  ]);
  const tv = seen(s.last_seen_at);
  const sendLink = screenUrl(s.slug, `/send?c=${s.invite_code}`);
  const tvLink = screenUrl(s.slug, `/tv?k=${s.tv_key}`);

  return (
    <>
      <header className="send-head">
        <div className="wrap">
          <h1>{s.resident_name}’s {PRODUCT}</h1>
          <p>
            <span className={`pill ${tv.ok ? '' : 'wait'}`} style={{ marginRight: 10 }}>{tv.text}</span>
            {usage.n} {usage.n === 1 ? 'thing' : 'things'} playing on the TV
          </p>
        </div>
      </header>
      <main className="wrap" style={{ paddingBottom: 60 }}>
        {searchParams.ok && <div className="notice ok" role="status">{searchParams.ok}</div>}
        {s.status !== 'active' && (
          <div className="notice bad">The subscription has ended, so the TV is paused. Restart it from Subscription below.</div>
        )}

        <div className="admin-grid">
          <div className="stack">
            {pending.length > 0 && (
              <section className="card">
                <h2 style={{ fontSize: 24 }}>Waiting for your OK</h2>
                <p className="muted small">Approve someone once and everything they send goes straight to the TV.</p>
                <ul className="people">
                  {pending.map((p) => (
                    <li key={p.id}>
                      <div><strong>{p.name}</strong><div className="small muted">{p.waiting} waiting to play</div></div>
                      <div className="row">
                        <form action={approveSender} className="inline"><Hidden slug={s.slug} id={p.id} /><button className="btn small">Approve</button></form>
                        <form action={blockSender} className="inline"><Hidden slug={s.slug} id={p.id} /><button className="btn small danger">Block</button></form>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="card">
              <h2 style={{ fontSize: 24 }}>On the TV</h2>
              {messages.length === 0 ? (
                <p className="muted">Nothing yet. Send the first photo using the send link on the right.</p>
              ) : (
                <div className="media-grid">
                  {messages.map((m) => (
                    <div className="media" key={m.id}>
                      <div className="pic">
                        {m.kind === 'photo' && <img src={m.media_url} alt={m.text || `Photo from ${m.sender}`} loading="lazy" />}
                        {m.kind === 'video' && <video src={m.media_url} muted playsInline preload="metadata" controls />}
                        {m.kind === 'text' && <div className="txt">{m.text}</div>}
                      </div>
                      <div className="meta">
                        <span>From {m.sender || 'Family'}</span>
                        {m.kind !== 'text' && m.text && <span className="muted">{m.text}</span>}
                        {m.status === 'pending' && <span className="pill wait">Waiting for approval</span>}
                        <form action={removeMessage} style={{ marginTop: 'auto' }}>
                          <Hidden slug={s.slug} id={m.id} />
                          <ConfirmButton className="btn small danger" message="Remove this from the TV? It’ll be deleted.">Remove</ConfirmButton>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="stack">
            <section className="card">
              <h2 style={{ fontSize: 22 }}>Links</h2>
              <p className="small" style={{ marginBottom: 4 }}><strong>Send link</strong> for the family</p>
              <CopyLink url={sendLink} />
              <p className="small" style={{ marginBottom: 4 }}><strong>TV link</strong> to open on {s.resident_name}’s TV</p>
              <CopyLink url={tvLink} />
              <div className="row">
                <a className="btn small" href={`${b}/card`} target="_blank" rel="noreferrer">Print the QR card</a>
                <a className="btn small ghost" href={`${b}/send?c=${s.invite_code}`}>Send something</a>
              </div>
            </section>

            <section className="card">
              <h2 style={{ fontSize: 22 }}>Settings</h2>
              <form action={saveSettings}>
                <Hidden slug={s.slug} />
                <label className="field">Name on the TV<input type="text" name="resident_name" defaultValue={s.resident_name} maxLength={40} /></label>
                <label className="check"><input type="checkbox" name="require_approval" defaultChecked={s.require_approval} /><span>New people need my approval before their messages play</span></label>
                <label className="check"><input type="checkbox" name="chime" defaultChecked={s.chime} /><span>Play a soft chime when something new arrives</span></label>
                <p className="small" style={{ fontWeight: 700, marginBottom: 6 }}>Quiet hours (screen shows a dim clock)</p>
                <div className="hours">
                  <label className="field small">From
                    <select name="quiet_start" defaultValue={s.quiet_start}>{hours.map((h) => <option key={h.h} value={h.h}>{h.label}</option>)}</select>
                  </label>
                  <label className="field small">Until
                    <select name="quiet_end" defaultValue={s.quiet_end}>{hours.map((h) => <option key={h.h} value={h.h}>{h.label}</option>)}</select>
                  </label>
                </div>
                <button className="btn small">Save settings</button>
              </form>
            </section>

            <section className="card">
              <h2 style={{ fontSize: 22 }}>Family members ({people.length})</h2>
              {people.length === 0 ? <p className="muted small">No one yet.</p> : (
                <ul className="people">
                  {people.map((p) => (
                    <li key={p.id}>
                      <span>{p.name}</span>
                      <form action={blockSender} className="inline"><Hidden slug={s.slug} id={p.id} />
                        <ConfirmButton className="btn small danger" message={`Stop ${p.name} sending? Their past photos stay unless you remove them.`}>Block</ConfirmButton>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="card">
              <h2 style={{ fontSize: 22 }}>Subscription</h2>
              <p className="small muted">{s.plan === 'monthly' ? PRICES.monthly.label : PRICES.yearly.label}. Change your card, switch plan or cancel on Stripe’s secure page.</p>
              <a className="btn small" href={`/api/screens/${s.slug}/billing`}>Manage subscription</a>
            </section>

            <section className="card">
              <h2 style={{ fontSize: 22 }}>If a link gets out</h2>
              <p className="small muted">Making a new link stops the old one working straight away.</p>
              <div className="row">
                <form action={newSendLink}><Hidden slug={s.slug} /><ConfirmButton className="btn small ghost" message="Make a new send link? The old one stops working for new people.">New send link</ConfirmButton></form>
                <form action={newTvLink}><Hidden slug={s.slug} /><ConfirmButton className="btn small ghost" message="Make a new TV link? You’ll need to open the new link on the TV.">New TV link</ConfirmButton></form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
