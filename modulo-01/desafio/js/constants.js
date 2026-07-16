export const STORAGE_KEYS = Object.freeze({
  CLIENTS: 'petcare_clients_v2',
  CART:    'petcare_cart_v2',
});

export const PRODUCTS = Object.freeze([
  { id: 1,  name: 'Ração Golden Special Cães Adultos Frango e Carne 15kg', price: 149.90, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop' },
  { id: 2,  name: 'Ração Golden Gatos Castrados Frango 3kg',               price: 49.90,  image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop' },
  { id: 3,  name: 'Ração GranPlus Choice Gatos Adultos 10kg',              price: 138.90, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop' },
  { id: 4,  name: 'Ração Golden Gatos Castrados Salmão 3kg',               price: 49.90,  image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop' },
  { id: 5,  name: 'Ração Golden Formula Cães Raças Pequenas 3kg',          price: 35.90,  image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&auto=format&fit=crop' },
  { id: 6,  name: 'Ração Golden Formula Cães Adultos Carne 15kg',          price: 135.90, image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=500&auto=format&fit=crop' },
  { id: 7,  name: 'Brinquedo Osso de Borracha Resistente',                 price: 25.50,  image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop' },
  { id: 8,  name: 'Cama Pet Confortável Tamanho M',                        price: 119.90, image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500&auto=format&fit=crop' },
  { id: 9,  name: 'Coleira Peitoral com Guia Refletiva',                   price: 59.90,  image: 'https://images.unsplash.com/photo-1601323389467-3a1376dc3cfa?w=500&auto=format&fit=crop' },
  { id: 10, name: 'Shampoo Pet Neutro 500ml',                              price: 32.90,  image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop' },
]);

export const VALIDATION = Object.freeze({
  TUTOR_NAME_MIN:         3,
  TUTOR_ADDRESS_MIN:      5,
  PET_NAME_MIN:           2,
  PHONE_FORMATTED_LENGTH: 14,
  MESSAGES: Object.freeze({
    tutorName:    'Nome deve ter pelo menos 3 caracteres.',
    tutorPhone:   'Informe um telefone válido. Ex: (00) 00000-0000.',
    tutorAddress: 'Informe o endereço completo.',
    serviceDate:  'Selecione a data de atendimento.',
    servicePast:  'A data de atendimento não pode ser no passado.',
    petName:      'Nome do animal deve ter pelo menos 2 caracteres.',
    petAge:       'A idade do animal é obrigatória.',
    petSize:      'Selecione o porte do animal.',
  }),
});

export const TOAST = Object.freeze({
  DURATION_MS:       3500,
  ANIMATION_DELAY_MS: 50,
  TYPES: Object.freeze({
    success: Object.freeze({ title: 'Sucesso!', icon: 'ph-fill ph-check-circle',  color: '#10b981', borderColor: '#10b981' }),
    error:   Object.freeze({ title: 'Erro!',    icon: 'ph-fill ph-warning-circle', color: '#ef4444', borderColor: '#ef4444' }),
  }),
});

export const DATE_FORMAT = Object.freeze({
  day: '2-digit', month: 'short', year: 'numeric',
});

export const LOCALE = 'pt-BR';

export const SELECTORS = Object.freeze({
  NAV_LINKS:           '.nav-links',
  NAV_BTN_WITH_TARGET: '.nav-btn[data-target]',
  TAB_CONTENT:         '.tab-content',
  INPUT_WRAPPER:       '.input-wrapper',
  ERROR_MESSAGE:       '.error-message',
  CART_SIDEBAR:        '#cart-sidebar',
  CART_BACKDROP:       '#cart-backdrop',
  CART_BADGE:          '#cart-badge',
  CART_ITEMS:          '#cart-items-container',
  CART_TOTAL:          '#cart-total-price',
  CART_OPEN_BTN:       '#open-cart-btn',
  CART_CLOSE_BTN:      '#close-cart-btn',
  CART_CHECKOUT_BTN:   '#checkout-btn',
  CLIENT_MODAL:        '#client-modal',
  MODAL_CLOSE_BTN:     '#close-modal',
  TOAST:               '#toast-notification',
  TOAST_MESSAGE:       '#toast-message',
  CLIENTS_GRID:        '#clients-grid',
  PRODUCTS_GRID:       '#products-grid',
  CLIENT_FORM:         '#client-form',
  PHONE_INPUT:         '#tutorPhone',
  FORM_CANCEL_BTN:     '#form-cancel-btn',
  FORM_SUBMIT_TEXT:    '#form-submit-text',
  MODAL_EDIT_BTN:      '#modal-edit-btn',
  MODAL_DELETE_BTN:    '#modal-delete-btn',
});
