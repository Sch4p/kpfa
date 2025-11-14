<template>
  <div class="container py-4">
    <!-- <h2 class="text-center mb-4">Junior Team</h2> -->

    <!-- Search Bar -->
    <div class="mb-3 text-center">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control w-50 mx-auto"
        placeholder="Search Player by Name"
      />
    </div>

    <!-- Player List -->
    <div class="row">
      <div
        v-for="player in filteredPlayers"
        :key="player.id"
        class="col-md-4 mb-4"
      >
      <router-link :to="`/teams/player/junior/${player.id}`" class="text-decoration-none">
        <div class="card shadow-sm">
          <img
            v-if="player.profile_picture"
            :src="player.profile_picture"
            class="card-img-top"
            alt="Player Image"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ player.first_name }} {{ player.surname }}
            </h5>
            <p class="card-text">
              <strong>Position:</strong> {{ player.position }} <br />
              <strong>Country:</strong> {{ player.country || 'N/A' }}
            </p>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  /* eslint-disable vue/multi-word-component-names */
  name: "Junior",
  data() {
    return {
      players: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredPlayers() {
      return this.players.filter((player) => {
        const fullName =
          `${player.first_name} ${player.surname}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    },
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/junior-players/")
      .then((response) => {
        this.players = response.data;
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  },
};
</script>
