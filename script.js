
/* =========================================
   2. Init Libraries
   ========================================= */
AOS.init({ offset: 120, duration: 1000 });

var typed = new Typed('.auto-type', {
    strings: ['مصمم واجهات مبدع.', 'مطور ويب محترف.', 'شريك نجاحك.'],
    typeSpeed: 100, backSpeed: 50, loop: true
});

/* =========================================
   3. Particles Manager (With Destroy Fix)
   ========================================= */
function loadParticles(colorHex) {
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": colorHex },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": colorHex, "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 3 }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
        },
        "retina_detect": true
    });
}

/* =========================================
   4. Settings & Theme Logic
   ========================================= */
const settingsBox = document.querySelector('.settings-box');
const root = document.querySelector(':root');

function toggleSettings() { 
    if(settingsBox) settingsBox.classList.toggle('open'); 
}

function resetTheme() {
    setTheme('#D4AF37', '#AA8A2E');
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
}

function setTheme(mainColor, darkColor) {
    root.style.setProperty('--gold-main', mainColor);
    root.style.setProperty('--gold-dark', darkColor);
    root.style.setProperty('--gold-rgb', hexToRgb(mainColor)); 
    
    loadParticles(mainColor);
    
    if (event && event.target && event.target.classList.contains('color-btn') && !event.target.classList.contains('reset-btn')) {
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}
setTheme('#D4AF37', '#AA8A2E');

/* =========================================
   5. System Boot Preloader (Complex Version)
   ========================================= */
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);
document.body.style.overflow = 'hidden';

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const percentText = document.getElementById('loading-percent');
    const loadingBar = document.querySelector('.loading-bar');
    const statusText = document.getElementById('loading-status');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 2;
        if (progress > 100) progress = 100;
        
        if(percentText) percentText.innerText = progress + "%";
        if(loadingBar) loadingBar.style.width = progress + "%";

        // Logic for text updates
        if(statusText) {
            if(progress > 30) statusText.innerText = "LOADING ASSETS...";
            if(progress > 70) statusText.innerText = "CONFIGURING UI...";
            if(progress === 100) {
                statusText.innerText = "SYSTEM READY";
                statusText.style.color = "#fff";
                clearInterval(interval);
                setTimeout(() => {
                    if(preloader) preloader.classList.add('loaded');
                    document.body.style.overflow = 'visible';
                }, 800);
            }
        }
    }, 50);
});

/* =========================================
   6. UI Logic (Nav & Scroll)
   ========================================= */
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
if(hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

window.onscroll = function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    const myBar = document.getElementById("myBar");
    if(myBar) myBar.style.width = scrolled + "%";
};

/* =========================================
   7. Counters
   ========================================= */
const counters = document.querySelectorAll('.counter');
let hasRun = false;
window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    if(section) {
        const sectionPos = section.getBoundingClientRect().top;
        if(sectionPos < window.innerHeight / 1.3 && !hasRun){
            counters.forEach(counter => {
                counter.innerText = '0';
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target');
                    const c = +counter.innerText;
                    const increment = target / 100;
                    if (c < target) {
                        counter.innerText = Math.ceil(c + increment);
                        setTimeout(updateCounter, 20);
                    } else { counter.innerText = target; }
                };
                updateCounter();
            });
            hasRun = true;
        }
    }
});

/* =========================================
   8. Reviews Load More
   ========================================= */
const loadMoreBtn = document.getElementById('loadMoreBtn');
if(loadMoreBtn){
    loadMoreBtn.addEventListener('click', () => {
        const grid = document.getElementById('reviewsGrid');
        const cards = grid.querySelectorAll('.review-card');
        const isExpanded = loadMoreBtn.getAttribute('data-expanded') === 'true';

        if (!isExpanded) {
            cards.forEach(card => {
                card.classList.remove('hidden-review'); 
                card.style.display = 'flex'; 
                card.classList.add('aos-animate');
            });
            loadMoreBtn.innerHTML = 'عرض أقل <i class="fas fa-chevron-up"></i>';
            loadMoreBtn.setAttribute('data-expanded', 'true');
        } else {
            cards.forEach((card, index) => {
                if (index >= 3) {
                    card.classList.add('hidden-review');
                    card.style.display = 'none';
                }
            });
            loadMoreBtn.innerHTML = 'عرض المزيد <i class="fas fa-chevron-down"></i>';
            loadMoreBtn.setAttribute('data-expanded', 'false');
            document.querySelector('.testimonials-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

/* =========================================
   9. FAQ Logic
   ========================================= */
document.querySelectorAll(".faq-item").forEach(faq => {
    faq.addEventListener("click", () => {
        document.querySelectorAll(".faq-item").forEach(item => {
            if (item !== faq) {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;
            }
        });
        faq.classList.toggle("active");
        const answer = faq.querySelector(".faq-answer");
        if (faq.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

/* =========================================
   10. Custom Alerts & Context Menu
   ========================================= */
const customAlert = document.getElementById('customAlert');
const alertMsg = document.getElementById('alertMessage');
const alertTitle = document.getElementById('alertTitle');

function showCustomAlert(message, title = "تنبيه النظام") {
    if(alertMsg) alertMsg.innerText = message;
    if(alertTitle) alertTitle.innerText = title;
    if(customAlert) customAlert.classList.add('active');
}
function closeCustomAlert() { 
    if(customAlert) customAlert.classList.remove('active'); 
}
if(customAlert) customAlert.addEventListener('click', (e) => { if (e.target === customAlert) closeCustomAlert(); });

const contextMenu = document.getElementById("contextMenu");
document.body.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if(contextMenu) {
        const { clientX: mouseX, clientY: mouseY } = event;
        const menuWidth = contextMenu.offsetWidth || 200;
        const menuHeight = contextMenu.offsetHeight || 300;
        
        if (mouseX + menuWidth > window.innerWidth) contextMenu.style.left = `${mouseX - menuWidth}px`;
        else contextMenu.style.left = `${mouseX}px`;
        
        if (mouseY + menuHeight > window.innerHeight) contextMenu.style.top = `${mouseY - menuHeight}px`;
        else contextMenu.style.top = `${mouseY}px`;
        
        contextMenu.classList.add("visible");
    }
});

document.body.addEventListener("click", (e) => {
    if (contextMenu && e.target.offsetParent != contextMenu) contextMenu.classList.remove("visible");
});

function copyEmail() {
    navigator.clipboard.writeText("email@example.com");
    showCustomAlert("تم نسخ البريد الإلكتروني بنجاح!", "عملية ناجحة");
}
function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    showCustomAlert("تم نسخ رابط الموقع بنجاح!", "مشاركة الرابط");
}

/* =========================================
   11. Smart Greeting & Dual Clock
   ========================================= */
function updateSystemStatus() {
    const greetingEl = document.getElementById('greeting-text');
    const heroClock = document.getElementById('live-clock');
    const navClock = document.getElementById('nav-clock');
    
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    let greeting = "";
    if (hours >= 5 && hours < 12) greeting = "صباح الخير ☀️";
    else if (hours >= 12 && hours < 18) greeting = "طاب يومك 🚀";
    else if (hours >= 18 && hours < 22) greeting = "مساء الخير ✨";
    else greeting = "ساهر الليل 🌙";
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let h = hours % 12; h = h ? h : 12; 
    const strH = h < 10 ? '0' + h : h;
    const strM = minutes < 10 ? '0' + minutes : minutes;
    const strS = seconds < 10 ? '0' + seconds : seconds;
    
    if(greetingEl) greetingEl.innerText = greeting;
    if(heroClock) heroClock.innerText = `${strH}:${strM}:${strS} ${ampm}`;
    if(navClock) navClock.innerText = `${strH}:${strM} ${ampm}`;
}

setInterval(updateSystemStatus, 1000);
updateSystemStatus();

window.addEventListener('scroll', () => {
    const heroClockContainer = document.querySelector('.system-status');
    const navClock = document.getElementById('nav-clock');
    
    if (window.scrollY > 300) {
        if(heroClockContainer) heroClockContainer.classList.add('hidden');
        if(navClock) navClock.classList.add('visible');
    } else {
        if(heroClockContainer) heroClockContainer.classList.remove('hidden');
        if(navClock) navClock.classList.remove('visible');
    }
});

/* =========================================
   12. Tab Title Trick
   ========================================= */
let docTitle = document.title;
window.addEventListener("blur", () => { document.title = "🥺 لا ترحل!"; });
window.addEventListener("focus", () => {
    document.title = "🔥 أهلاً بك مجدداً";
    setTimeout(() => { document.title = docTitle; }, 2000);
});

/* =========================================
   13. Contact Form (EmailJS)
   ========================================= */
const contactForm = document.querySelector('.contact-form');

if(contactForm){
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        btn.disabled = true;

        const serviceID = 'service_fuluy6n'; 
        const templateID = 'template_bpuf6mt';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                showCustomAlert('تم استلام رسالتك بنجاح! سأتواصل معك قريباً.', 'تم الإرسال ✅');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, (err) => {
                showCustomAlert('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.', 'خطأ ❌');
                console.log(JSON.stringify(err));
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    });
}

/* =========================================
   14. Reviews Logic (Real Firebase) 🔥
   ========================================= */
const firebaseConfig = {
  apiKey: "AIzaSyANz8dBPKkSD6mqTuVk77WLRqsVQ1hVlog",
  authDomain: "kyrillos-protifolio.firebaseapp.com",
  projectId: "kyrillos-protifolio",
  storageBucket: "kyrillos-protifolio.firebasestorage.app",
  messagingSenderId: "154071914816",
  appId: "1:154071914816:web:b246ca0b0aada5db3502a5",
  measurementId: "G-64M0V7QRPO"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    console.log("Firebase Connected");
} catch (e) {
    console.error("Firebase Error:", e);
}

// 1. Modal Logic
const reviewModal = document.getElementById('reviewModal');
function openReviewModal() { if(reviewModal) reviewModal.classList.add('active'); }
function closeReviewModal() { if(reviewModal) reviewModal.classList.remove('active'); }

// 2. Rating Logic
function setRating(n) {
    const ratingInput = document.getElementById('reviewRating');
    if(ratingInput) ratingInput.value = n;
    
    const stars = document.querySelectorAll('.rating-select i');
    stars.forEach((s, index) => {
        if(index < n) { s.className = 'fas fa-star'; s.style.color = 'var(--gold-main)'; }
        else { s.className = 'far fa-star'; s.style.color = '#ccc'; }
    });
}

// 3. Add Review
const reviewForm = document.getElementById('addReviewForm');
if(reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const role = document.getElementById('reviewRole').value;
        const text = document.getElementById('reviewText').value;
        let rating = parseFloat(document.getElementById('reviewRating').value);
        
        // Half star check
        const isHalf = document.getElementById('halfStarCheck');
        if(isHalf && isHalf.checked) rating += 0.5;
        if(rating > 5) rating = 5;

        if(rating == 0) { showCustomAlert("من فضلك اختر عدد النجوم!"); return; }

        const btn = reviewForm.querySelector('button[type="submit"]');
        const oldText = btn.innerText;
        btn.innerText = "جاري النشر...";
        btn.disabled = true;

        db.collection("reviews").add({
            name: name, role: role, text: text, rating: rating, date: new Date()
        }).then(() => {
            showCustomAlert("شكراً لك! تم نشر تقييمك.", "نجاح");
            closeReviewModal();
            reviewForm.reset();
            setRating(0);
            if(isHalf) isHalf.checked = false;
            btn.innerText = oldText;
            btn.disabled = false;
            loadReviews();
        }).catch((error) => {
            console.error("Error: ", error);
            showCustomAlert("حدث خطأ في الاتصال!", "خطأ");
            btn.innerText = oldText;
            btn.disabled = false;
        });
    });
}

// 4. Load Reviews
function loadReviews() {
    const grid = document.getElementById('reviewsGrid');
    if(!grid) return;

    // Remove old Firebase reviews to avoid duplicates
    const addedReviews = grid.querySelectorAll('.added-by-firebase');
    addedReviews.forEach(el => el.remove());

    db.collection("reviews").orderBy("date", "desc").get().then((querySnapshot) => {
        const allDocs = [];
        querySnapshot.forEach((doc) => allDocs.push(doc.data()));

        // Add Firebase reviews to DOM (Prepended)
        allDocs.forEach((data) => {
            let starsHTML = '';
            for(let i=1; i<=5; i++) {
                if(data.rating >= i) starsHTML += '<i class="fas fa-star"></i>';
                else if (data.rating >= i - 0.5) starsHTML += '<i class="fas fa-star-half-alt"></i>';
                else starsHTML += '<i class="far fa-star"></i>';
            }

            const cardHTML = `
                <div class="review-card glass added-by-firebase" data-aos="flip-up">
                    <div class="stars" style="color: var(--gold-main); direction: rtl; display: inline-flex;">${starsHTML}</div>
                    <p>"${data.text}"</p>
                    <div class="client-info">
                        <div class="client-avatar" style="background: var(--gold-main); color: #000;">${data.name.charAt(0).toUpperCase()}</div>
                        <div><h4>${data.name}</h4><span>${data.role}</span></div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('afterbegin', cardHTML);
        });
        
        // Re-calculate visibility for ALL reviews (Hardcoded + Firebase)
        const allCards = grid.querySelectorAll('.review-card');
        allCards.forEach((card, index) => {
            if (index < 3) {
                card.classList.remove('hidden-review');
                card.style.display = 'flex';
            } else {
                card.classList.add('hidden-review');
                card.style.display = 'none';
            }
        });

        if(loadMoreBtn) {
            if(allCards.length <= 3) loadMoreBtn.style.display = 'none';
            else {
                loadMoreBtn.style.display = 'inline-block';
                loadMoreBtn.innerHTML = 'عرض المزيد <i class="fas fa-chevron-down"></i>';
                loadMoreBtn.setAttribute('data-expanded', 'false');
            }
        }
    });
}

if(typeof firebase !== 'undefined') {
    loadReviews();
}