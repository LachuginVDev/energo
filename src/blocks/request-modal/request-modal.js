import './request-modal.css';

const root = document.querySelector('[data-request-modal-root]');

if (root) {
  const closeEls = root.querySelectorAll('[data-request-modal-close]');
  const titleEl = root.querySelector('[data-request-modal-title-slot]');
  const leadEl = root.querySelector('[data-request-modal-lead-slot]');
  const contextField = root.querySelector('[data-request-modal-context-field]');
  const form = root.querySelector('[data-request-modal-form]');
  const statusEl = root.querySelector('[data-request-modal-status]');

  const defaultTitle = 'Оставить заявку';
  const defaultLead = 'Заполните поля — перезвоним и уточним детали.';

  let lastTrigger = null;

  const closeFeedbackWidget = () => {
    const fb = document.querySelector('[data-feedback]');
    if (!fb) return;
    fb.classList.remove('is-open');
    const toggle = fb.querySelector('[data-feedback-toggle]');
    const panel = fb.querySelector('.feedback__panel');
    toggle?.setAttribute('aria-expanded', 'false');
    if (panel instanceof HTMLElement) panel.setAttribute('hidden', '');
  };

  const isOpen = () => root.classList.contains('is-open');

  const setOpen = (open) => {
    root.classList.toggle('is-open', open);
    if (open) {
      root.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      root.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (form instanceof HTMLFormElement) form.reset();
      if (statusEl) {
        statusEl.classList.remove('is-visible');
        statusEl.textContent = '';
      }
      if (lastTrigger instanceof HTMLElement) lastTrigger.focus();
      lastTrigger = null;
    }
  };

  const applyTrigger = (trigger) => {
    const ds = trigger.dataset;
    if (titleEl) titleEl.textContent = ds.requestModalTitle || defaultTitle;
    if (leadEl) leadEl.textContent = ds.requestModalLead || defaultLead;
    if (contextField instanceof HTMLInputElement) {
      contextField.value = ds.requestModalContext || '';
    }
  };

  const openFromTrigger = (trigger) => {
    lastTrigger = trigger;
    closeFeedbackWidget();
    applyTrigger(trigger);
    setOpen(true);
    const first = form?.querySelector(
      'input:not([type="hidden"]):not([type="checkbox"]), textarea'
    );
    if (first instanceof HTMLElement) queueMicrotask(() => first.focus());
  };

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const trigger = t.closest('[data-request-modal-open]');
    if (!trigger) return;
    e.preventDefault();
    openFromTrigger(trigger);
  });

  for (const el of closeEls) {
    el.addEventListener('click', () => {
      if (isOpen()) setOpen(false);
    });
  }

  document.addEventListener(
    'keydown',
    (e) => {
      if (!isOpen() || e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    },
    true
  );

  if (form instanceof HTMLFormElement) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      window.dispatchEvent(
        new CustomEvent('energo:request-modal-submit', {
          bubbles: true,
          detail: { formData: fd, context: String(fd.get('context') || '') },
        })
      );
      if (statusEl) {
        statusEl.textContent =
          'Заявка принята локально. Подключите обработчик к событию energo:request-modal-submit или action формы на бэкенде.';
        statusEl.classList.add('is-visible');
      }
    });
  }
}
