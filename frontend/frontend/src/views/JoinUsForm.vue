<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="col-lg-8">
   


      <!-- Form Header -->
      <h2 class="text-center mb-4 fw-bold">{{$t('form.header')}}</h2>

      <!-- Candidate Information Card -->
      <div class="card mb-4 shadow-sm" style="background-color: #004d00; color: white;">
        <div class="card-header fw-bold">{{$t('form.candidate_info_title')}}</div>
        <div class="card-body">

          <!-- First Name -->
          <div class="mb-3">
            <label class="form-label">{{ $t('form.first_name') }}</label>
            <input v-model="form.first_name" type="text" class="form-control form-control-sm" />
            <div v-if="errors.first_name" class="text-warning small">{{ $t('form.errors.first_name') }}</div>
            <div v-if="backendErrors.first_name" class="alert alert-danger mt-2">
              <small>{{ backendErrors.first_name[0] }}</small>
            </div>
          </div>

          <!-- Surname -->
          <div class="mb-3">
            <label class="form-label">{{ $t('form.surname') }}</label>
            <input v-model="form.surname" type="text" class="form-control form-control-sm" />
            <div v-if="errors.surname" class="text-warning small">{{ $t('form.errors.surname') }}</div>
            <div v-if="backendErrors.surname" class="alert alert-danger mt-2">
              <small>{{ backendErrors.surname[0] }}</small>
            </div>
          </div>

          <!-- Date of Birth -->
          <div class="mb-3">
            <div class="col-md-4">
              <label class="form-label">{{ $t('form.date_of_birth')}}</label>
              <input v-model="form.date_of_birth" type="date" class="form-control form-control-sm" @change="checkAge" />
              <div v-if="errors.date_of_birth" class="text-warning small">{{ $t('form.errors.date_of_birth') }}</div>
              <div v-if="errors.age" class="text-warning small">{{ errors.age }}</div>
              <div v-if="backendErrors.date_of_birth" class="alert alert-danger mt-2">
              <small>{{ backendErrors.date_of_birth[0] }}</small>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-2">
                <label for="gender" class="form-label fw-bold">{{ $t('form.gender') }}</label>
                <select id="gender" v-model="form.gender" class="form-select" required>
                  <option disabled value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              <div v-if="errors.gender" class="text-warning small">{{ $t('form.errors.gender') }}</div>
            </div>
          </div>


          <!-- Phone Number -->
          <div class="row mb-3">
            <div class="col-md-3">
              <label class="form-label">{{ $t('form.country_code')}}</label>
              <select v-model="form.phone_country_code" class="form-select form-select-sm" :placeholder = "$t('form.holder.select_code')">
                <option disabled value="">{{  $t('form.holder.select_code') }}</option>
                <option v-for="code in phoneCodes" :key="code" :value="code">{{ code }}</option>
              </select>
              <div v-if="errors.phone_country_code" class="text-warning small">{{ $t('form.errors.phone_country_code') }}</div>
              <div v-if="backendErrors.phone_country_code" class="alert alert-danger mt-2">
                <small>{{ backendErrors.phone_country_code[0] }}</small>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ $t('form.phone_number')}}</label>
              <input v-model="form.phone_number" type="text" class="form-control form-control-sm" />
              <div v-if="errors.phone_number" class="text-warning small">{{ $t('form.errors.phone_number') }}</div>
              <div v-if="backendErrors.phone_number" class="alert alert-danger mt-2">
                <small>{{ backendErrors.phone_number[0] }}</small>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <div class="col-md-6">
              <label class="form-label">{{ $t('form.email')}}</label>
              <input v-model="form.email" type="email" class="form-control form-control-sm" />
              <div v-if="errors.email" class="text-warning small">{{ $t('form.errors.email') }}</div>
              <div v-if="backendErrors.email" class="alert alert-danger mt-2">
              <small>{{ backendErrors.email[0] }}</small>
              </div>
            </div>
          </div>

        <!-- Country and State -->
        <div class="row mb-3">
          <div class="col-md-4">
            <label class="form-label">Country</label>
            <select id="country" v-model="form.country_id" class="form-select form-select-sm" @change="updateStates" required>
              <option disabled value="">{{ $t('form.holder.select_country') }}</option>
              <option v-for="country in countries" :key="country.id" :value="country.id">
                {{ country.name }}
              </option>
            </select>
            <div v-if="errors.country" class="text-warning small">{{ $t('form.errors.country') }}</div>
            <div v-if="backendErrors.country_id" class="alert alert-danger mt-2">
                <small>{{ backendErrors.country_id[0] }}</small>
            </div>
          </div>

          <!-- State -->
          <div class="col-md-4">
            <label class="form-label">State</label>
            <select id="state" v-model="form.state_id" class="form-select form-select-sm" required>
              <option disabled value="">{{ $t('form.holder.select_state') }}</option>
              <option v-for="state in availableStates" :key="state.id" :value="state.id">
                {{ state.name }}
              </option>
            </select>
            <div v-if="errors.state_of_origin" class="text-warning small">{{ $t('form.errors.state_of_origin') }}</div>
            <div v-if="backendErrors.state_id" class="alert alert-danger mt-2">
                <small>{{ backendErrors.state_id[0] }}</small>
            </div>
          </div>
        </div>


          <!-- Address -->
          <div class="mb-3">
            <label class="form-label">{{ $t('form.address')}}</label>
            <textarea v-model="form.address" class="form-control form-control-sm"></textarea>
            <div v-if="errors.address" class="text-warning small">{{ $t('form.errors.address') }}</div>
            <div v-if="backendErrors.address" class="alert alert-danger mt-2">
              <small>{{ backendErrors.address[0] }}</small>
            </div>
          </div>

          <!-- Preferred Position -->
          <div class="mb-3">
            <div class="col-md-6">
            
            <label class="form-label">{{ $t('form.position')}}</label>
            <select v-model="form.position" class="form-select form-select-sm" use :placeholder="$t('form.holder.select_position')">
              <option disabled value="">{{ $t('form.holder.select_position')}}</option>
              <option value="GK">Goalkeeper</option>
              <option value="RCB">Right Center Back</option>
              <option value="LCB">Left Center Back</option>
              <option value="RWB">Right Wing Back</option>
              <option value="LWB">Left Wing Back</option>
              <option value="AM">Attacking Midfielder</option>
              <option value="DM">Defensive Midfielder</option>
              <option value="RWF">Right Wing Forward</option>
              <option value="LWF">Left Wing Forward</option>
              <option value="STK">Striker</option>
            </select>
            </div>
            <div v-if="errors.position" class="text-warning small">{{ $t('form.errors.position') }}</div>
            <div v-if="backendErrors.position" class="alert alert-danger mt-2">
              <small>{{ backendErrors.position[0] }}</small>
            </div>
          </div>

          <!-- Team -->
          <div class="mb-3">
            <div class="col-md-6">
              <label for="team_id" class="form-label">Preferred Team</label>
              <select v-model="form.team_id" class="form-select">
                <option value="">-- Select Team --</option>
                <option
                  v-for="team in teams"
                  :key="team.id"
                  :value="team.id"
                  >
                  {{ team.name }}
                </option>
              </select>
            </div>
          </div>

        <!-- Profile Picture -->
        <div class="mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ $t('form.profile_picture')}}</label>
            <input type="file" @change="handleFileUpload" class="form-control form-control-sm" ref="fileInput" />
            <div v-if="fileError" class="text-danger mt-1">{{ fileError }}</div>
              <small class="text-white">
                Max size: 2MB. Allowed formats: JPG, PNG, PDF.
              </small>
          </div>
        </div>
    </div>
  </div>

      <!-- Guardian Information Card -->
<div class="card mb-4 shadow-sm" style="background-color: #CD1C18; color: white;">
  <div class="card-header fw-bold">
    {{$t('form.guardian_info_title')}} 
    <span class="fw-light">{{$t('form.guardian_info_note')}}</span>
  </div>
  <div class="card-body">

    <!-- Guardian Name -->
    <div class="mb-3">
      <label class="form-label">{{ $t('form.guardian_name')}}</label>
      <input v-model="form.guardian_name" type="text" class="form-control form-control-sm"
             :disabled="!requiresGuardian" />
      <div v-if="errors.guardian_name" class="text-warning small">{{ $t('form.errors.guardian_name') }}</div>
      <div v-if="backendErrors.guardian_name" class="alert alert-danger mt-2">
        <small>{{ backendErrors.guardian_name[0] }}</small>
      </div>
    </div>

    <!-- Guardian Phone -->
    <div class="row mb-3">
      <div class="col-md-4">
        <label class="form-label">{{ $t('form.guardian_contact_code')}}</label>
        <select v-model="form.guardian_contact_code" class="form-select form-select-sm"
                :disabled="!requiresGuardian" use :placeholder="$t('form.holder.select_code')">
          <option disabled value="">{{ $t('form.holder.select_code')}}</option>
          <option v-for="code in phoneCodes" :key="code" :value="code">{{ code }}</option>
        </select>
        <div v-if="errors.guardian_contact_code" class="text-warning small">{{ $t('form.errors.guardian_contact_code') }}</div>
        <div v-if="backendErrors.guardian_contact_code" class="alert alert-danger mt-2">
          <small>{{ backendErrors.guardian_contact_code[0] }}</small>
        </div>
      </div>
      <div class="col-md-6">
        <label class="form-label">{{ $t('form.guardian_contact_number')}}</label>
        <input v-model="form.guardian_contact_number" type="text" class="form-control form-control-sm"
               :disabled="!requiresGuardian" />
        <div v-if="errors.guardian_contact_number" class="text-warning small">{{ $t('form.errors.guardian_contact_number') }}</div>
        <div v-if="backendErrors.guardian_contact_number" class="alert alert-danger mt-2">
          <small>{{ backendErrors.guardian_contact_number[0] }}</small>
        </div>
      </div>
    </div>

    <!-- Guardian Email -->
    <div class="mb-3">
      <div class="col-md-6">
        <label class="form-label">{{ $t('form.guardian_email')}}</label>
        <input v-model="form.guardian_email" type="email" class="form-control form-control-sm"
             :disabled="!requiresGuardian" />
        <div v-if="errors.guardian_email" class="text-warning small">{{ $t('form.errors.guardian_email') }}</div>
        <div v-if="backendErrors.guardian_email" class="alert alert-danger mt-2">
          <small>{{ backendErrors.guardian_email[0] }}</small>
        </div>
      </div>
    </div>

    <!-- Guardian Address -->
    <div class="mb-3">
      <label class="form-label">{{ $t('form.guardian_address')}}</label>
      <textarea v-model="form.guardian_address" class="form-control form-control-sm"
                :disabled="!requiresGuardian"></textarea>
      <div v-if="errors.guardian_address" class="text-warning small">{{ $t('form.errors.guardian_address') }}</div>
      <div v-if="backendErrors.guardian_address" class="alert alert-danger mt-2">
        <small>{{ backendErrors.guardian_address[0] }}</small>
      </div>
    </div>

  </div>
</div>
      <!-- Submit Button -->
      <div class="text-center">
        <button @click="submitForm" class="btn btn-lg text-white px-5" style="background-color: #004d00;">
          {{$t('form.submit')}}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";


///async function translateText(text, targetLang) {
  //try {
   // const response = await axios.post("http://127.0.0.1:8000/api/translate/", {
    //  text: text,
     // target_lang: targetLang,
    //});
   // return response.data.translated_text;
 // } catch (error) {
 //   console.error("Translation failed:", error);
  //  return text; // fallback to original text
 // }
//}


export default {
  name: "JoinUsNow",

   
  data() {
    return {
      

      form: {
        first_name: "",
        surname: "",
        date_of_birth: "",
        gender: "",
        phone_country_code: "",
        phone_number: "",
        email: "",
        country_id: "",
        state_id: "",
        address: "",
        position: "",
        team_id: "",
        profile_picture: null,
        guardian_name: "",
        guardian_contact_code: "",
        guardian_contact_number: "",
        guardian_email: "",
        guardian_address: "",

      },
      
      countries: [],
      availableStates: [],
      filteredStates: [],
      loading: false,
      error: null,
      isSubmitting: false,
      serverErrors: null,

   
      fileError:"",
      errors: {},
      backendErrors: {},
      teams: [],
      phoneCodes: ["+22", "+233", "+234", "+44", "+91"],
      requiresGuardian: false
    };
  },
  methods: {
       //async fetchTeams() {
     // try { const res = await axios.get("http://127.0.0.1:8000/api/teams/"); this.teams = res.data; } 
        
      //catch (err) { console.error(err); }
   // },

 
    beforeUnmount() {
  // Clean up listener
      this.$root.$off("language-changed", this.translateJoinUsNow);
      },

    //async translateJoinUsNow(selectedLang = this.$i18n.locale) {
      //if (selectedLang === 'en') return;

      //for (let news of this.newsList) {
        //news.title = await translateText(news.title, this.selectedLang);
        //news.content = await translateText(news.content, this.selectedLang);
       //}
    //},

    async fetchTeams() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/teams/");
        console.log("Teams API response:", res.data);

        //  Check if response is paginated
        const results = res.data.results ? res.data.results : res.data;

    //  Filter to show only KPFA teams
        this.teams = results.filter(team => team.is_kpfa_team === true);

        console.log("Filtered KPFA Teams:", this.teams); }
      catch (err) {
        console.error("Error fetching teams:", err);
      }
    },

    handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    // Reset previous error
    this.fileError = "";

    // Check type
    if (!allowedTypes.includes(file.type)) {
      this.fileError = "Invalid file type. Please upload JPG, PNG or PDF.";
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
      return;
    }

    // Check size
    if (file.size > maxSize) {
      this.fileError = "File size exceeds 2MB limit.";
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
      return;
    }

    // All checks passed
    this.form.profile_picture = file;
  },


    checkAge() {
      const birthDate = new Date(this.form.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
      if (age < 5) { this.errors.age = "Candidate must be at least 5 years old."; this.requiresGuardian = false; }
      else if (age > 21) { this.errors.age = "Candidate must be 21 years old or younger."; this.requiresGuardian = false; }
      else { this.errors.age = ''; this.requiresGuardian = age < 18; }
      return age;
    },
 
    
    watch: {
      "form.country_id"(newCountryId) {
      // Filter only states that belong to the selected country
        this.filteredStates = this.states.filter(
        (state) => state.country === newCountryId
      );
    },
  },

    validateForm() {
      this.errors = {};
      if (!this.form.first_name) this.errors.first_name = "First name is required.";
      if (!this.form.surname) this.errors.surname = "Surname is required.";
      if (!this.form.date_of_birth) this.errors.date_of_birth = "Date of birth is required.";
      if (!this.form.gender) this.errors.gender = "Gender is required.";
      if (!this.form.phone_country_code) this.errors.phone_country_code = "Phone code is required.";
      if (!this.form.phone_number) this.errors.phone_number = "Phone number is required.";
      if (!this.form.email) this.errors.email = "Email is required.";
      if (!this.form.country_id) this.errors.country = "Country is required.";
      if (!this.form.state_id) this.errors.state_of_origin = "State is required.";
      if (!this.form.address) this.errors.address = "Address is required.";
      if (!this.form.position) this.errors.position = "Preferred position is required.";
      //if (!this.form.team) this.errors.team = "Team selection is required.";

      if (this.requiresGuardian) {
        if (!this.form.guardian_name) this.errors.guardian_name = "Guardian name is required.";
        if (!this.form.guardian_contact_code) this.errors.guardian_contact_code = "Guardian phone code is required.";
        if (!this.form.guardian_contact_number) this.errors.guardian_contact_number = "Guardian phone number is required.";
        if (!this.form.guardian_email) this.errors.guardian_email = "Guardian email is required.";
        if (!this.form.guardian_address) this.errors.guardian_address = "Guardian address is required.";
      }
      return Object.keys(this.errors).length === 0;
    },
  async submitForm() {
    if (!this.validateForm()) {
      window.scrollTo(0, 0);
    return;
  }
    this.backendErrors = {};
    this.isSubmitting = true;
    this.serverErrors = null;

    try {
    const formData = new FormData();

    // ✅ Append regular fields
    for (const key in this.form) {
      if (key !== "team_id" && this.form[key] !== null && this.form[key] !== "") {
        formData.append(key, this.form[key]);
      }
    }

    // ✅ Handle the foreign key correctly (DRF expects "team")
    if (this.form.team_id) {
      formData.append("team_id", this.form.team_id);  // DRF expects 'team_id'
    }

    // ✅ Handle file upload safely
    if (this.form.profile_picture instanceof File) {
      formData.append("profile_picture", this.form.profile_picture);
    }

    console.log("🚀 Submitting form data to backend...");
    const response = await axios.post(
      "http://127.0.0.1:8000/api/candidates/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Candidate created:", response.data);

    // Redirect to candidate checkout
    const candidateId = response.data.id;
    if (candidateId) {
      console.log("Redirecting to checkout...");
      this.$router.push({
        name: "CandidateRegistrationCheckout",
        params: { candidateId },
      });
    }

  } catch (error) {
    console.error("🔥 Submission error:", error.response?.data || error);
    this.backendErrors = error.response?.data || { error: "Unexpected error occurred" };
  } finally {
    this.isSubmitting = false;
  }
  },


async translateServerErrors(rawErrors, targetLang) {
    // rawErrors: { field: [msg1, msg2], ... }
    const result = {};
    for (const [field, messages] of Object.entries(rawErrors)) {
      result[field] = [];
      for (const m of messages) {
        const t = await this.translateText(m, targetLang);
        result[field].push(t);
      }
    }
    return result;
  },

  //async translateText(text, targetLang) {
   // if (!text) return text;
   // try {
    //  const res = await axios.post("http://127.0.0.1:8000/api/translate/", {
    //    text: text,
      //  target_lang: targetLang,
     // });
    //  return (res.data && res.data.translated_text) || text;
   // } catch (e) {
   //   console.error("translateText error:", e);
    //  return text;
   // }
  //},
  async updateStates() {
  try {
    if (!this.form.country_id) {
      console.warn("⚠️ No country selected yet");
      this.availableStates = [];
      return;
    }

    console.log("📍 Fetching states for country:", this.form.country_id);
    const res = await fetch(
      `http://127.0.0.1:8000/api/states/?country=${this.form.country_id}`
    );

    if (!res.ok) {
      console.error("❌ Failed to fetch states:", res.status);
      return;
    }

    const data = await res.json();
    console.log("✅ States loaded:", data);

    this.availableStates = data.results || data;
  } catch (err) {
    console.error("🔥 Error fetching states:", err);
  }
},
},
watch: {
  "$i18n.locale"(newLang) {
    // optionally reset serverErrors when language changes
    if (newLang === "en") {
      // if you have stored last raw errors, you can reassign them untranslated
      // this.serverErrors = this.lastRawServerErrors || null;
    } else {
      // if you want, re-translate lastRawServerErrors automatically
    }
  },
  
},
async mounted() {
  this.fetchTeams(); // keep your existing team logic
  console.log("JoinUsForm mounted... starting data load");

  try {
    // === 1. Fetch Countries ===
    console.log("Fetching countries...");
    const countryRes = await fetch("http://127.0.0.1:8000/api/countries/");
    console.log("Country response status:", countryRes.status);

    if (!countryRes.ok) throw new Error("Failed to load countries");

    const countryData = await countryRes.json();
    console.log("Raw countryData:", countryData);

    this.countries = countryData.results || countryData;
    console.log("✅ Loaded countries:", this.countries);

    // ✅ NOTE: Do NOT fetch states here — user must select a country first.
  } catch (error) {
    console.error("❌ Error in mounted():", error);
  }
}
 
}    
</script>
