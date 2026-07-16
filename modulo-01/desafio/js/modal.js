import { SELECTORS } from './constants.js';
import { formatDate, sanitizeText } from './utils.js';

let modalEl, closeBtnEl, editBtnEl, deleteBtnEl, lastFocusedEl, currentClient, onEditCb, onDeleteCb;

const OPEN_CLASS = 'open';

const FIELD_MAP = [
  ['modal-pet-name',      'petName'],
  ['modal-tutor-name',    'tutorName'],
  ['modal-tutor-phone',   'tutorPhone'],
  ['modal-tutor-address', 'tutorAddress'],
  ['modal-service-date',  'serviceDate'],
  ['modal-pet-age',       'petAge'],
  ['modal-pet-size',      'petSize'],
];

const populateFields = (client) => {
  FIELD_MAP.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = key === 'serviceDate'
      ? formatDate(sanitizeText(client[key]))
      : sanitizeText(client[key]);
  });
};

const openModal = () => {
  modalEl.classList.add(OPEN_CLASS);
  modalEl.setAttribute('aria-hidden', 'false');
  closeBtnEl.focus();
};

export const Modal = Object.freeze({
  init() {
    modalEl       = document.querySelector(SELECTORS.CLIENT_MODAL);
    closeBtnEl    = document.querySelector(SELECTORS.MODAL_CLOSE_BTN);
    editBtnEl     = document.querySelector(SELECTORS.MODAL_EDIT_BTN);
    deleteBtnEl   = document.querySelector(SELECTORS.MODAL_DELETE_BTN);

    closeBtnEl.addEventListener('click', Modal.close);
    modalEl.addEventListener('click', ({ target }) => { if (target === modalEl) Modal.close(); });
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape' && modalEl.classList.contains(OPEN_CLASS)) Modal.close();
    });

    editBtnEl?.addEventListener('click', () => onEditCb?.(currentClient));
    deleteBtnEl?.addEventListener('click', () => onDeleteCb?.(currentClient));
  },

  onEdit(cb) { onEditCb = cb; },
  onDelete(cb) { onDeleteCb = cb; },

  open(client) {
    currentClient = client;
    lastFocusedEl = document.activeElement;
    populateFields(client);
    openModal();
  },
  
  close() {
    modalEl.classList.remove(OPEN_CLASS);
    modalEl.setAttribute('aria-hidden', 'true');
    currentClient = null;
    lastFocusedEl?.focus();
  }
});
