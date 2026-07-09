// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Scroll-triggered reveal =====
const revealTargets = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// ===== Pause SVG flow animation for reduced-motion users =====
if (prefersReducedMotion) {
  document.querySelectorAll('animateMotion').forEach((anim) => {
    anim.setAttribute('repeatCount', '0');
  });
}

// ===== Live GitHub stat =====
// IMPORTANT: change 'shantanudash12' below to your actual GitHub username if it differs.
const GITHUB_USERNAME = 'shantanudash12';
const statRepos = document.getElementById('statRepos');

if (statRepos) {
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    .then((res) => {
      if (!res.ok) throw new Error('GitHub API request failed');
      return res.json();
    })
    .then((data) => {
      statRepos.textContent = data.public_repos ?? '—';
    })
    .catch(() => {
      // Quietly fall back rather than showing an error to visitors.
      statRepos.textContent = '—';
    });
}


// // Mobile nav toggle — the only interactivity this page needs.
// const navToggle = document.getElementById('navToggle');
// const navLinks = document.getElementById('navLinks');

// if (navToggle && navLinks) {
//   navToggle.addEventListener('click', () => {
//     const isOpen = navLinks.classList.toggle('open');
//     navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
//   });

//   navLinks.querySelectorAll('a').forEach((link) => {
//     link.addEventListener('click', () => {
//       navLinks.classList.remove('open');
//       navToggle.setAttribute('aria-expanded', 'false');
//     });
//   });
// }
