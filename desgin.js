// 1. Init Animations
AOS.init({ duration: 800, offset: 50 });

// 2. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with delay
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// 3. Stats Counter Logic
const counters = document.querySelectorAll('.counter');
let hasRun = false;

window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-bar');
    if(section) {
        const sectionPos = section.getBoundingClientRect().top;
        if(sectionPos < window.innerHeight / 1.3 && !hasRun){
            counters.forEach(counter => {
                counter.innerText = '0';
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target');
                    const c = +counter.innerText;
                    const increment = target / 50; // Speed
                    if (c < target) {
                        counter.innerText = Math.ceil(c + increment);
                        setTimeout(updateCounter, 30);
                    } else { counter.innerText = target; }
                };
                updateCounter();
            });
            hasRun = true;
        }
    }
});

// 4. Gallery Filter
function filterGallery(category) {
    const btns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if(category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            item.classList.remove('aos-animate');
            setTimeout(() => item.classList.add('aos-animate'), 50);
        } else {
            item.style.display = 'none';
        }
    });
}

// 5. Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    lbImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'visible';
}
lightbox.addEventListener('click', (e) => { if (e.target !== lbImg) closeLightbox(); });