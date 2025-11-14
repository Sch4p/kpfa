<template>
  <div class="container py-5">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else class="card shadow-lg p-4">
      <div class="d-flex gap-4 flex-column flex-md-row">
        <div class="text-center">
          <img
            :src="player.profile_picture || '/images/default-player.jpg'"
            alt="Player photo"
            class="img-fluid rounded-circle mb-3"
            style="width: 180px; height: 180px; object-fit: cover;"
          />
          <h2 class="fw-bold" :style="{ color: '#004d00' }">
            {{ player.first_name }} {{ player.surname }}
          </h2>
          <p class="text-muted">{{ player.position || 'Position not specified' }}</p>
        </div>

        <div class="flex-fill">
          <h4 class="fw-bold" :style="{ color: '#004d00' }">Bio</h4>
          <p v-if="player.bio">{{ player.bio }}</p>
          <p v-else class="text-muted">No biography available.</p>

          <hr />

          <h4 class="fw-bold" :style="{ color: '#004d00' }">Statistics</h4>
          <div class="row">
            <div class="col-sm-6">
              <ul class="list-group mb-3">
                <li class="list-group-item"><strong>Shirt Number:</strong> {{ player.shirt_number?? 'N/A' }}</li>
                <li class="list-group-item"><strong>Current Club:</strong> Kutty Philips FC</li>
                <li class="list-group-item"><strong>Matches Played:</strong> {{ player.matches_played ?? 0 }}</li>
              </ul>
            </div>
            <div class="col-sm-6">
              <ul class="list-group mb-3">
                <li class="list-group-item"><strong>Goals:</strong> {{ player.goals ?? 0 }}</li>
                <li class="list-group-item"><strong>Assists:</strong> {{ player.assists ?? 0 }}</li>
                <li class="list-group-item"><strong>Country:</strong> {{ player.country ?? 'N/A' }}</li>
              </ul>
            </div>
          </div>

          <hr />
<!--      <div v-if="player.guardian_name || player.guardian_contact_number">
            <h5 class="fw-bold">Guardian</h5>
            <p><strong>Name:</strong> {{ player.guardian_name || 'N/A' }}</p>
            <p><strong>Contact:</strong> {{ player.guardian_contact_number || 'N/A' }}</p>
            <p><strong>Email:</strong> {{ player.guardian_email || 'N/A' }}</p>
          </div>
-->

          <div class="mt-3">
            <button class="btn btn-outline-secondary me-2" @click="goBack">Back</button>
            <router-link :to="teamBaseRoute" class="btn btn-success">Back to Team</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerDetail",
  props: {
    team: { type: String, required: true }, // 'men' | 'women' | 'junior'
    id: { type: [String, Number], required: true },
  },
  data() {
    return {
      player: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    // map route team segment to API base and a convenient "back" route
    apiBase() {
      if (this.team === "men") return "men-players";
      if (this.team === "women") return "women-players";
      if (this.team === "junior") return "junior-players";
      return "men-players";
    },
    teamBaseRoute() {
      // return a route to the appropriate team listing
      if (this.team === "men") return "/teams";
      if (this.team === "women") return "/teams/women";
      if (this.team === "junior") return "/teams/junior";
      return "/teams";
    },
  },
  mounted() {
    this.fetchPlayer();
  },
  methods: {
    async fetchPlayer() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/${this.apiBase}/${this.id}/`);
        this.player = res.data;
      } catch (err) {
        console.error(err);
        this.error = "Failed to load player details.";
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      // prefer history back if possible; otherwise go to the team listing
      if (window.history.length > 1) this.$router.go(-1);
      else this.$router.push(this.teamBaseRoute);
    },
  },
};
</script>
