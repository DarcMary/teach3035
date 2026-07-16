import { SELECTORS } from './constants.js';
import { applyPhoneMask } from './utils.js';

let navBtns, tabSections;

const setCurrentPage = (targetId) => {
  navBtns.forEach((btn) => {
    const isTarget = btn.dataset.target === targetId;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-current', isTarget ? 'page' : 'false');
  });

  tabSections.forEach((section) => {
    const isTarget = section.id === targetId;
    section.classList.remove('fade-in');
    section.classList.toggle('active', isTarget);
    if (isTarget) {
      void section.offsetWidth;
      section.classList.add('fade-in');
    }
  });
};

const onNavClick = ({ target }) => {
  const btn = target.closest(SELECTORS.NAV_BTN_WITH_TARGET);
  if (btn) setCurrentPage(btn.dataset.target);
};

export const UI = Object.freeze({
  init() {
    navBtns      = [...document.querySelectorAll(SELECTORS.NAV_BTN_WITH_TARGET)];
    tabSections  = [...document.querySelectorAll(SELECTORS.TAB_CONTENT)];

    document.querySelector(SELECTORS.NAV_LINKS).addEventListener('click', onNavClick);

    const phoneInput = document.querySelector(SELECTORS.PHONE_INPUT);
    if (phoneInput) applyPhoneMask(phoneInput);
  },

  navigateTo(targetId) {
    setCurrentPage(targetId);
  },
});
