import { APP_URL, PRODUCT, screenUrl } from '@/lib/config';
import { getScreen } from '@/lib/screens';
import { readTvCookie, TV_COOKIE } from '@/lib/pairing';

export const dynamic = 'force-dynamic';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

// The short address typed on the TV. Shows a code; once the family enters it,
// the TV moves to its own screen. Plain old JavaScript on purpose: TV browsers are often old.
export async function GET(req: Request) {
  // A TV that was connected before goes straight to its screen.
  const saved = readTvCookie(req);
  if (saved) {
    const s = await getScreen(saved.slug).catch(() => null);
    if (s && s.status !== 'pending' && s.tv_key === saved.key) {
      return new Response(null, { status: 302, headers: { location: screenUrl(s.slug, `/tv?k=${s.tv_key}`), 'cache-control': 'no-store' } });
    }
  }

  const where = esc(APP_URL.replace(/^https?:\/\//, ''));
  const html = `<!doctype html>
<html lang="en-NZ"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<title>Connect this TV - ${esc(PRODUCT)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap">
<style>
html,body{margin:0;height:100%;background:#13232C;color:#fff;font-family:'Atkinson Hyperlegible',Verdana,sans-serif}
.box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;width:86vw}
h1{font-size:4vw;margin:0 0 3vh}
p{font-size:2.4vw;line-height:1.4;margin:0 0 2vh;opacity:.9}
#code{font-size:12vw;font-weight:700;letter-spacing:1.5vw;margin:3vh 0;color:#F2B84B}
.small{font-size:1.8vw;opacity:.7}
</style></head><body>
<div class="box">
  <h1>Connect this TV to ${esc(PRODUCT)}</h1>
  <p>On your phone, open your family admin page and tap <b>Connect a TV</b>. Enter this code:</p>
  <div id="code">&middot;&middot;&middot; &middot;&middot;&middot;</div>
  <p class="small" id="note">This page will change by itself once it's connected.</p>
</div>
<script>
(function () {
  var codeEl = document.getElementById('code'), note = document.getElementById('note');
  var device = null, timer = null;
  function req(method, url, done) {
    var x = new XMLHttpRequest();
    x.open(method, url, true);
    x.onreadystatechange = function () {
      if (x.readyState !== 4) return;
      var data = null;
      try { data = JSON.parse(x.responseText); } catch (e) {}
      done(x.status === 200 ? data : null);
    };
    x.send();
  }
  function start() {
    clearInterval(timer);
    req('POST', '/api/tv/pair', function (d) {
      if (!d) { note.textContent = 'Reconnecting...'; setTimeout(start, 5000); return; }
      device = d.device;
      codeEl.textContent = d.code.slice(0, 3) + ' ' + d.code.slice(3);
      note.textContent = 'This page will change by itself once it\\'s connected.';
      timer = setInterval(check, 3000);
    });
  }
  function check() {
    req('GET', '/api/tv/pair?d=' + encodeURIComponent(device), function (d) {
      if (!d) return;
      if (d.status === 'paired') { clearInterval(timer); note.textContent = 'Connected! Starting...'; location.replace(d.url); }
      else if (d.status === 'expired') start();
    });
  }
  start();
})();
</script>
</body></html>`;
  const headers: Record<string, string> = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };
  // The saved screen is gone or its TV link was replaced: forget it and show a new code.
  if (saved) headers['set-cookie'] = `${TV_COOKIE}=; Path=/; Max-Age=0${process.env.SCREENS_DOMAIN ? `; Domain=${process.env.SCREENS_DOMAIN.toLowerCase()}` : ''}`;
  return new Response(html, { headers });
}
