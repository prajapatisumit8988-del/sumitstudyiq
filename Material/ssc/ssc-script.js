document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");

  // Saved theme check
  const savedTheme = localStorage.getItem("ssc-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  } else {
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }

  // Toggle dark/light
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark");
      localStorage.setItem("ssc-theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // Debug check — (optional)
  console.log("Theme loaded:", localStorage.getItem("ssc-theme"));
});
