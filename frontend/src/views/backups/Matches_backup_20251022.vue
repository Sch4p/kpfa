<template>

  <div>
    <h1 class="text-3xl font-bold text-blue-900 mb-6">Matches</h1>
    <div v-if="loading" class="text-gray-600">Loading matches...</div>

    <div v-else class="space-y-4">
     <FixtureBox
  v-for="match in matches"
  :key="match.id"
  :homeTeam="match.home_team"
  :awayTeam="match.away_team"
  :opponent="match.opponent"
  :date="match.date"
  :location="match.location"
  :score="match.score"
/>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import FixtureBox from "@/components/FixtureBox.vue";
export default {
  name: "Matches",
  components: { FixtureBox },
  data() {
    return { matches: [], loading: true };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/matches/")
      .then((res) => res.json())
      .then((data) => {
        this.matches = data;
        this.loading = false;
      })
      .catch(() => (this.loading = false));
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
}
</script>
