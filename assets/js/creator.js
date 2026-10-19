document.addEventListener('DOMContentLoaded',function(){var WM=window.WM,$=function(i){return document.getElementById(i)},F=$('form');
var tg=$('themes');Object.keys(WM.THEMES).forEach(function(id,n){var l=WM.el('label','topt'),i=WM.el('input','sr');i.type='radio';i.name='theme';i.value=id;i.checked=!n;l.appendChild(i);var s=WM.el('span','sw');WM.THEMES[id].colors.forEach(function(c){var d=WM.el('i');d.style.background=c;s.appendChild(d)});l.appendChild(s);l.appendChild(WM.el('span','',WM.THEMES[id].name));tg.appendChild(l)});
var q=new URLSearchParams(location.search).get('theme');if(q&&WM.THEMES[q])F.querySelector('input[name=theme][value='+q+']').checked=true;
function read(){return{from:F.from.value.trim(),to:F.to.value.trim(),msg:F.msg.value.trim(),rel:F.rel.value.trim(),ps:F.ps.value.trim(),tone:F.tone.value,date:F.date.value,schedule:F.schedule.checked,music:F.music.checked,
 theme:F.querySelector('input[name=theme]:checked').value,anims:Array.prototype.map.call(F.querySelectorAll('input[name=anim]:checked'),function(x){return x.value})}}
function preview(){var c=read(),p=$('preview');WM.theme(p,c.theme);$('pv-from').textContent=c.from||'Your name';$('pv-name').textContent=c.to||'Birthday Star';
 $('pv-msg').textContent=c.msg||'Wishing you a day filled with joy, laughter and everything you love.';$('pv-date').textContent=WM.validDate(c.date)?'\uD83C\uDF82 '+WM.fmtDate(c.date):'';$('pv-rel').textContent=c.rel;$('pv-ps').textContent=c.ps?'P.S. '+c.ps:'';$('count').textContent=c.msg.length+'/'+WM.LIMITS.msg;
 var key=c.theme+c.anims.join();if(key!==preview.k){preview.k=key;WM.deco($('pdeco'),c.theme,c.anims,.6)}}
function err(id,m){$('err-'+id).textContent=m||'';var f=F[id];if(f)f.setAttribute('aria-invalid',m?'true':'false');return!m}
F.addEventListener('input',preview);F.addEventListener('change',preview);preview();
F.addEventListener('submit',function(e){e.preventDefault();var c=read(),N=WM.LIMITS.name,ok=true;
 ok=err('from',!c.from?'Enter your name so they know who it\u2019s from.':c.from.length>N?'Use '+N+' characters or fewer.':'')&ok;
 ok=err('to',!c.to?'Enter the birthday person\u2019s name.':c.to.length>N?'Use '+N+' characters or fewer.':'')&ok;
 ok=err('msg',c.msg.length>WM.LIMITS.msg?'Keep the message under '+WM.LIMITS.msg+' characters.':'')&ok;
 ok=err('date',c.date&&!WM.validDate(c.date)?'Pick a valid date.':c.schedule&&!c.date?'Pick a birthday date to use the midnight countdown.':'')&ok;
 $('result').hidden=true;if(!ok){var b=F.querySelector('[aria-invalid=true]');if(b)b.focus();return}
 var cfg=WM.clean({f:c.from,t:c.to,m:c.msg,th:c.theme,a:c.anims,r:c.rel,p:c.ps,tn:c.tone,d:c.date,s:c.schedule?1:0,mu:c.music?1:0}),url;
 try{url=WM.makeLink(cfg)}catch(x){$('err-form').textContent=x.message;return}$('err-form').textContent='';
 var chk=WM.decode(new URL(url).searchParams.get('d'));if(!chk||chk.to!==cfg.to){$('err-form').textContent='Could not build a valid link. Try a shorter message.';return}
 $('link').value=url;$('open').href=url;$('wa').href=WM.waUrl(cfg.to,url);$('len').textContent=url.length+' characters';$('result').hidden=false;$('result').scrollIntoView({behavior:WM.reduced?'auto':'smooth',block:'center'});$('link').focus()});
$('copy').addEventListener('click',function(){WM.copy($('link').value).then(function(ok){$('copied').textContent=ok?'Link copied.':'Copy failed. Select the link and copy it manually.'})});
$('try').onclick=function(){var on=WM.Music.on?WM.Music.stop():WM.Music.start();this.textContent=WM.Music.on?'Stop the melody':'Preview the melody';if(!on&&!WM.Music.on)$('err-form').textContent='Audio could not start on this device.'};$('link').addEventListener('focus',function(){this.select()})});
