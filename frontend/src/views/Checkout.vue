<!-- src/views/Checkout.vue -->
<template>
  <div class="container py-5">
    <h2 class="fw-bold text-danger mb-4">Checkout</h2>

    <!-- Auth Loading -->
    <div v-if="isLoadingAuth" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="mt-3 text-muted">Checking authentication...</p>
    </div>

    <!-- Authentication Check -->
    <div v-else-if="!isAuthenticated" class="alert alert-warning">
      Please
      <router-link
        :to="{ path: '/fan-auth', query: { redirect: $route.fullPath } }"
        class="ms-1 text-primary"
      >
        log in
      </router-link>
      to complete your purchase.
    </div>

    <!-- Empty Cart -->
    <div v-else-if="!cartItems.length" class="text-center py-5">
      <p class="lead text-muted">
        Your cart is empty. Please add items before checkout.
      </p>
      <router-link to="/eshop" class="btn btn-danger">
        Back to Shop
      </router-link>
    </div>

    <!-- Checkout Form -->
    <form v-else @submit.prevent="submitOrder" novalidate>
      <div class="row g-4">
        <!-- Shipping & Payment -->
        <div class="col-md-7">
          <div class="card p-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3 text-secondary">Shipping Details</h5>

            <div class="mb-3">
              <label class="form-label">Full Name *</label>
              <input v-model.trim="form.full_name" type="text" class="form-control" required />
              <div v-if="errors.full_name" class="form-text text-danger">{{ errors.full_name }}</div>
            </div>

            <div class="mb-3">
              <label class="form-label">Phone Number *</label>
              <input
                v-model.trim="form.phone"
                type="tel"
                class="form-control"
                placeholder="+2348012345678"
                required
              />
              <div v-if="errors.phone" class="form-text text-danger">{{ errors.phone }}</div>
              <small class="text-muted">
                Accepts international formats (e.g. +234, +233, +229, +225, +227, +228).
              </small>
            </div>

            <div class="mb-3">
              <label class="form-label">Email *</label>
              <input v-model.trim="form.email" type="email" class="form-control" required />
              <div v-if="errors.email" class="form-text text-danger">{{ errors.email }}</div>
            </div>

            <div class="mb-3">
              <label class="form-label">Shipping Address *</label>
              <textarea v-model.trim="form.shipping_address" class="form-control" rows="3" required></textarea>
              <div v-if="errors.shipping_address" class="form-text text-danger">
                {{ errors.shipping_address }}
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Payment Method *</label>
              <select v-model="form.payment_method" class="form-select" required>
                <option value="">Select Payment Method</option>
                <option value="BANK_TRANSFER">Bank Transfer / Opay</option>
                <option value="MONIEPOINT" disabled>Moniepoint</option>
                <option value="MOMOGH" disabled>MTN Mobile Money Ghana</option>
                <option value="COD">Cash on Delivery</option>
              </select>
              <div v-if="errors.payment_method" class="form-text text-danger">
                {{ errors.payment_method }}
              </div>
            </div>

            <!-- Bank Transfer Proof Upload -->
            <div v-if="form.payment_method === 'BANK_TRANSFER'" class="mt-3">
              <label class="form-label fw-semibold">Upload Proof of Payment *</label>
              <input
                ref="fileInput"
                type="file"
                @change="handleFileUpload"
                class="form-control"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <small class="text-muted">
                Max size: 2MB. Allowed formats: JPG, PNG, PDF.
              </small>
              <div v-if="fileError" class="text-danger small mt-1">{{ fileError }}</div>
            </div>

            <div class="mt-3">
              <label class="form-label">Notes (optional)</label>
              <textarea v-model.trim="form.notes" class="form-control" rows="2"></textarea>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="col-md-5">
          <div class="card p-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3 text-secondary">Order Summary</h5>

            <ul class="list-group list-group-flush mb-3">
              <li
                v-for="item in cartItems"
                :key="item.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div class="d-flex align-items-center">
                  <img
                    v-if="item.image"
                    :src="imageUrl(item.image)"
                    alt=""
                    style="width:48px;height:48px;object-fit:cover;border-radius:6px;margin-right:.75rem"
                  />
                  <div>
                    <strong class="d-block small">{{ item.name }}</strong>
                    <small class="text-muted">x{{ item.qty }}</small>
                  </div>
                </div>
                <span>₦{{ formatPrice(item.price * item.qty) }}</span>
              </li>
            </ul>

            <div class="d-flex justify-content-between fw-bold border-top pt-3">
              <span>Total:</span>
              <span>₦{{ formatPrice(cartSubtotal) }}</span>
            </div>

            <div v-if="form.payment_method === 'BANK_TRANSFER'" class="mt-3">
              <div class="alert alert-info small">
                Please complete the transfer to our designated provider (Opay/Moniepoint/Bank).
                Upload the receipt above.
                <div class="mt-2">
                  <strong>Note:</strong> Payment instructions will be sent to your email once the
                  order is created.
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-danger w-100 mt-4" :disabled="loading">
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {{ loading ? "Processing..." : "Place Order" }}
            </button>
          </div>
        </div>
      </div>
    </form>

    <div v-if="successMessage" class="alert alert-success mt-4">{{ successMessage }}</div>
    <div v-if="submitError" class="alert alert-danger mt-4">{{ submitError }}</div>
  </div>
</template>


<script>
import axios from "axios";
 
export default {
  /* eslint-disable vue/multi-word-component-names */
  name: "Checkout",
  data() {
    return {
      isLoadingAuth: true,
      token: null,
      cartItems: [],
      form: {
        full_name: "",
        phone: "", 
        email: "",
        shipping_address: "",
        payment_method: "",
        notes: "",
      },
      paymentProofFile: null,
      fileError: "",
      loading: false,
      submitError: "",
      successMessage: "",
      errors: {},
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.token;
    },
    cartSubtotal() {
      return this.cartItems.reduce(
        (s, i) => s + (Number(i.price || 0) * Number(i.qty || 0)),
        0
      );
    },
  },
  methods: {
    /**
     * checkAuthStatus:
     * - Reads token from localStorage
     * - Sets axios default Authorization header (optional but helpful)
     * - Marks auth loading complete
     */
    checkAuthStatus() {
      //this.token = localStorage.getItem("authToken") || null;
      this.token = localStorage.getItem("token") || null;

      // If a token exists, set default axios header to avoid adding it everywhere.
      // (You can remove this if you prefer adding header per-request.)
      if (this.token) {
        axios.defaults.headers.common["Authorization"] = `Token ${this.token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }

      this.isLoadingAuth = false;
    },

    loadCart() {
      try {
        const raw = localStorage.getItem("kpfa_cart");
        this.cartItems = raw ? JSON.parse(raw) : [];
      } catch {
        this.cartItems = [];
      }
    },

    validateForm() {
      this.errors = {};
      if (!this.form.full_name) this.errors.full_name = "Full name is required.";
      if (!this.form.phone) this.errors.phone = "Phone is required.";
      if (!this.form.email) this.errors.email = "Email is required.";
      if (!this.form.shipping_address)
        this.errors.shipping_address = "Shipping address is required.";
      if (!this.form.payment_method)
        this.errors.payment_method = "Please select a payment method.";
      if (this.form.payment_method === "BANK_TRANSFER" && !this.paymentProofFile)
        this.errors.payment_proof = "Payment proof required.";
      return Object.keys(this.errors).length === 0;
    },

    handleFileUpload(e) {
      this.fileError = "";
      const f = e.target.files[0];
      if (!f) return;
      const allowed = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
      if (!allowed.includes(f.type)) {
        this.fileError = "Invalid file type. Please upload JPG, PNG or PDF.";
        if (this.$refs.fileInput) this.$refs.fileInput.value = "";
        return;
      }
      if (f.size > 2 * 1024 * 1024) {
        this.fileError = "File too large. Max size 2 MB.";
        if (this.$refs.fileInput) this.$refs.fileInput.value = "";
        return;
      }
      this.paymentProofFile = f;
    },

    imageUrl(src) {
      if (!src) return "";
      if (src.startsWith("http")) return src;
      return `${window.location.origin}/${src}`;
    },

    formatPrice(v) {
      return Number(v).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

async submitOrder() {
  if (this.loading) return;

  // ✅ Retrieve token freshly from localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in before placing an order.");
    this.$router.push({ name: "Login" });
    return;
  }

  // ✅ Build payload correctly from `form`
  const payload = {
    full_name: this.form.full_name,
    phone: this.form.phone,
    email: this.form.email,
    shipping_address: this.form.shipping_address,
    payment_method: this.form.payment_method,
    notes: this.form.notes,
    order_items: this.cartItems.map((item) => ({
      item: item.id,
      quantity: item.qty,
    })),
  };

  try {
    this.loading = true;

   
    console.log("🛰️ Order payload being sent:", payload);
    const res = await axios.post(
      "http://127.0.0.1:8000/api/orders/",
      payload,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
   

    console.log("✅ Order response:", res.data);
    alert("🎉 Order placed successfully!");

    // ✅ Clear cart properly
    this.cartItems = [];
    localStorage.removeItem("kpfa_cart");

    
    
    this.successMessage = "Your order has been placed successfully!"; 
     // Redirect to Order Summary page with order ID
  console.log("Redirecting to:", `/order-summary/${res.data.id}`);
  if (res.status === 201) {
    this.$router.push({ name: "OrderSummary", params: { id: res.data.id } });
}
   
    
  } catch (error) {
    console.error("❌ Order error:", error.res?.data || error.message);
    if (error.res?.status === 401) {
      alert("Your session has expired. Please log in again.");
      this.$router.push({ name: "Login" });
    } else {
      alert("Failed to place order. Please try again.");
    }
  } finally {
    this.loading = false;
  }
}



  },


  mounted() {
    // Load cart immediately (UI can show empty cart quickly if no items)
    this.loadCart();

    // Start by checking auth (this will set isLoadingAuth = false when done)
    this.checkAuthStatus();

    // Listen for storage changes coming from other tabs / login page.
    // Some login implementations set localStorage then redirect back to same tab,
    // while others open a new tab — this covers both.
    window.addEventListener("storage", this.checkAuthStatus);
  },

  beforeUnmount() {
    window.removeEventListener("storage", this.checkAuthStatus);
  },
};
</script>

<style scoped>
.card {
  border-radius: 0.6rem;
}
.btn-danger {
  background-color: #b30000;
  border-color: #b30000;
}
.btn-danger:hover {
  background-color: #8f0000;
  border-color: #8f0000;
}
.list-group-item img {
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.form-text.text-danger {
  margin-top: 0.25rem;
}
@media (max-width: 768px) {
  .card {
    padding: 1rem;
  }
}
</style>
