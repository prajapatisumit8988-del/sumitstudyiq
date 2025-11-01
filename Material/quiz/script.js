const categoryBtns = document.querySelectorAll(".quiz-btn");
const homeSection = document.getElementById("homeSection");
const dayList = document.getElementById("dayList");
const quizContainer = document.getElementById("quizContainer");
const darkToggle = document.getElementById("darkModeToggle");
const homeBtn = document.getElementById("homeBtn");

// 🌙 Dark Mode
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// 🎯 Category selection
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    homeSection.style.display = "none";
    homeBtn.classList.add("show");
    showDayList(category);
  });
});

// 🏠 Home Button
homeBtn.addEventListener("click", () => {
  clearInterval(timer);
  quizContainer.innerHTML = "";
  dayList.innerHTML = "";
  homeBtn.classList.remove("show");
  homeSection.style.display = "flex";
});

function showDayList(category) {
  dayList.innerHTML = "";
  quizContainer.innerHTML = "";
  const days = ["01_Nov_2025", "02_Nov_2025", "03_Nov_2025"];

  days.forEach(day => {
    const btn = document.createElement("button");
    btn.textContent = day.replace(/_/g, " ");
    btn.onclick = () => loadQuiz(category, day);
    dayList.appendChild(btn);
  });
}

let quizData = [];
let index = 0;
let score = 0;
let timer;
let timeLeft = 60;

// Load Quiz
async function loadQuiz(category, day) {
  quizContainer.innerHTML = "<p>Loading...</p>";
  const res = await fetch(`assets/${category}/${day}.json`);
  quizData = await res.json();
  index = 0;
  score = 0;
  timeLeft = 60;
  startTimer();
  showQuestion();
}

// Timer
function startTimer() {
  clearInterval(timer);
  const timerEl = document.createElement("div");
  timerEl.id = "timer";
  quizContainer.prepend(timerEl);
  timer = setInterval(() => {
    timerEl.textContent = `⏱ Time Left: ${timeLeft}s`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

// Show Question
function showQuestion() {
  const q = quizData[index];
  quizContainer.innerHTML = `
    <div id="timer">⏱ Time Left: ${timeLeft}s</div>
    <h3>Q${index + 1}. ${q.question}</h3>
    ${q.options.map(opt => `<div class='option' onclick='checkAnswer("${opt}")'>${opt}</div>`).join("")}
    <button id="skipBtn">⏭ Skip</button>
  `;
  document.getElementById("skipBtn").onclick = skipQuestion;
}

// Check Answer
function checkAnswer(selected) {
  if (selected === quizData[index].answer) score++;
  nextQuestion();
}

// Skip
function skipQuestion() {
  nextQuestion();
}

// Next Question
function nextQuestion() {
  index++;
  if (index < quizData.length) showQuestion();
  else {
    clearInterval(timer);
    showResult();
  }
}

// Result
function showResult() {
  quizContainer.innerHTML = `
    <h2>🎯 Quiz Completed!</h2>
    <p>Your Score: <strong>${score}/${quizData.length}</strong></p>
    <button onclick="location.reload()">🏠 Go Home</button>
  `;
}
