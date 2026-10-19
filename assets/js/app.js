(function(){var WM=window.WM=window.WM||{};
var mq=matchMedia('(prefers-reduced-motion: reduce)');WM.reduced=mq.matches;if(mq.addEventListener)mq.addEventListener('change',function(e){WM.reduced=e.matches});
WM.el=function(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
WM.rand=function(a,b){return a+Math.random()*(b-a)};
WM.theme=function(el,id){if(!WM.THEMES[id])id='party';el.dataset.theme=id;var v=WM.THEMES[id].vars;for(var k in v)el.style.setProperty(k,v[k]);return WM.THEMES[id]};
WM.deco=function(box,id,anims,k){box.replaceChildren();if(WM.reduced)return;k=k||1;var t=WM.THEMES[id]||WM.THEMES.party;anims=anims||[];
 function add(cls,txt,s){var e=WM.el('span',cls,txt);for(var p in s)e.style.setProperty(p,s[p]);box.appendChild(e)}
 var i,r=WM.rand;
 if(anims.indexOf('balloons')>-1)for(i=0;i<Math.round(7*k);i++)add('balloon','',{left:r(2,94)+'%','--c':t.colors[i%4],'--d':r(9,16)+'s','--delay':-r(0,14)+'s'});
 if(anims.indexOf('sparkles')>-1||t.deco==='stars')for(i=0;i<Math.round(18*k);i++)add('spark','\u2726',{left:r(2,96)+'%',top:r(2,95)+'%','--d':r(2,5)+'s','--delay':-r(0,5)+'s','--s':r(10,22)+'px'});
 if(t.deco==='hearts')for(i=0;i<Math.round(10*k);i++)add('heart','\u2764',{left:r(2,94)+'%','--d':r(8,14)+'s','--delay':-r(0,12)+'s','--s':r(14,28)+'px'})};
WM.Fx=function(cv){var c=cv.getContext('2d'),ps=[],raf=0,W=0,H=0,dpr=Math.min(devicePixelRatio||1,2);
 function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;c.setTransform(dpr,0,0,dpr,0,0)}size();addEventListener('resize',size);
 function P(o){ps.push(Object.assign({vx:0,vy:0,g:.12,life:120,s:8,r:0,vr:0,col:'#fff',t:'c'},o));if(!raf)raf=requestAnimationFrame(loop)}
 function loop(){c.clearRect(0,0,W,H);ps=ps.filter(function(p){return p.life>0&&p.y<H+30&&p.y>-60});
  ps.forEach(function(p){c.save();c.globalAlpha=Math.max(0,Math.min(1,p.life/30));c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.col;
   if(p.t==='h'){c.font=p.s+'px serif';c.fillText('\u2764',0,0)}else if(p.t==='s'){c.beginPath();c.arc(0,0,p.s,0,6.3);c.fill()}else c.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);c.restore();
   p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.life--;p.r+=p.vr});raf=ps.length?requestAnimationFrame(loop):0}
 function pick(a){return a[Math.floor(Math.random()*a.length)]}var r=WM.rand;
 var api={confetti:function(cols,n){if(WM.reduced)return;for(var i=0;i<(n||90);i++)P({x:r(0,W),y:r(-H*.3,0),vx:r(-1.5,1.5),vy:r(1.5,4),vr:r(-.2,.2),col:pick(cols),s:r(6,11),life:400,g:.02})},
 hearts:function(n){if(WM.reduced)return;for(var i=0;i<(n||14);i++)P({t:'h',x:r(0,W),y:H+10,vy:r(-4,-2),g:-.005,s:r(14,26),col:'#ff4d6d',life:260})},
 burst:function(x,y,cols,n){if(WM.reduced)return;for(var i=0;i<(n||40);i++){var a=r(0,6.28),s=r(1,4.5);P({t:'s',x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:.04,s:r(1.5,3),col:pick(cols),life:70})}},
 fireworks:function(cols,n){if(WM.reduced)return;for(var i=0;i<(n||5);i++)setTimeout(function(){api.burst(r(W*.15,W*.85),r(H*.1,H*.5),cols)},i*500)},
 clear:function(){ps=[]}};return api};
WM.copy=function(t){return(navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t).then(function(){return true}):Promise.reject()).catch(function(){var a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}a.remove();return ok})};
WM.waUrl=function(name,url){return'https://wa.me/?text='+encodeURIComponent('\uD83C\uDF82 A birthday surprise for '+name+' is waiting! Open it here: '+url)};
/* Happy Birthday melody synthesized with Web Audio (no audio files). Browsers block sound before a user gesture, so auto() tries immediately and otherwise starts on the first tap/key. */
WM.Music={ctx:null,t:0,on:false,master:null,
S:[[392,.75],[392,.25],[440,1],[392,1],[523.25,1],[493.88,2],[392,.75],[392,.25],[440,1],[392,1],[587.33,1],[523.25,2],[392,.75],[392,.25],[784,1],[659.25,1],[523.25,1],[493.88,1],[440,2],[698.46,.75],[698.46,.25],[659.25,1],[523.25,1],[587.33,1],[523.25,2]],
start:function(){try{var A=window.AudioContext||window.webkitAudioContext;if(!A)return false;var self=this,c=this.ctx=this.ctx||new A(),B=.55;if(c.resume)c.resume();
 this.master=c.createGain();this.master.gain.value=.55;this.master.connect(c.destination);this.on=true;
 function note(f,t,d){[[f,'triangle',.2],[f*2,'sine',.07],[f/2,'sine',.1]].forEach(function(v){var o=c.createOscillator(),g=c.createGain();o.type=v[1];o.frequency.value=v[0];g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v[2],t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+d+.25);o.connect(g);g.connect(self.master);o.start(t);o.stop(t+d+.3)})}
 function loop(){if(!self.on)return;var t=c.currentTime+.05;self.S.forEach(function(n){note(n[0],t,n[1]*B*.95);t+=n[1]*B});self.t=setTimeout(loop,(t-c.currentTime+1.2)*1000)}
 loop();return true}catch(e){this.on=false;return false}},
stop:function(){this.on=false;clearTimeout(this.t);if(this.master){try{this.master.gain.value=0;this.master.disconnect()}catch(e){}}return true},
auto:function(cb){var self=this,ev=['pointerdown','keydown','touchstart'];function off(){ev.forEach(function(e){removeEventListener(e,go,true)})}
 function go(){off();if(!self.on)self.start();cb&&cb()}
 try{var A=window.AudioContext||window.webkitAudioContext;if(!A)return;this.ctx=this.ctx||new A();if(this.ctx.state==='running'){this.start();cb&&cb();return}}catch(e){}
 ev.forEach(function(e){addEventListener(e,go,true)})}};
WM.bunting=function(box,cols){box.replaceChildren();for(var i=0;i<16;i++){var f=WM.el('span');f.style.setProperty('--c',cols[i%cols.length]);f.style.setProperty('--delay',(i%5)*.3+'s');box.appendChild(f)}};
document.addEventListener('DOMContentLoaded',function(){var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
 var bn=document.getElementById('bunting');if(bn&&!document.getElementById('st-welcome'))WM.bunting(bn,WM.THEMES.party.colors);var h=document.getElementById('heroDeco');if(h)WM.deco(h,'party',['balloons','sparkles']);
 var g=document.getElementById('themeGrid');if(g)Object.keys(WM.THEMES).forEach(function(id){var t=WM.THEMES[id],a=WM.el('a','tcard panel');a.href='create.html?theme='+id;WM.theme(a,id);
  a.appendChild(WM.el('strong','glow',t.name));a.appendChild(WM.el('span','',id==='romantic'?'With all my heart, happy birthday':'Happy Birthday!'));var s=WM.el('span','sw');t.colors.forEach(function(c){var d=WM.el('i');d.style.background=c;s.appendChild(d)});a.appendChild(s);a.setAttribute('aria-label','Use the '+t.name+' theme');g.appendChild(a)});
 var rv=document.querySelectorAll('.reveal');if('IntersectionObserver'in window&&!WM.reduced){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});rv.forEach(function(e){io.observe(e)})}else rv.forEach(function(e){e.classList.add('in')})});})();
