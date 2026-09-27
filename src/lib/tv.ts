// The TV page is plain HTML + old-fashioned JavaScript (no React), so it runs on
// older smart-TV browsers and keeps going for weeks without anyone touching it.

export const TV_CSS = `
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:#13232C;color:#fff;overflow:hidden;cursor:none;
  font-family:'Atkinson Hyperlegible',Verdana,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}
#stage{position:fixed;inset:0}
.slide{position:absolute;inset:0;opacity:0;transition:opacity .9s ease}
.slide.in{opacity:1}
.blur{position:absolute;inset:-40px;background-size:cover;background-position:center;filter:blur(38px) brightness(.45)}
.pic{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
video.pic{background:#000}
.label{position:absolute;left:3.5vw;bottom:4vh;max-width:70vw;background:rgba(10,20,26,.72);border-radius:1.4vw;padding:1.6vh 2vw}
.from{display:inline-block;background:#F2B84B;color:#2A2410;font-weight:700;border-radius:99px;padding:.5vh 1.4vw;font-size:2.6vw}
.new{display:inline-block;background:#fff;color:#13232C;font-weight:700;border-radius:99px;padding:.5vh 1.2vw;font-size:2.6vw;margin-right:.8vw}
.text{font-size:3vw;line-height:1.25;margin-top:1.2vh;font-weight:700}
.when{font-size:1.9vw;opacity:.75;margin-top:.8vh}
.slide.text .label{left:8vw;right:8vw;top:50%;bottom:auto;transform:translateY(-50%);max-width:none;background:none;padding:0}
.slide.text .text{font-size:5.2vw;line-height:1.2;margin-top:3vh}
.slide.text .from{font-size:3vw}
.slide.text .when{font-size:2.4vw;margin-top:2.5vh}
#clock{position:fixed;top:3vh;right:3vw;text-align:right;z-index:5;text-shadow:0 2px 12px rgba(0,0,0,.6)}
#clock-time{font-size:3.6vw;font-weight:700;line-height:1}
#clock-date{font-size:1.9vw;opacity:.85;margin-top:.6vh}
#net{position:fixed;top:3.4vh;left:3vw;width:1.3vw;height:1.3vw;border-radius:50%;background:#E0A83A;display:none;z-index:5}
#net.show{display:block}
.center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6vw}
.center h1{font-size:4.4vw;margin:0 0 2vh;line-height:1.15}
.center p{font-size:2.4vw;margin:0;opacity:.85;max-width:70vw}
.qr{background:#fff;border-radius:1.2vw;padding:1.4vw;margin-top:4vh;width:22vw}
.qr svg{display:block;width:100%;height:auto}
body.quiet #stage,body.quiet .label{display:none}
body.quiet #clock{top:50%;right:50%;transform:translate(50%,-50%);text-align:center;opacity:.35}
body.quiet #clock-time{font-size:9vw}
body.quiet #clock-date{font-size:3vw}
#start{position:fixed;inset:0;background:rgba(19,35,44,.94);z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:default}
#start h1{font-size:4.2vw;margin:0 0 1vh}
#start p{font-size:2.2vw;opacity:.8;margin:0 0 4vh}
#start button{font-weight:700;font-size:3vw;font-family:inherit;background:#F2B84B;color:#2A2410;border:0;border-radius:99px;padding:2vh 5vw;cursor:pointer}
#start button:focus{outline:.5vw solid #fff;outline-offset:.5vw}
@media (prefers-reduced-motion:reduce){.slide{transition:none}}
`;

export const TV_JS = `
(function(){
var C=window.FS, d=document;
function $(id){return d.getElementById(id)}
var stage=$('stage'),net=$('net'),overlay=$('start');
var items=[],queue=[],loopIdx=0,status='active',timer=null,unlocked=false,audioCtx=null,bootAt=Date.now(),stopped=false;
var settings={chime:true,quietStart:20,quietEnd:7,timezone:C.tz};
var seenKey='fs_seen_'+C.slug,feedKey='fs_feed_'+C.slug,seenMax=0;
try{seenMax=parseInt(localStorage.getItem(seenKey)||'0',10)||0}catch(e){}

function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function req(method,url,body,cb){var x=new XMLHttpRequest();x.open(method,url,true);x.timeout=15000;
  if(body)x.setRequestHeader('Content-Type','application/json');
  x.onload=function(){var j=null;try{j=JSON.parse(x.responseText)}catch(e){}cb(x.status,j)};
  x.onerror=x.ontimeout=function(){cb(0,null)};x.send(body?JSON.stringify(body):null)}

function parts(){var n=new Date(),o={h:n.getHours(),time:'',date:''};
  try{var tz=settings.timezone||C.tz;
    o.h=parseInt(new Intl.DateTimeFormat('en-NZ',{timeZone:tz,hour:'numeric',hourCycle:'h23'}).format(n),10);
    o.time=new Intl.DateTimeFormat('en-NZ',{timeZone:tz,hour:'numeric',minute:'2-digit',hour12:true}).format(n);
    o.date=new Intl.DateTimeFormat('en-NZ',{timeZone:tz,weekday:'long',day:'numeric',month:'long'}).format(n);
  }catch(e){var m=n.getMinutes();o.time=((o.h%12)||12)+':'+(m<10?'0':'')+m+(o.h<12?' am':' pm');o.date=n.toDateString()}
  return o}
function tick(){var p=parts();$('clock-time').innerHTML=esc(p.time);$('clock-date').innerHTML=esc(p.date)}
function isQuiet(){var s=settings.quietStart,e=settings.quietEnd,h=parts().h;if(s===e)return false;return s>e?(h>=s||h<e):(h>=s&&h<e)}
function ago(iso){var t=new Date(iso).getTime(),s=(Date.now()-t)/1000;
  if(s<3600)return s<120?'Just now':Math.floor(s/60)+' minutes ago';
  if(s<86400)return Math.floor(s/3600)===1?'An hour ago':Math.floor(s/3600)+' hours ago';
  if(s<172800)return 'Yesterday';
  if(s<86400*14)return Math.floor(s/86400)+' days ago';
  try{return new Intl.DateTimeFormat('en-NZ',{day:'numeric',month:'long'}).format(new Date(t))}catch(e){return ''}}

function chime(){if(!unlocked||!audioCtx||!settings.chime)return;try{
  var t=audioCtx.currentTime;[659.25,880].forEach(function(f,i){var o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type='sine';o.frequency.value=f;o.connect(g);g.connect(audioCtx.destination);
  g.gain.setValueAtTime(0,t+i*.35);g.gain.linearRampToValueAtTime(.18,t+i*.35+.04);g.gain.exponentialRampToValueAtTime(.0001,t+i*.35+1.2);
  o.start(t+i*.35);o.stop(t+i*.35+1.3)})}catch(e){}}

function swap(el){var old=stage.children;for(var i=0;i<old.length;i++){var v=old[i].querySelector('video');if(v){try{v.pause();v.removeAttribute('src');v.load()}catch(e){}}}
  stage.appendChild(el);void el.offsetWidth;el.className+=' in';
  setTimeout(function(){while(stage.children.length>1)stage.removeChild(stage.children[0])},1000)}

function screenMsg(title,text,extra){var el=d.createElement('div');el.className='slide';
  el.innerHTML='<div class="center"><h1>'+esc(title)+'</h1><p>'+esc(text)+'</p>'+(extra||'')+'</div>';swap(el)}

function markPlayed(id){if(id>seenMax){seenMax=id;try{localStorage.setItem(seenKey,String(id))}catch(e){}}
  req('POST',C.played,{k:C.key,ids:[id]},function(){})}

function preload(){var n=queue[0]||items[loopIdx%Math.max(1,Math.min(items.length,60))];if(n&&n.kind==='photo'){var i=new Image();i.src=n.url}}

function show(item,isNew){var el=d.createElement('div');el.className='slide '+item.kind;var h='';
  if(item.kind==='photo')h+='<div class="blur" style="background-image:url(\\''+esc(item.url)+'\\')"></div><img class="pic" alt="" src="'+esc(item.url)+'">';
  if(item.kind==='video')h+='<video class="pic" playsinline preload="auto"></video>';
  h+='<div class="label">'+(isNew?'<span class="new">New</span>':'')+'<span class="from">From '+esc(item.sender)+'</span>'+
     (item.text?'<div class="text">'+esc(item.text)+'</div>':'')+'<div class="when">'+esc(ago(item.created_at))+'</div></div>';
  el.innerHTML=h;swap(el);
  if(isNew){chime();markPlayed(item.id)}
  var dur=item.kind==='text'?Math.min(25000,9000+(item.text||'').length*70):12000;if(isNew)dur+=6000;
  if(item.kind==='video'){var v=el.querySelector('video');v.muted=!unlocked;v.src=item.url;
    v.onended=function(){next()};v.onerror=function(){clearTimeout(timer);timer=setTimeout(next,2000)};
    try{var p=v.play();if(p&&p.catch)p.catch(function(){v.muted=true;v.play()})}catch(e){}
    timer=setTimeout(next,95000)}
  else{if(item.kind==='photo')el.querySelector('img').onerror=function(){clearTimeout(timer);timer=setTimeout(next,800)};timer=setTimeout(next,dur)}
  preload()}

function next(){clearTimeout(timer);if(stopped)return;
  if(status==='lapsed'){d.body.className='';screenMsg('This screen is paused','Please ask your family to renew the '+C.product+' subscription.');timer=setTimeout(next,60000);return}
  if(status==='disabled'){d.body.className='';screenMsg('This screen is switched off','Please ask your family to get in touch with us.');timer=setTimeout(next,60000);return}
  if(isQuiet()){d.body.className='quiet';timer=setTimeout(next,60000);return}
  d.body.className='';
  var item=null,isNew=false;
  if(queue.length){item=queue.shift();isNew=true}
  else if(items.length){var n=Math.min(items.length,60);if(loopIdx>=n)loopIdx=0;item=items[loopIdx++]}
  if(!item){screenMsg('Waiting for the first message for '+C.resident,'Scan this with a phone camera to send a photo or message.','<div class="qr">'+C.qr+'</div>');timer=setTimeout(next,20000);return}
  show(item,isNew)}

function inQueue(id){for(var i=0;i<queue.length;i++)if(queue[i].id===id)return true;return false}
function apply(data,fromCache){status=data.status||status;if(data.settings)settings=data.settings;items=data.items||[];
  if(fromCache)return;
  for(var i=items.length-1;i>=0;i--){var it=items[i];if(it.id>seenMax&&!it.played&&!inQueue(it.id))queue.push(it)}}

var wasEmpty=true;
function poll(){req('GET',C.feed,null,function(code,data){
  if(code===403){stopped=true;clearTimeout(timer);d.body.className='';screenMsg('This TV link has changed','Please ask your family for the new TV link.');return}
  if(code!==200||!data){net.className='show';return}
  net.className='';apply(data,false);
  try{localStorage.setItem(feedKey,JSON.stringify({status:data.status,settings:data.settings,items:data.items}))}catch(e){}
  if(wasEmpty&&(items.length||status!=='active')){wasEmpty=false;next()}
  else if(queue.length&&stage.querySelector('.center')){next()}})}

var lock=null;
function keepAwake(){try{if(navigator.wakeLock&&d.visibilityState==='visible')navigator.wakeLock.request('screen').then(function(l){lock=l})['catch'](function(){})}catch(e){}}
function begin(){if(overlay.style.display==='none')return;overlay.style.display='none';
  try{var AC=window.AudioContext||window.webkitAudioContext;if(AC){audioCtx=new AC();if(audioCtx.resume)audioCtx.resume();unlocked=true}}catch(e){}
  try{var r=d.documentElement,f=r.requestFullscreen||r.webkitRequestFullscreen;if(f)f.call(r)}catch(e){}
  keepAwake()}
$('start-btn').onclick=begin;
d.addEventListener('keydown',function(e){if(overlay.style.display!=='none'){e.preventDefault();begin()}});
d.addEventListener('visibilitychange',keepAwake);
setTimeout(function(){if(overlay.style.display!=='none'){overlay.style.display='none';keepAwake()}},30000);
$('start-btn').focus();

try{var c=JSON.parse(localStorage.getItem(feedKey)||'null');if(c){apply(c,true);if(items.length){wasEmpty=false}}}catch(e){}
tick();setInterval(tick,15000);
next();poll();setInterval(poll,20000);
setInterval(function(){if(parts().h===3&&Date.now()-bootAt>2*3600*1000)location.reload()},5*60*1000);
})();
`;
