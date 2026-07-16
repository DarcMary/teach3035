import { SELECTORS } from './constants.js';
import { UI }       from './ui.js';
import { Clients }  from './clients.js';
import { Products } from './products.js';
import { Cart }     from './cart.js';
import { Modal }    from './modal.js';
import { Toast }    from './toast.js';

const init = () => {
  // Initialize UI components first
  UI.init();
  Toast.init();
  Modal.init();
  Cart.init();

  // Initial render operations
  Cart.syncBadge();
  Products.render();

  // Initialize clients grid and form
  const clientForm = document.querySelector(SELECTORS.CLIENT_FORM);
  if (clientForm) Clients.init(clientForm);
  Clients.render();
};

document.addEventListener('DOMContentLoaded', init);
