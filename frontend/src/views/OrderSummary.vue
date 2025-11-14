<!-- src/views/OrderSummary.vue -->
<template>
  <div class="container my-5">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
      <p class="mt-3">Loading order summary...</p>
    </div>

    <div v-else-if="order">
      <h2 class="mb-4 text-center">Order Summary</h2>

      <!-- Customer Info -->
      <div class="card shadow-sm p-4 mb-4">
        <h5>Order ID: {{ order.id }}</h5>
        <p><strong>Date:</strong> {{ new Date(order.created_at).toLocaleString() }}</p>
        <p><strong>Full Name:</strong> {{ order.full_name || "—" }}</p>
        <p><strong>Phone:</strong> {{ order.phone || "—" }}</p>
        <p><strong>Email:</strong> {{ order.email || "—" }}</p>
        <p><strong>Payment Method:</strong> {{ order.payment_method }}</p>
        <p><strong>Shipping Address:</strong> {{ order.shipping_address }}</p>
        <p><strong>Notes:</strong> {{ order.notes || "—" }}</p>
      </div>

      <!-- Ordered Items -->
      <div class="card shadow-sm p-4">
        <h5 class="mb-3">Items</h5>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal (₦)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.order_items" :key="item.id">
              <td>{{ item.item_name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.subtotal.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>

        <div class="text-end mt-3">
          <h4>Total: ₦{{ order.total_amount.toLocaleString() }}</h4>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-5">
        <router-link to="/" class="btn btn-success px-4">
          Back to Home
        </router-link>
      </div>
    </div>

    <div v-else class="alert alert-danger text-center mt-5">
      Failed to load order details.
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderSummary",
  props: ["id"],
  data() {
    return {
      order: null,
      loading: true,
    };
  },
  async mounted() {
    const token = localStorage.getItem("token"); // ✅ correct token key

    if (!token) {
      console.error("❌ No authentication token found. Redirecting to login...");
      this.$router.push("/fan-auth");
      return;
    }

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/orders/${this.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      console.log("✅ Order details fetched:", res.data);
      this.order = res.data;
    } catch (err) {
      console.error("❌ Order fetch failed:", err.response ? err.response.data : err);
      if (err.response && err.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        this.$router.push("/fan-auth");
      }
    } finally {
      this.loading = false;
    }
  },
};
</script>
