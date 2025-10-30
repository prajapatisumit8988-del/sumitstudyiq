document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // load saved theme
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  // toggle
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const mode = body.classList.contains("dark");
    themeToggle.textContent = mode ? "☀️" : "🌙";
    localStorage.setItem("theme", mode ? "dark" : "light");
  });
});
