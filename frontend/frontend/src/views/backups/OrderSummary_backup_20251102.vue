<template>
  <div class="container py-5">
    <div class="text-center mb-4">
      <img src="/logo.jpg" alt="KPFA Logo" class="mb-3" style="height:80px" />
      <h2 class="fw-bold text-danger">Order Summary</h2>
      <p class="text-muted">Kutty Philips Football Academy (KPFA) Official eShop</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="mt-3 text-muted">Loading your order...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Order Details -->
    <div v-else-if="order" class="card shadow-sm border-0">
      <div class="card-body p-4">
        <div class="row mb-4">
          <div class="col-md-6">
            <h5 class="fw-bold text-secondary">Order Information</h5>
            <p><strong>Order ID:</strong> #{{ order.id }}</p>
            <p><strong>Status:</strong>
              <span
                :class="{
                  'badge bg-warning text-dark': order.status === 'Pending',
                  'badge bg-success': order.status === 'Completed',
                  'badge bg-danger': order.status === 'Cancelled'
                }"
              >
                {{ order.status }}
              </span>
            </p>
            <p><strong>Date:</strong> {{ formatDate(order.created_at) }}</p>
          </div>

          <div class="col-md-6">
            <h5 class="fw-bold text-secondary">Customer Info</h5>
            <p><strong>Name:</strong> {{ order.full_name }}</p>
            <p><strong>Email:</strong> {{ order.email }}</p>
            <p><strong>Phone:</strong> {{ order.phone }}</p>
            <p><strong>Address:</strong> {{ order.shipping_address }}</p>
          </div>
        </div>

        <h5 class="fw-bold text-secondary mb-3">Items Purchased</h5>
        <div class="table-responsive">
          <table class="table table-bordered align-middle">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price (₦)</th>
                <th>Subtotal (₦)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in order.order_items" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.item_name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatPrice(item.unit_price) }}</td>
                <td>{{ formatPrice(item.unit_price * item.quantity) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="4" class="text-end">Total:</th>
                <th>{{ formatPrice(order.total_amount) }}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="mt-4">
          <p><strong>Payment Method:</strong> {{ formatPayment(order.payment_method) }}</p>
          <p><strong>Payment Status:</strong> {{ order.is_paid ? "Paid" : "Unpaid" }}</p>
          <p v-if="order.notes"><strong>Notes:</strong> {{ order.notes }}</p>
        </div>

        <div class="text-center mt-5">
          <router-link to="/eshop" class="btn btn-danger">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    /* eslint-disable vue/multi-word-component-names */
  name: "OrderSummary",
 
  data() {
    return {
      order: null,
      loading: true,
      error: "",
    };
  },
  methods: {
    async fetchOrder() {
      const orderId = this.$route.params.id;
      if (!orderId) {
        this.error = "No order ID found.";
        this.loading = false;
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        this.error = "Please log in to view your order.";
        this.loading = false;
        return;
      }
      const baseURL = "http://127.0.0.1:8000";

      try {
        const res = await axios.get(`${baseURL}/api/orders/${this.orderId}/`, {
          headers: { Authorization: `Token ${this.token}` },
        });
        this.order = res.data;
      } catch (err) {
        console.error("Failed to fetch order:", err);
        this.error = "Unable to load order details. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },

    formatPrice(v) {
      return Number(v).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    formatPayment(v) {
      const map = {
        COD: "Cash on Delivery",
        BANK_TRANSFER: "Bank Transfer / Opay / Moniepoint",
      };
      return map[v] || v;
    },
  },
  mounted() {
    this.fetchOrder();
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 0.75rem;
}
.table th,
.table td {
  vertical-align: middle;
}
img {
  display: inline-block;
}
</style>
