<template>
  <div class="match-detail-container position-relative py-5">
    <!-- Background -->
    <div class="background-overlay"></div>
    <img src="/images/kpfa_logo.png" class="logo-watermark" alt="KPFA Logo" />

    <div v-if="loading" class="text-center py-5 text-success">
      Loading match details...
    </div>

    <div v-else-if="error" class="alert alert-danger text-center mt-5">
      {{ error }}
    </div>

    <div v-else class="card match-card mx-auto shadow-sm p-4">
      <!-- Fixture Teams -->
      <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap mb-3">
        <div class="team text-center">
          <img
            :src="match.home_team?.logo || '/images/kpfa_logo.png'"
            alt="Home Logo"
            class="team-logo mb-1"
          />
          <h5 class="text-success mb-1">{{ match.home_team?.name }}</h5>
        </div>

        <div class="vs-circle text-white fw-bold">VS</div>

        <div class="team text-center">
          <img
            :src="match.away_team?.logo || '/images/opponent_placeholder.png'"
            alt="Away Logo"
            class="team-logo mb-1"
          />
          <h5 class="text-success mb-1">{{ match.away_team?.name }}</h5>
        </div>
      </div>

      <!-- Score -->
      <div v-if="match.result" class="score-display text-center fw-bold mb-3">
        {{ match.result }}
      </div>

      <!-- Upcoming Ribbon -->
      <div v-if="!match.is_completed" class="ribbon-upcoming text-center mb-3">
        Upcoming
      </div>

      <!-- Match Info -->
      <div class="match-info text-center text-success small">
        <div><i class="bi bi-calendar-event me-1"></i> {{ formatDate(match.match_date) }}</div>
        <div><i class="bi bi-clock me-1"></i> {{ formatTime(match.match_time) }}</div>
        <div><i class="bi bi-geo-alt me-1"></i> {{ match.location }}</div>
        <div><span class="badge bg-light text-success mt-2">{{ match.competition_type }}</span></div>
      </div>

      <!-- Back link -->
      <router-link to="/matches" class="text-success d-inline-flex align-items-center mt-4">
        <i class="bi bi-arrow-left me-1"></i> Back to Fixtures
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
   /* eslint-disable vue/multi-word-component-names */
  name: 'MatchDetail',
  props: { id: { type: [String, Number], required: true } },
  setup(props) {
    const match = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const loadMatch = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/matches/${props.id}/`);
        match.value = res.data;
      } catch (err) {
        console.error('Error loading match:', err);
        error.value = 'Unable to load match details. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return 'Date not set';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeStr) => {
      if (!timeStr) return '';
      return timeStr.slice(0, 5); // HH:MM
    };

    onMounted(loadMatch);
    return { match, loading, error, formatDate, formatTime };
  },
};
</script>

<style scoped>
.match-detail-container {
  position: relative;
  min-height: 100vh;
  background: #f0f0f0;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('');
  background-size: cover;
  filter: blur(8px) brightness(0.6);
  z-index: 0;
}

.logo-watermark {
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0.1;
  width: 150px;
  height: auto;
  z-index: 1;
}

.match-card {
  position: relative;
  z-index: 2;
  background: white;
  max-width: 700px;
  border-radius: 15px;
}

.team-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.vs-circle {
  width: 35px;
  height: 35px;
  background-color: #b30000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
}

.score-display {
  font-size: 1.5rem;
  color: #b30000;
}

.ribbon-upcoming {
  display: inline-block;
  background-color: orange;
  color: white;
  padding: 2px 12px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 10px;
}
</style>
