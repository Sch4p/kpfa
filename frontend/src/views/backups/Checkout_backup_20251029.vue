<!-- src/views/Checkout.vue -->
<template>
  <div class="container py-5">
    <h2 class="fw-bold text-danger mb-4">Checkout</h2>

    <div v-if="!cart.items.length" class="text-center py-5">
      <p class="lead text-muted">Your cart is empty.</p>
      <router-link to="/eshop" class="btn btn-danger mt-3">Back to Shop</router-link>
    </div>

    <div v-else>
      <form @submit.prevent="submitOrder" novalidate>
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label fw-semibold">Full Name</label>
            <input v-model.trim="form.name" type="text" class="form-control" required />
            <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Email</label>
            <input v-model.trim="form.email" type="email" class="form-control" required />
            <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">Phone</label>
            <input
              v-model.trim="form.phone"
              type="text"
              class="form-control"
              placeholder="+2348012345678"
              required
            />
            <small v-if="errors.phone" class="text-danger">{{ errors.phone }}</small>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-semibold">City</label>
            <input v-model.trim="form.city" type="text" class="form-control" required />
            <small v-if="errors.city" class="text-danger">{{ errors.city }}</small>
          </div>

          <div class="col-12">
            <label class="form-label fw-semibold">Delivery Address</label>
            <textarea v-model.trim="form.address" class="form-control" rows="3" required></textarea>
            <small v-if="errors.address" class="text-danger">{{ errors.address }}</small>
          </div>

          <!-- Payment Method -->
          <div class="col-md-6">
            <label class="form-label fw-semibold">Payment Method</label>
            <select v-model="form.payment_method" class="form-select" required>
              <option value="">Select payment method</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <small v-if="errors.payment_method" class="text-danger">{{ errors.payment_method }}</small>
          </div>

          <!-- Bank Transfer Details -->
          <div v-if="form.payment_method === 'bank_transfer'" class="col-12 mt-3">
            <div class="border rounded p-3 bg-light">
              <h6 class="fw-bold text-danger">Bank Transfer Details</h6>
              <p class="mb-1"><strong>Bank:</strong> Zenith Bank</p>
              <p class="mb-1"><strong>Account Name:</strong> KPFA Football Academy</p>
              <p><strong>Account Number:</strong> 1234567890</p>

              <label class="form-label fw-semibold">Transaction ID / Proof</label>
              <input
                v-model.trim="form.transaction_id"
                type="text"
                class="form-control"
                placeholder="Enter transaction reference"
              />
              <small v-if="errors.transaction_id" class="text-danger">{{ errors.transaction_id }}</small>
            </div>
          </div>

          <!-- COD Notice -->
          <div v-if="form.payment_method === 'cod'" class="col-12 mt-3">
            <div class="alert alert-info">
              Please prepare exact cash for the delivery agent upon arrival.
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center border-top pt-3">
          <h5 class="fw-bold mb-0">Total: ₦{{ formatPrice(cart.subtotal) }}</h5>
          <button type="submit" class="btn btn-danger" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            Confirm Order
          </button>
        </div>
      </form>

      <!-- Feedback Message -->
      <div v-if="message.text" class="alert mt-4" :class="'alert-' + message.type">
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCartStore } from "@/stores/cart";

export default {
  /* eslint-disable vue/multi-word-component-names */
  name: "Checkout",
  data() {
    return {
      cart: useCartStore(),
      loading: false,
      form: {
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        payment_method: "",
        transaction_id: "",
      },
      errors: {},
      message: { text: "", type: "" },
    };
  },
  methods: {
    formatPrice(val) {
      return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2 });
    },
    validateForm() {
      this.errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{8,15}$/;

      if (!this.form.name.trim()) this.errors.name = "Full name is required.";
      if (!emailRegex.test(this.form.email)) this.errors.email = "Enter a valid email address.";
      if (!phoneRegex.test(this.form.phone)) this.errors.phone = "Enter a valid phone number.";
      if (!this.form.city.trim()) this.errors.city = "City is required.";
      if (!this.form.address.trim()) this.errors.address = "Address is required.";
      if (!this.form.payment_method)
        this.errors.payment_method = "Please select a payment method.";
      if (
        this.form.payment_method === "bank_transfer" &&
        !this.form.transaction_id.trim()
      )
        this.errors.transaction_id = "Transaction reference is required for bank transfers.";

      return Object.keys(this.errors).length === 0;
    },
    sanitizeUrl(url) {
      // whitelist: http, https, or relative URLs
      const regex = /^(https?:\/\/|\/)[\w\-./]+$/;
      return regex.test(url) ? url : "";
    },
    async submitOrder() {
      if (!this.validateForm()) return;

      this.loading = true;
      try {
        const payload = {
          ...this.form,
          items: this.cart.items.map((i) => ({
            id: i.id,
            name: i.name,
            qty: i.qty,
            price: i.price,
          })),
          total: this.cart.subtotal,
        };

        const res = await axios.post("http://127.0.0.1:8000/api/orders/", payload, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 201 || res.status === 200) {
          this.message = {
            text: "Order placed successfully! You’ll receive a confirmation soon.",
            type: "success",
          };
          this.cart.clear();
          this.form = {
            name: "",
            email: "",
            phone: "",
            city: "",
            address: "",
            payment_method: "",
            transaction_id: "",
          };
        } else {
          throw new Error("Unexpected server response");
        }
      } catch (err) {
        console.error("Order submission failed:", err);
        this.message = {
          text:
            err.response?.data?.detail ||
            "Failed to place order. Please check your input or try again later.",
          type: "danger",
        };
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.cart.load();
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
