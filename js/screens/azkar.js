import {dhikrCats} from '../api.js';import {icon,toAr,esc,plain,empty,skel} from '../ui.js';
// Hub: quick sections, then every chapter of Hisn al-Muslim. Tiles = [chapters, label, icon]. Ranges/lists are fetched together.
const TILES=[['27','الصباح والمساء','sun'],['25','بعد الصلاة','check'],['28','النوم','moon'],['1','الاستيقاظ','sun'],['34-35','الكرب والهمّ','heart'],['129-130','الاستغفار','repeat'],['38,39,45,48,88,128','الحماية','info'],['96-105','السفر','compass'],['69-76','الطعام والشراب','book'],['12-14','المسجد','home'],['10-11','المنزل','home'],['115-121','الحج والعمرة','compass']];
export default async function render(el){
 el.innerHTML=`<div class="tgrid">${TILES.map(([id,t,i])=>`<a class="tg" href="#/dhikr/${id}/${encodeURIComponent(t)}"><span class="qi">${icon(i,22)}</span>${t}</a>`).join('')}</div>
 <div class="row" style="margin-bottom:12px"><a class="card tap grow row" style="margin:0" href="#/duas">${icon('heart',22)}<b>الأدعية من القرآن</b></a><a class="card tap grow row" style="margin:0" href="#/tasbih">${icon('beads',22)}<b>المسبحة</b></a></div>
 <a class="card tap row" href="#/bookmarks">${icon('bookmark',22)}<div class="grow"><b>مفضّلتي</b><div class="sub">الأذكار والأدعية التي حفظتها</div></div>${icon('chevL',18)}</a>
 <div class="sec"><h3>جميع الأبواب</h3></div><label class="field">${icon('search',20)}<input id="q" type="search" placeholder="ابحث في أبواب الأذكار" autocomplete="off"></label><div id="l" class="list">${skel(3)}</div>`;
 let cats=[];const l=el.querySelector('#l');
 const draw=()=>{const q=plain(el.querySelector('#q').value.trim());
  l.innerHTML=cats.filter(c=>!q||plain(c.ar||'').includes(q)).map(c=>`<a class="item" href="#/dhikr/${c.number}"><div class="num">${toAr(c.number)}</div><div class="grow"><b>${esc(c.ar||c.en)}</b><div class="sub">${toAr(c.count)} ${c.count>10?'ذكرًا':'أذكار'}</div></div>${icon('chevL',18)}</a>`).join('')||empty('search','لا توجد نتائج')};
 try{cats=await dhikrCats();draw();el.querySelector('#q').oninput=draw}
 catch{l.innerHTML=empty('alert','تعذّر تحميل الأبواب','تحتاج إنترنت أول مرة. يمكنك تحميلها للعمل بدون إنترنت من شاشة التحميلات.')}
}
