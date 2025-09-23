const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')) {
        this.textContent = '☀️ Light Mode';
    } else {
        this.textContent = '🌙 Dark Mode';
    }
});
// Subject Tabs
const subjectButtons = document.querySelectorAll('.subject-btn');
const videoDivs = document.querySelectorAll('.videos');

subjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const subject = button.getAttribute('data-subject');

        // Show only selected subject videos
        videoDivs.forEach(div => {
            if(div.classList.contains(subject)){
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });

        // Active button highlight
        subjectButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const books = document.querySelectorAll('.book-item');

    books.forEach(book => {
        const title = book.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            book.style.display = '';
        } else {
            book.style.display = 'none';
        }
    });
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.current-item');

    items.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.current-item');

    items.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll('.note-item');

    notes.forEach(note => {
        const title = note.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            note.style.display = '';
        } else {
            note.style.display = 'none';
        }
    });
});
// News Channel Tabs
const channelButtons = document.querySelectorAll('.channel-btn');
const newsDivs = document.querySelectorAll('.news-items');

channelButtons.forEach(button => {
    button.addEventListener('click', () => {
        const channel = button.getAttribute('data-channel');

        newsDivs.forEach(div => {
            if(div.classList.contains(channel)){
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });

        // Active button highlight
        channelButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const newspapers = document.querySelectorAll('.newspaper-item');

    newspapers.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
// Toggle Class Videos container
document.getElementById('classVideosToggle').addEventListener('click', function() {
    const container = document.getElementById('classVideosContainer');
    if(container.style.display === 'none'){
        container.style.display = 'block';
        this.textContent = '🎥 Class Videos ▼';
    } else {
        container.style.display = 'none';
        this.textContent = '🎥 Class Videos';
    }
});

// Subject Tabs
const subjectButtons = document.querySelectorAll('.subject-btn');
const videoDivs = document.querySelectorAll('.videos');

subjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const subject = button.getAttribute('data-subject');

        videoDivs.forEach(div => {
            if(div.classList.contains(subject)){
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });

        subjectButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
// Toggle Class Videos container
document.getElementById('classVideosToggle').addEventListener('click', function() {
    const container = document.getElementById('classVideosContainer');
    if(container.style.display === 'none'){
        container.style.display = 'block';
        this.textContent = '🎥 Class Videos ▼';
    } else {
        container.style.display = 'none';
        this.textContent = '🎥 Class Videos';
    }
});

// Subject Tabs
const subjectButtons = document.querySelectorAll('.subject-btn');
const videoDivs = document.querySelectorAll('.videos');

subjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const subject = button.getAttribute('data-subject');

        videoDivs.forEach(div => {
            if(div.classList.contains(subject)){
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });

        subjectButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll('.note-item');

    notes.forEach(note => {
        const title = note.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            note.style.display = '';
        } else {
            note.style.display = 'none';
        }
    });
});
const ncertButtons = document.querySelectorAll('.ncert-btn');
const ncertSubjects = document.querySelectorAll('.ncert-subject');

ncertButtons.forEach(button => {
    button.addEventListener('click', () => {
        const subject = button.getAttribute('data-subject');

        ncertSubjects.forEach(div => {
            if(div.classList.contains(subject)){
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });

        ncertButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();

    // Select all searchable items
    const items = document.querySelectorAll('.book-item, .current-item, .note-item, .ncert-item');

    items.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        if(title.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
// Dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        darkModeToggle.textContent = '☀️ Light Mode';
    } else {
        darkModeToggle.textContent = '🌙 Dark Mode';
    }
});
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFedbAQNCEpCQzVwTgWKqroZuxtJQcXMo",
  authDomain: "sumitstudyiq.firebaseapp.com",
  projectId: "sumitstudyiq",
  storageBucket: "sumitstudyiq.firebasestorage.app",
  messagingSenderId: "1059949014134",
  appId: "1:1059949014134:web:c1c3733aa889cf412dc357",
  measurementId: "G-0ZBEY9CFCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const loginBtn = document.getElementById('loginWithGoogle');

loginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      const email = result.user.email;
      const allowedEmails = ["prajapatisumit8988@gmail.com"]; // sirf ye Gmail admin

      if (allowedEmails.includes(email)) {
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
const darkModeBtn = document.getElementById('dark-mode-toggle');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Button icon change (optional)
    if(document.body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});
// Dark Mode Toggle
const darkModeBtn = document.createElement('button');
darkModeBtn.textContent = '🌙 Dark Mode';
darkModeBtn.id = 'darkModeBtn';
darkModeBtn.style.position = 'fixed';
darkModeBtn.style.top = '10px';
darkModeBtn.style.right = '10px';
darkModeBtn.style.padding = '10px 15px';
darkModeBtn.style.zIndex = '1000';
darkModeBtn.style.cursor = 'pointer';
document.body.appendChild(darkModeBtn);

darkModeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});
const darkModeBtn = document.createElement('button');
darkModeBtn.textContent = '🌙 Dark Mode';
darkModeBtn.id = 'darkModeBtn';
darkModeBtn.style.position = 'fixed';
darkModeBtn.style.top = '10px';
darkModeBtn.style.right = '10px';
darkModeBtn.style.padding = '10px 15px';
darkModeBtn.style.zIndex = '1000';
darkModeBtn.style.cursor = 'pointer';
document.body.appendChild(darkModeBtn);

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});
// Dark Mode Button
const darkModeBtn = document.createElement('button');
darkModeBtn.textContent = '🌙 Dark Mode';
darkModeBtn.id = 'darkModeBtn';
darkModeBtn.style.position = 'fixed';
darkModeBtn.style.top = '10px';
darkModeBtn.style.right = '10px';
darkModeBtn.style.padding = '10px 15px';
darkModeBtn.style.zIndex = '1000';
darkModeBtn.style.cursor = 'pointer';
document.body.appendChild(darkModeBtn);

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});
const darkModeBtn = document.getElementById('darkModeBtn');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});
const subjectBtns = document.querySelectorAll('.subject-btn');
const videoSections = document.querySelectorAll('.videos');

subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const subject = btn.getAttribute('data-subject');

        // Remove active class
        subjectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show selected subject, hide others
        videoSections.forEach(section => section.style.display = 'none');
        document.querySelector('.videos.' + subject).style.display = 'block';
    });
});
const subjectBtns = document.querySelectorAll('.subject-btn');
const videoSections = document.querySelectorAll('.videos');

subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-subject');

        // Remove 'active' from all buttons
        subjectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show target section, hide others
        videoSections.forEach(section => {
            if(section.classList.contains(target)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});
const subjectBtns = document.querySelectorAll('.subject-btn');
const videoSections = document.querySelectorAll('.videos');

subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-subject');

        // Toggle button active
        subjectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle video sections
        videoSections.forEach(section => {
            section.style.display = section.classList.contains(target) ? 'block' : 'none';
        });
    });
});
// Toggle entire Class Videos section
const classToggle = document.getElementById('classVideosToggle');
const classContainer = document.getElementById('classVideosContainer');

classToggle.addEventListener('click', () => {
  classContainer.style.display = classContainer.style.display === 'none' ? 'block' : 'none';
});

// Toggle subjects inside Class Videos
const subjectBtns = document.querySelectorAll('.subject-btn');
const videoSections = document.querySelectorAll('.videos');

subjectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-subject');

    // Button active toggle
    subjectBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show selected videos, hide others
    videoSections.forEach(section => {
      section.style.display = section.classList.contains(target) ? 'block' : 'none';
    });
  });
});
// Toggle Class Video Container
const classToggle = document.getElementById('classVideosToggle');
const classContainer = document.getElementById('classVideosContainer');

classToggle.addEventListener('click', () => {
  classContainer.style.display =
    classContainer.style.display === 'none' ? 'block' : 'none';
});

// Subject Tabs Logic
const subjectBtns = document.querySelectorAll('.subject-btn');
const videoSections = document.querySelectorAll('.videos');

subjectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-subject');

    // Buttons active state
    subjectBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show correct subject videos
    videoSections.forEach(section => {
      section.style.display = section.classList.contains(target) ? 'block' : 'none';
    });
  });
});
// Show/Hide Class Videos Section
const classToggle = document.getElementById('classVideosToggle');
const classContainer = document.getElementById('classVideosContainer');

classToggle.addEventListener('click', () => {
  classContainer.style.display =
    classContainer.style.display === 'none' ? 'block' : 'none';
});

// Subject Tab Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const videoSections = document.querySelectorAll('.videos');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-subject');

    // Button Active State
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show Correct Video Grid
    videoSections.forEach(section => {
      section.style.display = section.classList.contains(target) ? 'grid' : 'none';
    });
  });
});
