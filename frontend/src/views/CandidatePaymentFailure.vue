<!-- src/views/CandidatePaymentSuccess.vue -->
<template>
  <div class="container py-5 text-center">
    <div class="card shadow-sm p-4 mx-auto" style="max-width: 600px;">
      <div class="mb-3">
        <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
      </div>
      <h3 class="fw-bold mb-3">Payment Failure!</h3>

      <p class="text-muted">
        Sorry your payment was unsuccesful. Please try again after sometime!
        
      </p>

      <button @click="goHome" class="btn btn-lg text-white px-5" style="background-color: #004d00;">
          Home
    </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CandidatePaymentFailure",
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
    goHome() {
      window.location.href = "/"; // or frontend home path
    }
  },
};
</script>
