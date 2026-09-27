import { APP_URL, PRODUCT } from '@/lib/config';

export default function NotFound() {
  return (
    <main className="narrow" style={{ paddingTop: 80 }}>
      <h1 style={{ fontSize: 34 }}>We can’t find that screen</h1>
      <p>Check the link you were sent. If it came from a family member, ask them to send it again.</p>
      <a className="btn" href={APP_URL}>About {PRODUCT}</a>
    </main>
  );
}
