import { PRODUCT, BRAND, SUPPORT_EMAIL, APP_URL, screenUrl } from './config';
import type { Screen } from './screens';

export async function sendEmail(to: string, subject: string, text: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email not sent: RESEND_API_KEY missing] to=${to} subject=${subject}\n${text}`);
    return false;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.FROM_EMAIL, to, subject, text, reply_to: SUPPORT_EMAIL || undefined }),
  });
  if (!res.ok) console.error('email failed', res.status, await res.text().catch(() => ''));
  return res.ok;
}

export function welcomeEmail(s: Screen) {
  const tv = screenUrl(s.slug, `/tv?k=${s.tv_key}`);
  const send = screenUrl(s.slug, `/send?c=${s.invite_code}`);
  const family = screenUrl(s.slug, `/family/enter?t=${s.owner_token}`);
  const card = screenUrl(s.slug, `/card?t=${s.owner_token}`);
  return sendEmail(s.owner_email, `${s.resident_name}'s ${PRODUCT} is ready`, `Kia ora ${s.owner_name},

${s.resident_name}'s ${PRODUCT} is set up. Here's everything you need.

1. CONNECT THE TV
On ${s.resident_name}'s TV, open the web browser and go to:
${APP_URL.replace(/^https?:\/\//, '')}/tv
It shows a 6-digit code. Open your family admin page (link 4) on your phone, tap "Connect a TV" and type the code.
(Or type the full TV link instead: ${tv})
Tip: if the TV's browser struggles, a Chromecast or Fire TV Stick works well.

2. THE SEND LINK (share with the whole family)
${send}
Anyone with this link can send photos, videos and messages. You approve each new person once.

3. THE PRINTABLE QR CARD (for the fridge, or the family group chat)
${card}

4. YOUR FAMILY ADMIN PAGE (keep this one to yourself)
${family}
Approve people, remove messages, set quiet hours and manage your subscription.

Questions? Just reply to this email.

${BRAND}`);
}
