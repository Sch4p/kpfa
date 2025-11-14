<template>
  <div class="container py-5 text-center">
    <h3>Mock Payment Gateway</h3>
    <p>Simulating Opay checkout.</p>
    <p>Your transaction reference: <strong>{{ reference }}</strong></p>

    <div class="mt-4">
      <button class="btn btn-success me-2" @click="simulatePayment('SUCCESS')">Simulate Success</button>
      <button class="btn btn-danger me-2" @click="simulatePayment('FAILED')">Simulate Failure</button>
      <button class="btn btn-secondary" @click="goHome">Back Home</button>
    </div>

    <div v-if="loading" class="mt-3">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Processing payment...</p>
    </div>

    <div v-if="error" class="mt-3 text-danger">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MockPayment",
  props: {
    reference: { type: String, required: false } // pass transaction reference as prop
  },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  methods: {
    async simulatePayment(status) {
  this.loading = true;
  this.error = null;
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/payments/candidate/mock-confirm/",
      {
        reference: this.reference,
        status: status
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (res.data.redirect_url) {
      window.location.href = res.data.redirect_url;
    } else {
      this.error = "No redirect URL returned from server.";
    }
  } catch (err) {
    console.error("Error confirming payment:", err);
    this.error = "Error confirming payment.";
  } finally {
    this.loading = false;
  }
},

    goHome() {
      window.location.href = "/"; // or frontend home path
    }
  },
  mounted() {
    console.log("Mock payment reference prop:", this.reference);
  }
};
</script>
