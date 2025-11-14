<!-- src/views/CandidatePaymentSuccess.vue -->
<template>
  <div class="container py-5 text-center">
    <div class="card shadow-sm p-4 mx-auto" style="max-width: 600px;">
      <div class="mb-3">
        <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
      </div>
      <h3 class="fw-bold mb-3">Payment Successful!</h3>

      <p class="text-muted">
        Thank you for completing your payment.
        Your transaction reference is:
      </p>
      <h5 class="text-primary fw-bold">{{ reference }}</h5>

      <p class="mt-3">
        You can now view your application status and details from your dashboard.
      </p>

      <button class="btn btn-success mt-3" @click="goToDashboard">
        Go to Candidate Dashboard
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CandidatePaymentSuccess",
  data() {
    return {
      reference: this.$route.query.ref || "N/A",
      candidateId: this.$route.query.candidateId || null,
    };
  },
  methods: {
    goToDashboard() {
      const candidateId = this.$route.query.candidateId || this.candidateId;
      if (candidateId) {
        this.$router.push({ name: "CandidateDashboard", params: { candidateId } });
      } else {
        alert("Candidate ID not found. Please check your dashboard later");
        console.warn("Candidate ID missing in query.");
      }
    },
  },
};
</script>
