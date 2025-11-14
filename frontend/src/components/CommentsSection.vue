<template>
  <div class="comments-section px-3 pb-4">
    <h6 class="fw-semibold mb-3">💬 {{ $t('news.comments') }}</h6>

    <!-- Existing Comments -->
    <div v-if="comments && comments.length">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="border-bottom py-2 ps-2"
      >
        <!-- Comment Header -->
        <p class="mb-1 d-flex align-items-center">
          <span class="fw-bold me-2">{{ comment.user }}</span>
          <small class="text-muted">
            {{ new Date(comment.created_at).toLocaleString() }}
          </small>
        </p>

        <!-- Comment Text -->
        <p class="mb-1 ps-2">{{ comment.text }}</p>

        <!-- Likes & Reply -->
        <div class="d-flex align-items-center small text-muted ps-2 mb-2">
          <span
            @click="toggleLike(comment.id)"
            class="me-3 cursor-pointer text-primary"
            role="button"
          >
            👍 {{ comment.like_count }}
          </span>

          <button
            v-if="isLoggedIn"
            @click="setReplying(comment.id)"
            class="btn btn-link btn-sm p-0"
          >
            {{ replyingTo === comment.id ? $t('comments.cancel_reply') : $t('comments.reply') }}
          </button>
        </div>

        <!-- Reply Form -->
        <div v-if="replyingTo === comment.id" class="ms-3">
          <textarea
            v-model="replyText"
            class="form-control form-control-sm mb-2"
            placeholder="Write your reply..."
          ></textarea>
          <button
            @click="postReply(comment.id)"
            class="btn btn-success btn-sm"
            :disabled="loading || replyText.trim() === ''"
          >
            {{ loading ? "Posting..." : $t('comments.reply') }}
          </button>
        </div>

        <!-- Nested Replies -->
        <div v-if="comment.replies && comment.replies.length > 0" class="ms-3 mt-2">
          <button
            @click="toggleReplies(comment.id)"
            class="btn btn-link btn-sm p-0 text-decoration-none"
          >
            {{ expandedReplies[comment.id] ? $t('comments.hide_replies') : $t('comments.view_replies', { count: comment.replies.length }) }}
          </button>

          <div v-if="expandedReplies[comment.id]" class="mt-2 border-start ps-3">
            <div
              v-for="reply in comment.replies"
              :key="reply.id"
              class="py-1"
            >
              <p class="mb-1 d-flex align-items-center">
                <span class="fw-semibold me-2">{{ reply.user }}</span>
                <small class="text-muted">
                  {{ new Date(reply.created_at).toLocaleString() }}
                </small>
              </p>
              <p class="ps-2 mb-1">{{ reply.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-muted small">{{ $t('comments.no_comment_yet') }}</p>

    <!-- Add Comment Form (only if logged in) -->
    <div v-if="isLoggedIn" class="mt-3">
      <textarea
        v-model="newComment"
        class="form-control mb-2"
        :placeholder="$t('comments.placeholder')"
      ></textarea>
      <button
        @click="postComment"
        class="btn btn-primary btn-sm"
        :disabled="loading || newComment.trim() === ''"
      >
        {{ loading ? "Posting..." : $t('comments.post') }}
      </button>
    </div>
    <p v-else class="small text-muted mt-2">
      ⚠️ {{ $t('comments.login_to_comment') }}
      <router-link
  :to="{ path: '/fan-auth', query: { redirect: $route.fullPath } }"
  class="ms-1 text-primary"
>
  {{ $t('auth.login') }}
</router-link>
  </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentsSection",
  props: {
    newsId: { type: Number, required: true },
    comments: { type: Array, default: () => [] },
  },
  data() {
    return {
      newComment: "",
      replyText: "",
      replyingTo: null,
      loading: false,
      expandedReplies: {},
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    async postComment() {
      if (!this.newComment.trim()) return;
      this.loading = true;

      
    
      try {
        const token = localStorage.getItem("token");
        console.log("Submitting comment with token:", token);
        const response = await axios.post(
          `http://127.0.0.1:8000/api/news/${this.newsId}/comments/`,
          { text: this.newComment },
          { headers: { Authorization: `Token ${token}` },
            },
          
        );
        this.$emit("comment-added", { newsId: this.newsId, comment: response.data });
        this.newComment = "";
      } catch (error) {
        console.error("Error posting comment:", error.response?.data || error);

      } finally {
        this.loading = false;
      }
    },

    setReplying(commentId) {
      this.replyingTo = this.replyingTo === commentId ? null : commentId;
      this.replyText = "";
    },

    async postReply(parentId) {
      if (!this.replyText.trim()) return;
      this.loading = true;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://127.0.0.1:8000/api/news/${this.newsId}/comments/`,
          { text: this.replyText, parent: parentId },
          { headers: { Authorization: `Token ${token}` } }
        );
        this.$emit("comment-added", { newsId: this.newsId, comment: response.data });
        this.replyingTo = null;
        this.replyText = "";
      } catch (error) {
        console.error("Error posting reply:", error.response?.data || error);
      } finally {
        this.loading = false;
      }
    },

    async toggleLike(commentId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://127.0.0.1:8000/comments/${commentId}/like/`,
          {},
          { headers: { Authorization: `Token ${token}` } }
        );
        const updatedLikeCount = response.data.like_count;
        const comment = this.comments.find((c) => c.id === commentId);
        if (comment) comment.like_count = updatedLikeCount;
      } catch (error) {
        console.error("Error liking comment:", error.response?.data || error);
      }
    },

    toggleReplies(commentId) {
      this.expandedReplies = {
        ...this.expandedReplies,
        [commentId]: !this.expandedReplies[commentId],
      };
    },
  },
};
</script>

<style scoped>
.comments-section {
  background-color: #fafafa;
  border-radius: 10px;
  padding: 1rem;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
