import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Resthome TV: family photos on Nana’s TV in the rest home';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The picture shown when the site is shared on Facebook, messages etc. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F4F8FE', color: '#2E2140', padding: 64, alignItems: 'center', gap: 48, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 26, color: '#C23A64', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>Resthome TV · myQR</div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>The grandkids, on Nana’s TV</div>
          <div style={{ fontSize: 30, marginTop: 22, color: '#5E4C70' }}>Family send photos and messages from their phones. Nothing for Nana to learn.</div>
        </div>
        <div style={{ display: 'flex', width: 440, height: 270, background: '#2E2140', borderRadius: 22, padding: 12 }}>
          <div style={{ display: 'flex', flex: 1, background: '#1B1426', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', padding: 30, color: '#fff' }}>
            <div style={{ display: 'flex', fontSize: 16, fontWeight: 800, background: '#fff', color: '#2E2140', borderRadius: 99, padding: '3px 12px', alignSelf: 'flex-start' }}>New</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 14, lineHeight: 1.2 }}>“Look Nana, I lost my first tooth!”</div>
            <div style={{ display: 'flex', fontSize: 18, fontWeight: 800, background: '#FFC857', color: '#2A2410', borderRadius: 99, padding: '4px 14px', alignSelf: 'flex-start', marginTop: 16 }}>From Ari, 6</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
