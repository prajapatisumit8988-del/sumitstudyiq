document.addEventListener('DOMContentLoaded', () => {

    // ------------------- SEARCH -------------------
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('.book-item, .note-item, .current-item, .newspaper-item, .ncert-subject, .videos .item');
        items.forEach(item => {
            const title = item.getAttribute('data-title') || item.querySelector('h3')?.textContent || "";
            item.style.display = title.toLowerCase().includes(filter) ? '' : 'none';
        });
    });

    // ------------------- DARK MODE -------------------
    const darkModeBtn = document.getElementById('darkModeToggle');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // ------------------- TABS -------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.section');
    tabBtns.forEach(btn => btn.addEventListener('click', () => {
        tabBtns.forEach(b=>b.classList.remove('active'));
        sections.forEach(s=>s.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.section).classList.add('active');
    }));

    // ------------------- NCERT SUB-TABS -------------------
    const ncertButtons = document.querySelectorAll('.ncert-btn');
    const ncertSubjects = document.querySelectorAll('.ncert-subject');
    ncertButtons.forEach(btn => btn.addEventListener('click', () => {
        const subject = btn.dataset.subject;
        ncertButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        ncertSubjects.forEach(s=>s.style.display=s.classList.contains(subject)?'block':'none');
    }));

    // ------------------- QUIZ FUNCTIONALITY -------------------
    const quizData = {
        math: {
            1:[{q:"2+2=?", options:["3","4","5"], answer:1},{q:"5*3=?", options:["15","20","10"], answer:0}],
            2:[{q:"7-2=?", options:["5","6","4"], answer:0}]
        },
        history:{
            1:[{q:"Who was first President of India?", options:["Rajendra Prasad","Nehru","Gandhi"], answer:0}]
        },
        science:{
            1:[{q:"Water formula?", options:["H2O","CO2","O2"], answer:0}]
        }
    };

    let currentSubject='math', currentDay='1', currentQIndex=0;
    const quizBtns = document.querySelectorAll('.quiz-btn');
    const quizDaySelect = document.getElementById('quiz-day');
    const quizQuestionDiv = document.getElementById('quiz-question');
    const quizOptionsDiv = document.getElementById('quiz-options');
    const timerSpan = document.getElementById('timer');
    const skipBtn = document.getElementById('skip-btn');

    let quizTimer, timeLeft=30;

    function loadQuiz(){
        const questions = quizData[currentSubject][currentDay] || [];
        if(questions.length===0){
            quizQuestionDiv.innerHTML="No questions for this day";
            quizOptionsDiv.innerHTML="";
            return;
        }
        if(currentQIndex>=questions.length) currentQIndex=0;
        quizQuestionDiv.innerHTML=questions[currentQIndex].q;
        quizOptionsDiv.innerHTML='';
        questions[currentQIndex].options.forEach((opt,i)=>{
            const btn=document.createElement('button');
            btn.textContent=opt;
            btn.addEventListener('click', ()=>{
                nextQuestion();
            });
            quizOptionsDiv.appendChild(btn);
        });
        resetTimer();
    }

    function resetTimer(){
        clearInterval(quizTimer);
        timeLeft=30;
        timerSpan.textContent=timeLeft;
        quizTimer=setInterval(()=>{
            timeLeft--;
            timerSpan.textContent=timeLeft;
            if(timeLeft<=0) nextQuestion();
        },1000);
    }

    function nextQuestion(){
        clearInterval(quizTimer);
        currentQIndex++;
        loadQuiz();
    }

    quizBtns.forEach(btn=>btn.addEventListener('click', ()=>{
        quizBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentSubject=btn.dataset.subject;
        currentQIndex=0;
        loadQuiz();
    }));

    quizDaySelect.addEventListener('change', ()=>{
        currentDay=quizDaySelect.value;
        currentQIndex=0;
        loadQuiz();
    });

    skipBtn.addEventListener('click', nextQuestion);

    // initial load
    quizBtns[0].click();

});
// ------------------- QUIZ FUNCTIONALITY -------------------
const quizData = {
    math: {
        "2025-10-09":[
            {q:"2+2=?", options:["3","4","5"], answer:1},
            {q:"5*3=?", options:["15","20","10"], answer:0}
        ],
        "2025-10-10":[
            {q:"7-3=?", options:["5","4","3"], answer:1}
        ]
    },
    history:{
        "2025-10-09":[
            {q:"First President of India?", options:["Rajendra Prasad","Nehru","Gandhi"], answer:0}
        ]
    },
    science:{
        "2025-10-09":[
            {q:"Water formula?", options:["H2O","CO2","O2"], answer:0}
        ]
    }
};

let currentSubject='math', currentDate=new Date().toISOString().split('T')[0], currentQIndex=0;

const quizBtns = document.querySelectorAll('.quiz-btn');
const quizDateInput = document.getElementById('quiz-day');
const quizQuestionDiv = document.getElementById('quiz-question');
const quizOptionsDiv = document.getElementById('quiz-options');
const timerSpan = document.getElementById('quiz-timer');
const skipBtn = document.getElementById('skip-btn');

quizDateInput.value = currentDate; // default today

let quizTimer, timeLeft=30;

function loadQuiz(){
    const questions = quizData[currentSubject][currentDate] || [];
    if(questions.length===0){
        quizQuestionDiv.innerHTML="No questions for this date.";
        quizOptionsDiv.innerHTML="";
        return;
    }
    if(currentQIndex>=questions.length) currentQIndex=0;
    quizQuestionDiv.innerHTML=questions[currentQIndex].q;
    quizOptionsDiv.innerHTML='';
    questions[currentQIndex].options.forEach((opt,i)=>{
        const btn=document.createElement('button');
        btn.textContent=opt;
        btn.addEventListener('click', ()=>{
            nextQuestion();
        });
        quizOptionsDiv.appendChild(btn);
    });
    resetTimer();
}

function resetTimer(){
    clearInterval(quizTimer);
    timeLeft=30;
    timerSpan.textContent=timeLeft;
    quizTimer=setInterval(()=>{
        timeLeft--;
        timerSpan.textContent=timeLeft;
        if(timeLeft<=0) nextQuestion();
    },1000);
}

function nextQuestion(){
    clearInterval(quizTimer);
    currentQIndex++;
    loadQuiz();
}

quizBtns.forEach(btn=>btn.addEventListener('click', ()=>{
    quizBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentSubject=btn.dataset.subject;
    currentQIndex=0;
    loadQuiz();
}));

quizDateInput.addEventListener('change', ()=>{
    currentDate = quizDateInput.value;
    currentQIndex=0;
    loadQuiz();
});

skipBtn.addEventListener('click', nextQuestion);

// initial load
quizBtns[0].click();
