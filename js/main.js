import {CONTACT} from './utils.js';
const $=(s,c=document)=>[...c.querySelectorAll(s)];
$('[data-wa]').forEach(a=>a.href=CONTACT.whatsapp);$('[data-mail]').forEach(a=>a.href=CONTACT.email);$('[data-tt]').forEach(a=>a.href=CONTACT.tiktok);
const m=$('#menu')[0],b=$('.burger')[0];b&&b.addEventListener('click',()=>{m.classList.toggle('open');b.setAttribute('aria-expanded',m.classList.contains('open'))});
$('#menu a').forEach(a=>a.addEventListener('click',()=>m.classList.remove('open')));
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(window.gsap&&!calm){gsap.registerPlugin(ScrollTrigger);
 if(window.Lenis){const l=new Lenis();l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0)}
 gsap.from('.hero h1,.hero p,.hero .cta',{y:50,opacity:0,stagger:.15,duration:1,ease:'power3.out'});
 gsap.to('.figure img',{y:-14,repeat:-1,yoyo:true,duration:2.4,ease:'sine.inOut'});
 $('.chip').forEach((c,i)=>gsap.to(c,{y:i%2?12:-12,repeat:-1,yoyo:true,duration:2+i*.4,ease:'sine.inOut'}));
 $('.card').forEach(c=>gsap.from(c,{scrollTrigger:{trigger:c,start:'top 88%'},y:40,opacity:0,duration:.8}));
 $('[data-count]').forEach(e=>{const n=+e.dataset.count,o={v:0};gsap.to(o,{v:n,duration:2,scrollTrigger:{trigger:e,start:'top 90%'},onUpdate:()=>e.textContent=Math.round(o.v)+'+'})});
 $('.card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(c,{rotateY:x*8,rotateX:-y*8,transformPerspective:800,duration:.3})});c.addEventListener('mouseleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.5}))});
}
// custom cursor
if(matchMedia('(hover:hover) and (pointer:fine)').matches){const d=$('.dot')[0],r=$('.ring')[0];let x=0,y=0,rx=0,ry=0;
 addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;d.style.transform=`translate(${x-4}px,${y-4}px)`});
 (function loop(){rx+=(x-rx)*.15;ry+=(y-ry)*.15;r.style.transform=`translate(${rx-r.offsetWidth/2}px,${ry-r.offsetHeight/2}px)`;requestAnimationFrame(loop)})();
 $('a,button,.card').forEach(e=>{e.addEventListener('mouseenter',()=>r.classList.add('big'));e.addEventListener('mouseleave',()=>r.classList.remove('big'))})}
// particles
const cv=$('#bg')[0];if(cv&&!calm){const c=cv.getContext('2d');let W,H,P=[];const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(70,W/20)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))};rs();addEventListener('resize',rs);
 (function f(){c.clearRect(0,0,W,H);P.forEach((p,i)=>{p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H;c.fillStyle='rgba(99,102,241,.8)';c.fillRect(p.x,p.y,2,2);for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){c.strokeStyle=`rgba(99,102,241,${.18*(1-d/130)})`;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke()}}});requestAnimationFrame(f)})()}
// form validation + send (Formspree: replace FORM_ID)
const f=$('#contact-form')[0];if(f){f.addEventListener('submit',async e=>{e.preventDefault();let ok=true;
 $('.err',f).forEach(x=>x.remove());
 [...f.elements].filter(i=>i.required).forEach(i=>{const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));if(bad){ok=false;i.insertAdjacentHTML('afterend','<span class="err">Please enter a valid '+i.name+'.</span>')}});
 if(!ok)return;const s=$('#status')[0];s.textContent='Sending…';
 try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});s.textContent=r.ok?'Thanks! I will reply soon.':'Could not send. Please use WhatsApp.';if(r.ok)f.reset()}catch{s.textContent='Network error. Please use WhatsApp.'}})}
