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
      <div class="row g-2 align-items-center">
        <div class="col-7 col-md-8">
          <h6 class="card-title fw-bold">
            <strong>{{ player.first_name }}</strong> <strong>{{ player.surname }}</strong>
          </h6>
          <p class="card-text mb-1"><strong>{{ $t('player.position') }}:</strong> {{ player.position }}</p>
          <p class="card-text mb-1"><strong>{{ $t('player.country') }}:</strong> {{ player.country || "N/A" }} </p>
          <p v-if="player.email" class="card-text mb-1"><strong>Email:</strong> {{ player.email }}</p>
        </div>
        <div class="col-5 col-md-4 text-end">
          <h3 class="fw-bold">{{player.shirt_number }}</h3>
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

/* Image styling */
.card-img-top {
  width: 100%;
  height: 220px;
  object-fit: contain; /* Shows full image without cropping */
  background-color: #f0f0f0;
}

/* Card text styling */
.card-title {
  color: #008000; /* Green */
  font-size: 1.1rem;
}
.card-body {
  text-align: left;
  padding: 0.75rem;
}
.card-text {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-img-top {
    height: 200px;
  }
  .card-title {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .card-img-top {
    height: 180px;
  }
  .card-title {
    font-size: 0.95rem;
  }
  .row.g-2.align-items-center {
    flex-direction: column;
    text-align: center;
  }
  .col-7, .col-5 {
    width: 100%;
    text-align: center !important;
  }
}
</style>
