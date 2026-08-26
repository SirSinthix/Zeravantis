const toast = document.querySelector('#toast');
const toastText = toast.querySelector('span');
let toastTimer;
const contactDialog = document.querySelector('#contactDialog');
const contactForm = document.querySelector('#contactForm');
const mailAppLink = document.querySelector('.mail-app-link');

document.querySelector('#contactButton').addEventListener('click', () => contactDialog.showModal());
mailAppLink.addEventListener('click', () => {
  const subject = encodeURIComponent(document.querySelector('#contactSubject').value.trim());
  const message = encodeURIComponent(document.querySelector('#contactMessage').value.trim());
  mailAppLink.href = `mailto:zeravantis@gmail.com?subject=${subject}&body=${message}`;
});
document.querySelector('#contactClose').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const subject = encodeURIComponent(document.querySelector('#contactSubject').value.trim());
  const message = encodeURIComponent(document.querySelector('#contactMessage').value.trim());
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=zeravantis%40gmail.com&su=${subject}&body=${message}`, '_blank', 'noopener');
  contactDialog.close();
  showToast('Gmail compose opened in a new tab');
});

const themeToggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('zeravantis-theme');
const isDark = savedTheme === 'dark';
if (isDark) document.body.classList.add('dark-mode');
themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
themeToggle.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}"></i>`;

themeToggle.addEventListener('click', () => {
  document.body.classList.add('theme-switching');
  document.documentElement.classList.add('theme-switching');
  const dark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('zeravantis-theme', dark ? 'dark' : 'light');
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.innerHTML = `<i data-lucide="${dark ? 'sun' : 'moon'}"></i>`;
  lucide.createIcons();
  setTimeout(() => {
    document.body.classList.remove('theme-switching');
    document.documentElement.classList.remove('theme-switching');
  }, 450);
});

document.querySelector('#menuToggle').addEventListener('click', () => {
  const menu = document.querySelector('#siteMenu');
  const isOpen = menu.hidden;
  menu.hidden = !isOpen;
  document.querySelector('#menuToggle').setAttribute('aria-expanded', String(isOpen));
});

function showToast(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelector('.chip.active').classList.remove('active');
    chip.classList.add('active');
    filterApps();
  });
});

document.querySelector('#searchInput').addEventListener('input', filterApps);

function filterApps() {
  const query = document.querySelector('#searchInput').value.toLowerCase().trim();
  const category = document.querySelector('.chip.active').dataset.filter;
  let visible = 0;
  document.querySelectorAll('.app-card').forEach((card) => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesSearch = !query || card.dataset.search.includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
    if (!card.hidden) visible += 1;
  });
  document.querySelector('#emptyState').hidden = visible !== 0;
}

document.querySelectorAll('.save-button').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('saved');
    showToast(button.classList.contains('saved') ? 'Saved to your library' : 'Removed from your library');
  });
});

document.querySelectorAll('.site-menu a').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.hasAttribute('data-open-contact')) {
      event.preventDefault();
      contactDialog.showModal();
    }
    document.querySelector('#siteMenu').hidden = true;
    document.querySelector('#menuToggle').setAttribute('aria-expanded', 'false');
  });
});

lucide.createIcons();
