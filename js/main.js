import {CONTACT} from './utils.js';
const $=(s,c=document)=>[...c.querySelectorAll(s)];
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('[data-wa]').forEach(a=>a.href=CONTACT.whatsapp);$('[data-mail]').forEach(a=>a.href=CONTACT.email);$('[data-tt]').forEach(a=>a.href=CONTACT.tiktok);
// mobile menu (text button, no icon)
const m=$('#menu')[0],b=$('.burger')[0];
const setMenu=o=>{m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.textContent=o?'Close':'Menu';document.body.classList.toggle('lock',o)};
if(b){b.addEventListener('click',()=>setMenu(!m.classList.contains('open')));$('#menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('keydown',e=>e.key==='Escape'&&setMenu(false));matchMedia('(min-width:821px)').addEventListener('change',()=>setMenu(false))}
// header state + scroll progress
const nav=$('header.nav')[0],bar=$('.progress')[0];
const onScroll=()=>{const h=document.documentElement;nav.classList.toggle('scrolled',scrollY>30);bar.style.transform=`scaleX(${Math.min(1,scrollY/Math.max(1,h.scrollHeight-innerHeight))})`};
addEventListener('scroll',onScroll,{passive:true});onScroll();
// animations
if(window.gsap&&!calm){gsap.registerPlugin(ScrollTrigger);
 if(window.Lenis&&fine){const l=new Lenis();l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0)}
 const hero=$('.hero')[0];
 const h1=$('.hero h1')[0];if(h1){const wrap=(n,g)=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){f.append(t);return}const o=document.createElement('span');o.className='w';const i=document.createElement('span');i.textContent=t;if(g)i.className='grad-text';o.append(i);f.append(o)});c.replaceWith(f)}else{const gg=g||c.classList.contains('grad-text');c.classList.remove('grad-text');wrap(c,gg)}})};wrap(h1,false)}
 if(hero){const tl=gsap.timeline({delay:.8,defaults:{ease:'power3.out'}});
  tl.from('.hero h1 .w>span',{yPercent:115,duration:1,stagger:.07,ease:'power4.out'}).from('.hero .container>div:first-child>p',{y:30,opacity:0,duration:.8},'-=.7')
   .from('.hero .cta .btn',{y:24,opacity:0,stagger:.12,duration:.7},'-=.5').from('.hero .stats>div',{y:20,opacity:0,stagger:.1,duration:.6},'-=.4')
   .from('.figure img,.vip img',{scale:.88,opacity:0,duration:1.4},.2).from('.chip',{scale:0,opacity:0,stagger:.15,duration:.6,ease:'back.out(2)'},'-=.6')
   .add(()=>{gsap.to('.figure img,.vip img',{y:-12,repeat:-1,yoyo:true,duration:2.6,ease:'sine.inOut'});$('.chip').forEach((c,i)=>gsap.to(c,{y:i%2?10:-10,repeat:-1,yoyo:true,duration:2+i*.4,ease:'sine.inOut'}))});
  gsap.to('.figure,.vip',{yPercent:-6,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}})}
 const rv='.card,.pane,section h2,.marquee,.showcase .sub';gsap.set(rv,{opacity:0,y:40});
 ScrollTrigger.batch(rv,{start:'top 90%',once:true,onEnter:x=>gsap.to(x,{opacity:1,y:0,stagger:.12,duration:.9,ease:'power3.out',overwrite:true})});
 $('[data-count]').forEach(e=>{const n=+e.dataset.count,o={v:0};gsap.to(o,{v:n,duration:2,scrollTrigger:{trigger:e,start:'top 95%'},onUpdate:()=>e.textContent=Math.round(o.v)+'+'})});
 if(fine){
  $('.card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(c,{rotateY:x*8,rotateX:-y*8,transformPerspective:800,duration:.3})});c.addEventListener('mouseleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.5}))});
  $('.btn').forEach(t=>{t.addEventListener('mousemove',e=>{const r=t.getBoundingClientRect();gsap.to(t,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.3})});t.addEventListener('mouseleave',()=>gsap.to(t,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'}))})}
 addEventListener('load',()=>ScrollTrigger.refresh());
}
// custom cursor (desktop only)
if(fine){const d=$('.dot')[0],r=$('.ring')[0];let x=0,y=0,rx=0,ry=0;
 addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;d.style.transform=`translate(${x-4}px,${y-4}px)`});
 (function loop(){rx+=(x-rx)*.15;ry+=(y-ry)*.15;r.style.transform=`translate(${rx-r.offsetWidth/2}px,${ry-r.offsetHeight/2}px)`;requestAnimationFrame(loop)})();
 $('a,button,.card').forEach(e=>{e.addEventListener('mouseenter',()=>r.classList.add('big'));e.addEventListener('mouseleave',()=>r.classList.remove('big'))})}
// particles (lighter on phones)
const cv=$('#bg')[0];if(cv&&!calm){const c=cv.getContext('2d');let W,H,P=[];const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(fine?70:28,W/20)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))};rs();let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(rs,200)});
 (function f(){if(!document.hidden){c.clearRect(0,0,W,H);P.forEach((p,i)=>{p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H;c.fillStyle=i%5?'rgba(129,140,248,.8)':'rgba(245,185,66,.95)';c.fillRect(p.x,p.y,2,2);for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){c.strokeStyle=`rgba(99,102,241,${.2*(1-d/130)})`;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke()}}})}requestAnimationFrame(f)})()}
// contact form
const f=$('#contact-form')[0];if(f){f.addEventListener('submit',async e=>{e.preventDefault();let ok=true;$('.err',f).forEach(x=>x.remove());
 [...f.elements].filter(i=>i.required).forEach(i=>{const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));if(bad){ok=false;i.insertAdjacentHTML('afterend','<span class="err">Please enter a valid '+i.name+'.</span>')}});
 if(!ok)return;const s=$('#status')[0];s.textContent='Sending…';
 try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});s.textContent=r.ok?'Thanks! I will reply soon.':'Could not send. Please use WhatsApp.';if(r.ok)f.reset()}catch{s.textContent='Network error. Please use WhatsApp.'}})}

// back to top, VIP tilt, showcase parallax
const tt=$('.totop')[0];tt&&tt.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
if(window.gsap&&!calm){
 const vip=$('.vip')[0];if(vip&&fine){vip.addEventListener('mousemove',e=>{const r=vip.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to('.vip img',{rotateY:x*10,rotateX:-y*10,transformPerspective:900,duration:.5})});vip.addEventListener('mouseleave',()=>gsap.to('.vip img',{rotateX:0,rotateY:0,duration:.8}))}
 $('.pane img').forEach(im=>gsap.fromTo(im,{yPercent:8},{yPercent:0,ease:'none',scrollTrigger:{trigger:im.closest('.pane'),start:'top bottom',end:'center center',scrub:true}}));
}
