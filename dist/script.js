document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const willOpen = !item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('open');
      faq.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

const setMobileMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.toggleAttribute('inert', !open);
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMobileMenu(!isOpen);
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMobileMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMobileMenu(false);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1120) setMobileMenu(false);
});

const dialog = document.querySelector('#order-dialog');
const serviceSelect = dialog.querySelector('[name="service"]');
const openDialog = () => {
  if (!dialog.open) dialog.showModal();
};
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelectorAll('.open-order').forEach((button) => button.addEventListener('click', openDialog));
document.querySelectorAll('.select-service').forEach((button) => button.addEventListener('click', () => {
  serviceSelect.value = button.closest('[data-service]').dataset.service;
  openDialog();
}));
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});

document.querySelector('#order-form').addEventListener('submit', (event) => {
  const submitter = event.submitter;
  if (!submitter || submitter.value === 'cancel') return;
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    `Здравствуйте! Хочу заказать услугу: ${data.get('service')}.`,
    `Адрес: ${data.get('address')}.`,
    data.get('name') ? `Имя: ${data.get('name')}.` : '',
    `Телефон: ${data.get('phone')}.`,
    data.get('comment') ? `Автомобиль / описание: ${data.get('comment')}.` : '',
    'Подскажите стоимость и время прибытия.'
  ].filter(Boolean).join(' ');
  window.open(`https://wa.me/996553444007?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  form.reset();
  dialog.close();
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}
document.querySelector('#year').textContent = new Date().getFullYear();
