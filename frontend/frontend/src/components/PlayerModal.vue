<template>
  <div class="modal fade" id="playerModal" tabindex="-1" aria-hidden="true" ref="modalElement">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div :class="['modal-header text-white', headerClass]">
          <h5 class="modal-title">{{ player?.first_name }} {{ player?.surname }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <img
            :src="men-player?.profile_picture || '/images/default-player.jpg'"
            class="rounded-circle mb-3"
            width="120"
            height="120"
            alt="Player"
          />
          <p><strong>Position:</strong> {{ player?.position }}</p>
          <p v-if="player?.country"><strong>Country:</strong> {{ player.country }}</p>
          <p v-if="player?.email"><strong>Email:</strong> {{ player.email }}</p>
          <p v-if="player?.phone_number"><strong>Phone:</strong> {{ player.phone_number }}</p>
          <p v-if="player?.address"><strong>Address:</strong> {{ player.address }}</p>

          <!-- Guardian section (for Junior team) -->
          <div v-if="player?.guardian_name">
            <hr />
            <h6 class="fw-bold text-muted">Guardian Details</h6>
            <p><strong>Name:</strong> {{ player.guardian_name }}</p>
            <p><strong>Contact:</strong> {{ player.guardian_contact_number || 'N/A' }}</p>
            <p><strong>Email:</strong> {{ player.guardian_email || 'N/A' }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from "bootstrap";

export default {
  name: "PlayerModal",
  props: {
    player: { type: Object, default: null },
    headerClass: { type: String, default: "bg-primary" }, // allows per-team color
  },
  mounted() {
    this.modalInstance = new bootstrap.Modal(this.$refs.modalElement);
  },
  methods: {
    show() {
      this.modalInstance.show();
    },
  },
};
</script>
