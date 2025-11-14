<template>
  <div class="matches-page py-5">
    <div class="container">
      <h2 class="text-center mb-4 fw-bold text-uppercase text-danger" style="color:#b30000;">{{ $t('matches.upcoming_fixtures') }}</h2>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-danger" role="status" aria-hidden="true"></div>
      </div>

      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>

      <div v-else class="row gy-4">
        <div
          v-for="match in matches"
          :key="match.id"
          class="col-12"
        >
          <div
            class="card match-card shadow-sm border-0 rounded-3"
            role="button"
            @click="goToDetail(match.id)"
            tabindex="0"
          >
            <div class="card-body d-flex flex-column flex-md-row justify-content-center align-items-center text-center">

              <!-- Home Team -->
              <div class="team-info text-center">
                <h5 class="fw-bold small mb-1 text-green ellipsis">
                  {{ match.home_team?.name }}
                </h5>
                <img
                  :src="teamLogo(match.home_team)"
                  :alt="match.home_team?.name || 'Home Team Logo'"
                  class="team-logo mt-2 mx-auto"
                />
              </div>

              <!-- VS Circle + Score -->
              <div class="center-block d-flex flex-column align-items-center mx-5">
                <div class="vs-circle">VS</div>
                <div class="score-badge mt-2">
                <span class="score-text">{{ displayScore(match) }}</span>
                </div>
              </div>

              <!-- Away Team -->
              <div class="team-info text-center">
                <h5 class="fw-bold small mb-1 text-green ellipsis">
                  {{ match.away_team?.name }}
                </h5>
                <img
                  :src="teamLogo(match.away_team)"
                  :alt="match.away_team?.name || 'Away Team Logo'"
                  class="team-logo mt-2 mx-auto"
                />
              </div>
            </div>

            <div class="match-meta d-flex flex-column flex-md-row justify-content-between align-items-center px-3 pb-3 pt-2 small text-green">
              <div class="text-center text-md-start w-100 w-md-auto">
                <div><strong>{{ $t('matches.date') }}:</strong> {{ formatDate(match.match_date || match.date) }}</div>
                <div><strong>{{ $t('matches.time') }}:</strong> {{ match.match_time || match.time || 'TBD' }}</div>
              </div>

              <div class="text-center w-100 w-md-auto mt-2 mt-md-0">
                <div><strong>{{ $t('matches.location') }}:</strong> {{ match.location || 'TBA' }}</div>
              </div>

              <div class="text-center text-md-end w-100 w-md-auto mt-2 mt-md-0">
                <span class="badge bg-light text-success">
                  {{ kpfaBadgeText(match) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
   /* eslint-disable vue/multi-word-component-names */
  name: "Matches",
  data() {
    return {
      matches: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchMatches() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/matches/");
        this.matches = Array.isArray(res.data) ? res.data : res.data.results || [];
       // ✅ Sort matches in descending order by date (latest first)
        this.matches.sort((a, b) => new Date(b.date) - new Date(a.date));
      } catch (err) {
        console.error("Error fetching matches:", err);
        this.error = "Failed to load matches. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    goToDetail(id) {
      if (!id) return;
      this.$router.push({ name: "MatchDetail", params: { id } });
    },
    formatDate(dateStr) {
      if (!dateStr) return "Date not set";
      try {
        const opts = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateStr).toLocaleDateString(undefined, opts);
      } catch {
        return dateStr;
      }
    },
    teamLogo(teamObj) {
      if (!teamObj) return "images/opponent_placeholder.jpg"
      if (teamObj.is_kpfa_team || teamObj.is_kpfa || teamObj.team_type === "KPFA") return "images/kpfa_logo.jpg";
      return "images/opponent_placeholder.jpg";
    },
    hasScore(match) {
      if (!match) return false;
      return typeof match.home_score === "number" || typeof match.away_score === "number";
    },
    displayScore(match) {
     const hs = match.home_score;
     const as = match.away_score;

  // If both scores are null, undefined, or empty → show dash
    if (hs == null && as == null) {
      return "-";
    }
  // Otherwise show the actual scores
    return `${hs}-${as}`;
    },
    kpfaBadgeText(match) {
      if (!match) return "";
      const homeIs = match.home_team?.is_kpfa_team || match.home_team?.is_kpfa;
      const awayIs = match.away_team?.is_kpfa_team || match.away_team?.is_kpfa;
      if (homeIs) return `${match.home_team?.team_type || "KPFA"} (Home)`;
      if (awayIs) return `${match.away_team?.team_type || "KPFA"} (Away)`;
      return "Neutral";
    },
  },
  mounted() {
    this.fetchMatches();
  },
};
</script>

<style scoped>
.matches-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.match-card {
  background-color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.match-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
.card-body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.team-info {
  width: 160px;
  flex-shrink: 0;
}
.vs-circle {
  background-color: #b30000;
  color: #fff;
  font-weight: 700;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
.team-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  margin-top: 4px;
}
.score-badge {
  background: #fff0f0;
  border-radius: 8px;
  padding: 5px 9px;
  border: 1px solid rgba(179, 0, 0, 0.1);
}
.score-text {
  color: #b30000;
  font-weight: 700;
}
.text-danger {
  color: #b30000;
}
.text-green {
  color: #006400;
}
.match-meta {
  border-top: 1px solid #eee;
  padding-top: 10px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
