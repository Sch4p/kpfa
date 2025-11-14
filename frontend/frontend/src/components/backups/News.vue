<template>
  <div class="container py-4">
    <h1 class="text-3xl font-bold text-blue-900 mb-4">
      {{ $t("news.title") || "Latest News" }}
    </h1>

    <!-- Loading state -->
    <div v-if="loading" class="text-center my-5 text-secondary">
      {{ $t("news.loading") || "Loading news..." }}
    </div>

    <!-- Empty state -->
    <div v-else-if="!filteredNews.length" class="text-center text-muted my-5">
      {{ $t("news.empty") || "No news available at the moment." }}
    </div>

    <!-- News list -->
    <div v-else class="row row-cols-1 row-cols-md-2 g-4">
      <div
        v-for="(news, idx) in filteredNews"
        :key="news?.id || idx"
        v-if="news"
        class="col"
      >
        <NewsCard
          :id="news.id"
          :title="news.title"
          :content="news.content"
          :date="news.created_at"
          :image="news.image || fallbackImage"
          :comments="news.comments || []"
          @comment-added="updateComments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewsCard from "@/components/NewsCard.vue";

export default {
  name: "News",
  components: { NewsCard },
  data() {
    return {
      newsList: [],
      newsOrig: [],
      loading: false,
      nextPage: null,
      fallbackImage: "https://via.placeholder.com/400x250.png?text=No+Image",
    };
  },
  computed: {
    filteredNews() {
      return this.newsList.filter((n) => n && n.title);
    },
  },
  methods: {
    async fetchNews(url = "http://127.0.0.1:8000/api/news/") {
      this.loading = true;
      try {
        const response = await axios.get(url);
        const newItems = Array.isArray(response.data.results)
          ? response.data.results
          : Array.isArray(response.data)
          ? response.data
          : [];

        const processedItems = newItems.map((item) => {
          let fixedImage = item.image;
          if (fixedImage && !fixedImage.startsWith("http")) {
            // NEWS images are stored under news_images
            fixedImage = `http://127.0.0.1:8000/media/news_images/${fixedImage}`;
          } else if (!fixedImage) {
            fixedImage = this.fallbackImage;
          }
          return { ...item, image: fixedImage };
        });

        if (url !== "http://127.0.0.1:8000/api/news/") {
          this.newsList.push(...processedItems);
        } else {
          this.newsList = processedItems;
          this.newsOrig = JSON.parse(JSON.stringify(processedItems));
        }

        this.nextPage = response.data.next;
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return "Unknown date";
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Unknown date";

      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    restoreOriginals() {
      if (this.newsOrig && this.newsOrig.length) {
        this.newsList = JSON.parse(JSON.stringify(this.newsOrig));
      }
    },

    updateComments({ newsId, comment }) {
      const newsItem = this.newsList.find((n) => n.id === newsId);
      if (newsItem) newsItem.comments.push(comment);
      const origItem = this.newsOrig.find((n) => n.id === newsId);
      if (origItem) origItem.comments?.push(comment);
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>

<style scoped>
.text-muted {
  color: #6c757d;
}
</style>
