// Extracted from portfolio_new.html
// Intersection fade-in
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('animate-in');
            observer.unobserve(e.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

// Gallery Logic
const projectImages = {
    automotive: [
        'images/Automotive Campaign/Call to Action 2-01-01.png',
        'images/Automotive Campaign/Offer 1-01-01.png',
        'images/Automotive Campaign/Offer 2-01.png',
        'images/Automotive Campaign/Vicky New-01-01.png',
        'images/Automotive Campaign/Concept poster Final.png'
    ],
    cherry: [
        'images/Campaign/Campaign Cherry Blossom-01.png',
        'images/Campaign/Campaign Cherry Blossom-02.png',
        'images/Campaign/Campaign Cherry Blossom-03.png',
        'images/Campaign/Campaign Cherry Blossom-04.png',
        'images/Campaign/Campaign Cherry Blossom-05.png',
        'images/Campaign/Campaign Cherry Blossom-06.png',
        'images/Campaign/Campaign Cherry Blossom-07.png',
        'images/Campaign/Campaign Cherry Blossom-08.png',
        'images/Campaign/Campaign Cherry Blossom-09.png',
        'images/Campaign/Campaign Cherry Blossom-10.png'
    ],
    poster: [
        'images/Film Poster Design/Film Poster.png',
        'images/Film Poster Design/Live Project(Awareness)1-01.png',
        'images/Film Poster Design/Toyota Poster Ad-01.png'
    ],
    newspaper: [
        'images/Newspaper Campaign/Newspaper Ad 1-01.png',
        'images/Newspaper Campaign/Newspaper Solus Ad 1-01.png',
        'images/Newspaper Campaign/5.Recreate Design-01.png'
    ],
    travel: [
        'images/Travel Brochure/TouristPackage 1-01.png',
        'images/Travel Brochure/TouristPackage 1-02.png',
        'images/Travel Brochure/TouristPackage 1-03.png'
    ],
    reels: [
        'videos/reel1.mp4',
        'videos/reel2.mp4'
    ]
};

const modal = document.getElementById('project-modal');
const galleryGrid = document.getElementById('gallery-grid');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.project-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const projectId = btn.getAttribute('data-project');
        if (projectId && projectImages[projectId]) {
            e.preventDefault();
            openGallery(projectImages[projectId]);
        }
    });
});

function openGallery(items) {
    galleryGrid.innerHTML = '';
    items.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.1}s`;

        if (src.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = false;
            video.loop = true;
            video.muted = false;
            video.style.width = '100%';
            video.style.borderRadius = '8px';
            item.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Project Image';
            item.appendChild(img);
        }
        galleryGrid.appendChild(item);
    });
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeGallery() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        galleryGrid.innerHTML = '';
    }, 300);
}

closeBtn.addEventListener('click', closeGallery);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGallery();
    }
});

// Contact Modal Logic
const contactModal = document.getElementById('contact-modal');
const contactBtn = document.getElementById('contact-btn');
const closeContactBtn = contactModal.querySelector('.modal-close');
const copyEmailBtn = document.getElementById('copy-email-btn');
const copyPhoneBtn = document.getElementById('copy-phone-btn');
const emailText = document.getElementById('email-text');
const phoneText = document.getElementById('phone-text');

function openContactModal() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
}

contactBtn.addEventListener('click', openContactModal);
closeContactBtn.addEventListener('click', closeContactModal);

contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeContactModal();
    }
});

function handleCopy(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.background = '#450693';
        btn.style.color = '#ffffff';
        btn.style.borderColor = '#450693';

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    });
}

copyEmailBtn.addEventListener('click', () => {
    handleCopy(emailText.innerText, copyEmailBtn);
});

copyPhoneBtn.addEventListener('click', () => {
    handleCopy(phoneText.innerText, copyPhoneBtn);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) closeGallery();
        if (contactModal.classList.contains('active')) closeContactModal();
    }
});

// Set footer year
document.getElementById('year')?.textContent = new Date().getFullYear();
