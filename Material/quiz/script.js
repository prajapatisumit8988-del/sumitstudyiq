const categoryBtns = document.querySelectorAll(".quiz-btn");
const homeSection = document.getElementById("homeSection");
const dayList = document.getElementById("dayList");
const quizContainer = document.getElementById("quizContainer");
const darkToggle = document.getElementById("darkModeToggle");
const backBtn = document.getElementById("backBtn");

let quizData = [];
let index = 0;
let score = 0;
let timer;
let timeLeft = 60;

// 🌙 Dark Mode
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

// 🎯 Category selection
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    homeSection.style.display = "none";
    backBtn.classList.add("show");
    showDayList(category);
  });
});

// ↩ Back to Quiz Home
backBtn.addEventListener("click", () => {
  clearInterval(timer);
  quizContainer.innerHTML = "";
  dayList.innerHTML = "";
  backBtn.classList.remove("show");
  homeSection.style.display = "flex";
});

// 📅 Show available days
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

// 📥 Load quiz JSON
async function loadQuiz(category, day) {
  quizContainer.innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch(`assets/${category}/${day}.json`);
    quizData = await res.json();
  } catch (err) {
    quizContainer.innerHTML = "<p>❌ Quiz not found!</p>";
    return;
  }

  index = 0;
  score = 0;
  timeLeft = 60;

  dayList.style.display = "none";
  startTimer();
  showQuestion();
}

// ⏰ Timer (runs only once per quiz)
function startTimer() {
  clearInterval(timer);
  const timerEl = document.createElement("div");
  timerEl.id = "timer";
  quizContainer.before(timerEl);

  timerEl.textContent = `⏱ Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱ Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

// 🧠 Show one question
function showQuestion() {
  const q = quizData[index];
  quizContainer.innerHTML = `
    <h3>Q${index + 1}. ${q.question}</h3>
    ${q.options
      .map(
        opt =>
          `<div class='option' onclick='checkAnswer("${opt}")'>${opt}</div>`
      )
      .join("")}
    <button id="skipBtn">⏭ Skip</button>
  `;
  document.getElementById("skipBtn").onclick = skipQuestion;
}

// ✅ Check Answer
function checkAnswer(selected) {
  const correct = quizData[index].answer;
  const options = document.querySelectorAll(".option");

  options.forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correct) opt.style.background = "#00c896";
    else if (opt.textContent === selected) opt.style.background = "#ff4d4d";
  });

  if (selected === correct) score++;

  setTimeout(() => {
    nextQuestion();
  }, 800);
}

// ⏭ Skip Question
function skipQuestion() {
  nextQuestion();
}

// ➡ Next Question
function nextQuestion() {
  index++;
  if (index < quizData.length) showQuestion();
  else {
    clearInterval(timer);
    showResult();
  }
}

// 🏁 Show Result
function showResult() {
  quizContainer.innerHTML = `
    <h2>🎯 Quiz Completed!</h2>
    <p>Your Score: <strong>${score}/${quizData.length}</strong></p>
    <button onclick="location.reload()">🏠 Back to Start</button>
  `;
}
