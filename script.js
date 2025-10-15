// ==================== 1. DARK MODE LOGIC ====================

function initializeDarkMode() {
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (!darkModeBtn) return;
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        darkModeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ==================== 2. SEARCH LOGIC ====================

function initializeSearchLogic() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        
        // सभी आइटम को फ़िल्टर करें जो वर्तमान पेज पर हैं
        const items = document.querySelectorAll('.book-item, .note-item, .current-item, .newspaper-item, .video-item, .feature-card');
        
        items.forEach(item => {
            const title = item.getAttribute('data-title') || item.querySelector('h3')?.textContent || "";
            
            item.style.display = title.toLowerCase().includes(filter) ? '' : 'none';
        });
    });
}

// ==================== 3. MAIN INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeSearchLogic(); 
});
// ==================== 3. QUIZ LOGIC (For HTML-Based Quiz) ====================

function initializeQuiz() {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-quiz-btn');
    const resultsEl = document.getElementById('quiz-results');
    const scoreDisplayEl = document.getElementById('score-display');
    const questionCards = document.querySelectorAll('.quiz-question-card');

    if (!quizForm || !submitBtn) return; 
    
    // --- स्कोर कैलकुलेट करने का फ़ंक्शन ---
    function showResults() {
        let numCorrect = 0;
        const totalQuestions = questionCards.length;
        
        questionCards.forEach(card => {
            const correctAnswer = card.getAttribute('data-answer');
            const questionName = card.querySelector('input[type="radio"]').name;
            const userAnswerEl = document.querySelector(`input[name="${questionName}"]:checked`);
            
            // पहले से कोई भी स्टाइलिंग हटा दें
            card.style.backgroundColor = 'var(--bg-color-item)';
            
            if (userAnswerEl && userAnswerEl.value === correctAnswer) {
                numCorrect++;
                card.style.backgroundColor = '#d4edda'; // Light green for correct (Light Mode)
            } else if (userAnswerEl) {
                card.style.backgroundColor = '#f8d7da'; // Light red for incorrect (Light Mode)
            } else {
                 // अगर कोई उत्तर नहीं दिया गया
                 card.style.backgroundColor = '#fff3cd'; // Light yellow
            }
        });

        // डार्क मोड के लिए सही/गलत रंग सेट करें
        if (document.body.classList.contains('dark-mode')) {
             questionCards.forEach(card => {
                 if (card.style.backgroundColor.includes('d4edda')) { // If correct
                     card.style.backgroundColor = '#1e3d24'; // Dark green
                 } else if (card.style.backgroundColor.includes('f8d7da')) { // If incorrect
                     card.style.backgroundColor = '#581c1c'; // Dark red
                 } else if (card.style.backgroundColor.includes('fff3cd')) { // If skipped
                     card.style.backgroundColor = '#38301c'; // Dark yellow
                 }
             });
        }


        // परिणाम दिखाएँ
        scoreDisplayEl.innerHTML = `You scored ${numCorrect} out of ${totalQuestions} (Score: ${(numCorrect / totalQuestions * 100).toFixed(0)}%).`;
        resultsEl.style.display = 'block';
        submitBtn.style.display = 'none'; // सबमिट बटन छिपाएँ
        
        // फॉर्म को सबमिट होने से रोकें
        return false;
    }

    // --- क्विज़ रीसेट करने का फ़ंक्शन ---
    function resetQuiz() {
        quizForm.reset(); // सभी रेडियो बटन को अनचेक करें
        questionCards.forEach(card => {
            card.style.backgroundColor = 'var(--bg-color-item)'; // रंग रीसेट करें
        });
        resultsEl.style.display = 'none';
        submitBtn.style.display = 'block';
    }

    // Event Listeners
    submitBtn.addEventListener('click', showResults);
    document.getElementById('restart-quiz-btn')?.addEventListener('click', resetQuiz);

}

// Ensure the main initialization function calls the quiz initializer:
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeSearchLogic();
    // CALL THE NEW QUIZ FUNCTION HERE
    initializeQuiz(); 
});