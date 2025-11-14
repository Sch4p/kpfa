<template>
  <div class="container py-5">
    <h2 class="text-center mb-4 fw-bold">Academy Video Highlights</h2>
    <p class="text-center mb-5 text-muted">
      Watch our latest training sessions, match highlights, and player interviews.
    </p>

    <div class="row g-4">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card shadow-sm h-100 border-0">
          <YouTubeEmbed :video-id="video.id" />
          <div class="card-body">
            <h5 class="card-title">{{ video.title }}</h5>
            <p class="card-text small text-muted mb-0">
              {{ video.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeEmbed from "@/components/YouTubeEmbed.vue";

export default {
  name: "AcademyVideos",
  components: { YouTubeEmbed },
  data() {
    return {
      videos: [
  { 
    id: "yEcxh0gEtjE",
    title: "Full Training Session for Soccer",
    description: "Comprehensive football training session covering ball control, passing, and shooting drills.",
  },
  { 
    id: "zQdmPW018LQ",
    title: "Ball Mastery Training Session",
    description: "Focused drills to master ball handling, control, and agility for academy players.",
  },
  { 
    id: "art5mDfe9tE",
    title: "Full Group Football Training",
    description: "Team-oriented drills and exercises for group coordination and tactical awareness.",
  }
]
    };
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

h2 {
  letter-spacing: 0.5px;
}
</style>
