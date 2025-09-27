// ==========================
// SEARCH FUNCTIONALITY
// ==========================
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toLowerCase();

    const items = document.querySelectorAll(
        '.book-item, .current-item, .note-item, .ncert-subject, .newspaper-item, .videos .item'
    );

    items.forEach(item => {
        const title = item.getAttribute('data-title') || "";
        item.style.display = title.toLowerCase().includes(filter) ? '' : 'none';
    });
});

// ==========================
// DARK MODE TOGGLE
// ==========================
const darkModeBtn = document.getElementById('darkModeToggle') || (() => {
    const btn = document.createElement('button');
    btn.textContent = '🌙 Dark Mode';
    btn.id = 'darkModeToggle';
    document.body.appendChild(btn);
    return btn;
})();

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ==========================
// TAB BUTTONS
// ==========================
const tabBtns = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".section");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});

// ==========================
// NCERT BUTTONS
// ==========================
const ncertButtons = document.querySelectorAll('.ncert-btn');
const ncertSubjects = document.querySelectorAll('.ncert-subject');

ncertButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const subject = btn.getAttribute('data-subject');
        ncertButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        ncertSubjects.forEach(div => {
            div.style.display = div.classList.contains(subject) ? 'block' : 'none';
        });
    });
});
// ==========================
// COACHING TABS
// ==========================
const coachingBtns = document.querySelectorAll(".coaching-btn");
const coachingSections = document.querySelectorAll(".coaching");

coachingBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active from all buttons & hide all sections
        coachingBtns.forEach(b => b.classList.remove("active"));
        coachingSections.forEach(sec => sec.style.display = "none");

        // Add active to clicked & show target section
        btn.classList.add("active");
        document.querySelector(`.coaching.${btn.dataset.coaching}`).style.display = "block";
    });
});

// ==========================
// SUBJECT BUTTONS INSIDE COACHING
// ==========================
document.querySelectorAll(".coaching").forEach(coachingSection => {
    const subjectBtns = coachingSection.querySelectorAll(".subject-btn");
    const subjects = coachingSection.querySelectorAll(".subject");

    subjectBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all buttons & hide all subjects
            subjectBtns.forEach(b => b.classList.remove("active"));
            subjects.forEach(s => s.style.display = "none");

            // Add active to clicked button & show target subject
            btn.classList.add("active");
            coachingSection.querySelector(`.subject.${btn.dataset.subject}`).style.display = "block";
        });
    });
});
const pdfViewer = document.getElementById('pdfViewer');
const pdfFrame = document.getElementById('pdfFrame');
const closePdf = document.getElementById('closePdf');

const pdfLinks = document.querySelectorAll('.pdf-link');

pdfLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let pdfUrl = this.getAttribute('href');
        pdfFrame.setAttribute('src', pdfUrl);
        pdfViewer.style.display = 'flex';
    });
});

closePdf.addEventListener('click', () => {
    pdfFrame.setAttribute('src', '');
    pdfViewer.style.display = 'none';
});
