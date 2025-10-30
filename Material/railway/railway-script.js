document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("theme", mode);
      toggleBtn.textContent = mode === "dark" ? "☀️" : "🌙";
    });
  }
});
