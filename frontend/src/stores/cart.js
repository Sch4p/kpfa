// src/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('kpfa_cart') || '[]'), // { id, name, price, qty, image, variant? }
  }),
  getters: {
    totalQuantity: (state) => state.items.reduce((s, i) => s + i.qty, 0),
    subtotal: (state) => state.items.reduce((s, i) => s + i.price * i.qty, 0),
  },
  actions: {
 addToCart(item) {
  try {
    const cart = useCartStore(); // get store instance
    if (!item || !item.id) {
      alert("Item not available.");
      return;
    }
    cart.addToCart({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price) || 0,
      image: item.image,
    });
    alert(`${item.name} added to cart`);
  } catch (err) {
    console.error("Cart error:", err);
  }
  },
    removeItem(itemId) {
      this.items = this.items.filter(i => i.id !== itemId);
      this.save();
    },
    updateQty(itemId, qty) {
      const it = this.items.find(i => i.id === itemId);
      if (it) it.qty = qty;
      this.save();
    },
    clear() {
      this.items = [];
      this.save();
    },
    save() {
      localStorage.setItem('kpfa_cart', JSON.stringify(this.items));
    },
    load() {
      const raw = localStorage.getItem('kpfa_cart');
      if (raw) this.items = JSON.parse(raw);
    },
  },
});
