<template>
  <div ref="videoContainer" class="video-wrapper">
    <!-- Main Video Thumbnail -->
    <div v-if="!isPlaying" class="video-thumbnail" @click="playInline">
      <img
        :src="`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`"
        alt="Video thumbnail"
        class="img-fluid rounded shadow-sm"
      />
      <button class="play-btn">▶</button>
    </div>

    <!-- Inline YouTube Player -->
    <div v-else class="ratio ratio-16x9 rounded shadow-sm overflow-hidden">
      <iframe
        ref="mainIframe"
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        class="w-100 h-100"
      ></iframe>
    </div>

    <!-- Floating Mini Player -->
    <transition name="fade">
      <div
        v-if="isFloating"
        ref="floatingPlayer"
        class="floating-player card border-0 shadow-lg position-fixed"
        :style="floatingStyle"
      >
        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-1 px-2">
          <span class="small">{{ title }}</span>
          <button class="btn btn-sm btn-outline-light" @click="closeFloating">✕</button>
        </div>
        <div class="ratio ratio-16x9">
          <iframe
            ref="miniIframe"
            :src="`https://www.youtube.com/embed/${videoId}?enablejsapi=1`"
            frameborder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            class="w-100 h-100"
          ></iframe>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

export default {
  name: "YouTubeFloating",
  props: {
    videoId: { type: String, required: true },
    title: { type: String, default: "" },
    threshold: { type: Number, default: 200 },
  },
  setup(props) {
    const videoContainer = ref(null);
    const mainIframe = ref(null);
    const miniIframe = ref(null);
    const isPlaying = ref(false);
    const isFloating = ref(false);
    const isClosedManually = ref(false);
    const pos = ref({ x: 20, y: 20 });

    const floatingStyle = computed(() => ({
      bottom: `${pos.value.y}px`,
      right: `${pos.value.x}px`,
      width: "320px",
      zIndex: 9999,
    }));

    const playInline = async () => {
      isPlaying.value = true;
      await nextTick();
      isClosedManually.value = false; // ✅ reset after reactivity settles
      setTimeout(() => {
        videoContainer.value.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    };

    const pauseVideo = (iframeRef) => {
      try {
        iframeRef?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
      } catch (e) {
        console.warn("Pause message failed:", e);
      }
    };

    const onScroll = () => {
      if (!videoContainer.value) return;
      const rect = videoContainer.value.getBoundingClientRect();

      if (!isClosedManually.value && rect.bottom < props.threshold && isPlaying.value && !isFloating.value) {
        pauseVideo(mainIframe.value);
        isFloating.value = true;
      } else if (rect.top >= props.threshold && isFloating.value) {
        isFloating.value = false;
        pauseVideo(miniIframe.value);
      }
    };

    const closeFloating = () => {
      isFloating.value = false;
      isClosedManually.value = true;
      pauseVideo(miniIframe.value);
    };

    onMounted(() => window.addEventListener("scroll", onScroll));
    onUnmounted(() => window.removeEventListener("scroll", onScroll));

    return {
      videoContainer,
      mainIframe,
      miniIframe,
      isPlaying,
      isFloating,
      isClosedManually,
      floatingStyle,
      playInline,
      closeFloating,
    };
  },
};
</script>


<style scoped>
.video-thumbnail {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
.video-thumbnail img {
  width: 100%;
  display: block;
  border-radius: 10px;
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 10px 18px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}
.play-btn:hover {
  background: rgba(255, 0, 0, 0.7);
}
.floating-player {
  bottom: 20px;
  right: 20px;
  width: 320px;
  border-radius: 10px;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
