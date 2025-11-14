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
    };
  },
  methods: {


   

    async proceedToPayment() {
      if (this.submitting) return; // prevent duplicate clicks

      if (!this.selectedPayment) {
        this.feedback = { message: "Please select a payment method.", type: "alert-warning" };
        return;
      }

       // Prevent double submissions
      if (this.submitting) return;

      this.submitting = true;
      this.feedback = { message: "", type: "" };

      try {
      this.loading = true;
      this.paymentError = null;

    // ✅ Step 1: Fetch candidate details (you already do this)
     const candidateRes = await axios.get(
    `http://127.0.0.1:8000/api/candidates/${encodeURIComponent(this.candidateId)}/`
   );
    
    this.candidate = candidateRes.data;
    console.log("Candidate ID check:", this.candidate?.id);

    // ✅ Step 2: Check if payment already exists
    const checkRes = await axios.get(
      `http://127.0.0.1:8000/api/payments/candidate/check/${this.candidate.id}/`
    );

    if (checkRes.data.exists) {
      // 🚫 Stop duplicate payment attempt
      this.paymentError = "This candidate already has a payment record. You cannot pay twice.";
      this.loading = false;
      return;
    }

    // ✅ Step 3: If no payment found, continue to initiate new payment
    const paymentRes = await axios.post(
      "http://127.0.0.1:8000/api/payments/candidate/mock-initiate/",
      {
        candidate_id: this.candidate.id,
        amount: this.amount,
        method: this.paymentMethod,
      }
    );

    this.paymentResponse = paymentRes.data;
    console.log("✅ Payment initiated:", this.paymentResponse);

    // redirect or confirm
  } catch (error) {
    console.error("🔥 Payment error:", error.response?.data || error);
    this.paymentError = error.response?.data?.message || "Payment failed";
  } finally {
    this.loading = false;
  }
}

  },
mounted() {
  //this.fetchCandidate();
  console.log("Candidate ID from route:", this.candidateId);
  
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
</style>
