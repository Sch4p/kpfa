<template>
  <div class="container py-5">
    <h3 class="text-center mb-4">Candidate Dashboard</h3>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Loading dashboard...</p>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Candidate Info -->
      <div class="card shadow p-4 mb-4" v-if="candidate">
        <h5 class="mb-3 text-primary">Candidate Info</h5>
        <p><strong>Name:</strong> {{ candidate.first_name }} {{ candidate.surname }}</p>
        <p><strong>Gender:</strong> {{ candidate.gender }}</p>
        <p><strong>Email:</strong> {{ candidate.email }}</p>
        <p><strong>Phone:</strong> {{ candidate.phone_country_code }} {{ candidate.phone_number }}</p>
      </div>

      <!-- Application Status -->
      <div class="card shadow p-4 mb-4" v-if="candidate">
        <h5 class="mb-3 text-primary">Application Status</h5>
        <div class="d-flex align-items-center">
          <span
            :class="statusBadgeClass(candidate.status)"
            class="badge fs-6 px-3 py-2"
          >
            {{ candidate.status }}
          </span>
        </div>
        <small class="text-muted mt-2 d-block">
          {{
            statusDescription[candidate.status] ||
            "Your application status will be updated after review."
          }}
        </small>
      </div>

      <!-- Payment History -->
      <div class="card shadow p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="text-primary">Payment History</h5>
          <small class="text-muted">
            Auto-refreshes every 30s
          <span v-if="loading" class="spinner-border spinner-border-sm text-primary ms-2"></span>
          </small>
        </div>
        <table class="table table-striped mt-3" v-if="payments.length">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in payments" :key="p.id">
              <td>{{ p.reference }}</td>
              <td>₦{{ p.amount.toLocaleString() }}</td>
              <td>
                <span :class="statusClass(p.status)">{{ p.status }}</span>
              </td>
              <td>{{ new Date(p.created_at).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>

        <p v-else class="text-muted text-center mt-3">
          No payments recorded yet.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CandidateDashboard",
  props: {
    candidateId: { type: String, required: true },
  },
  data() {
    return {
      loading: true,
      candidate: null,
      payments: [],
      refreshInterval: null, // for polling
      statusDescription: {
        PAID: "Payment received. Your application is under review.",
        ACCEPTED: "🎉 Congratulations! You have been accepted into KPFA.",
        REJECTED: "Unfortunately, your application was not successful.",
        NOT_PAID: "Please complete your registration payment.",
      },
    };
  },
  methods: {
    statusClass(status) {
      return {
        "text-success fw-bold": status === "SUCCESS",
        "text-warning fw-bold": status === "PENDING",
        "text-danger fw-bold": status === "FAILED",
      };
    },
    statusBadgeClass(status) {
      return {
        "bg-success text-white": status === "ACCEPTED" || status === "PAID",
        "bg-warning text-dark": status === "PENDING" || status === "UNDER_REVIEW",
        "bg-danger text-white": status === "REJECTED" || status === "FAILED",
        "bg-secondary text-white": status === "NOT_PAID",
      };
    },
    async fetchDashboard() {
      try {
    const [candidateRes, paymentsRes] = await Promise.all([
      axios.get(`http://127.0.0.1:8000/api/candidates/${this.candidateId}/`),
      axios.get(
        `http://127.0.0.1:8000/api/payments/candidate/payments/?candidate=${this.candidateId}`
      ),
    ]);
    this.candidate = candidateRes.data;
    this.payments = Array.isArray(paymentsRes.data)
      ? paymentsRes.data
      : paymentsRes.data.results || [];
  } catch (e) {
    console.error("Error loading dashboard:", e);
  } finally {
    this.loading = false;
  }
 },
  },
  mounted() {
    this.fetchDashboard();

    // 🔁 Auto-refresh every 30 seconds
    this.refreshInterval = setInterval(() => {
      this.fetchDashboard();
    }, 30000);
  },
  beforeUnmount() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  },
};
</script>

<style scoped>
.badge {
  font-size: 1rem;
}
</style>
