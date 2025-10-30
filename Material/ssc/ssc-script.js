// 🌙 Dark Mode Toggle (works on all SSC + Video Lecture pages)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("ssc-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  // Toggle theme
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      const isDark = body.classList.contains("dark");
      localStorage.setItem("ssc-theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }
});

// 🧭 Reusable Page Navigation (for cards)
document.addEventListener("click", (e) => {
  const card = e.target.closest(".ssc-card");
  if (card && card.dataset.link) {
    window.location.href = card.dataset.link;
  }
});
// 🌙 Dark Mode Toggle (works on all SSC + Video Lecture pages)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("ssc-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  // Toggle theme
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      const isDark = body.classList.contains("dark");
      localStorage.setItem("ssc-theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }
});
// 🌙 Dark Mode Toggle (Works on All SSC + Video Pages)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("ssc-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  // Toggle theme on click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      const isDark = body.classList.contains("dark");
      localStorage.setItem("ssc-theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }
});
