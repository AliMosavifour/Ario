(function(){
document.documentElement.setAttribute('dir',EN?'ltr':'rtl');
document.documentElement.setAttribute('lang',EN?'en':'fa');
(function(){var r=document.getElementById('root');if(r){r.setAttribute('dir',EN?'ltr':'rtl');r.setAttribute('lang',EN?'en':'fa')}})();
__dom(document.body);

/* ---------- helpers ---------- */
var $=function(s){return document.querySelector(s)};
var fa=function(v){return EN?String(v):String(v).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})};
var PCT=EN?'%':'٪',CMA=EN?', ':'، ';
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var pad=function(n){return String(n).padStart(2,'0')};
var key=function(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
var parse=function(k){var p=k.split('-').map(Number);return new Date(p[0],p[1]-1,p[2])};
var addDays=function(k,n){var d=parse(k);d.setDate(d.getDate()+n);return key(d)};
var todayKey=function(){return key(new Date())};
function mk(o){if(EN)return new Intl.DateTimeFormat('en-US',o);try{return new Intl.DateTimeFormat('fa-IR-u-ca-persian',o)}catch(e){return new Intl.DateTimeFormat('fa-IR',o)}}
var F={long:mk({weekday:'long',day:'numeric',month:'long'}),day:mk({day:'numeric'}),month:mk({month:'long',year:'numeric'}),short:mk({day:'numeric',month:'short'})};
var WK=[(__("ی")),(__("د")),(__("س")),(__("چ")),(__("پ")),(__("ج")),(__("ش"))];
function relDate(k){var td=todayKey();if(k===td)return (__("امروز"));if(k===addDays(td,1))return (__("فردا"));if(k===addDays(td,-1))return (__("دیروز"));return F.short.format(parse(k))}
/* first day of the week as a getDay() value: Saturday (6) in Persian, Sunday (0) in English */
var WS=EN?0:6;
function weekStart(k){var d=parse(k);return addDays(k,-((d.getDay()-WS+7)%7))}
function wkLead(d){return (d.getDay()-WS+7)%7}
function isWkend(dw){return EN?(dw===0||dw===6):dw===5}
function wkHead(){var a=[],i;for(i=0;i<7;i++)a.push(WK[(WS+i)%7]);return a}
var uidn=0;function uid(){uidn++;return Math.random().toString(36).slice(2,8)+Date.now().toString(36)+uidn}

/* ---------- data ---------- */
var CATS=[
  {id:'work',n:EN?'Work':'کار',i:'briefcase',c:'--c-work'},
  {id:'home',n:EN?'Personal':'شخصی',i:'home',c:'--c-home'},
  {id:'study',n:EN?'Study':'مطالعه',i:'book',c:'--c-study'},
  {id:'shop',n:EN?'Shopping':'خرید',i:'cart',c:'--c-shop'},
  {id:'health',n:EN?'Health':'سلامت',i:'heart',c:'--c-health'}
];
var PRI=[{v:0,n:__('عادی')},{v:1,n:__('مهم')},{v:2,n:__('فوری')}];
var ICONS=['briefcase','home','book','cart','heart','star','gift','coffee','plane','wallet','bulb','music','car','leaf','dumbbell','paw','phone','laptop','camera','game','pill','medical','shirt','food','bike','tools','cap','moon','bolt','bag','diamond','target','chat','calendar','bus','palette','globe','key','shield'];
var cat=function(id){return CATS.find(function(c){return c.id===id})||CATS[0]};
function cvar(c){c=String(c);return /^#[0-9a-fA-F]{3,8}$/.test(c)?c:(/^--[a-z-]+$/.test(c)?'var('+c+')':'#0a7aff')}
function defCat(){return CATS.some(function(c){return c.id==='home'})?'home':CATS[0].id}
function setCats(a){
  var ok=a.filter(function(c){return c&&c.id&&c.n&&ICONS.indexOf(c.i)>-1&&c.c}).map(function(c){return {id:String(c.id).replace(/[^\w-]/g,''),n:String(c.n).replace(/[<>&"']/g,'').slice(0,20),i:c.i,c:String(c.c)}}).filter(function(c){return c.id&&c.n});
  if(!ok.length)return;
  CATS.length=0;ok.forEach(function(c){CATS.push(c)});
}

function sample(){
  var t=todayKey(),n=0;
  var m=function(x){n++;return Object.assign({id:uid(),done:false,doneAt:0,ts:Date.now()+n,n:'',tm:'',p:0,c:'home',s:1},x)};
  return [
    m({t:(__("مرور گزارش هفتگی تیم")),d:t,tm:'10:00',c:'work',p:1}),
    m({t:(__("جلسه هماهنگی پروژه")),d:t,tm:'14:30',c:'work'}),
    m({t:(__("ورزش سی دقیقه‌ای")),d:t,tm:'18:30',c:'health'}),
    m({t:(__("خرید نان و میوه")),d:t,c:'shop',done:true,doneAt:Date.now()}),
    m({t:(__("ارسال یادداشت‌های جلسه")),d:addDays(t,-1),c:'work',p:2}),
    m({t:(__("خواندن فصل سوم کتاب")),d:addDays(t,1),tm:'20:00',c:'study'}),
    m({t:(__("تماس با خانواده")),d:addDays(t,2),c:'home'}),
    m({t:(__("ثبت‌نام دوره زبان")),c:'study',p:1})
  ];
}

var LS='barnameyar.v1';
var APP={ver:'1.0',date:'2026-10-13',author:(__("سید علی موسوی والا"))};
function readCache(){try{var j=JSON.parse(localStorage.getItem(LS));return j&&Array.isArray(j.tasks)?j:null}catch(e){return null}}
function writeCache(){try{localStorage.setItem(LS,JSON.stringify({tasks:state.tasks,profile:state.profile,cats:CATS,hist:state.hist,notifs:state.notifs,nseen:state.nseen}))}catch(e){}}

function cleanNotifs(a){
  if(!Array.isArray(a))return [];
  return a.filter(function(n){return n&&typeof n.id==='string'&&typeof n.t==='string'&&typeof n.m==='string'&&Number(n.ts)>0}).slice(0,60).map(function(n){return {id:n.id.slice(0,24),ts:Number(n.ts),k:String(n.k||'info').replace(/[^a-z]/g,'').slice(0,8)||'info',t:n.t.slice(0,60),m:n.m.slice(0,200),c:Math.max(1,Math.min(999,Math.floor(Number(n.c))||1))}});
}
/*RK-ENGINE-START*/
/* ---------- Konkooria: rank estimation (تخمین رتبه) ---------- */
/* Lessons + approximate coefficients per group. The curve and candidate counts are APPROXIMATE and editable (settings sheet). */
var RK_G={
  tj:{n:'تجربی',N:340000,L:[['ادبیات',4],['عربی',2],['دین و زندگی',3],['زبان انگلیسی',2],['زمین‌شناسی',1],['ریاضی',3],['زیست‌شناسی',6],['فیزیک',3],['شیمی',4]]},
  ri:{n:'ریاضی',N:150000,L:[['ادبیات',2],['عربی',1],['دین و زندگی',2],['زبان انگلیسی',2],['ریاضی',6],['فیزیک',4],['شیمی',3]]},
  en:{n:'انسانی',N:210000,L:[['ادبیات',4],['عربی',3],['دین و زندگی',2],['زبان انگلیسی',2],['ریاضی و آمار',2],['علوم و فنون',2],['تاریخ و جغرافیا',3],['فلسفه و منطق',2],['اقتصاد',2],['علوم اجتماعی',2]]},
  ho:{n:'هنر',N:30000,L:[['ادبیات',2],['عربی',1],['دین و زندگی',2],['زبان انگلیسی',2],['ریاضی',1],['هنر عمومی',3],['دروس اختصاصی هنر',4]]},
  zb:{n:'زبان',N:35000,L:[['ادبیات',2],['عربی',1],['دین و زندگی',2],['زبان عمومی',2],['زبان تخصصی',8]]}
};
var RK_QS={'1':{n:'منطقه ۱',s:.2},'2':{n:'منطقه ۲',s:.25},'3':{n:'منطقه ۳',s:.55}};
var RK_SQ={'':{n:'ندارم (سهمیه‌ی منطقه)',s:0},i25:{n:'ایثارگران ۲۵٪',s:.04},i5:{n:'ایثارگران ۵٪',s:.012},ot:{n:'سهمیه‌ی خاص دیگر',s:.02}};
var RK_DF={easy:{n:'آسان',sh:5},mid:{n:'متوسط',sh:0},hard:{n:'سخت',sh:-5}};
var RK_YEARS=[1405,1406,1407];
/* percent -> share of candidates scoring higher (log-interpolated) */
var RK_CURVE=[[-33,.999],[-10,.97],[0,.85],[5,.66],[10,.47],[15,.34],[20,.25],[30,.13],[40,.062],[50,.028],[60,.011],[70,.0038],[80,.0011],[90,.0003],[100,.00004]];
/* sample fields with approximate cut-off ranks (in-quota); only an orientation table */
var RK_U={
  tj:[['پزشکی (دانشگاه‌های برتر)',700],['پزشکی (دانشگاه‌های میانی)',2200],['پزشکی (سایر دانشگاه‌ها)',4500],['دندانپزشکی',3500],['داروسازی',5000],['فیزیوتراپی',9000],['علوم آزمایشگاهی',16000],['پرستاری',20000],['مامایی',24000],['هوشبری و اتاق عمل',30000],['بهداشت عمومی',45000],['زیست‌شناسی',60000]],
  ri:[['مهندسی کامپیوتر (دانشگاه‌های برتر)',500],['مهندسی برق (دانشگاه‌های برتر)',900],['مهندسی مکانیک (دانشگاه‌های برتر)',1300],['مهندسی کامپیوتر (میانی)',3000],['مهندسی صنایع',6000],['مهندسی عمران',9000],['مهندسی شیمی',12000],['مهندسی معماری',9000],['ریاضی و آمار',20000],['فیزیک',30000]],
  en:[['حقوق (دانشگاه‌های برتر)',500],['روان‌شناسی',1500],['مدیریت',3500],['اقتصاد',4000],['علوم سیاسی',7000],['جامعه‌شناسی',10000],['علوم تربیتی',14000],['مشاوره',18000],['تاریخ و باستان‌شناسی',25000]],
  ho:[['معماری',900],['طراحی صنعتی',1500],['شهرسازی',2500],['نقاشی و گرافیک',3500],['سینما و نمایش',5000]],
  zb:[['مترجمی زبان انگلیسی',900],['ادبیات انگلیسی',2000],['آموزش زبان انگلیسی',4000],['زبان‌های خارجی دیگر',8000]]
};
function rkCurve(P){
  var c=RK_CURVE,i;
  if(P<=c[0][0])return c[0][1];
  if(P>=c[c.length-1][0])return c[c.length-1][1];
  for(i=1;i<c.length;i++)if(P<=c[i][0]){
    var a=c[i-1],b=c[i],t=(P-a[0])/(b[0]-a[0]);
    return Math.exp(Math.log(a[1])+t*(Math.log(b[1])-Math.log(a[1])));
  }
  return c[c.length-1][1];
}
function rkCfgN(g){var c=rkD().cfg.N[g];return c>0?c:RK_G[g].N}
function rkCfgQ(rg){var c=rkD().cfg.qs[rg];return c>0?c:RK_QS[rg].s}
function rkNatRank(g,P){return Math.min(rkCfgN(g),Math.max(1,Math.round(rkCurve(P)*rkCfgN(g))))}
function rkQuotaShare(x){return x.sq&&RK_SQ[x.sq]?RK_SQ[x.sq].s:rkCfgQ(x.rg)}
function rkQuotaRank(x,P){return Math.max(1,Math.round(rkCurve(P)*rkCfgN(x.g)*rkQuotaShare(x)))}
function rkRound(r){if(r<20)return Math.max(1,Math.round(r));var p=Math.pow(10,Math.floor(Math.log10(r))-1);return Math.max(1,Math.round(r/p)*p)}
function rkFmt(n){return fa(String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'٬'))}
function rkNum(v,int){
  var s=String(v==null?'':v).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace(/[٫,،]/g,'.').replace(/[−–]/g,'-').replace(/[^0-9.\-]/g,'');
  if(s===''||s==='-'||s==='.')return null;
  var n=parseFloat(s);if(!isFinite(n))return null;
  return int?Math.round(n):n;
}
function rkSumCoef(g){return RK_G[g].L.reduce(function(a,l){return a+l[1]},0)}
function rkPct(x,l){
  if(x.mode==='cnt'){
    var c=x.cn[l];if(!c)return null;
    var t=c.c+c.w+c.n;if(!t)return null;
    return Math.max(-33.3,(3*c.c-c.w)/(3*t)*100);
  }
  var v=x.pc[l];return typeof v==='number'?v:null;
}
function rkComp(x){
  var s=0,w=0,n=0;
  RK_G[x.g].L.forEach(function(l){var p=rkPct(x,l[0]);if(p!==null){s+=p*l[1];w+=l[1];n++}});
  return w?{p:s/w,cov:w/rkSumCoef(x.g),n:n}:null;
}
function rkEst(x,exams){
  var cp=rkComp(x);if(!cp)return null;
  var arr=[cp.p+RK_DF[x.df].sh],ws=[.5,.3,.2],pool=[];
  (exams||[]).filter(function(e){return e.g===x.g&&e.id!==x.eid}).sort(function(a,b){return b.ts-a.ts}).slice(0,2).forEach(function(e){
    var c=rkComp(e);if(c){arr.push(c.p+RK_DF[e.df].sh);pool.push(e)}
  });
  var wsum=0,P=0,i;
  for(i=0;i<arr.length;i++){wsum+=ws[i];P+=ws[i]*arr[i]}
  P/=wsum;
  var mean=arr.reduce(function(a,b){return a+b},0)/arr.length;
  var sd=arr.length>1?Math.sqrt(arr.reduce(function(a,b){return a+(b-mean)*(b-mean)},0)/arr.length):0;
  var n=arr.length;
  var d=Math.max(2.5,5-Math.min(2,(n-1)*.7)+Math.min(3,sd*.4)+(cp.cov<.7?1:0)+(x.df==='mid'?0:.8));
  var conf=Math.round(Math.max(15,Math.min(72,30+Math.min(30,(n-1)*14)+(cp.cov>=.95?8:0)-Math.min(18,sd*2)-(cp.cov<.6?10:0))));
  var o=P+d,pp=P-d;
  return {cp:cp,P:P,d:d,n:n,sd:sd,conf:conf,
    nat:{o:rkNatRank(x.g,o),m:rkNatRank(x.g,P),p:rkNatRank(x.g,pp)},
    q:{o:rkQuotaRank(x,o),m:rkQuotaRank(x,P),p:rkQuotaRank(x,pp)}};
}
function rkConfLbl(c){return c<40?'کم':c<58?'متوسط':'خوب'}
function rkUni(x,e){
  var out={hi:[],mid:[],lo:[]};
  (RK_U[x.g]||[]).forEach(function(u){
    if(e.q.p<=u[1])out.hi.push(u[0]);
    else if(e.q.m<=u[1])out.mid.push(u[0]);
    else if(e.q.o<=u[1])out.lo.push(u[0]);
  });
  return out;
}
/* what +10 percent in one lesson is worth */
function rkLessons(x,e){
  var tot=rkSumCoef(x.g),rows=[];
  RK_G[x.g].L.forEach(function(l){
    var p=rkPct(x,l[0]);if(p===null)return;
    var g10=Math.min(10,100-p)*l[1]/tot,base=rkNatRank(x.g,e.P),up=rkNatRank(x.g,e.P+Math.max(0,g10));
    rows.push({n:l[0],c:l[1],p:p,gain:Math.max(0,base-up),pot:Math.max(0,100-p)*l[1]});
  });
  return rows;
}
/*RK-ENGINE-END*/
var RK_ALL={};Object.keys(RK_G).forEach(function(g){RK_G[g].L.forEach(function(l){RK_ALL[l[0]]=1})});
function rkOne(x){
  x=(x&&typeof x==='object')?x:{};
  var o={g:RK_G[x.g]?x.g:'tj',yr:RK_YEARS.indexOf(+x.yr)>-1?+x.yr:1406,rg:RK_QS[x.rg]?String(x.rg):'3',sq:RK_SQ[x.sq]?x.sq:'',ty:x.ty==='real'?'real':'mock',sy:x.sy==='old'?'old':'new',df:RK_DF[x.df]?x.df:'mid',mode:x.mode==='cnt'?'cnt':'pct',nm:String(x.nm||'').replace(/[<>&"']/g,'').slice(0,30),pc:{},cn:{},eid:String(x.eid||'').replace(/[^\w-]/g,'').slice(0,24),id:String(x.id||'').replace(/[^\w-]/g,'').slice(0,24),ts:Number(x.ts)||0};
  if(x.pc&&typeof x.pc==='object')Object.keys(x.pc).forEach(function(k){var v=x.pc[k];if(RK_ALL[k]&&typeof v==='number'&&v>=-34&&v<=100)o.pc[k]=Math.round(v*100)/100});
  if(x.cn&&typeof x.cn==='object')Object.keys(x.cn).forEach(function(k){
    var c=x.cn[k];if(!RK_ALL[k]||!c||typeof c!=='object')return;
    var a=Math.round(+c.c),b=Math.round(+c.w),z=Math.round(+c.n);
    if(a>=0&&a<=300&&b>=0&&b<=300&&z>=0&&z<=300)o.cn[k]={c:a,w:b,n:z};
  });
  return o;
}
function rkClean(k){
  var o={cur:rkOne(null),exams:[],cfg:{N:{},qs:{}}};
  if(!k||typeof k!=='object')return o;
  o.cur=rkOne(k.cur);o.cur.id='';o.cur.ts=0;
  if(Array.isArray(k.exams))o.exams=k.exams.map(rkOne).filter(function(e){return e.id&&e.ts>0}).slice(0,40);
  if(k.cfg&&typeof k.cfg==='object'){
    if(k.cfg.N&&typeof k.cfg.N==='object')Object.keys(RK_G).forEach(function(g){var v=Math.round(+k.cfg.N[g]);if(v>=1000&&v<=3000000)o.cfg.N[g]=v});
    if(k.cfg.qs&&typeof k.cfg.qs==='object')Object.keys(RK_QS).forEach(function(r){var v=+k.cfg.qs[r];if(v>=.01&&v<=.9)o.cfg.qs[r]=v});
  }
  return o;
}
/* ---------- Konkooria: textbooks (کتاب‌های درسی) = PDF library ----------
   profile.tbk = {pdfs:[{id,n:name,sz:bytes,pg:pages,lp:last page read (1-based),ad:added time}], imgs:[{id,n,w,h,ad}] (photos/scans; blobs live in IndexedDB 'ario_files')}
   The PDF files themselves stay in the app's private storage (native PdfViewer plugin); only this small list is saved and synced. */
function tbClean(k){
  var o={pdfs:[],imgs:[]};
  if(!k||typeof k!=='object')return o;
  var seen={};
  (Array.isArray(k.pdfs)?k.pdfs:[]).forEach(function(b){
    if(!b||typeof b!=='object'||typeof b.id!=='string'||!/^[a-z0-9]{6,32}$/.test(b.id)||seen[b.id])return;
    var n=String(b.n||'').replace(/[<>&"']/g,'').trim().slice(0,60);if(!n)return;
    var pg=Math.round(+b.pg);if(!(pg>=1&&pg<=99999))pg=1;
    var lp=Math.round(+b.lp);if(!(lp>=1&&lp<=pg))lp=1;
    var sz=Math.round(+b.sz);if(!(sz>=0))sz=0;
    var ad=Math.round(+b.ad);if(!(ad>0))ad=0;
    seen[b.id]=1;
    o.pdfs.push({id:b.id,n:n,sz:sz,pg:pg,lp:lp,ad:ad});
  });
  (Array.isArray(k.imgs)?k.imgs:[]).forEach(function(b){
    if(!b||typeof b!=='object'||typeof b.id!=='string'||!/^[a-z0-9]{6,32}$/.test(b.id)||seen[b.id])return;
    var n=String(b.n||'').replace(/[<>&"']/g,'').trim().slice(0,60);if(!n)return;
    var w=Math.round(+b.w),h=Math.round(+b.h),ad=Math.round(+b.ad);
    if(!(w>=1&&w<=20000))w=1;if(!(h>=1&&h<=20000))h=1;if(!(ad>0))ad=0;
    seen[b.id]=1;
    o.imgs.push({id:b.id,n:n,w:w,h:h,ad:ad});
  });
  o.pdfs=o.pdfs.slice(0,200);o.imgs=o.imgs.slice(0,300);
  return o;
}
var cached=readCache();
/* study-hours data (Konkooria tab): validated every time the profile is loaded, restored or synced */
function kkClean(k){
  var o={goal:240,subs:[],d:{}};
  if(!k||typeof k!=='object')return o;
  var g=Math.round(Number(k.goal));if(g>=15&&g<=1440)o.goal=g;
  if(Array.isArray(k.subs))o.subs=k.subs.map(function(x){return String(x).replace(/[<>&"']/g,'').trim().slice(0,16)}).filter(Boolean).slice(0,20);
  var tm=/^([01]\d|2[0-3]):[0-5]\d$/;
  if(k.d&&typeof k.d==='object')Object.keys(k.d).forEach(function(dk){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(dk)||!Array.isArray(k.d[dk]))return;
    var a=[];
    k.d[dk].forEach(function(x){
      if(!x||typeof x!=='object')return;
      var m=Math.round(Number(x.m));if(!(m>=1&&m<=1440))return;
      var ok=typeof x.a==='string'&&typeof x.b==='string'&&tm.test(x.a)&&tm.test(x.b);
      a.push({id:String(x.id||Math.random().toString(36).slice(2,10)).replace(/[^\w-]/g,'').slice(0,24)||Math.random().toString(36).slice(2,10),m:m,s:String(x.s||'').replace(/[<>&"']/g,'').slice(0,16),a:ok?x.a:'',b:ok?x.b:'',n:String(x.n||'').replace(/[<>&"']/g,'').slice(0,120),ts:Number(x.ts)||0});
    });
    if(a.length)o.d[dk]=a.slice(0,60);
  });
  return o;
}
/* saved daily reports: state.profile.rp = {'YYYY-MM-DD': {sp,cl,te,tc,cr,n,t,ts}}  (minutes, tests, tests-with-answer-key, correct, parts, form text) */
/* notification look settings: th = sys | light | dark | banner, bn = banner id ('' = same as the profile), rest = what to show */
function nsClean(x){
  var o={th:'sys',bn:'',time:true,cat:true,pri:true,list:true,name:true,focus:true};
  if(x&&typeof x==='object'){
    if(['sys','light','dark','banner'].indexOf(x.th)>-1)o.th=x.th;
    if(typeof x.bn==='string'&&/^[a-z]{0,12}$/.test(x.bn))o.bn=x.bn;
    ['time','cat','pri','list','name','focus'].forEach(function(k){if(x[k]===false)o[k]=false});
  }
  return o;
}
/* unfinished daily-report draft: {i: question index, a: answers, ph: ask|confirm, dk: day it was started} */
function rpdClean(x){
  if(!x||typeof x!=='object'||!x.a||typeof x.a!=='object')return null;
  var a={},n=0;
  Object.keys(x.a).forEach(function(k){
    if(!/^[a-z0-9]{1,6}$/.test(k)||n>80)return;
    var v=x.a[k];
    if(typeof v==='number'&&isFinite(v)){a[k]=v;n++}
    else if(typeof v==='string'){a[k]=v.slice(0,700);n++}
  });
  if(!n)return null;
  var i=Math.round(Number(x.i));
  return {i:i>=0&&i<100?i:0,a:a,ph:x.ph==='confirm'?'confirm':'ask',dk:/^\d{4}-\d{2}-\d{2}$/.test(x.dk||'')?x.dk:'',ts:Number(x.ts)||0};
}
function rpClean(r){
  var o={};if(!r||typeof r!=='object')return o;
  var ks=Object.keys(r).filter(function(k){return /^\d{4}-\d{2}-\d{2}$/.test(k)&&r[k]&&typeof r[k]==='object'}).sort().slice(-400);
  ks.forEach(function(k){
    var x=r[k];function nn(v,mx){v=Math.round(Number(v));return v>=0&&v<=mx?v:0}
    o[k]={sp:nn(x.sp,1440),cl:nn(x.cl,1440),te:nn(x.te,5000),tc:nn(x.tc,5000),cr:nn(x.cr,5000),n:nn(x.n,6),t:String(x.t||'').slice(0,9000),ts:Number(x.ts)||0};
  });
  return o;
}
function P(p){var o=Object.assign({},DEFP,p);o.rp=rpClean(o.rp);if(!o.sndv){o.sndv=1;o.sound=true}o.ttp=ttpClean(o.ttp);if(typeof o.ttCur!=='string')o.ttCur=null;o.kk=kkClean(o.kk);o.ns=nsClean(o.ns);o.rpd=rpdClean(o.rpd);o.rk=rkClean(o.rk);o.tbk=tbClean(o.tbk);o.kc=kcClean(o.kc);return o}
var DEFP={msum:'08:00',mev:'20:00',hbanner:true,sort:'auto',name:'',handle:'',hue:215,theme:'auto',showOver:true,fx:true,sound:true,sndv:0,photo:'',welcomed:false,goal:5,fgoal:60,notif:false,vip:false,vipSeen:false,email:'',via:'',banner:'auto',wrev:true,tt:null,ttp:[],ttCur:null,kk:null,rp:null,ns:null,rpd:null,rk:null,kc:null};
var state={tasks:cached?cached.tasks:sample(),profile:P(cached&&cached.profile),hist:(cached&&cached.hist)||null,notifs:cleanNotifs(cached&&cached.notifs),nseen:Number(cached&&cached.nseen)||0};
var ui={tab:'today',filter:'all',cat:null,day:todayKey(),loading:false,fcats:[],fpri:[],ftags:[],q:''};
var acctName='',userId=null,storeReadyRes,storeReady=new Promise(function(r){storeReadyRes=r});
var lastRing=0;
var find=function(id){return state.tasks.find(function(t){return t.id===id})};
function histInit(){
  if(state.hist&&typeof state.hist==='object')return;
  state.hist={};
  state.tasks.forEach(function(t){if(t.done&&t.doneAt&&!t.s){var k=key(new Date(t.doneAt));var h=state.hist[k]||(state.hist[k]={n:0,f:0});h.n++}});
}
function hBump(k,f,v){var h=state.hist[k]||(state.hist[k]={n:0,f:0});h[f]=Math.max(0,(h[f]||0)+v)}
if(cached&&Array.isArray(cached.cats))setCats(cached.cats);
histInit();

/* ---------- language switch (Persian <-> English); the app reloads so every text and layout is rebuilt ---------- */
function setLang(l){
  if((l!=='fa'&&l!=='en')||l===LANG)return;
  var map={work:['کار','Work'],home:['شخصی','Personal'],study:['مطالعه','Study'],shop:['خرید','Shopping'],health:['سلامت','Health']},i=l==='en'?1:0,j=1-i;
  CATS.forEach(function(c){var m=map[c.id];if(m&&c.n===m[j])c.n=m[i]});   /* only the built-in names; your own categories stay as typed */
  try{localStorage.setItem('barnameyar.lang',l)}catch(e){}
  try{writeCache()}catch(e){}
  try{persist()}catch(e){}
  setTimeout(function(){location.reload()},120);
}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-lang]');if(b){e.preventDefault();setLang(b.getAttribute('data-lang'))}});
if(EN){var kkTab=document.querySelector('.tab[data-tab="kk"]');if(kkTab)kkTab.remove()}   /* Konkooria (Iranian exam prep) is Persian-only */

/* ---------- persistence ---------- */
var dbDoc=null,dirty=false,saving=false,saveTimer=null,failedOnce=false;
function persist(){
  writeCache();dirty=true;
  if(typeof nativeSync==='function')setTimeout(nativeSync,0);
  if(typeof widgetSync==='function')widgetSync();
  clearTimeout(saveTimer);saveTimer=setTimeout(flush,350);
}
async function flush(){
  if(!dbDoc||saving||!dirty)return;
  saving=true;dirty=false;
  try{
    await dbDoc.set({v:3,tasks:state.tasks,profile:state.profile,cats:CATS,hist:state.hist,updated:Date.now()});
    failedOnce=false;
  }catch(e){
    if(!failedOnce){toast((__("ذخیره روی حساب انجام نشد؛ کارها روی همین دستگاه می‌مانند")),null,null,'warn');}
    failedOnce=true;
  }
  saving=false;
  if(dirty){clearTimeout(saveTimer);saveTimer=setTimeout(flush,350)}
}
function onRemote(snap){
  if(snap.metadata.hasPendingWrites)return;
  if(!snap.exists){
    if(state.tasks.some(function(t){return !t.s})){dirty=true}
    if(dirty)flush();
    return;
  }
  var d=snap.data(),rem=d&&d.tasks;
  if(!Array.isArray(rem))return;
  if(dirty||saving)return;
  var rp=d.profile,rc=Array.isArray(d.cats)?d.cats:null,rh=d.hist&&typeof d.hist==='object'?d.hist:null,kd=keepDone(rem);
  if(!kd&&JSON.stringify(rem)===JSON.stringify(state.tasks)&&(!rp||JSON.stringify(rp)===JSON.stringify(state.profile))&&(!rc||JSON.stringify(rc)===JSON.stringify(CATS))&&(!rh||JSON.stringify(rh)===JSON.stringify(state.hist)))return;
  state.tasks=rem;if(rp)state.profile=P(rp);
  if(rc)setCats(rc);if(rh)state.hist=rh;
  if(String(state.profile.name||'').trim()&&typeof wl!=='undefined'&&wl.el&&!wl.el.hidden)closeWelcome();
  applyTheme();writeCache();render();
  if(kd)persist();
}
(async function initStore(){
  try{
    if(!window.claude||!window.claude.use)return;
    var r=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    var db=r[0],user=r[1];
    if(!db||!user)return;
    var id=await user.id();
    if(!id)return;
    userId=id;
    try{var me=await user.me();if(me&&me.name){acctName=me.name;if(ui.tab==='account'&&!ui.loading)render()}}catch(e){}
    dbDoc=db.doc('data/users/'+id+'/planner');
    dbDoc.onSnapshot(onRemote,function(){dbDoc=null});
  }catch(e){}
  finally{storeReadyRes();setTimeout(function(){if(checkVip())persist();maybeWelcome()},900)}
})();

/* ---------- views ---------- */
function icon(n,c){return '<svg class="ic'+(n==='chev'?' chv0':'')+(c?' '+c:'')+'"><use href="#i-'+n+'"/></svg>'}
function byTime(a,b){return (a.tm||'99:99').localeCompare(b.tm||'99:99')}
var SORTS=[['auto',(__("پیش‌فرض (زمان)"))],['pri',(__("اولویت"))],['new',(__("جدیدترین"))],['az',(__("الفبا"))],['manual',(__("دستی"))]];
function ordKey(t){return t.o!=null?t.o:(t.ts||0)}
function cmpUser(a,b){
  var m=state.profile.sort;
  if(m==='pri')return b.p-a.p;
  if(m==='new')return (b.ts||0)-(a.ts||0);
  if(m==='az')return String(a.t).localeCompare(String(b.t),EN?'en':'fa');
  if(m==='manual')return ordKey(a)-ordKey(b);
  return 0;
}
function sortDay(arr){return arr.slice().sort(function(a,b){return (a.done-b.done)||cmpUser(a,b)||byTime(a,b)||(b.p-a.p)||((a.ts||0)-(b.ts||0))})}
function sortCat(arr){return arr.slice().sort(function(a,b){return (a.done-b.done)||cmpUser(a,b)||(a.d||'9999').localeCompare(b.d||'9999')||byTime(a,b)||(b.p-a.p)})}

function group(title,tasks,o){
  if(!tasks.length)return '';
  return '<section><h3 class="gh'+(o&&o.cls?' '+o.cls:'')+'"><span>'+title+'</span><span>'+fa(tasks.length)+'</span></h3><ul class="glass list">'+tasks.map(function(t){return rowHTML(t,o)}).join('')+'</ul></section>';
}
function seg(){
  var items=[['all',(__("همه"))],['open',(__("مانده","Open"))],['done',(__("انجام‌شده"))]];
  return ("<div class=\"seg\" role=\"group\" aria-label=\""+__("فیلتر کارها")+"\">")+items.map(function(i){return '<button type="button" data-act="filter" data-f="'+i[0]+'" aria-pressed="'+(ui.filter===i[0])+'">'+i[1]+'</button>'}).join('')+'</div>';
}
function head(sub,title,opt){
  opt=opt||{};
  return '<header class="head">'+bellBtn()+'<div class="ht">'+(opt.back?'<button type="button" class="back" data-act="'+(opt.backAct||'back')+'">'+icon('chev')+(opt.backTxt||(__("دسته‌ها")))+'</button>':'')+'<p class="sub">'+sub+'</p><h1>'+title+'</h1></div>'+(opt.right||'')+'</header>';
}
function empty(ic,h,p,btn){
  return '<div class="empty"><div class="badge">'+icon(ic)+'</div><h3>'+h+'</h3><p>'+p+'</p>'+(btn?'<button type="button" class="btn" data-act="add">'+icon('plus')+(__("افزودن کار")+"</button>"):'')+'</div>';
}

function quickBar(){
  return '<form class="qa glass" id="qaForm" autocomplete="off"><span class="qi2">'+icon('spark')+("</span><input id=\"qaIn\" type=\"text\" maxlength=\"200\" placeholder=\""+__("با یک جمله بنویس: فردا ساعت ۵ جلسه با علی #کار")+"\" aria-label=\""+__("افزودن سریع کار")+"\"><button type=\"button\" id=\"qaMic\" data-act=\"qaMic\" class=\"qmic\" aria-label=\""+__("گفتن با صدا")+"\">")+icon('mic')+("</button><button type=\"submit\" class=\"qsend\" aria-label=\""+__("افزودن")+"\">")+icon('plus')+'</button></form><div class="qprev" id="qaPrev"></div>';
}
/* mascot peeking over the top edge of the home banner (picture follows the profile avatar) */
var PKOV={av8:0.119,av7:0.133,av6:0.113,av10:0.124,av5:0.089,av4:0.148,av11:0.093,av1:0.24,av12:0.177,av9:0.106,av3:0.122,av2:0.136},PKH=104;
/* waving versions (pkw-*): overlap with the banner edge, per avatar. */
var PKW={av3:.112,av2:.14,av9:.107,av12:.177,av1:.082,av11:.092,av4:.148,av5:.089,av10:.124,av7:.133,av8:.117,av6:.108};
function pkChar(){
  var ph=state.profile.photo,id=(okPhoto(ph)&&canUse(ph))?ph:'av1';
  var h='<img class="hbpk" src="img/pk-'+id+'.webp" alt="" draggable="false" data-act="pkWave" style="--ov:'+Math.round(PKOV[id]*PKH)+'px">';
  if(PKW[id]!=null){var ov=PKW[id],H=Math.min(140,Math.round(96/(1-ov)));
    h+='<img class="hbpk hbpw" src="img/pkw-'+id+'.webp" alt="" aria-hidden="true" draggable="false" data-act="pkWave" style="--ov:'+Math.round(ov*H)+'px;--h:'+H+'px">'}
  return h;
}
/* tapping the character fades it into the waving picture; after 1.5 s it fades back */
var pkWaveT=0,pkFirst=true; /* the first time the home page shows after the app opens, the character rises and then waves; later visits only rise */
function pkWaveA(){
  var w=document.querySelector('.hbw');if(!w||!w.querySelector('.hbpw'))return;
  clearTimeout(pkWaveT);w.classList.add('wv');
  pkWaveT=setTimeout(function(){var g=document.querySelector('.hbw');if(g)g.classList.remove('wv')},1500);
}
function homeBanner(left){
  if(state.profile.hbanner===false)return '';
  return '<div class="hbw">'+pkChar()+'<section class="cover thin'+bnCls()+(isDark()?' dk':'')+("\" role=\"img\" aria-label=\""+__("بنر")+"\"><i class=\"cl\"></i><i class=\"cd\"></i><div class=\"hbt\"><b>"+__("سلام،")+" ")+esc(displayName())+'</b><span>'+(left>0?fa(left)+(" "+__("کار برای امروز مانده")):(__("کارهای امروز تمام شد 🎉")))+'</span></div></section></div>';
}
/* ---------- new characters ----------
   Every banner and every character has its own unique id. A banner opens the page of the character in its data-id,
   never "the current slide number", so the auto-rotation can't open the wrong character.
   price / salePrice (numbers, currency in `cur`) and paid:true are optional: nothing about price or buying is shown until they are filled in. */
var CHARS=[
  {id:'cow',btn:['#c8ff1a','#8fd400','#1d2600'],glow:['#d8bf94','#c8ff1a','#fff3c4'],name:'FROST',img:'ch-cow-f',back:'ch-cow-b',paid:true,price:100000,salePrice:99000,cur:(__("تومان"))},
  {id:'pink-bear',btn:['#ff2d86','#ff86bd','#ffffff'],glow:['#ff4f9a','#ffc2dd','#ff8a3d'],name:'LOVEX',img:'ch-bear-f',back:'ch-bear-b',paid:true,price:100000,salePrice:99000,cur:(__("تومان"))},
  {id:'black-bunny',btn:['#262b40','#8a93b5','#ffffff'],glow:['#e9ecf5','#6b7390','#ff2d55'],name:'NOX',img:'ch-bunny-f',back:'ch-bunny-b',paid:true,price:100000,salePrice:99000,cur:(__("تومان"))},
  {id:'masked',btn:['#a50f33','#ff3b5c','#ffffff'],glow:['#b3123a','#ff4d6d','#ffffff'],name:'RAVEN',img:'ch-mask-f',back:'ch-mask-b',paid:true,price:100000,salePrice:99000,cur:(__("تومان"))}
];
/* banners in display order; `to` is a character id, or 'all' for the group banner (opens the list of characters) */
var ADS=[{img:'ad1',to:'all',n:(__("همه‌ی کاراکترهای جدید"))},{img:'ad2',to:'cow'},{img:'ad3',to:'black-bunny'},{img:'ad4',to:'pink-bear'},{img:'ad5',to:'masked'}];
function charById(id){for(var i=0;i<CHARS.length;i++)if(CHARS[i].id===id)return CHARS[i];return null}
function adLabel(a){var c=charById(a.to);return c?(__("کاراکتر")+" ")+c.name:(a.n||(__("کاراکترها")))}

/* rotating character banners between the home banner and quick add: change every 2 s, last goes back to first */
var adIdx=0;
function adCarousel(){
  var h='';
  for(var i=0;i<ADS.length;i++)h+='<button type="button" class="adslide'+(i===adIdx?' on':'')+'" data-act="openChar" data-id="'+ADS[i].to+'" aria-label="'+esc(adLabel(ADS[i]))+'"><img src="img/'+ADS[i].img+'.webp" alt="" draggable="false" decoding="async"'+(i===adIdx?'':' loading="lazy"')+'></button>';
  var ar='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return ("<div class=\"adcar\" id=\"adCar\" role=\"group\" aria-label=\""+__("کاراکترهای جدید Ario")+"\">")+h+
    ("<button type=\"button\" class=\"adnav prev\" data-act=\"adPrev\" aria-label=\""+__("بنر قبلی")+"\">")+ar+'</button>'+
    ("<button type=\"button\" class=\"adnav next\" data-act=\"adNext\" aria-label=\""+__("بنر بعدی")+"\">")+ar+'</button></div>';
}
var adTimer=0;
function adStep(d){
  var el=document.getElementById('adCar');if(!el)return;
  var im=el.querySelectorAll('.adslide');if(!im.length)return;
  adIdx=(adIdx+d+im.length)%im.length;
  for(var i=0;i<im.length;i++)im[i].classList.toggle('on',i===adIdx);
}
function adStart(){clearInterval(adTimer);adTimer=setInterval(function(){if(!document.hidden)adStep(1)},2000)}
adStart();
function adPrevA(){adStep(-1);adStart()}
function adNextA(){adStep(1);adStart()}

/* character page: #/character/<id>. Entries we push carry history.state.ch so Back can pop them. */
function charHash(id){return '#/character/'+encodeURIComponent(id)}
function charRoute(){
  var m=/^#\/character\/(.*)$/.exec(location.hash||'');
  if(m){var id='';try{id=decodeURIComponent(m[1])}catch(e){id=m[1]}ui.tab='char';ui.char=id;ui.charSide='f';chAutoBack();return true}
  return false;
}
function openCharA(d){
  ui.tab='char';ui.char=d.id||'';ui.charSide='f';
  chAutoBack();
  try{history.pushState({ch:1},'',charHash(ui.char))}catch(e){}
  render('enter');window.scrollTo(0,0);
}
function charBackA(){
  if(history.state&&history.state.ch){history.back();return}
  try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
  ui.tab='today';render('enter');window.scrollTo(0,0);
}
window.addEventListener('popstate',function(){
  if(ied.on){iedDo();return}
  if(imv.on){imvDo();return}
  if(pdfv.on){pvDoClose();return}
  if(charRoute())render('enter');
  else if(ui.tab==='char'){ui.tab='today';render('enter')}
  window.scrollTo(0,0);
});
function chViewA(d){ui.charSide=d.v==='b'?'b':'f';render('swap')}
function chPrice(n,c){try{return new Intl.NumberFormat(EN?'en-US':'fa-IR').format(n)+' '+(c||'')}catch(e){return n+' '+(c||'')}}
/* purchase hook: set window.ArioPurchase={start:function(info){...}} to connect a real payment flow; until then nothing is charged */
function buyCharA(d){
  var c=charById(d.id);if(!c)return;
  var P=window.ArioPurchase;
  if(P&&typeof P.start==='function'){P.start({id:c.id,name:c.name,price:c.price,salePrice:c.salePrice,currency:c.cur});return}
  toast((__("خرید هنوز فعال نشده است")),null,null,'warn');
}
function chBack(){return {back:1,backAct:'charBack',backTxt:(__("برگشت"))}}
function viewChar(){
  var id=ui.char||'';
  if(id==='all'){
    return head((__("کاراکتر جدید")),(__("کاراکترها")),chBack())+'<div class="chgrid">'+CHARS.map(function(c){
      return '<button type="button" class="chcard glass" data-act="openChar" data-id="'+c.id+'" aria-label="'+esc(c.name)+'"><span class="chpic" style="background-image:url(img/chbg-'+c.id+'.webp)"><img src="img/'+c.img+'.webp" alt="" draggable="false" loading="lazy"></span><b>'+esc(c.name)+'</b></button>';
    }).join('')+'</div>';
  }
  var c=charById(id);
  if(!c)return head('',(__("کاراکتر")),chBack())+'<div class="empty"><div class="badge">'+icon('info')+("</div><h3>"+__("کاراکتر پیدا نشد")+"</h3><p>"+__("این کاراکتر وجود ندارد یا نشانی آن درست نیست.")+"</p><button type=\"button\" class=\"btn\" data-act=\"charBack\">"+__("برگشت")+"</button></div>");
  var side=(ui.charSide==='b'&&c.back)?'b':'f',src=side==='b'?c.back:c.img;
  var hasP=typeof c.price==='number'&&isFinite(c.price)&&c.price>=0;
  var sale=hasP&&typeof c.salePrice==='number'&&isFinite(c.salePrice)&&c.salePrice>=0&&c.salePrice<c.price;
  var pr='';
  if(hasP)pr='<div class="chprice">'+(sale?("<s class=\"old\" aria-label=\""+__("قیمت اصلی")+"\">")+chPrice(c.price,c.cur)+("</s><strong class=\"new sale\" aria-label=\""+__("قیمت با تخفیف")+"\">")+chPrice(c.salePrice,c.cur)+'</strong><span class="off">'+new Intl.NumberFormat(EN?'en-US':'fa-IR').format(Math.round((1-c.salePrice/c.price)*100))+(__("٪ تخفیف")+"</span>"):("<strong class=\"new\" aria-label=\""+__("قیمت")+"\">")+chPrice(c.price,c.cur)+'</strong>')+'</div>';
  var buy=c.paid?'<button type="button" class="btn chbuy" data-act="buyChar" data-id="'+c.id+'">'+icon('cart')+(__("خرید","Buy")+"</button>"):'';
  var alt=esc(c.name);
  return head((__("کاراکتر جدید")),esc(c.name),chBack())+
    '<section class="chv"><div class="chwrap"'+(c.glow?' style="--g1:'+c.glow[0]+';--g2:'+c.glow[1]+';--g3:'+c.glow[2]+(c.btn?';--b1:'+c.btn[0]+';--b2:'+c.btn[1]+';--bt:'+c.btn[2]:'')+'"':'')+'><div class="chglow" aria-hidden="true"><i></i><i></i></div><div class="chring" aria-hidden="true"><i></i><i></i></div><div class="chscene" style="background-image:url(img/chbg-'+c.id+'.webp)"><i class="chsh"></i>'+
    '<button type="button" class="chfig" data-act="chFlip" aria-label="'+alt+(" "+__("- برای دیدن نمای پشت لمس کن")+"\"><span class=\"chflip\"><img class=\"chf\" src=\"img/")+c.img+'.webp" alt="'+alt+'" draggable="false">'+(c.back?'<img class="chb" src="img/'+c.back+'.webp" alt="'+alt+(" "+__("(نمای پشت)")+"\" draggable=\"false\">"):'')+'</span></button>'+
    '<div class="chinfo">'+pr+buy+'</div></div></div></section>';
}
/* a character opens on its front. Tapping it fades to the back view for 3 seconds, then it fades back to the front
   (a tap while it shows the back goes back at once). */
var chFlipT=0;
function chAutoBack(){clearTimeout(chFlipT)}
function chFlipA(){
  var f=document.querySelector('.chfig');if(!f||!f.querySelector('.chb'))return;
  clearTimeout(chFlipT);
  if(f.classList.contains('bk')){f.classList.remove('bk');return}
  f.classList.add('bk');
  chFlipT=setTimeout(function(){var g=document.querySelector('.chfig');if(g)g.classList.remove('bk')},3000);
}
function viewToday(){
  var td=todayKey(),f=ui.filter,all=state.tasks;
  var pass=function(t){return fOK(t)&&(f==='all'||(f==='open'?!t.done:t.done))};
  var todayAll=all.filter(function(t){return t.d===td});
  var total=todayAll.length,doneN=todayAll.filter(function(t){return t.done}).length,left=total-doneN;
  var isTd=function(ts){return ts&&key(new Date(ts))===td};
  var overAll=all.filter(function(t){return t.d&&t.d<td&&(!t.done||isTd(t.doneAt))});
  var over=overAll.filter(function(t){return !t.done});
  var none=all.filter(function(t){return !t.d});
  var pct=total?Math.round(doneN/total*100):0,C=2*Math.PI*34;
  var len=pct/100*C,from=lastRing;lastRing=len;
  var h=new Date().getHours();
  var greet=h<5?(__("شب بخیر")):h<12?(__("صبح بخیر")):h<16?(__("ظهر بخیر")):h<19?(__("عصر بخیر")):(__("شب بخیر"));
  var l1=total===0?(__("برای امروز کاری ثبت نشده")):(left===0?(__("کارهای امروز تمام شد")):fa(doneN)+(" "+__("از")+" ")+fa(total)+(" "+__("کار انجام شد")));
  var l2=[];
  if(left>0)l2.push(fa(left)+(" "+__("کار مانده")));
  if(over.length)l2.push(fa(over.length)+(" "+__("کار عقب‌افتاده")));
  if(!l2.length)l2.push(total?(__("عالی بود")):(__("با دکمه بعلاوه کار اضافه کن")));
  var body=(state.profile.showOver!==false?group((__("عقب‌افتاده")),sortDay(overAll.filter(pass)),{showDate:1,cls:'bad'}):'')+
    group((__("امروز")),sortDay(todayAll.filter(pass)),{})+
    group((__("بدون تاریخ")),sortDay(none.filter(pass)),{});
  if(!body)body=empty('today',f==='done'?(__("هنوز کاری انجام نشده")):(__("همه‌چیز مرتب است")),(__("برای امروز کار بازی نداری.")),f!=='done');
  var foot=all.some(function(t){return t.done})?("<div class=\"foot\"><button type=\"button\" class=\"linkbtn\" data-act=\"clearDone\">"+__("پاک کردن انجام‌شده‌ها")+"</button></div>"):'';
  return head(F.long.format(new Date())+(holiday(td)?' · '+holiday(td):''),(__("امروز")),{right:fbtn()})+filterNote()+homeBanner(left)+adCarousel()+quickBar()+habitStrip()+hero3d(pct,doneN,total,left,over.length,greet,l1,nextTask())+quickPanel()+focusCard()+
    seg()+body+foot;
}

function viewLists(){
  if(ui.cat)return viewCat();
  if(ui.lsec==='habits')return viewHabits();
  var open=state.tasks.filter(function(t){return !t.done}).length;
  var tile=function(id,name,ic,cv,list,wide){
    var o=list.filter(function(t){return !t.done}).length,pct=list.length?Math.round((list.length-o)/list.length*100):0;
    return '<button type="button" class="tile glass'+(wide?' wide':'')+'" data-act="openCat" data-cat="'+id+'" style="--cc:'+cvar(cv)+'"><span class="ib">'+icon(ic)+'</span><div><h3>'+name+'</h3><p>'+(o?fa(o)+(" "+__("کار مانده")):(list.length?(__("همه انجام شد")):(__("خالی"))))+'</p></div><div class="bar"><i style="width:'+pct+'%"></i></div></button>';
  };
  return head(open?fa(open)+(" "+__("کار مانده")):(__("همه‌چیز انجام شده")),(__("دسته‌ها")),{back:1,backAct:'lsBack',backTxt:(__("برنامه")),right:("<button type=\"button\" class=\"round glass\" data-act=\"newCat\" aria-label=\""+__("دسته جدید")+"\">")+icon('plus')+'</button>'})+segG([['cats',(__("دسته‌ها"))],['habits',(__("عادت‌ها"))]],'lsec','cats')+
    '<div class="tiles">'+tile('all',(__("همه کارها")),'all','--accent',state.tasks,true)+CATS.map(function(c){return tile(c.id,c.n,c.i,c.c,state.tasks.filter(function(t){return t.c===c.id}),false)}).join('')+'</div>';
}
function viewCat(){
  var f=ui.filter,id=ui.cat,name=id==='all'?(__("همه کارها")):cat(id).n;
  var list=state.tasks.filter(function(t){return (id==='all'||t.c===id)&&(f==='all'||(f==='open'?!t.done:t.done))});
  var body=list.length?'<ul class="glass list" style="margin-top:16px">'+sortCat(list).map(function(t){return rowHTML(t,{showDate:1})}).join('')+'</ul>':empty('lists',(__("اینجا کاری نیست")),(__("یک کار تازه به این دسته اضافه کن.")),f!=='done');
  var n=state.tasks.filter(function(t){return (id==='all'||t.c===id)&&!t.done}).length;
  return head(n?fa(n)+(" "+__("کار مانده")):(__("همه انجام شده")),name,{back:1,right:id==='all'?'':'<button type="button" class="round glass" data-act="editCat" data-cat="'+id+("\" aria-label=\""+__("ویرایش دسته")+"\">")+icon('edit')+'</button>'})+seg()+body;
}

function movePill(){
  var on=document.querySelector('.tab.on'),p=document.querySelector('.pill');
  if(!on||!p)return;
  var mk=on.dataset.tab+'|'+window.innerWidth;
  if(movePill.k===mk)return;
  movePill.k=mk;
  p.style.width=on.offsetWidth+'px';
  p.style.transform='translateX('+on.offsetLeft+'px)';
}
function render(mode){
  var h=ui.tab==='char'?viewChar():ui.tab==='today'?viewToday():ui.tab==='week'?viewWeek():ui.tab==='kk'?viewKK():ui.tab==='rk'?viewRK():ui.tab==='tb'?viewTB():ui.tab==='mz'?viewMZ():ui.tab==='stats'?viewStats():ui.tab==='account'?viewAccount():viewLists();
  var v=$('#view');
  var qv0=document.getElementById('qaIn'),qs0=qv0&&qv0.value?{v:qv0.value,f:document.activeElement===qv0}:null;
  v.className='app'+(mode?' '+mode:'')+(v.classList.contains('cv')?' cv':'');
  var di=document.querySelector('.dock-in');if(di)di.classList.toggle('nofab',ui.tab==='account'||ui.tab==='rk'||ui.tab==='tb'||ui.tab==='mz'||ui.tab==='char');
  var fb=$('#fab');if(fb)fb.setAttribute('aria-label',ui.tab==='kk'?(__("ثبت مطالعه")):(__("افزودن کار جدید")));
  var keep=(mode!=='enter'),sy=window.scrollY||0,hh=v.offsetHeight;
  if(keep&&hh)v.style.minHeight=hh+'px';
  v.innerHTML=h;
  v.classList.toggle('cv',v.querySelectorAll('.row').length>40);
  if(keep){window.scrollTo(0,sy);requestAnimationFrame(function(){v.style.minHeight=''})}else v.style.minHeight='';
  document.querySelectorAll('.tab').forEach(function(b){
    var on=b.dataset.tab===(ui.tab==='rk'||ui.tab==='tb'||ui.tab==='mz'?'kk':ui.tab==='char'?'today':ui.tab==='lists'?'week':ui.tab);
    b.classList.toggle('on',on);
    if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
  });
  movePill();syncCover();
  if(qs0){var qn=document.getElementById('qaIn');if(qn){qn.value=qs0.v;if(qs0.f)qn.focus({preventScroll:true})}}
  qaPreview();
  if(ui.tab==='tb')tbFill();
  if(pkFirst&&ui.tab==='today'&&document.querySelector('.hbpw')){pkFirst=false;clearTimeout(pkWaveT);pkWaveT=setTimeout(pkWaveA,1200)}
}
var coverDk=false,coverSeen=null,covMQ=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
function isDark(){var t=state.profile.theme;return t==='dark'||(t!=='light'&&!!(covMQ&&covMQ.matches))}
/* profile banner: day photo in light theme, night photo in dark; cross-fades (zoom + blur + light sweep) when the theme flips */
function syncCover(){
  var els=document.querySelectorAll('.cover');if(!els.length)return;
  var d=isDark(),prev=coverSeen;coverSeen=d;
  if(prev===null||prev===d){els.forEach(function(el){el.classList.toggle('dk',d)});return}
  els.forEach(function(el){el.classList.toggle('dk',prev)});void els[0].offsetWidth;
  els.forEach(function(el){el.classList.add('cvs')});
  requestAnimationFrame(function(){requestAnimationFrame(function(){els.forEach(function(el){el.classList.toggle('dk',d)})})});
  setTimeout(function(){els.forEach(function(el){el.classList.remove('cvs')})},1500);
}
if(covMQ){var cmq=function(){if(coverSeen!==null&&isDark()!==coverSeen)syncCover()};if(covMQ.addEventListener)covMQ.addEventListener('change',cmq);else if(covMQ.addListener)covMQ.addListener(cmq)}
function mutate(){render();persist()}

/* ---------- actions ---------- */
var removedStash=null;
function restore(){
  if(!removedStash)return;
  removedStash.forEach(function(t){if(!find(t.id))state.tasks.push(t)});
  removedStash=null;mutate();
}
function removeTasks(ids,msg){
  removedStash=state.tasks.filter(function(t){return ids.indexOf(t.id)>-1});
  if(!removedStash.length)return;
  state.tasks=state.tasks.filter(function(t){return ids.indexOf(t.id)<0});
  mutate();
  toast(msg,(__("بازگردانی")),restore,'del');
}
var actions={
  filter:function(d){ui.filter=d.f;render('swap')},
  openCat:function(d){ui.cat=d.cat;ui.filter='all';render('enter');window.scrollTo(0,0)},
  back:function(){ui.cat=null;ui.filter='all';render('enter')},
  pickDay:function(d){ui.day=d.d;render('swap')},
  weekNext:function(){ui.day=addDays(ui.day,7);render('right')},
  weekPrev:function(){ui.day=addDays(ui.day,-7);render('left')},
  add:function(){openSheet(null)},
  clearSample:function(){removeTasks(state.tasks.filter(function(t){return t.s}).map(function(t){return t.id}),(__("کارهای نمونه پاک شد")))},
  reload:function(){reloadAccount()},
  acc:function(d){
    var el=document.querySelector('.acc[data-acc="'+d.id+'"]');if(!el)return;
    var on=!el.classList.contains('open');el.classList.toggle('open',on);
    var h=el.querySelector('.acc-h');if(h)h.setAttribute('aria-expanded',String(on));
    if(!ui.acc)ui.acc={};ui.acc[d.id]=on;
  },
  quick:function(d){openSheet(null,d.cat)},
  openFilter:function(){openFilter()},
  clearFilter:function(){ui.fcats=[];ui.fpri=[];ui.ftags=[];ui.q='';render('swap')},
  tgl:function(d){
    var k=d.k;state.profile[k]=!state.profile[k];
    var r=document.querySelector('.qrow[data-k="'+k+'"]');if(r)r.setAttribute('aria-checked',String(!!state.profile[k]));
    applyTheme();writeCache();persist();
    if(k==='sound'&&state.profile.sound)beep();
    if(k==='notif'&&state.profile.notif)reqNotif();
  },
  editProfile:function(){openProfile()},
  cycleLang:function(){setLang(EN?'fa':'en')},
  cycleTheme:function(){var L=themeList(),i=L.findIndex(function(x){return x[0]===state.profile.theme});state.profile.theme=L[(i+1)%L.length][0];applyTheme();mutate()},
  goDone:function(){ui.tab='lists';ui.cat='all';ui.filter='done';render('enter');window.scrollTo(0,0)},
  clearDone:function(){
    var ids=state.tasks.filter(function(t){return t.done}).map(function(t){return t.id});
    if(!ids.length){toast((__("کار انجام‌شده‌ای برای پاک کردن نیست")));return}
    askConfirm({title:(__("پاک کردن انجام‌شده‌ها")),msg:fa(ids.length)+(" "+__("کار انجام‌شده حذف می‌شود.")),btns:[{t:(__("پاک کن")),cls:'bad',fn:function(){removeTasks(ids,(__("کارهای انجام‌شده پاک شد")))}}]});
  }
};
$('#view').addEventListener('click',function(e){
  if(Date.now()-swipedAt<450)return;
  var sb=e.target.closest('.sub');
  if(sb){toggleSub(sb.closest('.row').dataset.id,sb.dataset.sid);return}
  var chk=e.target.closest('.chk');
  if(chk){toggleCheck(chk.closest('.row').dataset.id);return}
  var ed=e.target.closest('.rowedit');
  if(ed){openSheet(ed.closest('.row').dataset.id);return}
  var body=e.target.closest('.row .body');
  if(body){toggleCheck(body.closest('.row').dataset.id);return}
  var a=e.target.closest('[data-act]');
  if(a&&actions[a.dataset.act])actions[a.dataset.act](a.dataset);
});
$('#view').addEventListener('keydown',function(e){
  if((e.key==='Enter'||e.key===' ')&&e.target.matches('.row .body')){e.preventDefault();toggleCheck(e.target.closest('.row').dataset.id)}
});
document.querySelectorAll('.tab').forEach(function(b){
  b.addEventListener('click',function(){if(ui.tab==='char'&&/^#\/character\//.test(location.hash||'')){try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}ui.tab=b.dataset.tab;ui.cat=null;ui.filter='all';render('enter');window.scrollTo(0,0);if(ui.tab==='account')reloadAccount(true)});
});
$('#fab').addEventListener('click',function(){if(ui.tab==='kk')openKK(null);else openSheet(null)});

/* ---------- pro UI: hero, quick add, filter, effects ---------- */
function fOK(t){
  if(ui.fcats.length&&ui.fcats.indexOf(t.c)<0)return false;
  if(ui.fpri.length&&ui.fpri.indexOf(t.p)<0)return false;
  if(ui.ftags.length&&!(t.tg||[]).some(function(x){return ui.ftags.indexOf(x)>-1}))return false;
  if(ui.q){var s=(t.t+' '+(t.n||'')+' '+(t.tg||[]).join(' ')+' '+(t.st||[]).map(function(x){return x.t}).join(' ')).toLowerCase();if(s.indexOf(ui.q.toLowerCase())<0)return false}
  return true;
}
function fCount(){return (ui.fcats.length?1:0)+(ui.fpri.length?1:0)+(ui.ftags.length?1:0)+(ui.q?1:0)}
function fbtn(){return ("<button type=\"button\" class=\"round glass fbtn\" data-act=\"openFilter\" aria-label=\""+__("فیلتر کارها")+"\">")+icon('filter')+(fCount()?'<i class="fdot"></i>':'')+'</button>'}
function filterNote(){
  if(!fCount())return '';
  return '<div class="fnote glass"><span>'+icon('filter')+(__("فیلتر فعال")+"</span><button type=\"button\" class=\"linkbtn\" data-act=\"clearFilter\">"+__("حذف فیلتر")+"</button></div>");
}
function hero3d(pct,doneN,total,left,overN,greet,l1,nx){
  var th=8+pct*0.44,pos=[[64,66],[154,60],[84,84],[134,84],[110,46],[170,76]],N=Math.min(total,6),orbs='',i;
  for(i=0;i<N;i++){
    var on=i<doneN;
    orbs+='<circle class="orb '+(on?'on':'off')+'" cx="'+pos[i][0]+'" cy="'+pos[i][1]+'" r="'+(on?5:4)+'" fill="'+(on?'#7be0ff':'#4a5a90')+'" fill-opacity="'+(on?1:.7)+'" style="--d:'+(i*.4)+'s"/>';
  }
  var y=70-th;
  var svg='<svg class="iso" viewBox="0 0 220 170" aria-hidden="true"><defs>'+
    '<linearGradient id="gTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8dbdff" stop-opacity=".6"/><stop offset="1" stop-color="#3b4fd8" stop-opacity=".4"/></linearGradient>'+
    '<linearGradient id="gL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8f1e8"/><stop offset="1" stop-color="#cdc8ea"/></linearGradient>'+
    '<linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e2f6"/><stop offset="1" stop-color="#a6a6d8"/></linearGradient>'+
    '<linearGradient id="gT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9fdcff"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#7fb8ff"/></linearGradient>'+
    '<radialGradient id="gGlow"><stop offset="0" stop-color="#5aa7ff" stop-opacity=".85"/><stop offset="1" stop-color="#5aa7ff" stop-opacity="0"/></radialGradient>'+
    '</defs>'+
    '<ellipse class="glow" cx="110" cy="116" rx="106" ry="40" fill="url(#gGlow)"/>'+
    '<path d="M20 66L110 110V146L20 102Z" fill="url(#gL)" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linejoin="round"/>'+
    '<path d="M110 110L200 66V102L110 146Z" fill="url(#gR)" stroke="#fff" stroke-opacity=".4" stroke-width="6" stroke-linejoin="round"/>'+
    '<path d="M110 22L200 66L110 110L20 66Z" fill="url(#gTop)" stroke="#a9d0ff" stroke-opacity=".85" stroke-width="6" stroke-linejoin="round"/>'+
    '<path d="M110 36L178 66L110 96L42 66Z" fill="#0b1030" fill-opacity=".5"/>'+
    '<g class="tower"><rect x="103" y="'+y.toFixed(1)+'" width="14" height="'+th.toFixed(1)+'" fill="url(#gT)" fill-opacity=".9"/>'+
    '<ellipse cx="110" cy="70" rx="7" ry="3.5" fill="#7fb8ff"/><ellipse cx="110" cy="'+y.toFixed(1)+'" rx="7" ry="3.5" fill="#fff"/></g>'+
    orbs+'</svg>';
  return '<section class="hero3d">'+
    '<div class="h3top"><div><div class="h3pct">'+fa(pct)+PCT+'</div><p class="h3sub">'+l1+'</p></div><span class="h3chip">'+greet+'</span></div>'+
    svg+
    '<div class="h3low">'+nextRow(nx)+
      '<div class="h3row"><span class="h3d">'+icon('today')+("</span><div><b>"+__("پیشرفت امروز")+"</b><small>")+fa(doneN)+(" "+__("از")+" ")+fa(total)+(" "+__("کار انجام شد")+"</small></div><span class=\"h3n\">")+fa(left)+(" "+__("مانده")+"</span></div>")+
      '<div class="h3row"><span class="h3d">'+icon('flag')+("</span><div><b>"+__("عقب‌افتاده")+"</b><small>")+(overN?(__("نیاز به رسیدگی دارد")):(__("هیچ کاری عقب نیست")))+'</small></div><span class="h3n'+(overN?' bad':'')+'">'+fa(overN)+'</span></div>'+
    '</div></section>';
}
function quickPanel(){
  /* balanced rows: up to 5 circles per row, every row centred, all circles the same size */
  var n=CATS.length,rows=Math.max(1,Math.ceil(n/5)),cols=Math.max(1,Math.ceil(n/rows));
  return ("<section class=\"qpanel\"><div class=\"qp-h\"><b>"+__("افزودن سریع")+"</b></div><div class=\"qp-g\" style=\"--cols:")+cols+'">'+
    CATS.map(function(c,i){return '<button type="button" class="qbtn" data-act="quick" data-cat="'+c.id+'" style="--cc:'+cvar(c.c)+';--i:'+i+("\" aria-label=\""+__("کار جدید در دسته")+" ")+c.n+'"><span class="qi">'+icon(c.i)+'</span><small>'+c.n+'</small></button>'}).join('')+
    '</div></section>';
}
function toggles(){
  var items=[['hbanner','spark',(__("بنر صفحه اصلی")),(__("نمایش بنر بالای صفحه امروز"))],['showOver','clock',(__("نمایش کارهای عقب‌افتاده")),(__("در صفحه امروز"))],['fx','spark',(__("افکت‌های ویژه")),(__("انیمیشن و جشن پایان کار"))],['sound','bell',(__("صدای تکمیل کار")),(__("پخش صدای کوتاه"))],['wrev','calendar',(__("اعلان بازنگری هفته")),(__("جمعه‌ها ساعت ۱۸"))+(state.profile.notif?'':(" "+__("(اول «اعلان سیستم» را روشن کن)")))],['notif','bell',(__("اعلان سیستم")),(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform())?(__("یادآوری در نوار اعلان گوشی، حتی وقتی برنامه بسته است")):(__("وقتی برنامه باز است"))]];
  return ("<h3 class=\"gh\"><span>"+__("تنظیمات سریع")+"</span></h3><div class=\"qsheet\">")+items.map(function(it){
    var on=!!state.profile[it[0]];
    return '<button type="button" class="qrow" role="switch" aria-checked="'+on+'" data-act="tgl" data-k="'+it[0]+'"><span class="h3d">'+icon(it[1])+'</span><span class="qt"><b>'+it[2]+'</b><small>'+it[3]+'</small></span><span class="sw"></span></button>';
  }).join('')+'</div>';
}
function burst(el){
  if(!state.profile.fx||!el)return;
  var r=el.getBoundingClientRect(),row=el.closest('.row'),col=row?getComputedStyle(row).getPropertyValue('--cc').trim():'';
  col=col||'#0a7aff';
  var layer=$('#fx'),cx=r.left+r.width/2,cy=r.top+r.height/2,frag=document.createDocumentFragment(),i;
  for(i=0;i<16;i++){
    var p=document.createElement('i'),a=Math.PI*2*i/16+Math.random()*.5,d=34+Math.random()*46;
    p.className='cf'+(i%3===0?' sq':'');
    p.style.cssText='left:'+cx+'px;top:'+cy+'px;background:'+(i%4===0?'#fff':col)+';--dx:'+(Math.cos(a)*d).toFixed(0)+'px;--dy:'+(Math.sin(a)*d+14).toFixed(0)+'px;--rot:'+Math.round(Math.random()*540-270)+'deg';
    frag.appendChild(p);
  }
  layer.appendChild(frag);
  setTimeout(function(){layer.innerHTML=''},950);
}
function actx(){var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;var c=beep.c||(beep.c=new A());if(c.state==='suspended'&&c.resume)c.resume();return c}
function tone(c,f,t0,d,type,v,f2){
  var o=c.createOscillator(),g=c.createGain(),t=c.currentTime+t0;
  o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d*.6);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.12,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.03);
}
function swish(c,t0,d){
  var n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0),i;
  for(i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);
  var s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain(),t=c.currentTime+t0;
  f.type='bandpass';f.Q.value=2.2;f.frequency.setValueAtTime(1400,t);f.frequency.exponentialRampToValueAtTime(4200,t+d);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.09,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  s.buffer=b;s.connect(f);f.connect(g);g.connect(c.destination);s.start(t);
}
function beep(force){
  if(!force&&!state.profile.sound)return;
  try{var c=actx();if(!c)return;tone(c,660,0,.22,'sine',.12,990)}catch(e){}
}
/* completion sound: a pen-stroke swish while the line is drawn, then a chime that depends on priority */
function playDone(t,allDone){
  if(!state.profile.sound)return;
  try{
    var c=actx();if(!c)return;
    swish(c,.04,.3);
    var p=t&&t.p||0;
    if(allDone){[523,659,784,1047,1319].forEach(function(f,i){tone(c,f,.3+i*.1,.38,'triangle',.11)});tone(c,2093,.85,.5,'sine',.05)}
    else if(p>=2){[523,659,784,1047].forEach(function(f,i){tone(c,f,.3+i*.08,.3,'triangle',.11)})}
    else if(p===1){tone(c,784,.3,.22,'sine',.12);tone(c,1175,.42,.3,'sine',.12)}
    else tone(c,880,.3,.16,'sine',.11,1320);
  }catch(e){}
  try{if(navigator.vibrate)navigator.vibrate(allDone?[30,40,30,40,60]:15)}catch(e){}
}

/* ---------- filter sheet (multi-select) ---------- */
var fs={wrap:$('#fSheet'),form:$('#fForm'),opts:$('#fOpts'),pri:$('#fPri'),q:$('#fQ'),all:$('#fAll')},fd=null,fCloseT=null;
function drawFilter(){
  var allSel=fd.cats.length===CATS.length;
  fs.all.textContent=allSel?(__("پاک کردن")):(__("انتخاب همه"));
  fs.opts.innerHTML=CATS.map(function(c,i){
    var on=fd.cats.indexOf(c.id)>-1,n=state.tasks.filter(function(t){return t.c===c.id&&!t.done}).length;
    return '<button type="button" class="opt'+(on?' on':'')+'" data-c="'+c.id+'" aria-pressed="'+on+'" style="--cc:'+cvar(c.c)+';--i:'+i+'"><span class="cb">'+(on?icon('check'):'')+'</span><span class="otx">'+c.n+'</span><span class="cnt">'+fa(n)+'</span></button>';
  }).join('');
  fs.pri.innerHTML=PRI.map(function(p){var on=fd.pri.indexOf(p.v)>-1;return '<button type="button" class="chip" data-p="'+p.v+'" aria-pressed="'+on+'">'+p.n+'</button>'}).join('');
  var tg=allTags();$('#fTagSec').hidden=!tg.length;
  $('#fTags').innerHTML=tg.map(function(g){var on=fd.tags.indexOf(g)>-1;return '<button type="button" class="chip" data-tg="'+esc(g)+'" aria-pressed="'+on+'">#'+esc(g)+'</button>'}).join('');
  $('#fSort').innerHTML=SORTS.map(function(x){return '<button type="button" class="chip" data-so="'+x[0]+'" aria-pressed="'+(fd.sort===x[0])+'">'+x[1]+'</button>'}).join('');
  $('#fSortHint').hidden=fd.sort!=='manual';
}
function openFilter(){
  fd={cats:ui.fcats.slice(),pri:ui.fpri.slice(),tags:ui.ftags.slice(),sort:state.profile.sort||'auto'};
  fs.q.value=ui.q||'';
  drawFilter();
  clearTimeout(fCloseT);
  fs.wrap.hidden=false;
  document.documentElement.style.overflow='hidden';
  requestAnimationFrame(function(){requestAnimationFrame(function(){fs.wrap.classList.add('open')})});
}
function closeFilter(){
  fs.wrap.classList.remove('open');
  document.documentElement.style.overflow='';
  clearTimeout(fCloseT);
  fCloseT=setTimeout(function(){fs.wrap.hidden=true},330);
}
fs.opts.addEventListener('click',function(e){
  var b=e.target.closest('[data-c]');if(!b)return;
  var i=fd.cats.indexOf(b.dataset.c);if(i>-1)fd.cats.splice(i,1);else fd.cats.push(b.dataset.c);
  drawFilter();
});
fs.pri.addEventListener('click',function(e){
  var b=e.target.closest('[data-p]');if(!b)return;
  var v=Number(b.dataset.p),i=fd.pri.indexOf(v);if(i>-1)fd.pri.splice(i,1);else fd.pri.push(v);
  drawFilter();
});
$('#fTags').addEventListener('click',function(e){var b=e.target.closest('[data-tg]');if(!b)return;var g=b.dataset.tg,i=fd.tags.indexOf(g);if(i>-1)fd.tags.splice(i,1);else fd.tags.push(g);drawFilter()});
$('#fSort').addEventListener('click',function(e){var b=e.target.closest('[data-so]');if(!b)return;fd.sort=b.dataset.so;drawFilter()});
fs.all.addEventListener('click',function(){fd.cats=fd.cats.length===CATS.length?[]:CATS.map(function(c){return c.id});drawFilter()});
fs.form.addEventListener('submit',function(e){
  e.preventDefault();
  ui.fcats=fd.cats.length===CATS.length?[]:fd.cats.slice();
  ui.fpri=fd.pri.length===PRI.length?[]:fd.pri.slice();
  ui.q=fs.q.value.trim();ui.ftags=fd.tags.slice();
  if((state.profile.sort||'auto')!==fd.sort){state.profile.sort=fd.sort;writeCache();persist()}
  closeFilter();render('swap');
});
$('#fCancel').addEventListener('click',closeFilter);
$('#fDim').addEventListener('click',closeFilter);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!fs.wrap.hidden)closeFilter()});

/* ---------- account ---------- */
var HUES=[215,160,330,28,265,190];
var THEMES=[['auto',(__("خودکار"))],['light',(__("روشن"))],['dark',(__("تیره"))],['vip',(__("رنگ VIP"))]];
var lastSync=0,syncOK=false,reloading=false;
/* VIP colours: when a VIP profile photo is unlocked and chosen, "VIP colour" becomes a fourth theme next to auto / light / dark.
   It paints the app (accent, glow blobs, background tint) with that profile's colours on a dark base. */
var vipPrev='';/* id of a VIP profile whose colours are being previewed from the VIP sheet (not saved) */
function vipPal(){if(vipPrev)return VFX[vipPrev]||null;var p=state.profile;return (p.vip&&isVip(p.photo)&&VFX[p.photo])?VFX[p.photo]:null}
function themeList(){return THEMES.filter(function(x){return x[0]!=='vip'||vipPal()})}
var VIP_VARS=['--accent','--on-accent','--blob-a','--blob-b','--blob-c','--blob-d','--blob-o','--bg','--glass','--glass2','--sep','--edge'];
function hexRgb(h){h=String(h).replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function applyTheme(){
  var t=state.profile.theme,r=document.documentElement,pal=(t==='vip'||vipPrev)?vipPal():null,i;
  r.classList.toggle('nofx',!state.profile.fx);
  if(pal){
    var c0=hexRgb(pal.c[0]),lum=(0.299*c0[0]+0.587*c0[1]+0.114*c0[2])/255,mix=function(k){return 'rgb('+c0.map(function(v){return Math.round(8+v*k)}).join(',')+')'};
    r.setAttribute('data-theme','dark');
    /* stickers: set the picture set first, put the stickers in the page, and only then switch data-vip on, so they fade in */
    r.setAttribute('data-vst',pal.bn);try{vsPre(pal.bn);vsDecorate();void r.offsetWidth}catch(e){}
    r.setAttribute('data-vip',vipPrev||state.profile.photo);
    var v={'--accent':pal.c[0],'--on-accent':lum>.62?'#1a1204':'#ffffff','--blob-a':pal.c[0],'--blob-b':pal.c[1],'--blob-c':pal.c[2],'--blob-d':pal.c[0],'--blob-o':'.5','--bg':mix(.09),
      '--glass':'rgba('+pal.g+',.10)','--glass2':mix(.2),'--sep':'rgba('+pal.g+',.16)','--edge':'rgba('+pal.g+',.28)'};
    for(i=0;i<VIP_VARS.length;i++)r.style.setProperty(VIP_VARS[i],v[VIP_VARS[i]]);
  }else{
    r.removeAttribute('data-vip');
    for(i=0;i<VIP_VARS.length;i++)r.style.removeProperty(VIP_VARS[i]);
    if(t==='light'||t==='dark')r.setAttribute('data-theme',t);else r.removeAttribute('data-theme');
  }
}
/* ---------- VIP stickers ----------
   The stickers cut from the three VIP sheets (img/st/<theme>-<slot>.webp, 22 slots per theme) appear all over the app
   while the VIP colour theme is on. They are always in the page, but invisible: CSS shows them only while <html> has
   data-vip, so turning the theme on fades them in and turning it off (or choosing auto / light / dark) fades them out. */
var VS_SLOTS=['hi','happy','sleep','read','write','cool','shy','think','sad','heart','star','moon','cloud','flower','gift','book','note','pen','bell','check','folder','mark'];
var vsLoaded={};
function vsPre(th){if(!th||vsLoaded[th])return;vsLoaded[th]=1;VS_SLOTS.forEach(function(s){var i=new Image();i.src='img/st/'+th+'-'+s+'.webp'})}
function vsTag(slot,cls){return '<i class="stk stk-'+slot+' '+cls+'" aria-hidden="true"></i>'}
/* the little picture next to each page title follows the page */
var VS_TAB={today:'cloud',week:'note',lists:'folder',kk:'book',rk:'check',tb:'pen',stats:'star',account:'heart',char:'flower'};
/* [where, picture, place + size]: a picture is added once to every element that matches */
var VS_RULES=[
  ['.hbw','hi','sp-hero sz-m'],                                   /* home banner: the character stands on it */
  ['.empty','sleep','sp-emp sz-xl'],                               /* every empty page */
  ['.head .ht',function(){return VS_TAB[ui.tab]||'star'},'sp-head sz-s'],  /* page titles */
  ['.row .rc','check','sp-chk sz-xs'],                             /* finished tasks (CSS hides it on unfinished ones) */
  ['.fab','bell','sp-fab sz-s'],                                   /* add button */
  ['.tabbar','cloud','sp-tab sz-m'],                               /* bottom bar */
  ['.fcard','read','sp-card sz-m'],                                /* focus card */
  ['.gmcard','cool','sp-card sz-m'],                               /* level card */
  ['.qa','pen','sp-qa sz-s'],                                      /* quick add bar */
  ['.sheet-top','write','sp-sheet sz-s'],                          /* add / edit sheets */
  ['.nc-h','bell','sp-nc sz-s'],                                   /* notification centre */
  ['.wl-in','hi','sp-wl sz-l'],                                    /* welcome card */
  ['.fo-ring','read','sp-fo sz-l'],                                /* focus timer */
  ['.banner','happy','sp-ban sz-s'],                               /* pop-up notices */
  ['.cover:not(.thin)','hi','sp-cov sz-l']                         /* big profile banner */
];
function vsDecorate(){
  var i,j,r,els,cls,slot;
  if(!VS_RULES||typeof ui==='undefined'||!ui||!document.body)return;
  for(i=0;i<VS_RULES.length;i++){
    r=VS_RULES[i];cls=r[2].split(' ')[0];slot=typeof r[1]==='function'?r[1]():r[1];els=document.querySelectorAll(r[0]);
    for(j=0;j<els.length;j++){if(!els[j].querySelector(':scope>.stk.'+cls))els[j].insertAdjacentHTML('beforeend',vsTag(slot,r[2]))}
  }
}
var vsRaf=0;
function vsSched(){if(vsRaf||!document.documentElement.hasAttribute('data-vst'))return;vsRaf=requestAnimationFrame(function(){vsRaf=0;vsDecorate()})}
/* new pages, sheets and notices are decorated as soon as they are drawn (only after a VIP theme was used) */
if(window.MutationObserver&&document.body)new MutationObserver(vsSched).observe(document.body,{childList:true,subtree:true});
function themeName(){var t=themeList().find(function(x){return x[0]===state.profile.theme});return t?t[1]:THEMES[0][1]}
function fmtTime(ts){try{return new Date(ts).toLocaleTimeString(EN?'en-US':'fa-IR',EN?{hour:'2-digit',minute:'2-digit',hour12:false}:{hour:'2-digit',minute:'2-digit'})}catch(e){return ''}}
function displayName(){return state.profile.name||acctName||(__("کاربر"))}
function displayHandle(){return state.profile.handle||('user_'+String(userId||'guest').replace(/[^a-z0-9]/gi,'').slice(0,5).toLowerCase())}

/* profile banners: [id, name, level needed (0 = needs VIP)] */
var BNS=[['auto',(__("جنگل Ario")),1],['lineup',(__("گروه Ario")),2],['street',(__("خیابان")),3],['castle',(__("قلعه")),4],['horses',(__("اسب‌سواران")),5],['room',(__("شب‌نشینی")),6],['camp',(__("کمپ جنگلی")),7],['rooftop',(__("غروب شهر")),0],['graffiti',(__("گرافیتی")),0],['angel',(__("فرشته آسمانی")),0],['candy',(__("سرزمین شیرینی")),0],['sheikh',(__("میدان نبرد")),0]];
function bnFind(id){for(var i=0;i<BNS.length;i++)if(BNS[i][0]===id)return BNS[i];return null}
function bnLv(){return state.profile.lvl||1}
function bnOpen(b){return b[2]===0?!!state.profile.vip:bnLv()>=b[2]}
function bnNeed(b){return b[2]===0?'VIP':(__("سطح")+" ")+fa(b[2])}
function bnId(){var b=bnFind(state.profile.banner);return b&&bnOpen(b)?b[0]:'auto'}
function bnCls(){var id=bnId();return id==='auto'?'':' cbn bn-'+id}
function bnTile(b,cur,pick){
  var lock=!bnOpen(b);
  var tg=pick?'button':'div';
  return '<'+tg+(pick?' type="button"':'')+' class="bno'+(lock?' locked':'')+'"'+(pick?' data-bn="'+b[0]+'" aria-pressed="'+(cur===b[0])+'"':'')+(lock?' aria-disabled="true"':'')+' aria-label="'+b[1]+(lock?(" "+__("(قفل،")+" ")+bnNeed(b)+')':'')+'"><span class="bnp bn-'+b[0]+'"></span><b>'+b[1]+'</b><small>'+(lock?bnNeed(b):(b[0]==='auto'?(__("پیش‌فرض")):(__("باز شده"))))+'</small>'+(lock?'<span class="lk" aria-hidden="true">'+icon('lock')+'</span>':'')+'</'+tg+'>';
}
var AVN={av1:(__("گوزن")),av2:(__("کلاه‌دار")),av3:(__("شماغ")),av4:(__("خرگوش")),av5:(__("گربه")),av6:(__("شماغ و عبا")),av7:(__("تاج گل")),av8:(__("فرشته")),av9:(__("اسکلت")),av10:(__("کابوی")),av11:(__("خرگوش صورتی")),av12:(__("هدفون"))},VIPS=['av6','av7','av8'];
function okPhoto(x){return typeof x==='string'&&/^av([1-9]|1[0-2])$/.test(x)}
var VIPDAYS=30;
function isVip(id){return VIPS.indexOf(id)>-1}
function canUse(id){return !isVip(id)||!!state.profile.vip}
function avCls(id,anim){return id+(isVip(id)?' vip'+(state.profile.vip?' un'+(anim?' unf':''):''):'')}
function avatarInner(name,p){return okPhoto(p.photo)&&canUse(p.photo)?'<span class="aimg '+avCls(p.photo)+'" role="img" aria-label="'+AVN[p.photo]+'"></span>':'<b>'+esc(Array.from(name)[0]||(__("ک")))+'</b>'}
function accOpen(id,ic,title){
  var on=!!(ui.acc&&ui.acc[id]);
  return '<section class="acc glass'+(on?' open':'')+'" data-acc="'+id+'"><button type="button" class="mrow acc-h" data-act="acc" data-id="'+id+'" aria-expanded="'+on+'"><span class="mi">'+icon(ic)+'</span><span class="ml">'+title+'</span>'+icon('chev','chv')+'</button><div class="acc-b"><div class="acc-in">';
}
function accClose(){return '</div></div></section>'}
function viewAccount(){
  var p=state.profile,L=ui.loading,all=state.tasks;
  var total=all.length,doneN=all.filter(function(t){return t.done}).length,left=total-doneN;
  var sk='<i class="sk"></i>',name=displayName();
  var stat=function(n,l){return '<div class="stat"><b>'+(L?sk:fa(n))+'</b><span>'+l+'</span></div>'};
  var bTitle=L?(__("در حال بارگذاری اطلاعات…")):(syncOK?(__("اطلاعات حساب به‌روز است")):(__("فقط روی این دستگاه ذخیره شده")));
  var bSub=L?(__("لطفاً چند لحظه صبر کن")):(lastSync?(__("آخرین بارگذاری:")+" ")+fmtTime(lastSync):(__("هنوز بارگذاری نشده")));
  var row=function(ic,label,val,act){return '<button type="button" class="mrow" data-act="'+act+'"><span class="mi">'+icon(ic)+'</span><span class="ml">'+label+'</span>'+(val?'<span class="mv">'+val+'</span>':'')+icon('chev','chv')+'</button>'};
  var ph=(!L&&okPhoto(p.photo)&&canUse(p.photo))?p.photo:'',vf=ph&&isVip(ph)?VFX[ph]:null;
  var nameH=ph?'<h2 class="vipn'+(vf?'':' plain')+'"'+(vf?' style="--c1:'+vf.c[0]+';--c2:'+vf.c[1]+';--c3:'+vf.c[2]+';--g:'+vf.g+'"':'')+'><span class="vnm">'+esc(name)+'</span><img class="vfig" src="img/vp-'+(vf?vf.bn:ph)+'.webp" alt="" draggable="false"></h2>':'<h2>'+esc(name)+'</h2>';
  var idBlock=L?'<h2>'+sk+'</h2><p>'+sk+'</p>':nameH+'<p><bdi dir="ltr">@'+esc(displayHandle())+'</bdi></p>';
  return '<header class="head">'+bellBtn()+'<div class="ht"><p class="sub">'+(L?(__("در حال بارگذاری…")):(__("سلام،")+" ")+esc(name))+("</p><h1>"+__("حساب کاربری")+"</h1></div>")+
    '<button type="button" class="round glass'+(L?' spin':'')+("\" data-act=\"reload\" aria-label=\""+__("بارگذاری مجدد اطلاعات")+"\">")+icon('refresh')+'</button></header>'+
    '<section class="prof glass">'+
      '<div class="cover'+bnCls()+(coverDk?' dk':'')+("\" role=\"img\" aria-label=\""+__("بنر پروفایل")+"\"><i class=\"cl\"></i><i class=\"cd\"></i></div><div class=\"avwrap\">")+
      '<button type="button" class="avatar" data-act="editProfile" style="--h:'+p.hue+("\" aria-label=\""+__("ویرایش مشخصات")+"\">")+avatarInner(name,p)+'<span class="cam">'+icon('edit')+'</span></button></div>'+
      '<div class="pcard">'+
        '<div class="pid"><div class="pt">'+idBlock+'</div><button type="button" class="pbadge" data-act="openGm">'+icon('spark')+(__("سطح")+" ")+fa(gmLevel(gmXp(gmTotals())).l)+' · '+gmTitle(gmLevel(gmXp(gmTotals())).l)+'</button></div>'+
        '<div class="stats">'+stat(total,(__("کل کارها")))+stat(doneN,(__("انجام‌شده")))+stat(left,(__("مانده","Left")))+'</div>'+
        '<div class="banner"><span class="bi">'+icon('cloud')+'</span><div class="bt"><b>'+bTitle+'</b><span>'+bSub+'</span></div><button type="button" class="bbtn" data-act="reload"'+(L?' disabled':'')+(">"+__("بارگذاری")+"</button></div>")+
      '</div>'+
    '</section>'+
    accOpen('edit','user',(__("ویرایش مشخصات")))+
      row('edit',(__("ویرایش مشخصات")),'','editProfile')+
      row(p.via==='google'?'g':(p.via==='email'?'mail':'edit'),p.via==='google'?(__("ورود با گوگل")):(p.via==='email'?(__("ورود با ایمیل")):(__("ورود با نام"))),L?'':(p.email?'<bdi dir="ltr">'+esc(p.email)+'</bdi>':''),'editProfile')+
    accClose()+
    accOpen('look','palette',(__("مشخصات ظاهری")))+
      row('globe','زبان · Language',EN?'English':'فارسی','cycleLang')+
      row('sun',(__("ظاهر برنامه")),themeName(),'cycleTheme')+
      row('palette',(__("ظاهر اعلان‌ها")),L?'':nsThemeName(),'openNsStyle')+
    accClose()+
    accOpen('center','target',(__("مرکز من")))+
      row('bell',(__("خلاصه‌ی صبح")),L?'':(p.msum?fa(p.msum):(__("خاموش"))),'cycleMsum')+
      row('bell',(__("یادآور عصر")),L?'':(p.mev?fa(p.mev):(__("خاموش"))),'cycleMev')+
      row('spark',(__("هدف روزانه کارها")),L?'':fa(p.goal||5)+(" "+__("کار")),'cycleGoal')+
      row('timer',(__("هدف تمرکز روزانه")),L?'':fa(p.fgoal||60)+(" "+__("دقیقه")),'cycleFGoal')+
      row('book',(__("راهنمای شروع")),'','showWelcome')+
      row('check',(__("کارهای انجام‌شده")),L?'':fa(doneN),'goDone')+
    accClose()+
    accOpen('prefs','tools',(__("تنظیمات")))+
      row('lock',(__("قفل برنامه")),lkGet()?(__("روشن")):(__("خاموش")),'openLock')+
      row('cloud',(__("پشتیبان‌گیری و بازیابی")),'','openBackup')+
      row('trash',(__("پاک کردن انجام‌شده‌ها")),'','clearDone')+
      row('info',(__("اطلاعات برنامه")),L?'':(__("نسخه")+" ")+fa(APP.ver),'openAppInfo')+
    accClose()+
    toggles();
}

/* Reload everything from the account every time the account page is opened */
async function reloadAccount(skipRender){
  if(reloading)return;
  reloading=true;ui.loading=!skipRender;
  if(ui.tab==='account'&&!skipRender)render('swap');
  var t0=Date.now();
  try{
    await Promise.race([storeReady,new Promise(function(r){setTimeout(r,4000)})]);
    if(dbDoc){
      if(dirty||saving){clearTimeout(saveTimer);await flush()}
      var snap=await dbDoc.get();
      if(snap.exists){
        var d=snap.data();
        if(d&&Array.isArray(d.tasks)){var kd2=keepDone(d.tasks);state.tasks=d.tasks;if(kd2)persist()}
        if(d&&d.profile)state.profile=P(d.profile);
        if(d&&Array.isArray(d.cats))setCats(d.cats);
        if(d&&d.hist&&typeof d.hist==='object')state.hist=d.hist;
      }else{dirty=true;await flush()}
      syncOK=true;
    }else{
      var c=readCache();
      if(c){state.tasks=c.tasks;if(c.profile)state.profile=P(c.profile);if(Array.isArray(c.cats))setCats(c.cats);if(c.hist)state.hist=c.hist}
      syncOK=false;
    }
    lastSync=Date.now();writeCache();applyTheme();
  }catch(e){
    syncOK=false;toast((__("بارگذاری از حساب انجام نشد")),null,null,'warn');
  }
  var wait=skipRender?0:Math.max(0,700-(Date.now()-t0));
  await new Promise(function(r){setTimeout(r,wait)});
  reloading=false;ui.loading=false;
  if(ui.tab==='account')render(skipRender?'':'enter');
}

/* ---------- profile sheet ---------- */
var ps={wrap:$('#pSheet'),form:$('#pForm'),name:$('#pName'),handle:$('#pHandle'),email:$('#pEmail'),hues:$('#pHues')},pDraft=null,pCloseT=null;
function drawHues(){ps.hues.innerHTML=HUES.map(function(h){return '<button type="button" class="hue" data-h="'+h+'" style="--h:'+h+("\" aria-label=\""+__("رنگ آواتار")+"\" aria-pressed=\"")+(pDraft.hue===h)+'"></button>'}).join('')}
function openProfile(){
  var vNew=checkVip(),vFade=!!state.profile.vip&&!state.profile.vipSeen;
  if(vFade)state.profile.vipSeen=true;
  if(vNew||vFade)persist();
  var ph=state.profile.photo;
  pDraft={hue:state.profile.hue,photo:(okPhoto(ph)&&canUse(ph))?ph:'',fade:vFade,banner:bnId()};
  ps.name.value=state.profile.name||acctName||'';
  ps.handle.value=state.profile.handle||'';
  ps.email.value=state.profile.email||'';
  ps.handle.placeholder=displayHandle();
  drawHues();pAvDraw();
  clearTimeout(pCloseT);
  ps.wrap.hidden=false;
  document.documentElement.style.overflow='hidden';
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    ps.wrap.classList.add('open');
  })});
}
function closeProfile(){
  ps.wrap.classList.remove('open');
  document.documentElement.style.overflow='';
  clearTimeout(pCloseT);
  pCloseT=setTimeout(function(){ps.wrap.hidden=true},330);
}
function saveProfile(){
  var n=ps.name.value.trim();
  if(!n){ps.name.classList.remove('shake');void ps.name.offsetWidth;ps.name.classList.add('shake');ps.name.focus();return}
  var em=ps.email.value.trim();
  if(em&&!okEmail(em)){ps.email.classList.remove('shake');void ps.email.offsetWidth;ps.email.classList.add('shake');ps.email.focus();return}
  state.profile.email=em;
  if(!em)state.profile.via='name';else if(state.profile.via!=='google')state.profile.via='email';
  state.profile.name=n;
  state.profile.handle=ps.handle.value.trim().replace(/[^A-Za-z0-9_.]/g,'').slice(0,24);
  var oldPh=state.profile.photo;
  state.profile.hue=pDraft.hue;state.profile.photo=pDraft.photo||'';state.profile.banner=pDraft.banner||'auto';
  /* a newly chosen VIP profile turns the VIP colours on; leaving VIP profiles turns them off again */
  var vipOn=false;
  if(isVip(state.profile.photo)&&state.profile.photo!==oldPh&&state.profile.vip){state.profile.theme='vip';vipOn=true}
  else if(!isVip(state.profile.photo)&&state.profile.theme==='vip')state.profile.theme='auto';
  applyTheme();
  closeProfile();mutate();
  if(vipOn)setTimeout(function(){notify('vip',(__("رنگ VIP روشن شد")),(__("می‌توانی از «ظاهر برنامه» آن را با خودکار، روشن یا تیره عوض کنی")))},400);
  if(AN)nsPushStyle().then(function(){nativeSync(true)});
  notify('edit',(__("مشخصات ذخیره شد")),n);
}
ps.form.addEventListener('submit',function(e){e.preventDefault();saveProfile()});
$('#pCancel').addEventListener('click',closeProfile);
$('#pDim').addEventListener('click',closeProfile);
ps.hues.addEventListener('click',function(e){var b=e.target.closest('[data-h]');if(!b)return;pDraft.hue=Number(b.dataset.h);drawHues();pAvDraw()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!ps.wrap.hidden)closeProfile()});

/* ---------- profile photo (pick from built-in avatars) ---------- */
function pBigDraw(){
  var big=$('#pBig'),cur=pDraft&&pDraft.photo;
  big.style.setProperty('--h',pDraft?pDraft.hue:215);
  big.innerHTML=okPhoto(cur)?'<span class="aimg '+avCls(cur)+'"></span>':'<b>'+esc(Array.from(ps.name.value.trim()||displayName())[0]||(__("ک")))+'</b>';
}
function pVipInfo(){
  var el=$('#pVipInfo');
  if(state.profile.vip){el.innerHTML=("<p class=\"vipt ok\">"+__("VIP برایت باز شد. هر کدام از این عکس‌ها را می‌توانی انتخاب کنی.")+"</p>");return}
  var st=streaks(),n=Math.min(VIPDAYS,st.cur);
  el.innerHTML=("<p class=\"vipt\">"+__("برای باز شدن،")+" ")+fa(VIPDAYS)+(" "+__("روز پشت‌سر هم و هر روز حداقل یک کار را تیک بزن.")+"</p>")+
    '<div class="vipbar" role="progressbar" aria-valuemin="0" aria-valuemax="'+VIPDAYS+'" aria-valuenow="'+n+'"><i style="width:'+Math.round(n/VIPDAYS*100)+'%"></i></div>'+
    '<small class="vipn">'+fa(n)+(" "+__("از")+" ")+fa(VIPDAYS)+(" "+__("روز")+"</small>");
}
function pBigDraw(){
  var big=$('#pBig'),cur=pDraft&&pDraft.photo;
  big.style.setProperty('--h',pDraft?pDraft.hue:215);
  big.innerHTML=okPhoto(cur)?'<span class="aimg '+avCls(cur)+'"></span>':'<b>'+esc(Array.from(ps.name.value.trim()||displayName())[0]||(__("ک")))+'</b>';
}
function pAvDraw(){
  var cur=pDraft&&pDraft.photo,fade=pDraft&&pDraft.fade,unl=!!state.profile.vip;
  var btn=function(id){
    var lock=isVip(id)&&!unl;
    return '<button type="button" class="avo'+(lock?' locked':'')+'" data-av="'+id+'" aria-pressed="'+(cur===id)+'"'+(lock?' aria-disabled="true"':'')+' aria-label="'+AVN[id]+(isVip(id)?(lock?(" "+__("(VIP، قفل)")):' (VIP)'):'')+'"><span class="aimg '+avCls(id,fade)+'"></span>'+(lock?'<span class="lk" aria-hidden="true">'+icon('lock')+'</span>':'')+'</button>';
  };
  $('#pAvs').innerHTML=Object.keys(AVN).filter(function(id){return !isVip(id)}).map(btn).join('');
  $('#pVips').innerHTML=VIPS.map(btn).join('');
  pVipInfo();
  $('#pBns').innerHTML=BNS.map(function(b){return bnTile(b,pDraft&&pDraft.banner,true)}).join('');
  $('#pNoPhoto').hidden=!okPhoto(cur);
  $('#pHuesSec').hidden=okPhoto(cur);
  pBigDraw();
}
function pAvPick(e){
  var b=e.target.closest('[data-av]');if(!b||!pDraft)return;
  var id=b.dataset.av;
  if(isVip(id)){vpOpen(id);return}
  if(!canUse(id)){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');var n=Math.min(VIPDAYS,streaks().cur);toast((__("این عکس VIP است؛")+" ")+fa(VIPDAYS)+(" "+__("روز پیاپی هر روز یک کار را تیک بزن ("))+fa(n)+(" "+__("از")+" ")+fa(VIPDAYS)+')',null,null,'vip',true);return}
  pDraft.photo=id;pDraft.fade=false;pAvDraw();
}
$('#pAvs').addEventListener('click',pAvPick);
$('#pVips').addEventListener('click',pAvPick);

/* ---------- VIP preview window: opens when a VIP photo is tapped ---------- */
/* each VIP photo has its own banner + colors picked from the photo and banner themselves
   c = [main, second, light] (name, ring, button) · g = glow rgb */
var VFX={
  av8:{bn:'angel',t:(__("فرشته آسمانی")),s:(__("طلایی هاله، سبز چشم‌ها و نور غروب")),c:['#ffd45a','#b6e04a','#fff4cf'],g:'255,205,90'},
  av7:{bn:'candy',t:(__("تاج گل")),s:(__("صورتیِ شیرین، بنفشِ عینک و زردِ گل‌ها")),c:['#ff5fb0','#b54bff','#ffd84a'],g:'255,95,176'},
  av6:{bn:'sheikh',t:(__("شماغ و عبا")),s:(__("قرمزِ شماغ، طلاییِ لبه‌ی عبا و آتشِ میدان")),c:['#ff4a38','#f2b23e','#ff8a2a'],g:'255,110,50'}
};
var vpEl=null,vpCur='',vpCloseT=null;
function vpSparks(){var h='';for(var i=0;i<18;i++){var s=3+(i%4)*2;h+='<b style="left:'+((i*37+11)%100)+'%;top:'+((i*53+9)%100)+'%;width:'+s+'px;height:'+s+'px;animation-delay:'+((i%7)*.55)+'s;animation-duration:'+(2.8+(i%5)*.55)+'s"></b>'}return h}
function vpBuild(){
  if(vpEl)return;
  vpEl=document.createElement('div');vpEl.className='vp';vpEl.hidden=true;
  vpEl.innerHTML=("<div class=\"vp-dim\"></div><div class=\"vp-card\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("پیش‌نمایش پروفایل VIP")+"\">")+
    ("<button type=\"button\" class=\"vp-x\" aria-label=\""+__("بستن")+"\">")+icon('close')+'</button>'+
    '<div class="vp-ban"><i class="vp-img"></i><i class="vp-pulse"></i><i class="vp-sweep"></i><i class="vp-spot"></i><span class="vp-sp" aria-hidden="true">'+vpSparks()+'</span></div>'+
    '<div class="vp-who"><div class="vp-av"><i class="vp-rays"></i><i class="vp-ring"></i><span class="vp-pic"></span></div>'+
    '<div class="vp-line"><span class="vp-chip">VIP</span><b class="vp-t"></b></div>'+
    '<div class="vp-nrow"><h3 class="vp-name"></h3><img class="vp-fig" alt="" draggable="false"></div><p class="vp-sub"></p>'+
    ("<div class=\"vp-swl\">"+__("رنگ VIP اسم؛ لمسش کن")+"</div><div class=\"vp-sw\" role=\"group\" aria-label=\""+__("رنگ اسم")+"\"></div>")+
    ("<div class=\"vp-pk\" role=\"list\" aria-label=\""+__("امکانات این پروفایل")+"\"></div></div>")+
    ("<div class=\"vp-tabs\" role=\"group\" aria-label=\""+__("پروفایل‌های VIP")+"\"></div>")+
    '<div class="vp-foot"><div class="vp-st"></div><button type="button" class="vp-go"></button></div></div>';
  document.body.appendChild(vpEl);
  var card=vpEl.querySelector('.vp-card'),ban=vpEl.querySelector('.vp-ban');
  vpEl.querySelector('.vp-dim').addEventListener('click',vpClose);
  vpEl.querySelector('.vp-x').addEventListener('click',vpClose);
  vpEl.querySelector('.vp-tabs').innerHTML=VIPS.map(function(id){var f=VFX[id];return '<button type="button" class="vp-tab" data-v="'+id+'" style="--tc:'+f.c[0]+'" aria-label="'+AVN[id]+'"><span class="aimg '+id+' vip un"></span></button>'}).join('');
  vpEl.querySelector('.vp-pk').addEventListener('click',function(e){if(e.target.closest('[data-prev]'))vpPrevSet(vipPrev?'':vpCur)});
  vpEl.querySelector('.vp-tabs').addEventListener('click',function(e){var b=e.target.closest('[data-v]');if(b&&b.dataset.v!==vpCur)vpSet(b.dataset.v)});
  vpEl.querySelector('.vp-sw').addEventListener('click',function(e){
    var b=e.target.closest('[data-sc]');if(!b)return;
    var nm=vpEl.querySelector('.vp-name'),all=vpEl.querySelectorAll('.vp-sw button');
    Array.prototype.forEach.call(all,function(x){x.setAttribute('aria-pressed',String(x===b))});
    if(b.dataset.sc==='auto'){nm.classList.remove('solid')}else{nm.style.setProperty('--sc',b.dataset.sc);nm.classList.add('solid')}
  });
  vpEl.querySelector('.vp-go').addEventListener('click',function(){
    var f=VFX[vpCur];if(!f)return;
    if(!canUse(vpCur)){var g=this;g.classList.remove('shake');void g.offsetWidth;g.classList.add('shake');return}
    if(pDraft){pDraft.photo=vpCur;pDraft.banner=f.bn;pDraft.fade=false;pAvDraw()}
    vpClose();
    toast((__("پروفایل و بنر «"))+f.t+(__("» انتخاب شد. برای نگه داشتن، ذخیره را بزن")),null,null,'vip',true);
  });
  vpEl.addEventListener('pointermove',function(e){
    var r=ban.getBoundingClientRect(),x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));
    vpEl.style.setProperty('--mx',Math.round(x*100));vpEl.style.setProperty('--my',Math.round(y*100));
    vpEl.style.setProperty('--px',((x-.5)*2).toFixed(2));vpEl.style.setProperty('--py',((y-.5)*2).toFixed(2));
  });
  card.addEventListener('pointerleave',function(){vpEl.style.setProperty('--px',0);vpEl.style.setProperty('--py',0)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&vpEl&&!vpEl.hidden){e.stopImmediatePropagation();vpClose()}},true);
}
function vpSet(id){
  var f=VFX[id];if(!f||!vpEl)return;
  var first=!vpCur;vpCur=id;
  var s=vpEl.style;
  s.setProperty('--c1',f.c[0]);s.setProperty('--c2',f.c[1]);s.setProperty('--c3',f.c[2]);s.setProperty('--g',f.g);
  var q=function(c){return vpEl.querySelector(c)},unl=canUse(id);
  if(vipPrev)vipPrev=id,applyTheme();
  var pk=[['palette',__("تم رنگ VIP برنامه"),'<i class="vp-pkd" style="background:linear-gradient(90deg,'+f.c[0]+','+f.c[1]+','+f.c[2]+')"></i>'],
    ['image',__("بنر اختصاصی «")+f.t+'»',''],
    ['star',__("رنگ‌های ویژه‌ی نام"),''],
    ['sparkle',__("افکت نور و ذره‌ها"),'']];
  q('.vp-pk').innerHTML=pk.map(function(x,i){return i?'<span class="vp-pki" role="listitem"><b class="vp-pkc">✓</b>'+x[1]+x[2]+'</span>':'<button type="button" class="vp-pki vp-prev" data-prev="1" aria-pressed="'+!!vipPrev+'"><b class="vp-pkc">✓</b>'+x[1]+x[2]+'<em>'+__("پیش‌نمایش")+'</em></button>'}).join('');
  q('.vp-img').style.backgroundImage='url(img/bn-'+f.bn+'.webp)';
  q('.vp-pic').innerHTML='<span class="aimg '+id+' vip un" role="img" aria-label="'+AVN[id]+'"></span>'+(unl?'':'<span class="vp-lk" aria-hidden="true">'+icon('lock')+'</span>');
  q('.vp-t').textContent=f.t;
  q('.vp-fig').src='img/vp-'+f.bn+'.webp';
  var nm=q('.vp-name');nm.textContent=displayName();nm.classList.remove('solid');
  q('.vp-sub').textContent=f.s;
  q('.vp-sw').innerHTML=("<button type=\"button\" class=\"auto\" data-sc=\"auto\" aria-pressed=\"true\" aria-label=\""+__("رنگ خودکار")+"\"></button>")+f.c.map(function(c){return '<button type="button" data-sc="'+c+'" style="--sc:'+c+("\" aria-pressed=\"false\" aria-label=\""+__("رنگ")+" ")+c+'"></button>'}).join('');
  Array.prototype.forEach.call(vpEl.querySelectorAll('.vp-tab'),function(b){b.setAttribute('aria-pressed',String(b.dataset.v===id))});
  var st=q('.vp-st'),go=q('.vp-go');
  if(unl){
    st.innerHTML='<p class="vp-ok">'+icon('star')+(" "+__("این پروفایل برای تو باز است")+"</p>");
    go.className='vp-go';go.textContent=(__("انتخاب این پروفایل و بنر"));go.removeAttribute('aria-disabled');
  }else{
    var n=Math.min(VIPDAYS,streaks().cur);
    st.innerHTML='<div class="vp-bar" role="progressbar" aria-valuemin="0" aria-valuemax="'+VIPDAYS+'" aria-valuenow="'+n+'"><i style="width:'+Math.round(n/VIPDAYS*100)+'%"></i></div><small>'+fa(n)+(" "+__("از")+" ")+fa(VIPDAYS)+(" "+__("روز پیاپی · یا رسیدن به سطح ۸")+"</small>");
    go.className='vp-go lock';go.textContent=(__("قفل است؛ هر روز یک کار را تیک بزن"));go.setAttribute('aria-disabled','true');
  }
  if(!first){
    ['.vp-ban','.vp-who'].forEach(function(c){var e=q(c);e.classList.remove('chg');void e.offsetWidth;e.classList.add('chg')});
  }
}
function vpOpen(id){
  vpBuild();clearTimeout(vpCloseT);
  vpCur='';vpEl.style.setProperty('--px',0);vpEl.style.setProperty('--py',0);
  vpEl.hidden=false;vpSet(id);
  requestAnimationFrame(function(){requestAnimationFrame(function(){vpEl.classList.add('open');var x=vpEl.querySelector('.vp-x');if(x)x.focus({preventScroll:true})})});
}
function vpPrevSet(id){vipPrev=id||'';applyTheme();if(vpEl){var b=vpEl.querySelector('.vp-pk [data-prev]');if(b)b.setAttribute('aria-pressed',String(!!vipPrev))}}
function vpClose(){
  if(!vpEl)return;
  if(vipPrev)vpPrevSet('');
  vpEl.classList.remove('open');
  clearTimeout(vpCloseT);vpCloseT=setTimeout(function(){vpEl.hidden=true},420);
}
$('#pBns').addEventListener('click',function(e){
  var b=e.target.closest('[data-bn]');if(!b||!pDraft)return;
  var f=bnFind(b.dataset.bn);if(!f)return;
  if(!bnOpen(f)){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');toast(f[2]===0?(__("این بنر با باز شدن VIP فعال می‌شود")):(__("این بنر در")+" ")+bnNeed(f)+(" "+__("باز می‌شود. الان سطح")+" ")+fa(bnLv())+(" "+__("هستی")),null,null,'vip',true);return}
  pDraft.banner=f[0];pAvDraw();
});
ps.name.addEventListener('input',function(){if(pDraft&&!okPhoto(pDraft.photo))pBigDraw()});
$('#pNoPhoto').addEventListener('click',function(){pDraft.photo='';pAvDraw()});

/* ---------- time helpers + live countdown ---------- */
function pt(tm){var p=String(tm||'').split(':').map(Number);return {h:p[0]||0,m:p[1]||0,s:p[2]||0}}
function tmFull(tm){var o=pt(tm);return pad(o.h)+':'+pad(o.m)+':'+pad(o.s)}
function targetOf(dk,tm){var d=parse(dk||todayKey()),o=pt(tm);d.setHours(o.h,o.m,o.s,0);return d.getTime()}
function fmtRem(ms){
  var a=Math.floor(Math.abs(ms)/1000),d=Math.floor(a/86400),h=Math.floor(a%86400/3600),m=Math.floor(a%3600/60),s=a%60;
  return (d?fa(d)+(" "+__("روز و")+" "):'')+fa(pad(h)+':'+pad(m)+':'+pad(s));
}
function cdHTML(t){
  var tg=targetOf(t.d,t.tm),ms=tg-Date.now(),late=ms<0;
  var te=t.te?targetOf(t.d,t.te):0;
  return '<span class="mt cd'+(late?' late':'')+'" data-tg="'+tg+'"'+(te?' data-te="'+te+'"':'')+' data-id="'+t.id+'"><i class="live"></i><bdi dir="ltr" class="cdv">'+fmtRem(ms)+'</bdi><em class="cdl">'+(late?(__("گذشته")):(__("مانده")))+'</em></span>';
}
function nextTask(){
  var now=Date.now(),best=null;
  state.tasks.forEach(function(t){
    if(t.done||!t.tm)return;
    var tg=targetOf(t.d,t.tm);
    if(tg>=now&&(!best||tg<best.tg))best={id:t.id,t:t.t,tg:tg};
  });
  return best;
}
function nextRow(nx){
  if(!nx)return '';
  return '<div class="h3row"><span class="h3d">'+icon('clock')+("</span><div><b>"+__("کار بعدی")+"</b><small>")+esc(nx.t)+'</small></div><span class="h3n cd" data-tg="'+nx.tg+'" data-id="'+nx.id+'"><i class="live"></i><bdi dir="ltr" class="cdv">'+fmtRem(nx.tg-Date.now())+'</bdi></span></div>';
}
function keepDone(rem){
  var ch=false;
  rem.forEach(function(r){
    if(!r.done){var l=find(r.id);if(l&&l.done){r.done=true;r.doneAt=l.doneAt||Date.now();ch=true}}
  });
  return ch;
}
var fired={};
function tick(){
  tlNow();
  var now=Date.now();
  remCheck();foTick();
  document.querySelectorAll('.cd').forEach(function(el){
    var tg=Number(el.dataset.tg);if(!tg)return;
    var ms=tg-now,late=ms<0,v=el.querySelector('.cdv'),l=el.querySelector('.cdl');
    var te=Number(el.dataset.te)||0;
    if(te&&now>=tg&&now<te){
      if(v)v.textContent=fmtRem(te-now);
      if(l)l.textContent=(__("تا پایان"));
      el.classList.remove('late');
    }else{
      if(v)v.textContent=fmtRem(ms);
      if(l)l.textContent=late?(__("گذشته")):(__("مانده"));
      el.classList.toggle('late',late);
    }
    var id=el.dataset.id,fk=id+':'+tg;
    if(late&&!fired[fk]){
      fired[fk]=1;
      var t=find(id);
      if(ms>-5000&&t&&!t.done){
        if(t.r!==0){toast((__("زمان کار رسید:")+" ")+t.t,null,null,'rem');beep()}
        if((ui.tab==='today'||ui.tab==='week')&&sh.wrap.hidden)setTimeout(function(){render()},60);
      }
    }
  });
  if(typeof sh!=='undefined'&&sh&&!sh.wrap.hidden){
    var r=$('#fTimeRem');
    if(r&&sh.time.value){
      var ms2=targetOf(draft&&draft.d,sh.time.value)-now;
      r.textContent=(ms2<0?(__("گذشته:")+" "):(__("مانده تا این ساعت:")+" "))+fmtRem(ms2);
      r.classList.toggle('late',ms2<0);
    }
  }
  if(typeof tp!=='undefined'&&tp&&!tp.wrap.hidden)tpRem();
}
function tmSec(tm){var o=pt(tm);return o.h*3600+o.m*60+o.s}
function fmtDur(sec){var h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60,a=[];if(h)a.push(fa(h)+(" "+__("ساعت")));if(m)a.push(fa(m)+(" "+__("دقیقه")));if(s&&!h)a.push(fa(s)+(" "+__("ثانیه")));return a.join((" "+__("و")+" "))||'۰'}
function refreshTimeBtn(){
  var v=sh.time.value;
  if(!v)sh.end.value='';
  var ev=sh.end.value;
  $('#fEndTxt').textContent=ev?((__("تا")+" ")+fa(tmFull(ev))):(__("تا ساعت (اختیاری)"));
  $('#fEndBtn').classList.toggle('set',!!ev);
  $('#endRow').hidden=!v;
  $('#fTimeTxt').textContent=v?(ev?(__("از")+" ")+fa(tmFull(v)):fa(tmFull(v))):(__("انتخاب ساعت"));
  $('#fTimeBtn').classList.toggle('set',!!v);
  $('#fTimeRem').hidden=!v;
  if(v)tick();
  if(typeof draft!=='undefined'&&draft&&sh.rem)drawExtra();
}

/* ---------- glass time picker (wheel / drag / keys) ---------- */
var TP_H=44,TP_N={h:24,m:60,s:60};
var TP_C=5,TP_MID=2;
var tp={mode:'start',pos:{h:0,m:0,s:0},nt:{},hl:{},wrap:$('#tp'),v:{h:0,m:0,s:0},built:false,drag:null,closeT:null,acc:{h:0,m:0,s:0},last:{h:0,m:0,s:0}};
function tpEl(k){return document.querySelector('.tp-scroll[data-k="'+k+'"]')}
function tpBuild(){
  if(tp.built)return;
  ['h','m','s'].forEach(function(k){
    var html='',i;for(i=0;i<TP_N[k]*TP_C;i++)html+='<div class="tp-i">'+fa(pad(i%TP_N[k]))+'</div>';
    tpEl(k).innerHTML='<div class="tp-list">'+html+'</div>';
  });
  tp.built=true;
}
function tpMod(k,i){var n=TP_N[k];return ((Math.round(i)%n)+n)%n}
function tpPlace(k,f,anim){
  var list=tpEl(k).firstChild;if(!list)return;
  var n=TP_N[k];
  list.style.transition=anim?'transform .38s cubic-bezier(.2,.9,.25,1)':'none';
  list.style.transform='translateY('+(88-(f+n*TP_MID)*TP_H)+'px)';
  var c=Math.round(f)+n*TP_MID,items=list.children,i,old=tp.hl[k]||[],nw=[];
  for(i=0;i<old.length;i++)if(items[old[i]])items[old[i]].className='tp-i';
  for(i=c-2;i<=c+2;i++){if(items[i]){items[i].className='tp-i d'+Math.abs(i-c);nw.push(i)}}
  tp.hl[k]=nw;
}
function tpSettle(k){
  clearTimeout(tp.nt[k]);
  tp.nt[k]=setTimeout(function(){tp.pos[k]=tpMod(k,tp.pos[k]);tpPlace(k,tp.pos[k],false)},450);
}
function tpRem(){
  var el=$('#tpRem');if(!el)return;
  if(tp.mode==='end'&&sh.time.value){
    var du=tpSecs()-tmSec(sh.time.value);
    el.textContent=du>0?((__("مدت کار:")+" ")+fmtDur(du)):(__("ساعت پایان باید بعد از شروع باشد"));
    el.classList.toggle('late',du<=0);return;
  }
  var ms=targetOf(draft&&draft.d,pad(tp.v.h)+':'+pad(tp.v.m)+':'+pad(tp.v.s))-Date.now();
  el.textContent=(ms<0?(__("گذشته:")+" "):(__("مانده:")+" "))+fmtRem(ms);
  el.classList.toggle('late',ms<0);
}
function tpSecs(){return tp.v.h*3600+tp.v.m*60+tp.v.s}
function tpUpdate(){
  $('#tpBig').textContent=fa(pad(tp.v.h)+':'+pad(tp.v.m)+':'+pad(tp.v.s));
  ['h','m','s'].forEach(function(k){tpEl(k).setAttribute('aria-valuenow',tp.v[k])});
  tpRem();
}
function tpSet(k,i,anim){
  i=Math.round(i);
  var n=TP_N[k];
  if(i<-n*TP_MID+3||i>n*(TP_C-TP_MID)-4){
    var sh0=Math.round(tp.pos[k])-tpMod(k,tp.pos[k]);
    tp.pos[k]-=sh0;i-=sh0;tpPlace(k,tp.pos[k],false);void tpEl(k).firstChild.offsetWidth;
  }
  tp.pos[k]=i;tp.v[k]=tpMod(k,i);
  tpPlace(k,i,anim);tpSettle(k);tpUpdate();
}
function tpGo(k,target,anim){
  var n=TP_N[k],cur=tpMod(k,tp.pos[k]),d=target-cur;
  d=((d+n/2)%n+n)%n-n/2;
  tpSet(k,tp.pos[k]+Math.round(d),anim);
}
function openTp(mode){
  tpBuild();
  tp.mode=mode==='end'?'end':'start';
  $('#tpHead').textContent=tp.mode==='end'?(__("ساعت پایان")):(__("ساعت شروع"));
  var o;
  if(tp.mode==='end'){
    if(sh.end.value)o=pt(sh.end.value);
    else{var b=Math.min(86399,tmSec(sh.time.value)+3600);o={h:Math.floor(b/3600),m:Math.floor(b%3600/60),s:b%60}}
  }else if(sh.time.value)o=pt(sh.time.value);
  else{var n=new Date();o={h:n.getHours(),m:n.getMinutes(),s:n.getSeconds()}}
  clearTimeout(tp.closeT);
  tp.wrap.hidden=false;
  ['h','m','s'].forEach(function(k){tp.v[k]=Math.min(TP_N[k]-1,o[k]);tp.pos[k]=tp.v[k];clearTimeout(tp.nt[k]);tpPlace(k,tp.v[k],false)});
  tpUpdate();
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    tp.wrap.classList.add('open');
    try{tpEl('h').focus({preventScroll:true})}catch(e){}
  })});
}
function closeTp(){
  tp.wrap.classList.remove('open');
  clearTimeout(tp.closeT);
  tp.closeT=setTimeout(function(){tp.wrap.hidden=true},320);
}
function saveTp(){
  var v=pad(tp.v.h)+':'+pad(tp.v.m)+':'+pad(tp.v.s);
  if(tp.mode==='end'){
    if(tpSecs()<=tmSec(sh.time.value)){var tb=$('#tpBig');tb.classList.remove('shake');void tb.offsetWidth;tb.classList.add('shake');return}
    sh.end.value=v;
  }else{
    sh.time.value=v;
    if(sh.end.value&&tmSec(sh.end.value)<=tmSec(v)){sh.end.value='';toast((__("ساعت پایان پاک شد چون قبل از ساعت شروع بود")),null,null,'warn')}
  }
  refreshTimeBtn();closeTp();tick();
}
['h','m','s'].forEach(function(k){
  var sc=tpEl(k);
  sc.addEventListener('wheel',function(e){
    e.preventDefault();
    var now=Date.now(),dy=e.deltaMode===1?e.deltaY*33:e.deltaY;
    if(now-tp.last[k]>250)tp.acc[k]=0;
    tp.last[k]=now;tp.acc[k]+=dy;
    if(Math.abs(tp.acc[k])>=50){var st=tp.acc[k]>0?1:-1;tp.acc[k]=0;tpSet(k,tp.pos[k]+st,true)}
  },{passive:false});
  sc.addEventListener('keydown',function(e){
    var st={ArrowDown:1,ArrowUp:-1,PageDown:5,PageUp:-5}[e.key];
    if(st){e.preventDefault();tpSet(k,tp.pos[k]+st,true)}
    else if(e.key==='Home'){e.preventDefault();tpGo(k,0,true)}
    else if(e.key==='End'){e.preventDefault();tpGo(k,TP_N[k]-1,true)}
  });
  sc.addEventListener('pointerdown',function(e){
    if(e.button!==undefined&&e.button!==0)return;
    clearTimeout(tp.nt[k]);tp.pos[k]=tpMod(k,tp.pos[k]);tpPlace(k,tp.pos[k],false);
    tp.drag={k:k,y:e.clientY,i:tp.pos[k],moved:false,f:tp.pos[k]};
    try{sc.setPointerCapture(e.pointerId)}catch(x){}
    sc.style.cursor='grabbing';
    try{sc.focus({preventScroll:true})}catch(x){}
  });
  sc.addEventListener('pointermove',function(e){
    var d=tp.drag;if(!d||d.k!==k)return;
    var dy=e.clientY-d.y;
    if(Math.abs(dy)>4)d.moved=true;
    if(!d.moved)return;
    var f=Math.max(-TP_N[k]*TP_MID+4,Math.min(TP_N[k]*(TP_C-TP_MID)-5,d.i-dy/TP_H));
    d.f=f;tp.pos[k]=f;tpPlace(k,f,false);
    var r=tpMod(k,f);
    if(r!==tp.v[k]){tp.v[k]=r;tpUpdate()}
  });
  function end(e){
    var d=tp.drag;if(!d||d.k!==k)return;
    tp.drag=null;sc.style.cursor='';
    if(d.moved)tpSet(k,d.f,true);
    else if(e.type==='pointerup'){
      var rel=e.clientY-sc.getBoundingClientRect().top;
      tpSet(k,tp.pos[k]+Math.round((rel-110)/TP_H),true);
    }
  }
  sc.addEventListener('pointerup',end);
  sc.addEventListener('pointercancel',end);
});
$('#tpSave').addEventListener('click',saveTp);
$('#tpCancel').addEventListener('click',closeTp);
$('#tpDim').addEventListener('click',closeTp);
$('#tpNow').addEventListener('click',function(){
  var n=new Date();tpGo('h',n.getHours(),true);tpGo('m',n.getMinutes(),true);tpGo('s',n.getSeconds(),true);
});
tp.wrap.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();saveTp()}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!tp.wrap.hidden){e.preventDefault();closeTp()}});

/* ---------- notifications (banners + center) ---------- */
var NK={ok:['check','#1fae58',(__("انجام شد"))],add:['plus','#0a7aff',(__("افزوده شد"))],edit:['edit','#f08c00',(__("ویرایش"))],del:['trash','#e5322a',(__("حذف"))],rem:['bell','#ff9f0a',(__("یادآوری"))],info:['spark','#5c6bc0','Ario'],vip:['star','#a259f2','VIP'],focus:['timer','#ff375f',(__("تمرکز"))],warn:['bell','#e5322a',(__("هشدار"))]};
function nk(k){return NK[k]||NK.info}
function relT(ts){
  var d=Date.now()-ts,m=Math.floor(d/60000);
  if(d<45000)return (__("همین حالا"));
  if(m<60)return fa(Math.max(1,m))+(" "+__("دقیقه پیش"));
  var h=Math.floor(m/60);if(h<24)return fa(h)+(" "+__("ساعت پیش"));
  var dd=Math.floor(h/24);if(dd<7)return fa(dd)+(" "+__("روز پیش"));
  return F.short.format(new Date(ts));
}
function unreadN(){return state.notifs.filter(function(n){return n.ts>state.nseen}).length}
function bellInner(){var u=unreadN();return icon('bell')+'<i class="bdg"'+(u?'':' hidden')+'>'+(u>9?'۹+':fa(u))+'</i>'}
function bellBtn(){return ("<button type=\"button\" class=\"round glass bellbtn\" data-act=\"openNotifs\" aria-label=\""+__("اعلان‌ها")+"\">")+bellInner()+'</button>'}
function updateBell(ring){
  document.querySelectorAll('.bellbtn').forEach(function(b){
    b.innerHTML=bellInner();
    if(ring){b.classList.remove('ring');void b.offsetWidth;b.classList.add('ring')}
  });
}
function notify(kind,title,msg,act,fn,nolog,quiet){
  var n={id:uid(),ts:Date.now(),k:NK[kind]?kind:'info',t:String(title).slice(0,60),m:String(msg).slice(0,200),c:1};
  if(!nolog){
    /* the same message again = one entry with a repeat counter, moved to the top */
    var i=state.notifs.findIndex(function(o){return o.k===n.k&&o.t===n.t&&o.m===n.m});
    if(i>-1){var o=state.notifs.splice(i,1)[0];o.ts=n.ts;o.c=Math.min(999,(o.c||1)+1);n=o}
    state.notifs.unshift(n);
    if(state.notifs.length>60)state.notifs.length=60;
    writeCache();
    updateBell(true);
    if(!nc.wrap.hidden)ncDraw();
  }
  if(!quiet)showBanner(n,act,fn,nolog);
}
function toast(msg,act,fn,kind,nolog){notify(kind||'info',nk(kind||'info')[2],msg,act,fn,nolog)}
function nbBadge(el,c){
  var b=el.querySelector('.nbc'),t=el.querySelector('.nbt b');
  if(c<2){if(b)b.remove();return}
  if(!b){b=document.createElement('i');b.className='nbc';t.appendChild(b)}
  b.textContent='×'+fa(c);
  b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');
}
function showBanner(n,act,fn,unlogged){
  var box=$('#rbs'),k=nk(n.k),key=n.k+'|'+n.t+'|'+n.m;
  /* same banner already on screen: bump its counter instead of stacking another one */
  var ex=[].filter.call(box.children,function(e){return e.dataset.key===key&&!e.classList.contains('out')})[0];
  if(ex){
    ex._c=unlogged?(ex._c||1)+1:Math.max(n.c||1,(ex._c||1)+1);
    nbBadge(ex,ex._c);
    if(act){ex._fn=fn}
    ex.classList.remove('bump');void ex.offsetWidth;ex.classList.add('bump');
    clearTimeout(ex._t);ex._t=setTimeout(function(){dismissBanner(ex)},act?6000:4200);
    return;
  }
  var el=document.createElement('div');
  el.className='nb';el.setAttribute('role','status');el.dataset.key=key;el._fn=fn;el._c=n.c||1;
  el.innerHTML='<span class="nbi" style="--c:'+k[1]+'">'+icon(k[0])+'</span><div class="nbt"><b>'+esc(n.t)+'</b><span>'+esc(n.m)+'</span></div>'+(act?'<button type="button" class="nba">'+esc(act)+'</button>':("<em>"+__("الان")+"</em>"));
  if(el._c>1)nbBadge(el,el._c);
  if(act){var bt=el.querySelector('.nba');bt.addEventListener('click',function(e){e.stopPropagation();try{el._fn()}catch(x){}dismissBanner(el)})}
  box.appendChild(el);
  while(box.children.length>3)box.removeChild(box.firstChild);
  el._t=setTimeout(function(){dismissBanner(el)},act?6000:4200);
}
function dismissBanner(el){
  if(!el||!el.parentNode||el.classList.contains('out'))return;
  clearTimeout(el._t);el.classList.add('out');
  setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},560);
}
var nbDrag=null;
$('#rbs').addEventListener('pointerdown',function(e){
  var el=e.target.closest('.nb');if(!el||e.target.closest('button'))return;
  clearTimeout(el._t);nbDrag={el:el,y:e.clientY,dy:0,id:e.pointerId};
  try{el.setPointerCapture(e.pointerId)}catch(x){}
});
$('#rbs').addEventListener('pointermove',function(e){
  if(!nbDrag||e.pointerId!==nbDrag.id)return;
  nbDrag.dy=Math.min(0,e.clientY-nbDrag.y);
  nbDrag.el.style.animation='none';
  nbDrag.el.style.transform='translateY('+nbDrag.dy+'px)';
  nbDrag.el.style.opacity=String(Math.max(.2,1+nbDrag.dy/140));
});
function nbEnd(e){
  if(!nbDrag||e.pointerId!==nbDrag.id)return;
  var d=nbDrag;nbDrag=null;
  if(e.type==='pointerup'&&Math.abs(d.dy)<6){dismissBanner(d.el);openNC();return}
  if(e.type==='pointerup'&&d.dy<-28){d.el.style.animation='';dismissBanner(d.el)}
  else{d.el.style.transform='';d.el.style.opacity='';d.el.style.animation='none';d.el._t=setTimeout(function(){dismissBanner(d.el)},2500)}
}
$('#rbs').addEventListener('pointerup',nbEnd);
$('#rbs').addEventListener('pointercancel',nbEnd);

var nc={wrap:$('#nc'),list:$('#ncList'),closeT:null};
function ncDraw(){
  var seen=nc.seenAt||0;
  if(!state.notifs.length){
    nc.list.innerHTML='<div class="nc-empty"><span class="nbi" style="--c:#8e93a8">'+icon('bell')+("</span><b>"+__("اعلانی نیست")+"</b><p>"+__("وقتی کاری را انجام بدهی یا اضافه کنی، اینجا می‌بینی.")+"</p></div>");
    $('#ncClear').hidden=true;return;
  }
  $('#ncClear').hidden=false;
  nc.list.innerHTML=state.notifs.map(function(n){
    var k=nk(n.k);
    return '<div class="ni'+(n.ts>seen?' new':'')+'" data-id="'+esc(n.id)+'"><span class="nbi" style="--c:'+k[1]+'">'+icon(k[0])+'</span><div class="nbt"><b>'+esc(n.t)+(n.c>1?'<i class="nbc">×'+fa(n.c)+'</i>':'')+'</b><span>'+esc(n.m)+'</span><small>'+relT(n.ts)+'</small></div><button type="button" class="nx" data-nx="'+esc(n.id)+("\" aria-label=\""+__("حذف اعلان")+"\">")+icon('close')+'</button></div>';
  }).join('');
}
function openNC(){
  nc.seenAt=state.nseen;
  ncDraw();
  state.nseen=Date.now();writeCache();updateBell();
  clearTimeout(nc.closeT);nc.wrap.hidden=false;
  document.documentElement.style.overflow='hidden';
  nc.list.scrollTop=0;
  requestAnimationFrame(function(){requestAnimationFrame(function(){nc.wrap.classList.add('open')})});
}
function closeNC(){
  nc.wrap.classList.remove('open');
  document.documentElement.style.overflow='';
  clearTimeout(nc.closeT);
  nc.closeT=setTimeout(function(){nc.wrap.hidden=true},300);
}
$('#ncDim').addEventListener('click',closeNC);
$('#ncClose').addEventListener('click',closeNC);
/* removal: the row dissolves from its right edge towards the left (blur + slide), then folds away */
function ncOut(row,delay,cb){
  row.style.animationDelay=delay+'ms';row.classList.add('gone');
  setTimeout(function(){
    row.style.height=row.offsetHeight+'px';row.style.overflow='hidden';void row.offsetHeight;
    row.classList.add('fold');
    setTimeout(function(){if(cb)cb()},260);
  },delay+540);
}
$('#ncClear').addEventListener('click',function(){
  var rows=[].slice.call(nc.list.querySelectorAll('.ni:not(.gone)'));
  if(!rows.length||matchMedia('(prefers-reduced-motion:reduce)').matches){state.notifs=[];writeCache();updateBell();ncDraw();return}
  $('#ncClear').disabled=true;
  var last=rows.length-1;
  rows.forEach(function(r,i){ncOut(r,Math.min(i,9)*70,i===last?function(){state.notifs=[];writeCache();updateBell();ncDraw();$('#ncClear').disabled=false}:null)});
  updateBellNow();
});
function updateBellNow(){state.nseen=Date.now();updateBell()}
nc.list.addEventListener('click',function(e){
  var b=e.target.closest('[data-nx]');if(!b)return;
  var id=b.dataset.nx,row=b.closest('.ni');
  var go=function(){state.notifs=state.notifs.filter(function(n){return n.id!==id});writeCache();updateBell();ncDraw()};
  if(row&&!row.classList.contains('gone')){ncOut(row,0,go)}else if(!row)go();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!nc.wrap.hidden){e.preventDefault();closeNC()}});
actions.openNotifs=openNC;

/* ---------- sheet ---------- */
var sh={wrap:$('#sheet'),form:$('#sheetForm'),title:$('#fTitle'),notes:$('#fNotes'),time:$('#fTime'),end:$('#fEnd'),strip:$('#dateStrip'),cats:$('#catChips'),pri:$('#priSeg'),del:$('#btnDel'),noDate:$('#noDate')};
var editing=null,draft=null,closeT=null;
function drawSheet(center){
  refreshTimeBtn();
  var td=todayKey(),days=[],i;
  for(i=0;i<21;i++)days.push(addDays(td,i));
  if(draft.d&&days.indexOf(draft.d)<0)days.push(draft.d);
  days.sort();
  sh.strip.innerHTML=days.map(function(k){
    var d=parse(k),lab=k===td?(__("امروز")):k===addDays(td,1)?(__("فردا")):(holiday(k)||isWkend(d.getDay())?(__("تعطیل")):'');
    return '<button type="button" class="dc'+(isOff(k)?' off':'')+'" data-d="'+k+'" aria-pressed="'+(draft.d===k)+'"><span class="w">'+WK[d.getDay()]+'</span><b>'+F.day.format(d)+'</b><small>'+(lab||'&nbsp;')+'</small></button>';
  }).join('');
  sh.noDate.setAttribute('aria-pressed',String(!draft.d));
  sh.pri.innerHTML=PRI.map(function(p){return '<button type="button" data-p="'+p.v+'" aria-pressed="'+(draft.p===p.v)+'">'+p.n+'</button>'}).join('');
  var cu=draft.col&&SWATCH.indexOf(draft.col)<0;
  $('#colSw').innerHTML='<button type="button" class="swatch def" data-col="" aria-pressed="'+(!draft.col)+("\" aria-label=\""+__("رنگ دسته")+"\">"+__("رنگ")+"<br>"+__("دسته","category")+"</button>")+
    SWATCH.map(function(h){return '<button type="button" class="swatch" data-col="'+h+'" style="--cc:'+h+'" aria-pressed="'+(draft.col===h)+("\" aria-label=\""+__("رنگ")+"\">")+(draft.col===h?icon('check'):'')+'</button>'}).join('')+
    '<label class="swatch cust" aria-pressed="'+cu+("\" aria-label=\""+__("رنگ دلخواه")+"\"")+(cu?' style="--cc:'+cvar(draft.col)+';background:'+cvar(draft.col)+'"':'')+'>'+(cu?icon('check'):'')+'<input type="color" id="colCustom" value="'+(cu?draft.col:'#0a7aff')+'"></label>';
  sh.cats.innerHTML=CATS.map(function(c){return '<button type="button" class="chip" data-c="'+c.id+'" style="--cc:'+cvar(c.c)+'" aria-pressed="'+(draft.c===c.id)+'"><i></i>'+c.n+'</button>'}).join('');
  if(center){
    var s=sh.strip.querySelector('[aria-pressed="true"]');
    if(s){try{s.scrollIntoView({inline:'center',block:'nearest'})}catch(e){}}
  }
}
function openSheet(id,pre){
  var t=id?find(id):null;
  editing=t?t.id:null;
  var defDate=ui.tab==='week'?ui.day:todayKey();
  draft=t?{col:/^#[0-9a-fA-F]{6}$/.test(t.col||'')?t.col:'',d:t.d||null,p:t.p||0,c:cat(t.c).id,r:t.r==null?-1:t.r,rp:t.rp||'',st:(t.st||[]).map(function(x){return {id:x.id,t:x.t,d:!!x.d}})}:{col:'',d:defDate,p:0,c:pre||((ui.cat&&ui.cat!=='all')?ui.cat:defCat()),r:-1,rp:'',st:[]};
  $('#subIn').value='';draft.tg=t&&Array.isArray(t.tg)?t.tg.slice():[];$('#tgIn').value='';
  sh.title.value=t?t.t:'';sh.notes.value=t?(t.n||''):'';sh.time.value=t?(t.tm||''):'';sh.end.value=t?(t.te||''):'';
  $('#sheetHead').textContent=t?(__("ویرایش کار")):(__("کار جدید"));
  sh.del.hidden=!t;
  drawSheet(false);
  clearTimeout(closeT);
  sh.wrap.hidden=false;
  document.documentElement.style.overflow='hidden';
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    sh.wrap.classList.add('open');
    drawSheet(true);
    if(!t)setTimeout(function(){sh.title.focus({preventScroll:true})},300);
  })});
}
function closeSheet(){
  sh.wrap.classList.remove('open');
  document.documentElement.style.overflow='';
  clearTimeout(closeT);
  closeT=setTimeout(function(){sh.wrap.hidden=true},330);
}
sh.form.addEventListener('submit',function(e){e.preventDefault();saveSheet()});
$('#btnCancel').addEventListener('click',closeSheet);
$('#dim').addEventListener('click',closeSheet);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!sh.wrap.hidden&&tp.wrap.hidden)closeSheet()});
sh.strip.addEventListener('click',function(e){var b=e.target.closest('.dc');if(!b)return;draft.d=b.dataset.d;drawSheet(false)});

/* ---------- Jalali date picker (any date) ---------- */
function openDatePick(cur,cb){
  var fm=mFirst(cur||todayKey()),sel=cur,w=document.createElement('div');
  w.className='cfm-wrap';
  w.innerHTML=("<div class=\"dim\"></div><div class=\"cfm dpick glass\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("انتخاب تاریخ")+"\" style=\"text-align:start;padding:16px 14px 14px\"></div>");
  var box=w.querySelector('.cfm');
  function close(){w.classList.remove('open');setTimeout(function(){w.remove()},300);document.removeEventListener('keydown',kd)}
  function kd(e){if(e.key==='Escape')close()}
  function draw(){
    var len=mLen(fm),lead=wkLead(parse(fm)),td=todayKey(),mc='',i;
    var nx=icon('chev').replace('chv0','nx');
    wkHead().forEach(function(x){mc+='<span class="mh">'+x+'</span>'});
    for(i=0;i<lead;i++)mc+='<span class="mc blank"></span>';
    for(i=0;i<len;i++){var k=addDays(fm,i);mc+='<button type="button" class="mc'+(k===td?' today':'')+(isOff(k)?' off':'')+'" data-pd="'+k+'" aria-pressed="'+(k===sel)+'" aria-label="'+F.long.format(parse(k))+(holiday(k)?CMA+holiday(k):'')+'"><b>'+fa(i+1)+'</b></button>'}
    box.innerHTML=("<div class=\"weeknav\"><button type=\"button\" data-pm=\"-1\" aria-label=\""+__("ماه قبل")+"\">")+icon('chev')+'</button><b>'+F.month.format(parse(fm))+("</b><button type=\"button\" data-pm=\"1\" aria-label=\""+__("ماه بعد")+"\">")+nx+'</button></div><div class="mgrid">'+mc+("</div><div class=\"dpb\"><button type=\"button\" data-pt=\"1\">"+__("امروز")+"</button><button type=\"button\" data-pc=\"1\">"+__("بستن")+"</button></div>");
  }
  box.addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    if(b.dataset.pd){var k=b.dataset.pd;close();cb(k);return}
    if(b.dataset.pm){fm=b.dataset.pm==='1'?mFirst(addDays(fm,mLen(fm))):mFirst(addDays(fm,-1));draw();return}
    if(b.dataset.pt){var t=todayKey();close();cb(t);return}
    if(b.dataset.pc)close();
  });
  w.querySelector('.dim').addEventListener('click',close);
  document.addEventListener('keydown',kd);
  draw();document.body.appendChild(w);
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
$('#pickDate').addEventListener('click',function(){openDatePick(draft.d,function(k){draft.d=k;drawSheet(true)})});
sh.noDate.addEventListener('click',function(){draft.d=draft.d?null:todayKey();drawSheet(true)});
$('#clearTime').addEventListener('click',function(){sh.time.value='';sh.end.value='';refreshTimeBtn()});
$('#fTimeBtn').addEventListener('click',function(){openTp('start')});
$('#fEndBtn').addEventListener('click',function(){openTp('end')});
sh.pri.addEventListener('click',function(e){var b=e.target.closest('[data-p]');if(!b)return;draft.p=Number(b.dataset.p);drawSheet(false)});
$('#colSw').addEventListener('click',function(e){var b=e.target.closest('button[data-col]');if(!b)return;draft.col=b.dataset.col;drawSheet(false)});
$('#colSw').addEventListener('input',function(e){if(e.target.id==='colCustom'){draft.col=e.target.value}});
$('#colSw').addEventListener('change',function(e){if(e.target.id==='colCustom'){draft.col=e.target.value;drawSheet(false)}});
sh.cats.addEventListener('click',function(e){var b=e.target.closest('[data-c]');if(!b)return;draft.c=b.dataset.c;drawSheet(false)});
sh.del.addEventListener('click',function(){
  var id=editing;
  if(id){var tt=find(id);askConfirm({title:(__("حذف کار")),msg:'«'+(tt?tt.t:'')+(__("» حذف شود؟ بعد از حذف می‌توانی بازگردانی کنی.")),btns:[{t:(__("حذف")),cls:'bad',fn:function(){closeSheet();removeTasks([id],(__("کار حذف شد")))}}]})}
});

/* ===== v2: swipe, reminders, repeats, subtasks, categories, month calendar ===== */
var RPN={daily:(__("هر روز")),weekly:(__("هر هفته")),monthly:(__("هر ماه"))};
var REM=[[-1,(__("بدون"))],[0,(__("سر وقت"))],[5,(__("۵ دقیقه قبل"))],[15,(__("۱۵ دقیقه قبل"))],[30,(__("۳۰ دقیقه قبل"))],[60,(__("۱ ساعت قبل"))],[1440,(__("۱ روز قبل"))]];
var SWATCH=['#0a7aff','#f08c00','#a259f2','#1fae58','#f0266a','#00a9c9','#e5322a','#8d6e63','#5c6bc0','#26a69a'];
ui.wv='week';ui.sr='7';
var swipedAt=0,sw=null;

function segG(items,act,cur){
  return '<div class="seg" role="group">'+items.map(function(i){return '<button type="button" data-act="'+act+'" data-v="'+i[0]+'" aria-pressed="'+(cur===i[0])+'">'+i[1]+'</button>'}).join('')+'</div>';
}

/* ---------- Jalali month helpers ---------- */
var JF=null;try{JF=new Intl.DateTimeFormat('en-u-ca-persian-nu-latn',{year:'numeric',month:'numeric',day:'numeric'})}catch(e){}
function jp(k){
  var o={y:0,m:0,d:1};
  if(EN){var dg=parse(k);return {y:dg.getFullYear(),m:dg.getMonth()+1,d:dg.getDate()}}   /* English: Gregorian months */
  if(!JF)return o;
  JF.formatToParts(parse(k)).forEach(function(p){if(p.type==='year')o.y=+p.value;else if(p.type==='month')o.m=+p.value;else if(p.type==='day')o.d=+p.value});
  return o;
}
function mFirst(k){return addDays(k,-(jp(k).d-1))}
function mLen(fm){for(var n=29;n<=31;n++){if(jp(addDays(fm,n)).d===1)return n}return 30}

/* ---------- official holidays (solar fixed + lunar via Islamic civil calendar; lunar dates can differ by a day) ---------- */
var HF=null;try{HF=new Intl.DateTimeFormat('en-u-ca-islamic-civil-nu-latn',{month:'numeric',day:'numeric'})}catch(e){}
var HS={'1-1':(__("نوروز")),'1-2':(__("نوروز")),'1-3':(__("نوروز")),'1-4':(__("نوروز")),'1-12':(__("روز جمهوری اسلامی")),'1-13':(__("سیزده‌به‌در")),'3-14':(__("رحلت امام خمینی")),'3-15':(__("قیام ۱۵ خرداد")),'11-22':(__("پیروزی انقلاب اسلامی")),'12-29':(__("ملی شدن صنعت نفت"))};
var HH={'1-9':(__("تاسوعای حسینی")),'1-10':(__("عاشورای حسینی")),'2-20':(__("اربعین حسینی")),'2-28':(__("رحلت پیامبر و شهادت امام حسن")),'2-30':(__("شهادت امام رضا")),'3-17':(__("میلاد پیامبر و امام صادق")),'6-3':(__("شهادت حضرت فاطمه")),'7-13':(__("ولادت امام علی")),'7-27':(__("مبعث پیامبر")),'8-15':(__("نیمه شعبان")),'9-21':(__("شهادت امام علی")),'10-1':(__("عید فطر")),'10-2':(__("تعطیلی عید فطر")),'10-25':(__("شهادت امام صادق")),'12-10':(__("عید قربان")),'12-18':(__("عید غدیر خم"))};
var holC={};
function hh(k){var o={m:0,d:0};if(!HF)return o;HF.formatToParts(parse(k)).forEach(function(p){if(p.type==='month')o.m=+p.value;else if(p.type==='day')o.d=+p.value});return o}
function holiday(k){
  if(EN)return '';   /* the holiday table is the Iranian one */
  if(holC[k]!==undefined)return holC[k];
  var j=jp(k),n=HS[j.m+'-'+j.d]||'';
  if(!n&&HF){var h=hh(k),id=h.m+'-'+h.d;
    if(id==='2-29'&&hh(addDays(k,1)).d===1)id='2-30';
    n=HH[id]||''}
  return (holC[k]=n);
}
function isOff(k){return !!holiday(k)||isWkend(parse(k).getDay())}
function monthSel(k){var f=mFirst(k);return f===mFirst(todayKey())?todayKey():f}

/* ---------- rows ---------- */
function rowHTML(t,o){
  var c=cat(t.c),td=todayKey(),meta=[],st=t.st||[];
  meta.push('<span class="tag" style="--cc:'+cvar(c.c)+'"><i></i>'+c.n+'</span>');
  (t.tg||[]).slice(0,3).forEach(function(g){meta.push('<span class="mt tgc">#'+esc(g)+'</span>')});
  if(t.tm){meta.push('<span class="mt">'+icon('clock')+'<bdi dir="ltr">'+fa(tmFull(t.tm))+(t.te?' – '+fa(tmFull(t.te)):'')+'</bdi></span>');if(!t.done)meta.push(cdHTML(t))}
  if(o&&o.showDate&&t.d){var late=t.d<td&&!t.done;meta.push('<span class="mt'+(late?' bad':'')+'">'+relDate(t.d)+'</span>')}
  if(t.rp&&RPN[t.rp])meta.push('<span class="mt">'+icon('refresh')+RPN[t.rp]+'</span>');
  if(t.r!=null&&t.r>=0&&!t.done)meta.push('<span class="mt">'+icon('bell')+'</span>');
  if(st.length)meta.push('<span class="mt">'+icon('check')+fa(st.filter(function(s){return s.d}).length)+'/'+fa(st.length)+'</span>');
  var subs=st.length?'<div class="subs">'+st.map(function(s){return '<button type="button" class="sub'+(s.d?' on':'')+'" data-sid="'+esc(s.id)+'" aria-pressed="'+!!s.d+'"><i>'+icon('check')+'</i><span>'+esc(s.t)+'</span></button>'}).join('')+'</div>':'';
  var lab=(t.done?(__("انجام‌شده:")+" "):(__("انجام شد:")+" "))+esc(t.t);
  return '<li class="row'+(t.done?' done':'')+(t.col?' hascol':'')+'" data-id="'+t.id+'" style="--cc:'+cvar(t.col||c.c)+'">'+
    '<span class="swl" aria-hidden="true">'+icon('check')+(t.done?(__("ناتمام")):(__("انجام شد")))+("</span><span class=\"swr\" aria-hidden=\"true\">"+__("حذف"))+icon('trash')+'</span>'+
    '<div class="rc"><div class="rmain">'+
    '<button type="button" class="chk" aria-pressed="'+t.done+'" aria-label="'+lab+'">'+icon('check')+'</button>'+
    '<div class="body" role="button" tabindex="0" aria-label="'+lab+'"><div class="ttl">'+esc(t.t)+'</div><div class="meta">'+meta.join('')+'</div></div>'+
    (t.p>0?icon('flag','flag p'+t.p):'')+("<button type=\"button\" class=\"rowedit\" aria-label=\""+__("ویرایش:")+" ")+esc(t.t)+'">'+icon('edit')+'</button>'+(state.profile.sort==='manual'?("<button type=\"button\" class=\"grip\" aria-label=\""+__("جابه‌جایی:")+" ")+esc(t.t)+'">'+icon('grip')+'</button>':'')+'</div>'+subs+'</div></li>';
}

/* ---------- complete / undo / repeat ---------- */
function advDate(k,rp){
  if(rp==='daily')return addDays(k,1);
  if(rp==='weekly')return addDays(k,7);
  var d=jp(k).d,fm=mFirst(k),nf=addDays(fm,mLen(fm)),nl=mLen(nf);
  return addDays(nf,Math.min(d,nl)-1);
}
function spawnNext(t){
  var td=todayKey(),n=t.d||td,i=0;
  do{n=advDate(n,t.rp);i++}while(n<=td&&i<800);
  if(state.tasks.some(function(x){return !x.done&&x.t===t.t&&x.rp===t.rp&&x.d===n}))return null;
  var c={id:uid(),done:false,doneAt:0,ts:Date.now(),t:t.t,n:t.n||'',d:n,tm:t.tm||'',te:t.te||'',col:t.col||'',p:t.p||0,c:t.c,rp:t.rp,tg:(t.tg||[]).slice()};
  if(t.r!=null)c.r=t.r;
  if(t.st&&t.st.length)c.st=t.st.map(function(s){return {id:uid(),t:s.t,d:false}});
  state.tasks.push(c);
  return c;
}
function toggle(id){
  var t=find(id);if(!t)return;
  if(t.done){
    var c0=document.querySelector('.row[data-id="'+id+'"] .chk');
    if(c0){c0.classList.remove('pop');void c0.offsetWidth;c0.classList.add('pop')}
    return;
  }
  t.done=true;t.doneAt=Date.now();
  (t.st||[]).forEach(function(s){s.d=true});
  hBump(todayKey(),'n',1);
  var vipNew=checkVip();
  var tdk=todayKey(),tdl=state.tasks.filter(function(x){return x.d===tdk}),allToday=tdl.length>1&&t.d===tdk&&tdl.every(function(x){return x.done});
  var nx=t.rp?spawnNext(t):null;
  if(nx)t.sp=nx.id;else delete t.sp;
  mutate();
  var b=document.querySelector('.row[data-id="'+id+'"] .chk');
  if(b){b.classList.add('pop');b.closest('.row').classList.add('just');burst(b);playDone(t,allToday)}
  notify('ok',(__("کار انجام شد","Task done")),t.t);
  if(nx)toast((__("کار تکراری برای")+" ")+relDate(nx.d)+(" "+__("ساخته شد")),null,null,'add');
  if(vipNew)toast((__("تبریک!")+" ")+fa(VIPDAYS)+(" "+__("روز پیاپی کامل شد و عکس‌های VIP برایت باز شد")),null,null,'vip');
  gmCheck();
  dismissReminder(id);
}
function toggleCheck(id){var t=find(id);if(t&&t.done)undone(id);else toggle(id)}
function undone(id){
  var t=find(id);if(!t||!t.done)return;
  hBump(key(new Date(t.doneAt||Date.now())),'n',-1);
  t.done=false;t.doneAt=0;
  if(t.sp){var sp=find(t.sp);if(sp&&!sp.done)state.tasks=state.tasks.filter(function(x){return x.id!==t.sp});delete t.sp}
  mutate();
  notify('edit',(__("برگشت به انجام‌نشده")),t.t);
}
function toggleSub(id,sid){
  var t=find(id);if(!t||!t.st)return;
  var s=t.st.find(function(x){return x.id===sid});if(!s)return;
  s.d=!s.d;mutate();
}

/* ---------- swipe ---------- */
var vw=$('#view');
vw.addEventListener('pointerdown',function(e){
  if(e.pointerType==='mouse'&&e.button!==0)return;
  var rc=e.target.closest('.rc');
  if(!rc||e.target.closest('.chk,.rowedit,.sub'))return;
  sw={rc:rc,row:rc.parentNode,x:e.clientX,y:e.clientY,dx:0,lock:0,id:e.pointerId,w:rc.offsetWidth};
});
vw.addEventListener('pointermove',function(e){
  if(!sw||e.pointerId!==sw.id)return;
  var dx=e.clientX-sw.x,dy=e.clientY-sw.y;
  if(!sw.lock){
    if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.3){sw.lock=1;sw.rc.classList.add('drag');try{sw.rc.setPointerCapture(sw.id)}catch(x){}}
    else if(Math.abs(dy)>10){sw=null;return}
    else return;
  }
  sw.dx=dx;
  var d=Math.max(-sw.w*.95,Math.min(sw.w*.95,dx));
  sw.rc.style.transform='translateX('+d+'px)';
  sw.row.classList.toggle('sw-l',dx>0);
  sw.row.classList.toggle('sw-r',dx<0);
});
function swEnd(e){
  if(!sw||e.pointerId!==sw.id)return;
  var s=sw;sw=null;
  if(s.lock!==1)return;
  swipedAt=Date.now();
  s.rc.classList.remove('drag');
  var id=s.row.dataset.id,dx=s.dx;
  if(e.type==='pointerup'&&Math.abs(dx)>=Math.min(110,s.w*.3)){
    s.rc.style.transform='translateX('+(dx>0?s.w:-s.w)+'px)';
    setTimeout(function(){
      if(dx>0){var t=find(id);if(t&&t.done)undone(id);else toggle(id)}
      else removeTasks([id],(__("کار حذف شد")));
    },190);
  }else{
    s.rc.style.transform='';
    setTimeout(function(){s.row.classList.remove('sw-l','sw-r')},280);
  }
}
vw.addEventListener('pointerup',swEnd);
vw.addEventListener('pointercancel',swEnd);

/* ---------- month calendar ---------- */
var TLH=60;
function tlRange(ev){
  var mn=420,mx=1320;
  ev.forEach(function(x){mn=Math.min(mn,x.s);mx=Math.max(mx,x.e)});
  return {a:Math.max(0,Math.floor(mn/60)),b:Math.min(24,Math.ceil(mx/60))};
}
function dayTimeline(){
  var k=ui.day,all=state.tasks.filter(function(t){return t.d===k&&fOK(t)});
  var timed=all.filter(function(t){return t.tm}),free=sortDay(all.filter(function(t){return !t.tm}));
  var ev=timed.map(function(t){
    var a=pt(t.tm),s=a.h*60+a.m,e;
    if(t.te){var b=pt(t.te);e=b.h*60+b.m}else e=s+45;
    if(e<=s)e=s+30;
    return {t:t,s:s,e:Math.min(e,1440)};
  }).sort(function(x,y){return x.s-y.s||y.e-x.e});
  var R=tlRange(ev),n=R.b-R.a,H=TLH;
  /* lay out overlapping tasks side by side */
  var cl=[],cols=[],cend=0;
  ev.forEach(function(x){
    if(!cl.length||x.s>=cend){cl.push({n:0,items:[]});cols=[];cend=0}
    var c=cl[cl.length-1],j=0;
    while(cols[j]!==undefined&&cols[j]>x.s)j++;
    cols[j]=x.e;x.col=j;c.n=Math.max(c.n,j+1);c.items.push(x);cend=Math.max(cend,x.e);
  });
  cl.forEach(function(c){c.items.forEach(function(x){x.n=c.n})});
  var grid='',i;
  for(i=0;i<n;i++){
    var hr=R.a+i;
    grid+='<div class="tlh" data-act="tlAdd" data-h="'+hr+'" style="top:'+(i*H)+("px\" role=\"button\" aria-label=\""+__("کار جدید ساعت")+" ")+fa(pad(hr))+'"><span>'+fa(pad(hr))+':۰۰</span></div>';
  }
  var blocks=ev.map(function(x){
    var t=x.t,top=(x.s-R.a*60)/60*H,h=Math.max(30,(x.e-x.s)/60*H-3),w=100/x.n;
    return '<div class="tlb'+(t.done?' dn':'')+'" data-act="tlOpen" data-id="'+t.id+'" role="button" tabindex="0" style="top:'+top.toFixed(1)+'px;height:'+h.toFixed(1)+'px;inset-inline-start:'+(x.col*w).toFixed(2)+'%;width:calc('+w.toFixed(2)+'% - 4px);--cc:'+cvar(t.col||cat(t.c).c)+'">'+
      '<button type="button" class="tlc" data-act="tlDone" data-id="'+t.id+'" aria-pressed="'+t.done+'" aria-label="'+(t.done?(__("ناتمام")):(__("انجام شد")))+'">'+icon('check')+'</button>'+
      '<span class="tlt">'+esc(t.t)+'</span><small>'+fa(pad(pt(t.tm).h)+':'+pad(pt(t.tm).m))+(t.te?' – '+fa(pad(pt(t.te).h)+':'+pad(pt(t.te).m)):'')+'</small></div>';
  }).join('');
  var now='';
  if(k===todayKey()){var d=new Date(),m=d.getHours()*60+d.getMinutes();if(m>=R.a*60&&m<=R.b*60)now='<i class="tlnow" data-a="'+R.a+'" style="top:'+((m-R.a*60)/60*H).toFixed(1)+'px"><b></b></i>'}
  var head='<h3 class="gh"><span>'+F.long.format(parse(k))+'</span><span>'+fa(all.length)+'</span></h3>';
  var tl='<section class="tl glass" style="height:'+(n*H+20)+'px"><div class="tlg">'+grid+'</div><div class="tlev">'+blocks+now+'</div></section>';
  var fr=free.length?("<h3 class=\"gh\"><span>"+__("بدون ساعت")+"</span><span>")+fa(free.length)+'</span></h3><ul class="glass list">'+free.map(function(t){return rowHTML(t,{})}).join('')+'</ul>':'';
  return head+tl+fr;
}
function tlNow(){
  var el=document.querySelector('.tlnow');if(!el)return;
  var d=new Date(),m=d.getHours()*60+d.getMinutes(),a=+el.dataset.a;
  el.style.top=((m-a*60)/60*TLH).toFixed(1)+'px';
}
actions.tlOpen=function(d){openSheet(d.id)};
actions.tlDone=function(d){toggleCheck(d.id)};
actions.tlAdd=function(d){
  openSheet(null);
  draft.d=ui.day;sh.time.value=pad(+d.h)+':00:00';drawSheet(false);
};
function viewWeek(){
  var td=todayKey(),isM=ui.wv==='month',top='',i;
  var list=sortDay(state.tasks.filter(function(t){return t.d===ui.day&&fOK(t)}));
  var lh=list.length?'<h3 class="gh"><span>'+F.long.format(parse(ui.day))+'</span><span>'+fa(list.length)+'</span></h3><ul class="glass list">'+list.map(function(t){return rowHTML(t,{})}).join('')+'</ul>':empty('week',(__("برنامه‌ای برای این روز نیست")),(__("می‌توانی یک کار برایش بگذاری.")),true);
  if(ui.wv==='day')lh=dayTimeline();
  var nextI=icon('chev').replace('chv0','nx');
  if(!isM){
    var ws=weekStart(ui.day),cells='';
    for(i=0;i<7;i++){
      var k=addDays(ws,i),d=parse(k),ts=state.tasks.filter(function(t){return t.d===k});
      var dot=!ts.length?'':(ts.some(function(t){return !t.done})?'on':'dn');
      cells+='<button type="button" class="dayc'+(k===td?' today':'')+(isOff(k)?' off':'')+'" data-act="pickDay" data-d="'+k+'" aria-pressed="'+(k===ui.day)+'" aria-label="'+F.long.format(d)+'"><span class="w">'+WK[d.getDay()]+'</span><b>'+F.day.format(d)+'</b><i class="dot '+dot+'"></i></button>';
    }
    top=("<section class=\"weekbar glass\"><div class=\"weeknav\"><button type=\"button\" data-act=\"weekPrev\" aria-label=\""+__("هفته قبل")+"\">")+icon('chev')+'</button><b>'+(ws<=td&&td<=addDays(ws,6)?(__("این هفته")):F.short.format(parse(ws))+(" "+__("تا")+" ")+F.short.format(parse(addDays(ws,6))))+("</b><button type=\"button\" data-act=\"weekNext\" aria-label=\""+__("هفته بعد")+"\">")+nextI+'</button></div><div class="days">'+cells+'</div></section>';
  }else{
    var fm=mFirst(ui.day),len=mLen(fm),lead=wkLead(parse(fm)),by={},mc='',last=addDays(fm,len-1);
    state.tasks.forEach(function(t){if(t.d&&t.d>=fm&&t.d<=last&&fOK(t))(by[t.d]=by[t.d]||[]).push(t)});
    wkHead().forEach(function(w){mc+='<span class="mh">'+w+'</span>'});
    for(i=0;i<lead;i++)mc+='<span class="mc blank"></span>';
    for(i=0;i<len;i++){
      var kk=addDays(fm,i),tt=by[kk]||[],dots='',seen={},ns=0;
      tt.forEach(function(t){
        if(seen[t.c]||ns>=3)return;
        seen[t.c]=1;ns++;
        var allDone=tt.filter(function(x){return x.c===t.c}).every(function(x){return x.done});
        dots+='<i class="'+(allDone?'dn':'')+'" style="background:'+cvar(t.col||cat(t.c).c)+'"></i>';
      });
      mc+='<button type="button" class="mc'+(kk===td?' today':'')+(isOff(kk)?' off':'')+'" data-act="pickDay" data-d="'+kk+'" aria-pressed="'+(kk===ui.day)+'" aria-label="'+F.long.format(parse(kk))+(holiday(kk)?CMA+holiday(kk):'')+(tt.length?CMA+(EN?__pl(tt.length,'task','tasks'):fa(tt.length)+" "+__("کار")):'')+'"><b>'+fa(i+1)+'</b><span class="dots">'+dots+'</span></button>';
    }
    top=("<section class=\"weekbar glass\"><div class=\"weeknav\"><button type=\"button\" data-act=\"monthPrev\" aria-label=\""+__("ماه قبل")+"\">")+icon('chev')+'</button><b>'+F.month.format(parse(ui.day))+("</b><button type=\"button\" data-act=\"monthNext\" aria-label=\""+__("ماه بعد")+"\">")+nextI+'</button></div><div class="mgrid">'+mc+'</div>'+(fm!==mFirst(td)?'<div class="jump"><button type="button" class="linkbtn" data-act="pickDay" data-d="'+td+("\">"+__("برو به امروز")+"</button></div>"):'')+'</section>';
  }
  var oc=holiday(ui.day)?'<p class="occ">'+icon('flag')+esc(holiday(ui.day))+'</p>':(!EN&&parse(ui.day).getDay()===5?'<p class="occ">'+icon('flag')+(__("جمعه")+"</p>"):'');
  return head(F.month.format(parse(ui.day)),(__("برنامه")),{right:fbtn()})+filterNote()+segG([['day',(__("روز","Day"))],['week',(__("هفته"))],['month',(__("ماه"))]],'wv',ui.wv)+top+oc+lh+(EN?'':ttCard())+lsCard();
}
actions.wv=function(d){ui.wv=d.v;render('swap');if(d.v==='day'){var nw=document.querySelector('.tlnow');if(nw)try{nw.scrollIntoView({block:'center'})}catch(e){}}};
actions.monthNext=function(){var fm=mFirst(ui.day);ui.day=monthSel(addDays(fm,mLen(fm)));render('right')};
actions.monthPrev=function(){ui.day=monthSel(addDays(mFirst(ui.day),-1));render('left')};

/* ---------- reminders ---------- */
function remDue(t){
  if(t.done||t.r==null||t.r<0||!t.d)return 0;
  return t.rz||(targetOf(t.d,t.tm||'09:00:00')-t.r*60000);
}
function remCheck(){
  var now=Date.now(),ch=false;
  state.tasks.forEach(function(t){
    var due=remDue(t);
    if(!due||t.rf===due||due>now)return;
    t.rf=due;ch=true;
    if(now-due<6*3600000)showReminder(t);
  });
  if(ch)persist();
}
function showReminder(t){
  var box=$('#rbs');
  if(box.querySelector('[data-id="'+t.id+'"]'))return;
  var el=document.createElement('div');el.className='rb';el.dataset.id=t.id;
  var when=t.tm?' · '+fa(tmFull(t.tm).slice(0,5))+(t.te?(" "+__("تا")+" ")+fa(tmFull(t.te).slice(0,5)):''):'';
  el.innerHTML='<div class="rb-t"><span class="h3d">'+icon('bell')+("</span><div><b>"+__("یادآوری"))+when+'</b><span>'+esc(t.t)+("</span></div></div><div class=\"rb-b\"><button type=\"button\" class=\"ok\" data-ra=\"done\">"+__("انجام شد")+"</button><button type=\"button\" data-ra=\"snz\">"+__("۱۰ دقیقه بعد")+"</button><button type=\"button\" data-ra=\"x\">"+__("بستن")+"</button></div>");
  box.appendChild(el);
  while(box.children.length>3)box.removeChild(box.firstChild);
  notify('rem',(__("یادآوری")),t.t,null,null,false,true);
  beep(true);
  try{if(navigator.vibrate)navigator.vibrate([120,60,120])}catch(e){}
  if(!NL)try{if(state.profile.notif&&window.Notification&&Notification.permission==='granted')new Notification('Ario',{body:t.t})}catch(e){}
}
/* ---------- native phone notifications (Capacitor Local Notifications) ---------- */
var NL=null;
try{var CAP=window.Capacitor;if(CAP&&CAP.isNativePlatform&&CAP.isNativePlatform())NL=(CAP.Plugins&&CAP.Plugins.LocalNotifications)||(CAP.registerPlugin&&CAP.registerPlugin('LocalNotifications'))||null}catch(e){NL=null}
var WB=null;
try{var CAP2=window.Capacitor;if(CAP2&&CAP2.isNativePlatform&&CAP2.isNativePlatform())WB=(CAP2.Plugins&&CAP2.Plugins.WidgetBridge)||(CAP2.registerPlugin&&CAP2.registerPlugin('WidgetBridge'))||null}catch(e){WB=null}
try{if(WB){var lr=WB.setLang({lang:LANG});if(lr&&lr.catch)lr.catch(function(){})}}catch(e){}   /* native notification buttons / widget follow the app language */
var wgT=null;
/* push today's summary to the Android home-screen widget */
function widgetSync(){
  if(!WB)return;
  clearTimeout(wgT);
  wgT=setTimeout(function(){
    try{
      var td=todayKey(),ts=state.tasks.filter(function(t){return t.d===td}),dn=ts.filter(function(t){return t.done}).length;
      var items=sortDay(ts.filter(function(t){return !t.done})).slice(0,4).map(function(t){var o=t.tm?pt(t.tm):null;return {t:String(t.t).slice(0,40),m:o?fa(pad(o.h)+':'+pad(o.m)):''}});
      var over=state.tasks.filter(function(t){return t.d&&t.d<td&&!t.done}).length;
      WB.update({json:JSON.stringify({d:td,title:(__("امروز")),sub:ts.length?fa(dn)+(" "+__("از")+" ")+fa(ts.length)+(" "+__("کار انجام شد")):(__("برای امروز کاری ثبت نشده")),over:over?fa(over)+(" "+__("کار عقب‌افتاده")):'',items:items})});
    }catch(e){}
  },500);
}
var FO_NID=2100000900,nsBusy=false,nsAgain=false,nsSig='',nsIds={};
function nsId(tid){
  if(nsIds[tid])return nsIds[tid];
  var h=0,i;for(i=0;i<tid.length;i++)h=(h*31+tid.charCodeAt(i))|0;
  h=Math.abs(h)%2000000000+1;
  var used={};Object.keys(nsIds).forEach(function(k){used[nsIds[k]]=1});
  while(used[h])h++;
  return (nsIds[tid]=h);
}
var HMRE=/^([01]\d|2[0-3]):[0-5]\d$/;
/* notification look: colour per kind, big app icon, multi-line body (Android notification shade) */
var NS_COL={rem:'#3D63F0',sum:'#F59E0B',eve:'#7C4DFF',wr:'#16A34A',focus:'#FF375F'};
function nsCfg(){return nsClean(state.profile.ns)}
var AN=null;
try{var CAP4=window.Capacitor;if(CAP4&&CAP4.isNativePlatform&&CAP4.isNativePlatform())AN=(CAP4.Plugins&&CAP4.Plugins.ArioNotify)||(CAP4.registerPlugin&&CAP4.registerPlugin('ArioNotify'))||null}catch(e){AN=null}
function nsHasAv(){var p=state.profile;return okPhoto(p.photo)&&canUse(p.photo)}
function nsCustom(){return !!AN&&(nsCfg().th!=='sys'||nsHasAv())}
/* profile photo as a round PNG for the notification's large icon */
function nsAvatarData(){
  return new Promise(function(res){
    if(!nsHasAv()){res('');return}
    var im=new Image();
    im.onload=function(){
      try{
        var S=192,cv=document.createElement('canvas');cv.width=S;cv.height=S;var cx=cv.getContext('2d');
        cx.beginPath();cx.arc(S/2,S/2,S/2,0,Math.PI*2);cx.closePath();cx.clip();
        var k=Math.max(S/im.naturalWidth,S/im.naturalHeight),w=im.naturalWidth*k,h=im.naturalHeight*k;
        cx.drawImage(im,(S-w)/2,(S-h)/2,w,h);
        res(cv.toDataURL('image/png').split(',')[1]);
      }catch(e){res('')}
    };
    im.onerror=function(){res('')};
    im.src='img/'+state.profile.photo+'.webp';
  });
}
/* neutral item for the native themed notifier */
function nsToAN(n){
  var ex=n.extra||{};
  return {id:n.id,at:n.schedule.at.getTime(),kind:ex.kind||'rem',ch:n.channelId==='reminders'?'rem':n.channelId==='focus'?'fo':'sum',title:n.title,body:n.body,big:n.largeBody||n.body,tid:ex.tid||'',act:n.actionTypeId==='REM'};
}
function nsBannerFile(){
  var c=nsCfg(),b=bnFind(c.bn||''),id=(b&&bnOpen(b))?b[0]:bnId();
  return id==='auto'?(isDark()?'cover-night':'cover-day'):'bn-'+id;
}
/* banner picture + dark scrim, small JPEG for the notification background */
function nsBannerData(){
  return new Promise(function(res){
    var im=new Image();
    im.onload=function(){
      try{
        var W=420,H=140,cv=document.createElement('canvas');cv.width=W;cv.height=H;var cx=cv.getContext('2d');
        var k=Math.max(W/im.naturalWidth,H/im.naturalHeight),w=im.naturalWidth*k,h=im.naturalHeight*k;
        cx.drawImage(im,(W-w)/2,(H-h)/2,w,h);
        var g=cx.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(8,12,28,.42)');g.addColorStop(1,'rgba(8,12,28,.68)');
        cx.fillStyle=g;cx.fillRect(0,0,W,H);
        res(cv.toDataURL('image/jpeg',.82).split(',')[1]);
      }catch(e){res('')}
    };
    im.onerror=function(){res('')};
    im.src='img/'+nsBannerFile()+'.webp';
  });
}
async function nsPushStyle(){
  if(!AN)return;
  var c=nsCfg(),b='',a='';
  if(c.th==='banner')try{b=await nsBannerData()}catch(e){}
  try{a=await nsAvatarData()}catch(e){}
  try{await AN.setStyle({theme:c.th,banner:b,avatar:a})}catch(e){}
}
/* snooze / done pressed on a themed notification while the app was closed */
async function nsTakeActs(){
  if(!AN)return;
  try{
    var r=await AN.takeActions(),a=(r&&r.actions)||[];
    a.forEach(function(x){
      var t=x.tid&&find(x.tid);if(!t)return;
      if(x.a==='done'){if(!t.done)toggle(t.id)}
      else if(x.a==='snooze'){t.rz=x.at;delete t.rf;mutate()}
    });
    if(a.length)nativeSync(true);
  }catch(e){}
}
function nsLook(kind,big){var o={iconColor:NS_COL[kind]||'#3D63F0',largeIcon:'ic_notif_large',summaryText:'Ario'};if(big)o.largeBody=big;return o}
function nsTm(t){return t.tm?fa(tmFull(t.tm).slice(0,5))+(t.te?(" "+__("تا")+" ")+fa(tmFull(t.te).slice(0,5)):''):''}
function nsLine(t){var m=t.tm?fa(tmFull(t.tm).slice(0,5)):'';return '• '+(m?m+'  ':'')+t.t}
/* morning summary + evening reminder for the next 7 days (re-planned on every change, so finished days stay quiet) */
function nsSmart(){
  var out=[],p=state.profile,now=Date.now(),td=todayKey(),i;
  var at=function(k,hm){var q=hm.split(':').map(Number),d=parse(k);d.setHours(q[0],q[1],0,0);return d.getTime()};
  for(i=0;i<7;i++){
    var k=addDays(td,i);
    var open=sortDay(state.tasks.filter(function(t){return t.d===k&&!t.done}));
    var over=i===0?state.tasks.filter(function(t){return t.d&&t.d<k&&!t.done}).length:0;
    var f=open[0];
    if(HMRE.test(p.msum||'')&&(open.length||over)){
      var w=at(k,p.msum);
      if(w>now+2000){
        var parts=[];
        if(open.length)parts.push((i===0?(__("امروز")+" "):'')+fa(open.length)+(" "+__("کار داری"))+(f?(" "+__("— اولین:")+" ")+f.t+(f.tm?' ('+fa(pad(pt(f.tm).h)+':'+pad(pt(f.tm).m))+')':''):''));
        if(over)parts.push(fa(over)+(" "+__("کار عقب‌افتاده")));
        var cf=nsCfg(),nm=cf.name?String(p.name||'').trim():'',big=parts.join('\n')+(cf.list&&open.length?'\n\n'+open.slice(0,5).map(nsLine).join('\n')+(open.length>5?("\n"+__("… و")+" ")+fa(open.length-5)+(" "+__("کار دیگر")):''):'');
        out.push(Object.assign({id:2100000000+i*2,title:(__("☀️ صبح بخیر"))+(nm?' '+nm:''),body:parts.join(' · '),schedule:{at:new Date(w),allowWhileIdle:true},channelId:'summary',smallIcon:'ic_stat_barnameyar',extra:{kind:'sum'}},nsLook('sum',big)));
      }
    }
    if(HMRE.test(p.mev||'')&&(open.length||over)){
      var w2=at(k,p.mev);
      if(w2>now+2000){
        var eb=i===0?fa(open.length+over)+(" "+__("کار هنوز انجام نشده"))+(f?': '+f.t:''):(__("ببین چه کارهایی مانده")),
            ebig=i===0?fa(open.length+over)+(" "+__("کار هنوز انجام نشده"))+(nsCfg().list&&open.length?'\n\n'+open.slice(0,5).map(nsLine).join('\n')+(open.length>5?("\n"+__("… و")+" ")+fa(open.length-5)+(" "+__("کار دیگر")):''):'')+(over?'\n\n⚠️ '+fa(over)+(" "+__("کار عقب‌افتاده")):''):eb;
        out.push(Object.assign({id:2100000000+i*2+1,title:(__("🌙 کارهای ناتمام")),body:eb,schedule:{at:new Date(w2),allowWhileIdle:true},channelId:'summary',smallIcon:'ic_stat_barnameyar',extra:{kind:'eve'}},nsLook('eve',ebig)));
      }
    }
  }
  for(i=0;i<8;i++){
    var kf=addDays(td,i);
    if(parse(kf).getDay()===5&&p.wrev!==false){
      var wf=at(kf,'18:00');
      if(wf>now+2000){var wd=weekStart(kf),dn=0,j;for(j=0;j<7;j++)dn+=dayN(addDays(wd,j));
        var wb=i===0&&dn?'🏆 '+fa(dn)+(" "+__("کار این هفته انجام دادی؛ بیا مرورش کنیم")):(__("هفته را مرور کن و کارهای عقب‌افتاده را به فردا ببر"));
        out.push(Object.assign({id:2100000100+i,title:(__("📊 بازنگری هفته")),body:wb,schedule:{at:new Date(wf),allowWhileIdle:true},channelId:'summary',smallIcon:'ic_stat_barnameyar',extra:{kind:'wr'}},nsLook('wr',wb)))}
    }
  }
  return out;
}
function nsBuild(){
  var now=Date.now(),list=[];
  state.tasks.forEach(function(t){
    var due=remDue(t);
    if(!due||due<=now+2000||t.rf===due)return;
    list.push({due:due,t:t});
  });
  list.sort(function(a,b){return a.due-b.due});
  return list.slice(0,60);
}
async function nativeSync(force){
  if(!NL&&!AN)return;
  if(nsBusy){nsAgain=true;return}
  nsBusy=true;
  try{
    var list=state.profile.notif?nsBuild():[];
    var extra=state.profile.notif?nsSmart():[];
    var cfg=nsCfg(),custom=nsCustom(),sig=list.map(function(x){return x.t.id+':'+x.due+':'+x.t.t+':'+(x.t.te||'')+':'+(x.t.c||'')+':'+(x.t.p||0)}).join('|')+'#'+extra.map(function(x){return x.id+x.body+x.schedule.at.getTime()}).join('|')+'#'+JSON.stringify(cfg)+(custom?'1':'0')+(nsHasAv()?state.profile.photo:'');
    if(force||sig!==nsSig){
      if(NL){
        var p=await NL.getPending();
        var pn=p&&p.notifications?p.notifications.filter(function(n){return n.id!==FO_NID}):[];
        if(pn.length)await NL.cancel({notifications:pn.map(function(n){return {id:n.id}})});
      }
      var rl=list.map(function(x){
        var tm=cfg.time?nsTm(x.t):'',ct=cfg.cat?cat(x.t.c):null,pr=cfg.pri?(x.t.p===2?(__("🔥 فوری")):x.t.p===1?(__("⭐ مهم")):''):'',
            meta=[tm?'🕒 '+tm:'',ct&&ct.n?'🏷 '+ct.n:'',pr].filter(Boolean),
            big=x.t.t+(meta.length?'\n\n'+meta.join('   '):'');
        return Object.assign({id:nsId(x.t.id),title:'⏰ '+x.t.t,body:meta.join('  ·  ')||(__("یادآوری")),schedule:{at:new Date(x.due),allowWhileIdle:true},channelId:'reminders',smallIcon:'ic_stat_barnameyar',actionTypeId:'REM',extra:{tid:x.t.id}},nsLook('rem',big));
      });
      if(custom){
        await AN.replaceAll({items:extra.concat(rl).map(nsToAN),keep:[FO_NID]});
      }else{
        if(AN)await AN.replaceAll({items:[],keep:[FO_NID]});
        if(NL){
          if(extra.length)await NL.schedule({notifications:extra});
          if(rl.length)await NL.schedule({notifications:rl});
        }
      }
      nsSig=sig;
    }
  }catch(e){nsSig=''}
  nsBusy=false;
  if(nsAgain){nsAgain=false;nativeSync()}
}
async function nativeInit(){
  widgetSync();
  nsPushStyle().then(function(){nsTakeActs()});
  if(!NL){askMic();return}
  try{
    await NL.createChannel({id:'reminders',name:(__("یادآورها")),description:(__("یادآوری زمان کارها")),importance:4,visibility:1,vibration:true,lights:true});
    await NL.createChannel({id:'focus',name:(__("پایان تمرکز")),description:(__("اعلان پایان تایمر تمرکز")),importance:4,visibility:1,vibration:true,lights:true});
    await NL.createChannel({id:'summary',name:(__("خلاصه روزانه")),description:(__("خلاصه صبح و یادآور عصر")),importance:3,visibility:1,vibration:true});
  }catch(e){}
  try{
    await NL.registerActionTypes({types:[{id:'REM',actions:[{id:'snooze',title:(__("۱۰ دقیقه بعد"))},{id:'done',title:(__("انجام شد"))}]}]});
    NL.addListener('localNotificationActionPerformed',function(ev){
      try{
        if(ev.notification&&ev.notification.extra&&ev.notification.extra.kind==='wr'){ui.tab='stats';render();setTimeout(openWr,300);return}
        var tid=ev.notification&&ev.notification.extra&&ev.notification.extra.tid,t=tid&&find(tid);
        if(!t)return;
        if(ev.actionId==='snooze'){t.rz=Date.now()+600000;delete t.rf;mutate();toast((__("۱۰ دقیقه‌ی دیگر یادآوری می‌شود:")+" ")+t.t,null,null,'info')}
        else if(ev.actionId==='done'){toggle(tid)}
      }catch(e){}
    });
  }catch(e){}
  try{
    var st=await NL.checkPermissions();
    if(st.display==='prompt'||st.display==='prompt-with-rationale'){
      st=await NL.requestPermissions();
      if(!state.profile.nAsked){state.profile.nAsked=true;state.profile.notif=st.display==='granted';writeCache();persist();if(ui.tab==='account')render()}
    }else if(!state.profile.nAsked){state.profile.nAsked=true;state.profile.notif=st.display==='granted';writeCache();persist()}
    if(st.display!=='granted'&&state.profile.notif){state.profile.notif=false;writeCache();persist()}
  }catch(e){}
  nativeSync(true);
  askMic();
}
/* microphone permission, asked right after the notification permission on first launch (voice input in quick add + Konkuria) */
async function askMic(){
  if(!SRN)return;
  try{
    var pm=await SRN.checkPermissions();
    if(pm&&(pm.speechRecognition==='prompt'||pm.speechRecognition==='prompt-with-rationale'))await SRN.requestPermissions();
  }catch(e){}
}
async function nativeExact(){
  if(!NL||!NL.checkExactNotificationSetting)return;
  try{
    var s=await NL.checkExactNotificationSetting();
    if(s.exact_alert!=='granted'){
      toast((__("برای اعلان دقیق سر وقت، در صفحهٔ بازشده اجازهٔ «هشدارها و یادآورها» را روشن کن")),null,null,'info');
      setTimeout(function(){NL.changeExactNotificationSetting()},1800);
    }
  }catch(e){}
}
function dismissReminder(id){var el=document.querySelector('#rbs [data-id="'+id+'"]');if(el)el.remove()}
$('#rbs').addEventListener('click',function(e){
  var b=e.target.closest('[data-ra]');if(!b)return;
  var el=b.closest('.rb'),id=el.dataset.id,t=find(id),a=b.dataset.ra;
  el.remove();
  if(!t)return;
  if(a==='done')toggle(id);
  else if(a==='snz'){t.rz=Date.now()+600000;delete t.rf;mutate()}
});
function reqNotif(){
  var fail=function(m){state.profile.notif=false;writeCache();persist();toast(m,null,null,'warn');if(ui.tab==='account')render()};
  if(NL){
    NL.requestPermissions().then(function(s){
      if(s.display!=='granted'){fail((__("اجازهٔ اعلان داده نشد؛ از تنظیمات گوشی برای Ario روشنش کن")));return}
      nativeSync(true);nativeExact();
    }).catch(function(){fail((__("اعلان در این دستگاه در دسترس نیست")))});
    return;
  }
  try{
    if(!window.Notification){fail((__("اعلان سیستم در این مرورگر در دسترس نیست؛ یادآورها داخل برنامه نمایش داده می‌شوند")));return}
    if(Notification.permission==='granted')return;
    Promise.resolve(Notification.requestPermission()).then(function(p){if(p!=='granted')fail((__("اجازهٔ اعلان داده نشد")))}).catch(function(){fail((__("اعلان سیستم در این مرورگر در دسترس نیست")))});
  }catch(e){fail((__("اعلان سیستم در این مرورگر در دسترس نیست")))}
}

/* ---------- sheet: reminder, repeat, subtasks ---------- */
sh.rem=$('#remChips');sh.rep=$('#repSeg');sh.subs=$('#subList');
function drawExtra(){
  sh.rem.innerHTML=REM.map(function(r){return '<button type="button" class="chip" data-r="'+r[0]+'" aria-pressed="'+(draft.r===r[0])+'">'+r[1]+'</button>'}).join('');
  sh.rep.innerHTML=[['',(__("بدون"))],['daily',(__("روزانه"))],['weekly',(__("هفتگی"))],['monthly',(__("ماهانه"))]].map(function(r){return '<button type="button" data-rp="'+r[0]+'" aria-pressed="'+(draft.rp===r[0])+'">'+r[1]+'</button>'}).join('');
  sh.subs.innerHTML=draft.st.map(function(s){return '<div class="sli" data-sid="'+esc(s.id)+'"><button type="button" class="slc" data-sa="t" aria-pressed="'+!!s.d+("\" aria-label=\""+__("تیک زیرکار")+"\">")+icon('check')+'</button><span class="'+(s.d?'dn':'')+'">'+esc(s.t)+("</span><button type=\"button\" class=\"sld\" data-sa=\"x\" aria-label=\""+__("حذف زیرکار")+"\">")+icon('trash')+'</button></div>'}).join('');
  $('#remHint').hidden=!(draft.r>=0&&!sh.time.value);
  $('#tgList').innerHTML=(draft.tg||[]).map(function(g,i){return '<button type="button" class="chip" data-tgd="'+i+("\" aria-pressed=\"true\" aria-label=\""+__("حذف برچسب")+" ")+esc(g)+'">#'+esc(g)+' ✕</button>'}).join('');
  $('#tgSug').innerHTML=allTags().filter(function(g){return (draft.tg||[]).indexOf(g)<0}).slice(0,8).map(function(g){return '<button type="button" class="chip" data-tga="'+esc(g)+'" aria-pressed="false">#'+esc(g)+'</button>'}).join('');
}
function allTags(){
  var n={};state.tasks.forEach(function(t){(t.tg||[]).forEach(function(g){n[g]=(n[g]||0)+1})});
  return Object.keys(n).sort(function(a,b){return n[b]-n[a]||a.localeCompare(b,EN?'en':'fa')});
}
function addTg(v){
  v=String(v==null?$('#tgIn').value:v).replace(/[<>&"']/g,'').replace(/^[#\s]+/,'').replace(/\s+/g,'_').slice(0,16);
  if(!v)return false;
  if(draft.tg.indexOf(v)<0&&draft.tg.length<6)draft.tg.push(v);
  $('#tgIn').value='';drawExtra();return true;
}
$('#tgAdd').addEventListener('click',function(){addTg();$('#tgIn').focus()});
$('#tgIn').addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===','||e.key==='،'){e.preventDefault();addTg()}});
$('#tgList').addEventListener('click',function(e){var b=e.target.closest('[data-tgd]');if(!b)return;draft.tg.splice(Number(b.dataset.tgd),1);drawExtra()});
$('#tgSug').addEventListener('click',function(e){var b=e.target.closest('[data-tga]');if(!b)return;addTg(b.dataset.tga)});
sh.rem.addEventListener('click',function(e){var b=e.target.closest('[data-r]');if(!b)return;draft.r=Number(b.dataset.r);if(draft.r>=0&&!draft.d)draft.d=todayKey();drawSheet(false)});
sh.rep.addEventListener('click',function(e){var b=e.target.closest('[data-rp]');if(!b)return;draft.rp=b.dataset.rp;if(draft.rp&&!draft.d)draft.d=todayKey();drawSheet(false)});
sh.subs.addEventListener('click',function(e){
  var row=e.target.closest('.sli'),b=e.target.closest('[data-sa]');if(!row||!b)return;
  var i=draft.st.findIndex(function(s){return s.id===row.dataset.sid});if(i<0)return;
  if(b.dataset.sa==='t')draft.st[i].d=!draft.st[i].d;else draft.st.splice(i,1);
  drawExtra();
});
function addSub(){var v=$('#subIn').value.trim();if(!v)return false;draft.st.push({id:uid(),t:v,d:false});$('#subIn').value='';drawExtra();return true}
$('#subAdd').addEventListener('click',function(){addSub();$('#subIn').focus()});
$('#subIn').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();addSub()}});
function saveSheet(){
  var title=sh.title.value.trim();
  if(!title){
    sh.title.classList.remove('shake');void sh.title.offsetWidth;sh.title.classList.add('shake');
    sh.title.focus();return;
  }
  addSub();addTg();
  var rec={tg:draft.tg.slice(),t:title,n:sh.notes.value.trim(),d:draft.d,tm:sh.time.value||'',te:sh.time.value?(sh.end.value||''):'',col:draft.col||'',p:draft.p,c:draft.c,r:draft.r,rp:draft.rp,st:draft.st};
  if(!rec.d){rec.rp='';rec.r=-1}
  var t=editing?find(editing):null;
  if(t){
    var sch=t.d!==rec.d||(t.tm||'')!==rec.tm||(t.r==null?-1:t.r)!==rec.r;
    Object.assign(t,rec);delete t.s;
    if(sch){delete t.rf;delete t.rz}
  }else state.tasks.push(Object.assign({id:uid(),done:false,doneAt:0,ts:Date.now()},rec));
  closeSheet();mutate();
  notify(t?'edit':'add',t?(__("کار ویرایش شد")):(__("کار جدید اضافه شد")),rec.t);
  if(NL&&rec.r>=0&&state.profile.notif&&!state.profile.xAsked){state.profile.xAsked=true;persist();setTimeout(nativeExact,1200)}
}

/* ---------- custom categories ---------- */
var cs={wrap:$('#cSheet'),name:$('#cName'),ic:$('#cIcons'),co:$('#cColors'),del:$('#cDel')},cd=null,cCloseT=null;
function drawCatEd(){
  cs.ic.innerHTML=ICONS.map(function(n){return '<button type="button" class="icb" data-i="'+n+'" aria-pressed="'+(cd.i===n)+'" style="--cc:'+cvar(cd.c)+("\" aria-label=\""+__("آیکون")+"\">")+icon(n)+'</button>'}).join('');
  cs.co.innerHTML=SWATCH.map(function(h){return '<button type="button" class="swatch" data-c="'+h+'" style="--cc:'+h+'" aria-pressed="'+(cd.c===h)+("\" aria-label=\""+__("رنگ")+"\"></button>")}).join('');
}
function openCatEd(id){
  var c=id?CATS.find(function(x){return x.id===id}):null;
  cd=c?{id:c.id,n:c.n,i:c.i,c:c.c}:{id:'',n:'',i:ICONS[0],c:SWATCH[0]};
  cs.name.value=cd.n;
  $('#cHead').textContent=c?(__("ویرایش دسته")):(__("دسته جدید"));
  cs.del.hidden=!c||CATS.length<2;
  drawCatEd();
  clearTimeout(cCloseT);cs.wrap.hidden=false;
  document.documentElement.style.overflow='hidden';
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    cs.wrap.classList.add('open');
    if(!c)setTimeout(function(){cs.name.focus({preventScroll:true})},300);
  })});
}
function closeCatEd(){
  cs.wrap.classList.remove('open');
  document.documentElement.style.overflow='';
  clearTimeout(cCloseT);
  cCloseT=setTimeout(function(){cs.wrap.hidden=true},330);
}
cs.ic.addEventListener('click',function(e){var b=e.target.closest('[data-i]');if(!b)return;cd.i=b.dataset.i;drawCatEd()});
cs.co.addEventListener('click',function(e){var b=e.target.closest('[data-c]');if(!b)return;cd.c=b.dataset.c;drawCatEd()});
$('#cForm').addEventListener('submit',function(e){
  e.preventDefault();
  var n=cs.name.value.trim().replace(/[<>&"']/g,'');
  if(!n){cs.name.classList.remove('shake');void cs.name.offsetWidth;cs.name.classList.add('shake');cs.name.focus();return}
  var c=cd.id?CATS.find(function(x){return x.id===cd.id}):null;
  if(c){c.n=n;c.i=cd.i;c.c=cd.c}
  else CATS.push({id:'c'+uid(),n:n,i:cd.i,c:cd.c});
  closeCatEd();mutate();
  notify(c?'edit':'add',c?(__("دسته ویرایش شد")):(__("دسته جدید ساخته شد")),n);
});
cs.del.addEventListener('click',function(){
  if(!cd.id||CATS.length<2)return;
  var id=cd.id,old=CATS.slice(),cur=CATS.find(function(x){return x.id===id}),rest=CATS.filter(function(x){return x.id!==id}),to=rest[0];
  var moved=state.tasks.filter(function(t){return t.c===id}).map(function(t){return t.id});
  askConfirm({title:(__("حذف دسته «"))+(cur?cur.n:'')+'»',msg:moved.length?fa(moved.length)+(" "+__("کار این دسته به «"))+to.n+(__("» منتقل می‌شود. کارها پاک نمی‌شوند.")):(__("این دسته کاری ندارد و حذف می‌شود.")),btns:[{t:(__("حذف دسته")),cls:'bad',fn:function(){
    state.tasks.forEach(function(t){if(t.c===id)t.c=to.id});
    CATS.length=0;rest.forEach(function(x){CATS.push(x)});
    ui.fcats=ui.fcats.filter(function(x){return x!==id});
    if(ui.cat===id)ui.cat=null;
    closeCatEd();mutate();
    toast((__("دسته حذف شد و کارهایش به «"))+to.n+(__("» رفتند")),(__("بازگردانی")),function(){
      CATS.length=0;old.forEach(function(x){CATS.push(x)});
      state.tasks.forEach(function(t){if(moved.indexOf(t.id)>-1)t.c=id});
      mutate();
    },'del');
  }}]});
});
$('#cCancel').addEventListener('click',closeCatEd);
$('#cDim').addEventListener('click',closeCatEd);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!cs.wrap.hidden)closeCatEd()});

/* ---------- confirm dialog ---------- */
function askConfirm(o){
  var w=document.createElement('div');w.className='cfm-wrap';
  w.innerHTML='<div class="dim"></div><div class="cfm glass" role="alertdialog" aria-modal="true"><h3></h3><p></p><div class="cfm-b"></div></div>';
  w.querySelector('h3').textContent=o.title||'';w.querySelector('p').textContent=o.msg||'';
  var box=w.querySelector('.cfm-b');
  function close(fn){w.classList.remove('open');setTimeout(function(){w.remove()},300);document.removeEventListener('keydown',kd);if(fn)setTimeout(fn,60)}
  function kd(e){if(e.key==='Escape')close()}
  (o.btns||[]).concat([{t:(__("انصراف"))}]).forEach(function(b){
    var el=document.createElement('button');el.type='button';el.textContent=b.t;if(b.cls)el.className=b.cls;
    el.addEventListener('click',function(){close(b.fn)});box.appendChild(el);
  });
  w.querySelector('.dim').addEventListener('click',function(){close()});
  document.addEventListener('keydown',kd);
  document.body.appendChild(w);
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}

/* ---------- backup / restore ---------- */
var bk={el:null,t:null};
function bkData(){return {app:'ario',v:1,at:new Date().toISOString(),tasks:state.tasks,profile:state.profile,cats:CATS,hist:state.hist}}
function bkMsg(m,err){var e=bk.el&&bk.el.querySelector('.bkmsg');if(e){e.textContent=m;e.className='bkmsg'+(err?' err':'')}}
function capGet(n){try{var C=window.Capacitor;if(!(C&&C.isNativePlatform&&C.isNativePlatform()))return null;return (C.Plugins&&C.Plugins[n])||(C.registerPlugin&&C.registerPlugin(n))||null}catch(e){return null}}
function bkCap(n){return !!capGet(n)}
async function bkExportFile(){
  var txt=JSON.stringify(bkData()),name='ario-backup-'+todayKey()+'.json';
  if(bkCap('Filesystem')&&bkCap('Share')){
    try{
      var P={Filesystem:capGet('Filesystem'),Share:capGet('Share')},r=await P.Filesystem.writeFile({path:name,data:txt,directory:'CACHE',encoding:'utf8'});
      await P.Share.share({title:(__("پشتیبان Ario")),url:r.uri,dialogTitle:(__("ذخیره یا ارسال فایل پشتیبان"))});
      bkMsg((__("فایل پشتیبان آماده شد.")));return;
    }catch(e){if(/cancel/i.test(String(e&&e.message||e)))return}
  }
  try{
    var f=new File([txt],name,{type:'application/json'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:(__("پشتیبان Ario"))});bkMsg((__("فایل پشتیبان آماده شد.")));return}
  }catch(e){if(e&&e.name==='AbortError')return}
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'application/json'}));a.download=name;
  document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},4000);
  bkMsg((__("فایل پشتیبان ذخیره شد.")));
}
async function bkExportText(){
  var txt=JSON.stringify(bkData());
  try{await navigator.clipboard.writeText(txt);bkMsg((__("متن پشتیبان کپی شد. آن را جایی امن (مثلاً یادداشت‌ها) ذخیره کن.")));return}catch(e){}
  var ta=bk.el.querySelector('textarea');ta.value=txt;ta.select();
  try{document.execCommand('copy');bkMsg((__("متن پشتیبان کپی شد.")))}catch(e){bkMsg((__("متن در کادر پایین قرار گرفت؛ آن را دستی کپی کن.")))}
}
function bkClean(j){
  var dOK=/^\d{4}-\d{2}-\d{2}$/,tOK=/^\d{2}:\d{2}$/,seen={};
  var tasks=(j.tasks||[]).filter(function(t){return t&&typeof t==='object'&&typeof t.t==='string'&&t.t.trim()}).map(function(t){
    var o=Object.assign({},t);
    o.id=String(t.id||uid()).replace(/[^\w-]/g,'')||uid();if(seen[o.id])o.id=uid();seen[o.id]=1;
    o.t=String(t.t).slice(0,140);o.n=typeof t.n==='string'?t.n.slice(0,600):'';
    o.d=dOK.test(t.d||'')?t.d:'';o.tm=tOK.test(t.tm||'')?t.tm:'';o.te=tOK.test(t.te||'')?t.te:'';
    o.done=!!t.done;o.doneAt=Number(t.doneAt)||0;o.ts=Number(t.ts)||Date.now();
    o.p=[0,1,2].indexOf(t.p)>-1?t.p:0;o.c=String(t.c||'home');
    o.st=Array.isArray(t.st)?t.st.filter(function(x){return x&&typeof x.t==='string'}).map(function(x){return {id:String(x.id||uid()).replace(/[^\w-]/g,''),t:x.t.slice(0,100),d:!!x.d}}):[];
    if(typeof o.col!=='string')delete o.col;
    return o;
  });
  return tasks;
}
function bkRestore(raw,silent){
  var j;try{j=typeof raw==='string'?JSON.parse(raw):raw}catch(e){}
  if(!j||typeof j!=='object'||!Array.isArray(j.tasks)){bkMsg((__("این فایل یا متن، پشتیبان معتبر Ario نیست.")),1);return}
  var tasks=bkClean(j),snap=JSON.stringify(bkData());
  var nc=Array.isArray(j.cats)?j.cats.length:0;
  function done(msg){
    applyTheme();mutate();closeBk();
    toast(msg,(__("بازگردانی به قبل")),function(){bkRestoreExact(snap)},'ok');
  }
  askConfirm({title:(__("بازیابی اطلاعات")),msg:(__("در این پشتیبان")+" ")+(EN?__pl(tasks.length,"task","tasks"):fa(tasks.length)+" "+__("کار"))+(nc?(" "+__("و")+" ")+(EN?__pl(nc,"category","categories"):fa(nc)+" "+__("دسته")):'')+(" "+__("پیدا شد. چطور وارد شود؟")),btns:[
    {t:(__("ادغام با کارهای فعلی")),cls:'pri',fn:function(){
      var have={};state.tasks.forEach(function(t){have[t.id]=1});
      var add=tasks.filter(function(t){return !have[t.id]});
      state.tasks=state.tasks.concat(add);
      if(j.profile&&Array.isArray(j.profile.habits)){var hid={};hbs().forEach(function(x){hid[x.id]=1});j.profile.habits.forEach(function(x){if(x&&x.id&&x.n&&!hid[x.id])hbs().push({id:String(x.id).replace(/[^\w-]/g,''),n:String(x.n).slice(0,24),i:ICONS.indexOf(x.i)>-1?x.i:ICONS[0],c:String(x.c||SWATCH[3]),ts:x.ts||Date.now(),d:x.d&&typeof x.d==='object'?x.d:{}})})}
      if(j.profile&&Array.isArray(j.profile.ttp)){var tid={};ttPlans().forEach(function(x){tid[x.id]=1});ttpClean(j.profile.ttp).forEach(function(x){if(!tid[x.id]){ttPlans().push(x);tid[x.id]=1}})}
      if(nc){var ids={};CATS.forEach(function(c){ids[c.id]=1});var extra=j.cats.filter(function(c){return c&&c.id&&!ids[c.id]});if(extra.length)setCats(CATS.slice().concat(extra))}
      done(fa(add.length)+(" "+__("کار تازه اضافه شد")))}},
    {t:(__("جایگزینی همه‌چیز")),cls:'bad',fn:function(){
      state.tasks=tasks;
      if(nc)setCats(j.cats);
      if(j.hist&&typeof j.hist==='object')state.hist=j.hist;
      if(j.profile&&typeof j.profile==='object')state.profile=P(j.profile);
      done((__("اطلاعات جایگزین شد")))}}
  ]});
}
function bkRestoreExact(snap){
  try{var j=JSON.parse(snap);state.tasks=j.tasks;setCats(j.cats);state.hist=j.hist;state.profile=P(j.profile);applyTheme();mutate()}catch(e){}
}
function openBk(){
  if(bk.el)return;
  var w=document.createElement('div');w.className='sheet-wrap';w.id='bkSheet';
  w.innerHTML=("<div class=\"dim\"></div><div class=\"sheet bk\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("پشتیبان‌گیری")+"\"><div class=\"grab\"></div>")+
    ("<div class=\"sheet-top\"><span></span><h2>"+__("پشتیبان‌گیری و بازیابی")+"</h2><button type=\"button\" data-bk=\"close\">"+__("بستن")+"</button></div>")+
    ("<p class=\"hint2\">"+__("کارها فقط روی همین گوشی ذخیره می‌شوند. با گرفتن پشتیبان می‌توانی آن‌ها را جای دیگری نگه داری یا به گوشی تازه ببری.")+"</p>")+
    '<button type="button" class="bkb" data-bk="file">'+icon('cloud')+("<span>"+__("ذخیره / ارسال فایل پشتیبان")+"<small>"+__("یک فایل .json می‌سازد (مثلاً برای تلگرام، ایمیل یا فایل‌ها)")+"</small></span></button>")+
    '<button type="button" class="bkb" data-bk="copy">'+icon('edit')+("<span>"+__("کپی کردن متن پشتیبان")+"<small>"+__("برای چسباندن در یادداشت‌ها یا پیام‌رسان")+"</small></span></button>")+
    '<button type="button" class="bkb" data-bk="pick">'+icon('refresh')+("<span>"+__("بازیابی از فایل")+"<small>"+__("فایل پشتیبانی که قبلاً گرفتی را انتخاب کن")+"</small></span></button>")+
    '<input type="file" id="bkFile" accept=".json,application/json,text/plain" hidden>'+
    ("<textarea class=\"field\" placeholder=\""+__("یا متن پشتیبان را اینجا بچسبان")+"\" aria-label=\""+__("متن پشتیبان")+"\"></textarea>")+
    '<button type="button" class="bkb" data-bk="paste">'+icon('check')+("<span>"+__("بازیابی از متن چسبانده‌شده")+"</span></button>")+
    '<div class="bkmsg" role="status"></div></div>';
  document.body.appendChild(w);bk.el=w;
  document.documentElement.style.overflow='hidden';
  w.addEventListener('click',function(e){
    if(e.target.classList.contains('dim')){closeBk();return}
    var b=e.target.closest('[data-bk]');if(!b)return;var a=b.dataset.bk;
    if(a==='close')closeBk();
    else if(a==='file')bkExportFile();
    else if(a==='copy')bkExportText();
    else if(a==='pick')w.querySelector('#bkFile').click();
    else if(a==='paste'){var v=w.querySelector('textarea').value.trim();if(!v){bkMsg((__("اول متن پشتیبان را بچسبان.")),1);return}bkRestore(v)}
  });
  w.querySelector('#bkFile').addEventListener('change',function(e){
    var f=e.target.files&&e.target.files[0];if(!f)return;
    if(f.size>8e6){bkMsg((__("فایل خیلی بزرگ است.")),1);return}
    var r=new FileReader();r.onload=function(){bkRestore(String(r.result))};r.onerror=function(){bkMsg((__("خواندن فایل ممکن نشد.")),1)};r.readAsText(f);e.target.value='';
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
function closeBk(){
  var w=bk.el;if(!w)return;bk.el=null;
  w.classList.remove('open');document.documentElement.style.overflow='';
  setTimeout(function(){w.remove()},350);
}
actions.openBackup=function(){openBk()};

/* ---------- manual ordering (drag the grip) ---------- */
var dg=null;
function dgPlace(y){
  var r=dg.row,ul=dg.ul;
  r.style.transform='none';
  var nat=r.getBoundingClientRect(),want=y-dg.off,cen=want+nat.height/2,i=0;
  var rows=function(){return [].slice.call(ul.children).filter(function(x){return x.classList&&x.classList.contains('row')})};
  var all=rows(),idx=all.indexOf(r),prev=all[idx-1],next=all[idx+1];
  if(prev){var pr=prev.getBoundingClientRect();if(cen<pr.top+pr.height/2){ul.insertBefore(r,prev);nat=r.getBoundingClientRect()}}
  else{}
  if(next){var nr=next.getBoundingClientRect();if(cen>nr.top+nr.height/2){ul.insertBefore(next,r);nat=r.getBoundingClientRect()}}
  r.style.transform='translateY('+(want-nat.top)+'px)';
}
document.addEventListener('pointerdown',function(e){
  var g=e.target.closest&&e.target.closest('.grip');if(!g)return;
  var row=g.closest('.row');if(!row||!row.parentNode)return;
  e.preventDefault();e.stopPropagation();
  var rc=row.getBoundingClientRect();
  dg={row:row,ul:row.parentNode,off:e.clientY-rc.top,g:g,id:e.pointerId};
  try{g.setPointerCapture(e.pointerId)}catch(x){}
  row.classList.add('drag');
  try{if(navigator.vibrate)navigator.vibrate(10)}catch(x){}
},true);
document.addEventListener('pointermove',function(e){if(!dg||e.pointerId!==dg.id)return;e.preventDefault();dgPlace(e.clientY);
  if(e.clientY<70)window.scrollBy(0,-8);else if(e.clientY>innerHeight-120)window.scrollBy(0,8)},{passive:false});
function dgEnd(e){
  if(!dg||(e&&e.pointerId!==dg.id))return;
  var d=dg;dg=null;
  d.row.style.transform='';d.row.classList.remove('drag');
  var ids=[].slice.call(d.ul.children).filter(function(x){return x.dataset&&x.dataset.id}).map(function(x){return x.dataset.id});
  var ts=ids.map(function(id){return find(id)}).filter(Boolean);
  var keys=ts.map(ordKey).sort(function(a,b){return a-b});
  for(var i=1;i<keys.length;i++)if(keys[i]<=keys[i-1])keys[i]=keys[i-1]+1;
  ts.forEach(function(t,i){t.o=keys[i]});
  mutate();
}
document.addEventListener('pointerup',dgEnd);
document.addEventListener('pointercancel',dgEnd);

/* ---------- app lock (PIN + fingerprint) ---------- */
var LKEY='barnameyar.lock',lkHidden=0,lkOn=false,alAvail=false;
function lkHash(str){ /* cyrb53: small keyed hash; the PIN only gates the UI on this device */
  var h1=0xdeadbeef,h2=0x41c6ce57,i,c;
  for(i=0;i<str.length;i++){c=str.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);
  h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return (4294967296*(2097151&h2)+(h1>>>0)).toString(36);
}
function lkGet(){try{var j=JSON.parse(localStorage.getItem(LKEY));return j&&j.h?j:null}catch(e){return null}}
function lkSet(o){try{if(o)localStorage.setItem(LKEY,JSON.stringify(o));else localStorage.removeItem(LKEY)}catch(e){}}
var AL=null;
try{var CAP3=window.Capacitor;if(CAP3&&CAP3.isNativePlatform&&CAP3.isNativePlatform())AL=(CAP3.Plugins&&CAP3.Plugins.AppLock)||(CAP3.registerPlugin&&CAP3.registerPlugin('AppLock'))||null}catch(e){AL=null}
function alSecure(on){try{if(AL&&AL.setSecure)AL.setSecure({on:!!on}).catch(function(){})}catch(e){}}
function alCheck(){try{if(AL&&AL.isAvailable)AL.isAvailable().then(function(r){alAvail=!!(r&&r.available)}).catch(function(){})}catch(e){}}
function bioAuth(){
  if(!AL||!alAvail)return Promise.reject();
  return AL.authenticate({title:(__("باز کردن Ario")),cancel:(__("رمز برنامه"))}).then(function(r){if(!(r&&r.ok))throw 0;return true});
}
/* generic 4-digit pad: o={title,sub,logo,cancel,check(pin)->bool,bio} resolves with the pin / 'bio' / null */
function pinPad(o){
  return new Promise(function(res){
    var w=document.createElement('div');w.className='pinw';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');
    var keys='';[1,2,3,4,5,6,7,8,9].forEach(function(n){keys+='<button type="button" data-k="'+n+'" aria-label="'+n+'">'+fa(n)+'</button>'});
    keys+=(o.bio?("<button type=\"button\" data-bio=\"1\" class=\"alt\" aria-label=\""+__("اثر انگشت")+"\">")+icon('spark')+'</button>':'<span></span>')+'<button type="button" data-k="0" aria-label="0">'+fa(0)+("</button><button type=\"button\" data-del=\"1\" class=\"alt\" aria-label=\""+__("پاک کردن")+"\">⌫</button>");
    w.innerHTML=(o.logo?'<svg class="pinlogo" viewBox="0 0 1024 1024" aria-hidden="true"><defs><linearGradient id="plg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6e8aff"/><stop offset="1" stop-color="#4658e8"/></linearGradient></defs><rect width="1024" height="1024" rx="230" fill="url(#plg)"/><circle cx="512" cy="512" r="240" fill="none" stroke="#fff" stroke-width="54"/><path d="M394 522l86 91 165-187" fill="none" stroke="#fff" stroke-width="52" stroke-linecap="round" stroke-linejoin="round"/></svg>':'')+
      '<h2></h2><p class="pinsub"></p><div class="pind" aria-hidden="true"><i></i><i></i><i></i><i></i></div><p class="pinerr" role="alert"></p><div class="pink">'+keys+'</div>'+(o.cancel?("<button type=\"button\" class=\"pinx\" data-x=\"1\">"+__("انصراف")+"</button>"):'');
    w.querySelector('h2').textContent=o.title||'';w.querySelector('.pinsub').textContent=o.sub||'';
    var val='',busy=false,fails=0,until=0,dots=w.querySelectorAll('.pind i'),err=w.querySelector('.pinerr'),dd=w.querySelector('.pind');
    function draw(){dots.forEach(function(d,i){d.className=i<val.length?'on':''})}
    function done(v){w.classList.add('out');setTimeout(function(){w.remove()},380);res(v)}
    function bad(m){err.textContent=m||'';dd.classList.remove('shake');void dd.offsetWidth;dd.classList.add('shake');try{if(navigator.vibrate)navigator.vibrate(60)}catch(e){}}
    async function push(d){
      if(busy)return;
      if(Date.now()<until){bad((__("کمی صبر کن و دوباره امتحان کن")));return}
      if(val.length>=4)return;
      err.textContent='';val+=d;draw();
      if(val.length===4){
        busy=true;var ok=false;try{ok=await o.check(val)}catch(e){}busy=false;
        if(ok){done(val)}else{val='';setTimeout(draw,120);fails++;if(fails>=5){fails=0;until=Date.now()+30000;bad((__("۵ بار اشتباه؛ ۳۰ ثانیه صبر کن")))}else bad(o.badMsg||(__("رمز درست نیست")))}
      }
    }
    function tryBio(){bioAuth().then(function(){done('bio')}).catch(function(){})}
    w.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      if(b.dataset.k!=null)push(b.dataset.k);
      else if(b.dataset.del){val=val.slice(0,-1);draw()}
      else if(b.dataset.bio)tryBio();
      else if(b.dataset.x)done(null);
    });
    document.body.appendChild(w);
    requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('in')})});
    if(o.bio&&o.autoBio)setTimeout(tryBio,350);
  });
}
async function showLock(){
  var c=lkGet();if(!c||lkOn)return;
  lkOn=true;
  await pinPad({logo:true,title:(__("Ario قفل است")),sub:(__("رمز ۴ رقمی را وارد کن")),check:function(p){return lkHash(c.s+p)===c.h},bio:!!c.bio&&alAvail,autoBio:true});
  lkOn=false;
}
document.addEventListener('visibilitychange',function(){
  var c=lkGet();if(!c)return;
  if(document.visibilityState==='hidden'){lkHidden=Date.now();if(!(c.d>0)&&!lkOn)showLock()}
  else if(!lkOn&&lkHidden&&Date.now()-lkHidden>=(c.d||0)*1000)showLock();
});
var LKD=[[0,(__("فوری"))],[30,(__("۳۰ ثانیه"))],[120,(__("۲ دقیقه"))],[600,(__("۱۰ دقیقه"))]];
function lkDName(d){var x=LKD.find(function(a){return a[0]===(d||0)});return x?x[1]:(__("۳۰ ثانیه"))}
async function lkSetup(){
  var p1=await pinPad({title:(__("رمز تازه")),sub:(__("یک رمز ۴ رقمی انتخاب کن")),cancel:true,check:function(){return true}});
  if(!p1)return false;
  var p2=await pinPad({title:(__("تکرار رمز")),sub:(__("همان رمز را دوباره بزن")),cancel:true,badMsg:(__("با رمز اول یکی نیست")),check:function(p){return p===p1}});
  if(!p2)return false;
  var s=Math.random().toString(36).slice(2,8),old=lkGet();
  lkSet({s:s,h:lkHash(s+p1),bio:old?!!old.bio:false,d:old?old.d:30});
  alSecure(true);return true;
}
function lkVerify(title){var c=lkGet();return pinPad({title:title||(__("رمز فعلی")),sub:(__("برای ادامه رمز را وارد کن")),cancel:true,check:function(p){return lkHash(c.s+p)===c.h}})}
var lkEl=null;
function lkDraw(){
  if(!lkEl)return;
  var c=lkGet(),h='';
  h+=("<div class=\"sheet-top\"><span></span><h2>"+__("قفل برنامه")+"</h2><button type=\"button\" data-lk=\"close\">"+__("بستن")+"</button></div>");
  if(!c){
    h+=("<p class=\"hint2\">"+__("با قفل، هر بار برنامه را باز می‌کنی رمز ۴ رقمی (یا اثر انگشت) لازم است؛ کارهای شخصی‌ات دست دیگران نمی‌افتد. محتوای برنامه در لیست برنامه‌های اخیر هم پنهان می‌شود.")+"</p><button type=\"button\" class=\"bkb\" data-lk=\"set\">")+icon('lock')+("<span>"+__("تنظیم رمز ۴ رقمی")+"</span></button>");
  }else{
    h+='<button type="button" class="bkb" data-lk="change">'+icon('edit')+("<span>"+__("تغییر رمز")+"</span></button>");
    h+='<button type="button" class="bkb" data-lk="bio" '+(alAvail?'':'disabled style="opacity:.5"')+'>'+icon('spark')+("<span>"+__("باز کردن با اثر انگشت / چهره")+"<small>")+(alAvail?(c.bio?(__("روشن")):(__("خاموش"))):(__("روی این گوشی در دسترس نیست یا ثبت نشده")))+'</small></span></button>';
    h+='<button type="button" class="bkb" data-lk="delay">'+icon('clock')+("<span>"+__("قفل شدن خودکار")+"<small>")+lkDName(c.d)+(" "+__("بعد از خروج از برنامه")+"</small></span></button>");
    h+='<button type="button" class="bkb" data-lk="off" style="color:var(--bad)">'+icon('trash')+("<span>"+__("برداشتن قفل")+"</span></button>");
    h+=("<p class=\"hint2\">"+__("اگر رمز را فراموش کنی، فقط با پاک کردن اطلاعات برنامه باز می‌شود و کارهایت از بین می‌رود. پس از فایل پشتیبان کمک بگیر.")+"</p>");
  }
  lkEl.querySelector('.sheet').innerHTML='<div class="grab"></div>'+h;
}
function openLockSettings(){
  if(lkEl)return;
  alCheck();
  var w=document.createElement('div');w.className='sheet-wrap';
  w.innerHTML=("<div class=\"dim\"></div><div class=\"sheet bk\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("قفل برنامه")+"\"></div>");
  document.body.appendChild(w);lkEl=w;lkDraw();
  document.documentElement.style.overflow='hidden';
  function close(){if(!lkEl)return;lkEl=null;w.classList.remove('open');document.documentElement.style.overflow='';setTimeout(function(){w.remove()},350);if(ui.tab==='account')render()}
  w.addEventListener('click',async function(e){
    if(e.target.classList.contains('dim')){close();return}
    var b=e.target.closest('[data-lk]');if(!b||b.disabled)return;var a=b.dataset.lk,c=lkGet();
    if(a==='close')close();
    else if(a==='set'||a==='change'){
      if(a==='change'&&!(await lkVerify((__("رمز فعلی")))))return;
      if(await lkSetup()){toast(a==='set'?(__("قفل برنامه روشن شد")):(__("رمز تغییر کرد")),null,null,'ok');lkDraw()}
    }
    else if(a==='bio'){
      if(c.bio){c.bio=false;lkSet(c);lkDraw();return}
      try{await bioAuth();c.bio=true;lkSet(c);lkDraw();toast((__("باز کردن با اثر انگشت روشن شد")),null,null,'ok')}catch(x){toast((__("تأیید اثر انگشت انجام نشد")),null,null,'warn')}
    }
    else if(a==='delay'){var i=LKD.findIndex(function(x){return x[0]===(c.d||0)});c.d=LKD[(i+1)%LKD.length][0];lkSet(c);lkDraw()}
    else if(a==='off'){
      if(!(await lkVerify((__("برداشتن قفل")))))return;
      lkSet(null);alSecure(false);lkDraw();toast((__("قفل برداشته شد")),null,null,'info');
    }
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
actions.openLock=function(){openLockSettings()};

/* ---------- quick add: understands Persian sentences ---------- */
var JM=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
var NW={'یک':1,'دو':2,'سه':3,'چهار':4,'پنج':5,'شش':6,'هفت':7,'هشت':8,'نه':9,'ده':10,'یازده':11,'دوازده':12,'سیزده':13,'چهارده':14,'پانزده':15,'شانزده':16,'هفده':17,'هجده':18,'نوزده':19,'بیست':20,'سی':30,'چهل':40,'پنجاه':50};
var NWR='(?:(?:بیست|سی|چهل|پنجاه)(?: و (?:یک|دو|سه|چهار|پنج|شش|هفت|هشت|نه))?|یازده|دوازده|سیزده|چهارده|پانزده|شانزده|هفده|هجده|نوزده|ده|یک|دو|سه|چهار|پنج|شش|هفت|هشت|نه)';
function nlNumWords(t){
  var conv=function(w){var p=w.split(' و '),n=0;p.forEach(function(x){n+=NW[x]||0});return String(n)};
  t=t.replace(new RegExp('(ساعت\\s)('+NWR+')(?![آ-ی])','g'),function(m,a,w){return a+conv(w)});
  t=t.replace(new RegExp('(?<![آ-ی])('+NWR+')(\\s(?:'+JM.join('|')+'|روز|هفته|دقیقه)(?![آ-ی]))','g'),function(m,w,b){return conv(w)+b});
  return t;
}
function nlFindDate(m,d){ /* next Gregorian date whose Jalali month/day match */
  var td=todayKey(),i,k,j;
  for(i=0;i<400;i++){k=addDays(td,i);j=jp(k);if(j.m===m&&j.d===d)return k}
  return null;
}
function nlParse(raw){return EN?nlParseEn(raw):nlParseFa(raw)}
function nlParseFa(raw){
  var t=String(raw||'').replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace(/ي/g,'ی').replace(/ك/g,'ک');
  t=nlNumWords(t);
  var o={t:'',d:null,tm:'',te:'',tg:[],c:'',p:0,rp:'',hasDate:false,hasTime:false},td=todayKey(),m;
  var cut=function(re){var r=t.match(re);if(r){t=t.replace(r[0],' ')}return r};
  // tags
  var tr=/#([^\s#]+)/g,tm2;while((tm2=tr.exec(t))){o.tg.push(tm2[1].replace(/_/g,' ').slice(0,16))}
  t=t.replace(/#[^\s#]+/g,' ');
  // priority
  if((m=cut(/(^|\s)(!{1,2})(فوری|مهم)?(?=\s|$)/))){o.p=(m[2].length>1||m[3]==='فوری')?2:1}
  // repeat
  if((m=cut(/هر[\s‌]*(روز|هفته|ماه)(?![آ-ی])/))){o.rp={'روز':'daily','هفته':'weekly','ماه':'monthly'}[m[1]]}
  // date
  var wd=['یکشنبه','دوشنبه','سه[\\s\\u200c]?شنبه','چهارشنبه','پنج[\\s\\u200c]?شنبه','جمعه','شنبه'],wdn=[0,1,2,3,4,5,6]; /* js getDay: Sun=0 .. Sat=6 */
  var dk=null;
  if((m=cut(/پس[\s‌]*فردا(?![آ-ی])/)))dk=addDays(td,2);
  else if((m=cut(/(?<![آ-ی])فردا(?![آ-ی])/)))dk=addDays(td,1);
  else if((m=cut(/(?<![آ-ی])امروز(?![آ-ی])/)))dk=td;
  else if((m=cut(/(\d{1,3})\s*(روز|هفته)\s*(?:دیگر|بعد)(?![آ-ی])/))){var n=+m[1]*(m[2]==='هفته'?7:1);dk=addDays(td,n)}
  else if((m=cut(/(\d{4})\/(\d{1,2})\/(\d{1,2})/))){
    var y=+m[1],mo=+m[2],dd=+m[3],i;for(i=-400;i<800;i++){var kk=addDays(td,i),j=jp(kk);if(j.y===y&&j.m===mo&&j.d===dd){dk=kk;break}}
  }
  else if((m=cut(new RegExp('(\\d{1,2})\\s*('+JM.join('|')+')(?:\\s*ماه)?(?![آ-ی])')))){dk=nlFindDate(JM.indexOf(m[2])+1,+m[1])}
  else{
    var rx=new RegExp('(?<![آ-ی])(?:(این|هفته[\\s\\u200c]*بعد|هفته[\\s\\u200c]*آینده)[\\s\\u200c]+)?('+wd.join('|')+')(?:[\\s\\u200c]+(هفته[\\s\\u200c]*(?:بعد|آینده)))?(?![آ-ی])');
    if((m=cut(rx))){
      var name=m[2].replace(/[\s‌]/g,''),idx=['یکشنبه','دوشنبه','سهشنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'].indexOf(name),dow=wdn[idx];
      var nextW=!!(m[1]&&/هفته/.test(m[1]))||!!m[3],now=parse(td).getDay();
      var add=(dow-now+7)%7;if(add===0)add=7;
      dk=addDays(td,add);
      if(nextW)dk=addDays(weekStart(td),7+((dow+1)%7));
    }
  }
  if(dk){o.d=dk;o.hasDate=true}
  // time (with optional "تا" end)
  var trx=/(?:از\s*)?ساعت\s*(\d{1,2})(?:[:٫.](\d{2}))?(?:\s*و\s*(نیم|ربع|\d{1,2}\s*دقیقه))?(?:\s*(صبح|ظهر|بعد[\s‌]*از[\s‌]*ظهر|عصر|شب|نیمه[\s‌]*شب))?(?:\s*تا\s*(?:ساعت\s*)?(\d{1,2})(?:[:٫.](\d{2}))?)?/;
  var trx2=/(?<!\d)(\d{1,2}):(\d{2})(?!\d)(?:\s*(صبح|ظهر|بعد[\s‌]*از[\s‌]*ظهر|عصر|شب))?/;
  var hh2=function(h,per){
    if(per){per=per.replace(/[\s‌]/g,'');
      if((per==='عصر'||per==='بعدازظهر')&&h<12)h+=12;
      else if(per==='شب'&&h>=5&&h<12)h+=12;
      else if(per==='صبح'&&h===12)h=0;
      else if(per==='ظهر'&&h<=4)h+=12;
      else if(per==='نیمهشب'&&h===12)h=0;
    }else if(h>=1&&h<=6)h+=12;
    return h%24;
  };
  if((m=cut(trx))){
    var h=+m[1],mi=m[2]?+m[2]:(m[3]?(m[3]==='نیم'?30:m[3]==='ربع'?15:parseInt(m[3],10)):0);
    if(h<=24&&mi<60){
      h=hh2(h===24?0:h,m[4]);o.tm=pad(h)+':'+pad(mi)+':00';o.hasTime=true;
      if(m[5]){var h3=+m[5],m3=m[6]?+m[6]:0;if(h3<=24){var e=hh2(h3===24?0:h3,m[4]);if(!m[4]&&e<h)e=(e+12)%24;o.te=pad(e)+':'+pad(m3)+':00'}}
    }
  }else if((m=cut(trx2))){
    var h4=+m[1];if(h4<24&&+m[2]<60){h4=m[3]?hh2(h4,m[3]):h4;o.tm=pad(h4)+':'+m[2]+':00';o.hasTime=true}
  }
  // category from a #tag that matches a category name
  o.tg=o.tg.filter(function(g){
    var c=CATS.find(function(x){return x.n===g});
    if(c&&!o.c){o.c=c.id;return false}
    return true;
  }).filter(function(g,i,a){return a.indexOf(g)===i}).slice(0,6);
  t=t.replace(/(^|\s)(در|برای|به|و|تا|از)(?=\s*$)/g,' ').replace(/^\s*(و|که)\s+/,'').replace(/\s+/g,' ').trim();
  o.t=t;
  if(!o.t)o.t=String(raw||'').replace(/#[^\s#]+/g,'').trim();
  if(/[آ-ی]/.test(o.t))o.t=fa(o.t);
  o.t=o.t.slice(0,140);
  return o;
}

/* ---------- quick add (English): "tomorrow at 5pm meeting with Ali #work !important every week" ---------- */
var EN_MON=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
var EN_DAY=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
function nlParseEn(raw){
  var t=' '+String(raw||'').replace(/\s+/g,' ')+' ',td=todayKey(),m,x,i;
  var o={t:'',d:null,tm:'',te:'',tg:[],c:'',p:0,rp:'',hasDate:false,hasTime:false};
  var cut=function(re){var r=t.match(re);if(r)t=t.replace(r[0],' ');return r};
  var rx=/#([^\s#]+)/g;while((x=rx.exec(t)))o.tg.push(x[1].replace(/_/g,' ').slice(0,16));
  t=t.replace(/#[^\s#]+/g,' ');
  if((m=cut(/(^|\s)(!{1,2})(urgent|important)?(?=\s|$)/i)))o.p=(m[2].length>1||/^urgent$/i.test(m[3]||''))?2:1;
  if((m=cut(/\b(?:every\s*(day|week|month)|(daily|weekly|monthly))\b/i))){var w=(m[1]||m[2]).toLowerCase();o.rp=/^(day|daily)/.test(w)?'daily':/^week/.test(w)?'weekly':'monthly'}
  var dk=null,mon='(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';
  var fut=function(mo,d){var y=new Date().getFullYear(),k=y+'-'+pad(mo)+'-'+pad(d);if(k<td)k=(y+1)+'-'+pad(mo)+'-'+pad(d);return k};
  if(cut(/\bday after tomorrow\b/i))dk=addDays(td,2);
  else if(cut(/\b(?:tomorrow|tmrw|tmr)\b/i))dk=addDays(td,1);
  else if(cut(/\b(?:today|tonight)\b/i))dk=td;
  else if((m=cut(/\bin\s+(\d{1,3})\s+(day|week)s?\b/i)))dk=addDays(td,+m[1]*(/week/i.test(m[2])?7:1));
  else if((m=cut(/\b(\d{4})-(\d{2})-(\d{2})\b/)))dk=m[1]+'-'+m[2]+'-'+m[3];
  else if((m=cut(new RegExp('\\b(?:on\\s+)?(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?'+mon+'\\b','i'))))dk=fut(EN_MON.indexOf(m[2].toLowerCase())+1,+m[1]);
  else if((m=cut(new RegExp('\\b(?:on\\s+)?'+mon+'\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b','i'))))dk=fut(EN_MON.indexOf(m[1].toLowerCase())+1,+m[2]);
  else{
    var wm=cut(/\b(?:(next|this)\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i),wn='',wx='';
    if(wm){wn=wm[2];wx=wm[1]||''}
    else if((wm=cut(/\b(on|next|this)\s+(sun|mon|tue|wed|thu|fri|sat)\b/i))){wn=wm[2];wx=/next/i.test(wm[1])?'next':''}
    if(wn){
      wn=wn.toLowerCase();var dow=-1;for(i=0;i<7;i++)if(EN_DAY[i].indexOf(wn)===0)dow=i;
      var add=(dow-parse(td).getDay()+7)%7;if(add===0)add=7;dk=addDays(td,add);
      if(/next/i.test(wx))dk=addDays(weekStart(td),7+((dow-WS+7)%7));
    }
  }
  if(dk){o.d=dk;o.hasDate=true}
  var h12=function(h,ap){ap=(ap||'').toLowerCase().charAt(0);if(ap==='p'&&h<12)h+=12;else if(ap==='a'&&h===12)h=0;return h};
  var set=function(h,mi,h2,mi2){if(h>23||mi>59)return;o.tm=pad(h)+':'+pad(mi)+':00';o.hasTime=true;if(h2!=null&&h2<=23&&(mi2||0)<=59)o.te=pad(h2)+':'+pad(mi2||0)+':00'};
  if(cut(/\bnoon\b/i))set(12,0);
  else if((m=cut(/\b(?:from\s+|at\s+)?(\d{1,2})(?::(\d{2}))?\s*(?:(a\.?m\.?|p\.?m\.?)\s*)?(?:-|–|to|until|till)\s*(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)(?![a-z])/i))){
    var ap2=m[6],ap1=m[3]||m[6];set(h12(+m[1],ap1),+(m[2]||0),h12(+m[4],ap2),+(m[5]||0));
  }else if((m=cut(/\b(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)(?![a-z])/i)))set(h12(+m[1],m[3]),+(m[2]||0));
  else if((m=cut(/(?<![\d:])(?:at\s+|from\s+)?(\d{1,2}):(\d{2})(?!\d)(?:\s*(?:-|–|to|until|till)\s*(\d{1,2}):(\d{2})(?!\d))?/i)))set(+m[1],+m[2],m[3]!=null?+m[3]:null,m[4]!=null?+m[4]:null);
  else if((m=cut(/\bat\s+(\d{1,2})\b(?!\s*[:%])/i))){var hh=+m[1];if(hh>=1&&hh<=6)hh+=12;set(hh%24,0)}
  o.tg=o.tg.filter(function(g){
    var c=CATS.find(function(y){return String(y.n).toLowerCase()===g.toLowerCase()});
    if(c&&!o.c){o.c=c.id;return false}
    return true;
  }).filter(function(g,i,a){return a.indexOf(g)===i}).slice(0,6);
  t=t.replace(/\s+(on|at|by|from|to|until|till|for|in|due|next|this|every)\s*$/i,' ').replace(/(^|\s)(on|at|by|due)(?=\s*$)/gi,' ').replace(/^\s*(to|and|that)\s+/i,'').replace(/\s+/g,' ').trim();
  o.t=t.slice(0,140);
  if(!o.t)o.t=String(raw||'').replace(/#[^\s#]+/g,'').trim().slice(0,140);
  return o;
}
function qaDescribe(o){
  var parts=[];
  parts.push(icon('calendar')+relDate(o.d||todayKey()));
  if(o.tm)parts.push(icon('clock')+fa(pad(pt(o.tm).h)+':'+pad(pt(o.tm).m))+(o.te?(" "+__("تا")+" ")+fa(pad(pt(o.te).h)+':'+pad(pt(o.te).m)):''));
  if(o.c)parts.push('<i class="dotc" style="background:'+cvar(cat(o.c).c)+'"></i>'+esc(cat(o.c).n));
  o.tg.forEach(function(g){parts.push('#'+esc(g))});
  if(o.p)parts.push(icon('flag')+(o.p>1?(__("فوری")):(__("مهم"))));
  if(o.rp&&RPN[o.rp])parts.push(icon('refresh')+RPN[o.rp]);
  return parts.map(function(x){return '<span>'+x+'</span>'}).join('');
}
function qaPreview(){
  var inp=document.getElementById('qaIn'),box=document.getElementById('qaPrev');if(!inp||!box)return;
  var v=inp.value.trim();
  if(!v){box.innerHTML=("<span class=\"qh\">"+__("مثلاً: «فردا ساعت ۵ عصر جلسه با علی #کار !مهم»")+"</span>");return}
  var o=nlParse(v);
  box.innerHTML='<b class="qt">'+esc(o.t)+'</b>'+qaDescribe(o);
}
function qaSubmit(text){
  var v=String(text==null?(document.getElementById('qaIn')||{}).value:text).trim();if(!v)return false;
  var o=nlParse(v);if(!o.t)return false;
  var c=o.c||((ui.cat&&ui.cat!=='all'&&CATS.some(function(x){return x.id===ui.cat}))?ui.cat:defCat());
  var rec={id:uid(),done:false,doneAt:0,ts:Date.now(),t:o.t,n:'',d:o.d||todayKey(),tm:o.tm,te:o.te,col:'',p:o.p,c:c,r:o.tm&&state.profile.notif?0:-1,rp:o.rp,st:[],tg:o.tg};
  state.tasks.push(rec);
  var inp=document.getElementById('qaIn');if(inp)inp.value='';
  mutate();
  notify('add',(__("کار جدید اضافه شد")),o.t+' · '+relDate(rec.d)+(o.tm?' · '+fa(pad(pt(o.tm).h)+':'+pad(pt(o.tm).m)):''));
  return true;
}
document.addEventListener('input',function(e){if(e.target&&e.target.id==='qaIn')qaPreview()});
document.addEventListener('submit',function(e){if(e.target&&e.target.id==='qaForm'){e.preventDefault();qaSubmit()}});
var SRN=null;
try{var CAP4=window.Capacitor;if(CAP4&&CAP4.isNativePlatform&&CAP4.isNativePlatform())SRN=(CAP4.Plugins&&CAP4.Plugins.SpeechRecognition)||(CAP4.registerPlugin&&CAP4.registerPlugin('SpeechRecognition'))||null}catch(e){SRN=null}
function qaMicOK(){return !!(SRN||window.SpeechRecognition||window.webkitSpeechRecognition)}
function qaFill(txt){
  var inp=document.getElementById('qaIn');if(!inp||!txt)return;
  inp.value=txt;qaPreview();
  if(state.profile.qaAuto)qaSubmit();
}
/* shared voice input: one spoken sentence -> text (native plugin in the APK, Web Speech API in browsers) */
var vcBusy=false;
async function voiceListen(prompt,btn){
  if(vcBusy)return '';vcBusy=true;
  try{
    if(SRN){
      var pm=null,ps='';
      try{pm=await SRN.checkPermissions();ps=pm&&pm.speechRecognition}catch(e0){}
      if(ps!=='granted'){
        try{await SRN.requestPermissions()}catch(e0){}
        await new Promise(function(r){setTimeout(r,400)});
        try{pm=await SRN.checkPermissions();ps=pm&&pm.speechRecognition}catch(e0){}
      }
      /* only stop when Android says the microphone is really closed; otherwise let the recogniser itself report what is wrong */
      if(ps==='denied'){toast((__("میکروفون برای Ario بسته است. از تنظیمات گوشی")+" > "+__("برنامه‌ها")+" > Ario > "+__("مجوزها، میکروفون را روشن کن")),null,null,'warn');return ''}
      var av=null;try{av=await SRN.available()}catch(e0){}
      var vo={language:EN?'en-US':'fa-IR',maxResults:1,prompt:prompt||(__("بگو…")),partialResults:false};
      if(btn)btn.classList.add('rec');
      var r;
      try{r=await SRN.start(Object.assign({popup:true},vo))}
      catch(e1){
        if(/cancel|no match|didn.?t|timeout|not understand/i.test(String((e1&&e1.message)||e1)))return '';
        try{r=await SRN.start(Object.assign({popup:false},vo))}
        catch(e2){throw new Error((av&&av.available===false?(__("سرویس گفتار گوگل پیدا نشد؛")+" "):'')+String((e2&&e2.message)||e2)+' ['+ps+']')}
      }
      return (r&&r.matches&&r.matches[0])||'';
    }
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){toast((__("ورودی صوتی روی این دستگاه پشتیبانی نمی‌شود؛ می‌توانی با میکروفون کیبورد بگویی")),null,null,'info');return ''}
    return await new Promise(function(res){
      var rec=new SR(),t='';rec.lang=EN?'en-US':'fa-IR';rec.interimResults=false;rec.maxAlternatives=1;
      if(btn)btn.classList.add('rec');
      rec.onresult=function(ev){t=ev.results[0][0].transcript};
      rec.onend=function(){res(t)};
      rec.onerror=function(ev){
        var c=ev&&ev.error||'';
        var M={'not-allowed':(__("اجازه‌ی میکروفون داده نشد")),'service-not-allowed':(__("سرویس گفتار اجازه ندارد (این صفحه داخل برنامه‌ی اندروید اجرا نشده؟)")),'network':(__("اینترنت لازم است")),'no-speech':(__("صدایی شنیده نشد")),'audio-capture':(__("میکروفون پیدا نشد")),'language-not-supported':(__("زبان فارسی پشتیبانی نمی‌شود"))};
        if(c!=='aborted')toast((M[c]||(__("تشخیص گفتار کار نکرد")))+' ['+c+']',null,null,'warn');
        res(t)};
      try{rec.start()}catch(e2){toast((__("تشخیص گفتار شروع نشد ("))+String(e2&&e2.message||e2).slice(0,60)+')',null,null,'warn');res('')}
    });
  }catch(e){var em=String((e&&e.message)||e||'');if(SRN&&!/cancel|no match|didn.?t|timeout|not understand/i.test(em))toast((__("تشخیص گفتار کار نکرد"))+(em?' ('+em.slice(0,80)+')':''),null,null,'warn');return ''}
  finally{vcBusy=false;if(btn)btn.classList.remove('rec')}
}
async function qaMic(){
  var btn=document.getElementById('qaMic');
  var t=await voiceListen((__("کار را بگو (مثلاً فردا ساعت ۵ جلسه)")),btn);
  if(t)qaFill(t);
}
/* spoken Persian numbers and durations: "دو ساعت و نیم", "۴۵ دقیقه", "بیست و پنج تست" */
var VW={'صفر':0,'یک':1,'یه':1,'دو':2,'سه':3,'چهار':4,'پنج':5,'شش':6,'شیش':6,'هفت':7,'هشت':8,'نه':9,'ده':10,'یازده':11,'دوازده':12,'سیزده':13,'چهارده':14,'پانزده':15,'پونزده':15,'شانزده':16,'شونزده':16,'هفده':17,'هجده':18,'نوزده':19,'بیست':20,'سی':30,'چهل':40,'پنجاه':50,'شصت':60,'هفتاد':70,'هشتاد':80,'نود':90,'صد':100,'دویست':200,'سیصد':300,'چهارصد':400,'پانصد':500,'ششصد':600,'هفتصد':700,'هشتصد':800,'نهصد':900};
function vcNorm(x){return String(x).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace(/[\u064B-\u0652]/g,'').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[\u200c\u200f]/g,' ').replace(/٫/g,'.').replace(/\s+/g,' ').trim()}
function vcWords(x){
  var t=x.split(' '),o=[],i=0;
  while(i<t.length){
    if(VW.hasOwnProperty(t[i])){
      var v=VW[t[i]],j=i+1;
      while(t[j]==='و'&&VW.hasOwnProperty(t[j+1])){
        var w=VW[t[j+1]],lo=v%100;
        if(w>0&&((v>=100&&lo===0&&w<100)||(lo>=20&&lo%10===0&&w<10))){v+=w;j+=2}else break;
      }
      o.push(String(v));i=j;
    }else{o.push(t[i]);i++}
  }
  return o.join(' ');
}
function vcNum(x){var m=vcWords(vcNorm(x)).match(/\d+(?:\.\d+)?/);return m?m[0]:''}
function vcDur(x){
  var t=vcWords(vcNorm(x)),h=0,mi=0,f=false;
  t=t.replace(/(\d+(?:\.\d+)?) ?ساعت(?: ?و)? ?نیم/,function(_,a){h+=+a+.5;f=true;return ' '});
  t=t.replace(/(\d+(?:\.\d+)?) ?ساعت(?: ?و)? ?ربع/,function(_,a){h+=+a+.25;f=true;return ' '});
  t=t.replace(/نیم ?ساعت/,function(){mi+=30;f=true;return ' '});
  t=t.replace(/(\d+(?:\.\d+)?) ?ساعت/,function(_,a){h+=+a;f=true;return ' '});
  t=t.replace(/(\d+) ?دقیقه/,function(_,a){mi+=+a;f=true;return ' '});
  return f?Math.round(h*60+mi):null;
}
function vcTime(x){
  var t=vcWords(vcNorm(x)),m=t.match(/(\d{1,2})(?:[:.](\d{2}))?/);if(!m)return '';
  var h=+m[1],mi=m[2]?+m[2]:0,mm=t.match(/و (\d{1,2}) دقیقه/);
  if(!m[2]){if(/و نیم/.test(t))mi=30;else if(/و ربع/.test(t))mi=15;else if(mm)mi=+mm[1]}
  if(/(شب|عصر|بعد ?از ?ظهر)/.test(t)){if(h<12)h+=12;else if(h===12&&/شب/.test(t))h=0}
  if(/صبح/.test(t)&&h===12)h=0;
  if(h>23||mi>59)return '';
  return (h<10?'0':'')+h+':'+(mi<10?'0':'')+mi;
}
actions.qaMic=function(){qaMic()};
if(/[?&]test=1/.test(location.search))window.__nl=nlParse;

/* ---------- habits ---------- */
var HSAMPLES=[[(__("ورزش")),'dumbbell','#f0266a'],[(__("مطالعه")),'book','#a259f2'],[(__("نوشیدن آب")),'leaf','#00a9c9'],[(__("خواب منظم")),'moon','#5c6bc0']];
function hbs(){return state.profile.habits||(state.profile.habits=[])}
function hbFind(id){return hbs().find(function(h){return h.id===id})}
function hbOn(h,k){return !!(h.d&&h.d[k])}
function hbStreak(h){var k=todayKey(),n=0;if(!hbOn(h,k))k=addDays(k,-1);while(hbOn(h,k)){n++;k=addDays(k,-1)}return n}
function hbBest(h){
  var ks=Object.keys(h.d||{}).sort(),best=0,run=0,prev=null;
  ks.forEach(function(k){run=(prev&&addDays(prev,1)===k)?run+1:1;if(run>best)best=run;prev=k});
  return best;
}
function hbCount(h){return Object.keys(h.d||{}).length}
function hbToggle(id,k){
  var h=hbFind(id);if(!h)return;
  k=k||todayKey();
  if(!h.d)h.d={};
  var on=!hbOn(h,k);
  if(on)h.d[k]=1;else delete h.d[k];
  mutate();
  if(on&&k===todayKey()){
    playDone(null,false);
    var st=hbStreak(h);
    if([3,7,14,21,30,50,100,200,365].indexOf(st)>-1)notify('ok','🔥 '+fa(st)+(" "+__("روز پیاپی")),h.n);
    gmCheck();
  }
}
function habitStrip(){
  var hs=hbs();if(!hs.length)return '';
  var td=todayKey();
  return ("<div class=\"hstrip\" role=\"group\" aria-label=\""+__("عادت‌های امروز")+"\">")+hs.map(function(h){
    var on=hbOn(h,td);
    return '<button type="button" class="hchip'+(on?' on':'')+'" data-act="hbToggle" data-id="'+h.id+'" aria-pressed="'+on+'" style="--cc:'+cvar(h.c)+'">'+icon(h.i)+'<span>'+esc(h.n)+'</span></button>';
  }).join('')+'</div>';
}
function viewHabits(){
  var hs=hbs(),td=todayKey(),doneN=hs.filter(function(h){return hbOn(h,td)}).length;
  var ws=weekStart(td);
  var h1=head(hs.length?fa(doneN)+(" "+__("از")+" ")+fa(hs.length)+(" "+__("عادت امروز")):(__("کارهای هر‌روزه را اینجا دنبال کن")),(__("عادت‌ها")),{back:1,backAct:'lsBack',backTxt:(__("برنامه")),right:("<button type=\"button\" class=\"round glass\" data-act=\"newHabit\" aria-label=\""+__("عادت جدید")+"\">")+icon('plus')+'</button>'})+segG([['cats',(__("دسته‌ها"))],['habits',(__("عادت‌ها"))]],'lsec','habits');
  if(!hs.length){
    return h1+'<div class="empty"><div class="badge">'+icon('fire')+("</div><h3>"+__("هنوز عادتی نداری")+"</h3><p>"+__("عادت یعنی کاری که هر روز تکرار می‌شود. هر روز تیکش بزن تا زنجیره‌ی روزهای پیاپی ساخته شود.")+"</p></div>")+
      ("<h3 class=\"gh\"><span>"+__("شروع سریع")+"</span></h3><div class=\"hsug\">")+HSAMPLES.map(function(x,i){return '<button type="button" class="chip" data-act="hbSample" data-i="'+i+'" style="--cc:'+x[2]+'"><i></i>'+x[0]+'</button>'}).join('')+'</div>';
  }
  var cards=hs.map(function(h){
    var st=hbStreak(h),best=hbBest(h),days='',i;
    for(i=0;i<7;i++){
      var k=addDays(ws,i),fut=k>td,on=hbOn(h,k);
      days+='<button type="button" class="hday'+(on?' on':'')+(k===td?' today':'')+'" data-act="hbDay" data-id="'+h.id+'" data-k="'+k+'" '+(fut?'disabled ':'')+'aria-pressed="'+on+'" aria-label="'+F.long.format(parse(k))+'"><small>'+WK[parse(k).getDay()]+'</small><i>'+(on?icon('check'):'')+'</i></button>';
    }
    return '<section class="hcard glass" style="--cc:'+cvar(h.c)+'"><div class="hhead"><button type="button" class="hbig'+(hbOn(h,td)?' on':'')+'" data-act="hbToggle" data-id="'+h.id+'" aria-pressed="'+hbOn(h,td)+'" aria-label="'+esc(h.n)+(" "+__("امروز")+"\">")+icon(h.i)+'</button><div class="hmeta"><h3>'+esc(h.n)+'</h3><p>'+(st?'🔥 '+fa(st)+(" "+__("روز پیاپی")):(__("امروز شروع کن")))+(" · "+__("بهترین:")+" ")+fa(best)+'</p></div><button type="button" class="hedit" data-act="editHabit" data-id="'+h.id+("\" aria-label=\""+__("ویرایش")+" ")+esc(h.n)+'">'+icon('edit')+'</button></div><div class="hdays">'+days+'</div></section>';
  }).join('');
  /* last 7 days: share of habits completed */
  var bars='',i2,tot=hs.length;
  for(i2=6;i2>=0;i2--){
    var k2=addDays(td,-i2),n=hs.filter(function(h){return hbOn(h,k2)}).length,pc=tot?Math.round(n/tot*100):0;
    bars+='<div class="hbar"><i style="height:'+Math.max(4,pc)+'%"></i><small>'+WK[parse(k2).getDay()]+'</small><b>'+fa(pc)+PCT+'</b></div>';
  }
  var avg=0,c7=0;for(i2=0;i2<7;i2++){var kk=addDays(td,-i2);hs.forEach(function(h){if(hbOn(h,kk))c7++})}
  avg=tot?Math.round(c7/(tot*7)*100):0;
  return h1+cards+("<section class=\"glass hchart\"><div class=\"hct\"><b>"+__("هفت روز اخیر")+"</b><span>"+__("میانگین")+" ")+fa(avg)+PCT+'</span></div><div class="hbars">'+bars+'</div></section>';
}
actions.lsec=function(d){ui.lsec=d.v;render('swap')};
actions.hbToggle=function(d){hbToggle(d.id)};
actions.hbDay=function(d){hbToggle(d.id,d.k)};
actions.hbSample=function(d){var x=HSAMPLES[+d.i];if(!x)return;hbs().push({id:uid(),n:x[0],i:x[1],c:x[2],ts:Date.now(),d:{}});mutate()};
actions.newHabit=function(){openHabitEd(null)};
actions.editHabit=function(d){openHabitEd(d.id)};
var hed=null;
function openHabitEd(id){
  if(hed)return;
  var h=id?hbFind(id):null,dd=h?{id:h.id,n:h.n,i:h.i,c:h.c}:{id:'',n:'',i:ICONS[0],c:SWATCH[3]};
  var w=document.createElement('div');w.className='sheet-wrap';
  w.innerHTML=("<div class=\"dim\"></div><form class=\"sheet\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("عادت")+"\" autocomplete=\"off\"></form>");
  document.body.appendChild(w);hed=w;
  var form=w.querySelector('form');
  function draw(){
    var td=todayKey(),hh=h?hbFind(h.id):null;
    var stats='';
    if(hh){
      var ws=weekStart(addDays(td,-28)),cells='',i;
      [(__("ش")),(__("ی")),(__("د")),(__("س")),(__("چ")),(__("پ")),(__("ج"))].forEach(function(x){cells+='<span class="mh">'+x+'</span>'});
      for(i=0;i<35;i++){var k=addDays(ws,i),on=hbOn(hh,k),fut=k>td;cells+='<button type="button" class="hm'+(on?' on':'')+(k===td?' today':'')+'" data-hd="'+k+'" '+(fut?'disabled ':'')+'aria-pressed="'+on+'" aria-label="'+F.long.format(parse(k))+'"></button>'}
      stats='<div class="hstats"><div><b>'+fa(hbStreak(hh))+("</b><small>"+__("روز پیاپی")+"</small></div><div><b>")+fa(hbBest(hh))+("</b><small>"+__("بهترین رکورد")+"</small></div><div><b>")+fa(hbCount(hh))+("</b><small>"+__("کل روزها")+"</small></div></div><div class=\"sec\"><div class=\"sec-h\"><b>"+__("۵ هفته اخیر")+"</b><small style=\"color:var(--fg3)\">"+__("برای ثبت یا حذف روز بزن")+"</small></div><div class=\"mgrid hmap\">")+cells+'</div></div>';
    }
    form.innerHTML=("<div class=\"grab\"></div><div class=\"sheet-top\"><button type=\"button\" data-hb=\"cancel\">"+__("انصراف")+"</button><h2>")+(hh?(__("ویرایش عادت")):(__("عادت جدید")))+("</h2><button type=\"submit\" class=\"save\">"+__("ذخیره")+"</button></div>")+
      ("<input class=\"field\" id=\"hbName\" type=\"text\" maxlength=\"24\" placeholder=\""+__("نام عادت، مثلاً ورزش")+"\" aria-label=\""+__("نام عادت")+"\" value=\"")+esc(dd.n)+'">'+
      ("<div class=\"sec\"><div class=\"sec-h\"><b>"+__("آیکون")+"</b></div><div class=\"icons\">")+ICONS.map(function(n){return '<button type="button" class="icb" data-hi="'+n+'" aria-pressed="'+(dd.i===n)+'" style="--cc:'+cvar(dd.c)+("\" aria-label=\""+__("آیکون")+"\">")+icon(n)+'</button>'}).join('')+'</div></div>'+
      ("<div class=\"sec\"><div class=\"sec-h\"><b>"+__("رنگ")+"</b></div><div class=\"chips\">")+SWATCH.map(function(x){return '<button type="button" class="swatch" data-hc="'+x+'" style="--cc:'+x+'" aria-pressed="'+(dd.c===x)+("\" aria-label=\""+__("رنگ")+"\"></button>")}).join('')+'</div></div>'+stats+
      (hh?'<button type="button" class="danger" data-hb="del">'+icon('trash')+(__("حذف این عادت")+"</button>"):'');
  }
  draw();
  document.documentElement.style.overflow='hidden';
  function close(){if(!hed)return;hed=null;w.classList.remove('open');document.documentElement.style.overflow='';setTimeout(function(){w.remove()},350)}
  w.addEventListener('click',function(e){
    if(e.target.classList.contains('dim')){close();return}
    var b=e.target.closest('button');if(!b)return;
    var nm=form.querySelector('#hbName');if(nm)dd.n=nm.value;
    if(b.dataset.hb==='cancel')close();
    else if(b.dataset.hi){dd.i=b.dataset.hi;draw()}
    else if(b.dataset.hc){dd.c=b.dataset.hc;draw()}
    else if(b.dataset.hd){var hh=hbFind(dd.id);if(hh){if(!hh.d)hh.d={};if(hh.d[b.dataset.hd])delete hh.d[b.dataset.hd];else hh.d[b.dataset.hd]=1;persist();draw();if(ui.tab==='lists')render()}}
    else if(b.dataset.hb==='del'){
      askConfirm({title:(__("حذف عادت «"))+dd.n+'»',msg:(__("سابقه‌ی این عادت هم پاک می‌شود.")),btns:[{t:(__("حذف")),cls:'bad',fn:function(){state.profile.habits=hbs().filter(function(x){return x.id!==dd.id});close();mutate()}}]});
    }
  });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var n=form.querySelector('#hbName').value.trim().replace(/[<>&"']/g,'');
    if(!n){var el=form.querySelector('#hbName');el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');el.focus();return}
    if(dd.id){var hh=hbFind(dd.id);if(hh){hh.n=n;hh.i=dd.i;hh.c=dd.c}}
    else hbs().push({id:uid(),n:n,i:dd.i,c:dd.c,ts:Date.now(),d:{}});
    close();mutate();
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open');if(!h)setTimeout(function(){var el=form.querySelector('#hbName');if(el)el.focus({preventScroll:true})},300)})});
}
actions.newCat=function(){openCatEd(null)};
actions.editCat=function(d){openCatEd(d.cat)};

/* ===== v2: stats, rings, focus timer, welcome ===== */
function dayN(k){var h=state.hist&&state.hist[k];return h?h.n||0:0}
function dayF(k){var h=state.hist&&state.hist[k];return h?h.f||0:0}
function streaks(){
  var td=todayKey(),cur=0,k=dayN(td)>0?td:addDays(td,-1);
  while(dayN(k)>0&&cur<5000){cur++;k=addDays(k,-1)}
  var keys=Object.keys(state.hist).filter(function(x){return state.hist[x].n>0}).sort(),best=0,run=0,prev=null;
  keys.forEach(function(x){run=(prev&&addDays(prev,1)===x)?run+1:1;if(run>best)best=run;prev=x});
  return {cur:cur,best:Math.max(best,cur)};
}
function ringsSVG(vals){
  var R=[78,57,36],h=("<svg viewBox=\"0 0 200 200\" role=\"img\" aria-label=\""+__("حلقه‌های فعالیت امروز")+"\">");
  vals.forEach(function(v,i){
    var r=R[i],C=2*Math.PI*r,p=Math.max(0,Math.min(1,v[0])),len=p*C;
    h+='<circle class="rt" cx="100" cy="100" r="'+r+'" stroke="'+v[1]+'" stroke-opacity=".22"/>';
    if(p>0)h+='<circle class="rg" cx="100" cy="100" r="'+r+'" stroke="'+v[1]+'" stroke-dasharray="'+Math.max(len,.01).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 100 100)"/>';
  });
  return h+'</svg>';
}
function focusCard(){
  var f=dayF(todayKey());
  return '<button type="button" class="fcard glass" data-act="openFocus"><span class="ib">'+icon('timer')+("</span><div><h3>"+__("حالت تمرکز")+"</h3><p>")+(f?fa(f)+(" "+__("دقیقه تمرکز امروز")):(__("تایمر شیشه‌ای برای کار بدون حواس‌پرتی")))+("</p></div><span class=\"fgo\">"+__("شروع")+"</span></button>");
}
function chartHTML(){
  var N=ui.sr==='30'?30:7,td=todayKey(),vals=[],ks=[],i,max=0,sum=0,k,v;
  for(i=0;i<N;i++){k=addDays(td,i-(N-1));v=dayN(k);ks.push(k);vals.push(v);sum+=v;if(v>max)max=v}
  var top=Math.max(4,max+(max%2)),W=340,H=176,PR=26,PL=6,PT=16,PB=24,iw=W-PR-PL,ih=H-PT-PB,bw=iw/N,barw=Math.min(26,bw*.62),yb=PT+ih,g='',b='',lb='',hit='';
  var q=function(x){return +x.toFixed(1)};
  [0,top/2,top].forEach(function(t){var y=q(yb-t/top*ih);g+='<line class="gl" x1="'+PL+'" x2="'+(W-PR)+'" y1="'+y+'" y2="'+y+'"/><text x="'+(W-PR+6)+'" y="'+(y+4)+'">'+fa(t)+'</text>'});
  var maxI=max>0?vals.indexOf(max):-1;
  for(i=0;i<N;i++){
    var cx=(W-PR)-(i+.5)*bw,h=vals[i]/top*ih,x0=q(cx-barw/2),x1=q(cx+barw/2),isT=i===N-1,r=q(Math.min(4,barw/2,h)),yt=q(yb-h);
    if(vals[i]>0)b+='<path class="'+(isT?'bar-r':'bar-t')+'" d="M'+x0+' '+yb+'V'+q(yt+r)+'Q'+x0+' '+yt+' '+q(x0+r)+' '+yt+'H'+q(x1-r)+'Q'+x1+' '+yt+' '+x1+' '+q(yt+r)+'V'+yb+'Z"/>';
    else b+='<rect class="bar-t" x="'+x0+'" y="'+(yb-2)+'" width="'+q(barw)+'" height="2" rx="1"/>';
    if(vals[i]>0&&(N===7||i===maxI||isT))lb+='<text class="bar-v" x="'+q(cx)+'" y="'+(yt-4)+'" text-anchor="middle">'+fa(vals[i])+'</text>';
    if(N===7)lb+='<text x="'+q(cx)+'" y="'+(H-6)+'" text-anchor="middle"'+(isT?' class="bar-v"':'')+'>'+WK[parse(ks[i]).getDay()]+'</text>';
    else if((N-1-i)%5===0)lb+='<text x="'+q(cx)+'" y="'+(H-6)+'" text-anchor="middle">'+F.day.format(parse(ks[i]))+'</text>';
    hit+='<rect x="'+q(cx-bw/2)+'" y="'+PT+'" width="'+q(bw)+'" height="'+ih+'" fill="transparent"><title>'+F.long.format(parse(ks[i]))+': '+(EN?__pl(vals[i],'task','tasks'):fa(vals[i])+" "+__("کار"))+"</title></rect>";
  }
  return ("<section class=\"chart glass\"><div class=\"chart-h\"><h3>"+__("کارهای انجام‌شده")+"</h3>")+segG([['7',(__("۷ روز"))],['30',(__("۳۰ روز"))]],'sr',ui.sr)+'</div>'+
    '<svg viewBox="0 0 '+W+' '+H+("\" role=\"img\" aria-label=\""+__("نمودار کارهای انجام‌شده در")+" ")+fa(N)+(" "+__("روز گذشته")+"\">")+g+b+lb+hit+'</svg>'+
    ("<p class=\"hint\">"+__("مجموع")+" ")+fa(sum)+(" "+__("کار، میانگین")+" ")+fa((sum/N).toFixed(1)).replace('.',EN?'.':'٫')+(" "+__("در روز")+"</p></section>");
}
function catBreak(){
  var l=CATS.map(function(c){var a=state.tasks.filter(function(t){return t.c===c.id});return {c:c,t:a.length,d:a.filter(function(t){return t.done}).length}}).filter(function(x){return x.t>0});
  if(!l.length)return '';
  return ("<h3 class=\"gh\"><span>"+__("پیشرفت دسته‌ها")+"</span></h3><div class=\"glass chart cb-row\">")+l.map(function(x){return '<div class="cbr" style="--cc:'+cvar(x.c.c)+'"><span>'+x.c.n+'</span><div class="bar"><i style="width:'+Math.round(x.d/x.t*100)+'%"></i></div><small>'+fa(x.d)+'/'+fa(x.t)+'</small></div>'}).join('')+'</div>';
}
function viewStats(){
  var td=todayKey(),p=state.profile,goal=p.goal||5,fg=p.fgoal||60,n=dayN(td),f=dayF(td),ws=weekStart(td),act=0,i,k,tot=0,ftot=0;
  for(i=0;i<7;i++){k=addDays(ws,i);if(dayN(k)>0||dayF(k)>0)act++}
  Object.keys(state.hist).forEach(function(x){tot+=state.hist[x].n||0;ftot+=state.hist[x].f||0});
  var s=streaks(),COL=['#ff375f','#a6e22e','#2ad4f5'];
  var leg=function(c,l,v,sf){return '<div class="rl"><i style="background:'+c+'"></i><div><small>'+l+'</small><b>'+fa(v)+' <span>'+sf+'</span></b></div></div>'};
  var tile=function(ic,g,v,l){return '<div class="sk2 glass"><span class="ib" style="background:'+g+'">'+icon(ic)+'</span><div><b>'+fa(v)+'</b><small>'+l+'</small></div></div>'};
  return head(F.month.format(new Date()),(__("آمار")))+
    '<section class="fit"><div class="fit-in"><div class="rings">'+ringsSVG([[n/goal,COL[0]],[f/fg,COL[1]],[act/5,COL[2]]])+'</div><div class="rlegend">'+
    leg(COL[0],(__("کارهای امروز")),n,(__("از")+" ")+fa(goal))+leg(COL[1],(__("تمرکز امروز")),f,(__("از")+" ")+fa(fg)+(" "+__("دقیقه")))+leg(COL[2],(__("روز فعال این هفته")),act,(__("از ۵")))+
    '</div></div></section>'+gmCard()+focusCard()+wrCard()+
    '<div class="streak">'+tile('fire','linear-gradient(145deg,#ffb340,#ff6a1a)',s.cur,(__("روز پیاپی")))+tile('star','linear-gradient(145deg,#c58bff,#7a4cf0)',s.best,(__("بهترین رکورد")))+
    tile('check','linear-gradient(145deg,#4ddc8a,#16a34a)',tot,(__("کل انجام‌شده")))+tile('timer','linear-gradient(145deg,#5ad7ff,#2f7cf6)',ftot,(__("دقیقه تمرکز")))+'</div>'+
    chartHTML()+catBreak();
}

/* ---------- weekly review ---------- */
function wrData(){
  var td=todayKey(),ws=weekStart(td),i,k,done=0,foc=0,best='',bn=-1,act=0,days=[];
  for(i=0;i<7;i++){k=addDays(ws,i);var n=dayN(k);done+=n;foc+=dayF(k);if(n>0||dayF(k)>0)act++;if(n>bn&&k<=td){bn=n;best=k}days.push({k:k,n:n,fut:k>td})}
  var pws=addDays(ws,-7),pd=0;for(i=0;i<7;i++)pd+=dayN(addDays(pws,i));
  var over=state.tasks.filter(function(t){return t.d&&t.d<td&&!t.done});
  var hs=hbs(),hp=0;if(hs.length){var c=0,tot=0;hs.forEach(function(h){for(i=0;i<7;i++){var kk=addDays(ws,i);if(kk>td)break;tot++;if(hbOn(h,kk))c++}});hp=tot?Math.round(c/tot*100):0}
  return {ws:ws,done:done,prev:pd,foc:foc,act:act,best:bn>0?best:'',bn:bn,over:over,days:days,hs:hs.length,hp:hp};
}
function wrCard(){
  var d=wrData();
  return '<button type="button" class="wrcard glass" data-act="openWr"><span class="ib" style="background:linear-gradient(145deg,#5ad7ff,#2f7cf6)">'+icon('calendar')+("</span><div><b>"+__("بازنگری هفته")+"</b><small>")+fa(d.done)+(" "+__("کار انجام شد"))+(d.over.length?' · '+fa(d.over.length)+(" "+__("کار عقب‌افتاده")):'')+'</small></div></button>';
}
var wrEl=null;
function openWr(){
  if(wrEl)return;
  var w=document.createElement('div');w.className='sheet-wrap';
  w.innerHTML=("<div class=\"dim\"></div><div class=\"sheet wr\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("بازنگری هفته")+"\"></div>");
  document.body.appendChild(w);wrEl=w;
  document.documentElement.style.overflow='hidden';
  var box=w.querySelector('.sheet');
  function draw(){
    var d=wrData(),mx=Math.max.apply(null,d.days.map(function(x){return x.n}).concat([1]));
    var diff=d.done-d.prev,cmp=d.prev?(diff>0?'📈 '+fa(diff)+(" "+__("کار بیشتر از هفته قبل")):diff<0?'📉 '+fa(-diff)+(" "+__("کار کمتر از هفته قبل")):(__("هم‌اندازه‌ی هفته قبل"))):'';
    var msg=d.done===0?(__("این هفته هنوز کاری ثبت نشده؛ از امروز شروع کن.")):d.done>=15?(__("هفته‌ی فوق‌العاده‌ای بود!")):d.done>=7?(__("هفته‌ی خوبی بود.")):(__("شروع خوبی است؛ ادامه بده."));
    var bars=d.days.map(function(x){return '<div class="hbar'+(x.fut?' fut':'')+'"><i style="height:'+Math.max(4,Math.round(x.n/mx*100))+'%"></i><small>'+WK[parse(x.k).getDay()]+'</small><b>'+fa(x.n)+'</b></div>'}).join('');
    var ov=d.over.slice(0,6).map(function(t){return '<li>'+esc(t.t)+'<small>'+F.short.format(parse(t.d))+'</small></li>'}).join('');
    box.innerHTML=("<div class=\"grab\"></div><div class=\"sheet-top\"><span></span><h2>"+__("بازنگری هفته")+"</h2><button type=\"button\" data-wr=\"close\">"+__("بستن")+"</button></div>")+
      '<p class="hint2">'+msg+(cmp?' '+cmp:'')+'</p>'+
      '<div class="hstats"><div><b>'+fa(d.done)+("</b><small>"+__("کار انجام‌شده")+"</small></div><div><b>")+fa(d.foc)+("</b><small>"+__("دقیقه تمرکز")+"</small></div><div><b>")+fa(d.act)+("</b><small>"+__("روز فعال")+"</small></div></div>")+
      '<div class="hbars wrbars">'+bars+'</div>'+
      (d.best?("<p class=\"hint2\">"+__("پربارترین روز:")+" ")+F.long.format(parse(d.best))+' ('+fa(d.bn)+(" "+__("کار)")+"</p>"):'')+
      (d.hs?("<p class=\"hint2\">"+__("عادت‌ها:")+" ")+fa(d.hp)+(__("٪ از روزهای این هفته انجام شد")+"</p>"):'')+
      ("<div class=\"sec\"><div class=\"sec-h\"><b>"+__("کارهای عقب‌افتاده ("))+fa(d.over.length)+')</b></div>'+(d.over.length?'<ul class="wrov">'+ov+(d.over.length>6?("<li>"+__("و")+" ")+fa(d.over.length-6)+(" "+__("کار دیگر…")+"</li>"):'')+'</ul><button type="button" class="bkb" data-wr="move">'+icon('refresh')+("<span>"+__("همه را به فردا ببر")+"<small>"+__("با یک ضربه، قابل بازگردانی")+"</small></span></button>"):("<p class=\"hint2\">"+__("هیچ کار عقب‌افتاده‌ای نداری 🎉")+"</p>"))+'</div>';
  }
  draw();
  function close(){if(!wrEl)return;wrEl=null;w.classList.remove('open');document.documentElement.style.overflow='';setTimeout(function(){w.remove()},350)}
  w.addEventListener('click',function(e){
    if(e.target.classList.contains('dim')){close();return}
    var b=e.target.closest('[data-wr]');if(!b)return;
    if(b.dataset.wr==='close')close();
    else if(b.dataset.wr==='move'){
      var tm=addDays(todayKey(),1),ids=state.tasks.filter(function(t){return t.d&&t.d<todayKey()&&!t.done}).map(function(t){return {id:t.id,d:t.d}});
      if(!ids.length)return;
      ids.forEach(function(x){var t=find(x.id);if(t)t.d=tm});
      mutate();close();
      toast(fa(ids.length)+(" "+__("کار به فردا منتقل شد")),(__("بازگردانی")),function(){ids.forEach(function(x){var t=find(x.id);if(t)t.d=x.d});mutate()},'ok');
    }
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
actions.openWr=openWr;

/* ---------- levels, xp, medals ---------- */
var LVT=[(__("تازه‌کار")),(__("کوشا")),(__("منظم")),(__("پرانرژی")),(__("حرفه‌ای")),(__("استاد وقت")),(__("قهرمان")),(__("افسانه")),(__("اسطوره")),(__("بی‌همتا"))];
function gmTotals(){
  var n=0,f=0,hd=0;
  Object.keys(state.hist||{}).forEach(function(k){n+=state.hist[k].n||0;f+=state.hist[k].f||0});
  hbs().forEach(function(h){hd+=hbCount(h)});
  var hb=0;hbs().forEach(function(h){var b=hbBest(h);if(b>hb)hb=b});
  var wk=0,td=todayKey(),ws=weekStart(td),i;for(i=0;i<7;i++)wk+=dayN(addDays(ws,i));
  return {n:n,f:f,hd:hd,hb:hb,wk:wk,st:streaks().best,hn:hbs().length};
}
function gmXp(g){return Math.max(0,g.n*10+g.f+g.hd*5)}
function gmLevel(xp){var L=Math.floor(Math.sqrt(xp/40))+1;return {l:L,lo:40*(L-1)*(L-1),hi:40*L*L}}
function gmTitle(l){return LVT[Math.min(LVT.length-1,Math.floor((l-1)/2))]}
var MEDALS=[
  ['m1',(__("اولین قدم")),(__("اولین کارت را انجام بده")),'check','#1fae58',function(g){return g.n>=1}],
  ['m2',(__("ده‌تایی")),(__("۱۰ کار انجام‌شده")),'star','#0a7aff',function(g){return g.n>=10}],
  ['m3',(__("صدتایی")),(__("۱۰۰ کار انجام‌شده")),'gift','#a259f2',function(g){return g.n>=100}],
  ['m4',(__("پرکار")),(__("۵۰۰ کار انجام‌شده")),'dumbbell','#f08c00',function(g){return g.n>=500}],
  ['m5',(__("سه روز پیاپی")),(__("۳ روز پشت‌سرهم کار انجام بده")),'fire','#ff6a1a',function(g){return g.st>=3}],
  ['m6',(__("هفته‌ی بی‌وقفه")),(__("۷ روز پیاپی")),'fire','#f0266a',function(g){return g.st>=7}],
  ['m7',(__("ماه طلایی")),(__("۳۰ روز پیاپی")),'star','#e0a800',function(g){return g.st>=30}],
  ['m8',(__("متمرکز")),(__("۶۰ دقیقه تمرکز")),'timer','#00a9c9',function(g){return g.f>=60}],
  ['m9',(__("ذهن عمیق")),(__("۶۰۰ دقیقه تمرکز")),'timer','#5c6bc0',function(g){return g.f>=600}],
  ['m10',(__("عادت‌ساز")),(__("عادتی بساز و ۷ روز پیاپی انجامش بده")),'leaf','#16a34a',function(g){return g.hb>=7}],
  ['m11',(__("هفته‌ی درخشان")),(__("در یک هفته ۱۵ کار انجام بده")),'spark','#ff375f',function(g){return g.wk>=15}]
];
function gmMedals(g){return MEDALS.map(function(m){return {id:m[0],n:m[1],d:m[2],i:m[3],c:m[4],ok:!!m[5](g)}})}
/* call after anything that earns progress; announces new medals / levels once */
function gmCheck(quiet){
  var p=state.profile,g=gmTotals(),lv=gmLevel(gmXp(g)),ch=false,msgs=[];
  var got=p.medals||(p.medals={});
  gmMedals(g).forEach(function(m){if(m.ok&&!got[m.id]){got[m.id]=Date.now();ch=true;msgs.push([(__("🏅 مدال «"))+m.n+'»',m.d])}});
  if((p.lvl||1)<lv.l){var old=p.lvl||1;p.lvl=lv.l;ch=true;if(old>0&&gmXp(g)>0)msgs.push([(__("⭐ سطح")+" ")+fa(lv.l),gmTitle(lv.l)])}
  else if(!p.lvl){p.lvl=lv.l}
  if(lv.l>=8&&!p.vip){p.vip=true;ch=true;msgs.push([(__("👑 VIP باز شد")),(__("با رسیدن به سطح ۸"))])}
  var bg=p.bnGot||(p.bnGot={}),nb=[];
  BNS.forEach(function(b){if(b[0]!=='auto'&&bnOpen(b)&&!bg[b[0]]){bg[b[0]]=1;nb.push(b[1]);ch=true}});
  if(nb.length)msgs.push(['🎨 '+(nb.length>1?(__("بنرهای تازه")):(__("بنر تازه")))+': '+nb.join(CMA.trim()+' '),(__("از «ویرایش مشخصات» انتخابش کن"))]);
  if(ch){persist();if(!quiet)msgs.forEach(function(x,i){setTimeout(function(){toast(x[0]+' — '+x[1],null,null,'vip')},i*900)})}
  return ch;
}
function gmCard(){
  var g=gmTotals(),xp=gmXp(g),lv=gmLevel(xp),pc=Math.round((xp-lv.lo)/(lv.hi-lv.lo)*100),ms=gmMedals(g),n=ms.filter(function(m){return m.ok}).length;
  return '<button type="button" class="gmcard glass" data-act="openGm"><div class="gmlv"><b>'+fa(lv.l)+("</b><small>"+__("سطح")+"</small></div><div class=\"gmbody\"><div class=\"gmt\"><b>")+gmTitle(lv.l)+'</b><span>'+fa(xp)+(" "+__("امتیاز")+"</span></div><div class=\"vipbar\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"")+pc+'"><i style="width:'+pc+'%"></i></div><small>'+fa(lv.hi-xp)+(" "+__("امتیاز تا سطح")+" ")+fa(lv.l+1)+' · '+fa(n)+(" "+__("از")+" ")+fa(ms.length)+(" "+__("مدال")+"</small></div></button>");
}
var gmEl=null;
function openGm(){
  if(gmEl)return;
  var w=document.createElement('div');w.className='sheet-wrap';
  var g=gmTotals(),xp=gmXp(g),lv=gmLevel(xp),ms=gmMedals(g),got=state.profile.medals||{};
  w.innerHTML=("<div class=\"dim\"></div><div class=\"sheet\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("سطح و مدال‌ها")+"\"><div class=\"grab\"></div><div class=\"sheet-top\"><span></span><h2>"+__("سطح و مدال‌ها")+"</h2><button type=\"button\" data-gm=\"close\">"+__("بستن")+"</button></div>")+
    '<div class="gmbig"><div class="gmlv big"><b>'+fa(lv.l)+'</b><small>'+gmTitle(lv.l)+("</small></div><p class=\"hint2\">"+__("هر کار انجام‌شده ۱۰ امتیاز، هر دقیقه تمرکز ۱ امتیاز و هر عادت روزانه ۵ امتیاز می‌دهد. با رسیدن به سطح ۸، عکس‌های VIP هم باز می‌شود"))+(state.profile.vip?(" "+__("(باز شده ✓)")):'')+(__(". هر چند سطح هم یک بنر تازه برای پروفایل باز می‌کند.")+"</p></div>")+
    '<div class="medals">'+ms.map(function(m){return '<div class="medal'+(m.ok?' on':'')+'" style="--cc:'+m.c+'" aria-label="'+m.n+(m.ok?(" "+__("(باز شده)")):(" "+__("(قفل)")))+'"><i>'+icon(m.ok?m.i:'lock')+'</i><b>'+m.n+'</b><small>'+m.d+'</small></div>'}).join('')+'</div>'+
    ("<h3 class=\"gh\"><span>"+__("بنرهای پروفایل")+"</span></h3><div class=\"bngrid\">")+BNS.map(function(b){return bnTile(b,bnId(),false)}).join('')+'</div></div>';
  document.body.appendChild(w);gmEl=w;document.documentElement.style.overflow='hidden';
  function close(){if(!gmEl)return;gmEl=null;w.classList.remove('open');document.documentElement.style.overflow='';setTimeout(function(){w.remove()},350)}
  w.addEventListener('click',function(e){if(e.target.classList.contains('dim')||e.target.closest('[data-gm=close]'))close()});
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
actions.openGm=openGm;
actions.sr=function(d){ui.sr=d.v;render('swap')};
function checkVip(){
  if(state.profile.vip)return false;
  if(streaks().best<VIPDAYS)return false;
  state.profile.vip=true;return true;
}

/* ---------- focus timer ---------- */
var fo={dur:1500,left:1500,run:false,end:0,seg:0,acc:0,task:'',done:false},FW=$('#focus'),foCloseT=null;
function foFmt(s){return fa(pad(Math.floor(s/60))+':'+pad(s%60))}
function foStarted(){return fo.left<fo.dur||fo.run}
function foDraw(){
  var C=628.3,prog=fo.dur?(fo.dur-fo.left)/fo.dur:0,tk=fo.task?find(fo.task):null;
  $('#foPr').style.strokeDashoffset=(C*(1-prog)).toFixed(1);
  $('#foTime').textContent=foFmt(fo.left);
  $('#foSt').textContent=fo.done?(__("تمام شد")):fo.run?(__("در حال تمرکز")):foStarted()?(__("متوقف")):(__("آماده"));
  $('#foRing').classList.toggle('done',fo.done);
  $('#foGo').textContent=fo.done?(__("دوباره")):fo.run?(__("توقف")):foStarted()?(__("ادامه")):(__("شروع"));
  $('#foFin').hidden=!(fo.done&&tk&&!tk.done);
  $('#fpill').hidden=FW.hidden?!(foStarted()&&!fo.done):true;
  $('#fpillT').textContent=foFmt(fo.left);
}
function foDrawDur(){
  var dis=foStarted()?' disabled':'';
  $('#foDur').innerHTML=[15,25,45,60].map(function(m){return '<button type="button" class="chip" data-m="'+m+'" aria-pressed="'+(fo.dur===m*60)+'"'+dis+'>'+fa(m)+(" "+__("دقیقه")+"</button>")}).join('')+
    '<button type="button" class="chip" data-s="-5"'+dis+(" aria-label=\""+__("پنج دقیقه کمتر")+"\">"+(EN?"−5":"−۵")+"</button><button type=\"button\" class=\"chip\" data-s=\"5\"")+dis+(" aria-label=\""+__("پنج دقیقه بیشتر")+"\">"+(EN?"+5":"+۵")+"</button>");
}
function foDrawTasks(){
  var td=todayKey(),l=state.tasks.filter(function(t){return !t.done}).sort(function(a,b){return ((a.d===td?0:1)-(b.d===td?0:1))||byTime(a,b)}).slice(0,6);
  $('#foTasks').innerHTML='<button type="button" class="chip" data-t="" aria-pressed="'+(!fo.task)+("\">"+__("بدون کار")+"</button>")+
    l.map(function(t){return '<button type="button" class="chip" data-t="'+t.id+'" style="--cc:'+cvar(t.col||cat(t.c).c)+'" aria-pressed="'+(fo.task===t.id)+'"><i></i><span>'+esc(t.t)+'</span></button>'}).join('');
  var tk=fo.task?find(fo.task):null;
  $('#foTaskLbl').textContent=tk?tk.t:(__("یک کار را انتخاب کن یا بدون کار شروع کن"));
}
function openFocus(){
  foDrawDur();foDrawTasks();
  clearTimeout(foCloseT);FW.hidden=false;foDraw();
  requestAnimationFrame(function(){requestAnimationFrame(function(){FW.classList.add('open')})});
}
function closeFocus(){
  FW.classList.remove('open');clearTimeout(foCloseT);
  foCloseT=setTimeout(function(){FW.hidden=true;foDraw()},320);
}
/* status-bar timer: live countdown notification (native) + a scheduled "finished" alert, so it works with the screen off */
var FN=null;
try{var CAP3=window.Capacitor;if(CAP3&&CAP3.isNativePlatform&&CAP3.isNativePlatform())FN=(CAP3.Plugins&&CAP3.Plugins.FocusNotify)||(CAP3.registerPlugin&&CAP3.registerPlugin('FocusNotify'))||null}catch(e){FN=null}
function foNotif(){
  if(!FN&&!NL&&!AN)return;
  try{
    var tk=fo.task?find(fo.task):null,txt=tk?tk.t:(__("بدون حواس‌پرتی کار کن")),mins=Math.round(fo.dur/60);
    if(fo.run){
      if(FN&&nsCfg().focus)FN.show({run:true,end:fo.end,left:fo.left,title:(__("🎯 در حال تمرکز")),text:txt,sub:(__("تمرکز")+" ")+fa(mins)+(" "+__("دقیقه‌ای")),leftText:foFmt(fo.left)}).catch(function(){});
      if(state.profile.notif){
        var fi=Object.assign({id:FO_NID,title:(__("🎉 تمرکز تمام شد")),body:fa(mins)+(" "+__("دقیقه تمرکز ثبت شد"))+(tk?' · '+tk.t:''),largeBody:fa(mins)+(" "+__("دقیقه تمرکز عمیق را تمام کردی. آفرین!"))+(tk?'\n\n🎯 '+tk.t:'')+("\n\n"+__("یک استراحت کوتاه بخور.")),schedule:{at:new Date(fo.end),allowWhileIdle:true},channelId:'focus',smallIcon:'ic_stat_barnameyar',extra:{kind:'fo'}},nsLook('focus'));
        if(nsCustom())AN.add({items:[nsToAN(fi)]}).catch(function(){});
        else if(NL)NL.schedule({notifications:[fi]}).catch(function(){});
      }
    }else{
      if(NL)NL.cancel({notifications:[{id:FO_NID}]}).catch(function(){});
      if(AN)AN.cancel({ids:[FO_NID]}).catch(function(){});
      if(FN){
        if(foStarted()&&!fo.done&&nsCfg().focus)FN.show({run:false,left:fo.left,title:(__("⏸ تمرکز متوقف شد")),text:txt,sub:(__("تمرکز")+" ")+fa(mins)+(" "+__("دقیقه‌ای")),leftText:foFmt(fo.left)}).catch(function(){});
        else FN.clear().catch(function(){});
      }
    }
  }catch(e){}
}
function foBank(){
  var m=Math.floor(fo.acc/60);fo.acc=0;
  if(m>0){hBump(todayKey(),'f',m);persist();if(ui.tab==='stats'||ui.tab==='today')render()}
}
function foGo(){
  if(fo.done){fo.done=false;fo.left=fo.dur;fo.acc=0}
  if(fo.run){
    fo.acc+=Math.round((Date.now()-fo.seg)/1000);
    fo.left=Math.max(0,Math.round((fo.end-Date.now())/1000));fo.run=false;
  }else{
    if(fo.left<=0)fo.left=fo.dur;
    fo.run=true;fo.seg=Date.now();fo.end=fo.seg+fo.left*1000;
  }
  foDrawDur();foDraw();foNotif();
}
function foReset(){
  if(fo.run){fo.acc+=Math.round((Date.now()-fo.seg)/1000);fo.run=false}
  foBank();
  fo.left=fo.dur;fo.done=false;foDrawDur();foDraw();foNotif();
}
function foTick(){
  if(!fo.run)return;
  fo.left=Math.max(0,Math.round((fo.end-Date.now())/1000));
  if(fo.left<=0){
    fo.run=false;fo.done=true;fo.acc+=Math.round((Date.now()-fo.seg)/1000);
    foBank();
    beep(true);try{if(navigator.vibrate)navigator.vibrate([200,80,200])}catch(e){}
    toast((__("تمرکز تمام شد؛")+" ")+fa(Math.round(fo.dur/60))+(" "+__("دقیقه ثبت شد")),null,null,'focus');
    setTimeout(gmCheck,1200);
    if(!FW.hidden)burst($('#foRing'));
    foDrawDur();foNotif();
  }
  foDraw();
}
$('#foGo').addEventListener('click',foGo);
$('#foReset').addEventListener('click',foReset);
$('#foClose').addEventListener('click',closeFocus);
$('#foDim').addEventListener('click',closeFocus);
$('#fpill').addEventListener('click',openFocus);
$('#foDur').addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.m)fo.dur=Number(b.dataset.m)*60;
  else if(b.dataset.s)fo.dur=Math.max(300,Math.min(7200,fo.dur+Number(b.dataset.s)*60));
  else return;
  fo.left=fo.dur;fo.done=false;foDrawDur();foDraw();
});
$('#foTasks').addEventListener('click',function(e){var b=e.target.closest('[data-t]');if(!b)return;fo.task=b.dataset.t;foDrawTasks();foDraw()});
$('#foFin').addEventListener('click',function(){if(fo.task)toggle(fo.task);foDrawTasks();foDraw()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!FW.hidden){e.preventDefault();closeFocus()}});
actions.openFocus=openFocus;


/* ---------- notification look sheet (theme, banner background, what to show) ---------- */
var NS_THEMES=[['sys',(__("پیش‌فرض سیستم"))],['light',(__("روشن"))],['dark',(__("تیره"))],['banner',(__("بنر پروفایل"))]];
var NS_TOG=[['time','clock',(__("ساعت کار")),(__("مثلاً «۱۶:۰۰ تا ۱۸:۰۰» در اعلان"))],['cat','lists',(__("نام دسته")),(__("مثلاً مطالعه یا کار"))],['pri','flag',(__("اولویت")),(__("نشان «مهم» و «فوری»"))],['list','all',(__("فهرست کارها")),(__("زیر خلاصه‌ی صبح و عصر"))],['name','user',(__("نام من")),(__("کنار «صبح بخیر»"))],['focus','timer',(__("تایمر زنده‌ی تمرکز")),(__("شمارش معکوس در نوار اعلان"))]];
function nsThemeName(){var t=NS_THEMES.filter(function(x){return x[0]===nsCfg().th})[0];return t?t[1]:''}
function nsPrevHTML(c){
  var meta=[c.time?'🕒 '+fa('16:00')+(" "+__("تا")+" ")+fa('18:00'):'',c.cat?(__("🏷 مطالعه")):'',c.pri?(__("🔥 فوری")):''].filter(Boolean).join('  ·  ')||(__("یادآوری"));
  var st=c.th==='banner'?' style="background:linear-gradient(90deg,rgba(8,12,28,.42),rgba(8,12,28,.68)),url(img/'+nsBannerFile()+'.webp) center/cover"':'';
  function card(inner,col,cls){return '<div class="nsp nsp-'+c.th+(cls?' '+cls:'')+'"'+st+'><i class="nsb" style="background:'+col+'"></i>'+inner+'</div>'}
  var h=card(("<div class=\"nsp-t\"><b>"+__("⏰ تست ریاضی فصل ۳")+"</b><span>")+esc(meta)+'</span></div>','#3D63F0');
  h+=card(("<div class=\"nsp-t\"><b>"+__("☀️ صبح بخیر"))+(c.name?' '+esc(displayName()):'')+'</b><span>'+fa(3)+(" "+__("کار داری")+"</span>")+(c.list?'<span>• '+fa('16:00')+("  "+__("تست ریاضی فصل ۳")+"</span><span>• ")+fa('18:30')+("  "+__("ورزش")+"</span>"):'')+'</div>','#F59E0B');
  if(c.focus)h+=card(("<div class=\"nsp-t\"><b>"+__("🎯 در حال تمرکز")+"</b><span>"+__("تست ریاضی فصل ۳")+"</span></div><em class=\"nsp-tm\">")+fa('24:59')+'</em>','#FF375F');
  return '<div class="nsp-w">'+h+'</div>';
}
function nsTest(){
  if(!AN&&!NL){toast((__("اعلان آزمایشی فقط روی برنامه‌ی اندروید کار می‌کند")),null,null,'info');return}
  if(!state.profile.notif){toast((__("اول «اعلان سیستم» را در تنظیمات سریع روشن کن")),null,null,'warn');return}
  var c=nsCfg(),meta=[c.time?'🕒 '+fa('16:00')+(" "+__("تا")+" ")+fa('18:00'):'',c.cat?(__("🏷 مطالعه")):'',c.pri?(__("🔥 فوری")):''].filter(Boolean),
      n=Object.assign({id:2100000950,title:(__("⏰ اعلان آزمایشی Ario")),body:meta.join('  ·  ')||(__("یادآوری")),schedule:{at:new Date(Date.now()+3000),allowWhileIdle:true},channelId:'reminders',smallIcon:'ic_stat_barnameyar',extra:{}},nsLook('rem',(__("ظاهر اعلان‌ها همین‌طور است.")+"\n\n")+meta.join('   ')));
  try{
    if(nsCustom())AN.add({items:[nsToAN(n)]}).catch(function(){});
    else if(NL)NL.schedule({notifications:[n]}).catch(function(){});
    toast((__("تا چند ثانیه‌ی دیگر اعلان می‌آید؛ نوار اعلان را پایین بکش")),null,null,'ok');
  }catch(e){toast((__("ارسال اعلان آزمایشی انجام نشد")),null,null,'warn')}
}
function openNsStyle(){
  var sw=ttSheetWrap(("<div class=\"sheet-top\"><span></span><h2>"+__("ظاهر اعلان‌ها")+"</h2><button type=\"button\" data-e=\"close\">"+__("بستن")+"</button></div><div class=\"ns-body\"></div>"),(__("ظاهر اعلان‌ها")));
  var w=sw.w,body=w.querySelector('.ns-body');
  function paint(){
    var c=nsCfg(),native=!!AN;
    var themes='<div class="chips">'+NS_THEMES.map(function(t){return '<button type="button" class="chip" data-nth="'+t[0]+'" aria-pressed="'+(c.th===t[0])+'">'+t[1]+'</button>'}).join('')+'</div>';
    var bns='';
    if(c.th==='banner'){
      var cur=c.bn&&bnFind(c.bn)&&bnOpen(bnFind(c.bn))?c.bn:'';
      bns=("<div class=\"sec\"><div class=\"sec-h\"><b>"+__("بنر پس‌زمینه")+"</b></div><div class=\"ns-bns\">")+
        '<button type="button" class="bno" data-nbn="" aria-pressed="'+(cur==='')+'"><span class="bnp bn-'+bnId()+("\"></span><b>"+__("مثل پروفایل")+"</b><small>"+__("خودکار")+"</small></button>")+
        BNS.filter(bnOpen).map(function(b){return '<button type="button" class="bno" data-nbn="'+b[0]+'" aria-pressed="'+(cur===b[0])+'"><span class="bnp bn-'+b[0]+'"></span><b>'+b[1]+("</b><small>"+__("باز شده")+"</small></button>")}).join('')+'</div>'+
        ("<p class=\"hint\">"+__("بنرهایی که هنوز باز نکرده‌ای اینجا نیستند؛ با بالا رفتن سطح یا VIP باز می‌شوند.")+"</p></div>");
    }
    var tg='<div class="qsheet">'+NS_TOG.map(function(it){
      return '<button type="button" class="qrow" role="switch" aria-checked="'+!!c[it[0]]+'" data-ntg="'+it[0]+'"><span class="h3d">'+icon(it[1])+'</span><span class="qt"><b>'+it[2]+'</b><small>'+it[3]+'</small></span><span class="sw"></span></button>';
    }).join('')+'</div>';
    body.innerHTML=nsPrevHTML(c)+
      (native?'':("<p class=\"hint\">"+__("این تنظیمات روی برنامه‌ی اندروید در نوار اعلان گوشی اعمال می‌شود؛ اینجا فقط پیش‌نمایش است.")+"</p>"))+
      ("<div class=\"sec\"><div class=\"sec-h\"><b>"+__("تم اعلان")+"</b></div>")+themes+
      (c.th==='sys'?("<p class=\"hint\">"+__("ظاهر معمولی اندروید؛ فقط متن‌ها و رنگ آیکن زیباتر شده است.")+"</p>"):'')+'</div>'+bns+
      ("<div class=\"sec\"><div class=\"sec-h\"><b>"+__("چه چیزی در اعلان باشد")+"</b></div>")+tg+'</div>'+
      '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="test">'+icon('bell')+(__("اعلان آزمایشی")+"</button><button type=\"button\" class=\"tt-btn\" data-e=\"close\">"+__("بستن")+"</button></div>");
  }
  paint();
  function done(){if(ui.tab==='account')render()}
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e],[data-nth],[data-nbn],[data-ntg]');if(!b)return;
    if(b.dataset.e==='close'){sw.close();done();return}
    if(b.dataset.e==='test'){nsTest();return}
    var c=nsCfg();
    if(b.dataset.nth!=null)c.th=b.dataset.nth;
    else if(b.dataset.nbn!=null)c.bn=b.dataset.nbn;
    else if(b.dataset.ntg)c[b.dataset.ntg]=!c[b.dataset.ntg];
    state.profile.ns=c;writeCache();persist();
    paint();
    nsPushStyle().then(function(){nativeSync(true)});
    if(!c.focus&&FN)FN.clear().catch(function(){});
  });
  w.querySelector('.dim').addEventListener('click',done);
}
actions.openNsStyle=openNsStyle;

/* ---------- account extras ---------- */
function hmCycle(key,opts){var i=opts.indexOf(state.profile[key]||'');state.profile[key]=opts[(i+1)%opts.length];mutate();nativeSync(true)}
actions.cycleMsum=function(){hmCycle('msum',['','07:00','08:00','09:00'])};
actions.cycleMev=function(){hmCycle('mev',['','18:00','20:00','21:30'])};
actions.cycleGoal=function(){var a=[3,5,8,10],i=a.indexOf(state.profile.goal||5);state.profile.goal=a[(i+1)%a.length];mutate()};
actions.cycleFGoal=function(){var a=[30,60,90,120],i=a.indexOf(state.profile.fgoal||60);state.profile.fgoal=a[(i+1)%a.length];mutate()};

/* ---------- welcome / sign-in (display only, data stays on this device) ---------- */
var wl={el:$('#wl'),i:0,goal:5,via:'name'};
var VIA={google:[(__("ادامه با گوگل")),(__("ورود واقعی با گوگل هنوز فعال نیست. فقط نام و ایمیلت روی همین دستگاه ذخیره می‌شود."))],email:[(__("ادامه با ایمیل")),(__("ایمیلت فقط روی همین دستگاه ذخیره می‌شود. رمز یا ایمیل تأیید در کار نیست."))],name:[(__("ادامه با نام")),(__("فقط نامت روی همین دستگاه ذخیره می‌شود."))]};
function okEmail(x){return /^[^\s@]{1,60}@[^\s@]{1,40}\.[^\s@]{2,20}$/.test(String(x||'').trim())}
function wMail(){return wl.via!=='name'}
function wDraw(){
  wl.el.querySelectorAll('.wp').forEach(function(p,i){p.classList.toggle('on',i===wl.i)});
  wl.el.querySelectorAll('#wDots i').forEach(function(d,i){d.classList.toggle('on',i===wl.i)});
  $('#wNav').hidden=wl.i===0;
  $('#wBack').hidden=!wl.i;
  $('#wBack').parentNode.style.gridTemplateColumns=wl.i?'':'1fr';
  $('#wNext').textContent=wl.i===3?(__("شروع کن")):(__("بعدی"));
  $('#wHead').textContent=VIA[wl.via][0];
  $('#wNote').textContent=VIA[wl.via][1];
  $('#wEmail').hidden=!wMail();
  wCheck();
  $('#wGoal').innerHTML=[3,5,8,10].map(function(n){return '<button type="button" class="chip" data-g="'+n+'" aria-pressed="'+(wl.goal===n)+'">'+fa(n)+(" "+__("کار")+"</button>")}).join('');
}
function openWelcome(){
  var p=state.profile;
  wl.via=VIA[p.via]?p.via:'name';wl.goal=p.goal||5;
  $('#wName').value=p.name||'';$('#wEmail').value=p.email||'';
  wl.i=String(p.name||'').trim()?2:0;
  wDraw();wl.el.hidden=false;document.documentElement.style.overflow='hidden';
}
function closeWelcome(){wl.el.hidden=true;document.documentElement.style.overflow=''}
function wFinish(skip){
  var n=$('#wName').value.trim().slice(0,40),em=$('#wEmail').value.trim();
  if(!skip){
    if(n)state.profile.name=n;
    state.profile.via=wl.via;
    state.profile.email=wMail()&&okEmail(em)?em:'';
    state.profile.goal=wl.goal;
  }
  state.profile.welcomed=true;
  closeWelcome();mutate();
  if(!skip&&n)notify('info',(__("خوش آمدی")),(__("سلام")+" ")+n+(__("، Ario آماده است")));
}
function wCheck(){$('#wNext').disabled=wl.i===1&&(!$('#wName').value.trim()||(wMail()&&!okEmail($('#wEmail').value)))}
function wShake(el){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');el.focus()}
function wNext(){
  if(wl.i<=1){
    if(wl.i===0){return}
    var nm=$('#wName'),em=$('#wEmail');
    if(!nm.value.trim()){wShake(nm);return}
    if(wMail()&&!okEmail(em.value)){wShake(em);return}
  }
  if(wl.i<3){wl.i++;wDraw()}else wFinish(false)
}
function maybeWelcome(){if(String(state.profile.name||'').trim()||!wl.el.hidden)return;openWelcome()}
$('#wNext').addEventListener('click',wNext);
$('#wBack').addEventListener('click',function(){if(wl.i>0){wl.i--;wDraw()}});
$('#wName').addEventListener('input',wCheck);
$('#wEmail').addEventListener('input',wCheck);
$('#wGoal').addEventListener('click',function(e){var b=e.target.closest('[data-g]');if(!b)return;wl.goal=Number(b.dataset.g);wDraw()});
wl.el.addEventListener('click',function(e){
  var b=e.target.closest('[data-via]');if(!b)return;
  wl.via=VIA[b.dataset.via]?b.dataset.via:'name';wl.i=1;wDraw();
  setTimeout(function(){$('#wName').focus({preventScroll:true})},120);
});
['#wName','#wEmail'].forEach(function(q){$(q).addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();wNext()}})});
actions.showWelcome=function(){openWelcome()};

/* ---------- app info ---------- */
var aiEl=null;
function appDateText(){try{return mk({year:'numeric',month:'long',day:'numeric'}).format(parse(APP.date))}catch(e){return APP.date}}
function openAppInfo(){
  if(aiEl)return;
  var w=document.createElement('div');w.className='sheet-wrap tt-top';
  var r=function(ic,l,v){return '<div class="ai-row"><span class="mi">'+icon(ic)+'</span><span class="ml">'+l+'</span><span class="mv">'+v+'</span></div>'};
  w.innerHTML=("<div class=\"dim\"></div><div class=\"sheet\" role=\"dialog\" aria-modal=\"true\" aria-label=\""+__("اطلاعات برنامه")+"\"><div class=\"grab\"></div>")+
    ("<div class=\"sheet-top\"><span></span><h2>"+__("اطلاعات برنامه")+"</h2><button type=\"button\" data-ai=\"close\">"+__("بستن")+"</button></div>")+
    ("<div class=\"ai-logo\"><svg viewBox=\"0 0 1024 1024\" aria-hidden=\"true\"><defs><linearGradient id=\"aig\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#6e8aff\"/><stop offset=\"1\" stop-color=\"#4658e8\"/></linearGradient></defs><rect width=\"1024\" height=\"1024\" fill=\"url(#aig)\"/><circle cx=\"512\" cy=\"512\" r=\"240\" fill=\"none\" stroke=\"#fff\" stroke-width=\"54\"/><path d=\"M394 522l86 91 165-187\" fill=\"none\" stroke=\"#fff\" stroke-width=\"52\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><b>Ario</b><small>"+__("برنامه‌ریز روزانه فارسی")+"</small></div>")+
    r('info',(__("نسخه برنامه")),'<bdi>'+fa(APP.ver)+'</bdi>')+
    r('calendar',(__("تاریخ بروزرسانی")),appDateText())+
    r('user',(__("سازنده برنامه")),esc(APP.author))+
    '</div>';
  document.body.appendChild(w);aiEl=w;
  document.documentElement.style.overflow='hidden';
  function close(){if(!aiEl)return;aiEl=null;w.classList.remove('open');if(!ttEl)document.documentElement.style.overflow='';setTimeout(function(){w.remove()},350)}
  w.addEventListener('click',function(e){if(e.target.classList.contains('dim')||e.target.closest('[data-ai="close"]'))close()});
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
actions.openAppInfo=openAppInfo;

/* ---------- weekly timetable (days down the side, parts 1-7 across) ---------- */
var TT_DAYS=['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنج‌شنبه','جمعه'];
var TT_COL=['#ffc9c9','#ffd8a8','#fff3a3','#c0f0c8','#b3ecf0','#b8d4ff','#dcc6ff','#ffc6e2','#e3e6ee','#e8d5b5'];
var TT_SUB=[['ریاضی',5,'calc'],['فیزیک',6,'atom'],['شیمی',4,'flask'],['زیست',3,'dna'],['زمین‌شناسی',9,'mountain'],['ادبیات',7,'pen'],['عربی',1,'translate'],['دین و زندگی',2,'mosque'],['زبان',0,'globe'],['آزمون',0,'test'],['مرور',8,'refresh'],['استراحت',8,'coffee']];
var TT_TC=['#e03131','#e8590c','#d9a000','#2f9e44','#0c8599','#1971c2','#7048e8','#c2255c','#343a40'];
var TT_ICONS=ICONS.concat(['clock','check','flag','edit','fire','sun','timer','spark','user','mic','bell','stats','lists','calc','atom','flask','dna','mountain','pen','translate','mosque','test']).filter(function(n,i,a){return a.indexOf(n)===i});
function ttIc(n){return typeof n==='string'&&TT_ICONS.indexOf(n)>-1?n:''}
function ttIco(n,c){n=ttIc(n);return n?icon(n,c||'tti'):''}
function ttPick(){return '<div class="sec"><div class="sec-h"><b>آیکون</b></div><div class="icons tt-ics"><button type="button" class="icb" data-e="ic" data-n="" style="--cc:var(--accent)" aria-label="بدون آیکون">'+icon('close')+'</button>'+TT_ICONS.map(function(n){return '<button type="button" class="icb" data-e="ic" data-n="'+n+'" style="--cc:var(--accent)" aria-label="آیکون">'+icon(n)+'</button>'}).join('')+'</div></div>'}
function ttPickPaint(w,cur){[].forEach.call(w.querySelectorAll('[data-e="ic"]'),function(b){b.setAttribute('aria-pressed',String(b.dataset.n===cur))})}
var TT_INFO_LB=['عکس','نام و نام خانوادگی دانش‌آموز','تماس هفتگی دانش‌آموز','تاریخ شروع برنامه','تاریخ پایان برنامه','',''];
var TT_MIN=5,TT_MAX=12,TT_PARTS=7,TT_TIMES=['۸ تا ۱۰','۱۰ تا ۱۲','۱۲ تا ۱۴','۱۴ تا ۱۶','۱۶ تا ۱۸','۱۸ تا ۲۰','۲۰ تا ۲۲'],ttEl=null;
function ttDef(){
  return {title:'برنامه کنکوریا',rows:TT_TIMES.map(function(l){return {id:uid(),l:l}}),cells:{}};
}
/* t.rows are the 7 "parts" (columns); each keeps the default time shown under its header */
function ttDefTime(i){if(TT_TIMES[i])return TT_TIMES[i];var a=(8+2*i)%24;return fa(a)+' تا '+fa(a+2)}
/* more / fewer parts: removed parts are kept aside (with their cells) and come back when the number goes up again */
function ttSetParts(n){
  var t=ttGet();n=Math.max(TT_MIN,Math.min(TT_MAX,Math.round(Number(n))||TT_PARTS));
  while(t.rows.length>n)t.hid.push(t.rows.pop());
  while(t.rows.length<n)t.rows.push(t.hid.pop()||{id:uid(),l:ttDefTime(t.rows.length),k:-1,ic:''});
  persist();ttRedraw();return n;
}
function ttPartsSheet(){
  var t=ttGet(),sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>تعداد پارت‌ها</h2><button type="button" data-e="close">بستن</button></div>'+
    '<div class="tt-stp"><button type="button" data-e="plus" aria-label="یک پارت بیشتر">+</button><b id="ttPn" aria-live="polite"></b><button type="button" data-e="minus" aria-label="یک پارت کمتر">−</button></div>'+
    '<p class="hint tt-hint">از '+fa(TT_MIN)+' تا '+fa(TT_MAX)+' پارت. کم‌کردن پارت‌ها نوشته‌هایشان را پاک نمی‌کند؛ اگر دوباره اضافه‌شان کنی برمی‌گردند.</p>'+
    '<div class="tt-eb"><button type="button" class="tt-btn pri full" data-e="close">تمام</button></div>','تعداد پارت‌ها');
  var w=sw.w;
  function paint(){var n=ttGet().rows.length;w.querySelector('#ttPn').textContent=fa(n);w.querySelector('[data-e="plus"]').disabled=n>=TT_MAX;w.querySelector('[data-e="minus"]').disabled=n<=TT_MIN}
  paint();
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e]');if(!b)return;var a=b.dataset.e;
    if(a==='close')sw.close();
    else if(a==='plus'){ttSetParts(ttGet().rows.length+1);paint()}
    else if(a==='minus'){ttSetParts(ttGet().rows.length-1);paint()}
  });
}
function ttGet(){
  var p=state.profile,t=p.tt;
  if(!t||typeof t!=='object'||!Array.isArray(t.rows))t=p.tt=ttDef();
  if(!t.cells||typeof t.cells!=='object')t.cells={};
  if(typeof t.title!=='string')t.title='برنامه کنکوریا';
  if(!t.info||typeof t.info!=='object')t.info={};
  if(typeof t.ws!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(t.ws))t.ws='';
  if(!Array.isArray(t.dtx))t.dtx=[];
  for(var z=0;z<7;z++)t.dtx[z]=typeof t.dtx[z]==='string'?t.dtx[z].slice(0,14):'';
  t.rows=t.rows.filter(function(r){return r&&typeof r.id==='string'}).slice(0,TT_MAX);
  t.hid=Array.isArray(t.hid)?t.hid.filter(function(r){return r&&typeof r.id==='string'}).slice(0,TT_MAX):[];
  t.hid.forEach(function(r){r.l=typeof r.l==='string'?r.l.slice(0,14):'—';r.ic=ttIc(r.ic);if(!(typeof r.k==='number'&&r.k>=0&&r.k<TT_TC.length))r.k=-1});
  if(!Array.isArray(t.dic))t.dic=[];
  for(var q=0;q<7;q++)t.dic[q]=ttIc(t.dic[q]);
  if(!Array.isArray(t.cic))t.cic=[];
  t.cic[0]=ttIc(t.cic[0]);t.cic[1]=ttIc(t.cic[1]);
  t.rows.forEach(function(r){r.ic=ttIc(r.ic)});
  t.rows.forEach(function(r){if(!(typeof r.k==='number'&&r.k>=0&&r.k<TT_TC.length))r.k=-1});
  while(t.rows.length<TT_MIN)t.rows.push({id:uid(),l:ttDefTime(t.rows.length),k:-1,ic:''});
  return t;
}
function ttCell(t,rid,d){
  var c=t.cells[rid+'_'+d];if(!c||typeof c!=='object')return null;
  var tx=typeof c.t==='string'?c.t.slice(0,80):'',cc=(typeof c.c==='number'&&c.c>=0&&c.c<TT_COL.length)?Math.floor(c.c):-1,hh=typeof c.h==='string'?c.h.slice(0,14):'',kk=(typeof c.k==='number'&&c.k>=0&&c.k<TT_TC.length)?Math.floor(c.k):-1,ic=ttIc(c.ic),nn=typeof c.n==='string'?c.n.slice(0,300):'';
  return (tx||cc>-1||hh||kk>-1||ic||nn)?{t:tx,c:cc,h:hh,k:kk,ic:ic,n:nn}:null;
}
function ttClamp(v,a,b,d){v=Number(v);if(!isFinite(v))v=d;return Math.max(a,Math.min(b,v))}
function ttInfo(t,i){
  var c=t.info&&t.info[i];if(!c||typeof c!=='object')return null;
  var tx=typeof c.t==='string'?c.t.slice(0,80):'',im=(typeof c.i==='string'&&c.i.indexOf('data:image/')===0)?c.i:'';
  var ic=ttIc(c.ic);
  if(!tx&&!im&&!ic)return null;
  var z=ttClamp(c.z,1,3,1),m=(z-1)/2;
  return {t:tx,i:im,ic:ic,z:z,s:ttClamp(c.s,.6,2,1),x:ttClamp(c.x,-m,m,0),y:ttClamp(c.y,-m,m,0)};
}
function ttImgCss(f){return 'transform:translate('+(f.x*100).toFixed(1)+'%,'+(f.y*100).toFixed(1)+'%) scale('+f.z.toFixed(2)+')'}
/* shrink a picked photo so it stays small in storage */
function ttPhoto(file){
  return new Promise(function(res,rej){
    var u=URL.createObjectURL(file),im=new Image();
    im.onload=function(){
      var M=420,k=Math.min(1,M/Math.max(im.naturalWidth,im.naturalHeight)),cv=document.createElement('canvas');
      cv.width=Math.max(1,Math.round(im.naturalWidth*k));cv.height=Math.max(1,Math.round(im.naturalHeight*k));
      cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);URL.revokeObjectURL(u);
      try{res(cv.toDataURL('image/jpeg',.82))}catch(e){rej(e)}
    };
    im.onerror=function(){URL.revokeObjectURL(u);rej(new Error('img'))};
    im.src=u;
  });
}
function ttCount(){
  var t=state.profile.tt;if(!t||!Array.isArray(t.rows)||!t.cells)return 0;
  var n=0;t.rows.forEach(function(r){for(var d=0;d<7;d++){var c=ttCell(t,r.id,d);if(c&&c.t)n++}});return n;
}
function ttCard(){
  var n=ttPlans().length;
  return '<button type="button" class="wrcard glass" data-act="openTT"><span class="ib" style="background:linear-gradient(145deg,#ffb347,#ff7a18)">'+icon('calendar')+'</span><div><b>کنکوریا<span class="vbadge">'+icon('star')+'ویژه</span></b><small>'+(n?fa(n)+' برنامه ذخیره‌شده · ':'')+'شنبه تا جمعه، با خروجی عکس</small></div></button>';
}
/* Dates of the plan's week, Saturday → Friday. t.ws (YYYY-MM-DD) is the chosen Saturday; empty = the current week.
   t.dtx[d] is an optional hand-written label for one day. */
function ttIso(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function ttSat(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate()-(d.getDay()+1)%7,12)}
function ttWs(t){
  var m=t&&typeof t.ws==='string'&&/^(\d{4})-(\d{2})-(\d{2})$/.exec(t.ws);
  return ttSat(m?new Date(+m[1],+m[2]-1,+m[3],12):new Date());
}
/* column of today inside the shown week, or -1 when another week is shown */
function ttTodayIdx(t){
  var n=new Date(),k=Math.round((new Date(n.getFullYear(),n.getMonth(),n.getDate(),12)-ttWs(t))/864e5);
  return k>=0&&k<7?k:-1;
}
function ttDates(t,raw){
  t=t||ttGet();var s=ttWs(t),out=[];
  for(var i=0;i<7;i++){
    var d=new Date(s.getFullYear(),s.getMonth(),s.getDate()+i,12),x='';
    try{x=mk({day:'numeric',month:'long'}).format(d)}catch(e){}
    out.push((!raw&&t.dtx&&t.dtx[i])||x);
  }
  return out;
}
function ttGrid(){
  var t=ttGet(),ti=ttTodayIdx(t),ds=ttDates(t);
  var h='<div class="tt-grid" style="--np:'+t.rows.length+'"><button type="button" class="tt-c tt-corner tt-cd" data-tt="corner" data-n="0" aria-label="آیکون ستون تاریخ">'+ttIco(t.cic[0])+'تاریخ</button><button type="button" class="tt-c tt-corner tt-cy" data-tt="corner" data-n="1" aria-label="آیکون ستون روز">'+ttIco(t.cic[1])+'روز</button>';
  t.rows.forEach(function(r,i){
    h+='<button type="button" class="tt-c tt-h" data-tt="row" data-r="'+r.id+'" aria-label="ویرایش ساعت پارت '+fa(i+1)+'"><b>'+ttIco(r.ic)+'پارت '+fa(i+1)+'</b><small'+(r.k>-1?' style="color:'+TT_TC[r.k]+'"':'')+'>'+esc(r.l)+'</small></button>';
  });
  TT_DAYS.forEach(function(dn,d){
    var tod=d===ti;
    h+='<button type="button" class="tt-c tt-dt'+(tod?' today':'')+'" data-tt="date" data-d="'+d+'" aria-label="تغییر تاریخ '+dn+'">'+esc(ds[d])+'</button><button type="button" class="tt-c tt-dy'+(tod?' today':'')+'" data-tt="day" data-d="'+d+'" aria-label="آیکون '+dn+'">'+ttIco(t.dic[d])+dn+'</button>';
    t.rows.forEach(function(r,i){
      var c=ttCell(t,r.id,d),tm=(c&&c.h)||r.l;
      h+='<button type="button" class="tt-c tt-x'+(c&&(c.t||c.c>-1||c.ic)?' on':'')+(c&&c.n?' hasn':'')+(tod?' today':'')+'" data-tt="cell" data-r="'+r.id+'" data-d="'+d+'"'+((c&&(c.c>-1||c.k>-1))?' style="'+(c.c>-1?'--tc:'+TT_COL[c.c]+';':'')+(c.k>-1?'--tmc:'+TT_TC[c.k]+';':'')+'"':'')+' aria-label="'+dn+'، پارت '+fa(i+1)+'، '+esc(tm)+(c&&c.t?'، '+esc(c.t):'')+'"><span class="tx">'+(c&&c.ic?ttIco(c.ic):'')+(c&&c.t?esc(c.t):'')+'</span><span class="tm">'+esc(tm)+'</span></button>';
    });
  });
  /* extra row under Friday: no date / day, free info cells (photo, name, weekly call, start, end, 2 free) */
  h+='<div class="tt-c tt-dt tt-ie"></div><div class="tt-c tt-dy tt-ie"></div>';
  for(var i=0;i<t.rows.length;i++){
    var f=ttInfo(t,i),lb=TT_INFO_LB[i];
    h+='<button type="button" class="tt-c tt-in" data-tt="info" data-i="'+i+'" aria-label="'+esc(lb||'افزودن متن یا عکس')+(f&&f.t?'، '+esc(f.t):'')+'">'+(lb?'<span class="il">'+lb+'</span>':'')+
      (f&&f.ic?ttIco(f.ic):'')+(f&&(f.i||f.t)?'<span class="ib2">'+(f.i?'<span class="ph" style="--s:'+f.s.toFixed(2)+'"><img alt="" src="'+f.i+'" style="'+ttImgCss(f)+'"></span>':'')+(f.t?'<span class="it">'+esc(f.t)+'</span>':'')+'</span>':(f?'':'<span class="ip">'+icon('plus')+'</span>'))+'</button>';
  }
  return h+'</div>';
}
function ttRedraw(){
  if(!ttEl)return;
  var sc=ttEl.querySelector('.tt-scroll');if(sc)sc.innerHTML=ttGrid();
  ttApplyBtn();
  var n=ttCount(),nm=ttName(ttGet()),s=ttEl.querySelector('.tt-ti small');if(s)s.textContent=(nm?nm+' · ':'')+(n?fa(n)+' خانه پر شده':'روی هر خانه بزن و بنویس');
}

/* ---------- Konkooria: apply the study table as real tasks (planner + a "کنکوریا" category) ----------
   Every filled cell becomes one task on exactly its own date; the cell text is the task name. Re-applying updates the same tasks. */
function ttCatId(){
  var c=CATS.filter(function(x){return x.id==='kk'||x.n==='کنکوریا'})[0];
  if(c)return c.id;
  CATS.push({id:'kk',n:'کنکوریا',i:'cap',c:'#ff7a18'});
  return 'kk';
}
function ttHM(h,m){h=+h;m=m?+m:0;return (h>=0&&h<24&&m>=0&&m<60)?pad(h)+':'+pad(m):''}
/* "۱۶ تا ۱۸" or "16:30-18" -> {tm,te} */
function ttParseTime(str){
  var x=String(str||'').replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}),m;
  m=/(\d{1,2})(?::(\d{2}))?\s*(?:تا|-|–|—|to)\s*(\d{1,2})(?::(\d{2}))?/.exec(x);
  if(m){var a=ttHM(m[1],m[2]),b=ttHM(m[3],m[4]);if(a)return {tm:a,te:(b&&b>a)?b:''}}
  m=/(\d{1,2})(?::(\d{2}))?/.exec(x);
  if(m){var a2=ttHM(m[1],m[2]);if(a2)return {tm:a2,te:''}}
  return {tm:'',te:''};
}
function ttPlanItems(t){
  var s0=ttWs(t),out=[],td=todayKey();
  for(var d=0;d<7;d++){
    var dk=ttIso(new Date(s0.getFullYear(),s0.getMonth(),s0.getDate()+d,12));
    t.rows.forEach(function(r,i){
      var c=ttCell(t,r.id,d),name=c&&c.t?c.t.replace(/\s+/g,' ').trim():'';
      if(!name)return;
      var tt=ttParseTime((c&&c.h)||r.l);
      out.push({k:dk+'|'+r.id,d:dk,di:d,name:name,tm:tt.tm,te:tt.te,part:'پارت '+fa(i+1)+(((c&&c.h)||r.l)?' · '+((c&&c.h)||r.l):''),past:dk<td});
    });
  }
  return out;
}
function ttApplyBtn(){
  var b=ttEl&&ttEl.querySelector('[data-tt="apply"]');if(b)b.hidden=!ttCount();
}
function ttApplyPlan(){
  var t=ttGet(),items=ttPlanItems(t),use=items.filter(function(x){return !x.past}),skip=items.length-use.length;
  if(!use.length){toast(items.length?'همه‌ی روزهای این هفته گذشته‌اند؛ تاریخ شروع برنامه را عوض کن':'اول چند خانه‌ی جدول را پر کن',null,null,'warn');return}
  var days={};use.forEach(function(x){days[x.di]=(days[x.di]||0)+1});
  var ds=ttDates(t,true);
  var rows=Object.keys(days).map(function(d){return '<li><span>'+TT_DAYS[d]+' · '+esc(ds[d])+'</span><b>'+fa(days[d])+' کار</b></li>'}).join('');
  var have=state.tasks.filter(function(x){return x.ttk&&use.some(function(u){return u.k===x.ttk})}).length;
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>اعمال کردن برنامه</h2><button type="button" data-e="close">بستن</button></div>'+
    '<p class="hint">برای هر خانه‌ی پرشده‌ی جدول یک کار ساخته می‌شود؛ اسم کار همان درس یا مبحث نوشته‌شده در خانه است و فقط در تاریخ همان روز می‌آید. کارها هم در «برنامه» دیده می‌شوند و هم در دسته‌ی «کنکوریا».</p>'+
    '<ul class="tt-ap-l">'+rows+'</ul>'+
    '<p class="hint">'+fa(use.length)+' کار ساخته می‌شود'+(skip?' · '+fa(skip)+' خانه برای روزهای گذشته نادیده گرفته شد':'')+(have?' · '+fa(have)+' کار قبلاً اعمال شده و فقط به‌روز می‌شود':'')+'</p>'+
    '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="go">'+icon('check')+'اعمال کردن</button><button type="button" class="tt-btn" data-e="close">انصراف</button></div>','اعمال کردن برنامه');
  sw.w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e]');if(!b)return;
    if(b.dataset.e==='close'){sw.close();return}
    if(b.dataset.e==='go'){sw.close();ttDoApply(t)}
  });
}
function ttDoApply(t){
  var items=ttPlanItems(t).filter(function(x){return !x.past}),cid=ttCatId(),before=JSON.stringify(state.tasks),added=0,upd=0,rm=0,want={};
  items.forEach(function(x){want[x.k]=x});
  var dates={},s0=ttWs(t),tdk=todayKey(),di;
  for(di=0;di<7;di++){var dk0=ttIso(new Date(s0.getFullYear(),s0.getMonth(),s0.getDate()+di,12));if(dk0>=tdk)dates[dk0]=1}
  /* drop earlier unfinished plan tasks of these days that are no longer in the table */
  state.tasks=state.tasks.filter(function(x){
    if(!x.ttk||x.done||!dates[x.d])return true;
    if(want[x.ttk])return true;
    rm++;return false;
  });
  items.forEach(function(x){
    var ex=state.tasks.filter(function(y){return y.ttk===x.k})[0];
    if(ex){
      if(ex.done)return;
      if(ex.t!==x.name||ex.tm!==x.tm||ex.te!==x.te||ex.c!==cid){ex.t=x.name;ex.tm=x.tm;ex.te=x.te;ex.n=x.part;ex.c=cid;upd++}
      return;
    }
    state.tasks.push({id:uid(),done:false,doneAt:0,ts:Date.now()+added,t:x.name.slice(0,120),n:x.part,d:x.d,tm:x.tm,te:x.te,col:'',p:0,c:cid,tg:[],ttk:x.k});
    added++;
  });
  mutate();nativeSync(true);
  var msg=fa(added)+' کار به برنامه و دسته‌ی کنکوریا اضافه شد'+(upd?' · '+fa(upd)+' به‌روز شد':'')+(rm?' · '+fa(rm)+' حذف شد':'');
  if(!added&&!upd&&!rm)msg='برنامه از قبل اعمال شده بود؛ تغییری لازم نبود';
  toast(msg,'بازگردانی',function(){try{state.tasks=JSON.parse(before);mutate();nativeSync(true)}catch(e){}},'ok');
}
function ttSheetWrap(inner,label){
  var w=document.createElement('div');w.className='sheet-wrap tt-top';
  w.innerHTML='<div class="dim"></div><div class="sheet tt-ed" role="dialog" aria-modal="true" aria-label="'+label+'"><div class="grab"></div>'+inner+'</div>';
  document.body.appendChild(w);
  var done=false;
  function close(){if(done)return;done=true;w.classList.remove('open');setTimeout(function(){w.remove()},350)}
  w.querySelector('.dim').addEventListener('click',close);
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
  return {w:w,close:close};
}
function ttCellSheet(rid,d){
  var t=ttGet(),pi=t.rows.findIndex(function(r){return r.id===rid}),row=t.rows[pi];if(!row)return;
  var cur=ttCell(t,rid,d)||{t:'',c:-1,h:'',k:-1,ic:'',n:''},st={c:cur.c,k:cur.k,ic:cur.ic,all:false};
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>'+TT_DAYS[d]+' · پارت '+fa(pi+1)+'</h2><button type="button" data-e="close">بستن</button></div>'+
    '<textarea class="field" id="ttTx" rows="2" maxlength="80" placeholder="مثلاً: ریاضی، تست حد و پیوستگی" aria-label="متن خانه"></textarea>'+
    '<div class="sec"><div class="sec-h"><b>اطلاعات</b></div><textarea class="field" id="ttNf" rows="3" maxlength="300" placeholder="توضیح برای دانش‌آموز: مبحث، صفحه، تعداد تست، منبع…  (در حالت مشاهده با زدن روی خانه نشان داده می‌شود)" aria-label="اطلاعات خانه"></textarea></div>'+
    '<div class="sec"><div class="sec-h"><b>ساعت این خانه</b></div><input class="field" id="ttTm" type="text" maxlength="14" placeholder="مثلاً ۱۶ تا ۱۸" aria-label="ساعت این خانه"></div>'+
    '<div class="sec"><div class="sec-h"><b>رنگ ساعت</b></div><div class="tt-sw"><button type="button" class="none" data-e="tcol" data-c="-1" aria-label="رنگ خودکار">'+icon('close')+'</button>'+TT_TC.map(function(c,i){return '<button type="button" data-e="tcol" data-c="'+i+'" style="--sc:'+c+'" aria-label="رنگ ساعت '+fa(i+1)+'"></button>'}).join('')+'</div></div>'+
    '<div class="sec"><div class="sec-h"><b>درس‌ها</b></div><div class="chips">'+TT_SUB.map(function(s,i){return '<button type="button" class="chip" data-e="sub" data-i="'+i+'" style="--cc:'+TT_COL[s[1]]+'"><i></i>'+icon(s[2],'tti')+s[0]+'</button>'}).join('')+'</div></div>'+
    '<div class="sec"><div class="sec-h"><b>رنگ خانه</b></div><div class="tt-sw"><button type="button" class="none" data-e="col" data-c="-1" aria-label="بدون رنگ">'+icon('close')+'</button>'+TT_COL.map(function(c,i){return '<button type="button" data-e="col" data-c="'+i+'" style="--sc:'+c+'" aria-label="رنگ '+fa(i+1)+'"></button>'}).join('')+'</div></div>'+
    ttPick()+'<button type="button" class="chip tt-all" data-e="all" aria-pressed="false">همین را برای همه‌ی پارت‌های این روز بگذار</button>'+
    '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="save">ذخیره</button><button type="button" class="tt-btn" data-e="clear">پاک کردن خانه</button></div>','ویرایش خانه');
  var w=sw.w,tx=w.querySelector('#ttTx'),tm=w.querySelector('#ttTm'),nf=w.querySelector('#ttNf');tx.value=cur.t;tm.value=cur.h||row.l;nf.value=cur.n||'';
  function paint(){[].forEach.call(w.querySelectorAll('[data-e="col"]'),function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.c)===st.c))});[].forEach.call(w.querySelectorAll('[data-e="tcol"]'),function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.c)===st.k))});ttPickPaint(w,st.ic)}
  paint();
  function hv(){var v=tm.value.trim().slice(0,14);return v===row.l?'':v}
  function put(text,c,h,clr){
    var ids=st.all?t.rows.map(function(r){return r.id}):[rid];
    ids.forEach(function(p){
      var k=p+'_'+d,ex=t.cells[k]||{},keep=clr?'':(p===rid?h:(ex.h||'')),kk=clr?-1:(p===rid?st.k:(typeof ex.k==='number'?ex.k:-1));
      var ic=clr?'':st.ic,nn=clr?'':(p===rid?nf.value.trim().slice(0,300):(ex.n||''));
      if(text||c>-1||keep||kk>-1||ic||nn)t.cells[k]={t:text,c:c,h:keep,k:kk,ic:ic,n:nn};else delete t.cells[k];
    });
    persist();ttRedraw();sw.close();
  }
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e]');if(!b)return;var a=b.dataset.e;
    if(a==='close')sw.close();
    else if(a==='sub'){
      var s=TT_SUB[Number(b.dataset.i)],v=tx.value.trim(),isSub=TT_SUB.some(function(x){return x[0]===v});
      if(!v||isSub)tx.value=s[0];else if(v.indexOf(s[0])!==0)tx.value=s[0]+' - '+v;
      st.c=s[1];st.ic=s[2];paint();
    }
    else if(a==='col'){st.c=Number(b.dataset.c);paint()}
    else if(a==='tcol'){st.k=Number(b.dataset.c);paint()}
    else if(a==='ic'){st.ic=b.dataset.n;paint()}
    else if(a==='all'){st.all=!st.all;b.setAttribute('aria-pressed',String(st.all))}
    else if(a==='save')put(tx.value.trim().slice(0,80),st.c,hv(),false);
    else if(a==='clear')put('',-1,'',true);
  });
  setTimeout(function(){try{tx.focus({preventScroll:true})}catch(e){}},380);
}
function ttInfoSheet(i){
  var t=ttGet(),cur=ttInfo(t,i)||{t:'',i:'',ic:'',z:1,s:1,x:0,y:0},st={ic:cur.ic,i:cur.i,z:cur.z,s:cur.s,x:cur.x,y:cur.y},lb=TT_INFO_LB[i];
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>'+(lb||'پارت '+fa(i+1))+'</h2><button type="button" data-e="close">بستن</button></div>'+
    '<textarea class="field" id="ttIx" rows="2" maxlength="80" placeholder="متن" aria-label="متن"></textarea>'+
    (i===3||i===4?'<button type="button" class="chip tt-all" data-e="today" style="margin-top:10px">امروز را بنویس</button>':'')+
    '<div class="sec"><div class="sec-h"><b>عکس</b></div><div class="tt-ph"><div class="tt-pv" hidden><img alt=""></div>'+
    '<div class="tt-rg" hidden><label for="ttZ">بزرگ‌نمایی <small>(برای جابه‌جایی، عکس را بکش)</small></label><input type="range" id="ttZ" min="1" max="3" step="0.05" aria-label="بزرگ‌نمایی عکس"></div>'+
    '<div class="tt-rg" hidden><label for="ttS">اندازه‌ی عکس در جدول</label><input type="range" id="ttS" min="0.6" max="2" step="0.05" aria-label="اندازه عکس در جدول"></div>'+
    '<div class="tt-phb"><label class="tt-btn" for="ttIf">'+icon('camera')+'انتخاب عکس</label><button type="button" class="tt-btn bad" data-e="rmimg">حذف عکس</button></div><input type="file" id="ttIf" accept="image/*" hidden></div></div>'+
    ttPick()+'<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="save">ذخیره</button><button type="button" class="tt-btn" data-e="clear">پاک کردن خانه</button></div>','ویرایش خانه');
  var w=sw.w,tx=w.querySelector('#ttIx'),pv=w.querySelector('.tt-pv'),im=pv.querySelector('img'),rm=w.querySelector('[data-e="rmimg"]'),fi=w.querySelector('#ttIf'),zr=w.querySelector('#ttZ'),sr=w.querySelector('#ttS'),rgs=w.querySelectorAll('.tt-rg');
  tx.value=cur.t;zr.value=st.z;sr.value=st.s;
  function lim(){var m=(st.z-1)/2;st.x=ttClamp(st.x,-m,m,0);st.y=ttClamp(st.y,-m,m,0)}
  function paint(){
    var has=!!st.i;pv.hidden=!has;rm.hidden=!has;[].forEach.call(rgs,function(r){r.hidden=!has});
    if(has){im.src=st.i;im.style.cssText=ttImgCss(st)}
    ttPickPaint(w,st.ic);
  }
  paint();
  zr.addEventListener('input',function(){st.z=Number(zr.value);lim();im.style.cssText=ttImgCss(st)});
  sr.addEventListener('input',function(){st.s=Number(sr.value)});
  var dr=null;
  pv.addEventListener('pointerdown',function(e){dr={x:e.clientX,y:e.clientY};try{pv.setPointerCapture(e.pointerId)}catch(x){}});
  pv.addEventListener('pointermove',function(e){
    if(!dr)return;var r=pv.getBoundingClientRect();
    st.x+=(e.clientX-dr.x)/r.width;st.y+=(e.clientY-dr.y)/r.height;dr={x:e.clientX,y:e.clientY};lim();im.style.cssText=ttImgCss(st);
  });
  function up(){dr=null}
  pv.addEventListener('pointerup',up);pv.addEventListener('pointercancel',up);
  function put(text,img){
    if(text||img||st.ic)t.info[i]={t:text,i:img,ic:st.ic,z:+st.z.toFixed(2),s:+st.s.toFixed(2),x:+st.x.toFixed(3),y:+st.y.toFixed(3)};else delete t.info[i];
    persist();ttRedraw();sw.close();
  }
  fi.addEventListener('change',function(){
    var f=fi.files&&fi.files[0];if(!f)return;
    ttPhoto(f).then(function(d){st.i=d;st.z=1;st.x=0;st.y=0;zr.value=1;paint()},function(){toast('این عکس باز نشد',null,null,'warn')});
    fi.value='';
  });
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e]');if(!b)return;var a=b.dataset.e;
    if(a==='close')sw.close();
    else if(a==='rmimg'){st.i='';paint()}
    else if(a==='ic'){st.ic=b.dataset.n;paint()}
    else if(a==='today'){try{tx.value=mk({year:'numeric',month:'long',day:'numeric'}).format(new Date())}catch(x){}}
    else if(a==='save')put(tx.value.trim().slice(0,80),st.i);
    else if(a==='clear'){st.ic='';put('','')}
  });
  setTimeout(function(){try{tx.focus({preventScroll:true})}catch(e){}},380);
}
function ttIconSheet(title,cur,fn){
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>'+title+'</h2><button type="button" data-e="close">بستن</button></div>'+ttPick(),title);
  var w=sw.w;ttPickPaint(w,cur||'');
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e]');if(!b)return;
    if(b.dataset.e==='close')sw.close();
    else if(b.dataset.e==='ic'){fn(b.dataset.n);persist();ttRedraw();sw.close()}
  });
}
/* change the plan's dates: shift by week, pick any start date, or write one day's label by hand */
function ttDateSheet(d){
  var t=ttGet();
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>تغییر تاریخ</h2><button type="button" data-e="close">بستن</button></div>'+
    '<div class="sec"><div class="sec-h"><b>هفته‌ی برنامه</b></div><div class="tt-wk"><button type="button" class="tt-btn" data-e="prev">هفته‌ی قبل</button><button type="button" class="tt-btn" data-e="cur">این هفته</button><button type="button" class="tt-btn" data-e="next">هفته‌ی بعد</button></div><small class="tt-wr" id="ttWr"></small></div>'+
    '<div class="sec"><div class="sec-h"><b>انتخاب تاریخ دلخواه</b></div><input class="field" id="ttDp" type="date" aria-label="تاریخ شروع هفته"></div>'+
    '<div class="sec"><div class="sec-h"><b>متن تاریخ '+TT_DAYS[d]+'</b></div><input class="field" id="ttDx" type="text" maxlength="14" aria-label="متن تاریخ این روز"></div>'+
    '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="save">ذخیره</button><button type="button" class="tt-btn" data-e="auto">تاریخ خودکار</button></div>','تغییر تاریخ');
  var w=sw.w,dp=w.querySelector('#ttDp'),dx=w.querySelector('#ttDx'),wr=w.querySelector('#ttWr');
  function fresh(){
    var raw=ttDates(t,true);
    dp.value=ttIso(ttWs(t));dx.value=t.dtx[d]||'';dx.placeholder=raw[d];
    wr.textContent='از '+raw[0]+' تا '+raw[6];
    ttRedraw();
  }
  function setWeek(s){
    t.ws=ttIso(s)===ttIso(ttSat(new Date()))?'':ttIso(s);
    t.dtx=['','','','','','',''];
    persist();fresh();
  }
  fresh();
  dp.addEventListener('change',function(){
    var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(dp.value);
    if(m)setWeek(ttSat(new Date(+m[1],+m[2]-1,+m[3],12)));
  });
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e]');if(!b)return;var a=b.dataset.e,s=ttWs(t);
    if(a==='close')sw.close();
    else if(a==='prev')setWeek(new Date(s.getFullYear(),s.getMonth(),s.getDate()-7,12));
    else if(a==='next')setWeek(new Date(s.getFullYear(),s.getMonth(),s.getDate()+7,12));
    else if(a==='cur')setWeek(ttSat(new Date()));
    else if(a==='save'){t.dtx[d]=dx.value.trim().slice(0,14);persist();ttRedraw();sw.close()}
    else if(a==='auto'){t.dtx[d]='';persist();ttRedraw();sw.close()}
  });
}
/* edit the default time shown under a part's header */
function ttRowSheet(rid){
  var t=ttGet(),pi=t.rows.findIndex(function(r){return r.id===rid}),row=t.rows[pi];if(!row)return;
  var st={k:row.k,ic:row.ic||'',all:false};
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>ساعت پارت '+fa(pi+1)+'</h2><button type="button" data-e="close">بستن</button></div>'+
    '<input class="field" id="ttLb" type="text" maxlength="14" placeholder="مثلاً ۱۶ تا ۱۸" aria-label="بازه ساعت">'+
    '<div class="sec"><div class="sec-h"><b>رنگ ساعت</b></div><div class="tt-sw"><button type="button" class="none" data-e="tcol" data-c="-1" aria-label="رنگ خودکار">'+icon('close')+'</button>'+TT_TC.map(function(c,i){return '<button type="button" data-e="tcol" data-c="'+i+'" style="--sc:'+c+'" aria-label="رنگ ساعت '+fa(i+1)+'"></button>'}).join('')+'</div></div>'+
    ttPick()+'<button type="button" class="chip tt-all" data-e="all" aria-pressed="false">رنگ را برای ساعت همه‌ی خانه‌های این پارت هم بگذار</button>'+
    '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="save">ذخیره</button><button type="button" class="tt-btn" data-e="close">انصراف</button></div>','ویرایش ساعت پارت');
  var w=sw.w,inp=w.querySelector('#ttLb');inp.value=row.l;
  function paint(){[].forEach.call(w.querySelectorAll('[data-e="tcol"]'),function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.c)===st.k))});ttPickPaint(w,st.ic)}
  paint();
  function save(){
    row.l=inp.value.trim()||'—';row.k=st.k;row.ic=st.ic;
    if(st.all)for(var d=0;d<7;d++){
      var k=row.id+'_'+d,ex=t.cells[k];
      if(ex&&typeof ex==='object'){ex.k=st.k;if(!ex.t&&!(ex.c>-1)&&!ex.h&&!(ex.k>-1))delete t.cells[k]}
      else if(st.k>-1)t.cells[k]={t:'',c:-1,h:'',k:st.k};
    }
    persist();ttRedraw();sw.close();
  }
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();save()}});
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-e]');if(!b)return;var a=b.dataset.e;
    if(a==='close')sw.close();
    else if(a==='tcol'){st.k=Number(b.dataset.c);paint()}
    else if(a==='ic'){st.ic=b.dataset.n;paint()}
    else if(a==='all'){st.all=!st.all;b.setAttribute('aria-pressed',String(st.all))}
    else if(a==='save')save();
  });
  setTimeout(function(){try{inp.focus({preventScroll:true})}catch(e){}},380);
}
function ttClearAll(){
  var t=ttGet();
  if(!ttCount()&&!Object.keys(t.cells).length&&!Object.keys(t.info).length){toast('جدول از قبل خالی است',null,null,'info');return}
  askConfirm({title:'پاک کردن همه‌ی خانه‌ها؟',msg:'نوشته‌ها، رنگ‌ها، ساعت‌های هر خانه و بخش پایین جدول (عکس و اطلاعات) پاک می‌شود. ساعت پارت‌ها می‌ماند.',btns:[{t:'پاک کردن',cls:'bad',fn:function(){
    var old=t.cells,oi=t.info;t.cells={};t.info={};persist();ttRedraw();
    toast('جدول پاک شد','بازگردانی',function(){t.cells=old;t.info=oi;persist();ttRedraw()},'ok');
  }}]});
}

/* image export: draws the table on a canvas (right-to-left: date, day, then parts 1-7) */
function ttRR(cx,x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath()}
function ttWrap(cx,txt,maxW){
  var words=String(txt).split(/\s+/).filter(Boolean),lines=[],cur='',out=[];
  words.forEach(function(wd){var test=cur?cur+' '+wd:wd;if(!cur||cx.measureText(test).width<=maxW)cur=test;else{lines.push(cur);cur=wd}});
  if(cur)lines.push(cur);
  lines.forEach(function(l){
    while(l.length>1&&cx.measureText(l).width>maxW){var n=l.length;while(n>1&&cx.measureText(l.slice(0,n)).width>maxW)n--;out.push(l.slice(0,n));l=l.slice(n)}
    out.push(l);
  });
  return out;
}
async function ttMakeImage(){
  var t=ttGet(),ds=ttDates(t),np=t.rows.length;
  var pics=await Promise.all(t.rows.map(function(r,i){var f=ttInfo(t,i);return f&&f.i?new Promise(function(res){var im=new Image();im.onload=function(){res(im)};im.onerror=function(){res(null)};im.src=f.i}):null}));
  var ICO={};
  function icKey(n,c){return n+'|'+c}
  var need=[];
  function want(n,c){if(n&&need.indexOf(icKey(n,c))<0)need.push(icKey(n,c))}
  want(t.cic[0],'#ffffff');want(t.cic[1],'#ffffff');
  t.rows.forEach(function(r,i){want(r.ic,'#ffffff');var f=ttInfo(t,i);if(f)want(f.ic,'#47506b')});
  TT_DAYS.forEach(function(dn,d){want(t.dic[d],'#1b2240');t.rows.forEach(function(r){var c=ttCell(t,r.id,d);if(c)want(c.ic,'#1b2240')})});
  await Promise.all(need.map(function(k){
    var a=k.split('|'),sym=document.getElementById('i-'+a[0]);if(!sym)return null;
    var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="'+a[1]+'" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+sym.innerHTML+'</svg>';
    return new Promise(function(res){var im=new Image();im.onload=function(){ICO[k]=im;res()};im.onerror=function(){res()};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
  }));
  try{await Promise.all([document.fonts.load('700 24px Vazirmatn'),document.fonts.load('400 24px Vazirmatn')])}catch(e){}
  var S=2,PAD=40,DW=140,YW=130,CW=190,HH=96,TH=118,FH=62,MINR=116,LH=34,TB=46,FF='Vazirmatn,Tahoma,system-ui,sans-serif';
  var LW=DW+YW,TW=LW+CW*np,W=PAD*2+TW,cv=document.createElement('canvas'),cx=cv.getContext('2d');
  cx.font='400 22px '+FF;
  var rh=TT_DAYS.map(function(dn,d){
    var mx=LH;
    t.rows.forEach(function(r){var c=ttCell(t,r.id,d);if(c){var n=(c.t?ttWrap(cx,c.t,CW-24).length*LH:0)+(c.ic?34:0);if(n>mx)mx=n}});
    return Math.max(MINR,mx+TB+24);
  });
  /* text with a leading icon (right side in RTL), centred as one group */
  function drawTI(text,img,cxm,cym,isz){
    var w=cx.measureText(text).width,tot=w+(img?isz+8:0);
    if(img)cx.drawImage(img,cxm+tot/2-isz,cym-isz/2,isz,isz);
    cx.fillText(text,cxm-(img?(isz+8)/2:0),cym);
  }
  var IM=70,ih=116,lay=[];
  t.rows.forEach(function(r,i){
    var f=ttInfo(t,i),lb=TT_INFO_LB[i]?38:12;lay[i]=null;if(!f)return;
    var pc=pics[i],isz=pc?Math.round(Math.min(IM*f.s,CW-24)):0,stack=!!(pc&&f.t&&isz>74),tw=CW-24-(pc&&!stack?isz+8:0);
    var n=f.t?ttWrap(cx,f.t,tw).length:0,th=n*LH,bh0=stack?isz+8+th:Math.max(isz,th),ibh=f.ic?36:0;
    lay[i]={isz:isz,stack:stack,tw:tw,bh0:bh0,ibh:ibh,bh:bh0+ibh};
    ih=Math.max(ih,lb+bh0+ibh+14);
  });
  var rh2=rh.concat([ih]);
  var tbH=HH+rh2.reduce(function(a,b){return a+b},0),H=PAD+TH+tbH+FH+PAD*0.6;
  cv.width=Math.round(W*S);cv.height=Math.round(H*S);
  cx.scale(S,S);cx.direction='rtl';cx.textBaseline='middle';
  cx.fillStyle='#f3f6fd';cx.fillRect(0,0,W,H);
  cx.textAlign='center';
  cx.fillStyle='#14203f';cx.font='800 42px '+FF;cx.fillText(t.title||'برنامه هفتگی',W/2,PAD+34);
  /* app name, top right above the table */
  cx.save();cx.direction='ltr';cx.textAlign='right';cx.fillStyle='#3d63f0';cx.font='800 46px '+FF;cx.fillText('Ario',W-PAD,PAD+34);cx.restore();
  cx.fillStyle='#6b7690';cx.font='400 22px '+FF;
  var ds2='';try{ds2=mk({year:'numeric',month:'long',day:'numeric'}).format(new Date())}catch(e){}
  cx.fillText('شنبه تا جمعه'+(ds2?'  ·  '+ds2:''),W/2,PAD+82);
  var X0=PAD,Y0=PAD+TH;
  cx.save();ttRR(cx,X0,Y0,TW,tbH,22);cx.clip();
  cx.fillStyle='#ffffff';cx.fillRect(X0,Y0,TW,tbH);
  var xr=X0+TW;
  /* header: date + day labels, then "part n" with its default time under it */
  cx.fillStyle='#3d63f0';cx.fillRect(X0,Y0,TW,HH);
  cx.fillStyle='#fff';cx.font='700 24px '+FF;
  drawTI('تاریخ',ICO[icKey(t.cic[0],'#ffffff')],xr-DW/2,Y0+HH/2,28);
  drawTI('روز',ICO[icKey(t.cic[1],'#ffffff')],xr-DW-YW/2,Y0+HH/2,28);
  t.rows.forEach(function(r,i){
    var mx=xr-LW-CW*i-CW/2;
    cx.fillStyle='#fff';cx.font='700 25px '+FF;drawTI('پارت '+fa(i+1),ICO[icKey(r.ic,'#ffffff')],mx,Y0+34,28);
    cx.font='500 20px '+FF;
    if(r.k>-1){
      var pw=Math.min(CW-16,cx.measureText(r.l).width+28);
      cx.fillStyle='#ffffff';ttRR(cx,mx-pw/2,Y0+68-17,pw,34,17);cx.fill();
      cx.fillStyle=TT_TC[r.k];cx.font='700 20px '+FF;cx.fillText(r.l,mx,Y0+68);
    }else{cx.fillStyle='rgba(255,255,255,.88)';cx.fillText(r.l,mx,Y0+68)}
  });
  /* rows: one per day */
  var y=Y0+HH;
  TT_DAYS.forEach(function(dn,d){
    var h=rh[d];
    cx.fillStyle='#e8edfb';cx.fillRect(xr-LW,y,LW,h);
    cx.fillStyle='#6b7690';cx.font='600 21px '+FF;cx.fillText(ds[d],xr-DW/2,y+h/2);
    cx.fillStyle='#1b2240';cx.font='700 23px '+FF;drawTI(dn,ICO[icKey(t.dic[d],'#1b2240')],xr-DW-YW/2,y+h/2,28);
    t.rows.forEach(function(r,i){
      var c=ttCell(t,r.id,d),cxl=xr-LW-CW*(i+1),tm=(c&&c.h)||r.l,col=c&&c.c>-1;
      if(col){cx.fillStyle=TT_COL[c.c];cx.fillRect(cxl,y,CW,h)}
      if(c&&(c.t||c.ic)){
        cx.fillStyle='#1b2240';cx.font='500 22px '+FF;
        var ci=c.ic?ICO[icKey(c.ic,'#1b2240')]:null,ls=c.t?ttWrap(cx,c.t,CW-24):[],ah=h-TB,bh=(c.ic?34:0)+ls.length*LH,bt0=y+(ah-bh)/2;
        if(ci)cx.drawImage(ci,cxl+CW/2-15,bt0,30,30);
        ls.forEach(function(l,k){cx.fillText(l,cxl+CW/2,bt0+(c.ic?34:0)+LH/2+k*LH)});
      }
      cx.strokeStyle=col?'rgba(27,34,64,.2)':'#dfe5f3';cx.lineWidth=2;cx.beginPath();
      cx.moveTo(cxl+14,y+h-TB);cx.lineTo(cxl+CW-14,y+h-TB);cx.stroke();
      cx.fillStyle=(c&&c.k>-1)?TT_TC[c.k]:(col?'#47506b':'#8a94ad');cx.font=((c&&c.k>-1)?'700':'500')+' 19px '+FF;
      cx.fillText(tm,cxl+CW/2,y+h-TB/2);
    });
    y+=h;
  });
  /* extra info row (no date / day) */
  cx.fillStyle='#e8edfb';cx.fillRect(xr-LW,y,LW,ih);
  t.rows.forEach(function(r,i){
    var f=ttInfo(t,i),cxl=xr-LW-CW*(i+1),lb=TT_INFO_LB[i],top=y+(lb?38:10);
    cx.fillStyle='#f7f9fe';cx.fillRect(cxl,y,CW,ih);
    if(lb){cx.fillStyle='#6b7690';cx.font='600 18px '+FF;cx.textAlign='center';cx.fillText(lb,cxl+CW/2,y+22,CW-14)}
    if(!f)return;
    var L=lay[i],pc=pics[i],tl=cxl+12,mid0=top+(y+ih-10-top)/2,bt0=mid0-L.bh/2,ii=f.ic?ICO[icKey(f.ic,'#47506b')]:null,bt=bt0+L.ibh,mid=bt+L.bh0/2;
    if(ii)cx.drawImage(ii,cxl+CW/2-15,bt0,30,30);
    function pic(ix,iy){
      var sq=Math.min(pc.naturalWidth,pc.naturalHeight),c0x=0.5-(0.5+f.x)/f.z,c0y=0.5-(0.5+f.y)/f.z,ss=sq/f.z;
      cx.save();ttRR(cx,ix,iy,L.isz,L.isz,12);cx.clip();
      cx.drawImage(pc,(pc.naturalWidth-sq)/2+c0x*sq,(pc.naturalHeight-sq)/2+c0y*sq,ss,ss,ix,iy,L.isz,L.isz);cx.restore();
    }
    function txt(cxm,cym){
      cx.fillStyle='#1b2240';cx.font='500 22px '+FF;cx.textAlign='center';
      var ls=ttWrap(cx,f.t,L.tw);
      ls.forEach(function(l,k){cx.fillText(l,cxm,cym+(k-(ls.length-1)/2)*LH)});
    }
    if(L.stack){
      pic(cxl+(CW-L.isz)/2,bt);
      if(f.t)txt(cxl+CW/2,bt+L.isz+8+(L.bh0-L.isz-8)/2);
    }else if(pc){
      var ix=cxl+CW-12-L.isz;pic(ix,mid-L.isz/2);
      if(f.t)txt(tl+(ix-8-tl)/2,mid);
    }else if(f.t)txt(cxl+CW/2,mid);
  });
  y+=ih;
  /* grid lines */
  cx.strokeStyle='#cfd7ea';cx.lineWidth=2;cx.beginPath();
  var yy=Y0+HH;
  for(var i=0;i<=rh2.length;i++){cx.moveTo(X0,yy);cx.lineTo(X0+TW,yy);if(i<rh2.length)yy+=rh2[i]}
  for(var j=0;j<=np;j++){var xx=xr-LW-CW*j;cx.moveTo(xx,Y0+HH);cx.lineTo(xx,Y0+tbH)}
  cx.moveTo(xr-LW,Y0);cx.lineTo(xr-LW,Y0+tbH);
  cx.moveTo(xr-DW,Y0);cx.lineTo(xr-DW,Y0+tbH);
  cx.stroke();
  cx.restore();
  cx.strokeStyle='#cfd7ea';cx.lineWidth=2;ttRR(cx,X0,Y0,TW,tbH,22);cx.stroke();
  return new Promise(function(res){cv.toBlob(function(b){res(b)},'image/png')});
}
async function ttShare(blob,name){
  if(bkCap('Filesystem')&&bkCap('Share')){
    try{
      var b64=await new Promise(function(res,rej){var fr=new FileReader();fr.onload=function(){res(String(fr.result).split(',')[1])};fr.onerror=rej;fr.readAsDataURL(blob)});
      var PL={Filesystem:capGet('Filesystem'),Share:capGet('Share')},r=await PL.Filesystem.writeFile({path:name,data:b64,directory:'CACHE'});
      await PL.Share.share({title:'جدول برنامه هفتگی',url:r.uri,dialogTitle:'ذخیره یا ارسال عکس جدول'});
      return;
    }catch(e){if(/cancel/i.test(String(e&&e.message||e)))return}
  }
  try{
    var f=new File([blob],name,{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'جدول برنامه هفتگی'});return}
  }catch(e){if(e&&e.name==='AbortError')return}
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
  document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},4000);
  toast('عکس جدول ذخیره شد',null,null,'ok');
}
function ttIS(){try{var C=window.Capacitor;if(C&&C.isNativePlatform&&C.isNativePlatform())return (C.Plugins&&C.Plugins.ImageSave)||(C.registerPlugin&&C.registerPlugin('ImageSave'))||null}catch(e){}return null}
/* straight to the gallery (Android: Pictures/Ario), or a normal browser download */
async function imgSave(blob,name,lbl){
  var P=ttIS(),b64='',why='';
  try{b64=await new Promise(function(res,rej){var fr=new FileReader();fr.onload=function(){res(String(fr.result).split(',')[1])};fr.onerror=rej;fr.readAsDataURL(blob)})}catch(e){}
  if(P&&b64){
    /* 1) straight into the gallery */
    if(P.saveImage){
      try{await P.saveImage({data:b64,name:name});toast('عکس در گالری ذخیره شد (پوشه‌ی Pictures/Ario)',null,null,'ok');return}
      catch(e){why=String(e&&e.message||e)}
    }
    /* 2) a plain file in Documents/Ario */
    var FS=capGet('Filesystem');
    if(FS){
      try{await FS.writeFile({path:'Ario/'+name,data:b64,directory:'DOCUMENTS',recursive:true});toast('عکس در پوشه‌ی Documents/Ario ذخیره شد',null,null,'ok');return}
      catch(e){why+=' | '+String(e&&e.message||e)}
    }
    /* 3) the system share sheet (save to Drive, send in a chat, ...) */
    try{await ttShare(blob,name);return}catch(e){why+=' | '+String(e&&e.message||e)}
    toast('ذخیره‌ی عکس انجام نشد ('+why.slice(0,90)+')',null,null,'warn');return;
  }
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
  document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},4000);
  toast((lbl||'عکس جدول')+' دانلود شد',null,null,'ok');
}
async function ttDownload(){
  if(ttBusy)return;ttBusy=true;
  var btn=ttEl&&ttEl.querySelector('[data-tt="download"]');if(btn)btn.disabled=true;
  try{
    var blob=await ttMakeImage();if(!blob)throw new Error('empty');
    await imgSave(blob,'ario-timetable-'+todayKey()+'.png');
  }catch(e){toast('ساخت عکس انجام نشد؛ دوباره تلاش کن',null,null,'warn')}
  ttBusy=false;if(btn)btn.disabled=false;
}
var ttBusy=false;
async function ttExport(){
  if(ttBusy)return;ttBusy=true;
  var btn=ttEl&&ttEl.querySelector('[data-tt="export"]');if(btn)btn.disabled=true;
  try{
    var blob=await ttMakeImage();
    if(!blob)throw new Error('empty');
    var url=URL.createObjectURL(blob),name='ario-timetable-'+todayKey()+'.png';
    var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>عکس جدول</h2><button type="button" data-e="close">بستن</button></div>'+
      '<div class="tt-prev"><img alt="پیش‌نمایش جدول برنامه هفتگی"></div>'+
      '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="share">'+icon('camera')+'ذخیره / ارسال عکس</button><button type="button" class="tt-btn" data-e="dl">'+icon('download')+'دانلود عکس</button><button type="button" class="tt-btn full" data-e="close">بستن</button></div>','عکس جدول');
    sw.w.querySelector('img').src=url;
    var closeOrig=sw.close;
    function closeAll(){closeOrig();setTimeout(function(){URL.revokeObjectURL(url)},600)}
    sw.w.querySelector('.dim').addEventListener('click',closeAll);
    sw.w.addEventListener('click',function(e){
      var b=e.target.closest('[data-e]');if(!b)return;
      if(b.dataset.e==='close')closeAll();
      else if(b.dataset.e==='share')ttShare(blob,name);
      else if(b.dataset.e==='dl')imgSave(blob,name);
    });
  }catch(e){toast('ساخت عکس انجام نشد؛ دوباره تلاش کن',null,null,'warn')}
  ttBusy=false;if(btn)btn.disabled=false;
}
/* view mode: a saved plan opens read-only; tapping a cell shows its lesson, time and info; "ویرایش برنامه" switches to editing */
function ttSetView(v){
  ttView=!!v;
  if(!ttEl)return;
  ttEl.classList.toggle('tt-view',ttView);
  var inp=ttEl.querySelector('.tt-title');if(inp)inp.readOnly=ttView;
  var s=ttEl.querySelector('.tt-ti small');if(s&&ttView&&!s.textContent)s.textContent='';
  ttRedraw();
}
function ttCellView(rid,d){
  var t=ttGet(),pi=t.rows.findIndex(function(r){return r.id===rid}),row=t.rows[pi];if(!row)return;
  var c=ttCell(t,rid,d),tm=(c&&c.h)||row.l,ds=ttDates(t)[d];
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>'+TT_DAYS[d]+(ds?' · '+esc(ds):'')+'</h2><button type="button" data-e="close">بستن</button></div>'+
    '<div class="ttv">'+
    '<div class="ttv-h"'+(c&&c.c>-1?' style="--tc:'+TT_COL[c.c]+'"':'')+'>'+(c&&c.ic?ttIco(c.ic,'tti ttv-ic'):'')+'<b>'+(c&&c.t?esc(c.t):'خانهٔ خالی')+'</b></div>'+
    '<div class="ttv-r"><span>'+icon('clock','tti')+'ساعت درس: <b>'+esc(tm)+'</b></span><span>پارت '+fa(pi+1)+'</span></div>'+
    '<div class="ttv-i"><small>اطلاعات</small><p>'+(c&&c.n?esc(c.n):'<em>اطلاعاتی برای این خانه نوشته نشده است.</em>')+'</p></div>'+
    '</div><div class="tt-eb"><button type="button" class="tt-btn" data-e="close">بستن</button></div>','اطلاعات خانه');
  sw.w.addEventListener('click',function(e){var b=e.target.closest('[data-e="close"]');if(b)sw.close()});
}
function openTTEditor(view){
  if(ttEl)return;
  var t=ttGet();ttBase=ttSnap();
  var w=document.createElement('div');w.className='tt-page';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','کنکوریا');
  w.innerHTML='<header class="tt-bar"><button type="button" class="round glass" data-tt="close" aria-label="بستن">'+icon('close')+'</button>'+
    '<div class="tt-ti"><div class="tt-tr"><input class="tt-title" type="text" maxlength="40" aria-label="عنوان جدول" placeholder="عنوان جدول"><span class="vbadge">'+icon('star')+'ویژه</span></div><small></small></div>'+
    '<button type="button" class="round glass" data-tt="export" aria-label="خروجی عکس">'+icon('camera')+'</button></header>'+
    '<div class="tt-card"><div class="tt-scroll"></div></div>'+
    '<div class="tt-foot"><button type="button" class="tt-btn pri tt-sv tt-vo" data-tt="edit">'+icon('edit')+'ویرایش برنامه</button><button type="button" class="tt-btn tt-sv tt-ap" data-tt="apply" hidden>'+icon('calendar')+'اعمال کردن برنامه</button><button type="button" class="tt-btn pri tt-sv tt-eo" data-tt="save">'+icon('check')+'ذخیره برنامه</button><button type="button" class="tt-btn" data-tt="export">'+icon('camera')+'خروجی عکس</button><button type="button" class="tt-btn" data-tt="download">'+icon('download')+'دانلود</button><button type="button" class="tt-btn tt-eo" data-tt="parts">'+icon('week')+'تعداد پارت‌ها</button><button type="button" class="tt-btn tt-eo" data-tt="scan">'+icon('camera')+'اسکن عکس</button><button type="button" class="tt-btn bad tt-eo" data-tt="clear">'+icon('trash')+'پاک کردن</button></div>';
  document.body.appendChild(w);ttEl=w;
  document.documentElement.style.overflow='hidden';
  var inp=w.querySelector('.tt-title');inp.value=t.title;
  inp.addEventListener('input',function(){ttGet().title=inp.value.slice(0,40);persist()});
  ttSetView(!!view);
  ttRedraw();
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-tt]');if(!b)return;var a=b.dataset.tt;
    if(ttView&&(a==='cell'||a==='row'||a==='date'||a==='info'||a==='day'||a==='corner'||a==='save'||a==='clear'||a==='scan'||a==='parts')){
      if(a==='cell')ttCellView(b.dataset.r,Number(b.dataset.d));
      return;
    }
    if(a==='close')ttTryClose();
    else if(a==='edit')ttSetView(false);
    else if(a==='save')ttSave();
    else if(a==='cell')ttCellSheet(b.dataset.r,Number(b.dataset.d));
    else if(a==='row')ttRowSheet(b.dataset.r);
    else if(a==='date')ttDateSheet(Number(b.dataset.d));
    else if(a==='info')ttInfoSheet(Number(b.dataset.i));
    else if(a==='day'){var dd=Number(b.dataset.d),tt=ttGet();ttIconSheet('آیکون '+TT_DAYS[dd],tt.dic[dd],function(n){tt.dic[dd]=n})}
    else if(a==='corner'){var cn=Number(b.dataset.n),tc=ttGet();ttIconSheet('آیکون ستون '+(cn?'روز':'تاریخ'),tc.cic[cn],function(n){tc.cic[cn]=n})}
    else if(a==='export')ttExport();
    else if(a==='scan')scPickFile();
    else if(a==='parts')ttPartsSheet();
    else if(a==='download')ttDownload();
    else if(a==='clear')ttClearAll();
    else if(a==='apply')ttApplyPlan();
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
/* ---------- scan a photo of a table: offline text recognition, animation, then a review screen ----------
   Grid = 8 rows (header + 7 days) x 9 columns (date, day, parts 1-7), same as the picture the app exports (right-to-left).
   Other tables work too: line counts are detected; the review screen lets you fix anything before it is applied. */
var scEl=null,scRun=0;
function scImage(file,maxd){
  return new Promise(function(res,rej){
    var u=URL.createObjectURL(file),im=new Image();
    im.onload=function(){
      var k=Math.min(1,maxd/Math.max(im.naturalWidth,im.naturalHeight)),cv=document.createElement('canvas');
      cv.width=Math.max(1,Math.round(im.naturalWidth*k));cv.height=Math.max(1,Math.round(im.naturalHeight*k));
      cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);URL.revokeObjectURL(u);res(cv);
    };
    im.onerror=function(){URL.revokeObjectURL(u);rej(new Error('img'))};
    im.src=u;
  });
}
/* sharper, bigger copy of the picture (used for reading the text) */
function scEnhance(cv){
  var s=Math.max(1,Math.min(3,2600/Math.max(cv.width,cv.height)));
  if(cv.width*cv.height*s*s>6e6)s=Math.max(1,Math.sqrt(6e6/(cv.width*cv.height)));
  if(s<1.15)s=1;
  var E=document.createElement('canvas');E.width=Math.round(cv.width*s);E.height=Math.round(cv.height*s);
  var x=E.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(cv,0,0,E.width,E.height);
  try{
    var B=document.createElement('canvas');B.width=E.width;B.height=E.height;var bx=B.getContext('2d');
    bx.filter='blur('+Math.max(.8,1.1*s)+'px)';bx.drawImage(E,0,0);
    if(bx.filter&&bx.filter!=='none'){
      var a=x.getImageData(0,0,E.width,E.height),b=bx.getImageData(0,0,E.width,E.height),da=a.data,db=b.data,i,v;
      for(i=0;i<da.length;i+=4)for(v=0;v<3;v++){var o=da[i+v],q=o+1.4*(o-db[i+v]);da[i+v]=q<0?0:q>255?255:q}
      x.putImageData(a,0,0);
    }
  }catch(e){}
  return {cv:E,s:s};
}
function scBin(cv){
  var w=cv.width,h=cv.height,d=cv.getContext('2d').getImageData(0,0,w,h).data,g=new Uint8Array(w*h),i,x,y,s;
  for(i=0;i<w*h;i++)g[i]=(d[i*4]*77+d[i*4+1]*150+d[i*4+2]*29)>>8;
  var W=w+1,I=new Uint32Array(W*(h+1));
  for(y=0;y<h;y++){s=0;for(x=0;x<w;x++){s+=g[y*w+x];I[(y+1)*W+x+1]=I[y*W+x+1]+s}}
  var r=Math.max(10,Math.round(Math.min(w,h)/30)),bin=new Uint8Array(w*h);
  for(y=0;y<h;y++){
    var y0=Math.max(0,y-r),y1=Math.min(h,y+r+1);
    for(x=0;x<w;x++){
      var x0=Math.max(0,x-r),x1=Math.min(w,x+r+1),m=(I[y1*W+x1]-I[y0*W+x1]-I[y1*W+x0]+I[y0*W+x0])/((x1-x0)*(y1-y0));
      bin[y*w+x]=g[y*w+x]<m-14?1:0;
    }
  }
  return {w:w,h:h,bin:bin};
}
/* centres of long straight lines (horiz: rows of the picture that are mostly ink) */
function scLines(b,horiz){
  var len=horiz?b.h:b.w,span=horiz?b.w:b.h,p=new Float32Array(len),i,j,c,mx=0;
  for(i=0;i<len;i++){
    c=0;
    if(horiz){for(j=0;j<span;j++)c+=b.bin[i*b.w+j]}else{for(j=0;j<span;j++)c+=b.bin[j*b.w+i]}
    p[i]=c/span;if(p[i]>mx)mx=p[i];
  }
  var thr=Math.max(.22,mx*.6),out=[],s=-1,e=0,gap=0,on;
  for(i=0;i<=len;i++){
    on=i<len&&p[i]>=thr;
    if(on){if(s<0)s=i;gap=0;e=i}
    else if(s>=0){gap++;if(gap>2||i===len){out.push((s+e)/2);s=-1}}
  }
  return out;
}
function scWin(L,n){
  var best=null,bv=1e9,i,j,sp,m,v;
  for(i=0;i+n<L.length;i++){
    sp=[];m=0;
    for(j=0;j<n;j++){sp.push(L[i+j+1]-L[i+j]);m+=sp[j]}
    m/=n;if(m<=0)continue;v=0;
    for(j=0;j<n;j++)v+=(sp[j]-m)*(sp[j]-m);
    v=Math.sqrt(v/n)/m;
    if(v<bv){bv=v;best=L.slice(i,i+n+1)}
  }
  return best?{b:best,v:bv}:null;
}
/* choose the cell boundaries on one axis: real detected lines when they form an even grid, otherwise an even split */
function scAxis(L,cands,total){
  var best=null,i,r;
  cands.forEach(function(n){var q=scWin(L,n);if(q&&q.v<.22&&(!best||q.v<best.v-.03))best={n:n,b:q.b,v:q.v,real:true}});
  if(best)return best;
  var n=cands[0],a=0,b=total,o=[];
  if(L.length>1&&L[L.length-1]-L[0]>total*.4){a=L[0];b=L[L.length-1]}
  for(i=0;i<=n;i++)o.push(a+(b-a)*i/n);
  return {n:n,b:o,v:1,real:false};
}
function scClean(s){
  return String(s||'').replace(/[|\\_~\[\]{}<>«»=¦]/g,' ').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[٠-٩]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.charAt('٠١٢٣٤٥٦٧٨٩'.indexOf(d))}).replace(/[0-9]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.charAt(Number(d))}).replace(/\s*:\s*/g,':').replace(/\s+/g,' ').trim().slice(0,300);
}
function scGood(t,conf){
  if(!t||t.length<2)return false;
  var letters=(t.match(/[؀-ۿA-Za-z0-9]/g)||[]).length;
  return letters>=2&&letters/t.length>=.5&&conf>=20;
}
/* ---- Persian study-plan dictionary: lessons first (they win ties), then the words plans are written with ---- */
var SC_LES='شیمی زیست فیزیک ریاضی ریاضیات زمین جبرانی هندسه حسابان گسسته آمار ادبیات عربی دین زندگی انگلیسی زبان فارسی جبر مثلثات مدرسه کلاس تجربی ورزش استراحت آزمون امتحان مشاوره'.split(' ');
var SC_GEN='فصل مبحث مرور تمرین تدریس تدریسی دیروز امروز فردا جزوه حل حداقل حداکثر تست تستی آموزشی کتاب درسی ادامه انجام تکالیف تکلیف آخرین اولین نوشته نوشته‌های خودت دست های دفترچه از به در با را که این بعد قبل پس برای تا هر بخش درس صفحه سوال سؤال مسائل مسئله مفاهیم خلاصه نکات جمع‌بندی ساعت مطالعه پاسخ تشریحی کنکور سراسری آزمایشگاه حرکت الکتریسیته ترمودینامیک اسید باز گازها آب تابع حد پیوستگی مشتق انتگرال احتمال ماتریس دنباله تحلیلی معادله معادلات نامعادله توان لگاریتم نمایی بردار آرایش الکترونی جدول تناوبی عنصر ترکیب مول استوکیومتری سلول یاخته گیاه ژنتیک تقسیم جانوری گردش خون دستگاه عصبی هورمون دوره پایه دهم یازدهم دوازدهم ترکیبی شنبه یکشنبه دوشنبه سه‌شنبه چهارشنبه پنجشنبه جمعه موفق باشی'.split(' ');
/* letters that the recognition engine mixes up: cheap to swap */
var SC_CONF=['یيىئ','کكگ','هةۀ','تثنبپ','جچحخ','دذ','رز','سش','صض','طظ','عغ','فق','ا‌آأإ','وؤ'];
function scSub(a,b){
  if(a===b)return 0;
  for(var i=0;i<SC_CONF.length;i++)if(SC_CONF[i].indexOf(a)>=0&&SC_CONF[i].indexOf(b)>=0)return .4;
  return 1;
}
function scLev(a,b){
  var m=a.length,n=b.length,i,j,p=[],c;
  if(Math.abs(m-n)>2)return 9;
  for(j=0;j<=n;j++)p[j]=j;
  for(i=1;i<=m;i++){c=[i];for(j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+scSub(a.charAt(i-1),b.charAt(j-1)));p=c}
  return p[n];
}
function scSnap(core){
  var best=null,bd=9,i,d,L=core.length;
  for(i=0;i<SC_LES.length;i++){d=scLev(core,SC_LES[i])-.35;if(d<bd){bd=d;best=SC_LES[i]}}
  for(i=0;i<SC_GEN.length;i++){d=scLev(core,SC_GEN[i]);if(d<bd){bd=d;best=SC_GEN[i]}}
  return best&&bd<=(L<=3?.7:L<=5?1:1.5)?best:core;
}
function scFixWord(w){
  var m=w.match(/^([^؀-ۿA-Za-z]*)([؀-ۿ‌]+)([^؀-ۿ]*)$/);
  if(!m)return w;
  var core=m[2];
  if(core.length<2||SC_LES.indexOf(core)>=0||SC_GEN.indexOf(core)>=0)return w;
  return m[1]+scSnap(core)+m[3];
}
function scSpace(t){return t.replace(/([^\s۰-۹:+(])([۰-۹])/g,'$1 $2').replace(/([۰-۹])([^\s۰-۹:+)])/g,'$1 $2').replace(/\s+/g,' ').trim()}
function scFix(t){return scSpace(t).split(' ').map(scFixWord).join(' ')}
/* the first line of a cell is the lesson: "lesson grade : chapter n" written the same way everywhere */
function scHead(t){
  var f=scFix(t),m=f.match(/^(\S+?)\s*([۰-۹]{1,2})?\s*[:：]\s*(?:فصل\s*)?([۰-۹]{1,2})\s*$/);
  if(m&&SC_LES.indexOf(m[1])>=0)return m[1]+(m[2]?' '+m[2]:'')+': فصل '+m[3];
  return f;
}
/* the 7x7 values [day][part] out of the day x column matrix; rtl = part 1 is the right-most column */
function scMap(raw,n,rtl){
  var out=[],d,p,c,cell;
  for(d=0;d<7;d++){
    out[d]=[];
    for(p=0;p<7;p++){
      c=rtl?n-1-p:p;
      cell=(raw[d]&&c>=0&&c<n)?raw[d][c]:null;
      out[d][p]=cell||{t:'',q:100};
    }
  }
  return out;
}
/* ---- table geometry ---- */
function scSegs(L){var o=[],i;for(i=0;i+1<L.length;i++)if(L[i+1]-L[i]>6)o.push([L[i],L[i+1]]);return o}
/* the part columns = the longest run of columns with the same width (the narrow date/day columns are left out) */
function scParts(V){
  var S=scSegs(V),best=null,i,j,w0,len;
  for(i=0;i<S.length;i++){
    w0=S[i][1]-S[i][0];j=i;
    while(j+1<S.length&&Math.abs((S[j+1][1]-S[j+1][0])-w0)<=w0*.22)j++;
    len=j-i+1;
    if(!best||len>best.len||(len===best.len&&w0>best.w))best={i:i,j:j,len:len,w:w0};
  }
  if(!best||best.len<3)return null;
  return {segs:S.slice(best.i,best.j+1),rtl:(S.length-1-best.j)>=best.i};
}
/* the 7 day rows: tall rows (a thin time row sits above each day row in some tables) */
function scDayRows(H){
  var S=scSegs(H);if(S.length<7)return null;
  var hs=S.map(function(q){return q[1]-q[0]}).sort(function(a,b){return b-a}),ref=hs[Math.min(6,hs.length-1)];
  var tall=S.filter(function(q){return q[1]-q[0]>=ref*.6}),thin=S.length-tall.length;
  if(tall.length>7&&thin>=3)tall=tall.filter(function(q){return q[1]-q[0]<=ref*1.6});
  if(tall.length<7)return null;
  return thin>=3?tall.slice(0,7):tall.slice(tall.length-7);
}
/* line runs (y ranges) of the dark pixels inside a cell: the quiet rows between two text lines split them */
function scInkLines(b,x0,y0,x1,y1){
  var w=x1-x0,h=y1-y0,rows=[],y,x,c,mx=0;
  for(y=0;y<h;y++){c=0;for(x=3;x<w-3;x++)c+=b.bin[(y0+y)*b.w+x0+x];rows.push(c);if(c>mx)mx=c}
  if(mx<3)return [];
  var th=Math.max(3,mx*.07),runs=[],s=-1,i;
  for(y=0;y<=h;y++){
    var on=y<h&&rows[y]>th;
    if(on){if(s<0)s=y}
    else if(s>=0){if(y-1-s>=2)runs.push([s,y-1]);s=-1}
  }
  for(i=0;i<runs.length;i++){ /* take in the faint rows at the edges of a line (dots, tails of short words) without touching the next line */
    var lo=i?runs[i-1][1]+2:0,hi=i+1<runs.length?runs[i+1][0]-2:h-1;
    while(runs[i][0]>lo&&rows[runs[i][0]-1]>=2)runs[i][0]--;
    while(runs[i][1]<hi&&rows[runs[i][1]+1]>=2)runs[i][1]++;
    runs[i][0]=Math.max(lo,runs[i][0]-3);runs[i][1]=Math.min(hi,runs[i][1]+1); /* dots above letters sit apart from the line */
  }
  var big=runs.map(function(q){return q[1]-q[0]+1}).filter(function(v){return v>=8}).sort(function(a,b2){return a-b2}),ht=big.length?big[big.length>>1]:0;
  if(ht)for(i=0;i+1<runs.length;){
    var h1=runs[i][1]-runs[i][0]+1,h2=runs[i+1][1]-runs[i+1][0]+1,mh=runs[i+1][1]-runs[i][0]+1;
    if((h1<ht*.45||h2<ht*.45)&&mh<=ht*1.35){runs[i]=[runs[i][0],runs[i+1][1]];runs.splice(i+1,1)}else i++;
  }
  return runs;
}
/* black text on white, bigger: what the recognition engine reads best */
function scPrep(cv,sx,sy,sw,sh,k){
  var oc=document.createElement('canvas'),pad=10;
  oc.width=Math.max(8,Math.round(sw*k))+pad*2;oc.height=Math.max(8,Math.round(sh*k))+pad*2;
  var cx=oc.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,oc.width,oc.height);
  cx.imageSmoothingEnabled=true;cx.imageSmoothingQuality='high';
  cx.drawImage(cv,sx,sy,sw,sh,pad,pad,oc.width-pad*2,oc.height-pad*2);
  var im=cx.getImageData(0,0,oc.width,oc.height),d=im.data,n=oc.width*oc.height,g=new Uint8Array(n),i,hist=new Uint32Array(256),lo=0,hi=255,acc=0;
  for(i=0;i<n;i++){g[i]=(d[i*4]*77+d[i*4+1]*150+d[i*4+2]*29)>>8;hist[g[i]]++}
  for(i=0;i<256;i++){acc+=hist[i];if(acc>=n*.03){lo=i;break}}
  acc=0;for(i=255;i>=0;i--){acc+=hist[i];if(acc>=n*.5){hi=i;break}}
  if(hi-lo<30){hi=Math.min(255,lo+30)}
  for(i=0;i<n;i++){var v=Math.max(0,Math.min(255,Math.round((g[i]-lo)*255/(hi-lo))));d[i*4]=d[i*4+1]=d[i*4+2]=v;d[i*4+3]=255}
  cx.putImageData(im,0,0);
  return oc;
}
/* tells exactly which recognition file is missing from this build (instead of a vague failure) */
async function scCheck(base){
  var miss=[],f,ok=async function(u){try{var r=await fetch(u);var ct=r.headers.get('content-type')||'';var good=r.ok&&!/text\/html/.test(ct);if(r.body&&r.body.cancel)r.body.cancel();return good}catch(e){return false}};
  for(f of ['tesseract.min.js','worker.min.js','lang/fas.traineddata.gz']){if(!(await ok(base+f)))miss.push(f)}
  if(!(await ok(base+'tesseract-core-simd-lstm.wasm.js'))&&!(await ok(base+'tesseract-core-lstm.wasm.js')))miss.push('tesseract-core-lstm.wasm.js');
  if(miss.length)throw new Error('ocr-missing:'+miss.join(' , '));
}
var scMode=null;
var SC_CDN_JS='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js',SC_CDN_LANG='https://cdn.jsdelivr.net/npm/@tesseract.js-data/fas/4.0.0_best_int';
function scLoadJs(src){
  return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=function(){s.remove();rej(new Error('load'))};document.head.appendChild(s)});
}
/* 1) files bundled in www/ocr (fully offline)  2) otherwise the engine + Persian file from the internet (downloaded once, then cached by the browser) */
async function scWorker(onLog){
  var base=new URL('ocr/',location.href).href,opt={logger:onLog,gzip:true};
  if(!scMode){
    try{await scCheck(base);scMode='local'}catch(e){scMode='cdn'}
  }
  if(scMode==='local'){
    if(!window.Tesseract)await scLoadJs(base+'tesseract.min.js');
    opt.workerPath=base+'worker.min.js';opt.corePath=base;opt.langPath=base+'lang';opt.workerBlobURL=false;
  }else{
    if(!window.Tesseract){
      try{await scLoadJs(SC_CDN_JS)}catch(e){scMode=null;throw new Error('ocr-offline')}
    }
    opt.langPath=SC_CDN_LANG;
  }
  var w;
  try{w=await window.Tesseract.createWorker('fas',1,opt)}
  catch(e){if(scMode==='cdn'){scMode=null;window.Tesseract=null;throw new Error('ocr-offline')}throw e}
  await w.setParameters({tessedit_pageseg_mode:'6',preserve_interword_spaces:'1'});
  return w;
}
function scPickFile(){
  if(scEl)return;
  var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.style.display='none';
  inp.addEventListener('change',function(){var f=inp.files&&inp.files[0];inp.remove();if(f)scStart(f)});
  document.body.appendChild(inp);inp.click();
}
async function scStart(file){
  var worker=null,dead=false;
  var w=document.createElement('div');w.className='sc-page';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','اسکن جدول');
  w.innerHTML='<header class="sc-top"><button type="button" class="round glass" data-sc="cancel" aria-label="بستن">'+icon('close')+'</button><h2>اسکن عکس جدول</h2><span></span></header>'+
    '<div class="sc-body"><div class="sc-stage"><img alt="عکس جدول"><canvas class="sc-ov"></canvas><i class="sc-line"></i></div><div class="sc-st" aria-live="polite">در حال آماده‌سازی…</div><div class="sc-bar"><i></i></div></div>';
  document.body.appendChild(w);scEl=w;
  function stop(){dead=true;if(worker){try{worker.terminate()}catch(e){}worker=null}if(w.isConnected)w.remove();if(scEl===w)scEl=null}
  w.querySelector('[data-sc="cancel"]').addEventListener('click',stop);
  var st=w.querySelector('.sc-st'),bar=w.querySelector('.sc-bar i'),img=w.querySelector('img'),ov=w.querySelector('.sc-ov');
  function say(t,p){st.textContent=t;if(p!=null)bar.style.width=Math.round(p*100)+'%'}
  function tick(){return new Promise(function(r){setTimeout(r,40)})}
  try{
    var cv=await scImage(file,1600);if(dead)return;
    await new Promise(function(r){img.onload=r;img.src=cv.toDataURL('image/jpeg',.85)});
    ov.width=cv.width;ov.height=cv.height;
    say('در حال پیدا کردن خطوط جدول…',.05);await tick();if(dead)return;
    say('در حال باکیفیت کردن عکس…',.04);await tick();
    var E=scEnhance(cv);if(dead)return;
    await new Promise(function(r){img.onload=r;img.src=E.cv.toDataURL('image/jpeg',.9)});
    say('در حال پیدا کردن خطوط جدول…',.07);await tick();if(dead)return;
    var b=scBin(cv),HL=scLines(b,true),VL=scLines(b,false),octx=ov.getContext('2d'),exact=true;
    var pc=scParts(VL),dr=scDayRows(HL),X,Y,rtl=true;
    if(pc){X=pc.segs;rtl=pc.rtl}
    else{ /* no clear column lines: 9 even columns, the 7 part columns are the left ones */
      var ax=scAxis(VL,[9,8,7,10],cv.width),ys=[],i;exact=false;
      for(i=0;i<Math.min(7,ax.n);i++)ys.push([ax.b[i],ax.b[i+1]]);X=ys;
    }
    if(dr)Y=dr;
    else{
      var ay=scAxis(HL,[8,7,9],cv.height),zs=[];exact=false;
      for(i=Math.max(0,ay.n-7);i<ay.n;i++)zs.push([ay.b[i],ay.b[i+1]]);Y=zs;
    }
    var n=X.length;
    octx.lineWidth=Math.max(2,cv.width/400);octx.strokeStyle='rgba(47,139,255,.95)';
    Y.forEach(function(y){X.forEach(function(x){octx.strokeRect(x[0],y[0],x[1]-x[0],y[1]-y[0])})});
    say('در حال آماده‌سازی موتور تشخیص متن…',.1);await tick();if(dead)return;
    worker=await scWorker(function(m){if(!dead&&m&&m.status&&/language/.test(m.status)&&typeof m.progress==='number')say('در حال بارگیری زبان فارسی…',.1+.05*m.progress)});
    if(dead){stop();return}
    var psm='6';
    async function mode(m){if(psm!==m){await worker.setParameters({tessedit_pageseg_mode:m});psm=m}}
    async function read(oc){
      var rs=await worker.recognize(oc);
      return {t:scClean(rs&&rs.data&&rs.data.text),q:(rs&&rs.data&&rs.data.confidence)||0};
    }
    var raw=[],total=Y.length*n,done=0,r,c;
    for(r=0;r<Y.length&&!dead;r++){
      raw[r]=[];
      for(c=0;c<n&&!dead;c++){
        var ix=3,x0=Math.round(X[c][0])+ix,x1=Math.round(X[c][1])-ix,y0=Math.round(Y[r][0])+ix,y1=Math.round(Y[r][1])-ix,cell={t:'',q:100};
        if(x1-x0>8&&y1-y0>8){
          var runs=scInkLines(b,x0,y0,x1,y1);
          if(runs.length){
            try{
              var hs=runs.map(function(q){return q[1]-q[0]+1}).sort(function(a,b2){return a-b2}),med=hs[hs.length>>1],blk=runs.length>7||hs[hs.length-1]>med*2.4||med>60;
              var parts=[],qs=[];
              if(!blk){
                await mode('7');
                for(var li=0;li<runs.length;li++){
                  var ry0=y0+runs[li][0],ry1=y0+runs[li][1]+1,hh=ry1-ry0,k=Math.max(1,Math.min(5,34/Math.max(8,(runs[li][1]-runs[li][0]+1)*E.s)));
                  var rs1=await read(scPrep(E.cv,x0*E.s,Math.max(0,ry0)*E.s,(x1-x0)*E.s,hh*E.s,k));
                  if(scGood(rs1.t,rs1.q)){parts.push(rs1.t);qs.push(rs1.q)}
                }
              }else{
                await mode('6');
                var k2=Math.max(1,Math.min(4,34/Math.max(8,med*E.s))),rs2=await read(scPrep(E.cv,x0*E.s,y0*E.s,(x1-x0)*E.s,(y1-y0)*E.s,k2));
                if(scGood(rs2.t,rs2.q)){parts.push(rs2.t);qs.push(rs2.q)}
              }
              parts=parts.map(function(x,ix){return ix?scFix(x):scHead(x)});
              if(parts.length)cell={t:parts[0]+(parts.length>1?'\n'+parts.slice(1).join(' '):''),q:Math.min.apply(null,qs)};
            }catch(e2){}
          }
        }
        raw[r][c]=cell;done++;
        octx.fillStyle=cell.t?'rgba(34,180,91,.32)':'rgba(120,130,160,.16)';octx.fillRect(x0,y0,x1-x0,y1-y0);
        say('در حال اسکن و خواندن خانه‌ها… '+fa(done)+' از '+fa(total),.15+.8*done/total);
      }
    }
    if(dead)return;
    try{await worker.terminate()}catch(e3){}worker=null;
    say('اسکن تمام شد',1);await new Promise(function(r){setTimeout(r,450)});
    if(dead)return;
    scReview(w,raw,n,exact,rtl);
  }catch(err){
    var m=String(err&&err.message||err);
    if(!dead){
      toast(/ocr-offline|ocr-missing/i.test(m)?'برای اولین اسکن یک بار اینترنت لازم است (موتور تشخیص متن فارسی دانلود می‌شود). به اینترنت وصل شو و دوباره اسکن کن':'اسکن انجام نشد ('+m.slice(0,90)+')',null,null,'warn');
      stop();
    }
  }
}
function scReview(w,raw,n,exact,rtl0){
  var rtl=rtl0!==false,body=w.querySelector('.sc-body'),vals=scMap(raw,n,rtl);
  function grid(){
    var h='<div class="sc-g"><div class="sc-h"></div>',p,d;
    for(p=0;p<7;p++)h+='<div class="sc-h">پارت '+fa(p+1)+'</div>';
    for(d=0;d<7;d++){
      h+='<div class="sc-d">'+TT_DAYS[d]+'</div>';
      for(p=0;p<7;p++){var v=vals[d][p];h+='<textarea class="sc-c'+(v.t&&v.q<60?' low':'')+'" rows="3" maxlength="380" data-d="'+d+'" data-p="'+p+'" aria-label="'+TT_DAYS[d]+' پارت '+fa(p+1)+'">'+esc(v.t)+'</textarea>'}
    }
    return h+'</div>';
  }
  function count(){var n=0;vals.forEach(function(r){r.forEach(function(v){if(v.t)n++})});return n}
  function paint(){
    body.innerHTML='<p class="sc-note">'+(count()?fa(count())+' خانه خوانده شد. ':'چیزی خوانده نشد. ')+'خانه‌های زردرنگ را بیشتر نگاه کن، چون تشخیص‌شان کم‌اطمینان‌تر بود. هر خانه را می‌شود همین‌جا درست کرد.'+(exact?'':' خطوط جدول در عکس دقیق پیدا نشد و خانه‌ها یک‌اندازه فرض شدند؛ اگر جای نوشته‌ها اشتباه است، عکس را صاف‌تر و از نزدیک‌تر بگیر.')+'</p>'+
      '<div class="sc-sc">'+grid()+'</div>'+
      '<div class="sc-act"><button type="button" class="tt-btn pri" data-sc="apply">'+icon('check')+'اعمال روی جدول</button>'+
      '<button type="button" class="tt-btn" data-sc="flip">'+icon('edit')+'ترتیب پارت‌ها برعکس است</button>'+
      '<button type="button" class="tt-btn bad" data-sc="cancel">انصراف</button></div>';
  }
  paint();
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-sc]');if(!b)return;var a=b.dataset.sc;
    if(a==='cancel'){w.remove();if(scEl===w)scEl=null}
    else if(a==='flip'){rtl=!rtl;vals=scMap(raw,n,rtl);paint();toast(rtl?'ترتیب راست‌به‌چپ':'ترتیب چپ‌به‌راست',null,null,'info')}
    else if(a==='apply'){
      var tas=w.querySelectorAll('textarea.sc-c'),t=ttGet(),old=JSON.stringify(t.cells),n=0;
      [].forEach.call(tas,function(ta){
        var ls=String(ta.value).split(/\n/).map(scClean).filter(Boolean);if(!ls.length)return;
        var row=t.rows[Number(ta.dataset.p)];if(!row)return;
        var k=row.id+'_'+ta.dataset.d,c=t.cells[k]&&typeof t.cells[k]==='object'?t.cells[k]:{};
        c.t=ls[0].slice(0,80);if(ls.length>1)c.n=ls.slice(1).join(' ').slice(0,300);t.cells[k]=c;n++;
      });
      persist();ttRedraw();w.remove();if(scEl===w)scEl=null;
      toast(n?fa(n)+' خانه در جدول گذاشته شد':'خانه‌ای برای گذاشتن نبود',n?'بازگردانی':null,n?function(){t.cells=JSON.parse(old);persist();ttRedraw()}:null,n?'ok':'info');
    }
  });
}

/* ---------- Konkuria: many saved plans, one per student ----------
   profile.tt     = the plan being edited right now (working copy)
   profile.ttp    = saved plans [{id,name,upd,data}]  (name = the student's name)
   profile.ttCur  = id of the saved plan that profile.tt was opened from (null = new, unsaved) */
var ttBase='',ttLs=null,ttView=false;
function ttpClean(a){
  if(!Array.isArray(a))return [];
  var seen={};
  return a.filter(function(p){
    if(!p||typeof p!=='object'||typeof p.id!=='string'||!p.id||seen[p.id])return false;
    if(!p.data||typeof p.data!=='object'||!Array.isArray(p.data.rows))return false;
    seen[p.id]=1;return true;
  }).slice(0,300).map(function(p){
    var d=p.data;
    if(!d.cells||typeof d.cells!=='object')d.cells={};
    if(!d.info||typeof d.info!=='object')d.info={};
    return {id:p.id.slice(0,40),name:String(p.name||'').slice(0,80),upd:Number(p.upd)||Date.now(),data:d};
  });
}
function ttPlans(){var p=state.profile;if(!Array.isArray(p.ttp))p.ttp=[];return p.ttp}
function ttClone(o){return JSON.parse(JSON.stringify(o))}
function ttSnap(){return JSON.stringify(ttGet())}
function ttHasRaw(t){return !!(t&&typeof t==='object'&&((t.cells&&Object.keys(t.cells).length)||(t.info&&Object.keys(t.info).length)))}
function ttName(t){var f=ttInfo(t,1);return f&&f.t?f.t:''}
/* search ignores Arabic/Persian letter and digit variants, spaces and half-spaces */
function ttNorm(s){
  return String(s||'').toLowerCase().replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[\u200c\u200e\u200f\s]+/g,' ').trim();
}
function ttDirty(){
  if(!ttEl)return false;
  var t=ttGet();
  return ttSnap()!==ttBase&&(ttHasRaw(t)||!!state.profile.ttCur);
}
function ttCommit(name){
  var t=ttGet(),pl=ttPlans(),cur=state.profile.ttCur,p=cur?pl.find(function(x){return x.id===cur}):null;
  if(name){var f=t.info[1];t.info[1]=(f&&typeof f==='object')?Object.assign({},f,{t:name}):{t:name,i:'',ic:'',z:1,s:1,x:0,y:0}}
  var nm=ttName(t);
  if(p){p.name=nm;p.upd=Date.now();p.data=ttClone(t)}
  else{p={id:uid(),name:nm,upd:Date.now(),data:ttClone(t)};pl.push(p);state.profile.ttCur=p.id}
  ttBase=ttSnap();persist();ttSetView(true);
  toast('برنامه‌ی «'+nm+'» ذخیره شد',null,null,'ok');
}
function ttNameSheet(cb){
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>نام دانش‌آموز</h2><button type="button" data-e="close">بستن</button></div>'+
    '<p class="hint2" style="margin:4px 2px 12px;color:var(--fg2);font-size:13.5px;line-height:1.8">برنامه به این نام ذخیره می‌شود و بعداً با جستجوی همین نام پیدا می‌شود.</p>'+
    '<input class="field" id="ttNm" type="text" maxlength="80" placeholder="نام و نام خانوادگی دانش‌آموز" aria-label="نام دانش‌آموز">'+
    '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="ok">ذخیره برنامه</button><button type="button" class="tt-btn" data-e="close">انصراف</button></div>','نام دانش‌آموز');
  var w=sw.w,inp=w.querySelector('#ttNm');
  function ok(){var v=inp.value.trim().slice(0,80);if(!v){toast('نام دانش‌آموز را بنویس',null,null,'warn');return}sw.close();cb(v)}
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();ok()}});
  w.addEventListener('click',function(e){var b=e.target.closest('[data-e]');if(!b)return;if(b.dataset.e==='close')sw.close();else if(b.dataset.e==='ok')ok()});
  setTimeout(function(){try{inp.focus({preventScroll:true})}catch(e){}},380);
}
/* save the open plan under the student's name (asks for the name if the name cell is empty) */
function ttSave(after){
  if(!ttEl)return;
  if(!ttName(ttGet())){ttNameSheet(function(n){ttCommit(n);if(after)after()});return}
  ttCommit('');if(after)after();
}
function ttTryClose(){
  if(!ttDirty()){closeTT();return}
  askConfirm({title:'تغییرات ذخیره نشده',msg:state.profile.ttCur?'اگر ذخیره نکنی، تغییرات این بار در برنامه‌ی ذخیره‌شده نمی‌آید.':'اگر ذخیره نکنی، این برنامه فقط به‌عنوان پیش‌نویس در فهرست می‌ماند.',
    btns:[{t:'ذخیره و بستن',cls:'pri',fn:function(){ttSave(closeTT)}},{t:'بستن بدون ذخیره',cls:'bad',fn:closeTT}]});
}
function ttDraft(){var t=state.profile.tt;return (!state.profile.ttCur&&ttHasRaw(t))?t:null}
/* opening another plan would replace an unsaved draft: ask first */
function ttGuard(fn){
  if(!ttDraft()){fn();return}
  askConfirm({title:'برنامه‌ی ذخیره‌نشده',msg:'برنامه‌ای که ذخیره نکرده‌ای پاک می‌شود. ادامه می‌دهی؟',btns:[{t:'ادامه',cls:'bad',fn:fn}]});
}
function ttOpenPlan(id){
  var p=ttPlans().find(function(x){return x.id===id});if(!p)return;
  ttGuard(function(){state.profile.tt=ttClone(p.data);state.profile.ttCur=id;persist();openTTEditor(true)});
}
function ttStartNew(name){
  ttGuard(function(){
    state.profile.tt=ttDef();state.profile.ttCur=null;
    if(name)ttGet().info[1]={t:String(name).slice(0,80),i:'',ic:'',z:1,s:1,x:0,y:0};
    persist();openTTEditor(false);
  });
}
function ttDelPlan(id){
  var pl=ttPlans(),i=pl.findIndex(function(x){return x.id===id});if(i<0)return;var p=pl[i];
  askConfirm({title:'حذف برنامه‌ی «'+(p.name||'بدون نام')+'»؟',msg:'این برنامه از فهرست پاک می‌شود. بعد از حذف چند ثانیه فرصت داری بازگردانی کنی.',btns:[{t:'حذف برنامه',cls:'bad',fn:function(){
    var l=ttPlans(),j=l.findIndex(function(x){return x.id===id});if(j<0)return;
    l.splice(j,1);
    if(state.profile.ttCur===id){state.profile.ttCur=null;state.profile.tt=null}
    persist();ttListPaint();
    toast('برنامه حذف شد','بازگردانی',function(){var q=ttPlans();if(!q.some(function(x){return x.id===id})){q.splice(Math.min(j,q.length),0,p);persist();ttListPaint()}},'del');
  }}]});
}
function ttDelDraft(){
  askConfirm({title:'پاک کردن برنامه‌ی ذخیره‌نشده؟',msg:'این برنامه هنوز ذخیره نشده و بعد از پاک شدن برنگشتنی است.',btns:[{t:'پاک کردن',cls:'bad',fn:function(){state.profile.tt=null;state.profile.ttCur=null;persist();ttListPaint()}}]});
}
function ttCardHtml(t,nm,upd,id,draft){
  var ph=ttInfo(t,0),n=0,dt='';
  (t.rows||[]).forEach(function(r){for(var d=0;d<7;d++){var c=ttCell(t,r.id,d);if(c&&c.t)n++}});
  if(upd){try{dt=mk({year:'numeric',month:'long',day:'numeric'}).format(new Date(upd))}catch(e){}}
  var label=nm||'بدون نام';
  return '<div class="ttl-card glass" role="listitem"><button type="button" class="ttl-main" data-ttl="'+(draft?'draft':'open')+'" data-id="'+esc(id)+'">'+
    '<span class="ttl-av">'+(ph&&ph.i?'<img alt="" src="'+esc(ph.i)+'">':icon('user'))+'</span>'+
    '<span class="ttl-tx"><b>'+esc(label)+(draft?'<span class="ttl-tag">ذخیره‌نشده</span>':'')+'</b>'+
    '<small>'+esc(t.title||'برنامه کنکوریا')+'</small>'+
    '<small>'+(n?fa(n)+' خانه پر شده':'خالی')+(dt?' · '+esc(dt):'')+'</small></span></button>'+
    '<button type="button" class="ttl-del" data-ttl="'+(draft?'deld':'del')+'" data-id="'+esc(id)+'" aria-label="حذف برنامه '+esc(label)+'">'+icon('trash')+'</button></div>';
}
function ttListPaint(){
  var w=ttLs;if(!w)return;
  var raw=w.querySelector('.ttl-q').value,q=ttNorm(raw),all=ttPlans().slice().sort(function(a,b){return b.upd-a.upd}),
    hit=q?all.filter(function(p){return ttNorm(p.name).indexOf(q)>-1}):all,dr=ttDraft(),h='';
  if(dr&&(!q||ttNorm(ttName(dr)).indexOf(q)>-1))h+=ttCardHtml(dr,ttName(dr),0,'draft',true);
  hit.forEach(function(p){h+=ttCardHtml(p.data,p.name,p.upd,p.id,false)});
  if(!h){
    if(q)h='<div class="ttl-empty"><p>برنامه‌ای با این نام پیدا نشد.</p><button type="button" class="tt-btn pri" data-ttl="newq">'+icon('plus')+'ساخت برنامه برای «'+esc(raw.trim())+'»</button></div>';
    else h='<div class="ttl-empty"><p>هنوز برنامه‌ای ذخیره نکرده‌ای.<br>برای هر دانش‌آموز یک برنامه بنویس؛ به نام خودش ذخیره می‌شود.</p><button type="button" class="tt-btn pri" data-ttl="new">'+icon('plus')+'ساخت اولین برنامه</button></div>';
  }
  w.querySelector('.ttl-ls').innerHTML=h;
  var n=all.length,s=w.querySelector('.tt-ti small');
  if(s)s.textContent=q?(fa(hit.length)+' نتیجه'):(n?fa(n)+' برنامه ذخیره‌شده':'برنامه‌ی دانش‌آموزان');
}
function openTTList(){
  if(ttLs)return;
  var w=document.createElement('div');w.className='tt-page tt-list';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','برنامه‌های کنکوریا');
  w.innerHTML='<header class="tt-bar"><button type="button" class="round glass" data-ttl="close" aria-label="بستن">'+icon('close')+'</button>'+
    '<div class="tt-ti"><div class="tt-tr"><b class="ttl-h">کنکوریا</b><span class="vbadge">'+icon('star')+'ویژه</span></div><small></small></div>'+
    '<button type="button" class="round glass" data-ttl="new" aria-label="برنامه‌ی جدید">'+icon('plus')+'</button></header>'+
    '<div class="ttl-qw">'+icon('search')+'<input class="field ttl-q" type="search" enterkeyhint="search" autocomplete="off" placeholder="جستجوی نام دانش‌آموز" aria-label="جستجوی نام دانش‌آموز"></div>'+
    '<div class="ttl-ls" role="list"></div>';
  document.body.appendChild(w);ttLs=w;
  document.documentElement.style.overflow='hidden';
  w.querySelector('.ttl-q').addEventListener('input',ttListPaint);
  w.querySelector('.ttl-q').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();e.target.blur()}});
  ttListPaint();
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-ttl]');if(!b)return;var a=b.dataset.ttl;
    if(a==='close')closeTTList();
    else if(a==='open')ttOpenPlan(b.dataset.id);
    else if(a==='draft')openTTEditor(false);
    else if(a==='new')ttStartNew();
    else if(a==='newq')ttStartNew(w.querySelector('.ttl-q').value.trim());
    else if(a==='del')ttDelPlan(b.dataset.id);
    else if(a==='deld')ttDelDraft();
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
function closeTTList(){
  var w=ttLs;if(!w)return;ttLs=null;
  w.classList.remove('open');if(!ttEl)document.documentElement.style.overflow='';
  setTimeout(function(){w.remove()},350);
  if(ui.tab==='account'||ui.tab==='week'||ui.tab==='kk')render();
}
function closeTT(){
  var w=ttEl;if(!w)return;ttEl=null;
  w.classList.remove('open');document.documentElement.style.overflow=ttLs?'hidden':'';
  setTimeout(function(){w.remove()},350);
  ttListPaint();
  if(ui.tab==='account'||ui.tab==='week'||ui.tab==='kk')render();
}
actions.openTT=openTTList;

/* ---------- Konkooria tab: study hours (hours/minutes per day, smart totals) ----------
   Data lives in state.profile.kk = {goal:minutes, subs:[custom subjects], d:{'YYYY-MM-DD':[{id,m,s,a,b,n,ts}]}}
   m = minutes, s = subject, a/b = optional start/end (HH:MM), n = note. It is saved and backed up with the profile. */
var KK_SUBS=['ریاضی','فیزیک','شیمی','زیست','ادبیات','عربی','زبان','دینی','زمین‌شناسی','آزمون'];
var KK_GOALS=[60,120,180,240,300,360,480,600];
var KK_WD=['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'];
ui.ksec='day';ui.kr='7';ui.kd=null;
function kkD(){var p=state.profile;if(!p.kk||typeof p.kk!=='object')p.kk=kkClean(null);return p.kk}
function kkList(k){return kkD().d[k]||[]}
function kkSubs(){return KK_SUBS.concat(kkD().subs.filter(function(s){return KK_SUBS.indexOf(s)<0}))}
function kkTm(v){var p=String(v).split(':');return (+p[0])*60+(+p[1])}
function kkNum(v){
  var s=String(v).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)});
  return parseInt(s.replace(/[^\d]/g,''),10)||0;
}
function kkFmt(m){m=Math.max(0,Math.round(m));var h=Math.floor(m/60),r=m%60,a=[];if(h)a.push(fa(h)+' ساعت');if(r||!h)a.push(fa(r)+' دقیقه');return a.join(' و ')}
function kkShort(m){m=Math.max(0,Math.round(m));var h=Math.floor(m/60),r=m%60;return h?(r?fa(h)+'س '+fa(r)+'د':fa(h)+'س'):fa(r)+'د'}
function kkHrs(m){return fa((m/60).toFixed(1)).replace('.','٫')}
function kkCol(s){
  if(!s)return '#8e8e93';
  var i=KK_SUBS.indexOf(s);if(i>-1)return SWATCH[i%SWATCH.length];
  var h=0;for(i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;
  return SWATCH[h%SWATCH.length];
}
/* Smart total of one day: sessions that have start/end times and overlap are counted once; the rest are summed. */
function kkCalc(list){
  var iv=[],plain=0,raw=0,lg=0;
  list.forEach(function(s){raw+=s.m;if(s.m>lg)lg=s.m;if(s.a){var a=kkTm(s.a);iv.push([a,a+s.m])}else plain+=s.m});
  iv.sort(function(x,y){return x[0]-y[0]});
  var u=0,cs=-1,ce=-1;
  iv.forEach(function(x){if(x[0]>ce){if(ce>cs)u+=ce-cs;cs=x[0];ce=x[1]}else if(x[1]>ce)ce=x[1]});
  if(ce>cs)u+=ce-cs;
  var t=Math.min(1440,plain+u);
  return {t:t,raw:raw,n:list.length,lg:lg,ov:Math.max(0,raw-t)};
}
function kkDay(k){return kkCalc(kkList(k)).t}
function kkRange(N,off){
  var td=todayKey(),o={days:[],tot:0,best:0,bestK:'',act:0,hit:0,subs:{}},goal=kkD().goal,i,k;
  for(i=N-1;i>=0;i--){
    k=addDays(td,-(i+off));
    var l=kkList(k),c=kkCalc(l);
    o.days.push({k:k,t:c.t});o.tot+=c.t;
    if(c.t>0)o.act++;
    if(c.t>=goal)o.hit++;
    if(c.t>o.best){o.best=c.t;o.bestK=k}
    l.forEach(function(s){var n=s.s||'';o.subs[n]=(o.subs[n]||0)+s.m});
  }
  return o;
}
function kkStreak(){
  var td=todayKey(),k=kkDay(td)>0?td:addDays(td,-1),n=0;
  while(kkDay(k)>0&&n<5000){n++;k=addDays(k,-1)}
  return n;
}
function kkPut(day,s){var d=kkD().d;if(!d[day])d[day]=[];d[day].push(s)}
function kkFull(day){if(kkList(day).length>=60){toast('در هر روز تا ۶۰ جلسه می‌شود ثبت کرد',null,null,'warn');return true}return false}
function kkSubBars(map){
  var arr=Object.keys(map).map(function(n){return {n:n,m:map[n]}}).filter(function(x){return x.m>0}).sort(function(a,b){return b.m-a.m});
  if(!arr.length)return '';
  var mx=arr[0].m,sum=arr.reduce(function(a,x){return a+x.m},0);
  return '<div class="glass chart kk-subs">'+arr.map(function(x){
    return '<div class="kk-sbr" style="--cc:'+kkCol(x.n)+'"><div class="kk-h"><span>'+esc(x.n||'بدون درس')+'</span><small>'+kkFmt(x.m)+' · '+fa(Math.round(x.m/sum*100))+'٪</small></div><div class="kk-tr"><i style="width:'+Math.max(4,Math.round(x.m/mx*100))+'%"></i></div></div>';
  }).join('')+'</div>';
}
function kkTips(a){
  if(!a.length)return '';
  return '<div class="kk-tips">'+a.map(function(t){return '<div class="kk-tip">'+icon('bulb')+'<span>'+t+'</span></div>'}).join('')+'</div>';
}
function kkDayHTML(k,td){
  var l=kkList(k),c=kkCalc(l),goal=kkD().goal,pct=goal?Math.min(1,c.t/goal):0,rem=Math.max(0,goal-c.t);
  var nav='<div class="kk-nav"><button type="button" data-act="kkPrev">روز قبل</button><b>'+(k===td?'امروز':relDate(k))+'</b><button type="button" data-act="kkNext"'+(k>=td?' disabled':'')+'>روز بعد</button></div>';
  var sum='<section class="kk-sum glass"><div class="rings">'+ringsSVG([[pct,'#ff9f0a']])+'<div class="kk-rc"><b>'+fa(Math.round(pct*100))+'٪</b><small>از هدف</small></div></div>'+
    '<div class="kk-st"><small>'+(k===td?'امروز':'در این روز')+' خوانده‌ای</small><b>'+kkFmt(c.t)+'</b>'+
    '<button type="button" class="kk-goal" data-act="kkGoal" aria-label="تغییر هدف روزانه">هدف: '+kkFmt(goal)+icon('edit')+'</button>'+
    '<p>'+(c.t>=goal?'به هدف رسیدی 🎉':'تا هدف '+kkFmt(rem)+' مانده')+'</p></div></section>';
  var q='<div class="kk-q" role="group" aria-label="ثبت سریع">'+[15,30,45,60].map(function(m){return '<button type="button" class="chip" data-act="kkQuick" data-m="'+m+'">+ '+kkShort(m)+'</button>'}).join('')+'</div>';
  var sorted=l.slice().sort(function(a,b){return (a.a||'99:99').localeCompare(b.a||'99:99')||((a.ts||0)-(b.ts||0))});
  var ls=sorted.length?
    '<h3 class="gh"><span>جلسه‌های ثبت‌شده</span><span>'+fa(sorted.length)+'</span></h3><div class="glass kk-ls">'+sorted.map(function(s){
      var meta=(s.a&&s.b?'از '+fa(s.a)+' تا '+fa(s.b):'')+(s.a&&s.b&&s.n?' · ':'')+esc(s.n||'');
      return '<button type="button" class="kk-s" data-act="kkEdit" data-id="'+esc(s.id)+'" style="--cc:'+kkCol(s.s)+'"><i></i><div><b>'+esc(s.s||'مطالعه')+'</b>'+(meta?'<small>'+meta+'</small>':'')+'</div><em>'+kkFmt(s.m)+'</em></button>';
    }).join('')+'</div>':
    '<div class="empty"><div class="badge">'+icon('cap')+'</div><h3>هنوز مطالعه‌ای ثبت نشده</h3><p>با میان‌بُرهای بالا یا دکمه‌ی + مدت درس خواندن را ثبت کن.</p></div>';
  var sm={};l.forEach(function(s){var n=s.s||'';sm[n]=(sm[n]||0)+s.m});
  var subs=c.n?'<h3 class="gh"><span>سهم درس‌ها</span></h3>'+kkSubBars(sm):'';
  var tips=[];
  if(c.n){
    if(rem>0)tips.push('برای رسیدن به هدف حدود '+fa(Math.ceil(rem/45))+' جلسه‌ی ۴۵ دقیقه‌ای مانده.');
    tips.push('میانگین هر جلسه '+kkFmt(c.raw/c.n)+'، طولانی‌ترین جلسه '+kkFmt(c.lg)+'.');
    if(c.ov>0)tips.push('حدود '+kkFmt(c.ov)+' از جلسه‌ها با هم همپوشانی داشت و یک بار حساب شد.');
    var pv=kkDay(addDays(k,-1));
    if(pv>0){var df=c.t-pv;tips.push(df>0?kkFmt(df)+' بیشتر از روز قبل خوانده‌ای.':(df<0?kkFmt(-df)+' کمتر از روز قبل.':'درست به اندازه‌ی روز قبل.'))}
  }
  return nav+sum+q+ls+subs+kkTips(tips);
}
function kkStatsHTML(){
  var N=ui.kr==='30'?30:7,r=kkRange(N,0),p=kkRange(N,N),goal=kkD().goal,mx=Math.max(goal,r.best,1);
  var delta=p.tot>0?Math.round((r.tot-p.tot)/p.tot*100):null;
  if(!r.tot&&!p.tot&&!Object.keys(kkD().d).length)return '<div class="empty"><div class="badge">'+icon('stats')+'</div><h3>آماری برای نمایش نیست</h3><p>بعد از ثبت اولین مطالعه، نمودار و میانگین‌ها اینجا ساخته می‌شود.</p></div>';
  var bars=r.days.map(function(d,i){
    var hgt=d.t?Math.max(4,Math.round(d.t/mx*100)):4;
    var lab=N===7?WK[parse(d.k).getDay()]:(((N-1-i)%5===0)?F.day.format(parse(d.k)):'');
    return '<div class="hbar'+(d.t>=goal?' hit':'')+'" data-m="'+d.t+'" data-dl="'+esc(F.long.format(parse(d.k)))+'" title="'+esc(F.long.format(parse(d.k)))+': '+kkFmt(d.t)+'"><i style="height:'+hgt+'%"></i><small>'+lab+'</small>'+(N===7?'<b>'+(d.t?kkHrs(d.t):'')+'</b>':'')+'</div>';
  }).join('');
  var g1='<div class="hstats kk-gs"><div><b>'+kkShort(r.tot)+'</b><small>مجموع</small></div><div><b>'+kkShort(r.tot/N)+'</b><small>میانگین روزانه</small></div><div><b>'+kkShort(r.best)+'</b><small>بهترین روز</small></div></div>';
  var g2='<div class="hstats kk-gs"><div><b>'+fa(r.act)+' از '+fa(N)+'</b><small>روز مطالعه</small></div><div><b>'+fa(r.hit)+'</b><small>روز هدف‌رسیده</small></div><div><b>'+fa(kkStreak())+'</b><small>روز پیاپی</small></div></div>';
  var chart='<section class="chart glass"><div class="chart-h"><h3>ساعت مطالعه</h3>'+segG([['7','۷ روز'],['30','۳۰ روز']],'kr',N===30?'30':'7')+'</div><div class="kk-bars'+(N===30?' n30':'')+'">'+bars+'</div><p class="hint">'+(N===7?'عدد بالای هر ستون ساعت است. ':'')+'ستون سبز یعنی به هدف روزانه رسیده‌ای.</p></section>';
  var tips=[];
  if(r.tot>0){
    if(delta!==null&&delta<=300)tips.push('نسبت به '+fa(N)+' روز قبل از آن، '+(delta>=0?fa(delta)+'٪ بیشتر':fa(-delta)+'٪ کمتر')+' خوانده‌ای.');
    var arr=Object.keys(r.subs).filter(function(n){return n&&r.subs[n]>0}).sort(function(a,b){return r.subs[b]-r.subs[a]});
    if(arr.length)tips.push('بیشترین وقت را به «'+esc(arr[0])+'» دادی ('+kkFmt(r.subs[arr[0]])+').');
    if(arr.length>=3)tips.push('کم‌خوانده‌ترین درس این بازه «'+esc(arr[arr.length-1])+'» است.');
    var s30=kkRange(30,0).subs,miss=Object.keys(s30).filter(function(n){return n&&s30[n]>0&&!(r.subs[n]>0)});
    if(miss.length)tips.push('در این '+fa(N)+' روز سراغ «'+miss.slice(0,3).map(esc).join('»، «')+'» نرفته‌ای.');
    var r30=N===30?r:kkRange(30,0),ws=[0,0,0,0,0,0,0],wc=[0,0,0,0,0,0,0];
    r30.days.forEach(function(d){var w=parse(d.k).getDay();ws[w]+=d.t;wc[w]++});
    var bi=-1,bv=0;ws.forEach(function(v,i){var a=wc[i]?v/wc[i]:0;if(a>bv){bv=a;bi=i}});
    if(bi>-1&&r30.act>=5)tips.push('پربارترین روز هفته‌ات '+KK_WD[bi]+' است (میانگین '+kkFmt(bv)+').');
  }
  return g1+g2+chart+(r.tot>0?'<h3 class="gh"><span>سهم درس‌ها</span></h3>'+kkSubBars(r.subs):'')+kkTips(tips);
}
function viewKK(){
  var td=todayKey(),k=ui.kd||td;if(k>td)k=ui.kd=td;
  var st=ui.ksec==='stats',rpg=ui.ksec==='rep';
  return head(st?'ساعت‌های مطالعه':rpg?'گزارش‌های روزانه':F.long.format(parse(k)),'کنکوریا',{right:'<span class="kk-rb">'+(qaMicOK()?'<button type="button" id="kkMic" class="round glass" data-act="kkVoice" aria-label="ثبت مطالعه با صدا">'+icon('mic')+'</button>':'')+'<button type="button" class="round glass" data-act="kkAdd" aria-label="ثبت مطالعه">'+icon('plus')+'</button></span>'})+
    kcCard()+ttCard()+rpCard()+rkCard()+tbCard()+mzBanners()+segG([['day','مطالعه'],['stats','آمار'],['rep','گزارش‌ها']],'ksec',st?'stats':rpg?'rep':'day')+
    (st?kkStatsHTML():rpg?rpHistHTML():kkDayHTML(k,td));
}
actions.ksec=function(d){ui.ksec=d.v;render('swap')};
actions.kr=function(d){ui.kr=d.v;render('swap')};
actions.kkAdd=function(){openKK(null)};
var KK_AL={'حسابان':'ریاضی','هندسه':'ریاضی','گسسته':'ریاضی','آمار':'ریاضی','انگلیسی':'زبان','دین':'دینی','زمین':'زمین‌شناسی'};
async function kkVoice(){
  var btn=document.getElementById('kkMic'),day=ui.kd||todayKey();
  var txt=await voiceListen('مثلاً: دو ساعت و نیم ریاضی خواندم',btn);if(!txt)return;
  var m=vcDur(txt);
  if(!m||m<1||m>720){toast('مدت را نفهمیدم. مثلاً بگو «دو ساعت و نیم ریاضی خواندم»',null,null,'warn');return}
  if(kkFull(day))return;
  var n=vcNorm(txt),sub='';
  kkSubs().forEach(function(x){if(!sub&&n.indexOf(vcNorm(x))>-1)sub=x});
  if(!sub)Object.keys(KK_AL).forEach(function(k){if(!sub&&n.indexOf(k)>-1)sub=KK_AL[k]});
  kkPut(day,{id:uid(),m:m,s:sub,a:'',b:'',n:'',ts:Date.now()});
  mutate();notify('ok','مطالعه ثبت شد',(sub?sub+' · ':'')+kkFmt(m));
}
actions.kkVoice=function(){kkVoice()};

actions.kkEdit=function(d){openKK(d.id)};
actions.kkPrev=function(){ui.kd=addDays(ui.kd||todayKey(),-1);render('swap')};
actions.kkNext=function(){var n=addDays(ui.kd||todayKey(),1);ui.kd=n>todayKey()?todayKey():n;render('swap')};
actions.kkGoal=function(){var g=kkD().goal,i=KK_GOALS.indexOf(g);kkD().goal=KK_GOALS[(i+1)%KK_GOALS.length];mutate()};
actions.kkQuick=function(d){
  var day=ui.kd||todayKey(),m=+d.m||0;
  if(!m||kkFull(day))return;
  kkPut(day,{id:uid(),m:m,s:'',a:'',b:'',n:'',ts:Date.now()});
  mutate();notify('ok','مطالعه ثبت شد',kkFmt(m));
};
function kkDel(day,id){
  var l=kkList(day),i,s=null;
  for(i=0;i<l.length;i++)if(l[i].id===id){s=l.splice(i,1)[0];break}
  if(!s)return;
  if(!l.length)delete kkD().d[day];
  mutate();
  toast('مطالعه حذف شد','بازگردانی',function(){kkPut(day,s);mutate()},'del');
}

/* ---------- Konkooria: daily work report (guided questions -> ready-made copyable form) ----------
   Questions are asked one by one, ordered by how many parts the student studied today. Nothing is stored; the form is built as text. */
var RP_ORD=['اول','دوم','سوم','چهارم','پنجم','ششم','هفتم','هشتم','نهم','دهم','یازدهم','دوازدهم'],RP_MAXP=12;
var RP_NUM=['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','1️⃣1️⃣','1️⃣2️⃣'];
var RP_LN='——————————————';
var rpEl=null,rp=null,rpTm=0,rpv=null;
var RP_IMG='<div class="rp-ft rp-imgr"><button type="button" class="rp-b rp-img" data-rp="img">'+icon('camera')+'عکس گزارش (کپی و دانلود)</button></div>';
function rpReset(keep){clearTimeout(rpTm);rp={i:0,a:{},ph:'ask',txt:''};if(!keep&&state.profile.rpd){state.profile.rpd=null;writeCache();persist()}}
var rpdTm=0;
function rpDraftSave(){
  clearTimeout(rpdTm);
  if(!rp)return;
  var had=!!state.profile.rpd,has=(rp.ph==='ask'||rp.ph==='confirm'||rp.ph==='busy')&&Object.keys(rp.a).some(function(k){return rp.a[k]!==''&&rp.a[k]!=null});
  if(!has){if(had){state.profile.rpd=null;writeCache();persist()}return}
  var cp={};Object.keys(rp.a).forEach(function(k){cp[k]=rp.a[k]});
  state.profile.rpd={i:rp.i,a:cp,ph:rp.ph==='ask'?'ask':'confirm',dk:todayKey(),ts:Date.now()};
  writeCache();persist();
}
function rpRestore(d){
  d=rpdClean(d);if(!d)return false;
  var a=d.a;
  /* "today / yesterday" were relative to the day the draft was started */
  if(d.dk&&d.dk!==todayKey()&&a.date){
    var rd=a.date==='p'?addDays(d.dk,-2):(a.date==='y'?addDays(d.dk,-1):d.dk),t=todayKey();
    if(rd===t)a.date='t';else if(rd===addDays(t,-1))a.date='y';else if(rd===addDays(t,-2))a.date='p';else delete a.date;
  }
  rp={i:d.i,a:a,ph:d.ph,txt:''};
  return true;
}
function rpPartOpts(){var o=[],i;for(i=1;i<=RP_MAXP;i++)o.push([String(i),fa(i)]);return o}
function rpQs(){
  var a=rp.a,n=+a.parts||0,q=[],i;
  function add(k,t,ty,o){var x={k:k,t:t,ty:ty};if(o)for(var z in o)x[z]=o[z];q.push(x);return x}
  add('parts','امروز چند پارت خواندی؟','ch',{s:'بقیهٔ سؤال‌ها بر اساس همین تعداد پارت پرسیده و مرتب می‌شود.',o:rpPartOpts(),req:1});
  add('date','تاریخ گزارش','ch',{o:[['t','امروز'],['y','دیروز'],['p','پریروز']]});
  add('sl','ساعت خواب دیشب','tm');
  add('wk','ساعت بیداری','tm');
  add('nap','میزان خواب طول روز','du');
  add('ph','میزان استفاده از گوشی','du');
  for(i=0;i<n;i++){
    var p='p'+i,g={g:'پارت '+RP_ORD[i]};
    add(p+'n','نام درس و مبحث','tx',g);
    add(p+'st','ساعت مطالعه','du',g);
    add(p+'cl','ساعت آموزش و کلاس','du',g);
    add(p+'te','تعداد تست','nu',g);
    add(p+'tt','زمان تست (تست زماندار)','du',g);
    add(p+'pc','درصد تست‌ها','tx',{g:g.g,s:'هر چیزی که می‌خواهی بنویس؛ مثلاً ۷۵٪ یا ۷۵٪ (۱۵ درست از ۲۰)'});
    add(p+'an','تحلیل دلیل غلط‌ها و نزده‌ها','ta',g);
    add(p+'op','نظر من نسبت به این پارت','ta',g);
  }
  add('rt','پارت روتین هم داشتی؟','ch',{o:[['1','بله'],['0','نه']]});
  if(a.rt==='1'){var r={g:'پارت روتین'};add('rn','نام درس و مبحث','tx',r);add('rte','تعداد تست','nu',r)}
  add('win','موفقیت‌های امروز','ta');
  add('ch','چالش‌های امروز','ta');
  add('rem','پارت‌های باقی‌مانده','ta');
  return q;
}
function rpDate(){var d=addDays(todayKey(),-rpBack());return mk({weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(parse(d))}
function rpSave(q){
  if(!q)return;var el=rpEl,v;
  if(q.ty==='du'){var h=el.querySelector('#rpH'),m=el.querySelector('#rpM');if(!h)return;var hv=kkNum(h.value),mv=kkNum(m.value);v=(h.value.trim()||m.value.trim())?hv*60+mv:''}
  else if(q.ty!=='ch'){var f=el.querySelector('#rpIn');if(!f)return;v=f.value.trim()}
  else return;
  rp.a[q.k]=v;
}
function rpMic(){return qaMicOK()?'<button type="button" class="rp-mic" data-rp="mic">'+icon('mic')+'<span>با صدا بگو</span></button>':''}
function rpIn(q,v){return rpIn0(q,v)+rpMic()}
function rpIn0(q,v){
  if(q.ty==='ch')return '<div class="chips rp-ch">'+q.o.map(function(o){return '<button type="button" class="chip" data-rp="pick" data-v="'+o[0]+'" aria-pressed="'+(v===o[0])+'">'+o[1]+'</button>'}).join('')+'</div>';
  if(q.ty==='du'){var m=(typeof v==='number')?v:'',h=m===''?'':Math.floor(m/60),r=m===''?'':m%60;
    return '<div class="kk-hm"><label><input class="field" id="rpH" type="text" inputmode="numeric" maxlength="2" placeholder="۰" value="'+(h===''?'':h)+'" aria-label="ساعت"><span>ساعت</span></label><label><input class="field" id="rpM" type="text" inputmode="numeric" maxlength="3" placeholder="۰" value="'+(r===''?'':r)+'" aria-label="دقیقه"><span>دقیقه</span></label></div>'}
  if(q.ty==='tm')return '<input class="field rp-tm" id="rpIn" type="time" value="'+esc(v||'')+'" aria-label="'+esc(q.t)+'">';
  if(q.ty==='ta')return '<textarea class="field rp-ta" id="rpIn" rows="5" placeholder="بنویس…" aria-label="'+esc(q.t)+'">'+esc(v||'')+'</textarea>';
  return '<input class="field" id="rpIn" type="text" inputmode="'+(q.ty==='nu'?'decimal':'text')+'" autocomplete="off" placeholder="'+(q.ty==='nu'?'عدد':'بنویس…')+'" value="'+esc(v||'')+'" aria-label="'+esc(q.t)+'">';
}
function rpFacts(){
  var a=rp.a,n=+a.parts||0,sp=0,te=0,i;
  for(i=0;i<n;i++){sp+=+a['p'+i+'st']||0;te+=kkNum(a['p'+i+'te']||'')}
  if(a.rt==='1')te+=kkNum(a.rte||'');
  return {sp:sp,te:te};
}
function rpBuild(){
  var a=rp.a,n=+a.parts||0,f=rpFacts(),L=[],i;
  function d(m){return (m===''||m==null)?'':kkFmt(m)}
  function t(v){return v?fa(v):''}
  L.push('📋گزارشکار روزانه','','📆تاریخ: '+rpDate(),'🛌ساعت خواب دیشب: '+t(a.sl),'⏰ساعت بیداری: '+t(a.wk),'⏱میزان خواب طول روز: '+d(a.nap),'📲میزان استفاده از گوشی: '+d(a.ph),'📚مجموع ساعت مطالعه: '+(f.sp?kkFmt(f.sp):''),'📑مجموع تعداد تست: '+(f.te?fa(f.te):''),RP_LN);
  for(i=0;i<n;i++){
    var p='p'+i,pc=a[p+'pc']||'';
    L.push(RP_NUM[i]+'پارت '+RP_ORD[i]+':','نام درس و مبحث: '+(a[p+'n']||''),'ساعت مطالعه: '+d(a[p+'st']),'ساعت آموزش و کلاس: '+d(a[p+'cl']),'تعداد تست: '+t(a[p+'te']),'زمان تست(تست زماندار): '+d(a[p+'tt']),'','✅❌⭕️درصد تست: '+pc,'','🔍تحلیل دلیل غلطها و نزده ها:',a[p+'an']||'','','🎤نظر من نسبت به این پارت:',a[p+'op']||'','',RP_LN);
  }
  if(a.rt==='1')L.push('⌛️پارت روتین:','نام درس و مبحث: '+(a.rn||''),'تعداد تست: '+t(a.rte),'',RP_LN);
  L.push('⭐️موفقیت های امروز:',a.win||'','','😢چالش های امروز:',a.ch||'','','😡پارت های باقی مانده:',a.rem||'');
  return L.join('\n');
}
function rpPaint(){
  var w=rpEl;if(!w)return;var body=w.querySelector('.rp-body'),h='';
  if(!rpv){if(rp.ph==='done'){if(state.profile.rpd){state.profile.rpd=null;writeCache();persist()}}else rpDraftSave()}
  if(rpv){
    h='<div class="rp-res"><pre class="rp-form" dir="rtl">'+esc((rpD()[rpv]||{}).t||'')+'</pre></div>'+RP_IMG+'<div class="rp-ft"><button type="button" class="rp-b rp-del" data-rp="delv">حذف</button><button type="button" class="pill3d primary rp-nx" data-rp="copy">'+icon('check')+'کپی فرم</button></div>';
  }else if(rp.ph==='ask'){
    var qs=rpQs();if(rp.i>=qs.length)rp.i=qs.length-1;
    var q=qs[rp.i],v=rp.a[q.k],last=rp.i===qs.length-1,ok=!q.req||!!v;
    h='<div class="rp-pr" aria-hidden="true"><i style="width:'+Math.round((rp.i+1)/qs.length*100)+'%"></i></div>'+
      '<div class="rp-q"><small>سؤال '+fa(rp.i+1)+' از '+fa(qs.length)+'</small>'+(q.g?'<span class="rp-g">'+esc(q.g)+'</span>':'')+'<h2>'+esc(q.t)+'</h2>'+(q.s?'<p class="hint">'+esc(q.s)+'</p>':'')+rpIn(q,v)+'</div>'+
      '<div class="rp-ft">'+(rp.i>0?'<button type="button" class="rp-b" data-rp="prev">قبلی</button>':'<span></span>')+(q.req?'':'<button type="button" class="rp-b" data-rp="skip">رد کردن</button>')+
      '<button type="button" class="pill3d primary rp-nx" data-rp="next"'+(ok?'':' disabled')+'>'+(last?'پایان':'بعدی')+'</button></div>';
  }else if(rp.ph==='confirm'){
    var f=rpFacts();
    h='<div class="rp-q rp-c"><span class="rp-ok">'+icon('check')+'</span><h2>همهٔ سؤال‌ها جواب داده شد</h2>'+
      '<p class="hint">'+fa(rp.a.parts)+' پارت'+(f.sp?' · '+kkFmt(f.sp)+' مطالعه':'')+(f.te?' · '+fa(f.te)+' تست':'')+'</p>'+
      '<p class="rp-ask">فرم گزارش کار ساخته شود؟</p></div>'+
      '<div class="rp-ft"><button type="button" class="rp-b" data-rp="review">مرور پاسخ‌ها</button><button type="button" class="pill3d primary rp-nx" data-rp="make">تأیید و ساخت فرم</button></div>';
  }else if(rp.ph==='busy'){
    h='<div class="rp-q rp-c" role="status"><div class="rp-dots" aria-hidden="true"><i></i><i></i><i></i></div><h2>در حال آماده کردن فرم</h2></div>';
  }else{
    h='<div class="rp-res"><pre class="rp-form" dir="rtl">'+esc(rp.txt)+'</pre></div>'+RP_IMG+
      '<div class="rp-ft"><button type="button" class="rp-b" data-rp="edit">ویرایش</button><button type="button" class="rp-b" data-rp="again">فرم جدید</button><button type="button" class="pill3d primary rp-nx" data-rp="copy">'+icon('check')+'کپی فرم</button></div>';
  }
  body.innerHTML=h;
  var f2=body.querySelector('#rpIn,#rpH');if(f2&&rp.ph==='ask'&&f2.type!=='time')setTimeout(function(){try{f2.focus({preventScroll:true})}catch(e){}},60);
  var sub=w.querySelector('.tt-ti small');if(sub)sub.textContent=rpv?F.long.format(parse(rpv)):rp.ph==='done'?'فرم آماده است':rp.ph==='busy'?'لحظه‌ای صبر کن':'پرسش و پاسخ';
}
async function rpVoice(btn){
  var qs=rpQs(),q=qs[rp.i];rpSave(q);
  var t=await voiceListen(q.t,btn);if(!t||!rpEl)return;
  var n=vcNorm(t),k=q.k;
  if(q.ty==='ch'){
    if(k==='date'){rp.a.date=/پریروز/.test(n)?'p':(/دیروز/.test(n)?'y':'t')}
    else if(k==='rt'){if(/(نه|نخیر|نداشتم|ندارم)/.test(n)&&!/(بله|آره|اره|داشتم)/.test(n))rp.a.rt='0';else if(/(بله|آره|اره|داشتم|روتین)/.test(n))rp.a.rt='1'}
    else{var c=vcNum(t);if(c&&q.o.some(function(o){return o[0]===c}))rp.a[k]=c}
  }else if(q.ty==='du'){
    var m=vcDur(t);if(m==null){var z=vcNum(t);if(z)m=+z<=12?+z*60:+z}
    if(m==null||!isFinite(m)){toast('مدت را نفهمیدم. مثلاً بگو «یک ساعت و نیم»',null,null,'warn');return}
    rp.a[k]=Math.round(m);
  }else if(q.ty==='nu'){var z2=vcNum(t);if(!z2){toast('عدد را نفهمیدم',null,null,'warn');return}rp.a[k]=z2}
  else if(q.ty==='tm'){var tm=vcTime(t);if(!tm){toast('ساعت را نفهمیدم. مثلاً بگو «ساعت ۱۱ و نیم شب»',null,null,'warn');return}rp.a[k]=tm}
  else rp.a[k]=((rp.a[k]?rp.a[k]+' ':'')+t).slice(0,600);
  rpPaint();
}
function rpNext(){
  var qs=rpQs(),q=qs[rp.i];rpSave(q);
  if(q.req&&!rp.a[q.k])return;
  if(rp.i<qs.length-1)rp.i++;else rp.ph='confirm';
  rpPaint();
}
function rpCopy(btn,txt){
  var done=function(){notify('ok','کپی شد','فرم در کلیپ‌بورد است');if(btn){var o=btn.innerHTML;btn.innerHTML=icon('check')+'کپی شد';setTimeout(function(){if(btn.isConnected)btn.innerHTML=o},1600)}};
  var fb=function(){try{var ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();var ok=document.execCommand('copy');ta.remove();if(ok)done();else toast('کپی نشد. متن را نگه دار و کپی کن.',null,null,'warn')}catch(e){toast('کپی نشد. متن را نگه دار و کپی کن.',null,null,'warn')}};
  try{navigator.clipboard.writeText(txt).then(done,fb)}catch(e){fb()}
}
/* ---------- report as an image: the saved form text is parsed into a model and drawn as tables on a canvas ---------- */
function rpParse(txt){
  var L=String(txt||'').split('\n'),secs=[],cur=[],m={parts:[],rt:null};
  L.forEach(function(l){if(l.trim()===RP_LN){secs.push(cur);cur=[]}else cur.push(l)});secs.push(cur);
  function val(l){return l.slice(l.indexOf(':')+1).trim()}
  function pick(ls,key){for(var i=0;i<ls.length;i++)if(ls[i].indexOf(key)>-1)return val(ls[i]);return ''}
  function idx(ls,key){for(var i=0;i<ls.length;i++)if(ls[i].indexOf(key)>-1)return i;return -1}
  function blk(ls,a,b){return ls.slice(a+1,b<0?ls.length:b).join('\n').trim()}
  secs.forEach(function(ls,si){
    var all=ls.join('\n');
    if(si===0){m.date=pick(ls,'تاریخ');m.sl=pick(ls,'ساعت خواب دیشب');m.wk=pick(ls,'ساعت بیداری');m.nap=pick(ls,'خواب طول روز');m.ph=pick(ls,'استفاده از گوشی');m.sp=pick(ls,'مجموع ساعت مطالعه');m.te=pick(ls,'مجموع تعداد تست');return}
    if(all.indexOf('⭐')>-1){
      var iw=idx(ls,'⭐'),ic=idx(ls,'😢'),ir=idx(ls,'😡');
      m.win=blk(ls,iw,ic>-1?ic:ir);m.ch=ic>-1?blk(ls,ic,ir):'';m.rem=ir>-1?blk(ls,ir,-1):'';return;
    }
    if(all.indexOf('⌛')>-1){m.rt={n:pick(ls,'نام درس'),te:pick(ls,'تعداد تست')};return}
    var h=ls.filter(function(x){return x.trim()})[0]||'',pm=/پارت\s+(\S+?):/.exec(h);
    if(pm){
      var ia=idx(ls,'🔍'),io=idx(ls,'🎤'),top=ls.slice(0,ia>-1?ia:ls.length);
      m.parts.push({t:'پارت '+pm[1],n:pick(top,'نام درس'),st:pick(top,'ساعت مطالعه'),cl:pick(top,'ساعت آموزش'),te:pick(top,'تعداد تست'),tt:pick(top,'زمان تست'),pc:pick(top,'درصد تست'),an:ia>-1?blk(ls,ia,io):'',op:io>-1?blk(ls,io,-1):''});
    }
  });
  return m;
}
async function rpMakeImage(txt){
  var m=rpParse(txt);
  try{await Promise.all([document.fonts.load('800 24px Vazirmatn'),document.fonts.load('700 24px Vazirmatn'),document.fonts.load('400 24px Vazirmatn')])}catch(e){}
  var S=2,PAD=40,W=1080,TW=W-PAD*2,RH=88,HH=80,GAP=48,LH=46,TX=290,FF='Vazirmatn,Tahoma,system-ui,sans-serif';
  var COLS=['#3d63f0','#7c4dff','#0f9f9a','#e8833a','#d6457a','#2f9e5b'];
  var mcv=document.createElement('canvas'),mc=mcv.getContext('2d');mc.direction='rtl';mc.font='500 26px '+FF;
  function wrap(t,w){var o=[];String(t).split('\n').forEach(function(p){p=p.trim();if(p)o=o.concat(ttWrap(mc,p,w))});return o}
  function wrapF(f,t,w){mc.font=f;return wrap(t,w)}
  var FL='600 24px '+FF,FV='700 27px '+FF;
  function nl(a){return Math.max(1,a.length)}
  function kv4(a,b,c,d){
    var q=[wrapF(FL,a,176),wrapF(FV,b,232),wrapF(FL,c,176),wrapF(FV,d,232)];
    return {k:'kv4',q:q,h:Math.max(RH,Math.max(nl(q[0]),nl(q[1]),nl(q[2]),nl(q[3]))*LH+38)};
  }
  function kv2(l,v,bar){
    var q=[wrapF(FL,l,176),wrapF(FV,v,(bar!=null?560:780)-48)];
    return {k:'kv2',q:q,bar:bar,h:Math.max(RH,Math.max(nl(q[0]),nl(q[1]))*LH+38)};
  }
  function tx(l,v){var q=wrapF(FL,l,TX-48),ls=wrapF('500 26px '+FF,v,TW-TX-48);return {k:'tx',q:q,ls:ls,h:Math.max(RH,Math.max(nl(q),nl(ls))*LH+42)}}
  function pctNum(s){var x=/([۰-۹\d]+(?:[٫.][۰-۹\d]+)?)\s*٪/.exec(s||'');if(!x)return null;var n=parseFloat(x[1].replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace('٫','.'));return isFinite(n)?Math.max(0,Math.min(100,n)):null}
  var sum={h:'خلاصهٔ روز',c:COLS[0],r:[kv4('خواب دیشب',m.sl,'ساعت بیداری',m.wk),kv4('خواب طول روز',m.nap,'استفاده از گوشی',m.ph),kv4('مجموع مطالعه',m.sp,'مجموع تست',m.te)]};
  var parts=m.parts.map(function(p,i){
    return {h:p.t+(p.n?'  ·  '+p.n:''),c:COLS[(i+1)%COLS.length],r:[kv4('ساعت مطالعه',p.st,'آموزش و کلاس',p.cl),kv4('تعداد تست',p.te,'زمان تست',p.tt),kv2('درصد تست',p.pc,pctNum(p.pc)),tx('تحلیل غلط‌ها و نزده‌ها',p.an),tx('نظر من نسبت به این پارت',p.op)]};
  });
  var extras=[];
  if(m.rt)extras.push({h:'پارت روتین',c:'#64748b',r:[kv4('درس و مبحث',m.rt.n,'تعداد تست',m.rt.te)]});
  if(m.win||m.ch||m.rem)extras.push({h:'جمع‌بندی روز',c:'#2f9e5b',r:[tx('موفقیت‌های امروز',m.win),tx('چالش‌های امروز',m.ch),tx('پارت‌های باقی‌مانده',m.rem)]});
  /* every picture is 3:4 and holds at most two parts; more parts mean more pictures */
  var pages=[],i;
  for(i=0;i<parts.length;i+=2)pages.push({secs:parts.slice(i,i+2),np:Math.min(2,parts.length-i)});
  if(!pages.length)pages.push({secs:[],np:0});
  pages[0].secs.unshift(sum);
  if(extras.length){
    var lp=pages[pages.length-1];
    if(lp.np>=2)pages.push({secs:extras.slice(),np:0});else lp.secs=lp.secs.concat(extras);
  }
  var CH=1440,TH2=120,FT=70,PH=CH-FT;
  var xr=W-PAD;
  function ln(x1,y1,x2,y2){cx.moveTo(x1,y1);cx.lineTo(x2,y2)}
  var cv,cx;
  function cellTxt(ls,right,font,col,yc){
    cx.font=font;cx.textAlign='right';
    if(!ls.length){cx.fillStyle='#a3acc2';cx.fillText('—',right-24,yc);return}
    cx.fillStyle=col;var t0=yc-ls.length*LH/2+LH/2;ls.forEach(function(l,i){cx.fillText(l,right-24,t0+i*LH)});
  }
  pages.forEach(function(pg){pg.secs.forEach(function(sc){sc.hl=wrapF('800 30px '+FF,sc.h,TW-48);sc.hd=Math.max(HH,nl(sc.hl)*44+36);sc.hh=sc.r.reduce(function(a,r){return a+r.h},0)})});
  function drawPage(pg,pi){
    var first=pi===0,TH=first?190:TH2,H=PAD+TH+GAP;
    pg.secs.forEach(function(sc){H+=sc.hd+sc.hh+GAP});
    H+=PAD*0.4-GAP;
    var k=Math.min(1,PH/H);
    cv=document.createElement('canvas');cx=cv.getContext('2d');
    cv.width=Math.round(W*S);cv.height=Math.round(CH*S);
    cx.scale(S,S);cx.direction='rtl';cx.textBaseline='middle';cx.textAlign='right';
    cx.fillStyle='#f3f6fd';cx.fillRect(0,0,W,CH);
    cx.save();cx.translate((W-W*k)/2,0);cx.scale(k,k);
    var y=PAD;
    var g=cx.createLinearGradient(PAD,y,PAD+TW,y+TH);g.addColorStop(0,'#5b7bff');g.addColorStop(1,'#2f48d6');
    ttRR(cx,PAD,y,TW,TH,30);cx.fillStyle=g;cx.fill();
    var dl=(m.date||'')+(pages.length>1?(m.date?'  ·  ':'')+'عکس '+fa(pi+1)+' از '+fa(pages.length):'');
    cx.fillStyle='#fff';cx.font='800 '+(first?54:44)+'px '+FF;cx.fillText('گزارش کار روزانه',xr-40,y+(first?74:48));
    cx.fillStyle='rgba(255,255,255,.88)';cx.font='500 '+(first?28:26)+'px '+FF;cx.fillText(dl,xr-40,y+(first?132:90));
    cx.save();cx.direction='ltr';cx.textAlign='left';cx.fillStyle='#fff';cx.font='800 48px '+FF;cx.fillText('Ario',PAD+40,y+TH/2);cx.restore();
    y+=TH+GAP;
    pg.secs.forEach(function(s){
      var th=s.hd+s.hh;
      cx.save();ttRR(cx,PAD,y,TW,th,24);cx.clip();
      cx.fillStyle='#fff';cx.fillRect(PAD,y,TW,th);
      cx.fillStyle=s.c;cx.fillRect(PAD,y,TW,s.hd);
      cx.fillStyle='#fff';cx.font='800 30px '+FF;cx.textAlign='right';var ht=y+s.hd/2-s.hl.length*44/2+22;s.hl.forEach(function(l,i){cx.fillText(l,xr-24,ht+i*44)});
      var ry=y+s.hd;
      s.r.forEach(function(r){
        var yc=ry+r.h/2;
        function lab(x,w){cx.fillStyle='#e8edfb';cx.fillRect(x,ry,w,r.h)}
        if(r.k==='kv4'){
          lab(xr-220,220);lab(xr-720,220);
          cellTxt(r.q[0],xr,FL,'#6b7690',yc);cellTxt(r.q[1],xr-220,FV,'#14203f',yc);
          cellTxt(r.q[2],xr-500,FL,'#6b7690',yc);cellTxt(r.q[3],xr-720,FV,'#14203f',yc);
        }else if(r.k==='kv2'){
          lab(xr-220,220);
          cellTxt(r.q[0],xr,FL,'#6b7690',yc);
          cellTxt(r.q[1],xr-220,FV,'#14203f',yc);
          if(r.bar!=null){
            var bw=200,bx=PAD+28;
            ttRR(cx,bx,yc-8,bw,16,8);cx.fillStyle='#e3e8f5';cx.fill();
            if(r.bar>0){ttRR(cx,bx,yc-8,Math.max(16,bw*r.bar/100),16,8);cx.fillStyle=r.bar>=70?'#2f9e5b':r.bar>=40?'#e8a13a':'#e0524d';cx.fill()}
          }
        }else{
          lab(xr-TX,TX);
          cellTxt(r.q,xr,FL,'#6b7690',yc);
          cellTxt(r.ls,xr-TX,'500 26px '+FF,'#14203f',yc);
        }
        ry+=r.h;
      });
      cx.strokeStyle='#dfe5f3';cx.lineWidth=2;cx.beginPath();
      ry=y+s.hd;
      s.r.forEach(function(r,i){if(i>0)ln(PAD,ry,PAD+TW,ry);
        if(r.k==='kv4'){ln(xr-220,ry,xr-220,ry+r.h);ln(xr-500,ry,xr-500,ry+r.h);ln(xr-720,ry,xr-720,ry+r.h)}
        else if(r.k==='kv2')ln(xr-220,ry,xr-220,ry+r.h);
        else ln(xr-TX,ry,xr-TX,ry+r.h);
        ry+=r.h});
      cx.stroke();cx.restore();
      cx.strokeStyle='#cfd7ea';cx.lineWidth=2;ttRR(cx,PAD,y,TW,th,24);cx.stroke();
      y+=th+GAP;
    });
    cx.restore();
    cx.fillStyle='#8a94ad';cx.font='500 22px '+FF;cx.textAlign='center';cx.fillText('ساخته‌شده با Ario',W/2,CH-FT/2);
    return new Promise(function(res){cv.toBlob(function(b){res(b)},'image/png')});
  }
  var out=[];
  for(i=0;i<pages.length;i++)out.push(await drawPage(pages[i],i));
  return out;
}
function rpB64(blob){return new Promise(function(res,rej){var fr=new FileReader();fr.onload=function(){res(String(fr.result).split(',')[1])};fr.onerror=rej;fr.readAsDataURL(blob)})}
/* copy the picture itself to the clipboard (Android: native plugin; browsers: async Clipboard API) */
async function rpCopyImg(blob,btn){
  function ok(){
    notify('ok','عکس کپی شد','حالا در هر برنامه‌ای می‌توانی جای‌گذاری کنی');
    if(btn&&btn.isConnected){var o=btn.innerHTML;btn.innerHTML=icon('check')+'کپی شد';setTimeout(function(){if(btn.isConnected)btn.innerHTML=o},1800)}
  }
  var P=ttIS(),why='';
  if(P&&P.copyImage){try{await P.copyImage({data:await rpB64(blob)});ok();return}catch(e){why=String(e&&e.message||e)}}
  try{
    if(navigator.clipboard&&navigator.clipboard.write&&window.ClipboardItem){
      await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);ok();return;
    }
  }catch(e){why+=' '+String(e&&e.message||e)}
  /* last resort on the phone: hand the picture to the share sheet (its "Copy" button copies the image) */
  var FS=capGet('Filesystem'),SH=capGet('Share');
  if(FS&&SH){
    try{
      var r=await FS.writeFile({path:'ario-copy-'+Date.now()+'.png',data:await rpB64(blob),directory:'CACHE'});
      await SH.share({title:'عکس گزارش',url:r.uri,dialogTitle:'کپی یا ارسال عکس'});return;
    }catch(e){if(/cancel/i.test(String(e&&e.message||e)))return;why+=' '+String(e&&e.message||e)}
  }
  toast('کپی عکس ممکن نشد'+(why.trim()?' ('+why.trim().slice(0,60)+')':'')+'. از «دانلود» استفاده کن.',null,null,'warn');
}
var rpImgBusy=false;
async function rpImage(src,key,btn){
  if(rpImgBusy||!src)return;rpImgBusy=true;
  var o=btn&&btn.innerHTML;if(btn){btn.disabled=true;btn.textContent='در حال ساخت عکس…'}
  try{
    var blobs=await rpMakeImage(src);if(!blobs||!blobs.length)throw new Error('empty');
    var urls=blobs.map(function(b){return URL.createObjectURL(b)}),n=blobs.length;
    var figs=blobs.map(function(b,i){
      return '<figure class="rp-fig"><img alt="عکس گزارش '+fa(i+1)+'">'+(n>1?'<figcaption>عکس '+fa(i+1)+' از '+fa(n)+'</figcaption>':'')+
        '<div class="tt-eb"><button type="button" class="tt-btn pri" data-e="copy" data-i="'+i+'">'+icon('copy')+'کپی عکس'+(n>1?' '+fa(i+1):'')+'</button><button type="button" class="tt-btn" data-e="dl" data-i="'+i+'">'+icon('download')+'دانلود'+(n>1?' '+fa(i+1):'')+'</button></div></figure>';
    }).join('');
    var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>'+(n>1?'عکس‌های گزارش':'عکس گزارش')+'</h2><button type="button" data-e="close">بستن</button></div>'+
      '<div class="tt-prev rp-figs">'+figs+'</div>'+
      '<div class="tt-eb">'+(n>1?'<button type="button" class="tt-btn pri full" data-e="all">'+icon('download')+'دانلود همه‌ی عکس‌ها</button>':'')+'<button type="button" class="tt-btn full" data-e="close">بستن</button></div>','عکس گزارش');
    sw.w.querySelectorAll('img').forEach(function(im,i){im.src=urls[i]});
    var closeOrig=sw.close;
    function closeAll(){closeOrig();setTimeout(function(){urls.forEach(function(u){URL.revokeObjectURL(u)})},600)}
    sw.w.querySelector('.dim').addEventListener('click',closeAll);
    sw.w.addEventListener('click',async function(e){
      var b=e.target.closest('[data-e]');if(!b)return;
      var i=+b.dataset.i||0,nm=function(j){return 'ario-report-'+key+(n>1?'-'+(j+1):'')+'.png'};
      if(b.dataset.e==='close')closeAll();
      else if(b.dataset.e==='copy')rpCopyImg(blobs[i],b);
      else if(b.dataset.e==='dl')imgSave(blobs[i],nm(i),'عکس گزارش');
      else if(b.dataset.e==='all'){for(var j=0;j<n;j++)await imgSave(blobs[j],nm(j),'عکس گزارش '+fa(j+1))}
    });
  }catch(e){toast('ساخت عکس انجام نشد؛ دوباره تلاش کن',null,null,'warn')}
  rpImgBusy=false;if(btn&&btn.isConnected){btn.disabled=false;btn.innerHTML=o}
}
function openRP(){
  if(rpEl)return;if(!rp){rpReset(true);if(!rpv)rpRestore(state.profile.rpd)}
  var w=document.createElement('div');w.className='tt-page rp-page';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','گزارش کار روزانه');
  w.innerHTML='<header class="tt-bar"><button type="button" class="round glass" data-rp="close" aria-label="بستن">'+icon('close')+'</button><div class="tt-ti"><div class="tt-tr"><b class="ttl-h">گزارش کار روزانه</b></div><small></small></div></header><div class="rp-body"></div>';
  document.body.appendChild(w);rpEl=w;document.documentElement.style.overflow='hidden';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-rp]');if(!b)return;var a=b.dataset.rp,qs;
    if(a==='close')closeRP();
    else if(a==='pick'){qs=rpQs();rp.a[qs[rp.i].k]=b.dataset.v;rpPaint()}
    else if(a==='next')rpNext();
    else if(a==='mic')rpVoice(b);
    else if(a==='skip'){qs=rpQs();rp.a[qs[rp.i].k]='';if(rp.i<qs.length-1)rp.i++;else rp.ph='confirm';rpPaint()}
    else if(a==='prev'){qs=rpQs();rpSave(qs[rp.i]);if(rp.i>0)rp.i--;rpPaint()}
    else if(a==='review'){rp.ph='ask';rp.i=rpQs().length-1;rpPaint()}
    else if(a==='edit'){rp.ph='ask';rp.i=rpQs().length-1;rpPaint()}
    else if(a==='again'){rpReset();rpPaint()}
    else if(a==='copy')rpCopy(b,rpv?(rpD()[rpv]||{}).t:rp.txt);
    else if(a==='delv')rpDelSaved();
    else if(a==='img')rpImage(rpv?(rpD()[rpv]||{}).t:rp.txt,rpv||rpDayKey(),b);
    else if(a==='make'){rp.ph='busy';rpPaint();rpTm=setTimeout(function(){rp.txt=rpBuild();rp.ph='done';rpStore();rpPaint()},2200)}
  });
  w.addEventListener('input',function(){
    if(rpv||rp.ph!=='ask')return;
    var qs=rpQs();rpSave(qs[rp.i]);
    clearTimeout(rpdTm);rpdTm=setTimeout(rpDraftSave,600);
  });
  w.addEventListener('keydown',function(e){if(e.key==='Enter'&&rp.ph==='ask'&&e.target.tagName==='INPUT'&&e.target.type!=='time'){e.preventDefault();rpNext()}});
  rpPaint();
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
function closeRP(){
  var w=rpEl;if(!w)return;
  if(!rpv&&rp&&rp.ph==='ask'){try{rpSave(rpQs()[rp.i])}catch(e){}}
  rpEl=null;clearTimeout(rpTm);if(rp&&rp.ph==='busy')rp.ph='confirm';
  w.classList.remove('open');if(!ttEl&&!ttLs)document.documentElement.style.overflow='';
  setTimeout(function(){w.remove()},350);
  rpv=null;if(rp&&rp.ph!=='done')rpDraftSave();if(ui.tab==='kk')render();
}
actions.openRP=openRP;

function rpD(){var p=state.profile;if(!p.rp||typeof p.rp!=='object')p.rp={};return p.rp}
function rpBack(){return rp.a.date==='p'?2:(rp.a.date==='y'?1:0)}
function rpDayKey(){return addDays(todayKey(),-rpBack())}
function rpStore(){
  var a=rp.a,n=+a.parts||0,sp=0,cl=0,te=0,tc=0,cr=0,i;
  for(i=0;i<n;i++){
    var p='p'+i,t=kkNum(a[p+'te']||'');sp+=+a[p+'st']||0;cl+=+a[p+'cl']||0;te+=t;
    var pm=/([۰-۹٠-٩\d]+(?:[٫.][۰-۹٠-٩\d]+)?)/.exec(a[p+'pc']||'');
    if(pm&&t){var pv=parseFloat(pm[1].replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace('٫','.'));if(isFinite(pv)&&pv>=0&&pv<=100){tc+=t;cr+=Math.round(t*pv/100)}}
  }
  if(a.rt==='1')te+=kkNum(a.rte||'');
  var k=rpDayKey();
  rpD()[k]={sp:Math.min(sp,1440),cl:Math.min(cl,1440),te:Math.min(te,5000),tc:Math.min(tc,5000),cr:Math.min(cr,5000),n:n,t:rp.txt.slice(0,9000),ts:Date.now()};
  state.profile.rp=rpClean(state.profile.rp);state.profile.rpd=null;
  mutate();notify('ok','گزارش ذخیره شد',F.long.format(parse(k)));
}
function rpHistHTML(){
  var D=rpD(),ks=Object.keys(D).sort();
  if(!ks.length)return '<div class="empty"><div class="badge">'+icon('edit')+'</div><h3>هنوز گزارشی ذخیره نشده</h3><p>هر گزارشی که می‌سازی خودکار اینجا ذخیره می‌شود و نمودار ساعت و تست از روی آن‌ها کشیده می‌شود.</p><button type="button" class="btn" data-act="openRP">ساخت گزارش</button></div>';
  var N=ui.kr==='30'?30:7,td=todayKey(),days=[],i,tot=0,tt=0,tc=0,cr=0,mxS=60,mxT=10;
  for(i=N-1;i>=0;i--){
    var k=addDays(td,-i),r=D[k]||null;
    days.push({k:k,r:r,sp:r?r.sp:0,te:r?r.te:0,cr:r?r.cr:0,tc:r?r.tc:0});
    if(r){tot+=r.sp;tt+=r.te;tc+=r.tc;cr+=r.cr;if(r.sp>mxS)mxS=r.sp;if(r.te>mxT)mxT=r.te}
  }
  function lab(d,j){return N===7?WK[parse(d.k).getDay()]:(((N-1-j)%5===0)?F.day.format(parse(d.k)):'')}
  var hb=days.map(function(d,j){
    var h=d.sp?Math.max(4,Math.round(d.sp/mxS*100)):4;
    return '<div class="hbar" data-m="'+d.sp+'" data-dl="'+esc(F.long.format(parse(d.k)))+'" title="'+esc(F.long.format(parse(d.k)))+': '+kkFmt(d.sp)+'"><i style="height:'+h+'%"></i><small>'+lab(d,j)+'</small>'+(N===7?'<b>'+(d.sp?kkHrs(d.sp):'')+'</b>':'')+'</div>';
  }).join('');
  var tb=days.map(function(d,j){
    var h=d.te?Math.max(4,Math.round(d.te/mxT*100)):4,pr=d.tc?Math.round(d.cr/d.tc*100):0;
    return '<div class="hbar" data-te="'+d.te+'" data-tc="'+d.tc+'" data-cr="'+d.cr+'" data-dl="'+esc(F.long.format(parse(d.k)))+'" title="'+esc(F.long.format(parse(d.k)))+': '+fa(d.te)+' تست"><span class="rp-tw'+(d.tc?'':' nocr')+'" style="height:'+h+'%">'+(d.tc?'<u style="height:'+pr+'%"></u>':'')+'</span><small>'+lab(d,j)+'</small>'+(N===7?'<b>'+(d.te?fa(d.te):'')+'</b>':'')+'</div>';
  }).join('');
  var seg=segG([['7','۷ روز'],['30','۳۰ روز']],'kr',N===30?'30':'7');
  var g='<div class="hstats kk-gs"><div><b>'+kkShort(tot)+'</b><small>مجموع مطالعه</small></div><div><b>'+fa(tt)+'</b><small>مجموع تست</small></div><div><b>'+(tc?fa(Math.round(cr/tc*100))+'٪':'—')+'</b><small>درصد درست</small></div></div>';
  var c1='<section class="chart glass"><div class="chart-h"><h3>ساعت مطالعه (گزارش‌ها)</h3>'+seg+'</div><div class="kk-bars'+(N===30?' n30':'')+'">'+hb+'</div><p class="hint">'+(N===7?'عدد بالای هر ستون ساعت است.':'هر ستون یک روز است.')+'</p></section>';
  var c2='<section class="chart glass"><div class="chart-h"><h3>تعداد تست</h3></div><div class="kk-bars rp-tbars'+(N===30?' n30':'')+'">'+tb+'</div><p class="hint">بخش سبز تست‌های درست است و بقیهٔ ستون غلط یا نزده. اگر تعداد درست‌ها را نگفته باشی ستون یک‌رنگ می‌شود.</p></section>';
  var list=ks.slice().reverse().slice(0,40).map(function(k){
    var r=D[k],acc=r.tc?' · '+fa(Math.round(r.cr/r.tc*100))+'٪ درست':'';
    return '<button type="button" class="wrcard glass" data-act="rpOpen" data-k="'+k+'"><span class="ib" style="background:linear-gradient(145deg,#6f8bff,#3f55e6)">'+icon('edit')+'</span><div><b>'+esc(F.long.format(parse(k)))+'</b><small>'+(r.sp?kkFmt(r.sp)+' · ':'')+fa(r.te)+' تست'+acc+'</small></div></button>';
  }).join('');
  return g+c1+c2+'<h3 class="gh"><span>گزارش‌های ذخیره‌شده</span></h3>'+list;
}
/* tap a chart column -> a small bubble with the exact number, then it fades away */
var barTipT=null;
function barTip(host,x,y,main,sub,cls,bar){
  [].forEach.call(document.querySelectorAll('.bar-tip'),function(e){e.remove()});
  [].forEach.call(document.querySelectorAll('.hbar.tapped'),function(e){e.classList.remove('tapped')});
  clearTimeout(barTipT);
  var r=host.getBoundingClientRect(),el=document.createElement('div');
  el.className='bar-tip'+(cls?' '+cls:'');el.setAttribute('role','status');
  el.innerHTML='<b>'+main+'</b>'+(sub?'<small>'+sub+'</small>':'');
  host.appendChild(el);
  var w=el.offsetWidth,px=Math.max(w/2+4,Math.min(r.width-w/2-4,x-r.left));
  el.style.left=px+'px';el.style.top=Math.max(el.offsetHeight+4,y-r.top-12)+'px';
  if(bar)bar.classList.add('tapped');
  requestAnimationFrame(function(){el.classList.add('in')});
  barTipT=setTimeout(function(){el.classList.add('out');if(bar)bar.classList.remove('tapped');setTimeout(function(){el.remove()},450)},1600);
}
document.addEventListener('click',function(e){
  var bar=e.target.closest&&e.target.closest('.kk-bars .hbar');if(!bar)return;
  var host=bar.parentNode,d=bar.dataset,dl=esc(d.dl||'');
  if(d.te!==undefined){
    var te=+d.te,tc=+d.tc,cr=+d.cr;
    if(!te)barTip(host,e.clientX,e.clientY,'تستی ثبت نشده',dl,'',bar);
    else if(tc&&e.target.closest('u'))barTip(host,e.clientX,e.clientY,'درست: '+fa(cr),'از '+fa(tc)+' تست · '+dl,'ok',bar);
    else if(tc&&e.target.closest('.rp-tw'))barTip(host,e.clientX,e.clientY,'نادرست: '+fa(Math.max(0,tc-cr)),'از '+fa(tc)+' تست · '+dl,'bad',bar);
    else barTip(host,e.clientX,e.clientY,fa(te)+' تست',(tc?'':'بدون تعداد درست · ')+dl,'',bar);
  }else if(d.m!==undefined){
    var m=+d.m;
    barTip(host,e.clientX,e.clientY,m?kkFmt(m):'مطالعه‌ای ثبت نشده',dl,'',bar);
  }
});
actions.rpOpen=function(d){if(!rpD()[d.k])return;rpv=d.k;openRP()};
function rpDelSaved(){
  var k=rpv,sv=rpD()[k];if(!sv)return;
  delete rpD()[k];mutate();closeRP();
  toast('گزارش حذف شد','بازگردانی',function(){rpD()[k]=sv;mutate()},'del');
}
/* ---------- Konkooria smart coach: reads the study hours + daily reports and gives advice
   (more tests, more hours) and a suggested timetable built from the user's own one (save it or reject it) ---------- */
var KC_N=14;
function kcClean(x){
  var o={dis:'',ts:0};
  if(x&&typeof x==='object'){if(typeof x.dis==='string'&&/^[\w-]{0,24}$/.test(x.dis))o.dis=x.dis;o.ts=Number(x.ts)||0}
  return o;
}
function kcD(){var p=state.profile;p.kc=kcClean(p.kc);return p.kc}
/* free text ("ریاضی: فصل ۳", "تست زیست") -> a known lesson name, or '' */
function kcLesson(txt){
  var s=ttNorm(txt),best='',bl=0;
  TT_SUB.concat(KK_SUBS.map(function(n){return [n]})).forEach(function(x){
    var n=x[0];if(n==='آزمون'||n==='مرور'||n==='استراحت')return;
    var a=ttNorm(n),b=a.replace(/ و زندگی$/,'');
    [a,b].forEach(function(z){if(z&&s.indexOf(z)>-1&&z.length>bl){best=n;bl=z.length}});
  });
  if(!best&&/دینی/.test(s))best='دین و زندگی';
  return best;
}
function kcPct(txt){
  var m=/([۰-۹٠-٩\d]+(?:[٫.][۰-۹٠-٩\d]+)?)/.exec(txt||'');if(!m)return null;
  var v=parseFloat(m[1].replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}).replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).replace('٫','.'));
  return isFinite(v)&&v>=0&&v<=100?v:null;
}
/* everything the coach knows about the last N days */
function kcAnalyze(N){
  var td=todayKey(),D=rpD(),days=[],i,k,r,tot=0,act=0,teT=0,teDays=0,tc=0,cr=0,repMin=0,subj={},wd=[0,0,0,0,0,0,0],wn=[0,0,0,0,0,0,0];
  var lastRep=0;
  for(i=N-1;i>=0;i--){
    k=addDays(td,-i);r=D[k]||null;
    var m=Math.max(kkDay(k),r?r.sp:0);
    days.push({k:k,m:m,te:r?r.te:0,rep:!!r});
    tot+=m;if(m>0)act++;
    wd[parse(k).getDay()]+=m;wn[parse(k).getDay()]++;
    if(r){lastRep=Math.max(lastRep,N-i);teT+=r.te;teDays++;tc+=r.tc;cr+=r.cr;repMin+=r.sp;
      try{rpParse(r.t).parts.forEach(function(p){
        var l=kcLesson(p.n);if(!l)return;
        var te=kkNum(p.te||''),pc=kcPct(p.pc),o=subj[l]||(subj[l]={te:0,tc:0,cr:0});
        o.te+=te;if(pc!=null&&te){o.tc+=te;o.cr+=Math.round(te*pc/100)}
      })}catch(e){}
    }
  }
  var avg=tot/N,w1=0,w2=0;
  days.forEach(function(d,j){if(j>=N-7)w1+=d.m;else if(j>=N-14)w2+=d.m});
  var rk=kkRange(N,0).subs;
  return {N:N,days:days,tot:tot,avg:avg,act:act,teDays:teDays,teAvg:teDays?teT/teDays:0,teTot:teT,tc:tc,cr:cr,acc:tc?cr/tc*100:null,
    perHour:repMin>0?teT/(repMin/60):null,subj:subj,mins:rk,wd:wd,wn:wn,w1:w1,w2:w2,recent:lastRep>=N-6};
}
function kcRound(v,s){return Math.round(v/s)*s}
/* the advice list: [{ic,t,h,act:{k,lb,v}}] */
function kcAdvice(a){
  var o=[],goal=kkD().goal;
  if(a.act<3&&a.teDays<2){
    o.push({ic:'bulb',h:'اول داده جمع کن',t:'هنوز اطلاعات کافی برای تحلیل دقیق نیست. چند روز ساعت مطالعه را ثبت کن و بعد از هر روز «گزارش کار روزانه» را بساز؛ مربی از روی همین‌ها راهکار می‌دهد.'});
    return o;
  }
  /* ---- hours ---- */
  var avg=a.avg,act=a.act;
  if(act/a.N<.7){
    o.push({ic:'clock',h:'پیوستگی مطالعه',t:'در '+fa(a.N)+' روز اخیر فقط '+fa(act)+' روز مطالعه ثبت شده. قبل از زیاد کردن ساعت‌ها، روزهای خالی را پر کن: حتی یک جلسه‌ی ۴۵ دقیقه‌ای در روزهای خالی از یک روز طولانی و یک روز تعطیل بهتر است.'});
  }
  if(avg>=540){
    o.push({ic:'clock',h:'ساعت مطالعه کافی است',t:'میانگین روزانه‌ات '+kkFmt(avg)+' است. به‌جای زیاد کردن ساعت، کیفیت را بالا ببر: مرور فعال، تست زماندار و تحلیل غلط‌ها. خواب کافی هم جزو برنامه است.'});
  }else{
    var tg=Math.min(600,Math.max(kcRound(avg*1.15,15),kcRound(avg+15,15)));
    var base=avg>0?'میانگین روزانه‌ی '+fa(a.N)+' روز اخیرت '+kkFmt(avg)+(goal?' (هدف '+kkFmt(goal)+')':'')+' است. ':'';
    var tr=a.w2>0?(a.w1>a.w2*1.05?' روند هفته‌ی اخیر رو به بالاست؛ ادامه بده.':(a.w1<a.w2*.9?' نسبت به هفته‌ی قبل کمتر شده است.':'')):'';
    o.push({ic:'clock',h:'افزایش ساعت مطالعه',t:base+'پیشنهاد: هفته‌ی بعد روزی '+kkFmt(tg)+' (حدود ۱۵٪ بیشتر). افزایش تدریجی ماندگارتر از جهش ناگهانی است؛ اضافه‌ی هر روز را یک جلسه‌ی ۴۵ دقیقه‌ای بگذار.'+tr,act:tg!==goal?{k:'goal',v:tg,lb:'هدف روزانه را '+kkFmt(tg)+' کن'}:null});
  }
  var wi=-1,wv=1e9,bi=-1,bv=-1;
  a.wd.forEach(function(v,i){if(!a.wn[i])return;var x=v/a.wn[i];if(x<wv){wv=x;wi=i}if(x>bv){bv=x;bi=i}});
  if(wi>-1&&bi>-1&&bv>0&&wv<bv*.5&&a.N>=14)o.push({ic:'calendar',h:'روز ضعیف هفته',t:KK_WD[wi]+' ضعیف‌ترین روز تو است (میانگین '+kkFmt(wv)+' در برابر '+kkFmt(bv)+' در '+KK_WD[bi]+'). یک بلوک ثابت ۶۰ دقیقه‌ای برای این روز بگذار.'});
  var sub=Object.keys(a.mins).filter(function(n){return n&&n!=='آزمون'&&a.mins[n]>0}).sort(function(x,y){return a.mins[x]-a.mins[y]});
  if(sub.length>=3)o.push({ic:'book',h:'درس کم‌خوانده',t:'«'+esc(sub[0])+'» کمترین زمان را گرفته ('+kkFmt(a.mins[sub[0]])+'). یک جلسه‌ی ثابت در هفته برایش بگذار تا عقب نیفتد.'});
  /* ---- tests ---- */
  if(!a.teDays){
    o.push({ic:'test',h:'تست‌هایت را ثبت کن',t:'در گزارش‌ها تستی ثبت نشده. بعد از هر پارت تعداد تست و درصد را در گزارش بنویس تا مربی بتواند تست‌ها را تحلیل کند.'});
  }else{
    var te=a.teAvg,tt=Math.max(kcRound(te*1.2,5),kcRound(te+10,5));
    var rate=a.perHour;
    var tx='میانگین تست‌هایت در روزهای گزارش‌دار '+fa(Math.round(te))+' تست است'+(rate!=null?' (حدود '+fa(Math.round(rate))+' تست در هر ساعت مطالعه)':'')+'. ';
    if(rate!=null&&rate<10)tx+='نسبت تست به مطالعه پایین است؛ برای کنکور بعد از هر مبحث تست موضوعی بزن. ';
    tx+='پیشنهاد: هفته‌ی بعد روزی '+fa(tt)+' تست، در دو یا سه نوبت (مثلاً بعد از هر دو پارت مطالعه).';
    o.push({ic:'test',h:'افزایش تعداد تست',t:tx,act:{k:'tests',v:tt,lb:'ساخت کار تست برای ۷ روز آینده'}});
    if(a.acc!=null&&a.tc>=20){
      if(a.acc<50)o.push({ic:'flag',h:'درصد پایین',t:'درصد درست تست‌هایت '+fa(Math.round(a.acc))+'٪ است. قبل از زیاد کردن تعداد، همه‌ی غلط‌ها و نزده‌ها را تحلیل کن و مبحث را دوباره بخوان؛ تست بیشتر بدون مرور غلط‌ها اثر کمی دارد.'});
      else if(a.acc>=75)o.push({ic:'flag',h:'درصد خوب',t:'درصد درست تست‌هایت '+fa(Math.round(a.acc))+'٪ است. وقت آن است که تست زماندار و سخت‌تر اضافه کنی.'});
    }
    var sl=Object.keys(a.subj).filter(function(n){return a.subj[n].tc>=15}).sort(function(x,y){return a.subj[x].cr/a.subj[x].tc-a.subj[y].cr/a.subj[y].tc});
    if(sl.length>=2){var w=sl[0],p=Math.round(a.subj[w].cr/a.subj[w].tc*100);o.push({ic:'target',h:'ضعیف‌ترین درس در تست',t:'در «'+esc(w)+'» '+fa(p)+'٪ درست زده‌ای ('+fa(a.subj[w].te)+' تست). دو جلسه‌ی مرور مبحث و '+fa(20)+' تست موضوعی در هفته برایش بگذار.'})}
    var nt=Object.keys(a.mins).filter(function(n){return n&&n!=='آزمون'&&a.mins[n]>=60&&!(a.subj[n]&&a.subj[n].te>0)&&KK_SUBS.indexOf(n)>-1});
    if(nt.length&&sl.length)o.push({ic:'test',h:'درس بدون تست',t:'برای «'+nt.slice(0,3).map(esc).join('»، «')+'» تستی ثبت نکرده‌ای. بعد از مطالعه‌ی هر درس حداقل ۱۰ تست بزن.'});
    if(!a.recent)o.push({ic:'edit',h:'گزارش‌ها را به‌روز کن',t:'در ۷ روز اخیر گزارشی ثبت نکرده‌ای؛ تحلیل بر اساس داده‌های قدیمی است.'});
  }
  return o;
}
/* ---- suggested timetable, built from the user's own table: their cells stay, free parts are filled ---- */
function kcSrc(){
  var t=state.profile.tt,has=function(x){return x&&x.cells&&Object.keys(x.cells).some(function(k){var c=x.cells[k];return c&&typeof c.t==='string'&&c.t.trim()})};
  if(has(t))return ttGet();
  var pl=ttPlans().slice().sort(function(a,b){return (b.upd||0)-(a.upd||0)});
  for(var i=0;i<pl.length;i++)if(has(pl[i].data))return pl[i].data;
  return null;
}
function kcPlan(a){
  var src=kcSrc();if(!src)return null;
  var t=ttClone(src);if(!Array.isArray(t.rows)||!t.cells)return null;
  var R=t.rows.slice(0,TT_MAX),filled=[],lessons={},colOf={},i,d,added=[],testCnt=0;
  for(d=0;d<7;d++){
    filled[d]=[];
    R.forEach(function(r,ri){
      var c=ttCell(t,r.id,d);if(!c||!c.t.trim())return;
      filled[d].push(ri);
      var l=kcLesson(c.t);if(l){lessons[l]=(lessons[l]||0)+1;if(c.c>-1&&colOf[l]==null)colOf[l]=c.c}
      if(/تست/.test(c.t))testCnt++;
    });
  }
  var names=Object.keys(lessons);if(!names.length)return null;
  var dayN=filled.filter(function(f){return f.length>0}).map(function(f){return f.length});
  if(!dayN.length)return null;
  var avgF=dayN.reduce(function(x,y){return x+y},0)/dayN.length;
  var more=a&&a.avg<480?1:0;
  var tgt=Math.min(R.length,Math.max(Math.round(avgF)+more,Math.max.apply(null,dayN)-1));
  /* lesson weights: weak accuracy and little study time get more parts */
  var wgt={};
  names.forEach(function(n){
    var w=1,s=a&&a.subj[n];
    if(s&&s.tc>=15&&s.cr/s.tc<.55)w+=1.2;
    if(a&&a.mins[n]!=null&&a.mins[n]<(a.tot/Math.max(1,names.length))*.6)w+=.6;
    wgt[n]=w;
  });
  var got={};names.forEach(function(n){got[n]=lessons[n]/wgt[n]});
  function pick(skip){
    var best=null;names.forEach(function(n){if(skip&&skip.indexOf(n)>-1)return;if(best==null||got[n]<got[best])best=n});
    if(best==null)best=names[0];got[best]+=1/wgt[best];return best;
  }
  function put(d,ri,txt,lesson,test){
    var c={t:txt,c:colOf[lesson]!=null?colOf[lesson]:((TT_SUB.filter(function(x){return x[0]===lesson})[0]||[0,0])[1]),h:'',k:-1,ic:test?'test':'',n:''};
    t.cells[R[ri].id+'_'+d]=c;added.push({d:d,ri:ri,test:!!test,t:txt});if(test)testCnt++;
  }
  for(d=0;d<7;d++){
    var f=filled[d];if(!f.length)continue;
    var need=tgt-f.length;if(need<=0)continue;
    var free=[];R.forEach(function(r,ri){if(f.indexOf(ri)<0)free.push(ri)});
    /* parts next to the user's own parts first */
    var lo=Math.min.apply(null,f),hi=Math.max.apply(null,f);
    free.sort(function(x,y){return Math.min(Math.abs(x-lo),Math.abs(x-hi))-Math.min(Math.abs(y-lo),Math.abs(y-hi))||x-y});
    var dayL=[],hasT=f.some(function(ri){return /تست/.test((ttCell(t,R[ri].id,d)||{}).t||'')});
    f.forEach(function(ri){var l=kcLesson((ttCell(t,R[ri].id,d)||{}).t||'');if(l)dayL.push(l)});
    free.slice(0,need).forEach(function(ri,j){
      if(!hasT&&j===0){var l0=dayL[dayL.length-1]||pick();put(d,ri,'تست '+l0,l0,true);hasT=true;return}
      var l=pick(dayL.slice(-1));dayL.push(l);put(d,ri,l,l,false);
    });
  }
  /* a full table: turn one part per busy day into a test part */
  if(!added.length){
    for(d=0;d<7;d++){
      var f2=filled[d];if(f2.length<3)continue;
      var hasT2=f2.some(function(ri){return /تست/.test((ttCell(t,R[ri].id,d)||{}).t||'')});if(hasT2)continue;
      var ri2=f2[f2.length-1],c2=ttCell(t,R[ri2].id,d),l2=kcLesson(c2.t);if(!l2)continue;
      put(d,ri2,'تست '+l2,l2,true);
    }
  }
  if(!added.length)return {none:true,data:t,added:added};
  var sig='';added.forEach(function(x){sig+=x.d+x.ri+x.t.length});
  var h=0;for(i=0;i<sig.length;i++)h=(h*31+sig.charCodeAt(i))>>>0;
  var ts=Object.keys(t.cells).length;
  return {data:t,added:added,sig:'p'+h.toString(36)+ts,study:added.filter(function(x){return !x.test}).length,tests:added.filter(function(x){return x.test}).length,tgt:tgt};
}
function kcPlanHTML(pl){
  var t=pl.data,R=t.rows.slice(0,TT_MAX),ad={};
  pl.added.forEach(function(x){ad[R[x.ri].id+'_'+x.d]=1});
  var h='<div class="kc-grid" style="--n:'+R.length+'" role="table" aria-label="جدول پیشنهادی"><div class="kc-r kc-hd"><b></b>'+R.map(function(r,i){return '<b>'+fa(i+1)+'</b>'}).join('')+'</div>';
  for(var d=0;d<7;d++){
    h+='<div class="kc-r"><b>'+esc(TT_DAYS[d])+'</b>'+R.map(function(r){
      var c=ttCell(t,r.id,d),nw=ad[r.id+'_'+d],bg=c&&c.c>-1?TT_COL[c.c]:'';
      return '<span class="kc-c'+(nw?' new':'')+'"'+(bg?' style="background:'+bg+'"':'')+'>'+(c?esc(c.t):'')+'</span>';
    }).join('')+'</div>';
  }
  return h+'</div>';
}
function kcMakeTests(v,a){
  var td=todayKey(),cid=ttCatId(),names=Object.keys(a.mins).filter(function(n){return n&&n!=='آزمون'&&a.mins[n]>0}).sort(function(x,y){return a.mins[y]-a.mins[x]}).slice(0,5);
  if(!names.length)names=['ریاضی','فیزیک','شیمی'].slice(0,3);
  var per=Math.max(10,kcRound(v/2,5)),i,n=0;
  for(i=0;i<7;i++){
    var d=addDays(td,i+(i===0?0:0)),l=names[i%names.length];
    if(i===0&&new Date().getHours()>=20)continue;
    state.tasks.push({id:uid(),done:false,doneAt:0,ts:Date.now()+i,t:fa(per)+' تست '+l,n:'برای بالا بردن تعداد تست (پیشنهاد مربی)',d:d,tm:'',te:'',col:'',p:1,c:cid,r:-1,rp:'',st:[],tg:['تست']});n++;
  }
  mutate();toast(fa(n)+' کار تست به برنامه‌ریز اضافه شد',null,null,'ok');
}
var kcEl=null;
function openCoach(){
  if(kcEl)return;
  var a=kcAnalyze(KC_N),adv=kcAdvice(a),pl=kcPlan(a),dis=kcD(),src=kcSrc();
  var st='<div class="hstats kk-gs"><div><b>'+kkShort(a.avg)+'</b><small>میانگین روزانه</small></div><div><b>'+(a.teDays?fa(Math.round(a.teAvg)):'—')+'</b><small>تست در روز</small></div><div><b>'+(a.acc!=null?fa(Math.round(a.acc))+'٪':'—')+'</b><small>درصد درست</small></div></div>'+
    '<p class="hint kc-sub">بر اساس '+fa(a.N)+' روز اخیر · '+fa(a.act)+' روز مطالعه · '+fa(a.teDays)+' گزارش</p>';
  var ah=adv.map(function(x,i){
    return '<div class="kc-tip"><span class="kc-ti">'+icon(x.ic)+'</span><div><b>'+x.h+'</b><p>'+x.t+'</p>'+(x.act?'<button type="button" class="tt-btn" data-kc="act" data-i="'+i+'">'+x.act.lb+'</button>':'')+'</div></div>';
  }).join('');
  var ph='';
  if(!src)ph='<div class="kc-plan"><h3>جدول پیشنهادی</h3><p class="hint">برای اینکه مربی یک جدول شبیه خودت پیشنهاد بدهد، اول جدول هفتگی خودت را در «'+'کنکوریا'+'» بنویس و ذخیره کن.</p><button type="button" class="tt-btn pri" data-kc="tt">باز کردن جدول</button></div>';
  else if(!pl)ph='<div class="kc-plan"><h3>جدول پیشنهادی</h3><p class="hint">جدول تو فعلاً درس‌های قابل تشخیص ندارد. نام درس‌ها را در خانه‌ها بنویس (مثلاً «ریاضی») تا مربی بتواند پیشنهاد بدهد.</p></div>';
  else if(pl.none)ph='<div class="kc-plan"><h3>جدول پیشنهادی</h3><p class="hint">جدولت تقریباً پر و متعادل است و چیزی برای اضافه کردن پیدا نشد. 👌</p></div>';
  else{
    var rej=dis.dis===pl.sig;
    ph='<div class="kc-plan"><h3>جدول پیشنهادی</h3><p class="hint">خانه‌های خودت دست‌نخورده می‌مانند. خانه‌های رنگ‌شده با خط‌چین پیشنهادی هستند: '+[pl.study?fa(pl.study)+' پارت مطالعه':'',pl.tests?fa(pl.tests)+' پارت تست':''].filter(Boolean).join(' و ')+' اضافه شد و درس‌ها بر اساس تعداد، درصد تست و زمان مطالعه‌ات متعادل شدند.</p>'+
      (rej?'<p class="kc-rej">این پیشنهاد را رد کرده‌ای.</p><div class="tt-eb"><button type="button" class="tt-btn" data-kc="again">نمایش دوباره</button></div>'
        :kcPlanHTML(pl)+'<div class="tt-eb"><button type="button" class="tt-btn pri" data-kc="save">ذخیره‌ی جدول پیشنهادی</button><button type="button" class="tt-btn" data-kc="rej">رد کردن</button></div>')+'</div>';
  }
  var sw=ttSheetWrap('<div class="sheet-top"><span></span><h2>مربی هوشمند</h2><button type="button" data-kc="close">بستن</button></div><div class="kc-body">'+st+'<div class="kc-tips">'+ah+'</div>'+ph+'</div>','مربی هوشمند');
  kcEl=sw;
  var w=sw.w,orig=sw.close;
  sw.close=function(){kcEl=null;orig()};
  w.querySelector('.dim').addEventListener('click',function(){kcEl=null});
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-kc]');if(!b)return;var k=b.dataset.kc;
    if(k==='close'){sw.close();return}
    if(k==='tt'){sw.close();actions.openTT();return}
    if(k==='act'){
      var x=adv[+b.dataset.i];if(!x||!x.act)return;
      if(x.act.k==='goal'){kkD().goal=x.act.v;mutate();toast('هدف روزانه '+kkFmt(x.act.v)+' شد',null,null,'ok');b.disabled=true;b.textContent='انجام شد ✓'}
      else if(x.act.k==='tests'){kcMakeTests(x.act.v,a);b.disabled=true;b.textContent='اضافه شد ✓'}
      return;
    }
    if(!pl||pl.none)return;
    if(k==='save'){
      var nm=(ttName(pl.data)||'برنامه')+' (پیشنهادی)',p={id:uid(),name:nm.slice(0,80),upd:Date.now(),data:ttClone(pl.data)};
      p.data.title=p.data.title||'برنامه کنکوریا';
      if(p.data.info&&p.data.info[1]&&typeof p.data.info[1]==='object')p.data.info[1].t=nm.slice(0,80);
      ttPlans().push(p);kcD().dis='';mutate();sw.close();
      toast('«'+nm+'» ذخیره شد؛ از «کنکوریا ← جدول» باز می‌شود',null,null,'ok');
    }else if(k==='rej'){kcD().dis=pl.sig;kcD().ts=Date.now();persist();sw.close();toast('پیشنهاد رد شد',null,null,'info')}
    else if(k==='again'){kcD().dis='';persist();sw.close();openCoach()}
  });
}
actions.openCoach=openCoach;
function kcCard(){
  var sm='از گزارش‌ها و ساعت‌هایت راهکار بگیر و جدول پیشنهادی ببین';
  try{
    var a=kcAnalyze(KC_N);
    if(a.act>=3||a.teDays>=2)sm='میانگین '+kkShort(a.avg)+' در روز'+(a.teDays?' · '+fa(Math.round(a.teAvg))+' تست':'')+' · راهکار و جدول پیشنهادی';
  }catch(er){}
  return '<button type="button" class="wrcard glass" data-act="openCoach"><span class="ib" style="background:linear-gradient(145deg,#a78bfa,#6d4ae0)">'+icon('spark')+'</span><div><b>مربی هوشمند<span class="vbadge">'+icon('star')+'جدید</span></b><small>'+sm+'</small></div></button>';
}
function rpCard(){
  var d=state.profile.rpd;
  if(!rp||rp.ph==='ask'||rp.ph==='confirm'){
    var dd=d||(rp&&Object.keys(rp.a).length?{i:rp.i}:null);
    if(dd)return '<button type="button" class="wrcard glass" data-act="openRP"><span class="ib" style="background:linear-gradient(145deg,#f5a524,#e8833a)">'+icon('edit')+'</span><div><b>ادامه‌ی گزارش نیمه‌کاره</b><small>از همان‌جا که مانده بودی؛ سؤال '+fa((dd.i||0)+1)+'</small></div></button>';
  }
  return '<button type="button" class="wrcard glass" data-act="openRP"><span class="ib" style="background:linear-gradient(145deg,#6f8bff,#3f55e6)">'+icon('edit')+'</span><div><b>گزارش کار روزانه</b><small>جواب بده تا فرم گزارش آماده و قابل کپی شود</small></div></button>';
}

function lsCard(){
  var o=state.tasks.filter(function(t){return !t.done}).length;
  return '<button type="button" class="wrcard glass" data-act="lsOpen"><span class="ib" style="background:linear-gradient(145deg,#a78bfa,#7c5ce6)">'+icon('lists')+("</span><div><b>"+__("دسته‌ها")+"</b><small>")+(o?fa(o)+(" "+__("کار مانده در دسته‌ها و عادت‌ها")):(__("همه‌ی کارها انجام شده")))+'</small></div></button>';
}
function rkCard(){
  var sm='درصدهایت را وارد کن و بازه‌ی رتبه‌ات را ببین';
  try{
    var D=rkD(),e=D.exams.length?D.exams[D.exams.length-1]:null,es=e?rkEst(e,[]):null;
    if(es)sm='آخرین آزمون: درصد '+rkPctTxt(es.cp.p)+'٪ · رتبه‌ی کشور ≈ '+rkFmt(rkRound(es.nat.m));
  }catch(er){}
  return '<button type="button" class="wrcard glass" data-act="rkOpen"><span class="ib" style="background:linear-gradient(145deg,#34d399,#0f9d6e)">'+icon('rank')+'</span><div><b>تخمین رتبه</b><small>'+sm+'</small></div></button>';
}

function tbD(){var p=state.profile;if(!p.tbk||typeof p.tbk!=='object'||!Array.isArray(p.tbk.pdfs))p.tbk=tbClean(null);if(!Array.isArray(p.tbk.imgs))p.tbk.imgs=[];return p.tbk}
function tbCard(){
  var sm='PDF کتاب‌هایت را اضافه کن و داخل برنامه بخوان';
  try{
    var D=tbD(),n=D.pdfs.length,m=D.imgs.length,pt=[];
    if(n)pt.push(fa(n)+' فایل PDF');if(m)pt.push(fa(m)+' عکس');
    if(pt.length)sm=pt.join(' · ');
  }catch(er){}
  return '<button type="button" class="wrcard glass" data-act="tbOpen"><span class="ib" style="background:linear-gradient(145deg,#fbbf24,#e07b0b)">'+icon('book')+'</span><div><b>کتاب‌های درسی</b><small>'+sm+'</small></div></button>';
}
var MZ_LINKS=[
  {img:'mz-maze',url:'https://biomaze.ir/',n:'ماز'},
  {img:'mz-market',url:'https://mazemarket.ir/',n:'ماز مارکت'},
  {img:'mz-digi',url:'https://digimaze.org/',n:'دیجی‌ماز'}
];
function mzBanners(){
  return '<button type="button" class="wrcard glass mz-head" data-act="mzOpen"><span class="ib mz-ib"><img src="img/mz-icon.webp" alt="" draggable="false"></span><div><b>ماز</b><small>سایت‌ها و فروشگاه‌های ماز</small></div></button>';
}
function viewMZ(){
  return head('سه سایت ماز','ماز',{back:1,backAct:'mzBack',backTxt:'کنکوریا'})+'<div class="mz-page">'+MZ_LINKS.map(function(l){
    return '<section class="mz-sec"><h2 class="mz-t">'+l.n+'</h2><a class="mz-ban" href="'+l.url+'" target="_blank" rel="noopener noreferrer" aria-label="رفتن به سایت '+l.n+'"><img src="img/'+l.img+'.webp" alt="'+l.n+'" decoding="async" draggable="false"></a></section>';
  }).join('')+'</div>';
}
actions.mzOpen=function(){ui.tab='mz';render('enter');window.scrollTo(0,0)};
actions.mzBack=function(){ui.tab='kk';render('enter');window.scrollTo(0,0)};
var kkEd=null;
function openKK(id){
  if(kkEd)return;
  var day=ui.kd||todayKey(),ex=null,l=kkList(day),i;
  for(i=0;i<l.length;i++)if(l[i].id===id)ex=l[i];
  var d=ex?{mode:(ex.a&&ex.b)?'rng':'dur',h:Math.floor(ex.m/60),m:ex.m%60,a:ex.a||'',b:ex.b||'',s:ex.s||'',n:ex.n||''}:{mode:'dur',h:0,m:0,a:'',b:'',s:'',n:''};
  var w=document.createElement('div');w.className='sheet-wrap';
  w.innerHTML='<div class="dim"></div><form class="sheet" role="dialog" aria-modal="true" aria-label="ثبت مطالعه" autocomplete="off"></form>';
  document.body.appendChild(w);kkEd=w;
  var form=w.querySelector('form');
  form.innerHTML='<div class="grab"></div><div class="sheet-top"><button type="button" data-k="cancel">انصراف</button><h2>'+(ex?'ویرایش مطالعه':'ثبت مطالعه')+'</h2><button type="submit" class="save">ذخیره</button></div>'+
    '<p class="hint kk-dayl">'+esc(F.long.format(parse(day)))+'</p>'+
    '<div class="kk-prev" id="kkPrev" aria-live="polite"></div>'+
    '<div class="seg" role="group" style="margin-top:8px"><button type="button" data-km="dur">مدت</button><button type="button" data-km="rng">بازه‌ی ساعت</button></div>'+
    '<div class="sec" id="kkDur"><div class="kk-hm"><label><input class="field" id="kkH" type="text" inputmode="numeric" maxlength="2" placeholder="۰" aria-label="ساعت"><span>ساعت</span></label><label><input class="field" id="kkM" type="text" inputmode="numeric" maxlength="3" placeholder="۰" aria-label="دقیقه"><span>دقیقه</span></label></div>'+
      '<div class="chips kk-qk">'+[15,30,45,60].map(function(m){return '<button type="button" class="chip" data-kq="'+m+'">+ '+kkShort(m)+'</button>'}).join('')+'<button type="button" class="chip" data-kz="1">صفر</button></div></div>'+
    '<div class="sec" id="kkRng" hidden><div class="kk-hm"><label><input class="field" id="kkA" type="time" aria-label="از ساعت"><span>از ساعت</span></label><label><input class="field" id="kkB" type="time" aria-label="تا ساعت"><span>تا ساعت</span></label></div><p class="hint">اگر ساعت پایان از شروع کمتر باشد، تا بعد از نیمه‌شب حساب می‌شود. جلسه‌هایی که با هم همپوشانی دارند فقط یک بار شمرده می‌شوند.</p></div>'+
    '<div class="sec"><div class="sec-h"><b>درس</b></div><div class="chips" id="kkSubs"></div><div class="subadd"><input class="field" id="kkSubIn" type="text" maxlength="16" placeholder="درس تازه، مثلاً هندسه" aria-label="درس تازه"><button type="button" class="chip" data-k="subadd">افزودن</button></div></div>'+
    '<div class="sec"><div class="sec-h"><b>یادداشت</b></div><input class="field" id="kkNote" type="text" maxlength="120" placeholder="مثلاً حل تست فصل ۳ (اختیاری)" aria-label="یادداشت"></div>'+
    (ex?'<button type="button" class="danger" data-k="del">'+icon('trash')+'حذف این مطالعه</button>':'');
  var q=function(s){return form.querySelector(s)};
  function durM(){return Math.min(1440,d.h*60+d.m)}
  function rngM(){if(!d.a||!d.b)return 0;var x=kkTm(d.b)-kkTm(d.a);if(x<=0)x+=1440;return x>=1440?0:x}
  function mins(){return d.mode==='rng'?rngM():durM()}
  function setHM(){var t=durM();d.h=Math.floor(t/60);d.m=t%60;q('#kkH').value=d.h?fa(d.h):'';q('#kkM').value=d.m?fa(d.m):''}
  function paint(){
    var m=mins(),el=q('#kkPrev');
    el.textContent=m?kkFmt(m)+((d.mode==='rng'&&kkTm(d.b)<kkTm(d.a))?' (تا بعد از نیمه‌شب)':''):'مدت را مشخص کن';
    el.classList.toggle('bad',!m);
    form.querySelectorAll('[data-km]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.km===d.mode))});
    q('#kkDur').hidden=d.mode!=='dur';q('#kkRng').hidden=d.mode!=='rng';
  }
  function drawSubs(){
    var cust=kkD().subs,list=kkSubs();
    if(d.s&&list.indexOf(d.s)<0)list.push(d.s);
    q('#kkSubs').innerHTML=list.map(function(s){
      var c=cust.indexOf(s)>-1&&KK_SUBS.indexOf(s)<0;
      return '<button type="button" class="chip" data-ks="'+esc(s)+'" style="--cc:'+kkCol(s)+'" aria-pressed="'+(d.s===s)+'"><i></i>'+esc(s)+(c?'<span class="kk-x" data-kx="'+esc(s)+'" role="button" aria-label="حذف درس">×</span>':'')+'</button>';
    }).join('');
  }
  function shake(el){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')}
  function addSub(){
    var inp=q('#kkSubIn'),n=inp.value.trim().replace(/[<>&"']/g,'').slice(0,16);
    if(!n){shake(inp);inp.focus();return}
    if(kkSubs().indexOf(n)<0){var cs=kkD().subs;if(cs.length>=20){toast('حداکثر ۲۰ درس اضافه می‌شود',null,null,'warn');return}cs.push(n);persist()}
    d.s=n;inp.value='';drawSubs();
  }
  q('#kkH').value=d.h?fa(d.h):'';q('#kkM').value=d.m?fa(d.m):'';
  q('#kkA').value=d.a;q('#kkB').value=d.b;q('#kkNote').value=d.n;
  paint();drawSubs();
  document.documentElement.style.overflow='hidden';
  function close(){
    if(!kkEd)return;kkEd=null;
    document.removeEventListener('keydown',kd);
    w.classList.remove('open');document.documentElement.style.overflow='';
    setTimeout(function(){w.remove()},350);
  }
  function kd(e){if(e.key==='Escape')close()}
  document.addEventListener('keydown',kd);
  form.addEventListener('input',function(e){
    var t=e.target;
    if(t.id==='kkH'){d.h=Math.min(24,kkNum(t.value))}
    else if(t.id==='kkM'){d.m=kkNum(t.value)}
    else if(t.id==='kkA'){d.a=t.value}
    else if(t.id==='kkB'){d.b=t.value}
    else if(t.id==='kkNote'){d.n=t.value}
    paint();
  });
  form.addEventListener('change',function(e){if(e.target.id==='kkH'||e.target.id==='kkM'){setHM();paint()}});
  form.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.id==='kkSubIn'){e.preventDefault();addSub()}});
  w.addEventListener('click',function(e){
    if(e.target.classList.contains('dim')){close();return}
    var x=e.target.closest('[data-kx]');
    if(x){
      var nm=x.dataset.kx;kkD().subs=kkD().subs.filter(function(s){return s!==nm});
      if(d.s===nm)d.s='';
      persist();drawSubs();return;
    }
    var b=e.target.closest('button');if(!b||!form.contains(b))return;
    if(b.dataset.km){d.mode=b.dataset.km;paint();return}
    if(b.dataset.kq){d.h=Math.floor(Math.min(1440,durM()+(+b.dataset.kq))/60);d.m=Math.min(1440,durM()+(+b.dataset.kq))%60;setHM();paint();return}
    if(b.dataset.kz){d.h=0;d.m=0;setHM();paint();return}
    if(b.dataset.ks!==undefined){d.s=(d.s===b.dataset.ks)?'':b.dataset.ks;drawSubs();return}
    var k=b.dataset.k;
    if(k==='cancel')close();
    else if(k==='subadd')addSub();
    else if(k==='del'&&ex){
      askConfirm({title:'حذف مطالعه',msg:'این مورد ('+kkFmt(ex.m)+') حذف می‌شود.',btns:[{t:'حذف',cls:'bad',fn:function(){close();kkDel(day,ex.id)}}]});
    }
  });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var m=mins();
    if(!m){shake(q('#kkPrev'));return}
    var o={id:ex?ex.id:uid(),m:m,s:d.s,a:d.mode==='rng'?d.a:'',b:d.mode==='rng'?d.b:'',n:d.n.trim().replace(/[<>&"']/g,'').slice(0,120),ts:ex?ex.ts:Date.now()};
    if(ex)Object.assign(ex,o);
    else{if(kkFull(day))return;kkPut(day,o)}
    close();mutate();
    notify('ok','مطالعه ثبت شد',kkFmt(m)+(o.s?' · '+o.s:''));
  });
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}

/* ---------- Konkooria: rank estimation UI ---------- */
ui.rksec='est';
function rkD(){var p=state.profile;if(!p.rk||typeof p.rk!=='object')p.rk=rkClean(null);return p.rk}
function rkChips(act,items,cur){return '<div class="chips rk-ch">'+items.map(function(i){return '<button type="button" class="chip" data-act="'+act+'" data-v="'+i[0]+'" aria-pressed="'+(cur===i[0])+'">'+i[1]+'</button>'}).join('')+'</div>'}
function rkSel(key,items,cur,lbl){return '<select class="field rk-in rk-sel" data-rk="'+key+'" aria-label="'+lbl+'">'+items.map(function(i){return '<option value="'+i[0]+'"'+(String(cur)===String(i[0])?' selected':'')+'>'+esc(i[1])+'</option>'}).join('')+'</select>'}
function rkRange(a,b){return fa(rkFmt(rkRound(a)))+' تا '+fa(rkFmt(rkRound(b)))}
function rkPctTxt(p){return fa((Math.round(p*10)/10).toFixed(1).replace(/\.0$/,'')).replace('.','٫')}
function rkFormHTML(){
  var D=rkD(),x=D.cur,G=RK_G[x.g];
  var info='<section class="glass rk-card"><h3 class="rk-h">اطلاعات کنکور</h3>'+
    '<div class="rk-l">گروه آزمایشی</div>'+rkChips('rkg',Object.keys(RK_G).map(function(k){return [k,RK_G[k].n]}),x.g)+
    '<div class="rk-two"><div><div class="rk-l">سال کنکور</div>'+rkSel('yr',RK_YEARS.map(function(y){return [y,fa(y)]}),x.yr,'سال کنکور')+'</div>'+
    '<div><div class="rk-l">نظام آموزشی</div>'+rkSel('sy',[['new','نظام جدید'],['old','نظام قدیم']],x.sy,'نظام آموزشی')+'</div></div>'+
    '<div class="rk-l">سهمیه‌ی منطقه</div>'+rkChips('rkrg',Object.keys(RK_QS).map(function(k){return [k,RK_QS[k].n]}),x.rg)+
    '<div class="rk-two"><div><div class="rk-l">سهمیه‌ی خاص</div>'+rkSel('sq',Object.keys(RK_SQ).map(function(k){return [k,RK_SQ[k].n]}),x.sq,'سهمیه‌ی خاص')+'</div>'+
    '<div><div class="rk-l">نوع آزمون</div>'+rkSel('ty',[['mock','آزمون آزمایشی'],['real','کنکور سراسری']],x.ty,'نوع آزمون')+'</div></div>'+
    '<div class="rk-l">سختی آزمون</div>'+rkChips('rkdf',Object.keys(RK_DF).map(function(k){return [k,RK_DF[k].n]}),x.df)+
    '<p class="hint">سختی آزمون روی تخمین اثر می‌گذارد: درصد یکسان در آزمون آسان، رتبه‌ی ضعیف‌تری می‌دهد.</p></section>';
  var rows=G.L.map(function(l){
    var nm=l[0],inp;
    if(x.mode==='cnt'){
      var c=x.cn[nm]||{};
      inp='<div class="rk-cn">'+[['c','صحیح'],['w','غلط'],['n','نزده']].map(function(f){return '<label><input class="field rk-in rk-n" data-rk="cn" data-l="'+esc(nm)+'" data-f="'+f[0]+'" type="text" inputmode="numeric" maxlength="3" placeholder="۰" value="'+(c[f[0]]!=null?fa(c[f[0]]):'')+'" aria-label="'+esc(nm)+' '+f[1]+'"><span>'+f[1]+'</span></label>'}).join('')+'<b class="rk-pv" data-pv="'+esc(nm)+'"></b></div>';
    }else{
      var v=x.pc[nm];
      inp='<input class="field rk-in rk-n rk-p" data-rk="pc" data-l="'+esc(nm)+'" type="text" inputmode="decimal" maxlength="6" placeholder="درصد" value="'+(typeof v==='number'?fa(String(v).replace('.','٫')):'')+'" aria-label="درصد '+esc(nm)+'">';
    }
    return '<div class="rk-row"><div class="rk-ln"><b>'+esc(nm)+'</b><small>ضریب '+fa(l[1])+'</small></div>'+inp+'</div>';
  }).join('');
  var inputs='<section class="glass rk-card"><h3 class="rk-h">درصد دروس</h3>'+
    segG([['pct','درصد'],['cnt','تعداد پاسخ']],'rkmode',x.mode)+
    '<input class="field rk-in rk-nm" data-rk="nm" type="text" maxlength="30" placeholder="نام آزمون (مثلاً آزمون ۱۲ مهر)" value="'+esc(x.nm)+'" aria-label="نام آزمون">'+
    '<div class="rk-rows">'+rows+'</div>'+
    (x.mode==='cnt'?'<p class="hint">درصد با نمره‌ی منفی حساب می‌شود: هر پاسخ غلط یک‌سوم نمره‌ی پاسخ درست را کم می‌کند. «نزده» را هم وارد کن تا تعداد کل سؤال‌ها مشخص شود.</p>':'<p class="hint">درصد می‌تواند منفی هم باشد. درسی که وارد نکنی در محاسبه نمی‌آید.</p>')+
    '<div class="rk-btns"><button type="button" class="chip rk-main" data-act="rkSave">'+(x.eid?'به‌روزرسانی آزمون':'ذخیره‌ی آزمون')+'</button><button type="button" class="chip" data-act="rkNew">آزمون تازه</button></div></section>';
  return info+inputs+'<div id="rkRes">'+rkResHTML()+'</div>';
}
function rkBand(lbl,cls,a,b){return '<div class="rk-bd '+cls+'"><small>'+lbl+'</small><b>'+rkFmt(rkRound(a))+'</b></div>'}
function rkResHTML(){
  var D=rkD(),x=D.cur,e=rkEst(x,D.exams);
  if(!e)return '<section class="glass rk-card rk-empty"><b>نتیجه اینجا نشان داده می‌شود</b><p>درصد دست‌کم یک درس را وارد کن تا رتبه‌ی احتمالی‌ات حساب شود.</p></section>';
  var qlbl=x.sq?RK_SQ[x.sq].n:RK_QS[x.rg].n;
  var res='<section class="glass rk-card rk-res"><h3 class="rk-h">رتبه‌ی احتمالی</h3>'+
    '<div class="rk-big"><small>رتبه در سهمیه ('+esc(qlbl)+')</small><b>'+rkRange(e.q.o,e.q.p)+'</b></div>'+
    '<div class="rk-big rk-nat"><small>رتبه‌ی کشوری</small><b>'+rkRange(e.nat.o,e.nat.p)+'</b></div>'+
    '<div class="rk-bands">'+rkBand('خوش‌بینانه','g',e.q.o)+rkBand('واقع‌بینانه','m',e.q.m)+rkBand('بدبینانه','b',e.q.p)+'</div>'+
    '<p class="hint rk-bn">عددهای سه‌حالت، رتبه‌ی سهمیه‌اند. درصد وزنی: '+rkPctTxt(e.cp.p)+'٪ · '+fa(e.cp.n)+' درس از '+fa(RK_G[x.g].L.length)+'</p>'+
    '<div class="rk-conf"><div class="rk-ct"><span>میزان اطمینان</span><b>'+rkConfLbl(e.conf)+' · '+fa(e.conf)+'٪</b></div><div class="rk-bar"><i style="width:'+e.conf+'%"></i></div>'+
    '<p class="hint">'+(e.n>1?'با '+fa(e.n)+' آزمون (آخرین‌ها) محاسبه شد؛ هرچه آزمون‌های بیشتر و پایدارتر داشته باشی، بازه باریک‌تر می‌شود.':'با یک آزمون محاسبه شد؛ چند آزمون ذخیره کنی بازه دقیق‌تر می‌شود.')+(e.cp.cov<.7?' همه‌ی دروس را وارد نکرده‌ای و اطمینان کمتر است.':'')+'</p></div>'+
    '<p class="rk-disc">این برآورد با منحنی تقریبیِ درصد به رتبه و تعداد داوطلبان قابل‌ویرایش محاسبه می‌شود، نه با آمار رسمی داوطلبان. رتبه‌ی رسمی را فقط سازمان سنجش اعلام می‌کند. برای دقت بیشتر، در تنظیمات (دکمه‌ی بالا) تعداد داوطلبان و سهم سهمیه‌ها را با آمار رسمی همان سال به‌روز کن.</p></section>';
  var u=rkUni(x,e),uh='';
  [['hi','شانس بالا','g'],['mid','شانس متوسط','m'],['lo','شانس پایین','b']].forEach(function(t){
    if(u[t[0]].length)uh+='<div class="rk-ug"><span class="rk-tag '+t[2]+'">'+t[1]+'</span><div class="rk-uc">'+u[t[0]].map(function(n){return '<em>'+esc(n)+'</em>'}).join('')+'</div></div>';
  });
  var uni='<section class="glass rk-card"><h3 class="rk-h">شانس قبولی رشته‌ها</h3>'+(uh||'<p class="hint">با این رتبه رشته‌ای از فهرست نمونه در محدوده نیست. با بالا رفتن درصدها فهرست پر می‌شود.</p>')+'<p class="hint">رتبه‌ی قبولی رشته‌ها در فهرست نمونه تقریبی است و ظرفیت‌ها و دانشگاه مشخص نشده‌اند. فهرست کامل را از دفترچه‌ی انتخاب رشته ببین.</p></section>';
  var rows=rkLessons(x,e).sort(function(a,b){return b.pot-a.pot}),mx=1;
  rows.forEach(function(r){if(r.gain>mx)mx=r.gain});
  var an='<section class="glass rk-card"><h3 class="rk-h">نقاط قوت و ضعف</h3>'+rows.slice(0,6).map(function(r){
    var tg=r.p>=e.cp.p+8?'<span class="rk-tag g">قوت</span>':r.p<=e.cp.p-8?'<span class="rk-tag b">ضعف</span>':'';
    return '<div class="rk-ar"><div class="rk-at"><b>'+esc(r.n)+'</b>'+tg+'<small>'+rkPctTxt(r.p)+'٪</small></div><div class="rk-bar"><i style="width:'+Math.max(4,Math.round(r.gain/mx*100))+'%"></i></div><small>۱۰ درصد بیشتر ≈ '+rkFmt(rkRound(r.gain))+' رتبه بهتر در کشور</small></div>';
  }).join('')+'<p class="hint">درس‌ها بر اساس بیشترین فرصت بهبود (ضریب × درصدِ باقی‌مانده) مرتب شده‌اند.</p></section>';
  var act='<div class="rk-btns rk-end"><button type="button" class="chip" data-act="rkSim">'+icon('target')+' شبیه‌ساز درصدها</button><button type="button" class="chip" data-act="rkRep">'+icon('download')+' گزارش قابل ذخیره</button></div>';
  return res+act+uni+an;
}
function rkChart(list){
  var a=list.slice(0,8).reverse();if(a.length<1)return '';
  var W=320,H=150,bw=Math.min(30,Math.floor(260/a.length)-8),gap=(W-20-bw*a.length)/Math.max(1,a.length),mx=100,mn=Math.min(0,Math.min.apply(null,a.map(function(e){return rkComp(e).p})));
  var rng=mx-mn,s='<svg viewBox="0 0 '+W+' '+(H+30)+'" role="img" aria-label="مقایسه‌ی درصد وزنی آزمون‌ها">';
  [0,50,100].forEach(function(v){var y=10+(H-10)*(1-(v-mn)/rng);s+='<line class="gl" x1="10" x2="'+(W-10)+'" y1="'+y+'" y2="'+y+'"/><text x="2" y="'+(y-2)+'" font-size="9">'+fa(v)+'</text>'});
  a.forEach(function(e,i){
    var p=rkComp(e).p,x0=10+gap/2+i*(bw+gap),y0=10+(H-10)*(1-(Math.max(0,p)-mn)/rng),yb=10+(H-10)*(1-(0-mn)/rng),h=Math.max(2,Math.abs(yb-(10+(H-10)*(1-(p-mn)/rng))));
    s+='<rect class="bar-r" rx="6" x="'+x0+'" y="'+(p>=0?y0:yb)+'" width="'+bw+'" height="'+h+'"'+(i===a.length-1?'':' opacity=".55"')+'/><text class="bar-v" text-anchor="middle" x="'+(x0+bw/2)+'" y="'+((p>=0?y0:yb+h)+(p>=0?-4:12))+'" font-size="10">'+rkPctTxt(p)+'</text><text text-anchor="middle" x="'+(x0+bw/2)+'" y="'+(H+16)+'" font-size="9.5">'+esc((e.nm||'آزمون').slice(0,7))+'</text>';
  });
  return s+'</svg>';
}
function rkHistHTML(){
  var D=rkD(),l=D.exams.slice().sort(function(a,b){return b.ts-a.ts});
  if(!l.length)return '<section class="glass rk-card rk-empty"><b>هنوز آزمونی ذخیره نکرده‌ای</b><p>در بخش «تخمین» درصدها را وارد کن و «ذخیره‌ی آزمون» را بزن تا روند پیشرفتت اینجا دیده شود.</p></section>';
  var cp=l.map(function(e){return rkComp(e)}).map(function(c){return c?c.p:0});
  var delta=l.length>1?cp[0]-cp[1]:null;
  var top='<section class="glass chart"><div class="chart-h"><h3>مقایسه‌ی آزمون‌ها</h3></div>'+rkChart(l)+(delta!==null?'<p class="hint">نسبت به آزمون قبلی: '+(delta>=0?'+':'−')+rkPctTxt(Math.abs(delta))+' درصد '+(delta>=0?'بهتر':'کمتر')+'</p>':'<p class="hint">ستون‌ها درصد وزنی هر آزمون‌اند.</p>')+'</section>';
  var rows=l.map(function(e){
    var es=rkEst(e,[]);
    return '<div class="glass rk-hi"><div class="rk-hm"><b>'+esc(e.nm||'آزمون بدون نام')+'</b><small>'+esc(F.long.format(new Date(e.ts)))+' · '+RK_G[e.g].n+'</small></div><div class="rk-hv"><b>'+(es?rkPctTxt(es.cp.p)+'٪':'—')+'</b><small>'+(es?'رتبه‌ی کشور ≈ '+rkFmt(rkRound(es.nat.m)):'')+'</small></div><div class="rk-ha"><button type="button" class="round glass" data-act="rkEdit" data-v="'+e.id+'" aria-label="ویرایش">'+icon('edit')+'</button><button type="button" class="round glass" data-act="rkDel" data-v="'+e.id+'" aria-label="حذف">'+icon('trash')+'</button></div></div>';
  }).join('');
  return top+'<h3 class="gh"><span>آزمون‌های ذخیره‌شده</span></h3>'+rows;
}
function viewRK(){
  var D=rkD(),x=D.cur,hist=ui.rksec==='hist';
  var sub=hist?(D.exams.length?fa(D.exams.length)+' آزمون ذخیره‌شده':'هنوز آزمونی ذخیره نشده'):RK_G[x.g].n+' · '+fa(x.yr);
  return head(sub,'تخمین رتبه',{back:1,backAct:'rkBack',backTxt:'کنکوریا',right:'<button type="button" class="round glass" data-act="rkSet" aria-label="تنظیمات داده‌ها">'+icon('tools')+'</button>'})+segG([['est','تخمین'],['hist','تاریخچه']],'rksec',hist?'hist':'est')+(hist?rkHistHTML():rkFormHTML());
}
/* ---------- textbooks = PDF library: list, add, rename, delete ---------- */
function tbNative(){return capGet('PdfViewer')}
function tbSize(b){
  if(!(b>0))return '';
  var m=b/1048576;
  if(m>=1)return fa((Math.round(m*10)/10).toString().replace('.','٫'))+' مگابایت';
  return fa(Math.max(1,Math.round(b/1024)))+' کیلوبایت';
}
function tbErrMsg(e){
  var m=String((e&&e.message)||e||'');
  if(m==='password')return 'این PDF رمز دارد و باز نمی‌شود';
  if(m==='invalid'||m==='empty')return 'این فایل PDF سالم نیست یا باز نمی‌شود';
  if(m==='missing')return 'فایل روی این دستگاه نیست. حذفش کن و دوباره اضافه کن';
  if(m==='memory')return 'حافظه کم است. بزرگ‌نمایی را کمتر کن';
  return 'انجام نشد. دوباره امتحان کن';
}
function viewTB(){
  var L=tbD().pdfs,IM=tbD().imgs;
  var addBtn='<button type="button" class="btn bk-add" data-act="tbNew">'+icon('plus')+'افزودن فایل PDF</button><div class="bk-adds2"><button type="button" class="btn bk-add2" data-act="imCam">'+icon('camera')+'عکس با دوربین</button><button type="button" class="btn bk-add2" data-act="imGal">'+icon('plus')+'عکس از گالری</button></div>';
  var body='';
  if(L.length){
    body='<h3 class="gh"><span>فایل‌های من</span><span>'+fa(L.length)+'</span></h3>'+L.map(function(b){
      var pr=b.pg>1?Math.round((b.lp-1)*100/(b.pg-1)):0;
      var meta=[fa(b.pg)+' صفحه'],sz=tbSize(b.sz);
      if(sz)meta.push(sz);
      var sub=meta.join(' · ')+(b.lp>1?' · آخرین صفحه: '+fa(b.lp):'');
      return '<section class="glass rk-card pdf-it"><div class="pdf-row"><button type="button" class="pdf-main" data-act="pdfOpen" data-v="'+b.id+'" aria-label="باز کردن '+esc(b.n)+'"><span class="pdf-ic">'+icon('pdf')+'</span><span class="pdf-tx"><b>'+esc(b.n)+'</b><small>'+sub+'</small></span></button><div class="bk-ctl"><button type="button" class="round glass" data-act="pdfRen" data-v="'+b.id+'" aria-label="تغییر نام">'+icon('edit')+'</button><button type="button" class="round glass" data-act="pdfDel" data-v="'+b.id+'" aria-label="حذف فایل">'+icon('trash')+'</button></div></div>'+(b.lp>1?'<div class="bk-bar"><i style="width:'+pr+'%"></i></div>':'')+'</section>';
    }).join('');
  }
  if(IM.length){
    body+='<h3 class="gh"><span>عکس‌ها و اسکن‌ها</span><span>'+fa(IM.length)+'</span></h3><div class="im-grid">'+IM.map(function(b){return '<button type="button" class="im-t glass" data-act="imOpen" data-v="'+b.id+'" aria-label="'+esc(b.n)+'"><img alt="" data-tid="'+b.id+'"><small>'+esc(b.n)+'</small></button>'}).join('')+'</div>';
  }
  if(!L.length&&!IM.length){
    body='<div class="empty"><div class="badge">'+icon('pdf')+'</div><h3>هنوز فایلی نیست</h3><p>کتاب‌های درسی‌ات را به‌صورت PDF اضافه کن و همین‌جا بخوان، یا از جزوه‌ات عکس بگیر و اسکن کن.</p></div>';
  }
  return head((L.length+IM.length)?fa(L.length+IM.length)+' مورد':'هنوز چیزی نیست','کتاب‌های درسی',{back:1,backAct:'tbBack',backTxt:'کنکوریا'})+addBtn+body;
}
actions.tbBack=function(){ui.tab='kk';render('enter');window.scrollTo(0,0)};
actions.tbOpen=function(){ui.tab='tb';render('enter');window.scrollTo(0,0)};
actions.tbNew=async function(){
  var P=tbNative();
  if(!P){toast('افزودن PDF فقط در برنامهٔ اندروید کار می‌کند',null,null,'warn');return}
  if(tbD().pdfs.length>=200){toast('حداکثر ۲۰۰ فایل',null,null,'warn');return}
  var r;
  try{r=await P.pick()}catch(e){toast(tbErrMsg(e),null,null,'warn');return}
  if(!r||r.cancelled||!r.id)return;
  var n=String(r.name||'PDF').replace(/[<>&"']/g,'').trim().slice(0,60)||'PDF';
  tbD().pdfs.unshift({id:String(r.id),n:n,sz:Math.max(0,Math.round(+r.size)||0),pg:Math.max(1,Math.round(+r.pages)||1),lp:1,ad:Date.now()});
  mutate();
  notify('ok','فایل اضافه شد',n);
};
actions.pdfDel=function(d){
  var b=tbD().pdfs.find(function(x){return x.id===d.v});if(!b)return;
  askConfirm({title:'حذف فایل',msg:'«'+b.n+'» از برنامه پاک می‌شود. فایل اصلی روی گوشی‌ات سر جایش می‌ماند.',btns:[{t:'حذف',cls:'bad',fn:function(){
    try{localStorage.removeItem('ario_pdfan_'+b.id)}catch(e){}
    var P=tbNative();
    if(P){try{P.remove({id:b.id}).catch(function(){})}catch(e){}}
    var D=tbD();D.pdfs=D.pdfs.filter(function(x){return x.id!==b.id});mutate();
  }}]});
};
actions.pdfRen=function(d){
  var b=tbD().pdfs.find(function(x){return x.id===d.v});if(!b)return;
  askText({title:'تغییر نام',val:b.n,btn:'ذخیره',fn:function(v){
    v=String(v||'').replace(/[<>&"']/g,'').trim().slice(0,60);
    if(!v)return;
    var x=tbD().pdfs.find(function(q){return q.id===b.id});if(x){x.n=v;mutate()}
  }});
};
/* small text-input dialog (same look as askConfirm) */
function askText(o){
  var w=document.createElement('div');w.className='cfm-wrap';
  w.innerHTML=("<div class=\"dim\"></div><div class=\"cfm glass\" role=\"dialog\" aria-modal=\"true\"><h3></h3><input class=\"field cfm-in\" type=\"text\" maxlength=\"60\" aria-label=\""+__("نام")+"\"><div class=\"cfm-b\"></div></div>");
  w.querySelector('h3').textContent=o.title||'';
  var inp=w.querySelector('input');inp.value=o.val||'';
  function close(fn){w.classList.remove('open');setTimeout(function(){w.remove()},300);document.removeEventListener('keydown',kd);if(fn)setTimeout(fn,60)}
  function ok(){var v=inp.value;close(function(){o.fn(v)})}
  function kd(e){if(e.key==='Escape')close();else if(e.key==='Enter'){e.preventDefault();ok()}}
  var box=w.querySelector('.cfm-b');
  var b1=document.createElement('button');b1.type='button';b1.className='pri';b1.textContent=o.btn||(__("تأیید"));b1.addEventListener('click',ok);box.appendChild(b1);
  var b2=document.createElement('button');b2.type='button';b2.textContent=(__("انصراف"));b2.addEventListener('click',function(){close()});box.appendChild(b2);
  w.querySelector('.dim').addEventListener('click',function(){close()});
  document.addEventListener('keydown',kd);
  document.body.appendChild(w);
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open');inp.focus();inp.select()})});
}

/* ---------- photos & scanned notes (stored in IndexedDB; only the small list lives in the profile) ---------- */
var fdb=null,imURL={};
function fdbOpen(){return new Promise(function(res,rej){
  if(fdb)return res(fdb);
  var r=indexedDB.open('ario_files',1);
  r.onupgradeneeded=function(){if(!r.result.objectStoreNames.contains('img'))r.result.createObjectStore('img')};
  r.onsuccess=function(){fdb=r.result;res(fdb)};r.onerror=function(){rej(r.error)};
})}
function fdbReq(mode,fn){return fdbOpen().then(function(db){return new Promise(function(res,rej){
  var tx=db.transaction('img',mode),rq=fn(tx.objectStore('img'));
  tx.oncomplete=function(){res(rq?rq.result:null)};tx.onerror=tx.onabort=function(){rej(tx.error||new Error('db'))};
})})}
function fdbPut(k,v){return fdbReq('readwrite',function(s){return s.put(v,k)})}
function fdbGet(k){return fdbReq('readonly',function(s){return s.get(k)})}
function fdbDel(k){return fdbReq('readwrite',function(s){return s.delete(k)})}
function imNewId(){return 'i'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function imLoad(file){return new Promise(function(res,rej){
  var u=URL.createObjectURL(file),im=new Image();
  im.onload=function(){URL.revokeObjectURL(u);res(im)};
  im.onerror=function(){URL.revokeObjectURL(u);rej(new Error('invalid'))};
  im.src=u;
})}
function imToCanvas(im,max){
  var w=im.naturalWidth||im.width,h=im.naturalHeight||im.height,k=Math.min(1,max/Math.max(w,h));
  var c=document.createElement('canvas');c.width=Math.max(1,Math.round(w*k));c.height=Math.max(1,Math.round(h*k));
  c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c;
}
function imBlob(c,q){return new Promise(function(res){c.toBlob(function(b){res(b)},'image/jpeg',q)})}
async function imSave(canvas,id){
  var full=await imBlob(canvas,0.86),s=Math.min(1,260/Math.max(canvas.width,canvas.height));
  var tc=document.createElement('canvas');tc.width=Math.max(1,Math.round(canvas.width*s));tc.height=Math.max(1,Math.round(canvas.height*s));
  tc.getContext('2d').drawImage(canvas,0,0,tc.width,tc.height);
  var th=await imBlob(tc,0.7);
  if(!full||!th)throw new Error('invalid');
  await fdbPut(id,{full:full,thumb:th});
  if(imURL[id]){URL.revokeObjectURL(imURL[id]);delete imURL[id]}
  return {w:canvas.width,h:canvas.height};
}
async function imCreate(canvas){
  var id=imNewId(),m=await imSave(canvas,id),D=tbD();
  D.imgs.unshift({id:id,n:'اسکن '+fa(D.imgs.length+1),w:m.w,h:m.h,ad:Date.now()});
  mutate();notify('ok','عکس اضافه شد','');
}
async function imAdd(files){
  var list=files.filter(function(f){return !f.type||/^image\//.test(f.type)});
  if(!list.length)return;
  if(tbD().imgs.length+list.length>300){toast('حداکثر ۳۰۰ عکس',null,null,'warn');return}
  try{
    if(list.length===1){
      var c=imToCanvas(await imLoad(list[0]),2400);
      imEditor(c,{title:'برش و تنظیم',onSave:imCreate});
    }else{
      var k;for(k=0;k<list.length;k++)await imCreate(imToCanvas(await imLoad(list[k]),2000));
    }
  }catch(e){toast('خواندن عکس ممکن نشد',null,null,'warn')}
}
function pickFiles(accept,capture,multi){
  return new Promise(function(res){
    var old=document.getElementById('pkIn');if(old)old.remove();
    var i=document.createElement('input');i.type='file';i.id='pkIn';i.accept=accept;i.hidden=true;
    if(capture)i.setAttribute('capture',capture);if(multi)i.multiple=true;
    i.addEventListener('change',function(){var f=Array.prototype.slice.call(i.files||[]);i.remove();res(f)});
    document.body.appendChild(i);i.click();
  });
}
actions.imCam=async function(){var f=await pickFiles('image/*','environment',false);if(f.length)imAdd(f)};
actions.imGal=async function(){var f=await pickFiles('image/*',null,true);if(f.length)imAdd(f)};
function tbFill(){
  document.querySelectorAll('#view img[data-tid]').forEach(function(el){
    var id=el.dataset.tid;
    if(imURL[id]){el.src=imURL[id];return}
    fdbGet(id).then(function(r){
      if(!r||!r.thumb){el.parentNode.classList.add('miss');return}
      var u=URL.createObjectURL(r.thumb);imURL[id]=u;if(el.isConnected)el.src=u;
    }).catch(function(){el.parentNode.classList.add('miss')});
  });
}
function imApplyF(ctx,w,h,f){
  var d=ctx.getImageData(0,0,w,h),a=d.data,i,g;
  for(i=0;i<a.length;i+=4){g=0.299*a[i]+0.587*a[i+1]+0.114*a[i+2];if(f==='doc'){g=(g-128)*1.6+148;g=g<0?0:g>255?255:g}a[i]=a[i+1]=a[i+2]=g}
  ctx.putImageData(d,0,0);
}
/* crop / rotate / filter screen */
var ied={on:false,done:null};
function iedDo(){if(ied.done)ied.done()}
function imEditor(src,o){
  if(ied.on)return;
  ied.on=true;
  var cur=src,f='orig',K={x:0,y:0,w:1,h:1},MIN=0.1,dw=0,dh=0,busy=false,drag=null;
  function cl(v,a,b){return v<a?a:v>b?b:v}
  var el=document.createElement('div');el.className='imed';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
  el.innerHTML='<div class="imed-top"><button type="button" class="round glass" data-ie="cancel" aria-label="انصراف">'+icon('close')+'</button><b></b><button type="button" class="imed-ok" data-ie="ok">ذخیره</button></div>'+
    '<div class="imed-st"><div class="imed-box"><canvas class="imed-cv"></canvas><div class="imed-cr"><i data-h="tl" class="tl"></i><i data-h="tr" class="tr"></i><i data-h="bl" class="bl"></i><i data-h="br" class="br"></i></div></div></div>'+
    '<div class="imed-bt"><button type="button" data-ie="rot">چرخش ۹۰°</button><button type="button" data-ie="f-orig" aria-pressed="true">اصلی</button><button type="button" data-ie="f-gray" aria-pressed="false">خاکستری</button><button type="button" data-ie="f-doc" aria-pressed="false">سند</button><button type="button" data-ie="reset">کل عکس</button></div>';
  el.querySelector('.imed-top b').textContent=o.title||'';
  var box=el.querySelector('.imed-box'),cv=el.querySelector('canvas'),crEl=el.querySelector('.imed-cr'),okB=el.querySelector('.imed-ok');
  function paintCr(){crEl.style.left=K.x*100+'%';crEl.style.top=K.y*100+'%';crEl.style.width=K.w*100+'%';crEl.style.height=K.h*100+'%'}
  function setF(v){f=v;cv.style.filter=v==='gray'?'grayscale(1)':v==='doc'?'grayscale(1) contrast(1.6) brightness(1.12)':'none';el.querySelectorAll('[data-ie^="f-"]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.ie==='f-'+v)})}
  function fit(){
    var st=el.querySelector('.imed-st'),aw=st.clientWidth-24,ah=st.clientHeight-24;
    if(aw<40||ah<40)return;
    var k=Math.min(aw/cur.width,ah/cur.height);
    dw=Math.max(40,Math.floor(cur.width*k));dh=Math.max(40,Math.floor(cur.height*k));
    box.style.width=dw+'px';box.style.height=dh+'px';
    var dpr=Math.min(window.devicePixelRatio||1,2);cv.width=Math.round(dw*dpr);cv.height=Math.round(dh*dpr);
    cv.getContext('2d').drawImage(cur,0,0,cv.width,cv.height);paintCr();
  }
  function rotate(){
    var c=document.createElement('canvas');c.width=cur.height;c.height=cur.width;
    var x=c.getContext('2d');x.translate(c.width,0);x.rotate(Math.PI/2);x.drawImage(cur,0,0);
    cur=c;K={x:0,y:0,w:1,h:1};fit();
  }
  crEl.addEventListener('pointerdown',function(e){
    drag={h:(e.target.dataset&&e.target.dataset.h)||'mv',x:e.clientX,y:e.clientY,c:{x:K.x,y:K.y,w:K.w,h:K.h},id:e.pointerId};
    try{crEl.setPointerCapture(e.pointerId)}catch(x){}
    e.preventDefault();
  });
  crEl.addEventListener('pointermove',function(e){
    if(!drag||e.pointerId!==drag.id||!dw)return;
    var dx=(e.clientX-drag.x)/dw,dy=(e.clientY-drag.y)/dh,c0=drag.c,hd=drag.h,x=c0.x,y=c0.y,w=c0.w,h=c0.h,n;
    if(hd==='mv'){x=cl(c0.x+dx,0,1-c0.w);y=cl(c0.y+dy,0,1-c0.h)}
    else{
      if(hd[1]==='l'){n=cl(c0.x+dx,0,c0.x+c0.w-MIN);w=c0.x+c0.w-n;x=n}else w=cl(c0.w+dx,MIN,1-c0.x);
      if(hd[0]==='t'){n=cl(c0.y+dy,0,c0.y+c0.h-MIN);h=c0.y+c0.h-n;y=n}else h=cl(c0.h+dy,MIN,1-c0.y);
    }
    K={x:x,y:y,w:w,h:h};paintCr();
  });
  function up(e){if(drag&&e.pointerId===drag.id)drag=null}
  crEl.addEventListener('pointerup',up);crEl.addEventListener('pointercancel',up);
  async function save(){
    if(busy)return;busy=true;okB.disabled=true;
    try{
      var sw=Math.max(1,Math.round(K.w*cur.width)),sh=Math.max(1,Math.round(K.h*cur.height)),sx=Math.round(K.x*cur.width),sy=Math.round(K.y*cur.height);
      var out=document.createElement('canvas');out.width=sw;out.height=sh;
      var ctx=out.getContext('2d'),nat=('filter' in ctx),fs=f==='gray'?'grayscale(1)':f==='doc'?'grayscale(1) contrast(1.6) brightness(1.12)':'none';
      if(nat&&fs!=='none')ctx.filter=fs;
      ctx.drawImage(cur,sx,sy,sw,sh,0,0,sw,sh);
      if(!nat&&f!=='orig')imApplyF(ctx,sw,sh,f);
      await o.onSave(out);
      busy=false;close();
    }catch(e){busy=false;okB.disabled=false;toast('ذخیرهٔ عکس ممکن نشد',null,null,'warn')}
  }
  el.addEventListener('click',function(e){
    var b=e.target.closest('[data-ie]');if(!b)return;
    var a=b.dataset.ie;
    if(a==='cancel'){if(!busy)close()}
    else if(a==='ok')save();
    else if(a==='rot')rotate();
    else if(a==='reset'){K={x:0,y:0,w:1,h:1};paintCr()}
    else if(a.indexOf('f-')===0)setF(a.slice(2));
  });
  function close(){if(history.state&&history.state.ied){history.back();return}done()}
  function done(){
    if(!ied.on)return;
    ied.on=false;ied.done=null;window.removeEventListener('resize',fit);
    el.classList.remove('open');setTimeout(function(){el.remove()},240);
  }
  ied.done=done;
  window.addEventListener('resize',fit);
  document.body.appendChild(el);
  try{history.pushState({ied:1},'',location.href)}catch(x){}
  requestAnimationFrame(function(){fit();requestAnimationFrame(function(){el.classList.add('open')})});
}
/* photo viewer */
var imv={on:false,el:null,rec:null,url:null,z:1,tap:0,tx:0,ty:0};
var IM_Z=[1,1.5,2,3,4];
actions.imOpen=async function(d){
  if(imv.on)return;
  var rec=tbD().imgs.find(function(x){return x.id===d.v});if(!rec)return;
  var r=null;try{r=await fdbGet(rec.id)}catch(e){}
  if(!r||!r.full){toast('فایل روی این دستگاه نیست. حذفش کن و دوباره اضافه کن',null,null,'warn');return}
  if(imv.on)return;
  imv.on=true;imv.rec=rec;imv.z=1;imv.url=URL.createObjectURL(r.full);
  var el=document.createElement('div');el.className='imv';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
  el.innerHTML='<div class="pdfv-top"><button type="button" class="round glass" data-iv="close" aria-label="بستن">'+icon('close')+'</button><div class="pdfv-t"><b></b><small></small></div><div class="pdfv-z"><button type="button" class="round glass" data-iv="ren" aria-label="تغییر نام">'+icon('edit')+'</button><button type="button" class="round glass" data-iv="del" aria-label="حذف">'+icon('trash')+'</button></div></div>'+
    '<div class="imv-sc"><img class="imv-im" alt="" draggable="false"></div>'+
    '<div class="pdfv-bt"><button type="button" class="pdfv-b glass" data-iv="edit">برش و تنظیم</button><button type="button" class="round glass" data-iv="zout" aria-label="کوچک‌نمایی">−</button><button type="button" class="round glass" data-iv="zin" aria-label="بزرگ‌نمایی">+</button></div>';
  el.querySelector('.pdfv-t b').textContent=rec.n;
  el.querySelector('.pdfv-t small').textContent=fa(rec.w)+' × '+fa(rec.h);
  var im=el.querySelector('.imv-im');im.src=imv.url;
  imv.el=el;
  el.addEventListener('click',function(e){var b=e.target.closest('[data-iv]');if(b)ivAct(b.dataset.iv)});
  var sc=el.querySelector('.imv-sc');
  sc.addEventListener('touchstart',function(e){if(e.touches.length===1){imv.tx=e.touches[0].clientX;imv.ty=e.touches[0].clientY}},{passive:true});
  sc.addEventListener('touchend',function(e){
    if(e.touches.length||e.changedTouches.length!==1)return;
    var t=e.changedTouches[0],now=Date.now();
    if(Math.abs(t.clientX-imv.tx)>10||Math.abs(t.clientY-imv.ty)>10){imv.tap=0;return}
    if(now-imv.tap<320){imv.tap=0;ivZoom(imv.z>1?1:2);return}
    imv.tap=now;
  },{passive:true});
  document.body.appendChild(el);
  try{history.pushState({imv:1},'',location.href)}catch(x){}
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('open')})});
};
function ivZoom(z){
  if(!imv.el)return;
  var sc=imv.el.querySelector('.imv-sc'),im=imv.el.querySelector('.imv-im');
  var fx=sc.scrollWidth?(sc.scrollLeft+sc.clientWidth/2)/sc.scrollWidth:0,fy=sc.scrollHeight?(sc.scrollTop+sc.clientHeight/2)/sc.scrollHeight:0;
  imv.z=z;im.style.width=(z*100)+'%';
  sc.scrollLeft=fx*sc.scrollWidth-sc.clientWidth/2;sc.scrollTop=fy*sc.scrollHeight-sc.clientHeight/2;
}
function ivAct(a){
  var rec=imv.rec;if(!rec)return;
  if(a==='close')imvClose();
  else if(a==='zin'||a==='zout'){var i=IM_Z.indexOf(imv.z),j=Math.max(0,Math.min(IM_Z.length-1,i+(a==='zin'?1:-1)));if(j!==i)ivZoom(IM_Z[j])}
  else if(a==='ren')askText({title:'تغییر نام',val:rec.n,btn:'ذخیره',fn:function(v){
    v=String(v||'').replace(/[<>&"']/g,'').trim().slice(0,60);if(!v)return;
    rec.n=v;if(imv.el&&imv.rec===rec)imv.el.querySelector('.pdfv-t b').textContent=v;mutate();
  }});
  else if(a==='del')askConfirm({title:'حذف عکس',msg:'«'+rec.n+'» از برنامه پاک می‌شود.',btns:[{t:'حذف',cls:'bad',fn:function(){
    fdbDel(rec.id).catch(function(){});
    if(imURL[rec.id]){URL.revokeObjectURL(imURL[rec.id]);delete imURL[rec.id]}
    var D=tbD();D.imgs=D.imgs.filter(function(x){return x.id!==rec.id});
    imvClose();mutate();
  }}]});
  else if(a==='edit')fdbGet(rec.id).then(function(r){
    if(!r||!r.full)throw new Error('missing');
    return imLoad(r.full);
  }).then(function(im){
    imEditor(imToCanvas(im,2400),{title:'برش و تنظیم',onSave:async function(out){
      var m=await imSave(out,rec.id);rec.w=m.w;rec.h=m.h;
      var r2=await fdbGet(rec.id);
      if(imv.el&&imv.rec===rec&&r2&&r2.full){
        var u=URL.createObjectURL(r2.full),old=imv.url;imv.url=u;imv.el.querySelector('.imv-im').src=u;
        imv.el.querySelector('.pdfv-t small').textContent=fa(rec.w)+' × '+fa(rec.h);
        setTimeout(function(){URL.revokeObjectURL(old)},1000);
      }
      mutate();
    }});
  }).catch(function(){toast('باز کردن عکس ممکن نشد',null,null,'warn')});
}
function imvClose(){
  if(!imv.on)return;
  if(history.state&&history.state.imv){history.back();return}
  imvDo();
}
function imvDo(){
  if(!imv.on)return;
  var el=imv.el,u=imv.url;
  imv.on=false;imv.el=null;imv.rec=null;imv.url=null;
  if(el){el.classList.remove('open');setTimeout(function(){el.remove();if(u)URL.revokeObjectURL(u)},260)}
}

/* ---------- in-app PDF viewer ----------
   Pages are drawn by the native PdfViewer plugin (Android PdfRenderer) one at a time as JPEGs, only for the pages near the screen. */
var pdfv={tool:'hand',col:'#ef4444',an:{},rat:[],undo:[],drw:null,anT:0,on:false,el:null,sc:null,pgs:null,rec:null,io:null,n:0,zoom:1,st:{},q:[],busy:0,tok:0,cur:1,raf:0,svT:0,tap:0,tapX:0,tapY:0,sx:0,sy:0};
var PV_Z=[1,1.5,2,3];
actions.pdfOpen=async function(d){
  if(pdfv.on)return;
  var P=tbNative();
  if(!P){toast('خواندن PDF فقط در برنامهٔ اندروید کار می‌کند',null,null,'warn');return}
  var rec=tbD().pdfs.find(function(x){return x.id===d.v});if(!rec)return;
  pdfv.on=true;pdfv.rec=rec;pdfv.tool='hand';pdfv.an=anLoad(rec.id);pdfv.rat=[];pdfv.undo=[];pdfv.drw=null;pdfv.n=0;pdfv.zoom=1;pdfv.st={};pdfv.q=[];pdfv.busy=0;pdfv.tok++;pdfv.cur=rec.lp||1;
  var el=document.createElement('div');el.className='pdfv';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
  el.innerHTML='<div class="pdfv-top"><button type="button" class="round glass" data-pv="close" aria-label="بستن">'+icon('close')+'</button><div class="pdfv-t"><b></b><small id="pvPg"></small></div><div class="pdfv-z"><button type="button" class="round glass" data-pv="zout" aria-label="کوچک‌نمایی">−</button><button type="button" class="round glass" data-pv="zin" aria-label="بزرگ‌نمایی">+</button></div></div>'+
    '<div class="pdfv-sc"><div class="pdfv-ld">در حال باز کردن…</div><div class="pdfv-pgs"></div></div>'+
    '<div class="pdfv-tl"><button type="button" class="pdfv-tb" data-pv="t-hand" aria-pressed="true">دست</button><button type="button" class="pdfv-tb" data-pv="t-pen" aria-pressed="false">قلم</button><button type="button" class="pdfv-tb" data-pv="t-hl" aria-pressed="false">هایلایت</button><button type="button" class="pdfv-tb" data-pv="t-er" aria-pressed="false">پاک‌کن</button><span class="pdfv-cs">'+['#ef4444','#facc15','#22c55e','#2563eb'].map(function(c,k){return '<button type="button" class="pdfv-cd" data-pv="c" data-c="'+c+'" style="background:'+c+'" aria-label="رنگ" aria-pressed="'+(k===0)+'"></button>'}).join('')+'</span><button type="button" class="pdfv-tb" data-pv="undo">بازگردانی</button></div>'+
    '<div class="pdfv-bt"><button type="button" class="pdfv-b glass" data-pv="prev">قبلی</button><label class="pdfv-go"><input class="field" id="pvGo" type="number" inputmode="numeric" min="1" aria-label="رفتن به صفحه"><span id="pvOf"></span></label><button type="button" class="pdfv-b glass" data-pv="next">بعدی</button></div>';
  el.querySelector('.pdfv-t b').textContent=rec.n;
  pdfv.el=el;pdfv.sc=el.querySelector('.pdfv-sc');pdfv.pgs=el.querySelector('.pdfv-pgs');
  el.addEventListener('click',function(e){
    var b=e.target.closest('[data-pv]');
    if(b){pvAct(b.dataset.pv,b);return}
    var ht=e.target.closest('.hit');
    if(ht&&pdfv.tool==='er'){anErase(ht);return}
    var pg=e.target.closest('.pdfv-p.err');
    if(pg){var i=+pg.dataset.i;pg.classList.remove('err');pdfv.st[i]=0;pvLoad(i)}
  });
  pdfv.sc.addEventListener('scroll',pvOnScroll,{passive:true});
  pdfv.sc.addEventListener('touchstart',function(e){if(e.touches.length===1){pdfv.sx=e.touches[0].clientX;pdfv.sy=e.touches[0].clientY}},{passive:true});
  pdfv.sc.addEventListener('touchend',function(e){
    if(e.touches.length||e.changedTouches.length!==1||!pdfv.n||pdfv.tool!=='hand')return;
    var t=e.changedTouches[0],now=Date.now();
    if(Math.abs(t.clientX-pdfv.sx)>10||Math.abs(t.clientY-pdfv.sy)>10){pdfv.tap=0;return}
    if(now-pdfv.tap<320&&Math.abs(t.clientX-pdfv.tapX)<30&&Math.abs(t.clientY-pdfv.tapY)<30){pdfv.tap=0;pvSetZoom(pdfv.zoom>1?1:2);return}
    pdfv.tap=now;pdfv.tapX=t.clientX;pdfv.tapY=t.clientY;
  },{passive:true});
  pdfv.pgs.addEventListener('pointerdown',anDown);pdfv.pgs.addEventListener('pointermove',anMove);pdfv.pgs.addEventListener('pointerup',anUp);pdfv.pgs.addEventListener('pointercancel',anUp);
  var go=el.querySelector('#pvGo');
  go.addEventListener('change',function(){var v=Math.round(+go.value);if(v>=1)pvGoTo(Math.min(v,pdfv.n||1));else pvLabel()});
  go.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();go.blur()}});
  document.body.appendChild(el);
  try{history.pushState({pdf:1},'',location.href)}catch(e){}
  requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('open')})});
  var info;
  try{info=await P.info({id:rec.id})}catch(e){if(pdfv.el===el){pvClose();toast(tbErrMsg(e),null,null,'warn')}return}
  if(pdfv.el!==el)return;
  if(!info||!(info.pages>0)||!Array.isArray(info.ratios)||!info.ratios.length){pvClose();toast(tbErrMsg('invalid'),null,null,'warn');return}
  var n=Math.min(info.pages,info.ratios.length);
  pdfv.n=n;
  if(rec.pg!==n){rec.pg=n;if(rec.lp>n)rec.lp=n}
  if(pdfv.cur>n)pdfv.cur=n;
  var ld=el.querySelector('.pdfv-ld');if(ld)ld.remove();
  var h='',i,r;
  for(i=0;i<n;i++){r=+info.ratios[i];if(!(r>0.1&&r<10))r=1.4142;pdfv.rat[i]=r;h+='<div class="pdfv-p" data-i="'+i+'" style="padding-top:'+(r*100).toFixed(3)+'%"><img alt="" draggable="false" decoding="async"><span class="pdfv-n">'+fa(i+1)+'</span><svg class="pdfv-an" viewBox="0 0 1000 '+Math.round(r*10000)/10+'" preserveAspectRatio="none">'+anSvg(i)+'</svg></div>'}
  pdfv.pgs.innerHTML=h;
  el.querySelector('#pvOf').textContent='از '+fa(n);
  go.max=n;
  pvLabel();
  pdfv.io=new IntersectionObserver(function(es){
    es.forEach(function(en){var k=+en.target.dataset.i;if(en.isIntersecting)pvLoad(k);else pvUnload(k)});
  },{root:pdfv.sc,rootMargin:'150% 0px'});
  pvObserve();
  requestAnimationFrame(function(){if(pdfv.el===el)pvGoTo(pdfv.cur)});
};
function pvObserve(){
  if(!pdfv.io)return;
  pdfv.io.disconnect();
  var c=pdfv.pgs.children,i;
  for(i=0;i<c.length;i++)pdfv.io.observe(c[i]);
}
function pvLoad(i){
  if(!pdfv.on||pdfv.st[i])return;
  pdfv.st[i]=1;pdfv.q.push(i);pvPump();
}
function pvUnload(i){
  var s=pdfv.st[i];if(!s||!pdfv.pgs)return;
  pdfv.st[i]=0;
  if(s===3){var q=pdfv.pgs.children[i];if(q)q.classList.remove('err')}
  if(s===2){
    var p=pdfv.pgs.children[i];
    if(p){var im=p.querySelector('img');if(im)im.removeAttribute('src');p.classList.remove('ok')}
  }
}
async function pvPump(){
  if(pdfv.busy)return;
  var P=tbNative();if(!P)return;
  while(pdfv.on&&pdfv.q.length){
    /* draw the page closest to the one being read first */
    var bi=0,bd=1e9,k,dd;
    for(k=0;k<pdfv.q.length;k++){dd=Math.abs(pdfv.q[k]+1-pdfv.cur);if(dd<bd){bd=dd;bi=k}}
    var i=pdfv.q.splice(bi,1)[0];
    if(pdfv.st[i]!==1)continue;
    var tok=pdfv.tok,rec=pdfv.rec,pg=pdfv.pgs?pdfv.pgs.children[i]:null;
    if(!pg||!rec){pdfv.st[i]=0;continue}
    pdfv.busy=1;
    try{
      var dpr=Math.min(window.devicePixelRatio||1,3);
      var w=Math.min(2400,Math.round(pdfv.sc.clientWidth*pdfv.zoom*dpr));
      var r=await P.page({id:rec.id,index:i,width:w});
      if(tok===pdfv.tok&&pdfv.on&&pdfv.st[i]===1&&pdfv.pgs===pg.parentNode&&r&&r.data){
        pg.querySelector('img').src='data:image/jpeg;base64,'+r.data;
        pg.classList.remove('err');pg.classList.add('ok');pdfv.st[i]=2;
      }
    }catch(e){
      if(tok===pdfv.tok&&pdfv.on&&pdfv.st[i]===1){pdfv.st[i]=3;pg.classList.add('err')}
    }finally{pdfv.busy=0}
  }
}
function pvCur(){
  var sc=pdfv.sc,pg=pdfv.pgs&&pdfv.pgs.children;
  if(!sc||!pg||!pg.length)return 1;
  var y=sc.scrollTop-pdfv.pgs.offsetTop+sc.clientHeight*0.35,lo=0,hi=pg.length-1,m;
  while(lo<hi){m=(lo+hi+1)>>1;if(pg[m].offsetTop<=y)lo=m;else hi=m-1}
  return lo+1;
}
function pvLabel(){
  if(!pdfv.el)return;
  var t=pdfv.el.querySelector('#pvPg');if(t)t.textContent=pdfv.n?'صفحه '+fa(pdfv.cur)+' از '+fa(pdfv.n):'';
  var go=pdfv.el.querySelector('#pvGo');if(go&&document.activeElement!==go)go.value=pdfv.n?pdfv.cur:'';
}
function pvOnScroll(){
  if(pdfv.raf)return;
  pdfv.raf=requestAnimationFrame(function(){
    pdfv.raf=0;
    if(!pdfv.on||!pdfv.pgs||!pdfv.n||!pdfv.rec)return;
    var c=pvCur();
    if(c!==pdfv.cur){pdfv.cur=c;pvLabel();pdfv.rec.lp=c;clearTimeout(pdfv.svT);pdfv.svT=setTimeout(persist,800)}
  });
}
function pvGoTo(p){
  if(!pdfv.pgs||!pdfv.n)return;
  p=Math.max(1,Math.min(pdfv.n,p));
  var pg=pdfv.pgs.children[p-1];if(!pg)return;
  pdfv.sc.scrollTop=pdfv.pgs.offsetTop+pg.offsetTop-6;
  pdfv.cur=p;pvLabel();
  if(pdfv.rec){pdfv.rec.lp=p;clearTimeout(pdfv.svT);pdfv.svT=setTimeout(persist,800)}
}
function pvSetZoom(z){
  var sc=pdfv.sc;if(!sc||!pdfv.pgs||!pdfv.n||z===pdfv.zoom)return;
  var fy=sc.scrollHeight>0?(sc.scrollTop+sc.clientHeight/2)/sc.scrollHeight:0;
  pdfv.zoom=z;pdfv.tok++;pdfv.q=[];pdfv.st={};
  pdfv.pgs.style.width=(z*100)+'%';
  var c=pdfv.pgs.children,i,im;
  for(i=0;i<c.length;i++){c[i].classList.remove('ok','err');im=c[i].querySelector('img');if(im)im.removeAttribute('src')}
  sc.scrollTop=fy*sc.scrollHeight-sc.clientHeight/2;
  if(z>1){var mx=sc.scrollWidth-sc.clientWidth,rtl=getComputedStyle(sc).direction==='rtl';sc.scrollLeft=rtl?-mx/2:mx/2}
  pvObserve();
}
/* ---------- PDF annotations: pen, highlighter, eraser ----------
   Strokes are kept per PDF in localStorage ('ario_pdfan_<id>') as {pageIndex:[{t:'p'|'h',c:color,d:svg path}]},
   in page units (1000 wide) so they stay in place at any zoom. */
function anLoad(id){try{var o=JSON.parse(localStorage.getItem('ario_pdfan_'+id)||'{}');return o&&typeof o==='object'&&!Array.isArray(o)?o:{}}catch(e){return {}}}
function anSave(){
  if(!pdfv.rec)return;
  try{
    var k,has=false;for(k in pdfv.an)if(Array.isArray(pdfv.an[k])&&pdfv.an[k].length){has=true;break}
    if(has)localStorage.setItem('ario_pdfan_'+pdfv.rec.id,JSON.stringify(pdfv.an));else localStorage.removeItem('ario_pdfan_'+pdfv.rec.id);
  }catch(e){toast('ذخیرهٔ حاشیه‌نویسی ممکن نشد',null,null,'warn')}
}
function anLater(){clearTimeout(pdfv.anT);pdfv.anT=setTimeout(function(){pdfv.anT=0;anSave()},600)}
function anSvg(i){
  var l=pdfv.an[i],h='';
  if(!Array.isArray(l))return h;
  l.forEach(function(s,k){
    if(!s||(s.t!=='p'&&s.t!=='h')||typeof s.c!=='string'||!/^#[0-9a-fA-F]{6}$/.test(s.c)||typeof s.d!=='string'||!/^[ML0-9., -]+$/.test(s.d))return;
    h+='<g data-k="'+k+'"><path class="'+(s.t==='h'?'hl':'pn')+'" d="'+s.d+'" stroke="'+s.c+'"/><path class="hit" d="'+s.d+'"/></g>';
  });
  return h;
}
function anRefresh(i){
  var pg=pdfv.pgs&&pdfv.pgs.children[i];if(!pg)return;
  var sv=pg.querySelector('.pdfv-an');if(sv)sv.innerHTML=anSvg(i);
}
function anPt(sv,e,i){
  var r=sv.getBoundingClientRect(),H=1000*pdfv.rat[i];
  return [Math.round((e.clientX-r.left)/r.width*10000)/10,Math.round((e.clientY-r.top)/r.height*H*10)/10];
}
function anPath(pts){
  if(pts.length===1)return 'M'+pts[0][0]+' '+pts[0][1]+' L'+(pts[0][0]+0.1)+' '+pts[0][1];
  return 'M'+pts.map(function(q){return q[0]+' '+q[1]}).join(' L');
}
function anDown(e){
  if(pdfv.tool!=='pen'&&pdfv.tool!=='hl')return;
  var sv=e.target.closest&&e.target.closest('.pdfv-an');if(!sv||pdfv.drw)return;
  var i=+sv.parentNode.dataset.i;if(!(pdfv.rat[i]>0))return;
  e.preventDefault();
  try{sv.setPointerCapture(e.pointerId)}catch(x){}
  var p=document.createElementNS('http://www.w3.org/2000/svg','path');
  p.setAttribute('class',pdfv.tool==='hl'?'hl':'pn');p.setAttribute('stroke',pdfv.col);
  sv.appendChild(p);
  var pt=anPt(sv,e,i);
  pdfv.drw={sv:sv,i:i,p:p,pts:[pt],id:e.pointerId,t:pdfv.tool==='hl'?'h':'p',c:pdfv.col};
  p.setAttribute('d',anPath(pdfv.drw.pts));
}
function anMove(e){
  var d=pdfv.drw;if(!d||e.pointerId!==d.id)return;
  e.preventDefault();
  var pt=anPt(d.sv,e,d.i),l=d.pts[d.pts.length-1];
  if(Math.abs(pt[0]-l[0])+Math.abs(pt[1]-l[1])<2)return;
  d.pts.push(pt);d.p.setAttribute('d',anPath(d.pts));
}
function anUp(e){
  var d=pdfv.drw;if(!d||e.pointerId!==d.id)return;
  pdfv.drw=null;
  var st={t:d.t,c:d.c,d:anPath(d.pts)};
  if(!Array.isArray(pdfv.an[d.i]))pdfv.an[d.i]=[];
  pdfv.an[d.i].push(st);pdfv.undo.push({i:d.i,s:st});
  if(pdfv.undo.length>200)pdfv.undo.shift();
  anRefresh(d.i);anLater();
}
function anErase(hit){
  var g=hit.parentNode,pg=g&&g.closest('.pdfv-p');if(!pg)return;
  var i=+pg.dataset.i,k=+g.dataset.k,l=pdfv.an[i];
  if(!Array.isArray(l)||!(k>=0&&k<l.length))return;
  l.splice(k,1);anRefresh(i);anLater();
}
function anUndo(){
  while(pdfv.undo.length){
    var u=pdfv.undo.pop(),l=pdfv.an[u.i],k=Array.isArray(l)?l.indexOf(u.s):-1;
    if(k>=0){l.splice(k,1);anRefresh(u.i);anLater();return}
  }
  toast('چیزی برای بازگردانی نیست',null,null,'info');
}
function pvTool(t){
  if(['hand','pen','hl','er'].indexOf(t)<0||!pdfv.el)return;
  pdfv.tool=t;
  pdfv.el.classList.toggle('dr',t==='pen'||t==='hl');
  pdfv.el.classList.toggle('er',t==='er');
  pdfv.el.querySelectorAll('.pdfv-tb[data-pv^="t-"]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.pv==='t-'+t)});
}
function pvAct(a,el){
  if(a==='close')pvClose();
  else if(a.indexOf('t-')===0)pvTool(a.slice(2));
  else if(a==='c'&&el){pdfv.col=el.dataset.c;pdfv.el.querySelectorAll('.pdfv-cd').forEach(function(x){x.setAttribute('aria-pressed',x===el)})}
  else if(a==='undo')anUndo();
  else if(a==='zin'||a==='zout'){
    var i=PV_Z.indexOf(pdfv.zoom),j=Math.max(0,Math.min(PV_Z.length-1,i+(a==='zin'?1:-1)));
    if(j!==i)pvSetZoom(PV_Z[j]);
  }
  else if(a==='prev')pvGoTo(pvCur()-1);
  else if(a==='next')pvGoTo(pvCur()+1);
}
/* the Back button / swipe pops the history entry we pushed when opening, and that closes the viewer */
function pvClose(){
  if(!pdfv.on)return;
  if(history.state&&history.state.pdf){history.back();return}
  pvDoClose();
}
function pvDoClose(){
  if(!pdfv.on)return;
  clearTimeout(pdfv.svT);
  if(pdfv.anT){clearTimeout(pdfv.anT);pdfv.anT=0;anSave()}
  if(pdfv.rec&&pdfv.n&&pdfv.pgs){pdfv.rec.lp=Math.max(1,Math.min(pdfv.rec.pg||pdfv.n,pvCur()));persist()}
  if(pdfv.io)pdfv.io.disconnect();
  var el=pdfv.el;
  pdfv.on=false;pdfv.drw=null;pdfv.an={};pdfv.undo=[];pdfv.el=null;pdfv.sc=null;pdfv.pgs=null;pdfv.io=null;pdfv.rec=null;pdfv.n=0;pdfv.q=[];pdfv.st={};pdfv.tok++;
  if(el){el.classList.remove('open');setTimeout(function(){el.remove()},260)}
  var P=tbNative();
  if(P){try{P.close().catch(function(){})}catch(e){}}
  if(ui.tab==='tb')render('swap');
}
function rkPaint(){var r=$('#rkRes');if(r)r.innerHTML=rkResHTML()}
actions.lsBack=function(){ui.tab='week';ui.cat=null;ui.filter='all';render('enter');window.scrollTo(0,0)};
actions.lsOpen=function(){ui.tab='lists';ui.cat=null;ui.filter='all';ui.lsec='cats';render('enter');window.scrollTo(0,0)};
actions.rkBack=function(){ui.tab='kk';render('enter');window.scrollTo(0,0)};
actions.rkOpen=function(){ui.tab='rk';ui.rksec='est';render('enter');window.scrollTo(0,0)};
actions.rksec=function(d){ui.rksec=d.v;render('swap');window.scrollTo(0,0)};
actions.rkg=function(d){rkD().cur.g=d.v;persist();render('swap')};
actions.rkrg=function(d){rkD().cur.rg=d.v;persist();render('swap')};
actions.rkdf=function(d){rkD().cur.df=d.v;persist();render('swap')};
actions.rkmode=function(d){var x=rkD().cur;if(x.mode===d.v)return;x.mode=d.v;persist();render('swap')};
actions.rkNew=function(){var x=rkD().cur,k=rkOne({g:x.g,yr:x.yr,rg:x.rg,sq:x.sq,ty:x.ty,sy:x.sy,df:x.df,mode:x.mode});rkD().cur=k;persist();render('swap')};
actions.rkSave=function(){
  var D=rkD(),x=D.cur;
  if(!rkComp(x)){toast('درصد دست‌کم یک درس را وارد کن',null,null,'warn');return}
  var o=rkOne(x);o.nm=o.nm||('آزمون '+fa(D.exams.length+1));
  if(x.eid){var i=D.exams.findIndex(function(e){return e.id===x.eid});if(i>-1){o.id=x.eid;o.ts=D.exams[i].ts;D.exams[i]=o}else{o.id=uid().slice(0,12);o.ts=Date.now();D.exams.push(o)}}
  else{if(D.exams.length>=40){toast('حداکثر ۴۰ آزمون ذخیره می‌شود؛ یکی را حذف کن',null,null,'warn');return}o.id=uid().slice(0,12);o.ts=Date.now();D.exams.push(o)}
  o.eid='';
  D.cur=rkOne({g:x.g,yr:x.yr,rg:x.rg,sq:x.sq,ty:x.ty,sy:x.sy,df:x.df,mode:x.mode});
  ui.rksec='hist';mutate();window.scrollTo(0,0);
  notify('ok','آزمون ذخیره شد',o.nm);
};
actions.rkEdit=function(d){
  var D=rkD(),e=D.exams.find(function(z){return z.id===d.v});if(!e)return;
  D.cur=rkOne(e);D.cur.eid=e.id;D.cur.id='';D.cur.ts=0;ui.rksec='est';persist();render('swap');window.scrollTo(0,0);
};
actions.rkDel=function(d){
  var D=rkD(),e=D.exams.find(function(z){return z.id===d.v});if(!e)return;
  askConfirm({title:'حذف آزمون',msg:'«'+(e.nm||'آزمون')+'» از تاریخچه حذف می‌شود.',btns:[{t:'حذف',cls:'bad',fn:function(){D.exams=D.exams.filter(function(z){return z.id!==e.id});if(D.cur.eid===e.id)D.cur.eid='';mutate()}}]});
};
/* typing updates the model and only the result block, so the keyboard stays open */
$('#view').addEventListener('input',function(e){
  var t=e.target,k=t.dataset&&t.dataset.rk;if(!k||ui.tab!=='rk')return;
  var x=rkD().cur,l=t.dataset.l;
  if(k==='pc'){var v=rkNum(t.value);if(v===null)delete x.pc[l];else x.pc[l]=Math.max(-34,Math.min(100,v))}
  else if(k==='cn'){
    var n=rkNum(t.value,true),c=x.cn[l]||(x.cn[l]={c:0,w:0,n:0});c[t.dataset.f]=n===null?0:Math.max(0,Math.min(300,n));
    var pv=$('#view').querySelector('[data-pv="'+(window.CSS&&CSS.escape?CSS.escape(l):l)+'"]'),p=rkPct(x,l);if(pv)pv.textContent=p===null?'':rkPctTxt(p)+'٪';
  }
  else if(k==='nm')x.nm=t.value.replace(/[<>&"']/g,'').slice(0,30);
  else if(k==='yr')x.yr=+t.value;
  else if(k==='sy')x.sy=t.value==='old'?'old':'new';
  else if(k==='sq')x.sq=RK_SQ[t.value]?t.value:'';
  else if(k==='ty')x.ty=t.value==='real'?'real':'mock';
  persist();rkPaint();
});
/* ---- sheets: simulator, settings, report ---- */
var rkSh=null;
function rkSheet(title,body,mount){
  if(rkSh)return;
  var w=document.createElement('div');w.className='sheet-wrap';
  w.innerHTML='<div class="dim"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="'+esc(title)+'"><div class="grab"></div><div class="sheet-top"><span></span><h2>'+esc(title)+'</h2><button type="button" class="save" data-k="cancel">بستن</button></div>'+body+'</div>';
  document.body.appendChild(w);rkSh=w;document.documentElement.style.overflow='hidden';
  function close(){if(!rkSh)return;rkSh=null;document.removeEventListener('keydown',kd);w.classList.remove('open');document.documentElement.style.overflow='';setTimeout(function(){w.remove()},350);if(ui.tab==='rk')render('swap')}
  function kd(e){if(e.key==='Escape')close()}
  document.addEventListener('keydown',kd);
  w.addEventListener('click',function(e){if(e.target.classList.contains('dim')||e.target.closest('[data-k="cancel"]'))close()});
  if(mount)mount(w,close);
  requestAnimationFrame(function(){requestAnimationFrame(function(){w.classList.add('open')})});
}
actions.rkSim=function(){
  var D=rkD(),x=rkOne(D.cur);
  if(!rkComp(x)){toast('اول درصد چند درس را وارد کن',null,null,'warn');return}
  var G=RK_G[x.g],base=rkEst(x,D.exams);
  x.mode='pct';G.L.forEach(function(l){var p=rkPct(D.cur,l[0]);if(p!==null)x.pc[l[0]]=Math.round(p)});
  var orig=JSON.parse(JSON.stringify(x.pc));
  var rows=G.L.filter(function(l){return orig[l[0]]!==undefined}).map(function(l){return '<div class="rk-sr"><div class="rk-st"><b>'+esc(l[0])+'</b><span data-sv="'+esc(l[0])+'">'+fa(orig[l[0]])+'٪</span></div><input type="range" min="-30" max="100" step="1" value="'+orig[l[0]]+'" data-sl="'+esc(l[0])+'" aria-label="درصد '+esc(l[0])+'"></div>'}).join('');
  rkSheet('شبیه‌ساز درصدها','<p class="hint">نوار هر درس را بکش و ببین بازه‌ی رتبه چطور تغییر می‌کند. چیزی ذخیره نمی‌شود.</p><div class="rk-sim" id="rkSimRes"></div>'+rows+'<button type="button" class="chip rk-main" data-k="rst" style="margin-top:14px">بازگشت به درصدهای واقعی</button>',function(w){
    function paint(){
      var e=rkEst(x,[]);
      w.querySelector('#rkSimRes').innerHTML=e?'<div class="rk-big"><small>رتبه‌ی کشوری</small><b>'+rkRange(e.nat.o,e.nat.p)+'</b></div><div class="rk-big rk-nat"><small>رتبه در سهمیه</small><b>'+rkRange(e.q.o,e.q.p)+'</b></div><p class="hint">درصد وزنی: '+rkPctTxt(e.cp.p)+'٪'+(base?' · تغییر نسبت به الان: '+(e.nat.m<=base.nat.m?'+':'−')+rkFmt(rkRound(Math.abs(base.nat.m-e.nat.m)))+' رتبه':'')+'</p>':'';
    }
    w.addEventListener('input',function(ev){var t=ev.target,l=t.dataset&&t.dataset.sl;if(!l)return;x.pc[l]=+t.value;var sv=w.querySelector('[data-sv="'+(window.CSS&&CSS.escape?CSS.escape(l):l)+'"]');if(sv)sv.textContent=fa(t.value)+'٪';paint()});
    w.addEventListener('click',function(ev){if(!ev.target.closest('[data-k="rst"]'))return;Object.keys(orig).forEach(function(l){x.pc[l]=orig[l];var r=w.querySelector('[data-sl="'+(window.CSS&&CSS.escape?CSS.escape(l):l)+'"]');if(r)r.value=orig[l];var sv=w.querySelector('[data-sv="'+(window.CSS&&CSS.escape?CSS.escape(l):l)+'"]');if(sv)sv.textContent=fa(orig[l])+'٪'});paint()});
    paint();
  });
};
actions.rkSet=function(){
  var D=rkD();
  var gs=Object.keys(RK_G).map(function(g){return '<label class="rk-sf"><span>'+RK_G[g].n+'</span><input class="field" type="text" inputmode="numeric" data-sn="'+g+'" value="'+fa(rkCfgN(g))+'" aria-label="تعداد داوطلبان '+RK_G[g].n+'"></label>'}).join('');
  var qs=Object.keys(RK_QS).map(function(r){return '<label class="rk-sf"><span>'+RK_QS[r].n+'</span><input class="field" type="text" inputmode="decimal" data-sq="'+r+'" value="'+fa(String(Math.round(rkCfgQ(r)*1000)/10).replace('.','٫'))+'" aria-label="سهم '+RK_QS[r].n+'"></label>'}).join('');
  rkSheet('تنظیمات داده‌ها','<p class="hint">تخمین رتبه به این دو داده بستگی دارد. اعداد پیش‌فرض تقریبی‌اند؛ آمار رسمی همان سال را وارد کنی، نتیجه به واقعیت نزدیک‌تر می‌شود.</p><div class="sec"><div class="sec-h"><b>تعداد داوطلبان هر گروه</b></div>'+gs+'</div><div class="sec"><div class="sec-h"><b>سهم هر منطقه از داوطلبان (درصد)</b></div>'+qs+'</div><button type="button" class="chip" data-k="reset" style="margin-top:16px">بازگشت به مقدارهای پیش‌فرض</button>',function(w,close){
    w.addEventListener('input',function(ev){
      var t=ev.target,g=t.dataset&&t.dataset.sn,r=t.dataset&&t.dataset.sq;
      if(g){var v=rkNum(t.value,true);if(v!==null&&v>=1000&&v<=3000000)D.cfg.N[g]=v;else delete D.cfg.N[g]}
      if(r){var q=rkNum(t.value);if(q!==null&&q>=1&&q<=90)D.cfg.qs[r]=q/100;else delete D.cfg.qs[r]}
      persist();
    });
    w.addEventListener('click',function(ev){if(ev.target.closest('[data-k="reset"]')){D.cfg={N:{},qs:{}};persist();close()}});
  });
};
/* report as a PNG (same save/share path as the timetable image) */
async function rkMakeImage(){
  var D=rkD(),x=D.cur,e=rkEst(x,D.exams);if(!e)return null;
  try{if(document.fonts&&document.fonts.ready)await document.fonts.ready}catch(er){}
  var W=1080,rows=rkLessons(x,e).sort(function(a,b){return b.pot-a.pot}),H=1250+rows.length*74;
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var c=cv.getContext('2d'),F0='Vazirmatn, system-ui, sans-serif';
  var g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'#eef3ff');g.addColorStop(1,'#f7ecff');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.direction='rtl';c.textAlign='right';
  function T(s,xx,yy,sz,w,col,al){c.font=w+' '+sz+'px '+F0;c.fillStyle=col||'#0f1320';c.textAlign=al||'right';c.fillText(s,xx,yy)}
  function card(y,h){c.fillStyle='rgba(255,255,255,.86)';c.beginPath();if(c.roundRect)c.roundRect(48,y,W-96,h,36);else c.rect(48,y,W-96,h);c.fill()}
  T('گزارش تخمین رتبه',W-72,120,60,'800');
  T(RK_G[x.g].n+' · کنکور '+fa(x.yr)+(x.nm?' · '+x.nm:''),W-72,176,32,'500','#5b6275');
  card(220,360);
  T('رتبه‌ی احتمالی در سهمیه',W-92,284,32,'600','#5b6275');
  T(rkRange(e.q.o,e.q.p),W-92,370,76,'800','#0a7aff');
  T('رتبه‌ی کشوری: '+rkRange(e.nat.o,e.nat.p),W-92,440,38,'600');
  T('خوش‌بینانه '+rkFmt(rkRound(e.q.o))+'  ·  واقع‌بینانه '+rkFmt(rkRound(e.q.m))+'  ·  بدبینانه '+rkFmt(rkRound(e.q.p)),W-92,500,30,'500','#5b6275');
  T('درصد وزنی '+rkPctTxt(e.cp.p)+'٪  ·  اطمینان '+rkConfLbl(e.conf)+' ('+fa(e.conf)+'٪)',W-92,552,30,'500','#5b6275');
  var y=620;card(y,rows.length*74+150);
  T('درصد دروس و فرصت بهبود',W-92,y+70,36,'700');
  rows.forEach(function(r,i){var yy=y+130+i*74;T(r.n,W-92,yy,32,'600');T(rkPctTxt(r.p)+'٪',160,yy,32,'700',r.p>=e.cp.p?'#22b45b':'#e5322a','left');
    c.fillStyle='rgba(100,112,150,.18)';c.fillRect(330,yy-24,420,16);c.fillStyle='#0a7aff';c.fillRect(330,yy-24,Math.max(6,420*Math.max(0,Math.min(100,r.p))/100),16)});
  y=y+rows.length*74+190;
  var weak=rows.slice(0,2).map(function(r){return r.n}),strong=rows.slice().sort(function(a,b){return b.p-a.p}).slice(0,2).map(function(r){return r.n});
  card(y,250);
  T('پیشنهاد مطالعه',W-92,y+70,36,'700');
  T('اولویت بهبود: '+weak.join('، '),W-92,y+130,32,'500');
  T('نقطه‌ی قوت: '+strong.join('، '),W-92,y+185,32,'500');
  T('تخمین تقریبی است و رتبه‌ی رسمی را سازمان سنجش اعلام می‌کند.',W-72,H-110,26,'500','#7a8196');
  T('Ario · کنکوریا',W-72,H-60,30,'700','#0a7aff');
  return new Promise(function(res){cv.toBlob(function(b){res(b)},'image/png')});
}
var rkBusy=false;
actions.rkRep=async function(){
  if(rkBusy)return;
  if(!rkComp(rkD().cur)){toast('اول درصد چند درس را وارد کن',null,null,'warn');return}
  rkBusy=true;
  try{var b=await rkMakeImage();if(!b)throw new Error('e');await imgSave(b,'ario-rank-'+todayKey()+'.png','گزارش رتبه')}
  catch(er){toast('ساخت گزارش انجام نشد؛ دوباره تلاش کن',null,null,'warn')}
  rkBusy=false;
};

actions.adPrev=adPrevA;actions.adNext=adNextA;actions.openChar=openCharA;actions.charBack=charBackA;actions.chView=chViewA;actions.chFlip=chFlipA;actions.pkWave=pkWaveA;actions.buyChar=buyCharA;
applyTheme();charRoute();render('enter');
maybeWelcome();
(function loop(){tick();setTimeout(loop,1000-(Date.now()%1000)+10)})();
document.addEventListener('visibilitychange',function(){
  if(document.visibilityState==='visible'){if(ui.day<todayKey()&&ui.tab!=='week')ui.day=todayKey();if(sh.wrap.hidden)render();if(ui.tab==='account')reloadAccount();tick();nativeSync();nsTakeActs();if(nsCfg().th==='banner')nsPushStyle()}
});
nativeInit();
alCheck();if(lkGet()){alSecure(true);showLock()}
try{gmCheck(true)}catch(e){}

(function(){var e=document.getElementById('splash');if(!e)return;var w=Math.max(0,1100-(Date.now()-(window.__t0||0)));setTimeout(function(){e.classList.add('out');setTimeout(function(){e.remove()},450)},w)})();
requestAnimationFrame(function(){requestAnimationFrame(function(){$('.tabbar').classList.add('ready');movePill.k=null;movePill()})});
window.addEventListener('resize',movePill);
})();
