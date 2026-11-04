(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var hd=$('#hd'),nv=$('#nv'),bg=$('#bg');
function sc(){hd.classList.toggle('on',scrollY>40);var b=$('#art');if(b&&scrollY<innerHeight)b.style.translate='0 '+(scrollY*.25)+'px'}
addEventListener('scroll',sc,{passive:true});sc();
bg.onclick=function(){nv.classList.toggle('open')};
$$('a',nv).forEach(function(a){a.onclick=function(){nv.classList.remove('open')}});
/* reveal */
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
$$('.rv').forEach(function(e){io.observe(e)});
/* embers + mist */
var cv=$('#cv'),cx=cv.getContext('2d'),P=[],W,H,dpr=Math.min(devicePixelRatio||1,2);
function rs(){W=cv.width=cv.clientWidth*dpr;H=cv.height=cv.clientHeight*dpr}
rs();addEventListener('resize',rs);
function np(i){return{x:Math.random()*W,y:i?Math.random()*H:H+20,r:(Math.random()*2+.6)*dpr,v:(Math.random()*.7+.25)*dpr,d:Math.random()*6.28,c:Math.random()<.18?'217,50,43':'232,194,122',a:Math.random()*.7+.3}}
var N=innerWidth<700?45:90;for(var i=0;i<N;i++)P.push(np(1));
var fog=[];for(i=0;i<5;i++)fog.push({x:Math.random()*W,y:H*(.55+Math.random()*.4),r:(220+Math.random()*260)*dpr,s:(Math.random()*.25+.08)*dpr*(i%2?-1:1)});
var run=true;new IntersectionObserver(function(e){run=e[0].isIntersecting}).observe(cv);
function fr(){if(run){cx.clearRect(0,0,W,H);
fog.forEach(function(f){f.x+=f.s;if(f.x>W+f.r)f.x=-f.r;if(f.x<-f.r)f.x=W+f.r;var g=cx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);g.addColorStop(0,'rgba(190,200,215,.10)');g.addColorStop(1,'rgba(190,200,215,0)');cx.fillStyle=g;cx.fillRect(f.x-f.r,f.y-f.r,f.r*2,f.r*2)});
P.forEach(function(p,j){p.y-=p.v;p.d+=.02;p.x+=Math.sin(p.d)*.6*dpr;if(p.y<-20)P[j]=np(0);cx.beginPath();cx.fillStyle='rgba('+p.c+','+p.a*Math.min(1,p.y/(H*.5))+')';cx.shadowColor='rgba('+p.c+',.9)';cx.shadowBlur=8*dpr;cx.arc(p.x,p.y,p.r,0,6.28);cx.fill()});cx.shadowBlur=0}
requestAnimationFrame(fr)}fr();
/* gallery + catalog */
var imgs=$$('#gal img');
$$('.cc').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
$$('[data-topic]').forEach(function(a){a.addEventListener('click',function(){var s=$('#fi');for(var i=0;i<s.options.length;i++)if(s.options[i].text===a.getAttribute('data-topic'))s.selectedIndex=i})});
$('#rqf').addEventListener('submit',function(e){e.preventDefault();var f=e.target,v=function(n){return f.elements[n].value.trim()};
if(!v('ph')){$('#ok').textContent='Укажите телефон, чтобы мы могли перезвонить.';f.elements.ph.focus();return}
var b='Имя: '+v('nm')+'\nТелефон: '+v('ph')+'\nАвтомобиль: '+v('car')+'\nИнтересует: '+v('it')+'\nЦель, бюджет, сроки: '+v('msg');
location.href='mailto:FourExpedition@yandex.ru?subject='+encodeURIComponent('Заявка с сайта: '+v('it'))+'&body='+encodeURIComponent(b);
$('#ok').textContent='Открываем почту с готовым письмом. Если не открылась, позвоните +7 995 315 2112.'});
/* lightbox */
var lb=$('#lb'),li=$('#li'),k=0;
function show(n){k=(n+imgs.length)%imgs.length;li.style.opacity=0;setTimeout(function(){li.src=imgs[k].src;li.alt=imgs[k].alt;li.style.opacity=1},120);$('#lc').textContent=imgs[k].alt+' · '+(k+1)+'/'+imgs.length}
function op(n){lb.classList.add('on');document.body.style.overflow='hidden';show(n)}
function cl(){lb.classList.remove('on');document.body.style.overflow=''}
imgs.forEach(function(m,i){var f=m.parentNode;f.onclick=function(){op(i)};f.onkeydown=function(e){if(e.key==='Enter')op(i)}});
$('.x',lb).onclick=cl;$('.p',lb).onclick=function(){show(k-1)};$('.n',lb).onclick=function(){show(k+1)};
lb.onclick=function(e){if(e.target===lb)cl()};
addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')cl();if(e.key==='ArrowLeft')show(k-1);if(e.key==='ArrowRight')show(k+1)});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(k+(d<0?1:-1))});
})();
