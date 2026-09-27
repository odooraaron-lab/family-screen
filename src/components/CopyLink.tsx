'use client';
import { useState } from 'react';

export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(url); } catch {
      const t = document.createElement('textarea'); t.value = url; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="link-box">
      <code title={url}>{url}</code>
      <button type="button" className="btn small ghost" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}
