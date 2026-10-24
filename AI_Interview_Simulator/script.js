const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const STORAGE_USERS = 'interviewAceUsersV1';
const STORAGE_CURRENT = 'interviewAceCurrentV1';
const STORAGE_SESSIONS = 'interviewAceSessionsV1';

const banks = {
  'Software Developer': {
    Easy: [
      ['Tell me about yourself and your interest in software development.',['experience','project','learn','programming','team','problem','skill','build','develop']],
      ['What is the difference between a compiler and an interpreter?',['compiler','interpreter','translate','source code','machine code','execute','error']],
      ['Explain object-oriented programming in simple terms.',['class','object','encapsulation','inheritance','polymorphism','abstraction','code']],
      ['How do you debug a program that is not working?',['reproduce','debug','error','log','test','breakpoint','isolate','fix']],
      ['What makes code readable and maintainable?',['naming','comments','function','modular','consistent','test','simple','documentation']],
      ['Describe a project you enjoyed working on.',['goal','role','challenge','solution','result','learn','team','impact']]
    ],
    Medium: [
      ['How would you design a URL shortening service?',['database','unique','hash','redirect','collision','scale','cache','api']],
      ['What is the difference between REST and GraphQL?',['endpoint','query','resource','schema','payload','overfetch','api','http']],
      ['How do you approach a bug that only appears in production?',['logs','monitoring','reproduce','environment','rollback','root cause','test','metrics']],
      ['Explain time complexity and give an example.',['big o','complexity','input','linear','logarithmic','quadratic','algorithm','scale']],
      ['How would you improve the performance of a slow web application?',['profile','database','cache','network','lazy','optimize','measure','load']],
      ['What is the purpose of automated testing in a development workflow?',['unit','integration','regression','pipeline','coverage','confidence','automate','bug']]
    ],
    Hard: [
      ['Design a notification system that supports millions of users.',['queue','delivery','retry','idempotent','scale','partition','priority','monitoring','fanout']],
      ['How would you investigate and resolve a memory leak in a service?',['heap','profile','allocation','reference','gc','reproduce','monitor','leak']],
      ['Explain database indexing trade-offs at high scale.',['index','read','write','storage','query','selectivity','b-tree','trade-off']],
      ['How would you design a resilient distributed system?',['failure','redundancy','timeout','retry','circuit breaker','consistency','observability','availability']],
      ['Describe a technical decision you would revisit and why.',['trade-off','decision','impact','feedback','alternative','measure','learn','improve']],
      ['How would you safely deploy a breaking API change?',['version','backward compatibility','migration','contract','deprecate','monitor','rollback','client']]
    ]
  },
  'Frontend Developer': {
    Easy: [
      ['What is the difference between HTML, CSS, and JavaScript?',['structure','style','behavior','html','css','javascript','web']],
      ['Explain the CSS box model.',['content','padding','border','margin','width','height','box-sizing']],
      ['What makes a website responsive?',['media query','flexible','grid','viewport','mobile','breakpoint','responsive']],
      ['How do you make a page accessible?',['semantic','keyboard','screen reader','contrast','alt text','label','aria']],
      ['What is the DOM?',['document','object','tree','element','javascript','browser','node']],
      ['How would you debug a layout issue?',['inspect','devtools','computed','css','reproduce','responsive','element']]
    ],
    Medium: [
      ['How do you manage state in a complex frontend application?',['state','component','context','store','props','data flow','separation']],
      ['Explain how browser rendering works.',['dom','cssom','render tree','layout','paint','composite','javascript']],
      ['How would you optimize a page with poor Core Web Vitals?',['lcp','inp','cls','image','lazy','bundle','measure','cache']],
      ['What are the trade-offs between client-side and server-side rendering?',['hydration','seo','initial load','server','client','cache','interactivity']],
      ['How do you prevent common web security issues in frontend apps?',['xss','sanitize','escape','csp','token','https','validation']],
      ['How would you build reusable UI components for a team?',['props','api','composition','consistent','documentation','testing','design system']]
    ],
    Hard: [
      ['How would you architect a large frontend application used by multiple teams?',['module','boundary','design system','ownership','shared','testing','deployment','contract']],
      ['Describe strategies for reducing JavaScript bundle size.',['tree shaking','code splitting','lazy','dependency','bundle analyzer','dynamic import','measure']],
      ['How would you handle race conditions in asynchronous UI requests?',['abort','cancel','request id','stale','loading','promise','state']],
      ['How would you plan a frontend migration without disrupting users?',['incremental','compatibility','feature flag','monitor','rollback','testing','migration']],
      ['How do you balance accessibility, performance, and visual design?',['accessibility','trade-off','user','measure','keyboard','performance','test']],
      ['What would you investigate if a frontend app freezes intermittently?',['profile','main thread','render','memory','long task','reproduce','performance']]
    ]
  },
  'Data Analyst': {
    Easy: [
      ['Tell me about yourself and why you want to work with data.',['data','insight','curious','analysis','business','problem','learn']],
      ['What is the difference between a primary key and a foreign key?',['unique','identify','table','relationship','reference','database']],
      ['How would you explain a dashboard to a non-technical stakeholder?',['visual','metric','simple','insight','decision','audience','context']],
      ['What is the difference between mean, median, and mode?',['average','middle','frequency','outlier','distribution','data']],
      ['How do you handle missing values in a dataset?',['missing','remove','impute','median','bias','investigate','context']],
      ['Describe a time you used data to answer a question.',['question','dataset','clean','analyze','insight','result','recommendation']]
    ],
    Medium: [
      ['How would you investigate a sudden drop in customer retention?',['segment','cohort','trend','hypothesis','funnel','compare','cause','metric']],
      ['Explain the difference between an INNER JOIN and a LEFT JOIN.',['matching','rows','table','null','join','relationship','sql']],
      ['How would you design an experiment to test a new feature?',['hypothesis','control','variant','random','sample','significance','metric']],
      ['What steps do you take to ensure data quality?',['validation','duplicate','missing','consistent','source','audit','document']],
      ['How do you choose the right KPI for a business goal?',['goal','metric','actionable','leading','lagging','baseline','outcome']],
      ['Explain correlation versus causation.',['relationship','cause','confounder','experiment','correlation','evidence','bias']]
    ],
    Hard: [
      ['A key metric moved sharply overnight. How would you investigate?',['pipeline','instrumentation','segment','seasonality','source','validation','hypothesis','root cause']],
      ['How would you communicate uncertainty in a business forecast?',['assumption','range','confidence','scenario','risk','sensitivity','uncertainty']],
      ['How would you evaluate whether a recommendation caused an outcome?',['causal','control','experiment','confounder','selection bias','counterfactual','evidence']],
      ['How do you optimize a slow analytical SQL query?',['explain','index','partition','filter','join','scan','aggregate','query plan']],
      ['How would you build a reliable executive metrics layer?',['definition','source of truth','governance','lineage','validation','ownership','consistency']],
      ['Describe a time data contradicted a stakeholder’s assumption.',['evidence','validate','communicate','context','bias','recommendation','trust']]
    ]
  },
  'UI/UX Designer': {
    Easy: [
      ['Walk me through your design process.',['research','user','problem','wireframe','prototype','test','iterate']],
      ['What is the difference between UI and UX?',['interface','experience','usability','visual','user','interaction']],
      ['How do you choose colors and typography for a product?',['contrast','hierarchy','brand','readability','accessibility','consistency']],
      ['What is a user persona and when is it useful?',['research','behavior','goal','need','segment','assumption']],
      ['How would you improve a confusing sign-up form?',['field','feedback','label','friction','test','simple','error']],
      ['Tell me about a design project you are proud of.',['problem','research','decision','prototype','feedback','result','learn']]
    ],
    Medium: [
      ['How do you prioritize usability issues when time is limited?',['severity','frequency','impact','user','evidence','effort','prioritize']],
      ['How would you plan usability testing for a new checkout flow?',['task','participant','observe','success rate','friction','feedback','iterate']],
      ['What belongs in a scalable design system?',['component','token','guideline','documentation','accessibility','consistency','ownership']],
      ['How do you design for users with accessibility needs?',['keyboard','contrast','screen reader','focus','semantic','inclusive','test']],
      ['How would you resolve conflicting stakeholder feedback?',['goal','evidence','user','trade-off','prototype','align','decision']],
      ['How do you measure whether a redesign succeeded?',['baseline','conversion','task success','retention','qualitative','quantitative','metric']]
    ],
    Hard: [
      ['How would you redesign a complex workflow used by expert users?',['workflow','research','mental model','prototype','efficiency','test','trade-off']],
      ['How do you validate a design when research access is limited?',['proxy','analytics','assumption','experiment','feedback','risk','iterate']],
      ['How would you create consistency across several products?',['system','token','component','governance','audit','adoption','documentation']],
      ['How do you balance conversion goals with user trust?',['transparent','consent','ethical','metric','long-term','user need','trade-off']],
      ['Tell me about a design decision that failed and what you changed.',['feedback','evidence','assumption','iterate','impact','learn','measure']],
      ['How would you make a data-heavy interface easier to understand?',['hierarchy','progressive disclosure','visualization','context','filter','accessibility','test']]
    ]
  },
  'Marketing Executive': {
    Easy: [
      ['Tell me about yourself and your interest in marketing.',['audience','creative','campaign','brand','communication','learn']],
      ['What is the difference between organic and paid marketing?',['reach','budget','content','targeting','seo','advertising','results']],
      ['How would you promote a new product with a small budget?',['audience','social media','content','partnership','test','measure','budget']],
      ['What makes a social media post engaging?',['hook','visual','audience','value','call to action','timing','engagement']],
      ['How do you stay updated on marketing trends?',['research','platform','industry','experiment','newsletter','learn']],
      ['What metrics would you use to measure a campaign?',['reach','click','conversion','engagement','roi','cost','goal']]
    ],
    Medium: [
      ['How would you diagnose a campaign with high clicks but low conversions?',['landing page','audience','message','friction','conversion','analytics','test']],
      ['How do you define and reach a target audience?',['persona','segment','research','behavior','channel','message','data']],
      ['Explain how you would plan a 30-day content calendar.',['goal','audience','pillar','format','schedule','channel','measure']],
      ['How would you allocate a limited marketing budget across channels?',['objective','test','performance','cost','roi','audience','optimize']],
      ['What is A/B testing and when would you use it?',['variant','hypothesis','sample','conversion','control','significance','test']],
      ['How do you respond to negative feedback about a brand online?',['listen','acknowledge','empathy','resolve','timely','escalate','learn']]
    ],
    Hard: [
      ['A campaign’s cost per acquisition doubled. How would you respond?',['segment','auction','creative fatigue','conversion','attribution','test','budget','diagnose']],
      ['How would you measure marketing impact across a long buying journey?',['attribution','touchpoint','incrementality','cohort','crm','pipeline','model']],
      ['How do you grow a brand in a crowded market?',['positioning','differentiation','insight','value proposition','consistency','experiment']],
      ['How would you handle a public brand crisis on social media?',['facts','response','stakeholder','transparency','empathy','monitor','escalate']],
      ['How would you decide whether to stop a campaign that has mixed results?',['objective','threshold','sample','trend','incrementality','opportunity cost','test']],
      ['Describe a marketing experiment that could unlock growth.',['hypothesis','segment','variant','metric','learning','scale','risk']]
    ]
  }
};
const genericBank = {
 Easy: [
  ['Tell me about yourself and what interests you about this role.',['experience','skill','interest','goal','learn','team']],
  ['What are your biggest strengths?',['example','strength','feedback','skill','result','improve']],
  ['Describe a challenge you faced and how you handled it.',['challenge','action','solution','result','learn','communicate']],
  ['How do you prioritize tasks when you have several deadlines?',['urgent','important','plan','deadline','communicate','prioritize']],
  ['Tell me about a time you worked as part of a team.',['team','collaborate','role','conflict','result','communication']],
  ['Why should we choose you for this position?',['skill','experience','value','learn','contribute','role']]
 ],
 Medium: [
  ['Tell me about a time you received difficult feedback.',['feedback','listen','action','improve','example','result']],
  ['How do you handle competing priorities from different stakeholders?',['align','deadline','impact','communicate','expectation','prioritize']],
  ['Describe a time you made a mistake at work or school.',['ownership','mistake','action','communicate','learn','prevent']],
  ['How would you approach an unfamiliar problem with little guidance?',['clarify','research','assumption','plan','feedback','iterate']],
  ['What does success in this role look like to you?',['goal','metric','impact','expectation','team','growth']],
  ['How do you stay calm under pressure?',['plan','prioritize','communicate','focus','support','solution']]
 ],
 Hard: [
  ['Describe a decision you made with incomplete information.',['assumption','risk','evidence','trade-off','decision','outcome','learn']],
  ['Tell me about a time you disagreed with a manager or teammate.',['respect','evidence','listen','communicate','resolution','outcome']],
  ['How would you respond if a key project was likely to miss its deadline?',['early','risk','scope','stakeholder','plan','trade-off','communicate']],
  ['How do you influence people when you do not have formal authority?',['trust','evidence','relationship','align','listen','outcome']],
  ['Describe a complex problem you broke into manageable steps.',['define','analyze','prioritize','plan','execute','measure','result']],
  ['What would your first 90 days in this role look like?',['learn','stakeholder','baseline','goal','plan','feedback','impact']]
 ]
};
let authMode='signin', currentUser=null, interview=null, timerInterval=null, recognition=null, recording=false, toastTimer=null;

function readUsers(){try{return JSON.parse(localStorage.getItem(STORAGE_USERS)||'{}')}catch{return {}}}
function writeUsers(users){localStorage.setItem(STORAGE_USERS,JSON.stringify(users))}
function getSessions(){try{return JSON.parse(localStorage.getItem(STORAGE_SESSIONS)||'{}')}catch{return {}}}
function userSessions(){return currentUser?(getSessions()[currentUser.email]||[]):[]}
function setUserSessions(list){const all=getSessions();all[currentUser.email]=list;localStorage.setItem(STORAGE_SESSIONS,JSON.stringify(all))}
function initials(name){return (name||'A').trim().split(/\s+/).slice(0,2).map(s=>s[0]||'').join('').toUpperCase()}
function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800)}
function setAuthMode(mode){authMode=mode;const signup=mode==='signup';$('#authTitle').textContent=signup?'Create your account':'Welcome back';$('#authSubtitle').textContent=signup?'Start your personal interview practice journey.':'Sign in to continue your progress.';$('#nameField').classList.toggle('hidden',!signup);$('#authName').required=signup;$('#authPassword').autocomplete=signup?'new-password':'current-password';$('#authSubmit').innerHTML=signup?'Create account <span>→</span>':'Sign in <span>→</span>';$('#switchPrompt').textContent=signup?'Already have an account?':'New to InterviewAce?';$('#switchAuth').textContent=signup?'Sign in':'Create an account'}
$('#switchAuth').addEventListener('click',()=>setAuthMode(authMode==='signin'?'signup':'signin'));
$('#togglePassword').addEventListener('click',()=>{const p=$('#authPassword');p.type=p.type==='password'?'text':'password';$('#togglePassword').textContent=p.type==='password'?'Show':'Hide'});
$('#authForm').addEventListener('submit',e=>{e.preventDefault();const email=$('#authEmail').value.trim().toLowerCase(),password=$('#authPassword').value;const users=readUsers();if(authMode==='signup'){const name=$('#authName').value.trim();if(name.length<2){toast('Please enter your name.');return}if(password.length<6){toast('Use at least 6 characters for the demo password.');return}if(users[email]){toast('An account with this email already exists. Sign in instead.');return}users[email]={name,password};writeUsers(users);currentUser={email,name};localStorage.setItem(STORAGE_CURRENT,email);showApp();toast('Welcome to InterviewAce!')}else{if(!users[email]||users[email].password!==password){toast('Email or password is incorrect. Check your details or create an account.');return}currentUser={email,name:users[email].name};localStorage.setItem(STORAGE_CURRENT,email);showApp();toast('Welcome back!')}});

function showApp(){if(!currentUser)return;$('#authScreen').classList.add('hidden');$('#app').classList.remove('hidden');$('#sideName').textContent=currentUser.name;$('#sideEmail').textContent=currentUser.email;$('#sideAvatar').textContent=initials(currentUser.name);$('#topAvatar').textContent=initials(currentUser.name);$('#welcomeName').textContent=currentUser.name.split(' ')[0];$('#profileName').textContent=currentUser.name;$('#profileEmail').textContent=currentUser.email;$('#profileAvatar').textContent=initials(currentUser.name);$('#profileNameInput').value=currentUser.name;$('#profileEmailInput').value=currentUser.email;$('#todayDate').textContent=new Intl.DateTimeFormat('en-IN',{weekday:'short',day:'numeric',month:'short'}).format(new Date());renderDashboard();showView('dashboard')}
function logout(){stopTimer();if(recognition){try{recognition.stop()}catch{}}currentUser=null;localStorage.removeItem(STORAGE_CURRENT);$('#app').classList.add('hidden');$('#authScreen').classList.remove('hidden');$('#authEmail').value='';$('#authPassword').value='';setAuthMode('signin')}
$('#logoutBtn').addEventListener('click',logout);
const titles={dashboard:'Dashboard',practice:'Practice interview',history:'Session history',profile:'My profile'};
function showView(name){if(name!=='practice'&&interview?.active){/* preserve draft session */}$$('.view').forEach(v=>v.classList.add('hidden'));$('#view-'+name).classList.remove('hidden');$$('.nav-item[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$('#topTitle').textContent=titles[name]||'Dashboard';$('#sidebar').classList.remove('open');if(name==='dashboard')renderDashboard();if(name==='history')renderHistory();if(name==='profile')renderProfile()}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.go)));
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
document.addEventListener('click',e=>{if(window.innerWidth<=850&&!$('#sidebar').contains(e.target)&&!$('#mobileMenu').contains(e.target))$('#sidebar').classList.remove('open')});
$$('.quick-role').forEach(b=>b.addEventListener('click',()=>{$('#roleSelect').value=b.dataset.role;showView('practice')}));
function scoreClass(score){return score>=75?'':score>=50?'mid':'low'}
function formatDate(d){return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
function sessionRows(list){if(!list.length)return '<div class="empty-table">No sessions yet. Start a practice interview to see your results here.</div>';return `<table class="session-table"><thead><tr><th>JOB ROLE</th><th>DATE</th><th>LEVEL</th><th>QUESTIONS</th><th>SCORE</th></tr></thead><tbody>${list.map(s=>`<tr><td class="role-cell">${escapeHTML(s.role)}</td><td>${formatDate(s.date)}</td><td>${escapeHTML(s.difficulty)}</td><td>${s.answered}/${s.total}</td><td><span class="score-pill ${scoreClass(s.score)}">${s.score}%</span></td></tr>`).join('')}</tbody></table>`}
function renderDashboard(){if(!currentUser)return;const list=userSessions().slice().sort((a,b)=>new Date(b.date)-new Date(a.date));const count=list.length,avg=count?Math.round(list.reduce((s,x)=>s+x.score,0)/count):null,best=count?Math.max(...list.map(x=>x.score)):null,mins=list.reduce((s,x)=>s+(x.minutes||0),0);$('#statSessions').textContent=count;$('#statScore').textContent=avg===null?'—':avg;$('#scoreSuffix').textContent=avg===null?'':'%';$('#statMinutes').innerHTML=`${mins}<small> min</small>`;$('#statBest').textContent=best===null?'—':best;$('#bestSuffix').textContent=best===null?'':'%';$('#recentSessions').innerHTML=sessionRows(list.slice(0,4));$('#profileSessions').textContent=count;$('#profileAvg').textContent=avg===null?'—':avg+'%';$('#profileBest').textContent=best===null?'—':best+'%';renderChart(list.slice(0,7).reverse())}
function renderChart(list){const el=$('#progressChart');if(!list.length){el.innerHTML='<div class="empty-chart"><span>↗</span><strong>Your progress starts here</strong><p>Complete a practice session to see your scores.</p></div>';return}const w=640,h=200,pad={l:34,r:16,t:18,b:28},cw=w-pad.l-pad.r,ch=h-pad.t-pad.b;const pts=list.map((s,i)=>({x:pad.l+(list.length===1?cw/2:i*cw/(list.length-1)),y:pad.t+(100-s.score)*ch/100,s}));const path=pts.map((p,i)=>(i?'L':'M')+p.x+','+p.y).join(' ');const area=path+` L${pts[pts.length-1].x},${pad.t+ch} L${pts[0].x},${pad.t+ch} Z`;const grid=[0,25,50,75,100].map(v=>{let y=pad.t+(100-v)*ch/100;return `<line x1="${pad.l}" y1="${y}" x2="${w-pad.r}" y2="${y}" stroke="#f0eff7" stroke-dasharray="3 4"/><text x="${pad.l-8}" y="${y+3}" font-size="9" fill="#a1a3b4" text-anchor="end">${v}</text>`}).join('');const dots=pts.map((p,i)=>`<circle cx="${p.x}" cy="${p.y}" r="4" fill="#796de8" stroke="white" stroke-width="2"><title>${p.s.score}% · ${escapeHTML(p.s.role)}</title></circle><text x="${p.x}" y="${h-7}" font-size="9" fill="#a1a3b4" text-anchor="middle">${i+1}</text>`).join('');el.innerHTML=`<svg class="chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${grid}<path d="${area}" fill="#796de8" opacity=".08"/><path d="${path}" fill="none" stroke="#796de8" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`}
function renderHistory(){const list=userSessions().slice().sort((a,b)=>new Date(b.date)-new Date(a.date));$('#historyTable').innerHTML=sessionRows(list);$('#clearHistory').disabled=!list.length}
$('#clearHistory').addEventListener('click',()=>{if(!userSessions().length)return;if(confirm('Clear all your session history? This cannot be undone.')){setUserSessions([]);renderHistory();renderDashboard();toast('Session history cleared.')}})
function renderProfile(){if(!currentUser)return;const list=userSessions();$('#profileName').textContent=currentUser.name;$('#profileEmail').textContent=currentUser.email;$('#profileAvatar').textContent=initials(currentUser.name);$('#profileNameInput').value=currentUser.name;$('#profileEmailInput').value=currentUser.email;$('#profileSessions').textContent=list.length;$('#profileAvg').textContent=list.length?Math.round(list.reduce((a,s)=>a+s.score,0)/list.length)+'%':'—';$('#profileBest').textContent=list.length?Math.max(...list.map(s=>s.score))+'%':'—'}
$('#profileForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#profileNameInput').value.trim();if(name.length<2){toast('Please enter a longer display name.');return}const users=readUsers();users[currentUser.email].name=name;writeUsers(users);currentUser.name=name;localStorage.setItem(STORAGE_CURRENT,currentUser.email);showApp();showView('profile');toast('Profile updated.')});

function getQuestionBank(role,difficulty){return (banks[role]||genericBank)[difficulty]||genericBank[difficulty]}
function beginInterview(){const role=$('#roleSelect').value,difficulty=$('#difficultySelect').value,total=Number($('#questionCount').value),seconds=Number($('#timerSelect').value);let pool=getQuestionBank(role,difficulty).map(q=>[...q]);if(pool.length<total){const other=genericBank[difficulty].map(q=>[...q]);pool=pool.concat(other.filter(q=>!pool.some(p=>p[0]===q[0])))}pool.sort(()=>Math.random()-.5);const questions=pool.slice(0,total).map(q=>({text:q[0],keywords:q[1],answer:'',feedback:null,elapsed:0}));interview={role,difficulty,total,seconds,questions,index:0,active:true,paused:false,remaining:seconds,startedAt:Date.now(),answered:0};$('#setupPanel').classList.add('hidden');$('#resultPanel').classList.add('hidden');$('#interviewPanel').classList.remove('hidden');renderQuestion();showView('practice');$('#interviewPanel').classList.remove('hidden');$('#setupPanel').classList.add('hidden');$('#resultPanel').classList.add('hidden');startTimer()}
$('#beginInterview').addEventListener('click',beginInterview);
function renderQuestion(){if(!interview)return;const q=interview.questions[interview.index];$('#questionCounter').textContent=`QUESTION ${String(interview.index+1).padStart(2,'0')} / ${String(interview.total).padStart(2,'0')}`;$('#questionDifficulty').textContent=interview.difficulty.toUpperCase();$('#questionDifficulty').className='difficulty-badge '+interview.difficulty.toLowerCase();$('#questionText').textContent=q.text;$('#questionHint').textContent=interview.difficulty==='Easy'?'Take your time. A clear, simple answer is a great start.':interview.difficulty==='Hard'?'Think out loud, explain trade-offs, and support your answer with examples.':'Structure your answer, explain your reasoning, and include a specific example.';$('#questionProgressBar').style.width=((interview.index+1)/interview.total*100)+'%';$('#answerInput').value=q.answer;$('#wordCount').textContent=wordCount(q.answer)+' words';$('#prevQuestion').disabled=interview.index===0;$('#nextQuestion').innerHTML=interview.index===interview.total-1?'Finish interview ✓':'Next question →';$('#answerFeedback').classList.toggle('hidden',!q.feedback);if(q.feedback)$('#answerFeedback').innerHTML=q.feedback;$('#questionDots').innerHTML=interview.questions.map((x,i)=>`<button class="question-dot ${i===interview.index?'current':''} ${x.answer.trim()?'done':''}" data-qindex="${i}" title="Question ${i+1}">${i+1}</button>`).join('');$$('.question-dot').forEach(b=>b.addEventListener('click',()=>{saveCurrentAnswer();interview.index=Number(b.dataset.qindex);resetTimerForQuestion();renderQuestion()}));$('#answeredCount').textContent=interview.questions.filter(x=>x.answer.trim()).length+' / '+interview.total;$('#sessionRole').textContent=interview.role;$('#sessionLevel').textContent=interview.difficulty;$('#saveIndicator').textContent='● Draft saves as you type'}
function wordCount(s){return (s.trim().match(/\S+/g)||[]).length}
$('#answerInput').addEventListener('input',()=>{if(!interview)return;const q=interview.questions[interview.index];q.answer=$('#answerInput').value;$('#wordCount').textContent=wordCount(q.answer)+' words';$('#answeredCount').textContent=interview.questions.filter(x=>x.answer.trim()).length+' / '+interview.total;$('#saveIndicator').textContent='✓ Draft saved';$('#answerFeedback').classList.add('hidden');renderDotsOnly()});
function renderDotsOnly(){if(!interview)return;$$('.question-dot').forEach((b,i)=>b.classList.toggle('done',!!interview.questions[i].answer.trim()))}
function saveCurrentAnswer(){if(interview)interview.questions[interview.index].answer=$('#answerInput').value}
$('#clearAnswer').addEventListener('click',()=>{if(!interview)return;$('#answerInput').value='';interview.questions[interview.index].answer='';$('#wordCount').textContent='0 words';$('#answerFeedback').classList.add('hidden');renderDotsOnly();$('#answeredCount').textContent=interview.questions.filter(x=>x.answer.trim()).length+' / '+interview.total});
$('#prevQuestion').addEventListener('click',()=>{if(!interview||interview.index===0)return;saveCurrentAnswer();interview.index--;resetTimerForQuestion();renderQuestion()});
$('#nextQuestion').addEventListener('click',()=>{if(!interview)return;saveCurrentAnswer();if(interview.index===interview.total-1){finishInterview();return}interview.index++;resetTimerForQuestion();renderQuestion()});
function scoreAnswer(q){const answer=q.answer.toLowerCase();const words=wordCount(answer);const matched=q.keywords.filter(k=>answer.includes(k.toLowerCase()));let score=0;if(words>=8)score+=20;else if(words>=3)score+=12;else if(words>0)score+=5;score+=Math.round(matched.length/q.keywords.length*65);if(words>=35)score+=10;else if(words>=18)score+=6;score=Math.min(100,score);let message=words===0?'No answer was provided. Try giving a direct answer and supporting it with an example.':words<8?'Your answer is a useful start, but it is very brief. Add context, what you did, and the outcome.':matched.length<2?'You have a starting point. Add role-specific concepts and a concrete example to make the answer stronger.':words<25?'Good start. Add a little more detail and explain the impact of your approach.':'Nice effort. Your answer has some relevant detail; make the key point and outcome even clearer.';return {score,matched,missing:q.keywords.filter(k=>!matched.includes(k)).slice(0,4),message,words}}
function finishInterview(){if(!interview)return;saveCurrentAnswer();stopTimer();if(recognition){try{recognition.stop()}catch{}recording=false;$('#recordBtn').innerHTML='🎙 Record answer'}const results=interview.questions.map(q=>({...q,...scoreAnswer(q)}));const answered=results.filter(q=>q.answer.trim()).length;const score=results.length?Math.round(results.reduce((a,q)=>a+q.score,0)/results.length):0;const duration=Math.max(1,Math.round((Date.now()-interview.startedAt)/60000));const session={id:Date.now(),role:interview.role,difficulty:interview.difficulty,total:interview.total,answered,score,minutes:duration,date:new Date().toISOString(),results};const list=userSessions();list.push(session);setUserSessions(list);interview.active=false;$('#interviewPanel').classList.add('hidden');$('#setupPanel').classList.add('hidden');$('#resultPanel').classList.remove('hidden');renderResult(session);renderDashboard();toast('Interview complete — your report is ready.')}
function renderResult(s){const label=s.score>=80?'Excellent work!':s.score>=60?'Good progress!':s.score>=35?'Keep building momentum':'Every expert starts somewhere';$('#resultPanel').innerHTML=`<div class="result-hero"><div class="result-check">✓</div><p class="eyebrow">SESSION COMPLETE</p><h2>${label}</h2><p>You completed a ${escapeHTML(s.difficulty.toLowerCase())} ${escapeHTML(s.role)} practice session.</p><div class="result-score">${s.score}<small> / 100</small></div><p>${s.answered} of ${s.total} questions answered · ${s.minutes} min invested</p></div><div class="result-summary"><div><strong>${s.answered}/${s.total}</strong><span>Questions answered</span></div><div><strong>${s.results.filter(q=>q.score>=60).length}</strong><span>Strong answers</span></div><div><strong>${Math.round(s.results.reduce((a,q)=>a+q.words,0)/s.total)}</strong><span>Avg. words per answer</span></div></div><h3>Answer-by-answer feedback</h3><p class="muted" style="font-size:11px">Scores are based on answer length and keyword coverage. Use this as a practice guide, not a hiring prediction.</p><div class="feedback-list">${s.results.map((q,i)=>`<div class="feedback-item"><h4>${i+1}. ${escapeHTML(q.text)} <span class="score-pill ${scoreClass(q.score)}" style="float:right">${q.score}/100</span></h4><p>${escapeHTML(q.message)}</p><div class="feedback-tags">${q.matched.length?q.matched.slice(0,5).map(k=>`<span>✓ ${escapeHTML(k)}</span>`).join(''):'<span class="missing">Add relevant details</span>'}${q.missing.slice(0,3).map(k=>`<span class="missing">Consider: ${escapeHTML(k)}</span>`).join('')}</div></div>`).join('')}</div><div class="result-actions"><button class="btn btn-primary" id="againBtn">Practice again →</button><button class="btn btn-soft" id="resultDashboardBtn">Back to dashboard</button><button class="btn btn-outline" id="downloadReportBtn">Download report ↓</button></div>`;$('#againBtn').addEventListener('click',resetPractice);$('#resultDashboardBtn').addEventListener('click',()=>showView('dashboard'));$('#downloadReportBtn').addEventListener('click',()=>downloadReport(s))}
function resetPractice(){interview=null;stopTimer();$('#resultPanel').classList.add('hidden');$('#interviewPanel').classList.add('hidden');$('#setupPanel').classList.remove('hidden');showView('practice')}
$('#quitInterview').addEventListener('click',()=>{if(!interview)return;if(confirm('End this session now? Your answers will be scored and saved.'))finishInterview()});
function startTimer(){stopTimer();if(!interview)return;interview.paused=false;$('#pauseTimer').textContent='Ⅱ Pause timer';$('#timerRing').classList.remove('paused');updateTimerDisplay();timerInterval=setInterval(()=>{if(!interview||interview.paused)return;interview.remaining--;updateTimerDisplay();if(interview.remaining<=0){stopTimer();toast('Time is up for this question. You can continue when ready.');interview.paused=true;$('#pauseTimer').textContent='▶ Resume timer';$('#timerRing').classList.add('paused')}},1000)}
function stopTimer(){if(timerInterval){clearInterval(timerInterval);timerInterval=null}}
function updateTimerDisplay(){if(!interview)return;const s=Math.max(0,interview.remaining),m=Math.floor(s/60),sec=s%60;$('#timerDisplay').textContent=String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');const deg=360*s/interview.seconds;$('#timerRing').style.background=`conic-gradient(${s<=10?'#e47d85':'#796de8'} ${deg}deg,#eae8fa ${deg}deg)`;$('#timerRing').classList.toggle('paused',interview.paused)}
$('#pauseTimer').addEventListener('click',()=>{if(!interview)return;interview.paused=!interview.paused;$('#pauseTimer').textContent=interview.paused?'▶ Resume timer':'Ⅱ Pause timer';$('#timerRing').classList.toggle('paused',interview.paused)});
$('#resetTimer').addEventListener('click',()=>{if(!interview)return;interview.remaining=interview.seconds;interview.paused=false;$('#pauseTimer').textContent='Ⅱ Pause timer';$('#timerRing').classList.remove('paused');updateTimerDisplay()});
function resetTimerForQuestion(){if(!interview)return;interview.remaining=interview.seconds;interview.paused=false;$('#pauseTimer').textContent='Ⅱ Pause timer';$('#timerRing').classList.remove('paused');updateTimerDisplay()}
function downloadReport(s){const lines=['INTERVIEWACE — PRACTICE REPORT','',`Role: ${s.role}`,`Difficulty: ${s.difficulty}`,`Date: ${formatDate(s.date)}`,`Overall score: ${s.score}/100`,`Answered: ${s.answered}/${s.total}`,'','ANSWER FEEDBACK',...s.results.flatMap((q,i)=>['',`${i+1}. ${q.text}`,`Score: ${q.score}/100`,`Your answer: ${q.answer||'(No answer)'}`,`Feedback: ${q.message}`,`Matched keywords: ${q.matched.join(', ')||'None'}`,`Consider adding: ${q.missing.join(', ')||'—'}`])];const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='interviewace-report.txt';a.click();URL.revokeObjectURL(a.href)}
$('#recordBtn').addEventListener('click',()=>{const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SpeechRecognition){toast('Voice typing is not supported in this browser. Try Chrome or type your answer.');$('#recordStatus').textContent='Voice input is not supported in this browser.';return}if(recording){try{recognition.stop()}catch{}recording=false;$('#recordBtn').innerHTML='🎙 Record answer';$('#recordStatus').textContent='Voice input stopped.';return}recognition=new SpeechRecognition();recognition.lang='en-IN';recognition.continuous=true;recognition.interimResults=true;recognition.onresult=e=>{let finalText='';for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)finalText+=e.results[i][0].transcript+' '}if(finalText){const input=$('#answerInput');input.value=(input.value.trim()?(input.value.trim()+' '):'')+finalText;input.dispatchEvent(new Event('input'))}};recognition.onerror=e=>{recording=false;$('#recordBtn').innerHTML='🎙 Record answer';$('#recordStatus').textContent=e.error==='not-allowed'?'Microphone permission was denied.':'Voice input stopped: '+e.error};recognition.onend=()=>{if(recording){recording=false;$('#recordBtn').innerHTML='🎙 Record answer'}};try{recognition.start();recording=true;$('#recordBtn').innerHTML='■ Stop recording';$('#recordStatus').textContent='Listening… speak clearly. Allow microphone access if asked.'}catch{toast('Could not start voice input. Please try again.')}});
window.addEventListener('beforeunload',()=>{stopTimer();if(recognition){try{recognition.stop()}catch{}}});

// Accessibility: text size can be adjusted and is remembered in this browser.
function applyFontScale(scale){
  const clamped=Math.max(0.9,Math.min(1.25,scale));
  document.documentElement.style.fontSize=(16*clamped)+'px';
  localStorage.setItem('interviewAceFontScale',String(clamped));
  $('#fontDown').disabled=clamped<=0.9;$('#fontUp').disabled=clamped>=1.25;
}
$('#fontDown').addEventListener('click',()=>applyFontScale(Number(localStorage.getItem('interviewAceFontScale')||1)-0.05));
$('#fontUp').addEventListener('click',()=>applyFontScale(Number(localStorage.getItem('interviewAceFontScale')||1)+0.05));
applyFontScale(Number(localStorage.getItem('interviewAceFontScale')||1));
function applyTheme(dark){
  document.body.classList.toggle('dark-theme',dark);$('#themeToggle').textContent=dark?'☀':'☾';
  $('#themeToggle').title=dark?'Switch to light theme':'Switch to dark theme';
  localStorage.setItem('interviewAceDarkTheme',dark?'1':'0');
}
$('#themeToggle').addEventListener('click',()=>applyTheme(!document.body.classList.contains('dark-theme')));
applyTheme(localStorage.getItem('interviewAceDarkTheme')==='1');

function getSavedQuestions(){try{return JSON.parse(localStorage.getItem('interviewAceSavedQuestions_'+(currentUser?.email||''))||'[]')}catch{return []}}
function setSavedQuestions(items){if(currentUser)localStorage.setItem('interviewAceSavedQuestions_'+currentUser.email,JSON.stringify(items))}
function updateBookmarkButton(){
  if(!interview)return;
  const q=interview.questions[interview.index],saved=getSavedQuestions().some(item=>item.text===q.text&&item.role===interview.role);
  $('#bookmarkQuestion').classList.toggle('saved',saved);$('#bookmarkQuestion').innerHTML=saved?'★ Saved':'☆ Save question';
}
$('#bookmarkQuestion').addEventListener('click',()=>{
  if(!interview)return;
  const q=interview.questions[interview.index],items=getSavedQuestions(),idx=items.findIndex(item=>item.text===q.text&&item.role===interview.role);
  if(idx>=0){items.splice(idx,1);setSavedQuestions(items);toast('Removed from saved questions.')}
  else{items.unshift({text:q.text,role:interview.role,difficulty:interview.difficulty,date:new Date().toISOString()});setSavedQuestions(items);toast('Question saved to your profile.')}
  updateBookmarkButton();
});
function renderSavedQuestions(){
  const items=getSavedQuestions(),count=$('#savedQuestionCount'),list=$('#savedQuestionsList');
  if(!count||!list)return;count.textContent=items.length;
  if(!items.length){list.innerHTML='<p class="empty-saved">No saved questions yet. Bookmark a question during practice.</p>';return}
  list.innerHTML=items.map((item,i)=>`<div class="saved-question"><span class="saved-star">★</span><p><strong>${escapeHTML(item.role)}</strong> · ${escapeHTML(item.difficulty)}<br>${escapeHTML(item.text)}</p><button data-remove-saved="${i}">Remove</button></div>`).join('');
  $$('[data-remove-saved]').forEach(btn=>btn.addEventListener('click',()=>{const all=getSavedQuestions();all.splice(Number(btn.dataset.removeSaved),1);setSavedQuestions(all);renderSavedQuestions();toast('Saved question removed.')}));
}
const originalRenderProfile=renderProfile;
renderProfile=function(){originalRenderProfile();renderSavedQuestions()};
const originalRenderQuestion=renderQuestion;
renderQuestion=function(){originalRenderQuestion();updateBookmarkButton()};

$('#exportHistory').addEventListener('click',()=>{
  const sessions=userSessions().slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(!sessions.length){toast('There is no history to export yet.');return}
  const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  const rows=[['Date','Role','Difficulty','Answered','Total Questions','Score','Minutes'],...sessions.map(s=>[formatDate(s.date),s.role,s.difficulty,s.answered,s.total,s.score,s.minutes])];
  const blob=new Blob([rows.map(row=>row.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='interviewace-session-history.csv';a.click();URL.revokeObjectURL(a.href);
  toast('Your session history CSV is ready.');
});

(function init(){const email=localStorage.getItem(STORAGE_CURRENT),users=readUsers();if(email&&users[email]){currentUser={email,name:users[email].name};showApp()}else{setAuthMode('signin')}})();
