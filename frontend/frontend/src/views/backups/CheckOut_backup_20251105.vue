<template>
  <div class="container py-4">
    <h1 class="text-3xl font-bold text-blue-900 mb-4">
      {{ $t("checkout.title") || "Application Checkout" }}
    </h1>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5 text-secondary">
      {{ $t("checkout.loading") || "Processing..." }}
    </div>

    <!-- Candidate Summary -->
    <div v-else>
      <div class="card mb-4 shadow-sm">
        <div class="card-body">
          <h2 class="h5 fw-bold mb-2">Candidate Information</h2>
          <p><strong>Name:</strong> {{ candidate.first_name }} {{ candidate.surname }}</p>
          <p><strong>Date of Birth:</strong> {{ candidate.date_of_birth }}</p>
          <p><strong>Email:</strong> {{ candidate.email }}</p>
          <p><strong>Phone:</strong> {{ candidate.phone_country_code }}{{ candidate.phone_number }}</p>
          <p><strong>Position:</strong> {{ candidate.position }}</p>
          <p><strong>Team:</strong> {{ candidate.team }}</p>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="mb-3">
        <label class="form-label">Payment Method</label>
        <select v-model="paymentMethod" class="form-select form-select-sm">
          <option value="">Select a payment method</option>
          <option value="opay">Opay</option>
          <option value="naira_card">Naira Card</option>
          <option value="mtn_momo_ghana">MTN Momo Ghana</option>
          <option value="payment_pending">Payment Pending</option>
        </select>
      </div>

      <!-- Conditional Proof of Payment Upload -->
      <div v-if="paymentMethod === 'payment_pending'" class="mb-3">
        <label class="form-label">Proof of Payment (optional for later/offline payment)</label>
        <input type="file" @change="handleFileUpload" ref="proofInput" class="form-control form-control-sm" />
        <small class="text-white d-block mt-1">
          Max size: 2MB. Allowed formats: JPG, PNG, PDF.
        </small>
        <div v-if="fileError" class="text-danger mt-1">{{ fileError }}</div>
      </div>

      <!-- Offline Payment Instructions -->
      <div v-if="paymentMethod === 'payment_pending'" class="alert alert-info">
        For later or offline payments, please pay via any of our agents or via KPFA's Official Bank Account:
        <strong>Account Number: 1234567890</strong>
      </div>

      <!-- Submit Button -->
      <div class="mb-3">
        <button class="btn btn-primary w-100" @click="submitPayment" :disabled="loading">
          {{ loading ? "Processing..." : "Submit Payment" }}
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Checkout",
  data() {
    return {
      candidate: {},        // candidate data fetched via ID
      paymentMethod: "",
      proofFile: null,
      fileError: "",
      loading: false,
      error: null,
    };
  },
  mounted() {
    // Fetch candidate data by ID passed via route query (or state)
    const candidateId = this.$route.query.id;
    if (candidateId) {
      this.fetchCandidate(candidateId);
    } else {
      this.error = "Candidate data not found.";
    }
  },
  methods: {
    async fetchCandidate(id) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/candidates/${id}/`);
        this.candidate = res.data;
      } catch (err) {
        console.error(err);
        this.error = "Failed to load candidate data.";
      }
    },

    handleFileUpload(e) {
      const file = e.target.files[0];
      if (!file) return;

      const allowed = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowed.includes(file.type)) {
        this.fileError = "Invalid file type. Please upload JPG, PNG or PDF.";
        if (this.$refs.proofInput) this.$refs.proofInput.value = "";
        return;
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        this.fileError = "File size exceeds 2MB limit.";
        if (this.$refs.proofInput) this.$refs.proofInput.value = "";
        return;
      }

      this.fileError = "";
      this.proofFile = file;
    },

    async submitPayment() {
      if (!this.paymentMethod) {
        this.error = "Please select a payment method.";
        return;
      }
      this.loading = true;
      this.error = null;

      try {
        const formData = new FormData();
        formData.append("payment_method", this.paymentMethod);
        if (this.proofFile) formData.append("proof_of_payment", this.proofFile);

        // Submit to backend
        await axios.post(
          `http://127.0.0.1:8000/api/candidates/${this.candidate.id}/payment/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Redirect to dashboard or success page
        this.$router.push({ name: "CandidateDashboard", query: { id: this.candidate.id } });
      } catch (err) {
        console.error(err);
        this.error = "Failed to submit payment. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.text-white {
  color: #fff !important;
}
</style>
