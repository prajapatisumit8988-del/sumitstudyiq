document.addEventListener("DOMContentLoaded", () => {
  /* 🌙 DARK MODE TOGGLE */
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  /* 🔍 FILTER BUTTONS */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".topic.card");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filterType = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display =
          filterType === "all" || card.dataset.type === filterType ? "block" : "none";
      });
    });
  });

  /* 📚 ACCORDION SYLLABUS */
  const accHeaders = document.querySelectorAll(".acc-header");
  accHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      body.style.display = body.style.display === "block" ? "none" : "block";
    });
  });

  /* 🧠 QUIZ FUNCTIONALITY */
  const quizModal = document.getElementById("quizModal");
  const startQuiz = document.getElementById("startQuiz");
  const quizClose = document.getElementById("quizClose");
  const questionBox = document.getElementById("questionBox");
  const optionsBox = document.getElementById("optionsBox");
  const quizResult = document.getElementById("quizResult");
  const scoreBox = document.getElementById("score");
  const restartBtn = document.getElementById("restartBtn");

  let quizData = [];
  let currentIndex = 0;
  let score = 0;

  // 📦 Load quiz data
  async function loadQuizData() {
    try {
      const res = await fetch("../../assets/quiz_upsc.json");
      if (!res.ok) throw new Error("File not found");
      quizData = await res.json();
    } catch {
      alert("⚠️ 'quiz_upsc.json' not found in assets folder!");
      quizData = [];
    }
  }

  // 📋 Show Question
  function showQuestion() {
    if (quizData.length === 0) return;
    if (currentIndex >= quizData.length) return endQuiz();

    const q = quizData[currentIndex];
    questionBox.innerHTML = `<h3>Q${currentIndex + 1}. ${q.question}</h3>`;
    optionsBox.innerHTML = "";

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "btn small";
      btn.textContent = option;
      btn.onclick = () => {
        if (option === q.answer) score++;
        currentIndex++;
        showQuestion();
      };
      optionsBox.appendChild(btn);
    });
  }

  // ✅ End Quiz
  function endQuiz() {
    questionBox.innerHTML = "";
    optionsBox.innerHTML = "";
    quizResult.style.display = "block";
    scoreBox.textContent = `${score} / ${quizData.length}`;
  }

  // 🔁 Restart
  restartBtn?.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    quizResult.style.display = "none";
    showQuestion();
  });

  // ▶️ Start Quiz
  startQuiz?.addEventListener("click", async () => {
    await loadQuizData();
    if (quizData.length > 0) {
      quizModal.classList.remove("hidden");
      currentIndex = 0;
      score = 0;
      showQuestion();
    }
  });

  // ❌ Close Modal
  quizClose?.addEventListener("click", () => {
    quizModal.classList.add("hidden");
    currentIndex = 0;
    score = 0;
  });
});
