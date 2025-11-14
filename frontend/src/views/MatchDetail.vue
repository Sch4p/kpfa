<template>
  <div class="match-detail-container position-relative">
    <!-- Stadium background image -->
    <img
      src="/images/stadium_background.jpg"
      alt="Stadium Background"
      class="bg-image"
    />

    <!-- Gradient overlay -->
    <div class="gradient-overlay"></div>

    <!-- Content -->
    <div class="container py-5 position-relative text-center text-dark">
      <div v-if="loading" class="py-5">Loading match details...</div>

      <div v-else-if="error" class="alert alert-danger mt-5">
        {{ error }}
      </div>

      <div v-else-if="match" class="fixture-card card border-0 shadow-sm p-4 mx-auto">
        <div class="card-body">
          <div class="d-flex justify-content-center align-items-center gap-4 flex-wrap">
            <!-- Home team -->
            <div class="team text-end">
              <h5 class="fw-bold text-success mb-2">{{ match.home_team?.name }}</h5>
              <img
                :src="getTeamLogo(match.home_team)"
                :alt="match.home_team?.name"
                class="team-logo"
              />
            </div>

            <!-- VS Circle -->
            <div class="vs-circle text-white fw-bold">VS</div>

            <!-- Away team -->
            <div class="team text-start">
              <h5 class="fw-bold text-success mb-2">{{ match.away_team?.name }}</h5>
              <img
                :src="getTeamLogo(match.away_team)"
                :alt="match.away_team?.name"
                class="team-logo"
              />
            </div>
          </div>

          <!-- Score -->
          <div class="score my-4 fw-bold">
            <span class="fs-4 text-danger">{{ match.home_score }} - {{ match.away_score }}</span>
          </div>

          <!-- Match Info -->
          <div class="match-info mt-3 text-muted small">
            <div><i class="bi bi-calendar-event me-1 text-success"></i> {{ formatDate(match.match_date) }}</div>
            <div><i class="bi bi-clock me-1 text-success"></i> {{ match.match_time }}</div>
            <div><i class="bi bi-geo-alt me-1 text-success"></i> {{ match.location }}</div>
            <div><i class="bi bi-trophy me-1 text-success"></i> {{ match.competition_type }}</div>
          </div>

          <!-- Upcoming banner -->
          <div class="upcoming-banner mt-4">
            Upcoming
          </div>

          <!-- Back link -->
          <div class="text-start mt-4">
            <a @click.prevent="$router.push({ name: 'Matches' })" class="text-decoration-none text-danger fw-bold">
              <i class="bi bi-arrow-left me-1"></i> Back to Fixtures
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Watermark -->
    <img src="/images/logo.jpg" alt="KPFA Logo" class="watermark-logo" />
  </div>
</template>

<script>
import axios from "axios";

export default {
   /* eslint-disable vue/multi-word-component-names */
  name: "MatchDetail",
  data() {
    return {
      match: null,
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchMatch() {
      try {
        const { id } = this.$route.params;
        const res = await axios.get(`http://127.0.0.1:8000/api/matches/${id}/`);
        this.match = res.data;
      } catch (err) {
        console.error("Error loading match:", err);
        this.error = "Unable to load match details. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    getTeamLogo(team) {
      if (!team) return "/images/opponent_placeholder.png";
      return team.is_kpfa_team ? "/images/kpfa_logo.jpg" : team.logo || "/images/opponent_placeholder.png";
    },
    formatDate(dateString) {
      if (!dateString) return "Date not set";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  created() {
    this.fetchMatch();
  },
};
</script>

<style scoped>
.match-detail-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f8f9fa;
}

/* Background image */
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: blur(2px);
}

/* Gradient overlay */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top right, rgba(255, 255, 255, 0.8), rgba(179, 0, 0, 0.2));
  z-index: 1;
}

/* Content */
.fixture-card {
  background: white;
  border-radius: 15px;
  max-width: 700px;
  z-index: 2;
}

.vs-circle {
  width: 40px;
  height: 40px;
  background-color: #b30000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.team-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-top: 8px;
}

.score {
  background-color: rgba(179, 0, 0, 0.1);
  display: inline-block;
  padding: 8px 20px;
  border-radius: 10px;
}

/* Upcoming banner */
.upcoming-banner {
  background-color: orange;
  color: white;
  display: inline-block;
  padding: 6px 20px;
  border-radius: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

/* Watermark */
.watermark-logo {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 100px;
  opacity: 0.1;
  z-index: 0;
}
</style>
