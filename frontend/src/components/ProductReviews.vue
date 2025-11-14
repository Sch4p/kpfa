<template>
  <div class="product-reviews mt-4">
    <h4>{{ $t('product.reviews') }}</h4>
    <div v-if="loading" class="text-muted">Loading reviews...</div>
    <div v-else-if="reviews.length === 0" class="text-muted">{{ $t('product.no_reviews') }}</div>
    <ul v-else class="list-group">
      <li v-for="review in reviews" :key="review.id" class="list-group-item">
        <strong>{{ review.user_name || "Anonymous" }}</strong>:
        <span>{{ review.comment }}</span>
        <small class="text-muted d-block">{{ formatDate(review.created_at) }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductReviews",
  props: {
    productId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      loading: false,
    };
  },
  methods: {
    async fetchReviews() {
      if (!this.productId) return;

      this.loading = true;
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/shop/${this.productId}/reviews/`);
        const data = await res.json();
        this.reviews = Array.isArray(data.results) ? data.results : [];
      } catch (err) {
        console.error("Error fetching reviews:", err);
        this.reviews = [];
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    },
  },
  mounted() {
    this.fetchReviews();
  },
  watch: {
    productId(newId, oldId) {
      if (newId !== oldId) this.fetchReviews();
    },
  },
};
</script>

<style scoped>
.product-reviews ul {
  padding-left: 0;
}
.product-reviews li {
  border: 1px solid #eee;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
}
</style>
