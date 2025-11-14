<template>
  <div class="container my-5">
    <!-- Section Title -->
    <h1 class="text-3xl font-bold text-center text-green mb-4">
      {{ $t('teams.title') }}
    </h1>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-4">
      <li class="nav-item">
        <router-link
          to="/teams"
          class="nav-link text-green"
          :class="{ active: $route.path === '/teams' }"
        >
          {{ $t('teams.men') }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/teams/women"
          class="nav-link text-green"
          :class="{ active: $route.path === '/teams/women' }"
        >
         {{ $t('teams.women') }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/teams/junior"
          class="nav-link text-green"
          :class="{ active: $route.path === '/teams/junior' }"
        >
          {{ $t('teams.junior') }}
        </router-link>
      </li>
    </ul>

    <!-- Team Category Component Renders Here -->
    <router-view />
  </div>
</template>

<script>
export default {
   /* eslint-disable vue/multi-word-component-names */
  name: "Teams",
};
</script>

<style scoped>
.nav-tabs .nav-link.active {
  font-weight: bold;
  color: #fff !important;
  background-color: #004d00 !important;
}

.text-green {
  color: #004d00 !important;
}

.nav-link.text-green {
  color: #004d00 !important;
  transition: color 0.3s ease;
}

.nav-link.text-green:hover {
  color: #006600 !important; /* slightly brighter on hover */
}


</style>
