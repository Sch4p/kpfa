<template>
  <div class="container my-5">
    <!-- Section Title -->
    <h1 class="text-center fw-bold text-success mb-4">
      {{ $t("teams.title") || "Our Teams" }}
    </h1>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-4">
      <li class="nav-item" v-for="tab in tabs" :key="tab.path">
        <router-link
          :to="tab.path"
          class="nav-link"
          :class="{ active: isActive(tab.path) }"
        >
          {{ tab.label }}
        </router-link>
      </li>
    </ul>

    <!-- Sub-Component Renders Here -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" v-if="Component" />
        <div v-else class="text-center text-muted py-5">
          <p>No team category selected or page not found.</p>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
   /* eslint-disable vue/multi-word-component-names */
  name: "Teams",
  computed: {
    tabs() {
      return [
        {
          path: "/teams",
          label: this.$t("teams.men") || "Men",
        },
        {
          path: "/teams/women",
          label: this.$t("teams.women") || "Women",
        },
        {
          path: "/teams/junior",
          label: this.$t("teams.junior") || "Junior",
        },
      ];
    },
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style scoped>
.nav-tabs .nav-link {
  color: #004d00 !important;
  font-weight: 500;
  transition: all 0.3s ease;
}
.nav-tabs .nav-link:hover {
  color: #006600 !important;
}
.nav-tabs .nav-link.active {
  background-color: #004d00 !important;
  color: #fff !important;
  border-color: #004d00 !important;
}

/* Smooth component transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
