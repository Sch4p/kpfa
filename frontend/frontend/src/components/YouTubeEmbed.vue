<template>
  <div class="youtube-embed ratio ratio-16x9">
    <iframe
      v-if="videoId"
      :src="embedUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>

    <div v-else class="alert alert-warning text-center py-4">
      No video available
    </div>
  </div>
</template>

<script>
export default {
  name: "YouTubeEmbed",
  props: {
    videoId: {
      type: String,
      required: true,
    },
    nocookie: {
      // Use YouTube's privacy-enhanced mode by default
      type: Boolean,
      default: true,
    },
  },
  computed: {
    embedUrl() {
      const base = this.nocookie
        ? "https://www.youtube-nocookie.com/embed/"
        : "https://www.youtube.com/embed/";
      return `${base}${this.videoId}?rel=0`;
    },
  },
};
</script>

<style scoped>
.youtube-embed {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
