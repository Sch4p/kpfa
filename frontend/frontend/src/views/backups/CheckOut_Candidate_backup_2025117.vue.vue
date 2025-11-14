<template>
  <div class="container py-5">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading candidate details...</span>
      </div>
      <p class="mt-3">Loading candidate details...</p>
    </div>

    <div v-else-if="candidate" class="card shadow p-4 mx-auto" style="max-width: 600px;">
      <h4 class="mb-3 text-center">Candidate Registration Checkout</h4>

      <div class="mb-3">
        <p><strong>Full Name:</strong> {{ candidate.first_name }} {{ candidate.surname }}</p>
        <p><strong>Email:</strong> {{ candidate.email || "N/A" }}</p>
        <p><strong>Phone:</strong> {{ candidate.phone_country_code }} {{ candidate.phone_number }}</p>
        <p><strong>Country:</strong> {{ candidate.country?.name || "N/A" }}</p>
        <p><strong>State:</strong> {{ candidate.state_of_origin?.name || "N/A" }}</p>
        <p><strong>Team:</strong> {{ candidate.team_name || "N/A" }}</p>
      </div>

      <hr />

      <h5 class="mb-3 text-center text-success">Registration Fee: ₦10,000</h5>

      <!-- Payment Method Dropdown -->
      <div class="mb-3 mx-auto" style="max-width: 300px;">
        <label for="paymentMethod" class="form-label fw-bold">Payment Method</label>
        <select
          id="paymentMethod"
          v-model="selectedPayment"
          class="form-select"
        >
          <option disabled value="">Select Payment Option</option>
          <option value="opay">Opay</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      <!-- Proceed Button -->
      <button
        class="btn btn-primary w-100 mt-2"
        :disabled="!selectedPayment"
        @click="proceedToPayment"
      >
        Proceed to Payment
      </button>
    </div>

    <div v-else class="text-center text-danger my-5">
      <p>❌ Candidate details could not be loaded.</p>
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
      selectedPayment: "",
    };
  },
  methods: {
    async fetchCandidate() {
      try {
        console.log("Fetching candidate with ID:", this.candidateId);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/candidates/${this.candidateId}/`
        );
        this.candidate = res.data;
        console.log("✅ Candidate data loaded:", res.data);
      } catch (error) {
        console.error("❌ Error loading candidate:", error);
      } finally {
        this.loading = false;
      }
    },

    proceedToPayment() {
      if (!this.selectedPayment) {
        alert("Please select a payment method before proceeding.");
        return;
      }

      console.log("Proceeding to payment method:", this.selectedPayment);
      if (this.selectedPayment === "opay") {
        // TODO: Integrate Opay (mock/sandbox)
        alert("Redirecting to Opay payment gateway...");
      } else if (this.selectedPayment === "bank") {
        alert("Bank transfer instructions will appear here.");
      }
    },
  },
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
}
</style>
