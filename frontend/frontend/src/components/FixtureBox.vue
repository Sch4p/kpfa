<template>
  <div class="fixture-card card border-0 shadow-sm mb-4">
    <div class="card-body text-center p-4">
      <!-- Teams -->
      <div class="d-flex justify-content-center align-items-center gap-4 flex-wrap">
        <div class="team text-end">
          <h5 class="fw-bold text-dark mb-0">{{ homeTeam || 'Home Team' }}</h5>
        </div>

        <div class="vs-circle text-white fw-bold">VS</div>

        <div class="team text-start">
          <h5 class="fw-bold text-dark mb-0">{{ awayTeam || opponent || 'Opponent' }}</h5>
        </div>
      </div>

      <!-- Score -->
      <div v-if="score" class="score my-3 fw-bold">
        <span class="fs-4 text-success">Score: {{ score }}</span>
      </div>

      <!-- Match Info -->
      <div class="match-info mt-3 text-muted small">
        <div><i class="bi bi-calendar-event me-1 text-success"></i> {{ formatDate(date) }}</div>
        <div><i class="bi bi-geo-alt me-1 text-success"></i> {{ location }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FixtureBox",
  props: {
    homeTeam: String,
    awayTeam: String,
    opponent: String,
    date: String,
    location: String,
    score: String,
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "Date not set";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.fixture-card {
  border-left: 6px solid #004d00;
  transition: all 0.3s ease-in-out;
  border-radius: 15px;
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
}
.fixture-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 77, 0, 0.2);
}

.vs-circle {
  width: 45px;
  height: 45px;
  background-color: #004d00;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.score {
  background-color: rgba(0, 77, 0, 0.05);
  display: inline-block;
  padding: 6px 20px;
  border-radius: 10px;
}
</style>
