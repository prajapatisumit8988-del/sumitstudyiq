// सुनिश्चित करें कि DOM पूरी तरह से लोड हो गया है
document.addEventListener('DOMContentLoaded', (event) => {

    // ==========================
    // UNIQUE FEATURE: RECENT SEARCH HISTORY
    // ==========================
    const searchInput = document.getElementById('searchInput');
    const MAX_HISTORY = 5;

    // इतिहास को localStorage से लोड करें
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // इतिहास को ड्रॉपडाउन के रूप में दिखाने के लिए HTML एलिमेंट बनाएँ
    const historyList = document.createElement('div');
    historyList.className = 'search-history-list';
    // सर्च इनपुट के नीचे लिस्ट डालें
    searchInput.parentNode.insertBefore(historyList, searchInput.nextSibling);

    // सर्च को इतिहास में सेव करने का फ़ंक्शन
    const saveSearch = (query) => {
        query = query.trim().toLowerCase();
        if (query && !searchHistory.includes(query)) {
            // डुप्लीकेट हटाकर नया सर्च जोड़ें
            searchHistory = [query, ...searchHistory.filter(h => h !== query)];
            // केवल MAX_HISTORY आइटम रखें
            searchHistory = searchHistory.slice(0, MAX_HISTORY);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    };

    // इतिहास ड्रॉपडाउन को अपडेट और दिखाने का फ़ंक्शन
    const updateHistoryList = () => {
        historyList.innerHTML = '';
        
        // यदि इतिहास खाली है या सर्च इनपुट खाली नहीं है, तो न दिखाएँ
        if (searchHistory.length === 0 || searchInput.value.trim() !== '') {
            historyList.style.display = 'none';
            return;
        }
        
        historyList.style.display = 'block';

        searchHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.textContent = item;
            historyItem.className = 'history-item';
            historyItem.addEventListener('click', () => {
                searchInput.value = item;
                // सर्च फ़िल्टर को तुरंत लागू करें
                searchInput.dispatchEvent(new Event('keyup')); 
                historyList.style.display = 'none';
            });
            historyList.appendChild(historyItem);
        });
    };

    // जब यूजर टाइप करना बंद कर दे तो सर्च को इतिहास में सेव करें
    searchInput.addEventListener('blur', () => {
        // 100ms बाद छिपाएँ ताकि क्लिक इवेंट को रजिस्टर होने का समय मिले
        setTimeout(() => {
            historyList.style.display = 'none';
        }, 100); 
        saveSearch(searchInput.value);
    });

    searchInput.addEventListener('focus', updateHistoryList);


    // ==========================
    // SEARCH FUNCTIONALITY (Updated to integrate with history)
    // ==========================
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        // इतिहास को टाइपिंग के दौरान छिपा दें
        historyList.style.display = 'none'; 
        
        const items = document.querySelectorAll(
            '.book-item, .current-item, .note-item, .ncert-subject, .newspaper-item, .videos .item, .coaching-content .subject'
        );

        items.forEach(item => {
            // data-title को prioritize करें या h3 कंटेंट का उपयोग करें
            const title = item.getAttribute('data-title') || item.querySelector('h3')?.textContent || "";
            item.style.display = title.toLowerCase().includes(filter) ? '' : 'none';

            // यदि item एक ग्रिड कंटेनर का हिस्सा है, तो उसकी पैरेंट ग्रिड को भी सही से हैंडल करना होगा (CSS द्वारा हैंडल किया जा रहा है)
        });
    });


    // ==========================
    // DARK MODE TOGGLE
    // ==========================
    const darkModeBtn = document.getElementById('darkModeToggle');

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // बटन टेक्स्ट को अपडेट करें
        darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // ==========================
    // TAB BUTTONS (Main Navigation)
    // ==========================
    const tabBtns = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".section");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        sections.forEach(s => s.classList.remove("active"));
        btn.classList.add("active");
        const targetSection = document.getElementById(btn.dataset.section);
        if (targetSection) {
            targetSection.classList.add("active");
        }
      });
    });

    // ==========================
    // NCERT BUTTONS (Sub-tabs)
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
    // COACHING TABS (Main Coaching Sub-tabs)
    // ==========================
    const coachingBtns = document.querySelectorAll(".coaching-btn");
    const coachingSections = document.querySelectorAll(".coaching");

    coachingBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            coachingBtns.forEach(b => b.classList.remove("active"));
            coachingSections.forEach(sec => sec.style.display = "none");
            btn.classList.add("active");
            document.querySelector(`.coaching.${btn.dataset.coaching}`).style.display = "block";
            
            // नया कोचिंग सेक्शन एक्टिवेट होने पर, उसके अंदर का पहला सब्जेक्ट भी एक्टिवेट करें
            const activeCoaching = document.querySelector(`.coaching.${btn.dataset.coaching}`);
            const firstSubjectBtn = activeCoaching.querySelector(".subject-tabs .subject-btn");
            if(firstSubjectBtn && !firstSubjectBtn.classList.contains('active')) {
                firstSubjectBtn.click();
            }
        });
    });

    // ==========================
    // SUBJECT BUTTONS INSIDE COACHING (Nested Sub-tabs)
    // ==========================
    document.querySelectorAll(".coaching").forEach(coachingSection => {
        const subjectBtns = coachingSection.querySelectorAll(".subject-btn");
        const subjects = coachingSection.querySelectorAll(".subject");

        subjectBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                subjectBtns.forEach(b => b.classList.remove("active"));
                subjects.forEach(s => s.style.display = "none");
                btn.classList.add("active");
                coachingSection.querySelector(`.subject.${btn.dataset.subject}`).style.display = "block";
            });
        });
    });

    // ===============================================
    // UNIQUE FEATURE: INITIAL LOAD ACTIVATION
    // ===============================================

    // 1. मेन टैब: पहला मेन टैब बटन (Books) पर क्लिक करें
    if (tabBtns.length > 0) {
        tabBtns[0].click(); 
    }
    
    // 2. कोचिंग टैब: पहला कोचिंग टैब बटन (Drishti IAS) पर क्लिक करें, जिससे उसके अंदर का सब्जेक्ट भी एक्टिवेट हो जाए
    if (coachingBtns.length > 0) {
        coachingBtns[0].click();
    }
    
    // 3. NCERT सेक्शन: पहला NCERT बटन (Math) पर क्लिक करें
    if (ncertButtons.length > 0) {
        ncertButtons[0].click();
    }
    
});