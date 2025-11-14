<template>
  <div class="container py-5">
    <!-- Loader -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading candidate details...</span>
      </div>
      <p class="mt-3">Loading candidate details...</p>
    </div>

    <!-- Candidate Details -->
    <div v-else-if="candidate" class="card shadow p-4 mx-auto" style="max-width: 600px;">
      <h4 class="mb-3 text-center">Candidate Application Checkout</h4>

      <div class="mb-3">
        <p><strong>Full Name:</strong> {{ candidate.first_name }} {{ candidate.surname }}</p>
        <p><strong>Email:</strong> {{ candidate.email || "N/A" }}</p>
        <p><strong>Phone:</strong> {{ candidate.phone_country_code }} {{ candidate.phone_number }}</p>
        <p><strong>Country:</strong> {{ candidate.country?.name || "N/A" }}</p>
        <p><strong>State:</strong> {{ candidate.state_of_origin?.name || "N/A" }}</p>
        <p><strong>Team:</strong> {{ candidate.team_name || "N/A" }}</p>
      </div>

      <hr />

      <h5 class="mb-3 text-center text-success">Application Fee: ₦10,000</h5>

      <!-- Payment Method -->
      <div class="mb-3 mx-auto" style="max-width: 300px;">
        <label for="paymentMethod" class="form-label fw-bold">Payment Method</label>
        <select
          id="paymentMethod"
          v-model="selectedPayment"
          class="form-select"
        >
          <option disabled value="">Select Payment Option</option>
          <option value="OPAY">Opay</option>
          <option value="BANK">Bank Transfer</option>
        </select>
      </div>

      <!-- Proceed Button -->
      <button
        class="btn btn-primary w-100 mt-2"
        :disabled="!selectedPayment || submitting"
        @click="proceedToPayment"
      >
        <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
        Proceed to Payment
      </button>

      <!-- Feedback -->
      <div v-if="feedback.message" class="alert mt-3" :class="feedback.type" role="alert">
        {{ feedback.message }}
      </div>
    </div>

    <!-- Error Loading Candidate -->
    <div v-else class="text-center text-danger my-5">
      <p> Candidate details could not be loaded.</p>
    </div>
    <div v-if="paymentError" class="alert alert-warning mt-3">
      {{ paymentError }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckOut_Candidate",
  props: {
    candidateId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      candidate: null,
      loading: true,
      submitting: false,
      selectedPayment: "",
      feedback: {
        message: "",
        type: "",
      },
      paymentError: null,
    };
  },
  methods: {
    // ✅ Load candidate details on mount
    async fetchCandidate() {
      this.loading = true;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/candidates/${encodeURIComponent(this.candidateId)}/`
        );
        this.candidate = res.data;
        console.log("✅ Candidate loaded:", this.candidate);
      } catch (error) {
        console.error("❌ Error loading candidate:", error);
        this.feedback = {
          message: "Failed to load candidate details.",
          type: "alert-danger",
        };
      } finally {
        this.loading = false;
      }
    },

    // ✅ Proceed to payment
    async proceedToPayment() {
      this.paymentError = null;
      this.feedback = { message: "", type: "" };

    if (this.submitting) return;

    if (!this.selectedPayment) {
    this.feedback = {
      message: "Please select a payment method.",
      type: "alert-warning",
    };
      return;
  }

  this.submitting = true;
  this.feedback = { message: "", type: "" };
  this.paymentError = null;

  try {
    this.loading = true;

    // Step 1️⃣: Ensure candidate is loaded
    if (!this.candidate) {
      await this.fetchCandidate();
    }

    // Step 2️⃣: Check for existing payment
    const checkRes = await axios.get(
      `http://127.0.0.1:8000/api/payments/candidate/check/${this.candidate.id}/`
    );

    if (checkRes.data.exists) {
      this.paymentError =
        "This candidate already has a payment record. You cannot pay twice.";
      this.loading = false;
      this.submitting = false;
      return;
    }

    console.log("📦 Sending payload:", {
    candidate: this.candidate.id,
    amount: 10000,
    method: this.selectedPayment,
  });
    // Step 3️⃣: Initiate payment
    const paymentRes = await axios.post(
      "http://127.0.0.1:8000/api/payments/candidate/mock-initiate/",
      {
        candidate: this.candidate.id,
        amount: 10000,
        method: this.selectedPayment,
      }
    );

    this.paymentResponse = paymentRes.data;
    console.log("✅ Payment initiated:", this.paymentResponse);

    // ✅ FIX: Extract reference correctly from nested response structure
    const reference = this.paymentResponse?.data?.reference;
    if (!reference) {
      console.error("❌ Missing reference in response:", this.paymentResponse);
      this.paymentError = "Could not generate payment reference. Please retry.";
      this.loading = false;
      this.submitting = false;
      return;
    }

    console.log("Redirecting with reference:", reference);

    // Step 4️⃣: Redirect to Mock Payment Page
    alert("✅ Proceeding to payment gateway...");
    window.location.href = this.paymentResponse.data.opay_mock_url;
  } catch (error) {
    console.error("🔥 Payment error:", error.response?.data || error);

    // Handle network or timeout errors gracefully
    if (error.message.includes("Network Error")) {
      const retry = confirm(
        "⚠️ Network error detected.\nWould you like to retry payment?"
      );
      if (retry) {
        this.submitting = false;
        this.proceedToPayment();
        return;
      }
    }

    this.paymentError =
      error.response?.data?.message ||
      "Payment failed. Please check your internet and try again.";
  } finally {
    this.loading = false;
    this.submitting = false;
  }
}

  },

  // ✅ Load candidate immediately
  mounted() {
    console.log("Candidate ID from route:", this.candidateId);
    this.fetchCandidate();
  },
};
</script>



<style scoped>
.card {
  border-radius: 15px;
}

.form-select {
  border-radius: 10px;
  max-width: 100%;
}

.alert {
  border-radius: 10px;
}
/**Switching to Payment Gateway Provider.s Network */
</style>
