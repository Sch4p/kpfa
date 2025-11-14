<template>
  <div class="container my-5">
    <!-- About Section -->
    <section class="mb-5 text-center">
      <h2 class="fw-bold mb-4 text-success">{{ $t('aboutcontact.about_kpfa') }}</h2>
      <p class="lead text-muted">
        {{ $t('aboutcontact.abt1') }} <strong>{{ $t('aboutcontact.abt2') }}</strong> {{ $t('aboutcontact.abt3') }}
        {{ $t('aboutcontact.abt4') }}{{ $t('aboutcontact.abt5') }}
      </p>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="card shadow-sm border-0 p-3">
            <h5 class="text-primary">🏆 {{ $t('aboutcontact.vision_title') }}</h5>
            <p class="text-muted">{{ $t('aboutcontact.vision') }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0 p-3">
            <h5 class="text-primary">⚽ {{ $t('aboutcontact.mission_title') }}</h5>
            <p class="text-muted">{{ $t('aboutcontact.mission') }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0 p-3">
            <h5 class="text-primary">🌍 {{ $t('aboutcontact.core_values_title') }}</h5>
            <p class="text-muted">{{ $t('aboutcontact.core_values') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="text-center">
      <h2 class="fw-bold mb-4 text-success">{{ $t('aboutcontact.contact_us') }}</h2>
      <p class="text-muted mb-4">{{ $t('aboutcontact.cu_content') }}</p>

      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="submitForm" class="card shadow-sm p-4 border-0">
            <div class="mb-3">
              <label class="form-label " style="text-align: left;">{{ $t('aboutcontact.form_fname') }}</label>
              <input v-model="form.name" type="text" class="form-control" use :placeholder="$t('aboutcontact.form_pn')" required>
                                                                          
            </div>

            <div class="mb-3">
              <label class="form-label">{{ $t('aboutcontact.form_email') }}</label>
              <input v-model="form.email" type="email" class="form-control" use :placeholder="$t('aboutcontact.form_pe')" required>
            </div>

            <div class="mb-3">
              <label class="form-label">{{ $t('aboutcontact.form_msg') }}</label>
              <textarea v-model="form.message" class="form-control" rows="4" use :placeholder="$t('aboutcontact.form_pm')" required></textarea>
            </div>

            <button class="btn btn-success w-100" type="submit">{{ $t('aboutcontact.form_button') }}</button>
            <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>

          </form>
          
        </div>
      </div>

      <div class="mt-5">
        <h5 class="fw-bold">{{ $t('aboutcontact.academy_address') }}</h5>
        <p class="text-muted mb-0">{{ $t('banner.title') }}</p>
        <p class="text-muted mb-0">Lagos State, Nigeria</p>
        <p class="text-muted">📞 +234 816 402 7295 | ✉️ info@kpfa.com</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AboutContact",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post("http://127.0.0.1:8000/api/contact/", this.form);
        this.successMessage = "Thank you! Your message has been sent successfully.";
        this.errorMessage = "";
        this.form = { name: "", email: "", message: "" };
      } catch (error) {
        this.errorMessage = "Oops! Something went wrong. Please try again.";
        console.error("Contact form error:", error);
        this.successMessage = "";
      }
    },
  },
};

</script>

<style scoped>
.card {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.text-align{
  text-align:left;
}
</style>
