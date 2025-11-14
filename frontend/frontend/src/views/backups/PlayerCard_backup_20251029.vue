<template>
  <div class="card shadow-sm border-0 h-100 player-card" @click="$emit('select', player)">
    <img
      v-if="player.profile_picture"
      :src="player.profile_picture"
      class="card-img-top"
      alt="Player"
    />
    <img
      v-else
      src="/images/default-player.jpg"
      class="card-img-top"
      alt="Default"
    />

  <div class="card-body">
    <div class="row g-4" style="text-align:left;">
      <div class="col-md-6">
      <h6 class="card-title fw-bold text-primary" style="color: #004d00;">
        <strong>{{ player.first_name }}</strong> <strong>{{ player.surname }}</strong>
      </h6>
      <p class="card-text mb-1" style="font-size:small"><strong>Position:</strong> {{ player.position }}</p>
      <p class="card-text mb-1" style="font-size:small"><strong>Country:</strong> {{ player.country || 'N/A' }} </p>  
      <p v-if="player.email" class="card-text mb-1" style="font-size:small"><strong>Email:</strong> {{ player.email }}</p>
      </div>

      <div class="col-md-6" style="text-align: right;">
       <h3 class="card-title fw-bold text-primary" style="color: #004d00; font-size:">
        <strong>{{ player.shirt_number }}</strong>
      </h3> 
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerCard",
 props: {
    player: { type: Object, required: true },
  },
};
</script>

<style scoped>
.player-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.player-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.card-img-top {
  object-fit: cover;
  height: 220px;
}
</style>
