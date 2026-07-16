import { SELECTORS } from './constants.js';
import { CartStorage } from './storage.js';
import { PRODUCTS }    from './constants.js';
import { formatCurrency, sanitizeText, generateId, createIcon } from './utils.js';
import { Toast } from './toast.js';

let sidebarEl, backdropEl, badgeEl, containerEl, totalEl;

const OPEN_CLASS = 'open';

const setSidebarOpen = (open) => {
  sidebarEl.classList.toggle(OPEN_CLASS, open);
  backdropEl.classList.toggle(OPEN_CLASS, open);
  sidebarEl.setAttribute('aria-hidden', String(!open));
  if (open) renderItems();
};

const animateBadge = () => {
  badgeEl.style.transform = 'scale(1.4)';
  setTimeout(() => { badgeEl.style.transform = ''; }, 200);
};

const syncBadge = () => {
  const count = CartStorage.getAll().length;
  badgeEl.textContent = String(count);
  animateBadge();
};

const createEmptyState = () => {
  const el = document.createElement('div');
  el.className = 'cart-empty-state';
  el.append(createIcon('ph ph-shopping-cart'), Object.assign(document.createElement('p'), { textContent: 'Seu carrinho está vazio.' }));
  return el;
};

const createCartItem = (item) => {
  const safeName  = sanitizeText(item.name);
  const safeImage = sanitizeText(item.image);

  const img = Object.assign(document.createElement('img'), {
    src: safeImage, alt: safeName, className: 'cart-item-img', loading: 'lazy',
  });

  const title = Object.assign(document.createElement('div'), { className: 'cart-item-title', textContent: safeName });
  const price = Object.assign(document.createElement('div'), { className: 'cart-item-price', textContent: formatCurrency(item.price) });

  const info = document.createElement('div');
  info.className = 'cart-item-info';
  info.append(title, price);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'btn-remove-item';
  removeBtn.setAttribute('aria-label', `Remover ${safeName} do carrinho`);
  removeBtn.dataset.cartId = String(item.cartId);
  removeBtn.appendChild(createIcon('ph-bold ph-trash'));

  const article = document.createElement('article');
  article.className = 'cart-item fade-in';
  article.append(img, info, removeBtn);
  return article;
};

const renderItems = () => {
  const cart = CartStorage.getAll();
  containerEl.innerHTML = '';

  if (cart.length === 0) {
    containerEl.appendChild(createEmptyState());
    totalEl.textContent = formatCurrency(0);
    return;
  }

  const fragment = document.createDocumentFragment();
  let total = 0;
  cart.forEach((item) => {
    total += Number(item.price) || 0;
    fragment.appendChild(createCartItem(item));
  });

  containerEl.appendChild(fragment);
  totalEl.textContent = formatCurrency(total);
};

const onContainerClick = ({ target }) => {
  const btn = target.closest('.btn-remove-item');
  if (!btn) return;
  CartStorage.remove(btn.dataset.cartId);
  syncBadge();
  renderItems();
};

const onCheckout = () => {
  if (CartStorage.getAll().length === 0) {
    Toast.show('Adicione itens ao carrinho primeiro.', 'error');
    return;
  }
  CartStorage.clear();
  syncBadge();
  setSidebarOpen(false);
  Toast.show('Compra finalizada com sucesso! Agradecemos a preferência.');
};

export const Cart = Object.freeze({
  init() {
    sidebarEl   = document.querySelector(SELECTORS.CART_SIDEBAR);
    backdropEl  = document.querySelector(SELECTORS.CART_BACKDROP);
    badgeEl     = document.querySelector(SELECTORS.CART_BADGE);
    containerEl = document.querySelector(SELECTORS.CART_ITEMS);
    totalEl     = document.querySelector(SELECTORS.CART_TOTAL);

    document.querySelector(SELECTORS.CART_OPEN_BTN).addEventListener('click',  () => setSidebarOpen(true));
    document.querySelector(SELECTORS.CART_CLOSE_BTN).addEventListener('click', () => setSidebarOpen(false));
    backdropEl.addEventListener('click', () => setSidebarOpen(false));
    containerEl.addEventListener('click', onContainerClick);
    document.querySelector(SELECTORS.CART_CHECKOUT_BTN).addEventListener('click', onCheckout);
  },

  add(productId) {
    const product = PRODUCTS.find(({ id }) => id === productId);
    if (!product) return;
    CartStorage.add({ ...product, cartId: generateId() });
    syncBadge();
    renderItems();
    Toast.show(`"${sanitizeText(product.name)}" adicionado ao carrinho!`);
  },

  syncBadge,
});
