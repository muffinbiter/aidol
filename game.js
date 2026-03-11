// ── CONSTANTS ──
const BASE='https://raw.githubusercontent.com/muffinbiter/aidol/main/assets/';
const AP_MAX=12;
const COIN_INIT=1000;
const GRADES=['C','B','A','S'];
const GRADE_COLOR={C:'#a0a0b0',B:'#7dc97d',A:'#c9a84c',S:'#e078e0'};
const GRADE_STAT_BONUS={C:0,B:5,A:10,S:18};

const SCHED_UNLOCKED=['보컬 트레이닝','댄스 트레이닝','체력 단련','이미지 메이킹'];
const SCHED_LOCKED=[
  {name:'랩 트레이닝',condition:'rap',threshold:30,condText:'랩 30 이상'},
  {name:'작곡 참여',condition:'vocal',threshold:50,condText:'보컬 50 이상'},
  {name:'팬미팅',condition:'fandom',threshold:20,condText:'팬덤 20 이상'},
  {name:'해외 연수',condition:'avg',threshold:60,condText:'전체 평균 60 이상'}
];
const SCHED_ALL=['보컬 트레이닝','댄스 트레이닝','체력 단련','이미지 메이킹','랩 트레이닝','작곡 참여','팬미팅','해외 연수'];
const AP_COST={'보컬 트레이닝':3,'댄스 트레이닝':3,'체력 단련':2,'이미지 메이킹':2,'랩 트레이닝':3,'작곡 참여':3,'팬미팅':2,'해외 연수':4};
const SCHED_STAT={
  '보컬 트레이닝':{vocal:4,stamina:-2,fandom:1},
  '댄스 트레이닝':{dance:4,stamina:-2,fandom:1},
  '체력 단련':{stamina:4,mental:2,fandom:0},
  '이미지 메이킹':{visual:3,mental:1,fandom:2},
  '랩 트레이닝':{rap:4,stamina:-2,fandom:1},
  '작곡 참여':{vocal:2,rap:2,fandom:3},
  '팬미팅':{fandom:5,stamina:-2,mental:-1},
  '해외 연수':{vocal:2,dance:2,rap:1,visual:1,stamina:-3,fandom:2}
};
const STAT_KR={vocal:'보컬',dance:'댄스',visual:'비주얼',rap:'랩',mental:'멘탈',stamina:'체력'};

const NARR={
  '보컬 트레이닝':['{n}은 하루 종일 보컬 트레이닝에 몰두했다. 고음 부분이 드디어 안정되기 시작했다.','{n}의 목소리가 조금씩 색을 찾아가고 있었다. 강사도 미소를 지었다.','{n}은 목이 아팠지만 멈추지 않았다. 오늘은 뭔가 달랐다.'],
  '댄스 트레이닝':['{n}은 거울 앞에서 수백 번 동작을 반복했다. 땀이 바닥을 적셨지만 눈빛은 흔들리지 않았다.','{n}의 무게중심이 조금씩 잡히기 시작했다. 오늘은 잘 된 날이다.','{n}은 동작 하나하나에 집중했다. 아직 완벽하지 않지만, 나아지고 있다.'],
  '체력 단련':['{n}은 이른 아침부터 트레이닝을 시작했다. 체력이 실력이라는 걸 다시 한번 실감했다.','{n}이 오늘은 러닝을 한 시간 넘게 했다. 지치지 않는 몸을 만들기 위해.','{n}의 체력이 조금씩 올라가고 있다. 뿌듯한 하루였다.'],
  '이미지 메이킹':['{n}은 스타일리스트와 함께 새로운 룩을 시도했다. 조금씩 아이돌다워지고 있다.','{n}의 카메라 앞 표정이 자연스러워지고 있다. 뭔가 달라 보인다.','{n}은 거울 속 자신을 오래 바라봤다. 아직 갈 길이 있다는 걸 알고 있다.'],
  '랩 트레이닝':['{n}은 밤늦게까지 플로우를 연구했다. 자신만의 색이 조금씩 묻어나기 시작했다.','{n}의 라임이 오늘따라 잘 맞았다. 가능성이 보이는 하루였다.','{n}은 가사를 외우고 또 외웠다. 아직 갈 길이 멀지만 포기하지 않는다.'],
  '작곡 참여':['{n}은 처음으로 직접 가사를 써봤다. 떨렸지만 뭔가 터질 것 같은 느낌이 들었다.','{n}의 멜로디가 스튜디오를 가득 채웠다. 프로듀서도 고개를 끄덕였다.','{n}은 밤새 데모 트랙을 다듬었다. 아직 거칠지만 진심이 담겨있었다.'],
  '팬미팅':['{n}은 팬들 한 명 한 명과 눈을 맞췄다. 이게 다 현실이라는 게 믿기지 않았다.','{n}이 팬사인회에서 처음으로 팬의 이름을 불러줬다. 팬은 눈물을 흘렸다.','{n}은 팬들의 응원에 울컥했다. 더 잘해야겠다는 마음이 차올랐다.'],
  '해외 연수':['{n}은 해외 트레이닝에서 세계적인 수준을 직접 경험했다. 자극이 됐다.','{n}의 시야가 넓어졌다. 글로벌 씬에서도 충분히 통할 것 같다는 확신이 생겼다.','{n}은 언어도 낯선 곳에서 춤으로 소통했다. 음악은 언어가 없다는 걸 깨달았다.']
};
const MEMBER_MSGS={
  hana:['이번 주도 고생 많으셨어요, 프로듀서님. 팀이 점점 맞춰지는 것 같아서 기뻐요.','저도 아직 부족한 게 많지만... 열심히 할게요. 믿어주세요.','멤버들 상태 괜찮은 것 같아요. 이번 주도 잘 버텼어요.'],
  luna:['프로듀서님~!! 이번 주 진짜 열심히 했죠?! 칭찬 한 마디만요!!','에헤헤~ 힘들었지만 재밌었어요!! 다음 주도 파이팅!!','저 이번 주 엄청 성장한 것 같아요!! 느껴지시나요?!'],
  sei:['...수고했어요.','이번 주, 나쁘지 않았어요.','다음 주도... 잘 부탁해요. 뭐, 형식적인 말이지만.']
};
const MEMBERS=[
  {id:'hana',name:'하나',position:'리더 / 메인댄서',appearance:'짧은 흑발, 쿨한 눈매, 네이비+골드 의상, 카리스마 있는 분위기',personality:'카리스마 있지만 멤버를 잘 챙기는 언니 스타일. 책임감 강하고 프로페셔널함.',cardImg:BASE+'card_hana.png',talkImg:BASE+'scene_hana_talk.png',practiceImg:BASE+'scene_hana_practice.png',dialogues:['오늘도 잘 부탁해요, 프로듀서님. 저는 항상 팀을 위해 최선을 다할게요.','멤버들 컨디션은 제가 챙길게요. 프로듀서님은 큰 그림만 보세요.','어떤 스케줄이든 준비돼 있어요. 저희를 믿어주세요.'],stats:{vocal:65,dance:82,visual:70,rap:40,mental:75,stamina:68}},
  {id:'luna',name:'루나',position:'메인보컬 / 막내',appearance:'밝은 갈색 긴 웨이브, 큰 눈, 핑크+화이트 의상, 밝고 사랑스러운 분위기',personality:'밝고 긍정적인 분위기 메이커. 가끔 엉뚱하고 4차원적인 면도 있음.',cardImg:BASE+'card_luna.png',talkImg:BASE+'scene_luna_talk.png',practiceImg:BASE+'scene_luna_practice.png',dialogues:['프로듀서님~! 오늘 연습 진짜 열심히 했어요!! 칭찬해주세요 ><','에헤헤~ 제가 오늘 또 조금 실수했는데... 그래도 귀엽죠?? 그죠??','같이 데뷔하면 진짜 최고일 것 같아요!! 기대되지 않아요?!'],stats:{vocal:88,dance:55,visual:72,rap:30,mental:70,stamina:58}},
  {id:'sei',name:'세이',position:'래퍼 / 비주얼',appearance:'보라빛 긴 머리, 신비로운 눈매, 라벤더+실버 의상, 차갑고 신비로운 분위기',personality:'말수 적고 쿨해 보이지만 사실 감성이 충만한 타입. 츤데레 기질 있음.',cardImg:BASE+'card_sei.png',talkImg:BASE+'scene_sei_talk.png',practiceImg:BASE+'scene_sei_practice.png',dialogues:['...할 말 있으면 해요.','연습은 잘 됐어요. 특별히 보고할 건 없고요.','프로듀서를 완전히 믿는다는 건 아니지만... 나쁘지 않게 하고 있네요.'],stats:{vocal:50,dance:68,visual:88,rap:82,mental:60,stamina:52}}
];
const DUMMY_GROUPS=[
  {name:'NOVA',fandom:87},{name:'LUX',fandom:76},{name:'PRISM',fandom:72},
  {name:'ECHO',fandom:65},{name:'VELA',fandom:61},{name:'AUROR',fandom:55},
  {name:'SOLEIL',fandom:48},{name:'MYTH',fandom:42},{name:'ZINNIA',fandom:35}
];

// ── STATE ──
const st={groupName:'',memberCount:3,selectedMembers:[],personaStep:0,personaData:[],ap:AP_MAX,week:1,coins:COIN_INIT,fandom:0,currentTalk:null,dialogueIdx:0,resultQueue:[],resultStep:0,weekResults:[],weekFandomGain:0,memberSchedules:{},likes:0,debutWeek:null};

// ── NAV ──
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active')}
function selCnt(b,n){document.querySelectorAll('.cbtn').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');st.memberCount=n}
function selOpt(b){b.closest('.ogrid').querySelectorAll('.obtn').forEach(x=>x.classList.remove('sel'));b.classList.add('sel')}

// ── GROUP SETUP ──
function goCasting(){
  const nameVal=document.getElementById('gname').value.trim();
  if(!nameVal){showToast('그룹 이름을 입력해주세요!');return;}
  st.groupName=nameVal;
  st.selectedMembers=[];
  buildCardShop();go('sc-cardshop');
}

// ── CARD SHOP ──
function buildCardShop(){
  document.getElementById('shop-coins').textContent=st.coins;
  document.getElementById('shop-bought').textContent=`보유 카드 ${st.selectedMembers.length}장`;
}
function buyCard(type){
  const costs={normal:100,premium:300,bundle:350};
  const cost=costs[type];
  if(st.coins<cost){showToast('코인이 부족합니다!');return;}
  st.coins-=cost;
  const r=Math.random();
  let grade;
  if(type==='normal'){grade=r<0.5?'C':r<0.85?'B':'A';}
  else if(type==='premium'){grade=r<0.2?'B':r<0.7?'A':'S';}
  else{grade=r<0.3?'B':r<0.65?'A':'S';}
  showGachaResult(grade);
  document.getElementById('shop-coins').textContent=st.coins;
  document.getElementById('shop-bought').textContent=`보유 카드 ${st.selectedMembers.length}장`;
}
function showGachaResult(grade){
  const m=MEMBERS[st.selectedMembers.length%MEMBERS.length];
  const bonus=GRADE_STAT_BONUS[grade];
  st.selectedMembers.push({...m,stats:Object.fromEntries(Object.entries(m.stats).map(([k,v])=>[k,Math.min(100,v+bonus)])),grade,dialogues:[...m.dialogues]});
  const ov=document.getElementById('gacha-overlay');
  document.getElementById('gacha-grade').textContent=grade;
  document.getElementById('gacha-grade').style.color=GRADE_COLOR[grade];
  document.getElementById('gacha-member-name').textContent=m.name;
  document.getElementById('gacha-member-img').src=m.cardImg;
  document.getElementById('gacha-msg').textContent=grade==='S'?'완벽하게 구현됐습니다 ✦':grade==='A'?'묘사가 잘 반영됐어요':grade==='B'?'주요 특징이 반영됐어요':'최대한 반영해봤어요';
  ov.style.display='flex';
  document.getElementById('shop-bought').textContent=`보유 카드 ${st.selectedMembers.length}장`;
}
function closeGacha(){document.getElementById('gacha-overlay').style.display='none';}
function goToCasting(){
  if(st.selectedMembers.length<3){showToast('카드를 3장 이상 구매해주세요!');return;}
  buildCasting();go('sc-casting');
}

// ── CASTING ──
function buildCasting(){
  const grid=document.getElementById('cgrid');
  grid.innerHTML='';st._castSelected=[];
  st.selectedMembers.forEach((m,i)=>{
    const card=document.createElement('div');
    card.className='ccard';
    card.innerHTML=`<div class="cinner"><div class="cfront"><div class="cdeco"></div><div class="rune">✦</div><div class="chint">탭하여 공개</div></div><div class="cback"><div class="grade-badge" style="background:${GRADE_COLOR[m.grade]}">${m.grade}</div><img src="${m.cardImg}" alt="${m.name}" loading="lazy"><div class="ci"><div class="cn">${m.name}</div><div class="cp">${m.position}</div></div></div></div>`;
    card.addEventListener('click',()=>{
      if(!card.classList.contains('flipped')){card.classList.add('flipped');return;}
      if(card.classList.contains('picked')){card.classList.remove('picked');st._castSelected=st._castSelected.filter(x=>x!==i);}
      else{if(st._castSelected.length>=3)return;card.classList.add('picked');st._castSelected.push(i);}
      const n=st._castSelected.length;
      document.getElementById('cbar').textContent=n===0?'카드를 탭하여 연습생을 공개하세요':n<3?`${n}명 선택 — ${3-n}명 더 선발하세요`:'✦ 3명 선발 완료';
      const btn=document.getElementById('cnext');btn.style.opacity=n===3?'1':'0.35';btn.style.pointerEvents=n===3?'auto':'none';
    });
    grid.appendChild(card);
  });
}
function goPersona(){
  const picked=st._castSelected.map(i=>st.selectedMembers[i]);
  st.personaData=picked.map(m=>({...m,stats:{...m.stats},dialogues:[...m.dialogues],inputName:m.name,inputPos:m.position,inputPersonality:m.personality}));
  st.personaStep=0;
  document.getElementById('pdots').innerHTML=st.personaData.map((_,i)=>`<div class="pdot" id="pd${i}"></div>`).join('');
  renderPersona();go('sc-persona');
}

// ── PERSONA ──
function renderPersona(){
  const s=st.personaStep,m=st.personaData[s];
  st.personaData.forEach((_,i)=>{const d=document.getElementById(`pd${i}`);if(d)d.className='pdot'+(i<s?' done':i===s?' active':'')});
  document.getElementById('pavatar').src=m.cardImg;
  document.getElementById('pstep').textContent=`멤버 ${s+1} / ${st.personaData.length}`;
  document.getElementById('pmname').textContent=m.inputName;
  document.getElementById('pbtn').textContent=s<st.personaData.length-1?'확정 →':'✦ 페르소나 완성';
  const statBars=Object.entries(m.stats).map(([k,v])=>`<div class="stat-preview-row"><span class="stat-preview-label">${STAT_KR[k]}</span><div class="stat-preview-track"><div class="stat-preview-fill" style="width:${v}%"></div></div><span class="stat-preview-val">${v}</span></div>`).join('');
  document.getElementById('pbody').innerHTML=`
    <div class="grade-row"><span class="grade-big" style="color:${GRADE_COLOR[m.grade]||'#c9a84c'}">${m.grade||'B'}</span><span class="grade-label">등급</span></div>
    <div><div class="fl">이름 (예명)</div><input class="fi" id="pi-name" value="${m.inputName}" maxlength="10"></div>
    <div><div class="fl">포지션</div><select class="fi" id="pi-pos">${['리더','메인보컬','서브보컬','메인댄서','래퍼','비주얼','리더 / 메인댄서','메인보컬 / 막내','래퍼 / 비주얼'].map(p=>`<option ${m.inputPos===p?'selected':''}>${p}</option>`).join('')}</select></div>
    <div><div class="fl">성격 & 말투</div><textarea class="fta" id="pi-pers">${m.inputPersonality}</textarea></div>
    <div><div class="fl">초기 스탯</div><div class="stat-preview">${statBars}</div></div>`;
}
function nextPersona(){
  const s=st.personaStep,m=st.personaData[s];
  m.inputName=document.getElementById('pi-name').value||m.name;m.name=m.inputName;
  m.inputPos=document.getElementById('pi-pos').value;m.position=m.inputPos;
  m.inputPersonality=document.getElementById('pi-pers').value;
  if(s<st.personaData.length-1){st.personaStep++;renderPersona();}
  else{buildHub();go('sc-hub');}
}

// ── HUB ──
let _logoTaps=0,_logoTapTimer=null;
function buildHub(){
  document.getElementById('hgname').textContent=`— ${st.groupName.toUpperCase()} —`;
  document.getElementById('wpill').textContent=`연습 ${st.week}주차`;
  document.getElementById('hapdis').textContent=`✦ AP ${st.ap} / ${AP_MAX}`;
  document.getElementById('hcoins').textContent=`✦ ${st.coins} 코인`;
  const pct=Math.min(100,((st.week-1)/52)*100);
  document.getElementById('week-progress').style.width=pct+'%';
  document.getElementById('week-progress-label').textContent=`${st.week} / 52주`;
  const logo=document.getElementById('hub-logo');
  logo.onclick=()=>{_logoTaps++;if(_logoTapTimer)clearTimeout(_logoTapTimer);_logoTapTimer=setTimeout(()=>{_logoTaps=0},1500);if(_logoTaps>=5){_logoTaps=0;showDebutExam();}};
  document.getElementById('hub-btn-sched').onclick=()=>{buildSchedule();go('sc-schedule');};
  document.getElementById('hub-btn-talk').onclick=()=>{buildTalkSelect();go('sc-talkselect');};
  document.getElementById('hub-btn-members').onclick=()=>{buildMemberStatus();go('sc-members');};
  document.getElementById('hub-btn-report').onclick=()=>{showWeeklyReport(false);};
}

// ── MEMBER STATUS ──
function buildMemberStatus(){
  document.getElementById('members-body').innerHTML=st.personaData.map(m=>{
    const warn=m.stats.mental<30||m.stats.stamina<30?'⚠️ ':'';
    const statBars=Object.entries(m.stats).map(([k,v])=>`<div class="stat-preview-row"><span class="stat-preview-label">${STAT_KR[k]}</span><div class="stat-preview-track"><div class="stat-preview-fill" style="width:${v}%"></div></div><span class="stat-preview-val">${v}</span></div>`).join('');
    return `<div class="member-status-card"><div class="msc-top"><img src="${m.cardImg}" class="msc-img" alt="${m.name}"><div class="msc-info"><div class="msc-name">${warn}${m.name}</div><div class="msc-pos">${m.position}</div><span class="grade-badge-sm" style="background:${GRADE_COLOR[m.grade]||'#c9a84c'}">${m.grade||'B'}</span></div></div><div class="stat-preview">${statBars}</div></div>`;
  }).join('');
}

// ── TALK SELECT ──
function buildTalkSelect(){
  document.getElementById('talkselect-body').innerHTML=st.personaData.map(m=>`<div class="talk-select-card" onclick="openTalk('${m.id}')"><img src="${m.cardImg}" class="msc-img" alt="${m.name}"><div><div class="msc-name">${m.name}</div><div class="msc-pos">${m.position}</div></div><div style="margin-left:auto;color:var(--gold);font-size:20px">→</div></div>`).join('');
}

// ── SCHEDULE ──
function buildSchedule(){
  renderGems();
  const body=document.getElementById('schedBody');body.innerHTML='';
  st.personaData.forEach(m=>{
    if(!st.memberSchedules[m.id])st.memberSchedules[m.id]=['보컬 트레이닝'];
    const wrap=document.createElement('div');wrap.className='srow-wrap';wrap.id=`swrap-${m.id}`;
    const warn=m.stats.mental<30||m.stats.stamina<30?'⚠️ ':'';
    wrap.innerHTML=`<div class="stop"><img class="sthumb" src="${m.cardImg}" alt="${m.name}"><div><div class="smname">${warn}${m.name}</div><div class="smpos">${m.position}</div><div class="sminibars"><div class="sminibar mental" style="width:${m.stats.mental}%"></div><div class="sminibar stamina" style="width:${m.stats.stamina}%"></div></div></div></div><div class="sslots" id="slots-${m.id}"></div><button class="sadd-btn" onclick="addSlot('${m.id}')">+ 스케줄 추가</button>`;
    body.appendChild(wrap);renderSlots(m.id);
  });
}
function renderSlots(mid){
  const m=st.personaData.find(x=>x.id===mid);
  const container=document.getElementById(`slots-${mid}`);container.innerHTML='';
  (st.memberSchedules[mid]||[]).forEach((sched,idx)=>{
    const row=document.createElement('div');row.className='sslot-row';
    const opts=SCHED_ALL.map(s=>{const locked=SCHED_LOCKED.find(l=>l.name===s);const isLocked=locked&&!checkUnlock(m,locked);return `<option value="${s}" ${s===sched?'selected':''} ${isLocked?'disabled':''}>${s}${isLocked?' 🔒':''} (AP ${AP_COST[s]})</option>`;}).join('');
    row.innerHTML=`<select class="ssel" onchange="onSlotChange('${mid}',${idx},this.value)">${opts}</select><span class="scost">AP ${AP_COST[sched]}</span>${idx>0?`<button class="sremove" onclick="removeSlot('${mid}',${idx})">✕</button>`:''}`;
    container.appendChild(row);
  });
}
function checkUnlock(m,locked){
  if(locked.condition==='fandom')return st.fandom>=locked.threshold;
  if(locked.condition==='avg'){return Object.values(m.stats).reduce((a,b)=>a+b,0)/6>=locked.threshold;}
  return (m.stats[locked.condition]||0)>=locked.threshold;
}
function addSlot(mid){
  if(calcUsedAP()>=AP_MAX){showToast('AP가 부족합니다!',true);return;}
  st.memberSchedules[mid].push('보컬 트레이닝');renderSlots(mid);updateApDisplay();
}
function removeSlot(mid,idx){st.memberSchedules[mid].splice(idx,1);renderSlots(mid);updateApDisplay();}
function onSlotChange(mid,idx,val){
  const locked=SCHED_LOCKED.find(l=>l.name===val);
  const m=st.personaData.find(x=>x.id===mid);
  if(locked&&!checkUnlock(m,locked)){showToast(`${locked.condText} 조건이 필요합니다`);renderSlots(mid);return;}
  st.memberSchedules[mid][idx]=val;updateApDisplay();
}
function calcUsedAP(){return Object.values(st.memberSchedules).flat().reduce((s,sch)=>s+(AP_COST[sch]||0),0);}
function updateApDisplay(){
  st.ap=AP_MAX-calcUsedAP();renderGems();
  st.personaData.forEach(m=>{const c=document.getElementById(`slots-${m.id}`);if(!c)return;c.querySelectorAll('.sslot-row').forEach((row,idx)=>{const ce=row.querySelector('.scost');if(ce&&st.memberSchedules[m.id])ce.textContent=`AP ${AP_COST[st.memberSchedules[m.id][idx]]||0}`;});});
}
function renderGems(){
  const used=AP_MAX-st.ap;
  document.getElementById('apgems').innerHTML=Array.from({length:AP_MAX},(_,i)=>`<div class="apgem${i<used?' used':''}"></div>`).join('');
  document.getElementById('apnum').textContent=st.ap;
}

// ── AP SHOP ──
function openApShop(){
  document.getElementById('ap-shop-coins').textContent=st.coins;
  document.getElementById('ap-shop-current').textContent=st.ap;
  go('sc-apshop');
}
function buyAP(amount,cost){
  if(st.coins<cost){showToast('코인이 부족합니다!');return;}
  st.coins-=cost;st.ap+=amount;
  document.getElementById('ap-shop-coins').textContent=st.coins;
  document.getElementById('ap-shop-current').textContent=st.ap;
  renderGems();showToast(`AP +${amount} 충전 완료!`);
}

// ── WEEK ──
function startWeek(){
  st.resultQueue=[];st.weekResults=[];st.weekFandomGain=0;
  st.personaData.forEach(m=>{
    const scheds=st.memberSchedules[m.id]||['휴식'];
    const gainSummary={};
    scheds.forEach(sched=>{
      const gains={};
      Object.entries(SCHED_STAT[sched]||{}).forEach(([k,v])=>{
        if(k==='fandom'){st.fandom=Math.min(100,st.fandom+v);st.weekFandomGain+=v;}
        else{m.stats[k]=Math.max(0,Math.min(100,(m.stats[k]||0)+v));gains[k]=v;gainSummary[k]=(gainSummary[k]||0)+v;}
      });
      const narrs=NARR[sched]||[];
      const narr=(narrs[Math.floor(Math.random()*narrs.length)]||'').replace(/{n}/g,m.name);
      st.resultQueue.push({member:m,sched,narr,gains});
    });
    st.weekResults.push({member:m,scheds,gainSummary});
  });
  st.coins+=50;st.resultStep=0;showResult();
}

// ── RESULT ──
function showResult(){
  if(st.resultStep>=st.resultQueue.length){showSummary();return;}
  const {member:m,sched,narr,gains}=st.resultQueue[st.resultStep];
  document.getElementById('rbg').src=m.practiceImg;
  document.getElementById('rlabel').textContent=m.position.toUpperCase();
  document.getElementById('rname').textContent=m.name;
  const narrEl=document.getElementById('rnarr');narrEl.textContent='';
  let ci=0;const typ=setInterval(()=>{if(ci<narr.length)narrEl.textContent+=narr[ci++];else clearInterval(typ);},28);
  const pos=Object.entries(gains).filter(([,v])=>v>0);
  const neg=Object.entries(gains).filter(([,v])=>v<0);
  setTimeout(()=>{document.getElementById('rstatrow').innerHTML=[...pos.map(([k,v])=>`<span class="rchip up">${STAT_KR[k]||k} +${v}</span>`),...neg.map(([k,v])=>`<span class="rchip dn">${STAT_KR[k]||k} ${v}</span>`)].join('');},600);
  go('sc-result');
}
function nextResult(){st.resultStep++;showResult();}

// ── SUMMARY ──
function showSummary(){
  let mvp=null,mvpGain=0;
  st.weekResults.forEach(({member:m,gainSummary})=>{
    const total=Object.values(gainSummary).reduce((a,b)=>a+(b>0?b:0),0);
    if(total>mvpGain){mvpGain=total;mvp=m;}
  });
  const comments=[`이번 주는 ${mvp?.name||'팀'}의 성장이 돋보였습니다.`,'꾸준한 훈련이 빛을 발하고 있습니다. 데뷔가 기대됩니다.','멤버들의 컨디션을 잘 관리해주세요. 멘탈이 실력입니다.'];
  document.getElementById('sumbody').innerHTML=`
    ${mvp?`<div class="mvp-card"><div class="mvp-label">✦ MVP</div><img class="mvp-img" src="${mvp.cardImg}" alt="${mvp.name}"><div class="mvp-name">${mvp.name}</div><div class="mvp-gain">+${mvpGain} 성장</div></div>`:''}
    ${st.weekResults.map(({member:m,gainSummary,scheds})=>{
      const pos=Object.entries(gainSummary).filter(([,v])=>v>0);
      const neg=Object.entries(gainSummary).filter(([,v])=>v<0);
      return `<div class="sumcard"><img class="sumthumb" src="${m.cardImg}" alt="${m.name}"><div class="suminfo"><div class="sumname">${m.name}</div><div class="sumsched">${scheds.join(' + ')}</div><div class="sumgained">${pos.map(([k,v])=>`<span class="sumchip">${STAT_KR[k]||k} +${v}</span>`).join('')}${neg.map(([k,v])=>`<span class="sumchip neg">${STAT_KR[k]||k} ${v}</span>`).join('')}</div></div></div>`;
    }).join('')}
    <div class="sum-comment">"${comments[Math.floor(Math.random()*comments.length)]}"</div>`;
  go('sc-summary');
}
function endWeek(){
  const w=st.week;st.week++;st.ap=AP_MAX;
  st.personaData.forEach(m=>{st.memberSchedules[m.id]=['보컬 트레이닝'];});
  showMemberMsg(w===1?0:w===2?1:false);
}

// ── MEMBER MSG ──
function showMemberMsg(eventIdx){
  const m=st.personaData[Math.floor(Math.random()*st.personaData.length)];
  const msgs=MEMBER_MSGS[m.id]||MEMBER_MSGS.hana;
  document.getElementById('mmsg-img').src=m.talkImg;
  document.getElementById('mmsg-badge').textContent=m.name.toUpperCase();
  document.getElementById('mmsg-text').textContent=msgs[Math.floor(Math.random()*msgs.length)];
  document.getElementById('mmsg-next').onclick=()=>showWeeklyReport(eventIdx);
  go('sc-mmsg');
}

// ── WEEKLY REPORT ──
function showWeeklyReport(eventIdx){
  drawRadar();
  const fp=Math.round(st.fandom);
  document.getElementById('fandom-bar-fill').style.width=fp+'%';
  document.getElementById('fandom-num').textContent=fp;
  document.getElementById('fandom-gain').textContent=st.weekFandomGain>0?`+${st.weekFandomGain} ↑`:'';
  document.getElementById('report-next').onclick=()=>{
    buildHub();
    if(eventIdx===0||eventIdx===1){setTimeout(()=>showEventWithLoading(eventIdx),350);}
    else go('sc-hub');
  };
  go('sc-report');
}
function drawRadar(){
  const canvas=document.getElementById('radar-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-30;
  ctx.clearRect(0,0,W,H);
  const keys=['vocal','dance','visual','rap','mental','stamina'],labels=['보컬','댄스','비주얼','랩','멘탈','체력'],n=keys.length;
  const angles=keys.map((_,i)=>(-Math.PI/2)+(2*Math.PI/n)*i);
  const avg=keys.map(k=>st.personaData.reduce((s,m)=>s+(m.stats[k]||0),0)/st.personaData.length);
  [0.25,0.5,0.75,1].forEach(r=>{ctx.beginPath();angles.forEach((a,i)=>{const x=cx+Math.cos(a)*R*r,y=cy+Math.sin(a)*R*r;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)});ctx.closePath();ctx.strokeStyle='rgba(201,168,76,0.2)';ctx.lineWidth=1;ctx.stroke()});
  angles.forEach(a=>{ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.strokeStyle='rgba(201,168,76,0.25)';ctx.lineWidth=1;ctx.stroke()});
  ctx.beginPath();angles.forEach((a,i)=>{const v=avg[i]/100,x=cx+Math.cos(a)*R*v,y=cy+Math.sin(a)*R*v;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)});
  ctx.closePath();ctx.fillStyle='rgba(201,168,76,0.2)';ctx.fill();ctx.strokeStyle='rgba(201,168,76,0.8)';ctx.lineWidth=2;ctx.stroke();
  angles.forEach((a,i)=>{const v=avg[i]/100,x=cx+Math.cos(a)*R*v,y=cy+Math.sin(a)*R*v;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle='#c9a84c';ctx.fill()});
  ctx.font='bold 12px Noto Sans KR';ctx.fillStyle='rgba(245,239,230,0.75)';ctx.textAlign='center';ctx.textBaseline='middle';
  angles.forEach((a,i)=>{const x=cx+Math.cos(a)*(R+20),y=cy+Math.sin(a)*(R+20);ctx.fillText(labels[i],x,y)});
}

// ── TALK ──
function openTalk(id){
  const m=st.personaData.find(x=>x.id===id);if(!m)return;
  st.currentTalk=m;st.dialogueIdx=0;
  document.getElementById('talkimg').src=m.talkImg;
  document.getElementById('talkbadge').textContent=m.name.toUpperCase();
  document.getElementById('talktext').textContent=m.dialogues[0];
  go('sc-talk');
}
function nextLine(){if(!st.currentTalk)return;st.dialogueIdx=(st.dialogueIdx+1)%st.currentTalk.dialogues.length;document.getElementById('talktext').textContent=st.currentTalk.dialogues[st.dialogueIdx]}
const TALK_REPLIES={hana:['네, 열심히 할게요. 믿어주세요.','프로듀서님 덕분에 많이 배우고 있어요.','고마워요. 더 잘할 수 있을 것 같아요.','흠... 생각해볼게요.'],luna:['우와~!! 정말요?! 최고다!!','에헤헤~ 고마워요 프로듀서님!!','열심히 할게요!! 두고 보세요!!','넵넵!! 알겠습니다~!!'],sei:['...알겠어요.','그렇군요.','고마워요... 뭐, 조금은.','...노력해볼게요.']};
function sendTalk(){
  const input=document.getElementById('talkinputfield');
  if(!input||!input.value.trim()||!st.currentTalk)return;
  input.value='';
  const replies=TALK_REPLIES[st.currentTalk.id]||TALK_REPLIES.hana;
  document.getElementById('talktext').textContent=replies[Math.floor(Math.random()*replies.length)];
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.getElementById('sc-talk').classList.contains('active'))sendTalk()});

// ── EVENTS ──
const EVENTS=[
  {icon:'⚡',title:'센터 자리 갈등',img:BASE+'event_center_conflict.png',desc:'데뷔곡 안무 연습 중 센터 자리를 두고 하나와 루나의 의견이 엇갈렸다. 연습실 분위기가 싸해졌다...',choices:[
    {text:'하나를 센터로',hint:'팀 안정에 긍정적',recommend:true,result:'하나가 고개를 끄덕였다. 루나는 아쉬운 듯 입술을 꾹 깨물었다.',effect:{hana:{dance:3,mental:2},luna:{mental:-3}}},
    {text:'루나를 센터로',hint:'보컬 성장에 긍정적',recommend:false,result:'루나가 눈을 반짝였다. 하나는 잠시 침묵하다 "알겠어요" 했다.',effect:{luna:{vocal:3,mental:2},hana:{mental:-2}}},
    {text:'세이를 센터로',hint:'비주얼 임팩트 극대화',recommend:false,result:'둘 다 예상 못한 답에 잠시 멍했다. 세이는 말없이 앞으로 나섰다.',effect:{sei:{visual:3},hana:{mental:-1},luna:{mental:-1}}}
  ]},
  {icon:'💌',title:'타 기획사 스카우트 제안',img:BASE+'event_scout_sei.png',desc:'대형 기획사에서 세이에게 직접 연락이 왔다. 더 좋은 조건과 솔로 데뷔를 제안했다고 한다. 세이는 표정 없이 프로듀서에게 이 사실을 전했다.',choices:[
    {text:'단호히 거절한다',hint:'팀 결속력에 매우 긍정적',recommend:true,result:'세이가 처음으로 희미하게 웃었다. "그럴 줄 알았어요." 팀에 대한 신뢰가 깊어졌다.',effect:{sei:{mental:4,visual:2}}},
    {text:'세이의 선택에 맡긴다',hint:'세이 멘탈에 불안 요소',recommend:false,result:'세이는 한동안 침묵하다 결국 팀에 남기로 했다. 하지만 무언가 생각하는 눈빛이었다.',effect:{sei:{mental:1}}}
  ]}
];

function showEventWithLoading(eventIdx){
  go('sc-event-loading');
  const dots=document.getElementById('loading-dots');
  let d=0;const di=setInterval(()=>{dots.textContent='.'.repeat((d++%3)+1);},400);
  setTimeout(()=>{clearInterval(di);showEvent(eventIdx);},2500);
}
let currentEvent=null;
function showEvent(eventIdx){
  currentEvent=EVENTS[eventIdx]||EVENTS[0];
  const img=document.getElementById('ev-img');
  if(currentEvent.img){img.src=currentEvent.img;img.style.display='block';}else img.style.display='none';
  document.getElementById('ev-icon').textContent=currentEvent.icon;
  document.getElementById('ev-title').textContent=currentEvent.title;
  document.getElementById('ev-desc').textContent=currentEvent.desc;
  document.getElementById('ev-choices').innerHTML=currentEvent.choices.map((c,i)=>`<button class="evchoice" onclick="pickEvent(${i})"><span class="ev-choice-text">${c.text}</span><span class="ev-hint">${c.hint}</span>${c.recommend?'<span class="ev-ai-badge">AI 추천</span>':''}</button>`).join('');
  go('sc-event');
}
function pickEvent(i){
  const choice=currentEvent.choices[i];const statChanges=[];
  Object.entries(choice.effect||{}).forEach(([mid,stats])=>{
    const m=st.personaData.find(x=>x.id===mid);
    if(m)Object.entries(stats).forEach(([k,v])=>{if(m.stats[k]!==undefined){m.stats[k]=Math.max(0,Math.min(100,m.stats[k]+v));statChanges.push({name:m.name,stat:STAT_KR[k]||k,v});}});
  });
  const chips=statChanges.map(({name,stat,v})=>`<span class="sumchip${v<0?' neg':''}">${name} ${stat} ${v>0?'+':''}${v}</span>`).join('');
  document.getElementById('ev-choices').innerHTML=`<div class="ev-result-text">${choice.result}</div>${chips?`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${chips}</div>`:''}<button class="evchoice" style="border-color:var(--gold);color:var(--gold);margin-top:8px" onclick="buildHub();go('sc-hub')">✦ 확인</button>`;
}

// ── DEBUT ──
function showDebutExam(){
  const avg=st.personaData.reduce((s,m)=>s+Object.values(m.stats).reduce((a,b)=>a+b,0)/6,0)/st.personaData.length;
  const pass=avg>=50;
  document.getElementById('debut-avg').textContent=Math.round(avg);
  document.getElementById('debut-status').textContent=pass?'데뷔 가능 ✦':'아직 준비가 부족합니다';
  document.getElementById('debut-status').style.color=pass?'#7dc97d':'#f08080';
  document.getElementById('debut-confirm').style.display=pass?'block':'none';
  document.getElementById('debut-stats').innerHTML=st.personaData.map(m=>`<div class="debut-member-row"><img src="${m.cardImg}" class="debut-thumb" alt="${m.name}"><div><div class="msc-name">${m.name}</div><div class="debut-avg-val">평균 ${Math.round(Object.values(m.stats).reduce((a,b)=>a+b,0)/6)}</div></div></div>`).join('');
  go('sc-debut-exam');
}
function confirmDebut(){
  st.debutWeek=st.week;showDebutScene();
}
function showDebutScene(){
  document.getElementById('debut-groupname').textContent=st.groupName.toUpperCase();
  document.getElementById('debut-week-label').textContent=`${st.week}주차 데뷔`;
  go('sc-debut');
  const el=document.getElementById('debut-text');el.textContent='';
  const txt='데뷔 확정 ✦';let i=0;
  setTimeout(()=>{const ti=setInterval(()=>{if(i<txt.length)el.textContent+=txt[i++];else clearInterval(ti);},80);},800);
}

// ── SOCIAL ──
function showSocial(){
  document.getElementById('social-groupname').textContent=st.groupName.toUpperCase();
  document.getElementById('social-fandom').textContent=Math.round(st.fandom);
  document.getElementById('social-members').innerHTML=st.personaData.map(m=>`<img src="${m.cardImg}" class="social-thumb" alt="${m.name}">`).join('');
  go('sc-social');
}
function copyShare(){
  const txt=`🌟 ${st.groupName} — AIDOL K-POP Agency\n팬덤 ${Math.round(st.fandom)} | 멤버: ${st.personaData.map(m=>m.name).join(', ')}\nhttps://muffinbiter.github.io/aidol/`;
  navigator.clipboard?.writeText(txt).then(()=>showToast('공유 텍스트가 복사됐어요!'));
}

// ── RANKING ──
function showRanking(){
  const myFandom=Math.round(st.fandom);
  const all=[...DUMMY_GROUPS,{name:st.groupName,fandom:myFandom,isMe:true}].sort((a,b)=>b.fandom-a.fandom);
  const myRank=all.findIndex(g=>g.isMe)+1;
  document.getElementById('my-rank').textContent=`전체 ${myRank}위`;
  document.getElementById('ranking-list').innerHTML=all.map((g,i)=>{
    const medal=i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}`;
    return `<div class="rank-row${g.isMe?' rank-me':''}" ${g.isMe?'onclick="showGroupProfile()"':''}>
      <span class="rank-num">${medal}</span><span class="rank-name">${g.name}</span>
      <span class="rank-fandom">팬덤 ${g.fandom}</span>${g.isMe?'<span class="rank-me-badge">나</span>':''}
    </div>`;
  }).join('');
  go('sc-ranking');
}

// ── GROUP PROFILE ──
function showGroupProfile(){
  document.getElementById('gp-img').src=BASE+'scene_group_debut.png';
  document.getElementById('gp-name').textContent=st.groupName.toUpperCase();
  document.getElementById('gp-debut').textContent=`${st.debutWeek||st.week}주차 데뷔`;
  document.getElementById('gp-fandom').textContent=`팬덤 ${Math.round(st.fandom)}`;
  document.getElementById('gp-members').innerHTML=st.personaData.map(m=>`<div class="gp-member"><img src="${m.cardImg}" class="gp-thumb" alt="${m.name}"><div class="gp-mname">${m.name}</div><div class="gp-mpos">${m.position}</div></div>`).join('');
  document.getElementById('gp-likes').textContent=st.likes;
  go('sc-groupprofile');
}
function addLike(){
  st.likes++;document.getElementById('gp-likes').textContent=st.likes;
  const btn=document.getElementById('like-btn');
  btn.style.transform='scale(1.3)';setTimeout(()=>btn.style.transform='scale(1)',200);
}

// ── TOAST ──
function showToast(msg,showAP=false){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t);}
  t.innerHTML=msg+(showAP?` <button onclick="openApShop()" style="margin-left:8px;color:var(--gold);background:none;border:1px solid var(--gold);border-radius:8px;padding:2px 8px;cursor:pointer;font-size:11px">AP 충전</button>`:'');
  t.className='toast show';setTimeout(()=>t.className='toast',2500);
}
