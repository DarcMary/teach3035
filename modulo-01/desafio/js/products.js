import { PRODUCTS, SELECTORS } from './constants.js';
import { formatCurrency, sanitizeText, createIcon } from './utils.js';
import { Cart } from './cart.js';

const createProductCard = (product, index) => {
  const safeName  = sanitizeText(product.name);
  const safeImage = sanitizeText(product.image);

  const img = Object.assign(document.createElement('img'), {
    src: safeImage, alt: safeName, className: 'product-img', loading: 'lazy', decoding: 'async',
  });

  const imgWrapper = Object.assign(document.createElement('div'), { className: 'product-img-wrapper' });
  imgWrapper.appendChild(img);

  const title = Object.assign(document.createElement('h4'), { className: 'product-title', textContent: safeName });
  const price = Object.assign(document.createElement('div'), { className: 'product-price', textContent: formatCurrency(product.price) });

  const btn = document.createElement('button');
  btn.className = 'btn-buy';
  btn.setAttribute('aria-label', `Adicionar ${safeName} ao carrinho`);
  btn.append(createIcon('ph-bold ph-shopping-cart-simple'), ' Adicionar');
  btn.addEventListener('click', () => Cart.add(product.id));

  const info = Object.assign(document.createElement('div'), { className: 'product-info' });
  info.append(title, price, btn);

  const article = Object.assign(document.createElement('article'), { className: 'product-card fade-in' });
  article.style.animationDelay = `${index * 0.07}s`;
  article.append(imgWrapper, info);

  return article;
};

export const Products = Object.freeze({
  render() {
    const grid = document.querySelector(SELECTORS.PRODUCTS_GRID);
    if (!grid) return;
    const fragment = document.createDocumentFragment();
    PRODUCTS.forEach((product, i) => fragment.appendChild(createProductCard(product, i)));
    grid.appendChild(fragment);
  },
});
