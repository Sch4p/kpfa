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
        :key="news.id || idx"
        class="col"
      >
        <NewsCard
          :id="news.id"
          :title="news.title"
          :content="news.content"
          :date="formatDate(news.date)"
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
  /* eslint-disable vue/multi-word-component-names */
  name: "News",
  components: { NewsCard },
  data() {
    return {
      newsList: [],
      newsOrig: [],
      loading: true,
      translateQueueLock: false,
      fallbackImage:
        "https://via.placeholder.com/400x250.png?text=Academy+News+Image",
    };
  },
  computed: {
    filteredNews() {
      // Returns only valid news objects with a title
      return this.newsList.filter((n) => n && typeof n === "object" && n.title);
    },
  },
  async created() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/news/");
      const validNews = Array.isArray(response.data)
        ? response.data.filter((n) => n && typeof n === "object" && n.title)
        : [];
      this.newsList = validNews;
      this.newsOrig = JSON.parse(JSON.stringify(validNews));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      this.loading = false;
    }
  },
  watch: {
    "$i18n.locale"(newLang, oldLang) {
      if (newLang === oldLang) return;
      if (newLang === "en") this.restoreOriginals();
      else this.translateAllNews(newLang);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "Unknown date";
      const d = new Date(date);
      return isNaN(d.getTime()) ? "Invalid date" : d.toLocaleDateString();
    },
    restoreOriginals() {
      if (this.newsOrig && this.newsOrig.length) {
        this.newsList = JSON.parse(JSON.stringify(this.newsOrig));
      }
    },
    async translateText(text, targetLang) {
      if (!text) return text;
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/translate/", {
          text,
          target_lang: targetLang,
        });
        return res.data.translated_text || text;
      } catch (err) {
        console.error("Translation failed:", err);
        return text;
      }
    },
    async translateAllNews(targetLang) {
      if (this.translateQueueLock) return;
      this.translateQueueLock = true;
      try {
        const tasks = this.newsOrig.map(async (origItem) => {
          const [tTitle, tContent] = await Promise.all([
            this.translateText(origItem.title, targetLang),
            this.translateText(origItem.content, targetLang),
          ]);
          return { ...origItem, title: tTitle, content: tContent };
        });
        const translated = await Promise.all(tasks);
        this.newsList = translated;
      } catch (e) {
        console.error("translateAllNews error:", e);
      } finally {
        this.translateQueueLock = false;
      }
    },
    updateComments({ newsId, comment }) {
      const newsItem = this.newsList.find((n) => n.id === newsId);
      if (newsItem) newsItem.comments.push(comment);
      const origItem = this.newsOrig.find((n) => n.id === newsId);
      if (origItem) origItem.comments?.push(comment);
    },
  },
};
</script>

<style scoped>
.text-muted {
  color: #6c757d;
}
</style>
