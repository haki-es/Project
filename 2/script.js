/* ================= EDIT DI SINI ================= */
const CONFIG = {
  name: "Sayang",
  from: "orang favoritmu",
  audio: "audio/lagu.mp3",
  video: {
    src: "video/video.mp4",
    poster: "images/poster.jpg",
    caption: "Tulis kalimat singkat tentang videonya di sini."
  },
  letter: [
    "Untuk seseorang yang mungkin tidak menyangka akan menemukan surat seperti ini...",
    "Kehadiranmu punya tempat yang berbeda dalam hidupku. Hal-hal kecil tentangmu terlihat sederhana, tapi justru itu yang paling sering kuingat.",
    "Terima kasih untuk setiap percakapan, tawa, dan waktu yang kita bagi. Hari biasa pun terasa lebih berarti kalau ada kamu.",
    "Aku tidak tahu cerita kita akan sejauh apa. Tapi sekarang, aku ingin menikmati tiap halaman yang kita tulis bersama.",
    "Terima kasih sudah menjadi bagian dari ceritaku."
  ],
  memories: [
    ["images/foto1.jpg","Tanggal / momen","Cerita singkat foto pertama."],
    ["images/foto2.jpg","Tanggal / momen","Cerita singkat foto kedua."],
    ["images/foto3.jpg","Tanggal / momen","Cerita singkat foto ketiga."],
    ["images/foto4.jpg","Tanggal / momen","Cerita singkat foto keempat."],
    ["images/foto5.jpg","Tanggal / momen","Cerita singkat foto kelima."],
    ["images/foto6.jpg","Tanggal / momen","Cerita singkat foto keenam."],
    ["images/foto7.jpg","Tanggal / momen","Cerita singkat foto ketujuh."],
    ["images/foto8.jpg","Tanggal / momen","Cerita singkat foto kedelapan."],
    ["images/foto9.jpg","Tanggal / momen","Cerita singkat foto kesembilan."],
    ["images/foto10.jpg","Tanggal / momen","Cerita singkat foto kesepuluh."]
  ],
  final: [
    "Kalau cerita ini sebuah buku, aku belum mau menutupnya.",
    "Masih banyak hari biasa yang ingin kujalani bersamamu, banyak tempat yang ingin kita datangi, dan banyak cerita yang belum kita tulis."
  ]
};
/* ================================================= */

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ORDER=["s1","s2","s3","s4","s5"];

/* ---------- Canvas: bintang, hati, ledakan ---------- */
const cv=$("#bg"),cx=cv.getContext("2d");let W,H,D,mx=0,my=0;
const rs=()=>{D=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*D;H=cv.height=innerHeight*D};
addEventListener("resize",rs);rs();
const stars=Array.from({length:140},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.3+.3,p:Math.random()*6,z:Math.random()}));
const mkH=r=>({x:Math.random(),y:r?Math.random():1.1,s:10+Math.random()*18,v:.00012+Math.random()*.0003,w:Math.random()*6,a:.12+Math.random()*.3});
const hearts=Array.from({length:16},()=>mkH(true));
let bursts=[];
function burst(x,y,n=60){const c=["#ff7aa8","#f3d9a4","#ffffff","#c9a7ff"];
  for(let i=0;i<n;i++){const a=Math.random()*6.28,s=2+Math.random()*7;bursts.push({x:x*D,y:y*D,vx:Math.cos(a)*s*D,vy:(Math.sin(a)*s-2)*D,l:1,c:c[i%4],s:(8+Math.random()*14)*D,h:Math.random()<.6})}}
addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
addEventListener("pointerdown",e=>{if(!e.target.closest("button,.heart,.envelope,.track"))burst(e.clientX,e.clientY,14)});
(function loop(t){
  cx.clearRect(0,0,W,H);
  stars.forEach(s=>{const a=.35+.65*Math.abs(Math.sin(t/1200+s.p));cx.fillStyle=`rgba(255,240,245,${a*(.4+s.z*.6)})`;
    cx.beginPath();cx.arc((s.x+mx*.03*s.z)*W,(s.y+my*.03*s.z)*H,s.r*D,0,6.28);cx.fill()});
  cx.textAlign="center";
  hearts.forEach((h,i)=>{h.y-=h.v*16;if(h.y<-.1)hearts[i]=mkH(false);
    cx.font=h.s*D+"px serif";cx.fillStyle=`rgba(255,122,168,${h.a})`;cx.fillText("♥",(h.x+Math.sin(t/1800+h.w)*.02)*W,h.y*H)});
  bursts=bursts.filter(b=>b.l>0);
  bursts.forEach(b=>{b.x+=b.vx;b.y+=b.vy;b.vy+=.12*D;b.vx*=.985;b.l-=.012;cx.globalAlpha=Math.max(b.l,0);cx.fillStyle=b.c;
    if(b.h){cx.font=b.s+"px serif";cx.fillText("♥",b.x,b.y)}else{cx.beginPath();cx.arc(b.x,b.y,b.s/6,0,6.28);cx.fill()}});
  cx.globalAlpha=1;requestAnimationFrame(loop)})(0);

/* ---------- Isi konten ---------- */
$$("[data-name]").forEach(e=>e.textContent=CONFIG.name);
$("#from").textContent=CONFIG.from;
$("#letter").innerHTML=CONFIG.letter.map(t=>`<p class="rv rv-p">${esc(t)}</p>`).join("");
$("#final").innerHTML=CONFIG.final.map(t=>`<p>${esc(t)}</p>`).join("");
$("#tot").textContent=CONFIG.memories.length;
$("#track").innerHTML=CONFIG.memories.map((m,i)=>`<article class="card"><div class="ph"><img src="${esc(m[0])}" alt="Kenangan ${i+1}" loading="lazy" onerror="this.remove()"><span>Foto ${i+1}</span></div><time>${esc(m[1])}</time><p>${esc(m[2])}</p></article>`).join("");
$("#dots").innerHTML=ORDER.map(()=>"<i></i>").join("");
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

/* ---------- Navigasi ---------- */
function go(id){
  $$(".scene").forEach(s=>{s.classList.toggle("active",s.id===id);if(s.id===id)s.scrollTop=0});
  $$("#dots i").forEach((d,i)=>d.classList.toggle("on",ORDER[i]===id));
  if(id!=="s4")vid.pause();
  if(id!=="s1")playMusic();
  setTimeout(()=>{$$("#"+id+" .rv").forEach(e=>io.observe(e));if(id==="s3")tilt()},100);
}
$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.2});
$("#dots i:first-child").classList.add("on");

/* ---------- Amplop ---------- */
const env=$("#env");let opened=false;
function openEnv(){if(opened)return;opened=true;env.classList.add("open");$("#hint").style.display="none";playMusic();
  setTimeout(()=>burst(innerWidth/2,innerHeight*.4,80),900);
  setTimeout(()=>{env.classList.add("gone");$("#after").classList.add("show")},2100)}
env.onclick=openEnv;env.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openEnv()}};

/* ---------- Galeri 3D ---------- */
const track=$("#track");
function tilt(){const c=track.getBoundingClientRect(),mid=c.left+c.width/2;let best=0,bd=1e9;
  [...track.children].forEach((el,i)=>{const r=el.getBoundingClientRect(),d=(r.left+r.width/2-mid)/c.width;
    el.style.transform=`rotateY(${-d*38}deg) scale(${1-Math.min(Math.abs(d),1)*.14})`;el.style.opacity=1-Math.min(Math.abs(d),1)*.5;
    if(Math.abs(d)<bd){bd=Math.abs(d);best=i}});$("#cur").textContent=best+1}
track.addEventListener("scroll",tilt,{passive:true});addEventListener("resize",tilt);

/* ---------- Musik + video (musik otomatis jeda saat video main) ---------- */
const bgm=$("#bgm"),vid=$("#vid"),mbtn=$("#musicBtn");let resume=false;
bgm.src=CONFIG.audio;bgm.volume=.8;
vid.src=CONFIG.video.src;vid.poster=CONFIG.video.poster;$("#vcap").textContent=CONFIG.video.caption;
function fade(to,ms,done){const from=bgm.volume,st=performance.now();
  (function f(t){const k=Math.min((t-st)/ms,1);bgm.volume=from+(to-from)*k;k<1?requestAnimationFrame(f):done&&done()})(st)}
function playMusic(){if(!vid.paused||userOff)return;bgm.play().catch(()=>{})}
let userOff=false;
mbtn.onclick=()=>{if(!vid.paused)return;if(bgm.paused){userOff=false;bgm.play().catch(()=>{})}else{userOff=true;bgm.pause()}};
bgm.onplay=()=>mbtn.classList.add("on");bgm.onpause=()=>mbtn.classList.remove("on");
vid.onplay=()=>{$("#bigplay").classList.add("hide");vid.controls=true;
  if(!bgm.paused){resume=true;fade(0,700,()=>{bgm.pause();bgm.volume=.8})}};
const back=()=>{if(resume){resume=false;bgm.volume=0;bgm.play().then(()=>fade(.8,1200)).catch(()=>{})}};
vid.onpause=back;vid.onended=()=>{back();$("#bigplay").classList.remove("hide")};
$("#bigplay").onclick=()=>vid.play();

/* ---------- Penutup ---------- */
$("#heart").onclick=e=>{const r=e.target.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,90)};
