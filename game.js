const BASE='https://raw.githubusercontent.com/muffinbiter/aidol/main/assets/';
const AP_MAX=12;
const AP_COST={'보컬 트레이닝':3,'댄스 트레이닝':3,'랩 트레이닝':3,'체력 단련':2,'이미지 메이킹':2,'휴식':1,'합숙 집중 훈련':5};
const SCHED_LIST=['보컬 트레이닝','댄스 트레이닝','랩 트레이닝','체력 단련','이미지 메이킹','휴식','합숙 집중 훈련'];
const SCHED_STAT={
  '보컬 트레이닝':{vocal:4,stamina:-2,fandom:1},
  '댄스 트레이닝':{dance:4,stamina:-2,fandom:1},
  '랩 트레이닝':{rap:4,stamina:-2,fandom:1},
  '체력 단련':{stamina:4,mental:2,fandom:0},
  '이미지 메이킹':{visual:3,mental:1,fandom:2},
  '휴식':{mental:4,stamina:2,fandom:0},
  '합숙 집중 훈련':{vocal:2,dance:2,rap:2,visual:1,mental:-3,stamina:-2,fandom:3}
};
const STAT_KR={vocal:'보컬',dance:'댄스',visual:'비주얼',rap:'랩',mental:'멘탈',stamina:'체력'};
const NARR={
  '보컬 트레이닝':['{n}은 하루 종일 보컬 트레이닝에 몰두했다. 고음 부분이 드디어 안정되기 시작했다.','{n}의 목소리가 조금씩 색을 찾아가고 있었다. 강사도 미소를 지었다.','{n}은 목이 아팠지만 멈추지 않았다. 오늘은 뭔가 달랐다.'],
  '댄스 트레이닝':['{n}은 거울 앞에서 수백 번 동작을 반복했다. 땀이 바닥을 적셨지만 눈빛은 흔들리지 않았다.','{n}의 무게중심이 조금씩 잡히기 시작했다. 오늘은 잘 된 날이다.','{n}은 동작 하나하나에 집중했다. 아직 완벽하지 않지만, 나아지고 있다.'],
  '랩 트레이닝':['{n}은 밤늦게까지 플로우를 연구했다. 자신만의 색이 조금씩 묻어나기 시작했다.','{n}의 라임이 오늘따라 잘 맞았다. 가능성이 보이는 하루였다.','{n}은 가사를 외우고 또 외웠다. 아직 갈 길이 멀지만 포기하지 않는다.'],
  '체력 단련':['{n}은 이른 아침부터 트레이닝을 시작했다. 체력이 실력이라는 걸 다시 한번 실감했다.','{n}이 오늘은 러닝을 한 시간 넘게 했다. 지치지 않는 몸을 만들기 위해.','{n}의 체력이 조금씩 올라가고 있다. 뿌듯한 하루였다.'],
  '이미지 메이킹':['{n}은 스타일리스트와 함께 새로운 룩을 시도했다. 조금씩 아이돌다워지고 있다.','{n}의 카메라 앞 표정이 자연스러워지고 있다. 뭔가 달라 보인다.','{n}은 거울 속 자신을 오래 바라봤다. 아직 갈 길이 있다는 걸 알고 있다.'],
  '휴식':['{n}은 오늘 처음으로 제대로 쉬었다. 맛있는 걸 먹고 좋아하는 음악을 들었다.','{n}이 오늘은 아무것도 하지 않기로 했다. 내일을 위한 재충전이다.','{n}의 표정이 오랜만에 편안해 보였다. 가끔 이런 날도 필요하다.'],
  '합숙 집중 훈련':['{n}은 합숙 훈련에서 한계까지 몰아붙였다. 전 스탯이 올랐지만 녹초가 됐다.','{n}은 합숙소에서 밤을 새웠다. 힘들지만 버텼다.','{n}의 눈빛이 합숙 이후 달라졌다. 무언가를 깨달은 것 같다.']
};

const MEMBER_MSGS={
  hana:['이번 주도 고생 많으셨어요, 프로듀서님. 팀이 점점 맞춰지는 것 같아서 기뻐요.','저도 아직 부족한 게 많지만... 열심히 할게요. 믿어주세요.','멤버들 상태 괜찮은 것 같아요. 이번 주도 잘 버텼어요.'],
  luna:['프로듀서님~!! 이번 주 진짜 열심히 했죠?! 칭찬 한 마디만요!!','에헤헤~ 힘들었지만 재밌었어요!! 다음 주도 파이팅!!','저 이번 주 엄청 성장한 것 같아요!! 느껴지시나요?!'],
  sei:['...수고했어요.','이번 주, 나쁘지 않았어요.','다음 주도... 잘 부탁해요. 뭐, 형식적인 말이지만.']
};

const MEMBERS=[
  {id:'hana',name:'하나',position:'리더 / 메인댄서',personality:'카리스마 있지만 멤버를 잘 챙기는 언니 스타일. 책임감 강하고 프로페셔널함.',cardImg:BASE+'card_hana.png',talkImg:BASE+'scene_hana_talk.png',practiceImg:BASE+'scene_hana_practice.png',dialogues:['오늘도 잘 부탁해요, 프로듀서님. 저는 항상 팀을 위해 최선을 다할게요.','멤버들 컨디션은 제가 챙길게요. 프로듀서님은 큰 그림만 보세요.','어떤 스케줄이든 준비돼 있어요. 저희를 믿어주세요.'],stats:{vocal:65,dance:82,visual:70,rap:40,mental:75,stamina:68}},
  {id:'luna',name:'루나',position:'메인보컬 / 막내',personality:'밝고 긍정적인 분위기 메이커. 가끔 엉뚱하고 4차원적인 면도 있음.',cardImg:BASE+'card_luna.png',talkImg:BASE+'scene_luna_talk.png',practiceImg:BASE+'scene_luna_practice.png',dialogues:['프로듀서님~! 오늘 연습 진짜 열심히 했어요!! 칭찬해주세요 ><','에헤헤~ 제가 오늘 또 조금 실수했는데... 그래도 귀엽죠?? 그죠??','같이 데뷔하면 진짜 최고일 것 같아요!! 기대되지 않아요?!'],stats:{vocal:88,dance:55,visual:72,rap:30,mental:70,stamina:58}},
  {id:'sei',name:'세이',position:'래퍼 / 비주얼',personality:'말수 적고 쿨해 보이지만 사실 감성이 충만한 타입. 츤데레 기질 있음.',cardImg:BASE+'card_sei.png',talkImg:BASE+'scene_sei_talk.png',practiceImg:BASE+'scene_sei_practice.png',dialogues:['...할 말 있으면 해요.','연습은 잘 됐어요. 특별히 보고할 건 없고요.','프로듀서를 완전히 믿는다는 건 아니지만... 나쁘지 않게 하고 있네요.'],stats:{vocal:50,dance:68,visual:88,rap:82,mental:60,stamina:52}}
];

const st={groupName:'',memberCount:3,selectedMembers:[],personaStep:0,personaData:[],ap:AP_MAX,week:1,fandom:0,currentTalk:null,dialogueIdx:0,resultQueue:[],resultStep:0,weekResults:[],weekFandomGain:0};

function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active')}
function selCnt(b,n){document.querySelectorAll('.cbtn').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');st.memberCount=n}
function selOpt(b){b.closest('.ogrid').querySelectorAll('.obtn').forEach(x=>x.classList.remove('sel'));b.classList.add('sel')}

function goCasting(){
  st.groupName=document.getElementById('gname').value.trim()||'MY GROUP';
  const grid=document.getElementById('cgrid');
  grid.innerHTML='';st.selectedMembers=[];
  for(let i=0;i<6;i++){
    if(i%2===0){
      const m=MEMBERS[i/2];
      const card=document.createElement('div');
      card.className='ccard';card.dataset.id=m.id;
      card.innerHTML=`<div class="cinner"><div class="cfront"><div class="cdeco"></div><div class="rune">✦</div><div class="chint">탭하여 공개</div></div><div class="cback"><img src="${m.cardImg}" alt="${m.name}" loading="lazy"><div class="ci"><div class="cn">${m.name}</div><div class="cp">${m.position}</div></div></div></div>`;
      card.addEventListener('click',()=>{
        if(!card.classList.contains('flipped')){card.classList.add('flipped');return}
        if(card.classList.contains('picked')){card.classList.remove('picked');st.selectedMembers=st.selectedMembers.filter(x=>x.id!==m.id)}
        else{if(st.selectedMembers.length>=3)return;card.classList.add('picked');st.selectedMembers.push(m)}
        const n=st.selectedMembers.length;
        document.getElementById('cbar').textContent=n===0?'카드를 탭하여 연습생을 공개하세요':n<3?`${n}명 선택 — ${3-n}명 더 선발하세요`:'✦ 3명 선발 완료';
        const btn=document.getElementById('cnext');btn.style.opacity=n===3?'1':'0.35';btn.style.pointerEvents=n===3?'auto':'none';
      });
      grid.appendChild(card);
    } else {
      const lk=document.createElement('div');lk.className='locked';lk.innerHTML='<div class="lico">✦</div><div class="ltxt">미발굴</div>';grid.appendChild(lk);
    }
  }
  go('sc-casting');
}

function goPersona(){
  st.personaData=st.selectedMembers.map(m=>({...m,stats:{...m.stats},dialogues:[...m.dialogues],inputName:m.name,inputPos:m.position,inputPersonality:m.personality}));
  st.personaStep=0;
  document.getElementById('pdots').innerHTML=st.personaData.map((_,i)=>`<div class="pdot" id="pd${i}"></div>`).join('');
  renderPersona();go('sc-persona');
}
function renderPersona(){
  const s=st.personaStep,m=st.personaData[s];
  st.personaData.forEach((_,i)=>{const d=document.getElementById(`pd${i}`);if(d)d.className='pdot'+(i<s?' done':i===s?' active':'')});
  document.getElementById('pavatar').src=m.cardImg;
  document.getElementById('pstep').textContent=`멤버 ${s+1} / ${st.personaData.length}`;
  document.getElementById('pmname').textContent=m.inputName;
  document.getElementById('pbtn').textContent=s<st.personaData.length-1?'확정 →':'✦ 페르소나 완성';
  document.getElementById('pbody').innerHTML=`<div><div class="fl">이름 (예명)</div><input class="fi" id="pi-name" value="${m.inputName}" maxlength="10"></div><div><div class="fl">포지션</div><input class="fi" id="pi-pos" value="${m.inputPos}" maxlength="30"></div><div><div class="fl">성격 & 말투</div><textarea class="fta" id="pi-pers">${m.inputPersonality}</textarea></div>`;
}
function nextPersona(){
  const s=st.personaStep,m=st.personaData[s];
  m.inputName=document.getElementById('pi-name').value||m.name;m.name=m.inputName;
  m.inputPos=document.getElementById('pi-pos').value;m.position=m.inputPos;
  m.inputPersonality=document.getElementById('pi-pers').value;
  if(s<st.personaData.length-1){st.personaStep++;renderPersona();}
  else{buildHub();go('sc-hub');}
}

function buildHub(){
  document.getElementById('hgname').textContent=`— ${st.groupName.toUpperCase()} —`;
  document.getElementById('wpill').textContent=`연습 ${st.week}주차`;
  document.getElementById('hapdis').textContent=`✦ AP ${st.ap} / ${AP_MAX}`;
  document.getElementById('hmembers').innerHTML=st.personaData.map(m=>`<div class="mcard" onclick="openTalk('${m.id}')"><img class="mthumb" src="${m.cardImg}" alt="${m.name}"><div class="minfo"><div class="mname">${m.name}</div><div class="mpos">${m.position}</div><div class="sbars">${Object.values(m.stats).map(v=>`<div class="sbar"><div class="sbarfill" style="width:${v}%"></div></div>`).join('')}</div></div><div class="mico">✦</div></div>`).join('');
  document.getElementById('sched-tab').onclick=()=>{buildSchedule();go('sc-schedule')};
  document.getElementById('talk-tab').onclick=()=>alert('멤버 카드를 눌러서 대화해보세요!');
}

function buildSchedule(){
  st.ap=AP_MAX;renderGems();
  document.getElementById('schedBody').innerHTML=st.personaData.map(m=>`<div class="srow"><div class="stop"><img class="sthumb" src="${m.cardImg}" alt="${m.name}"><div><div class="smname">${m.name}</div><div class="smpos">${m.position}</div></div></div><select class="ssel" id="sel-${m.id}" onchange="onSel()">${SCHED_LIST.map(s=>`<option value="${s}">${s}  (AP ${AP_COST[s]})</option>`).join('')}</select><div class="scost" id="cost-${m.id}">소모 AP · ${AP_COST[SCHED_LIST[0]]}</div></div>`).join('');
  onSel();
}
function renderGems(){
  const used=AP_MAX-st.ap;
  document.getElementById('apgems').innerHTML=Array.from({length:AP_MAX},(_,i)=>`<div class="apgem${i<used?' used':''}"></div>`).join('');
  document.getElementById('apnum').textContent=st.ap;
}
function onSel(){
  let used=0;
  st.personaData.forEach(m=>{const s=document.getElementById(`sel-${m.id}`);if(s)used+=AP_COST[s.value]||0});
  st.ap=AP_MAX-used;renderGems();
  st.personaData.forEach(m=>{const s=document.getElementById(`sel-${m.id}`);const c=document.getElementById(`cost-${m.id}`);if(s&&c)c.textContent=`소모 AP · ${AP_COST[s.value]||0}`});
}

function startWeek(){
  st.resultQueue=[];st.weekResults=[];st.weekFandomGain=0;
  st.personaData.forEach(m=>{
    const sel=document.getElementById(`sel-${m.id}`);
    const sched=sel?sel.value:'휴식';
    const gains={};
    Object.entries(SCHED_STAT[sched]||{}).forEach(([k,v])=>{
      if(k==='fandom'){st.fandom=Math.min(100,st.fandom+v);st.weekFandomGain+=v;}
      else{m.stats[k]=Math.max(0,Math.min(100,(m.stats[k]||0)+v));gains[k]=v;}
    });
    const narrs=NARR[sched]||[];
    const narr=(narrs[Math.floor(Math.random()*narrs.length)]||'').replace(/{n}/g,m.name);
    st.resultQueue.push({member:m,sched,narr,gains});st.weekResults.push({member:m,sched,gains});
  });
  st.resultStep=0;showResult();
}
function showResult(){
  if(st.resultStep>=st.resultQueue.length){showSummary();return}
  const {member:m,sched,narr,gains}=st.resultQueue[st.resultStep];
  document.getElementById('rbg').src=m.practiceImg;
  document.getElementById('rlabel').textContent=`Week ${st.week}  ·  ${sched}`;
  document.getElementById('rname').textContent=m.name;
  document.getElementById('rnarr').textContent=narr;
  const pos=Object.entries(gains).filter(([,v])=>v>0);
  const neg=Object.entries(gains).filter(([,v])=>v<0);
  document.getElementById('rstatrow').innerHTML=[...pos.map(([k,v])=>`<div class="rchip up">${STAT_KR[k]||k} +${v} ↑</div>`),...neg.map(([k,v])=>`<div class="rchip">${STAT_KR[k]||k} ${v} ↓</div>`)].join('');
  document.getElementById('rnext').textContent=st.resultStep<st.resultQueue.length-1?'다음 멤버 →':'결과 요약 →';
  go('sc-result');
}
function nextResult(){st.resultStep++;showResult()}
function showSummary(){
  document.getElementById('sumbody').innerHTML=st.weekResults.map(({member:m,sched,gains})=>{
    const pos=Object.entries(gains).filter(([,v])=>v>0);
    const neg=Object.entries(gains).filter(([,v])=>v<0);
    return `<div class="sumcard"><img class="sumthumb" src="${m.cardImg}" alt="${m.name}"><div class="suminfo"><div class="sumname">${m.name}</div><div class="sumsched">${sched}</div><div class="sumgained">${
      pos.map(([k,v])=>`<span class="sumchip">${STAT_KR[k]||k} +${v}</span>`).join('')
    }${neg.map(([k,v])=>`<span class="sumchip neg">${STAT_KR[k]||k} ${v}</span>`).join('')
    }${!pos.length&&!neg.length?'<span class="sumchip rest">휴식</span>':''}</div></div></div>`;
  }).join('');
  go('sc-summary');
}
function endWeek(){
  const wasWeek1=st.week===1;
  st.week++;st.ap=AP_MAX;
  showMemberMsg(wasWeek1);
}

// ── MEMBER MESSAGE ──
function showMemberMsg(triggerEvent){
  const m=st.personaData[Math.floor(Math.random()*st.personaData.length)];
  const msgs=MEMBER_MSGS[m.id]||MEMBER_MSGS.hana;
  const msg=msgs[Math.floor(Math.random()*msgs.length)];
  document.getElementById('mmsg-img').src=m.talkImg;
  document.getElementById('mmsg-badge').textContent=m.name.toUpperCase();
  document.getElementById('mmsg-text').textContent=msg;
  document.getElementById('mmsg-next').onclick=()=>showWeeklyReport(triggerEvent);
  go('sc-mmsg');
}

// ── WEEKLY REPORT ──
function showWeeklyReport(triggerEvent){
  // Radar chart
  drawRadar();
  // Fandom gauge
  const fp=Math.round(st.fandom);
  document.getElementById('fandom-bar-fill').style.width=fp+'%';
  document.getElementById('fandom-num').textContent=fp;
  document.getElementById('fandom-gain').textContent=st.weekFandomGain>0?`+${st.weekFandomGain} ↑`:'';
  document.getElementById('report-next').onclick=()=>{
    buildHub();
    if(triggerEvent){setTimeout(()=>showEvent(),350);}
    else{go('sc-hub');}
  };
  go('sc-report');
}

function drawRadar(){
  const canvas=document.getElementById('radar-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const cx=W/2,cy=H/2,R=Math.min(W,H)/2-30;
  ctx.clearRect(0,0,W,H);
  const labels=['보컬','댄스','비주얼','랩','멘탈','체력'];
  const keys=['vocal','dance','visual','rap','mental','stamina'];
  const n=labels.length;
  const angles=keys.map((_,i)=>(-Math.PI/2)+(2*Math.PI/n)*i);
  // avg stats across members
  const avg=keys.map(k=>st.personaData.reduce((s,m)=>s+(m.stats[k]||0),0)/st.personaData.length);
  // grid
  [0.25,0.5,0.75,1].forEach(r=>{
    ctx.beginPath();
    angles.forEach((a,i)=>{const x=cx+Math.cos(a)*R*r,y=cy+Math.sin(a)*R*r;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)});
    ctx.closePath();ctx.strokeStyle='rgba(201,168,76,0.2)';ctx.lineWidth=1;ctx.stroke();
  });
  // axes
  angles.forEach(a=>{ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.strokeStyle='rgba(201,168,76,0.25)';ctx.lineWidth=1;ctx.stroke()});
  // data
  ctx.beginPath();
  angles.forEach((a,i)=>{const v=avg[i]/100,x=cx+Math.cos(a)*R*v,y=cy+Math.sin(a)*R*v;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)});
  ctx.closePath();ctx.fillStyle='rgba(201,168,76,0.2)';ctx.fill();ctx.strokeStyle='rgba(201,168,76,0.8)';ctx.lineWidth=2;ctx.stroke();
  // dots
  angles.forEach((a,i)=>{const v=avg[i]/100,x=cx+Math.cos(a)*R*v,y=cy+Math.sin(a)*R*v;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle='#c9a84c';ctx.fill()});
  // labels
  ctx.font='bold 12px Noto Sans KR';ctx.fillStyle='rgba(245,239,230,0.75)';ctx.textAlign='center';ctx.textBaseline='middle';
  angles.forEach((a,i)=>{const x=cx+Math.cos(a)*(R+20),y=cy+Math.sin(a)*(R+20);ctx.fillText(labels[i],x,y)});
}

function openTalk(id){
  const m=st.personaData.find(x=>x.id===id);if(!m)return;
  st.currentTalk=m;st.dialogueIdx=0;
  document.getElementById('talkimg').src=m.talkImg;
  document.getElementById('talkbadge').textContent=m.name.toUpperCase();
  document.getElementById('talktext').textContent=m.dialogues[0];
  go('sc-talk');
}
function nextLine(){if(!st.currentTalk)return;st.dialogueIdx=(st.dialogueIdx+1)%st.currentTalk.dialogues.length;document.getElementById('talktext').textContent=st.currentTalk.dialogues[st.dialogueIdx]}

const TALK_REPLIES={
  hana:['네, 열심히 할게요. 믿어주세요.','프로듀서님 덕분에 많이 배우고 있어요.','고마워요. 더 잘할 수 있을 것 같아요.','흠... 생각해볼게요.','저도 그렇게 생각했어요.'],
  luna:['우와~!! 정말요?! 최고다!!','에헤헤~ 고마워요 프로듀서님!!','열심히 할게요!! 두고 보세요!!','흠... 그건 좀 어렵지 않아요?? ㅠㅠ','넵넵!! 알겠습니다~!!'],
  sei:['...알겠어요.','그렇군요.','고마워요... 뭐, 조금은.','흠. 생각해볼게요.','...노력해볼게요.']
};
function sendTalk(){
  const input=document.getElementById('talkinputfield');
  if(!input||!input.value.trim()||!st.currentTalk)return;
  input.value='';
  const replies=TALK_REPLIES[st.currentTalk.id]||TALK_REPLIES.hana;
  const reply=replies[Math.floor(Math.random()*replies.length)];
  document.getElementById('talktext').textContent=reply;
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.getElementById('sc-talk').classList.contains('active'))sendTalk()});

// ── EVENTS ──
const EVENTS=[
  {icon:'⚡',title:'센터 자리 갈등',img:BASE+'event_center_conflict.png',
   desc:'데뷔곡 안무 연습 중 센터 자리를 두고 하나와 루나의 의견이 엇갈렸다. 연습실 분위기가 싸해졌다...',
   choices:[
    {text:'하나를 센터로 — 리더의 카리스마가 맞아',result:'하나가 고개를 끄덕였다. 루나는 아쉬운 듯 입술을 꾹 깨물었다.',effect:{hana:{dance:3,mental:2},luna:{mental:-3}}},
    {text:'루나를 센터로 — 보컬이 중심이어야 해',result:'루나가 눈을 반짝였다. 하나는 잠시 침묵하다 "알겠어요" 했다.',effect:{luna:{vocal:3,mental:2},hana:{mental:-2}}},
    {text:'세이를 센터로 — 비주얼이 센터지!',result:'둘 다 예상 못한 답에 잠시 멍했다. 세이는 말없이 앞으로 나섰다.',effect:{sei:{visual:3},hana:{mental:-1},luna:{mental:-1}}}
  ]},
  {icon:'📱',title:'바이럴 영상',img:'',
   desc:'연습 중 찍힌 영상이 SNS에 퍼지기 시작했다. 반응이 뜨겁다. 어떻게 대응할까?',
   choices:[
    {text:'공식 계정에서 활용한다 — 기회야!',result:'팬들의 반응이 폭발했다. 주목도가 높아졌다!',effect:{}},
    {text:'조용히 넘긴다 — 아직 때가 아니야',result:'자연스럽게 묻혔다. 안전하게 넘어갔다.',effect:{}}
  ]},
  {icon:'💌',title:'타 기획사 스카우트',img:'',
   desc:'대형 기획사에서 세이에게 스카우트 제안이 들어왔다. 세이는 프로듀서에게 의견을 물었다.',
   choices:[
    {text:'단호히 거절한다 — 우리 팀이 최고야',result:'세이가 미소를 지었다. 팀에 대한 신뢰가 깊어진 것 같다.',effect:{sei:{mental:3}}},
    {text:'세이에게 맡긴다 — 네 선택을 존중해',result:'세이는 결국 팀에 남기로 했다. 하지만 무언가 생각하는 것 같다.',effect:{sei:{mental:1}}}
  ]}
];
let currentEvent=null;
function showEvent(){
  currentEvent=EVENTS[0];
  const img=document.getElementById('ev-img');
  if(currentEvent.img){img.src=currentEvent.img;img.style.display='block';}
  else{img.style.display='none';}
  document.getElementById('ev-icon').textContent=currentEvent.icon;
  document.getElementById('ev-title').textContent=currentEvent.title;
  document.getElementById('ev-desc').textContent=currentEvent.desc;
  document.getElementById('ev-choices').innerHTML=currentEvent.choices.map((c,i)=>`<button class="evchoice" onclick="pickEvent(${i})">${c.text}</button>`).join('');
  go('sc-event');
}
function pickEvent(i){
  const choice=currentEvent.choices[i];
  const effect=choice.effect||{};
  const statChanges=[];
  Object.entries(effect).forEach(([mid,stats])=>{
    const m=st.personaData.find(x=>x.id===mid);
    if(m) Object.entries(stats).forEach(([k,v])=>{
      if(m.stats[k]!==undefined){m.stats[k]=Math.max(0,Math.min(100,m.stats[k]+v));statChanges.push({name:m.name,stat:STAT_KR[k]||k,v});}
    });
  });
  const chips=statChanges.map(({name,stat,v})=>`<span class="sumchip${v<0?' neg':''}">${name} ${stat} ${v>0?'+':''}${v}</span>`).join('');
  document.getElementById('ev-choices').innerHTML=`
    <div style="font-family:'Noto Serif KR',serif;font-size:15px;color:rgba(245,239,230,.9);line-height:1.9;background:rgba(201,168,76,.08);border-left:2px solid var(--gold);padding:16px 18px;border-radius:0 12px 12px 0">${choice.result}</div>
    ${chips?`<div style="display:flex;flex-wrap:wrap;gap:6px">${chips}</div>`:''}
    <button class="evchoice" style="border-color:var(--gold);color:var(--gold)" onclick="buildHub();go('sc-hub')">✦ 확인</button>`;
}
