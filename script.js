// SMOOTH SCROLL NAVBAR
// Fungsi untuk smooth scroll saat klik menu navbar
document.querySelectorAll('.navbar-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Tutup menu mobile setelah klik (jika sedang terbuka)
        if (navbarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// SMOOTH SCROLL FOOTER MENU
// Fungsi untuk smooth scroll pada menu footer
document.querySelectorAll('.footer-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// TOGGLE MENU MOBILE
// Variabel untuk elemen hamburger dan menu
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

// Fungsi untuk toggle menu mobile
function toggleMenu() {
    navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Event listener untuk hamburger menu
hamburger.addEventListener('click', toggleMenu);

// Tutup menu saat klik di luar menu
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// SLIDER TESTIMONI
// Variabel untuk slider testimoni
let currentSlide = 0;
const testimoniCards = document.querySelectorAll('.testimoni-card');
const dots = document.querySelectorAll('.dot');

// Fungsi untuk menampilkan slide tertentu
function showSlide(index) {
    // Sembunyikan semua slide
    testimoniCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Tampilkan slide yang dipilih
    testimoniCards[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

// Fungsi untuk slide berikutnya
function nextSlide() {
    currentSlide = (currentSlide + 1) % testimoniCards.length;
    showSlide(currentSlide);
}

// Fungsi untuk slide sebelumnya
function prevSlide() {
    currentSlide = (currentSlide - 1 + testimoniCards.length) % testimoniCards.length;
    showSlide(currentSlide);
}

// Event listener untuk dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto slide setiap 5 detik
setInterval(nextSlide, 5000);

// Inisialisasi slider
if (testimoniCards.length > 0) {
    showSlide(0);
}

// EFEK HOVER TAMBAHAN (opsional)
// Efek hover untuk card layanan (sudah ada di CSS, ini tambahan JS jika diperlukan)
document.querySelectorAll('.layanan-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// SCROLL EFFECT UNTUK NAVBAR
// Tambahkan efek transparan pada navbar saat scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.backgroundColor = 'var(--secondary-color)';
    }
});

// LAZY LOADING UNTUK GAMBAR (jika ada gambar di masa depan)
// Fungsi lazy loading untuk optimasi performa
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight + 100) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}

// Event listener untuk lazy loading
window.addEventListener('scroll', lazyLoad);
window.addEventListener('load', lazyLoad);

// FORM VALIDATION (untuk form kontak jika ditambahkan nanti)
// Fungsi validasi form sederhana
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    return isValid;
}

// Event listener untuk form submission (jika ada form)
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
        if (!validateForm(e.target)) {
            e.preventDefault();
            alert('Mohon lengkapi semua field yang diperlukan.');
        }
    }
});

// ANIMASI SCROLL REVEAL (opsional)
// Fungsi untuk animasi elemen saat scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.layanan-card, .keunggulan-item, .client-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inisialisasi animasi scroll
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.layanan-card, .keunggulan-item, .client-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);