import { STORAGE_KEYS } from './constants.js';

const safeParse = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const Storage = Object.freeze({
  get:   (key)        => safeParse(localStorage.getItem(key)),
  set:   (key, data)  => { if (Array.isArray(data)) localStorage.setItem(key, JSON.stringify(data)); },
  clear: (key)        => localStorage.removeItem(key),
});

export const ClientStorage = Object.freeze({
  getAll: ()        => Storage.get(STORAGE_KEYS.CLIENTS),
  save:   (clients) => Storage.set(STORAGE_KEYS.CLIENTS, clients),
  add(client) {
    const clients = ClientStorage.getAll();
    clients.push(client);
    ClientStorage.save(clients);
  },
  update(id, updatedClient) {
    const clients = ClientStorage.getAll();
    const index = clients.findIndex((c) => String(c.id) === String(id));
    if (index !== -1) {
      clients[index] = { ...clients[index], ...updatedClient };
      ClientStorage.save(clients);
    }
  },
  remove(id) {
    const clients = ClientStorage.getAll().filter((c) => String(c.id) !== String(id));
    ClientStorage.save(clients);
  },
});

export const CartStorage = Object.freeze({
  getAll: ()      => Storage.get(STORAGE_KEYS.CART),
  save:   (cart)  => Storage.set(STORAGE_KEYS.CART, cart),
  clear:  ()      => Storage.clear(STORAGE_KEYS.CART),
  add(item) {
    const cart = CartStorage.getAll();
    cart.push(item);
    CartStorage.save(cart);
  },
  remove(cartId) {
    const updated = CartStorage.getAll().filter((item) => String(item.cartId) !== String(cartId));
    CartStorage.save(updated);
  },
});
