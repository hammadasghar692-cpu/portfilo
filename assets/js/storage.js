/* Self-contained share links: config -> JSON -> UTF-8 -> Base64URL in ?d= . Not encrypted, not stored on any server. */
(function(){var WM=window.WM=window.WM||{};
var L=WM.LIMITS={name:40,msg:300,rel:30,ps:150,url:3000};
var strip=function(s,n,nl){s=String(s==null?'':s).replace(nl?/[\u0000-\u0009\u000B-\u001F\u007F]/g:/[\u0000-\u001F\u007F]/g,' ');return s.trim().slice(0,n)};
WM.validDate=function(s){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');if(!m)return false;var d=new Date(+m[1],m[2]-1,+m[3]);return d.getFullYear()==+m[1]&&d.getMonth()==m[2]-1&&d.getDate()==+m[3]};
WM.fmtDate=function(s){var p=s.split('-');return new Date(+p[0],p[1]-1,+p[2]).toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})};
WM.clean=function(r){if(!r||typeof r!=='object')return null;
 var c={from:strip(r.f,L.name),to:strip(r.t,L.name),msg:strip(r.m,L.msg,true),theme:WM.THEMES[r.th]?r.th:'party',
 anims:Array.isArray(r.a)?WM.ANIMS.filter(function(a){return r.a.indexOf(a)>-1}):['confetti','balloons'],
 rel:strip(r.r,L.rel),ps:strip(r.p,L.ps,true),tone:['heartfelt','fun','elegant'].indexOf(r.tn)>-1?r.tn:'heartfelt',date:WM.validDate(r.d)?r.d:'',schedule:false,music:r.mu===1};
 c.schedule=!!c.date&&r.s===1;return(c.from&&c.to)?c:null};
WM.encode=function(o){var b=new TextEncoder().encode(JSON.stringify(o)),s='';b.forEach(function(x){s+=String.fromCharCode(x)});return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
WM.decode=function(s){try{if(!s||s.length>L.url)return null;if(!/^[A-Za-z0-9_-]+$/.test(s))return null;s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';
 var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return WM.clean(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(u)))}catch(e){return null}};
WM.makeLink=function(c){var p={v:1,f:c.from,t:c.to,m:c.msg,th:c.theme,a:c.anims,r:c.rel,p:c.ps,tn:c.tone,d:c.date,s:c.schedule?1:0,mu:c.music?1:0};
 var u=new URL('surprise.html',location.href);u.search=new URLSearchParams({d:WM.encode(p)}).toString();u.hash='';var h=u.toString();
 if(h.length>L.url)throw new Error('Link is '+h.length+' characters; the limit is '+L.url+'. Shorten the message or names.');return h};
WM.readLink=function(){try{return WM.decode(new URLSearchParams(location.search).get('d'))}catch(e){return null}};})();
