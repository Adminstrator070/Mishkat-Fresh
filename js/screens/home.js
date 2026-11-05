import {surah,cut} from '../api.js';import {S,lastRead} from '../state.js';import {display} from '../auth.js';import {icon,toAr,esc} from '../ui.js';import {sname} from '../names.js';
const Q=[['library','book','القرآن'],['audio','headphones','الاستماع'],['azkar','beads','الأذكار'],['duas','heart','الأدعية'],['tafsir','note','التفسير'],['hifz','hifz','التحفيظ'],['recite','mic','التصحيح'],['prayer','clock','الصلاة'],['ramadan','moon','رمضان'],['qibla','compass','القبلة'],['search','search','البحث'],['bookmarks','bookmark','المحفوظات']];
const N=[['Fajr','الفجر'],['Dhuhr','الظهر'],['Asr','العصر'],['Maghrib','المغرب'],['Isha','العشاء']];
const mins=x=>{const [h,m]=x.slice(0,5).split(':');return +h*60+ +m};
const f12=x=>{const [h,m]=x.slice(0,5).split(':').map(Number);return `${toAr(h%12||12)}:${toAr(String(m).padStart(2,'0'))} ${h<12?'ص':'م'}`};
let tk;
export default async function render(el){
 clearInterval(tk);
 const now=new Date(),day=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
 let hij='';try{hij=new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura',{dateStyle:'full'}).format(now)}catch{}
 const pc=S.get('pcache',null),T=pc&&JSON.parse(pc.key)[2]===day?pc.t:null;
 const L=lastRead(),nm=display(),hf=S.get('hifz',[]).length,kh=S.get('khatma',[]).length;
 el.innerHTML=`<div class="hero"><div class="sub">${hij}</div><h2>السلام عليكم${nm&&nm!=='زائر'?'، '+esc(nm):''}</h2><a href="#/prayer" class="nextp" id="nxt"></a></div>
 ${L?`<a class="card row tap" href="#/read/${L.n}/${L.a}"><div class="num">${toAr(L.n)}</div><div class="grow"><b>أكمل القراءة</b><div class="sub">سورة ${sname(L.n)} • آية ${toAr(L.a)}</div></div>${icon('chevL',18)}</a>`:''}
 <div class="qgrid">${Q.map(([r,i,t])=>`<a href="#/${r}" class="q"><span class="qi">${icon(i,24)}</span><span>${t}</span></a>`).join('')}</div>
 <div id="vd"></div>
 <div class="stats"><a class="card" href="#/hifz"><div class="sub">الحفظ</div><b>${toAr(hf)} / ${toAr(114)}</b><div class="pb"><i style="width:${hf/114*100}%"></i></div></a><a class="card" href="#/ramadan"><div class="sub">الختمة</div><b>${toAr(kh)} / ${toAr(30)}</b><div class="pb"><i style="width:${kh/30*100}%"></i></div></a></div>`;
 const tick=()=>{const b=el.querySelector('#nxt');if(!b){clearInterval(tk);return}
  if(!T){b.innerHTML='<div><div class="sub">مواقيت الصلاة</div><b>حدّد موقعك لعرضها</b></div>'+icon('chevL',18);return}
  const d=new Date(),cur=d.getHours()*60+d.getMinutes();let k=N.find(([x])=>mins(T[x])>cur),add=0;if(!k){k=N[0];add=1440}
  const left=mins(T[k[0]])+add-cur;
  b.innerHTML=`<div><div class="sub">الصلاة القادمة</div><b>${k[1]}</b></div><div class="big">${f12(T[k[0]])}</div><div class="sub">بعد ${toAr(Math.floor(left/60))} س ${toAr(left%60)} د</div>`};
 tick();tk=setInterval(tick,30000);
 try{const doy=Math.floor((now-new Date(now.getFullYear(),0,0))/864e5),n=(doy*7)%114+1,[u]=await surah(n),a=u.ayahs[doy%u.ayahs.length],box=el.querySelector('#vd');
  if(box)box.innerHTML=`<a class="card tap" href="#/read/${n}/${a.numberInSurah}" style="display:block;border-color:var(--gold)"><div class="sub">آية اليوم</div><div class="quran tc" style="font-size:24px;line-height:2.1;text-align:center">${cut(n,a,a.text)} <span class="end">﴿${toAr(a.numberInSurah)}﴾</span></div><div class="sub tc">سورة ${sname(n)}</div></a>`}catch{}
}
