document.addEventListener("DOMContentLoaded", () => {

  // 🌙 DARK MODE
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // 🔍 FILTER BUTTONS
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".topic.card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filterType = btn.dataset.filter;

      cards.forEach(card => {
        card.style.display = (filterType === "all" || card.dataset.type === filterType) ? "block" : "none";
      });
    });
  });

 

  async function loadQuizData() {
    try {
      const res = await fetch("../../assets/quiz_upsc.json");
      quizData = await res.json();
    } catch (error) {
      alert("Quiz file not found! Make sure 'quiz_upsc.json' is inside assets folder.");
    }
  }

  function showQuestion() {
    if (currentIndex >= quizData.length) {
      quizResult.style.display = "block";
      questionBox.innerHTML = "";
      optionsBox.innerHTML = "";
      scoreBox.textContent = `${score} / ${quizData.length}`;
      return;
    }

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

  startQuiz.addEventListener("click", async () => {
    await loadQuizData();
    if (quizData.length === 0) return;
    quizModal.classList.remove("hidden");
    showQuestion();
  });

  quizClose.addEventListener("click", () => {
    quizModal.classList.add("hidden");
    currentIndex = 0;
    score = 0;
    quizResult.style.display = "none";
  });

  restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    quizResult.style.display = "none";
    showQuestion();
  });

});
document.addEventListener("DOMContentLoaded", () => {

  // 🧠 QUIZ FUNCTIONALITY
  const quizModal = document.getElementById("quizModal");
  const startQuiz = document.getElementById("startQuiz");
  const quizClose = document.getElementById("quizClose");
  const questionBox = document.getElementById("questionBox");
  const optionsBox = document.getElementById("optionsBox");
  const nextBtn = document.getElementById("nextBtn");
  const skipBtn = document.getElementById("skipBtn");
  const quizResult = document.getElementById("quizResult");
  const scoreBox = document.getElementById("score");
  const restartBtn = document.getElementById("restartBtn");

  let quizData = [];
  let currentIndex = 0;
  let score = 0;

  // 📂 Load quiz data
  async function loadQuizData() {
    try {
      const res = await fetch("../../assets/quiz_upsc.json");
      if (!res.ok) throw new Error("Quiz file not found");
      quizData = await res.json();
    } catch (error) {
      alert("⚠️ UPSC Quiz file not found!\nMake sure 'quiz_upsc.json' is inside the 'assets' folder.");
      quizData = [];
    }
  }

  // 📜 Show question
  function showQuestion() {
    if (quizData.length === 0) {
      questionBox.innerHTML = "<p>No quiz data available.</p>";
      optionsBox.innerHTML = "";
      return;
    }

    if (currentIndex >= quizData.length) {
      endQuiz();
      return;
    }

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

 
 

  // ⏭️ Next & Skip Buttons
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    showQuestion();
  });

  skipBtn.addEventListener("click", () => {
    currentIndex++;
    showQuestion();
  });

  // 🔁 Restart Button
  restartBtn.addEventListener("click", () => {
    resetQuiz();
    showQuestion();
  });

 
});
document.addEventListener("DOMContentLoaded", () => {

  // 🌙 DARK MODE
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // 🔍 FILTER BUTTONS
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".topic.card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filterType = btn.dataset.filter;

      cards.forEach(card => {
        card.style.display = (filterType === "all" || card.dataset.type === filterType) ? "block" : "none";
      });
    });
  });

 
});
document.addEventListener("DOMContentLoaded", () => {
  // 🌙 Dark Mode
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // 🔍 FILTERS
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".topic.card");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filterType = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (filterType === "all" || card.dataset.type === filterType) ? "block" : "none";
      });
    });
  });

  
  let quizData = [];
  let currentIndex = 0;
  let score = 0;

  async function loadQuizData() {
    try {
      const res = await fetch("../../assets/quiz_upsc.json");
      quizData = await res.json();
      showQuestion();
    } catch {
      questionBox.innerHTML = "<p>⚠️ quiz_upsc.json not found in assets folder!</p>";
    }
  }

  function showQuestion() {
    if (currentIndex >= quizData.length) {
      questionBox.innerHTML = "";
      optionsBox.innerHTML = "";
      quizResult.style.display = "block";
      scoreBox.textContent = `${score} / ${quizData.length}`;
      return;
    }

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

  nextBtn.onclick = () => { currentIndex++; showQuestion(); };
  skipBtn.onclick = () => { currentIndex++; showQuestion(); };
  restartBtn.onclick = () => {
    currentIndex = 0;
    score = 0;
    quizResult.style.display = "none";
    showQuestion();
  };

  
});
