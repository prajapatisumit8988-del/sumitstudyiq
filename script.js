// PRELOADER
function handlePageLoadAnimation() {
  const preloader = document.getElementById("preloader");
  const mainWrapper = document.getElementById("main-wrapper");
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    mainWrapper.style.opacity = "1";
  }, 700);
}

// DARK MODE
function initializeDarkMode() {
  const btn = document.getElementById("darkModeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.classList.add("dark-mode");
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", mode);
  });
}

// SEARCH
function initializeSearchLogic() {
  const input = document.getElementById("searchInput");
  input?.addEventListener("keyup", () => {
    const val = input.value.toLowerCase();
    document.querySelectorAll(".section").forEach(sec => {
      const cards = sec.querySelectorAll(".card");
      let visible = 0;
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const match = text.includes(val);
        card.style.display = match ? "" : "none";
        if (match) visible++;
      });
      sec.style.display = val && !visible ? "none" : "";
    });
  });
}

// QUIZ SYSTEM
async function loadQuizData(subject) {
  const response = await fetch(`../assets/${subject}.json`);
  const data = await response.json();
  return data;
}

async function startSelectedQuiz(subject) {
  const quiz = await loadQuizData(subject);
  startQuiz(quiz);
}

function startQuiz(quizData) {
  let index = 0, score = 0;
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const scoreEl = document.getElementById("score");

  function showQuestion() {
    const q = quizData[index];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option, q.answer);
      optionsEl.appendChild(btn);
    });
    nextBtn.style.display = "none";
  }

  function checkAnswer(selected, correct) {
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) btn.style.background = "#16a34a";
      else if (btn.textContent === selected) btn.style.background = "#dc2626";
    });
    if (selected === correct) score++;
    nextBtn.style.display = "block";
  }

  nextBtn.onclick = () => {
    index++;
    if (index < quizData.length) showQuestion();
    else showScore();
  };

  function showScore() {
    questionEl.textContent = "✅ Quiz Completed!";
    optionsEl.innerHTML = "";
    scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
    nextBtn.style.display = "none";
  }

  showQuestion();
}

// INIT
window.addEventListener("load", handlePageLoadAnimation);
document.addEventListener("DOMContentLoaded", () => {
  initializeDarkMode();
  initializeSearchLogic();
});
let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;

const quizBox = document.getElementById("quizContainer");
const title = document.getElementById("quizTitle");

document.getElementById("upscQuizBtn").addEventListener("click", () => loadQuiz("../assets/quiz_upsc.json", "UPSC Quiz"));
document.getElementById("sscQuizBtn").addEventListener("click", () => loadQuiz("../assets/quiz_ssc.json", "SSC Quiz"));
document.getElementById("railwayQuizBtn").addEventListener("click", () => loadQuiz("../assets/quiz_railway.json", "Railway Quiz"));

async function loadQuiz(file, name) {
  title.innerText = `📘 ${name}`;
  quizBox.innerHTML = "<p>Loading quiz...</p>";

  const response = await fetch(file);
  const data = await response.json();
  currentQuiz = data;
  currentIndex = 0;
  score = 0;
  timeLeft = 60;
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timer);
  const timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  quizBox.prepend(timerDiv);
  timer = setInterval(() => {
    timerDiv.innerText = `⏱ Time Left: ${timeLeft}s`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function showQuestion() {
  const q = currentQuiz[currentIndex];
  quizBox.innerHTML = `
    <div id="timer">⏱ Time Left: ${timeLeft}s</div>
    <h3>Q${currentIndex + 1}. ${q.question}</h3>
    ${q.options.map((opt, i) => `<div class='option' onclick='checkAnswer("${opt}")'>${opt}</div>`).join("")}
  `;
}

function checkAnswer(selected) {
  if (selected === currentQuiz[currentIndex].answer) score++;
  currentIndex++;
  if (currentIndex < currentQuiz.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
}

function showResult() {
  quizBox.innerHTML = `
    <h2>🎯 Quiz Completed!</h2>
    <p>Your Score: <strong>${score}/${currentQuiz.length}</strong></p>
    <button onclick="location.reload()">Try Another Quiz</button>
  `;
}
