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
      <div v-for="(news, idx) in filteredNews" :key="news.id || idx" class="col">
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
  /* eslint-disable vue/multi-word-component-names */
  name: "News",
  components: { NewsCard },
  data() {
    return {
      newsList: [],
      newsOrig: [],
      loading: false,
      nextPage: null,
      translateQueueLock: false,
      fallbackImage: "https://via.placeholder.com/400x250.png?text=Academy+News+Image",
    };
  },
  computed: {
    filteredNews() {
      return this.newsList.filter((n) => n && typeof n === "object" && n.title);
    },
  },
  watch: {
    "$i18n.locale"(newLang, oldLang) {
      console.log(`🌐 Language changed from ${oldLang} ➜ ${newLang}`);
      if (newLang === oldLang) return;
      console.log("🔁 Restoring originals...");
      if (newLang === "en") this.restoreOriginals();
      else
       console.log("🈯 Translating all news...");
       this.translateAllNews(newLang);
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
          // Fix image path for news_images folder
          let fixedImage = item.image;
          if (fixedImage && !fixedImage.startsWith("http")) {
            fixedImage = `http://127.0.0.1:8000${fixedImage}`;
          } else if (!fixedImage) {
            fixedImage = "https://via.placeholder.com/400x250.png?text=No+Image";
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
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        this.loading = false;
      }
    },

   // formatDate(date) {
     // if (!date) return "Unknown date";
      //const d = new Date(date);
      //return isNaN(d.getTime()) ? "Invalid date" : d.toLocaleDateString();
    //},

    formatDate(dateStr) {
      if (!dateStr) return "Unknown date";
        const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Unknown date";

  // Format: e.g., Nov 4, 2025
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

    // ===============================
    // Translation code preserved (commented)
    // ===============================
    
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
      if (this.translateQueueLock){
        console.warn("⚠️ Translation already running, skipping...");
      return;
      }
        this.translateQueueLock = true;
        console.log(`🚀 Starting translation to ${targetLang}...`);
      try {
        const tasks = this.newsOrig.map(async (origItem) => {
          console.log(`🔤 Translating: ${origItem.title}`);
          const [tTitle, tContent] = await Promise.all([
            this.translateText(origItem.title, targetLang),
            this.translateText(origItem.content, targetLang),
          ]);
          return { ...origItem, title: tTitle, content: tContent };
        });
        const translated = await Promise.all(tasks);
        this.newsList = translated;
        console.log("✅ Translation completed.");
      } catch (e) {
        console.error("translateAllNews error:", e);
      } finally {
        this.translateQueueLock = false;
      }
    }
    
  },
  mounted() {
    this.fetchNews();
  }
};
</script>

<style scoped>
.text-muted {
  color: #6c757d;
}
</style>
