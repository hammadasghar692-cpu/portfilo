document.addEventListener('DOMContentLoaded',function(){var WM=window.WM,$=function(i){return document.getElementById(i)},cfg=WM.readLink(),stages=document.querySelectorAll('.stage'),fx,loop,cols;
function show(id){clearInterval(loop);stages.forEach(function(s){var on=s.id===id;s.hidden=!on;s.classList.toggle('show',on)});scrollTo(0,0);var h=$(id).querySelector('h1,h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
if(!cfg){document.body.dataset.theme='party';show('st-error');return}
var LINES={heartfelt:['May this year hold more laughter than worries, {n}.','You make ordinary days feel special. Today it\u2019s your turn to be celebrated.','Here\u2019s to the dreams you\u2019re chasing and the ones still waiting for you.','Wishing you peace, good health and a heart full of joy.'],
fun:['Another year older, {n}, but you still don\u2019t look a day over fabulous!','May your cake be huge and your problems tiny.','Your only job today: eat cake and accept compliments.','Warning: a dangerous amount of fun is required for the next 24 hours.'],
elegant:['May the coming year unfold with grace, success and quiet happiness, {n}.','A new chapter begins today. May every page be worth reading.','Here\u2019s to good health, lasting friendships and well-earned rewards.','Wishing you a day as remarkable as you are.']};
var Z=[['Capricorn','\u2651'],['Aquarius','\u2652'],['Pisces','\u2653'],['Aries','\u2648'],['Taurus','\u2649'],['Gemini','\u264A'],['Cancer','\u264B'],['Leo','\u264C'],['Virgo','\u264D'],['Libra','\u264E'],['Scorpio','\u264F'],['Sagittarius','\u2650'],['Capricorn','\u2651']],CUT=[20,19,21,20,21,21,23,23,23,23,22,22];
var th=WM.theme(document.body,cfg.theme),url=location.href;cols=th.colors;fx=new WM.Fx($('fx'));
document.title='A birthday surprise for '+cfg.to+' \u2013 WishMagic';WM.deco($('deco'),cfg.theme,cfg.anims.concat(['sparkles']),1);WM.bunting($('bunting'),cols);
$('w-hi').textContent='Hi '+cfg.to+'!';$('w-from').textContent=(cfg.rel?cfg.from+', your '+cfg.rel.toLowerCase().replace(/^(my|your) /,'')+', ':cfg.from+' ')+'made a birthday surprise just for you.';
$('rel').textContent=cfg.rel;$('msg-from').textContent='With love, '+cfg.from;$('ps').textContent=cfg.ps?'P.S. '+cfg.ps:'';$('wa').href=WM.waUrl(cfg.to,url);
$('date').textContent=cfg.date?'\uD83C\uDF82 '+WM.fmtDate(cfg.date):'';
function toast(t){$('toast').textContent=t;setTimeout(function(){$('toast').textContent=''},3500)}
function type(el,t){clearInterval(el._t);if(WM.reduced){el.textContent=t;return}el.textContent='';var a=Array.from(t),i=0;el._t=setInterval(function(){el.textContent=a.slice(0,++i).join('');if(i>=a.length)clearInterval(el._t)},38)}
function cheer(){clearInterval(loop);if(WM.reduced||cfg.anims.indexOf('confetti')<0)return;loop=setInterval(function(){fx.confetti(cols,16)},2600)}
function reveal(){var n=$('name');n.replaceChildren();n.setAttribute('aria-label',cfg.to);Array.from(cfg.to).forEach(function(ch,i){var s=WM.el('span','ltr',ch===' '?'\u00a0':ch);s.setAttribute('aria-hidden','true');s.style.animationDelay=i*80+'ms';n.appendChild(s)});
 if(cfg.anims.indexOf('confetti')>-1)fx.confetti(cols,130);if(cfg.anims.indexOf('fireworks')>-1)fx.fireworks(cols,7);if(th.deco==='hearts')fx.hearts(20);cheer()}
function wishes(){var b=$('wishcards'),c=$('chips');b.replaceChildren();c.replaceChildren();LINES[cfg.tone].forEach(function(l,i){var d=WM.el('div','wcard',l.replace('{n}',cfg.to));d.style.animationDelay=i*.6+'s';b.appendChild(d)});
 if(cfg.date){var p=cfg.date.split('-'),m=+p[1],d=+p[2],z=d<CUT[m-1]?Z[m-1]:Z[m];c.appendChild(WM.el('span','chip',z[1]+' '+z[0]));
  var now=new Date(),t0=new Date(now.getFullYear(),now.getMonth(),now.getDate()),nx=new Date(now.getFullYear(),m-1,d);if(nx<t0)nx=new Date(now.getFullYear()+1,m-1,d);var dd=Math.round((nx-t0)/864e5);
  c.appendChild(WM.el('span','chip',dd===0?'\uD83C\uDF89 Today is the big day!':'\u23F3 '+dd+' day'+(dd===1?'':'s')+' to the next birthday'))}}
function reset(){$('giftbtn').classList.remove('open');$('cakewrap').classList.remove('out');$('msgbox').hidden=false;$('wishbox').hidden=true;$('actions').hidden=true;$('wished').textContent='';fx.clear();$('msg').textContent=''}
function start(){reset();show('st-welcome')}
var target=cfg.schedule?new Date(+cfg.date.slice(0,4),+cfg.date.slice(5,7)-1,+cfg.date.slice(8,10)).getTime():0,tk;
function tick(){var d=Math.max(0,target-Date.now());if(!d){clearInterval(tk);start();return}var p=function(n){return String(n).padStart(2,'0')};
 $('cd-d').textContent=Math.floor(d/864e5);$('cd-h').textContent=p(Math.floor(d%864e5/36e5));$('cd-m').textContent=p(Math.floor(d%36e5/6e4));$('cd-s').textContent=p(Math.floor(d%6e4/1e3))}
if(target&&Date.now()<target){$('wait-for').textContent='Opens at midnight on '+WM.fmtDate(cfg.date)+' (your device\u2019s local time).';show('st-wait');tick();tk=setInterval(tick,1000)}else start();
$('open').onclick=function(){show('st-gift')};
$('giftbtn').onclick=function(){var b=this;if(b.classList.contains('open'))return;b.classList.add('open');fx.burst(innerWidth/2,innerHeight/2,cols,50);setTimeout(function(){show('st-name');reveal()},WM.reduced?200:1200)};
$('to-wishes').onclick=function(){fx.clear();wishes();show('st-wishes')};
$('to-cake').onclick=function(){fx.clear();show('st-cake');type($('msg'),cfg.msg||'Wishing you a day filled with joy, laughter and everything you love.');cheer()};
$('wish').onclick=function(){$('msgbox').hidden=true;$('wishbox').hidden=false;$('blow').focus()};
$('blow').onclick=function(){clearInterval(loop);$('cakewrap').classList.add('out');$('wishbox').hidden=true;$('wished').textContent='Your wish is sealed. Happy Birthday, '+cfg.to+'! \u2728';var r=$('cakewrap').getBoundingClientRect();fx.burst(r.left+r.width/2,r.top+r.height*.2,cols,70);fx.confetti(cols,150);fx.fireworks(cols,8);if(th.deco==='hearts')fx.hearts(24);$('actions').hidden=false};
$('replay').onclick=start;
$('copy').onclick=function(){WM.copy(url).then(function(ok){toast(ok?'Link copied.':'Copy failed. Copy the address from your browser.')})};
var last=0;addEventListener('pointermove',function(e){var n=Date.now();if(n-last>70&&e.pointerType!=='mouse'||n-last>110){last=n;fx.burst(e.clientX,e.clientY,cols,3)}});
var mb=$('music');function label(){mb.textContent=WM.Music.on?'\uD83D\uDD0A Music on':'\uD83D\uDD07 Music off';mb.setAttribute('aria-pressed',String(WM.Music.on));$('hint').hidden=WM.Music.on||!cfg.music}
if(cfg.music){mb.hidden=false;label();WM.Music.auto(label);mb.onclick=function(){var ok=WM.Music.on?WM.Music.stop():WM.Music.start();if(!ok)toast('Audio could not start on this device.');label()}}});
