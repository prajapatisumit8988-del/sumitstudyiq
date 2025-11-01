// 🌙 Dark Mode Toggle
const darkToggle = document.getElementById("darkModeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.textContent = "☀️ Light Mode";
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  darkToggle.textContent = mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", mode);
});

// 📰 Dynamic PDF Data
const pdfData = {
  "2025-11-03": ["The Hindu", "Indian Express", "Dainik Jagran"],
  "2025-11-02": ["The Hindu", "Indian Express", "Dainik Jagran"],
  "2025-11-01": ["The Hindu", "Indian Express", "Dainik Jagran"]
};

// 🧱 Generate PDF Cards Dynamically
const pdfContainer = document.getElementById("pdfContainer");
Object.keys(pdfData).sort((a, b) => new Date(b) - new Date(a)).forEach(date => {
  const section = document.createElement("div");
  section.classList.add("date-section");

  const heading = document.createElement("h3");
  heading.textContent = `📅 ${new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric"
  })}`;

  const grid = document.createElement("div");
  grid.classList.add("pdf-grid");

  pdfData[date].forEach(name => {
    const card = document.createElement("div");
    card.classList.add("pdf-card");

    const title = document.createElement("h4");
    title.textContent = name;

    const link = document.createElement("a");
    link.href = `pdfs/${date}/${name.replace(/\s+/g, "_")}.pdf`;
    link.classList.add("cta-button");
    link.textContent = "📄 View / Download";
    link.target = "_blank";

    card.appendChild(title);
    card.appendChild(link);
    grid.appendChild(card);
  });

  section.appendChild(heading);
  section.appendChild(grid);
  pdfContainer.appendChild(section);
});

// 🔍 Search Functionality
const searchInput = document.getElementById("pdfSearchInput");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".date-section").forEach(section => {
    const match = section.textContent.toLowerCase().includes(query);
    section.style.display = match ? "" : "none";
  });
});
