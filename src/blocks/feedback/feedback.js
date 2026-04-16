import './feedback.css';

const root = document.querySelector('[data-feedback]');
if (root) {
  const toggle = root.querySelector('[data-feedback-toggle]');
  const closeBtn = root.querySelector('[data-feedback-close]');
  const panel = root.querySelector('.feedback__panel');

  const setOpen = (open) => {
    root.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (panel instanceof HTMLElement) {
      if (open) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    }
  };

  toggle?.addEventListener('click', () => {
    setOpen(!root.classList.contains('is-open'));
  });

  closeBtn?.addEventListener('click', () => setOpen(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  document.addEventListener('click', (e) => {
    if (!root.classList.contains('is-open')) return;
    const t = e.target;
    if (!(t instanceof Node)) return;
    if (t instanceof Element && t.closest('[data-request-modal-root].is-open')) return;
    if (!root.contains(t)) setOpen(false);
  });
}
