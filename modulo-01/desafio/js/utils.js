import { LOCALE, DATE_FORMAT } from './constants.js';

const currencyFormatter = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: 'BRL' });
const dateFormatter     = new Intl.DateTimeFormat(LOCALE, DATE_FORMAT);

export const formatCurrency = (value) => currencyFormatter.format(value);

export const formatDate = (dateString) =>
  dateString ? dateFormatter.format(new Date(`${dateString}T12:00:00`)) : '';

export const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const sanitizeText = (raw) => {
  const el = document.createElement('div');
  el.textContent = String(raw ?? '');
  return el.textContent;
};

export const createIcon = (className) => {
  const icon = document.createElement('i');
  icon.className = className;
  icon.setAttribute('aria-hidden', 'true');
  return icon;
};

export const applyPhoneMask = (input) => {
  input.addEventListener('input', ({ target }) => {
    const d = target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    target.value = d[2] ? `(${d[1]}) ${d[2]}${d[3] ? `-${d[3]}` : ''}` : d[1];
  });
};
