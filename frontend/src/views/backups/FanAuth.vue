<template> 
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title mb-4 text-center">
              {{ mode === "signup" ? $t('auth.register') : $t('auth.login') }}
            </h3>

            <!-- Message -->
            <div v-if="message" class="alert alert-info">{{ message }}</div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit">
              <!-- Username -->
              <div class="mb-3" v-if="mode === 'signup' || mode === 'login'">
                <label for="username" class="form-label">{{ $t('auth.username')}}</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  v-model="form.username"
                  required
                />
              </div>

              <!-- Email (signup only) -->
              <div class="mb-3" v-if="mode === 'signup'">
                <label for="email" class="form-label">{{ $t('auth.email')}}</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="form.email"
                  required
                />
              </div>

              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">{{ $t('auth.password')}}</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="form.password"
                  required
                />
              </div>

              <!-- Submit -->
              <button type="submit" class="btn btn-success w-100">
                {{ mode === "signup" ?  $t('auth.submit') : $t('auth.login') }}
              </button>
            </form>

            <!-- Toggle -->
            <p class="mt-3 text-center">
              {{ mode === "signup" ? $t('auth.already_account') : $t('auth.dont_have_account') }}
              <a href="#" @click.prevent="toggleMode">
                {{ mode === "signup" ? $t('auth.login') : $t('auth.submit') }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FanAuth",
  data() {
    return {
      mode: "signup", // default to signup
      form: {
        username: "",
        email: "",
        password: ""
      },
      message: ""
    };
  },
  methods: {
    async handleSubmit() {
  try {
    const url =
      this.mode === "signup"
        ? "http://127.0.0.1:8000/api/register/"
        : "http://127.0.0.1:8000/api/login/";

    const response = await axios.post(url, this.form);

    if (this.mode === "signup") {
      this.message = "Signup successful! Please login with your credentials.";
      this.mode = "login";
      this.form.password = "";
      this.form.email = "";
    } else {
      this.message = `Login successful! Welcome back ${response.data.username}`;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      // trigger update in App.vue
      window.dispatchEvent(new Event("storage"));

      

      // ✅ check for pending candidate form
      const pendingForm = sessionStorage.getItem("pendingCandidateForm");
      if (pendingForm && this.$route.query.fromCandidate) {
        try {
          const parsedForm = JSON.parse(pendingForm);

          // create form data for backend
          const formData = new FormData();
          for (const key in parsedForm) {
            if (parsedForm[key] !== null && parsedForm[key] !== "")
              formData.append(key, parsedForm[key]);
          }

          const redirectPath = this.$route.query.redirect || "/";
          this.$router.push(redirectPath);
          return;

          // send to backend
          const candidateResponse = await axios.post(
            "http://127.0.0.1:8000/api/candidates/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${response.data.token}`,
              },
            }
          );

          const candidateId = candidateResponse.data.id;

          // clear session storage
          sessionStorage.removeItem("pendingCandidateForm");

         

          // redirect to checkout directly
          this.$router.push({
            name: "CandidateRegistrationCheckout",
            params: { candidateId },
          });

          return; // ✅ stop further redirect
        } catch (submissionError) {
          console.error("❌ Error auto-submitting candidate form:", submissionError);
          this.message =
            "Login succeeded but we couldn’t complete your application. Please try again.";
        }
      }

      // default redirect (if not from candidate form)
      // ✅ Determine correct redirect
let redirectPath = "/join-us"; // default to JoinUsForm
if (this.$route.query.redirect && this.$route.query.redirect.startsWith("/")) {
  redirectPath = this.$route.query.redirect; // use actual path if provided
}

// Add a flag to indicate they need to re-attach the file
sessionStorage.setItem("needsFileReattach", "true");

this.$router.push(redirectPath);

    }
  } catch (error) {
    this.message =
      error.response?.data?.error ||
      "Error: Something went wrong. Please try again.";
  }
},

    toggleMode() {
      this.mode = this.mode === "signup" ? "login" : "signup";
      this.message = "";
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
    }
  }
};
</script>
