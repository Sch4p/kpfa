<template>
  <div class="container py-4">
    <!-- Search Bar -->
    <div class="mb-3 text-center">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control w-50 mx-auto"
        placeholder= "Search a player by name"
      />
    </div>

    <!-- Player List -->
    <div class="row g-4">
      <div
        v-for="(player, idx) in filteredPlayers"
        :key="player.id || idx"
        class="col-md-4"
      >
        <router-link
          :to="`/teams/player/men/${player.id}`"
          class="text-decoration-none"
        >
          <PlayerCard :player="player" />
        </router-link>
    </div>
    <!-- Load More Button -->
    <div v-if="nextPage && !loading" class="text-center my-3">
      <button @click="fetchPlayers(nextPage)" class="btn btn-outline-primary">
        {{ $t('buttons.loadmore') }}
      </button>
    </div>

<div v-if="loading" class="text-center my-3">
  <span class="spinner-border text-primary"></span> Loading...
</div>

      <!-- Empty state -->
      <div v-if="!filteredPlayers.length && !loading" class="text-center mt-4">
        <p>No players found.</p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center mt-4">
        <p>Loading players...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PlayerCard from "../components/PlayerCard.vue";

export default {
  /* eslint-disable vue/multi-word-component-names */
  name: "Men",
  components: { PlayerCard },
  data() {
    return {
      players: [],
      searchQuery: "",
      loading: false,
      nextPage: null,
    };
  },
  computed: {
    filteredPlayers() {
      if (!Array.isArray(this.players)) return [];
      const q = this.searchQuery.toLowerCase();
      return this.players.filter((p) =>
        `${p.first_name || ""} ${p.surname || ""}`.toLowerCase().includes(q)
      );
    },
  },
  async mounted() {
    await this.fetchPlayers();
  },
  methods: {
    async fetchPlayers(url = "http://127.0.0.1:8000/api/men-players/") {
  this.loading = true;
  try {
    const response = await axios.get(url);
    console.log("API call hit:", response.status, "records");

    // Extract players safely
    const newPlayers = Array.isArray(response.data.results)
      ? response.data.results
      : Array.isArray(response.data)
        ? response.data
        : [];

    // If it's a next page, append instead of replacing
    if (url !== "http://127.0.0.1:8000/api/men-players/") {
      this.players.push(...newPlayers);
    } else {
      this.players = newPlayers;
    }

    // Store the 'next' page link
    this.nextPage = response.data.next;

    console.log(`Loaded ${this.players.length} players total`);
  } catch (error) {
    console.error("Error fetching players:", error);
  } finally {
    this.loading = false;
  }
}

  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
