import { TOAST, SELECTORS } from './constants.js';

let toastEl, messageEl, titleEl, iconEl, hideTimeout;

const cacheRefs = () => {
  toastEl   = document.querySelector(SELECTORS.TOAST);
  messageEl = document.querySelector(SELECTORS.TOAST_MESSAGE);
  titleEl   = toastEl.querySelector('h4');
  iconEl    = toastEl.querySelector('.toast-icon');
};

const applyType = (type) => {
  const config = TOAST.TYPES[type] ?? TOAST.TYPES.success;
  toastEl.style.borderInlineStartColor = config.borderColor;
  iconEl.className                     = `${config.icon} toast-icon`;
  iconEl.style.color                   = config.color;
  titleEl.textContent                  = config.title;
};

export const Toast = Object.freeze({
  init() {
    cacheRefs();
  },

  show(message, type = 'success') {
    clearTimeout(hideTimeout);
    messageEl.textContent = message;
    applyType(type);
    toastEl.classList.remove('show');

    setTimeout(() => {
      toastEl.classList.add('show');
      hideTimeout = setTimeout(() => toastEl.classList.remove('show'), TOAST.DURATION_MS);
    }, TOAST.ANIMATION_DELAY_MS);
  },
});
