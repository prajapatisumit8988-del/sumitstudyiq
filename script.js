// ==========================
// SEARCH FUNCTIONALITY
// ==========================
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toLowerCase();

    const items = document.querySelectorAll(
        '.book-item, .current-item, .note-item, .ncert-item, .newspaper-item, .videos .item'
    );

    items.forEach(item => {
        const title = item.getAttribute('data-title') || "";
        if(title.toLowerCase().includes(filter)){
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

// ==========================
// DARK MODE TOGGLE
// ==========================
const darkModeBtn = document.getElementById('darkModeToggle') || (() => {
    const btn = document.createElement('button');
    btn.textContent = '🌙 Dark Mode';
    btn.id = 'darkModeToggle';
    btn.style.position = 'fixed';
    btn.style.top = '10px';
    btn.style.right = '10px';
    btn.style.padding = '10px 15px';
    btn.style.zIndex = '1000';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
    return btn;
})();

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});

// ==========================
// CLASS VIDEOS TOGGLE
// ==========================
const classToggle = document.getElementById('classVideosToggle');
const classContainer = document.getElementById('classVideosContainer');

if(classToggle && classContainer){
    classToggle.addEventListener('click', () => {
        classContainer.style.display = classContainer.style.display === 'none' ? 'block' : 'none';
        classToggle.textContent = classContainer.style.display === 'none' ? '🎥 Class Videos' : '🎥 Class Videos ▼';
    });
}

// ==========================
// SUBJECT TABS FOR VIDEOS
// ==========================
const subjectBtns = document.querySelectorAll('.subject-btn');
const videoSections = document.querySelectorAll('.videos');

subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-subject');

        // Button active state
        subjectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show target section, hide others
        videoSections.forEach(section => {
            section.style.display = section.classList.contains(target) ? 'block' : 'none';
        });
    });
});

// ==========================
// NCERT SUBJECT TABS
// ==========================
const ncertButtons = document.querySelectorAll('.ncert-btn');
const ncertSubjects = document.querySelectorAll('.ncert-subject');

ncertButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const subject = btn.getAttribute('data-subject');

        // Active button
        ncertButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show target NCERT subject
        ncertSubjects.forEach(div => {
            div.style.display = div.classList.contains(subject) ? 'block' : 'none';
        });
    });
});

// ==========================
// NEWS CHANNEL BUTTONS
// ==========================
const channelButtons = document.querySelectorAll('.channel-btn');
const newsDivs = document.querySelectorAll('.news-items');

channelButtons.forEach(button => {
    button.addEventListener('click', () => {
        const channel = button.getAttribute('data-channel');

        newsDivs.forEach(div => {
            div.style.display = div.classList.contains(channel) ? 'block' : 'none';
        });

        // Active button highlight
        channelButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// ==========================
// NEWS CONTENT SHOW FUNCTION
// ==========================
function showNews(channel) {
    let newsContent = document.getElementById('news-content');
    if(!newsContent) return;

    newsContent.innerHTML = '';

    if(channel === 'toi'){
        newsContent.innerHTML = `
            <h3>Times of India Today</h3>
            <a href="https://timesofindia.indiatimes.com/" target="_blank">Visit Times of India</a>
        `;
    } else if(channel === 'hindu'){
        newsContent.innerHTML = `
            <h3>The Hindu Today</h3>
            <a href="https://www.thehindu.com/" target="_blank">Visit The Hindu</a>
        `;
    } else if(channel === 'indianexpress'){
        newsContent.innerHTML = `
            <h3>Indian Express Today</h3>
            <a href="https://indianexpress.com/" target="_blank">Visit Indian Express</a>
        `;
    } else if(channel === 'hindustantimes'){
        newsContent.innerHTML = `
            <h3>Hindustan Times Today</h3>
            <a href="https://www.hindustantimes.com/" target="_blank">Visit Hindustan Times</a>
        `;
    }
}

// ==========================
// FIREBASE LOGIN (Optional Admin)
// ==========================
const loginBtn = document.getElementById('loginWithGoogle');

if(loginBtn){
    loginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                const email = result.user.email;
                const allowedEmails = ["prajapatisumit8988@gmail.com"];
                if(allowedEmails.includes(email)){
                    alert("Welcome Admin: " + email);
                    document.getElementById('adminPanel').style.display = "block";
                    loginBtn.style.display = "none";
                } else {
                    alert("Sorry, you are not authorized!");
                    auth.signOut();
                }
            })
            .catch(error => console.error(error));
    });
}
const pdfViewer = document.getElementById('pdfViewer');
const pdfFrame = document.getElementById('pdfFrame');
const closePdf = document.getElementById('closePdf');

// सभी PDF links select करें
const pdfLinks = document.querySelectorAll('.pdf-link');

pdfLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let pdfUrl = this.getAttribute('href');

        // अगर Google Drive link है तो /view को /preview से replace करें
        if(pdfUrl.includes("drive.google.com")) {
            pdfUrl = pdfUrl.replace("/view", "/preview");
        }

        pdfFrame.setAttribute('src', pdfUrl);
        pdfViewer.style.display = 'flex';
    });
});

// Close button
closePdf.addEventListener('click', () => {
    pdfFrame.setAttribute('src', '');
    pdfViewer.style.display = 'none';
});
