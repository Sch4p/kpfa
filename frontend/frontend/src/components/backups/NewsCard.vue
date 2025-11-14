<template>
  <div class="card mb-4 shadow-sm">
    <!-- News Image -->
  <img
      v-if="resolvedImage"
      :src="resolvedImage"
      class="card-img-top"
      alt="News image"
      style="object-fit: cover; height: 220px;"
      @error="onImageError"
    />


    <!-- News Content -->
    <div class="card-body px-4 py-3">
      <h2 class="h5 fw-bold mb-2">{{ title }}</h2>
      <p class="text-muted mb-3">{{ content }}</p>
      <small class="text-secondary">📅 {{ formatDate(news.created_at) }}</small>
    </div>

    <!-- Toggle Comments Button -->
    <div class="px-4 pb-3">
      <button
        class="btn btn-outline-primary btn-sm w-100"
        @click="toggleComments"
      >
        <span v-if="!showComments">
          💬 {{ $t('news.show_comments') || `Show Comments (${comments?.length || 0})` }}
        </span>
        <span v-else>
          🔽 {{ $t('news.hide_comments') || "Hide Comments" }}
        </span>
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
  mounted() {
    // Restore open state if saved in localStorage
    const openComments = JSON.parse(localStorage.getItem("openComments") || "[]");
    if (openComments.includes(this.id)) {
      this.showComments = true;
    }
  },
  methods: {
    openImage(imageUrl) {
      const imgWindow = window.open("", "_blank");
      imgWindow.document.write(`<img src="${imageUrl}" style="width:100%">`);
    },
    toggleComments() {
      this.showComments = !this.showComments;
      const openComments = JSON.parse(localStorage.getItem("openComments") || "[]");

      if (this.showComments) {
        if (!openComments.includes(this.id)) {
          openComments.push(this.id);
        }
      } else {
        const index = openComments.indexOf(this.id);
        if (index !== -1) openComments.splice(index, 1);
      }

      localStorage.setItem("openComments", JSON.stringify(openComments));
    },
    handleCommentAdded(event) {
      // Keep section open after posting
      this.showComments = true;
      this.$emit("comment-added", event);

      // Ensure this news stays marked as open
      const openComments = JSON.parse(localStorage.getItem("openComments") || "[]");
      if (!openComments.includes(this.id)) {
        openComments.push(this.id);
        localStorage.setItem("openComments", JSON.stringify(openComments));
      }
    },
    computed: {
  resolvedImage() {
    if (!this.image) {
      return "https://via.placeholder.com/400x250.png?text=No+Image";
    }

    // Fix relative URLs for local dev
    if (this.image.startsWith("../images/")) {
      return `http://127.0.0.1:8000${this.image}`;
    }

    // Fix missing scheme (e.g. 'media/...')
    if (!this.image.startsWith("http")) {
      return `http://127.0.0.1:8000/${this.image}`;
    }

    return this.image;
  },
},

  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
