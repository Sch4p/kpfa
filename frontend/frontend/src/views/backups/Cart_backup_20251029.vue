<!-- src/views/Cart.vue -->
<template>
  <div class="container py-5">
    <h2 class="fw-bold text-danger mb-4">Your Cart</h2>

    <div v-if="!cart.items.length" class="text-center py-5">
      <p class="lead text-muted">Your cart is currently empty.</p>
      <router-link to="/eshop" class="btn btn-danger mt-3">Back to Shop</router-link>
    </div>

    <div v-else>
      <div class="table-responsive mb-4">
        <table class="table align-middle">
          <thead class="table-light">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" :key="item.id">
              <td class="d-flex align-items-center">
                <img
                  v-if="item.image"
                  :src="imageUrl(item.image)"
                  alt="Product image"
                  width="60"
                  height="60"
                  class="rounded me-3 border"
                />
                <div>
                  <strong>{{ item.name }}</strong>
                  <div class="text-muted small">{{ item.variant }}</div>
                </div>
              </td>
              <td>₦{{ formatPrice(item.price) }}</td>
              <td>
                <div class="input-group input-group-sm" style="max-width:120px;">
                  <button class="btn btn-outline-secondary" @click="decreaseQty(item)">−</button>
                  <input
                    type="number"
                    min="1"
                    class="form-control text-center"
                    v-model.number="item.qty"
                    @change="updateQty(item)"
                  />
                  <button class="btn btn-outline-secondary" @click="increaseQty(item)">+</button>
                </div>
              </td>
              <td>₦{{ formatPrice(item.price * item.qty) }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="removeItem(item.id)">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-between align-items-center border-top pt-3">
        <h5 class="mb-0 fw-bold">Total: ₦{{ formatPrice(cart.subtotal) }}</h5>
        <div>
          <button class="btn btn-outline-secondary me-3" @click="cart.clear()">Clear Cart</button>
          <router-link to="/checkout" class="btn btn-danger">Proceed to Checkout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart";

export default {
/* eslint-disable vue/multi-word-component-names */
  name: "Cart",
  data() {
    return {
      cart: useCartStore(),
    };
  },
  methods: {
    formatPrice(val) {
      return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2 });
    },
    imageUrl(src) {
      if (!src) return "";
      if (src.startsWith("http")) return src;
      return window.location.origin + "/" + src;
    },
    increaseQty(item) {
      item.qty++;
      this.cart.updateQty(item.id, item.qty);
    },
    decreaseQty(item) {
      if (item.qty > 1) {
        item.qty--;
        this.cart.updateQty(item.id, item.qty);
      }
    },
    updateQty(item) {
      if (item.qty < 1) item.qty = 1;
      this.cart.updateQty(item.id, item.qty);
    },
    removeItem(id) {
      this.cart.removeItem(id);
    },
  },
  mounted() {
    this.cart.load();
  },
};
</script>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>
