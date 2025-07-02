// Typed.js - Hero typing animation
const typed = new Typed('#typing', {
  strings: ["a Frontend Developer", "a Creative Coder", "a Code Lover"],
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 1500,
  loop: true,
});

// Mobile Navbar toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const closeBtn = document.getElementById('closeBtn');

hamburger.addEventListener('click', () => {
  navLinks.classList.add('active');
});
closeBtn.addEventListener('click', () => {
  navLinks.classList.remove('active');
});

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal elements on scroll (.reveal)
function handleReveals() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', handleReveals);
window.addEventListener('load', handleReveals);

// Animate project cards one-by-one (staggered)
function animateProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      setTimeout(() => {
        card.classList.add('reveal-visible');
      }, i * 150);
    }
  });
}
window.addEventListener('scroll', animateProjectCards);
window.addEventListener('load', animateProjectCards);

// Swiper setup (only on mobile)
let swiper;
function initSwiper() {
  const isMobile = window.innerWidth < 768;
  const swiperContainer = document.querySelector('.mySwiper');

  if (isMobile && !swiper && swiperContainer) {
    swiper = new Swiper('.mySwiper', {
      slidesPerView: 1.2,
      spaceBetween: 15,
    });
  } else if (!isMobile && swiper) {
    swiper.destroy(true, true);
    swiper = undefined;
  }
}
window.addEventListener('load', initSwiper);
window.addEventListener('resize', initSwiper);

// Netlify success popup
const form = document.querySelector('.contact-form');
const popup = document.getElementById('success-popup');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        popup.classList.add('show');
        setTimeout(() => {
          popup.classList.remove('show');
          form.reset();
        }, 3000);
      })
      .catch(error => alert('Error! Please try again.'));
  });
}


const canvas = document.getElementById("binaryCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = document.querySelector(".projects").offsetHeight;

const binary = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawBinary() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#333"; // your deep rose primary color
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = binary[Math.floor(Math.random() * binary.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawBinary, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".projects").offsetHeight;
});
