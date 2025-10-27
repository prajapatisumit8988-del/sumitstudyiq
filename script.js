// ==================== 0. UNIQUE OPENING EFFECT (Preloader & Hero Animation) ====================

function handlePageLoadAnimation() {
    const preloader = document.getElementById('preloader');
    const mainWrapper = document.getElementById('main-wrapper');
    const heroSection = document.querySelector('.hero-section');
    
    if (preloader && mainWrapper) {
        // Hide preloader and show main content after a small delay (800ms)
        setTimeout(() => {
            preloader.classList.add('hidden');
            mainWrapper.style.opacity = '1';
            
            // Apply Hero Section animation only if it exists (i.e., on index.html)
            if (heroSection) {
                // Remove the initial-hidden class to trigger the CSS transition/animation
                heroSection.classList.remove('initial-hidden');
            }
        }, 800); // 800ms delay for a smooth fade
    } else if (mainWrapper) {
        // If not on index.html, ensure main content is visible immediately
        mainWrapper.style.opacity = '1';
    }
}


// ==================== 1. DARK MODE LOGIC ====================

function initializeDarkMode() {
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (!darkModeBtn) return;
    
    // 1. Initial Check: Read from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        // Ensure Light Mode is default if no setting is found
        document.body.classList.remove('dark-mode');
        darkModeBtn.textContent = "🌙 Dark Mode";
    }

    // 2. Click Listener
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
        
        // Target all relevant card items on the current page (Including Quiz cards)
        const items = document.querySelectorAll('.book-item, .note-item, .current-item, .newspaper-item, .video-item, .feature-card, .quiz-question-card');
        
        items.forEach(item => {
            // Priority: data-title (from HTML), then h3 content
            const title = item.getAttribute('data-title') || item.querySelector('h3')?.textContent || "";
            
            // Show item if title includes the filter text, otherwise hide
            item.style.display = title.toLowerCase().includes(filter) ? '' : 'none';
        });
    });
}

// ==================== 3. QUIZ LOGIC with TIMER 🌟 ====================

function initializeQuiz() {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-quiz-btn');
    const resultsEl = document.getElementById('quiz-results');
    const scoreDisplayEl = document.getElementById('score-display');
    const timerDisplay = document.getElementById('quiz-timer');
    const timerFill = document.getElementById('timer-fill');
    
    // Exit if not on the quiz page
    if (!quizForm || !submitBtn) return; 

    const questionCards = document.querySelectorAll('.quiz-question-card');
    const totalQuestions = questionCards.length;
    
    // Set timer configuration
    const TIME_PER_QUESTION = 20; // 20 seconds per question
    const TOTAL_QUIZ_TIME = totalQuestions * TIME_PER_QUESTION; // Total time in seconds

    let timeLeft = TOTAL_QUIZ_TIME;
    let timerInterval;
    let quizFinished = false;
    
    // Function to get CSS Variable value dynamically
    function getCssVar(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || ''; 
    }
    
    // --- Timer Update Function ---
    function updateTimer() {
        if (quizFinished) {
            clearInterval(timerInterval);
            return;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Update timer bar width
        const percentage = (timeLeft / TOTAL_QUIZ_TIME) * 100;
        timerFill.style.width = `${percentage}%`;
        
        // Change color for low time warning
        if (timeLeft <= 30) {
            timerDisplay.style.color = '#ef4444'; // Red warning
            timerFill.style.backgroundColor = '#ef4444';
        } else {
             // Reset color based on CSS variable
            timerDisplay.style.color = getCssVar('--timer-text-color'); 
            timerFill.style.backgroundColor = getCssVar('--timer-bar-fill');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults(); // Automatically submit the quiz
        }
        
        timeLeft--;
    }

    // --- Score Calculation Function ---
    function showResults() {
        if (quizFinished) return;
        quizFinished = true;
        clearInterval(timerInterval); // Stop the timer

        let numCorrect = 0;
        
        const correctColor = getCssVar('--quiz-correct-bg'); 
        const incorrectColor = getCssVar('--quiz-incorrect-bg');
        const skippedColor = getCssVar('--quiz-skipped-bg');

        questionCards.forEach(card => {
            const correctAnswer = card.getAttribute('data-answer');
            const questionName = card.querySelector('input[type="radio"]').name; 
            const userAnswerEl = document.querySelector(`input[name="${questionName}"]:checked`);
            
            // Disable all radio buttons after submission
            card.querySelectorAll('input[type="radio"]').forEach(radio => radio.disabled = true);
            
            // Set background color based on outcome
            if (userAnswerEl && userAnswerEl.value === correctAnswer) {
                numCorrect++;
                card.style.backgroundColor = correctColor; 
            } else if (userAnswerEl) {
                card.style.backgroundColor = incorrectColor; 
            } else {
                card.style.backgroundColor = skippedColor; 
            }
        });

        // Display results
        scoreDisplayEl.innerHTML = `You scored ${numCorrect} out of ${totalQuestions} (Score: ${(numCorrect / totalQuestions * 100).toFixed(0)}%).`;
        resultsEl.style.display = 'block';
        submitBtn.style.display = 'none'; // Hide submit button
    }

    // --- Quiz Reset Function ---
    function resetQuiz() {
        quizForm.reset(); 
        quizFinished = false; // Reset status
        
        questionCards.forEach(card => {
            card.style.backgroundColor = 'var(--bg-color-item)'; 
            // Re-enable all radio buttons
            card.querySelectorAll('input[type="radio"]').forEach(radio => radio.disabled = false);
        });
        
        resultsEl.style.display = 'none';
        submitBtn.style.display = 'block';
        
        // Restart timer
        timeLeft = TOTAL_QUIZ_TIME;
        updateTimer(); // Initial call
        timerInterval = setInterval(updateTimer, 1000);
    }

    // --- Initialize Timer and Event Listeners ---
    
    // Start timer on initial load
    updateTimer(); // Initial display
    timerInterval = setInterval(updateTimer, 1000);

    // Event Listeners: Use Form Submit
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop page reload
        showResults();
    });
    
    document.getElementById('restart-quiz-btn')?.addEventListener('click', resetQuiz);
}

// ==================== 4. MAIN INITIALIZATION ====================

// Use 'load' event to ensure all resources (including fonts/images) are ready before removing the preloader
window.addEventListener('load', () => {
    handlePageLoadAnimation();
});

// Use 'DOMContentLoaded' for functional setup (which is faster)
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeSearchLogic(); 
    initializeQuiz(); 
});