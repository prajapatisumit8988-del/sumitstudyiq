// ======================================
// SSC SCRIPT • SUMITSTUDYIQ
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  // 🌙 THEME TOGGLE
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("ssc-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      const isDark = body.classList.contains("dark");
      localStorage.setItem("ssc-theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // 🧭 CARD NAVIGATION
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".ssc-card");
    if (card && card.getAttribute("href")) {
      window.location.href = card.getAttribute("href");
    }
  });

  // 🏠 BACK + HOME BUTTON Hover Animation
  const buttons = document.querySelectorAll(".back, .home-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-2px)";
      btn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "none";
    });
  });
});
