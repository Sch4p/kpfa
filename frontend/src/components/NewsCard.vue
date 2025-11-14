<template>
  <div class="card mb-4 shadow-sm">
    <!-- News Image -->
    <img v-if="resolvedImage"
      :src="resolvedImage"
      alt="News image"
      class="card-img-top"
      style="object-fit: cover; height: 220px;"
      @error="onImageError"
    />

    <!-- News Content -->
    <div class="card-body px-4 py-3">
      <h2 class="h5 fw-bold mb-2">{{ title }}</h2>
      <p class="text-muted mb-3">{{ content }}</p>
      <small class="text-secondary">📅 {{ formattedDate }}</small>
    </div>

    <!-- Toggle Comments Button -->
    <div class="px-4 pb-3">
      <button
        class="btn btn-outline-primary btn-sm w-100 d-flex justify-content-between align-items-center"
        @click="toggleComments"
      >
        <span>
          💬 {{ showComments ? ($t('news.hide_comments') || 'Hide Comments') : ($t('news.show_comments') || `Show Comments (${comments?.length || 0})`) }}
        </span>
        <span :class="{'rotate-180': showComments}" style="transition: transform 0.3s;">⬇️</span>
      </button>
    </div>

    <!-- Collapsible Comments Section -->
    <transition name="fade">
      <div v-if="showComments">
        <CommentsSection
          :newsId="id"
          :comments="comments"
          @comment-added="handleCommentAdded"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import CommentsSection from "@/components/CommentsSection.vue";

export default {
  name: "NewsCard",
  components: { CommentsSection },
  props: {
    id: Number,
    title: String,
    content: String,
    date: String,
    image: String,
    comments: Array,
  },
  data() {
    return {
      showComments: false,
      
    };
  },
  computed: {
    resolvedImage() {
    if (!this.image) return "https://via.placeholder.com/400x250.png?text=No+Image";
    // if relative URL
    if (!this.image.startsWith("http")) {
      return `http://127.0.0.1:8000/media/news_images/${this.image}`;
    }
    return this.image;
  },

    formattedDate() {
      if (!this.date) return "Unknown date";
      const d = new Date(this.date);
      if (isNaN(d.getTime())) return "Unknown date";
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  mounted() {
  

    // Restore open state if saved in localStorage
    const openComments = JSON.parse(localStorage.getItem("openComments") || "[]");
    if (openComments.includes(this.id)) this.showComments = true;
  },
  methods: {
  
    onImageError(e) {
      e.target.src = "https://via.placeholder.com/400x250.png?text=No+Image";
    },
    toggleComments() {
      this.showComments = !this.showComments;
      const openComments = JSON.parse(localStorage.getItem("openComments") || "[]");
      if (this.showComments && !openComments.includes(this.id)) openComments.push(this.id);
      if (!this.showComments && openComments.includes(this.id)) {
        openComments.splice(openComments.indexOf(this.id), 1);
      }
      localStorage.setItem("openComments", JSON.stringify(openComments));
    },
    handleCommentAdded(event) {
      this.showComments = true;
      this.$emit("comment-added", event);
    },
  },
};
</script>

<style scoped>

.card-img-top {
  object-fit: cover;
  height: 320px; /* same as video card ratio */
  width: 100%;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
