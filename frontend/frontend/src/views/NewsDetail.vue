<template>
  <div class="container py-5">
    <!-- Loading State -->
    <div v-if="loading" class="text-center section-title mb-4 fw-semibold">
      {{ $t('news.loading') || 'Loading news...' }}
    </div>
<!--    
    <h2 class="text-center section-title mb-4 fw-bold">{{ $t('teams.title') }}</h2>
-->

    <!-- News Content -->
    <div v-else-if="news" class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="fw-bold text-primary mb-3">{{ news.title || 'Untitled News' }}</h1>
        <p class="text-muted mb-4">
          {{ formatDate(news.created_at) || $t('news.unknown_date') || 'Date unavailable' }}
        </p>

        <img
          :src="news.image || fallbackImage"
          alt="News Image"
          class="img-fluid rounded mb-4 w-100"
          style="max-height: 400px; object-fit: cover;"
          loading="lazy"
        />

        <div v-html="news.content || '<p>No content available.</p>'"></div>

        <router-link to="/news">
          ← {{ $t('news.back_to_list') || 'Back to News' }}
        </router-link>

        
      </div>
    </div>

    <!-- Error / Missing -->
    <div v-else class="text-center text-danger fw-semibold my-5">
      {{ $t('news.not_found') || 'News article not found.' }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewsDetail",
  data() {
    return {
      news: null,
      loading: true,
      fallbackImage: "/images/news-placeholder.jpg", // fallback image
    };
  },
  async created() {
    const newsId = this.$route.params.id;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/news/${newsId}/`);
      this.news = response.data || null;

      if (this.news?.title) {
        document.title = `${this.news.title} - KPFA News`;
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.news = null;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return null;
      try {
        return new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return dateStr;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
}
</style>
