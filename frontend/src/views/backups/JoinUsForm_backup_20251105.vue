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

          <!-- Phone Number -->
          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label">{{ $t('form.country_code')}}</label>
              <select v-model="form.phone_country_code" class="form-select form-select-sm" use :placeholder = "$t('form.holder.select_code')">
                <option disabled value="">{{  $t('form.holder.select_code') }}</option>
                <option v-for="code in phoneCodes" :key="code" :value="code">{{ code }}</option>
              </select>
              <div v-if="errors.phone_country_code" class="text-warning small">{{ $t('form.errors.phone_country_code') }}</div>
              <div v-if="backendErrors.phone_country_code" class="alert alert-danger mt-2">
                <small>{{ backendErrors.phone_country_code[0] }}</small>
              </div>
            </div>
            <div class="col-md-8">
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
            <div class="col-md-8">
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
  <div class="col-md-6">
  <label for="country">{{ $t('form.country') }}</label>
  <select
    id="country"
    v-model="form.country"
    class="form-select form-select-sm"
    @change="updateStates"
    required use :placeholder="$t('form.holder.select.select_country')"
  >
    <option disabled value="" >{{ $t('form.holder.select_country') }}</option>
    <option v-for="country in countries" :key="country" :value="country">
      {{ country }}
    </option>
  </select>
<div v-if="errors.country" class="text-warning small">{{ $t('form.errors.country') }}</div>
              <div v-if="backendErrors.country_id" class="alert alert-danger mt-2">
                <small>{{ backendErrors.country_id[0] }}</small>
</div>
</div>
<!-- State -->
<div class="col-md-6">
  <label for="state">{{ $t('form.state_of_origin')}}</label>
  <select
    id="state"
    v-model="form.state_of_origin"
    class="form-select form-select-sm"
    required use :placeholder="$t('form.holder.select_state')"
  >
    <option disabled value="" >{{  $t('form.holder.select_state') }}</option>
    <option v-for="state in availableStates" :key="state" :value="state">
      {{ state }}
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
<!--<div class="mb-3">
  <label for="team" class="form-label">Select Team</label>
  <select
    id="team"
    v-model="form.team"
    class="form-select"
    required
  >
    <option value="" disabled>Select a KPFA Team</option>
    <option
      v-for="team in teams"
      :key="team.id"
      :value="team.id"
    >
      {{ team.name }}
    </option>
  </select>-->



<!-- Team -->
<div class="mb-3">
  <div class="col-md-6">
  <label for="team" class="form-label">Select Team</label>
  <select v-model="form.team" class="form-select form-select-sm" id="team" required use :placeholder="$t('form.holder.select_team')">
    <option value="">-- Select a KPFA Team --</option>
    <option v-for="team in teams" :key="team.id" :value="team.id">
      {{ team.name }}
    </option>
  </select>
  </div>
  <div v-if="errors.team" class="text-warning small">{{ $t('form.errors.team') }}</div>
 
  
</div>


<!--  <div class="mb-3">
            <label class="form-label">{{ $t('form.team')}}</label>
            <select v-model="form.team" class="form-select form-select-sm" use :placeholder="$t('form.holder.select_team')" id="team" required>
              <option disabled value="">{{ $t('form.holder.select_team')}}</option>
              <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
            </select>
            <div v-if="errors.team" class="text-warning small">{{ $t('form.errors.team') }}</div>
            <div v-if="backendErrors.team" class="alert alert-danger mt-2">
              <small>{{ backendErrors.team[0] }}</small>
            </div>
          </div>-->
        

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
      <div class="col-md-8">
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
        phone_country_code: "",
        phone_number: "",
        email: "",
        country_id: "",
        state_id: "",
        address: "",
        position: "",
        team: "",
        profile_picture: null,
        guardian_name: "",
        guardian_contact_code: "",
        guardian_contact_number: "",
        guardian_email: "",
        guardian_address: "",

      },

      countries: ["Nigeria", "Ghana", "Togo", "Benin", "Ivory Coast", "Niger"],
    countryStates: {
      Nigeria: [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
        "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
        "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
        "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
        "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
      ],
      Ghana: [
        "Greater Accra", "Ashanti", "Eastern", "Western", "Northern", "Volta",
        "Central", "Upper East", "Upper West", "Bono", "Bono East", "Ahafo",
        "Western North", "North East", "Savannah", "Oti"
      ],
      Togo: [
        "Maritime", "Plateaux", "Centrale", "Kara", "Savanes"
      ],
      Benin: [
        "Alibori", "Atacora", "Atlantique", "Borgou", "Collines",
        "Couffo", "Donga", "Littoral", "Mono", "Ouémé", "Plateau", "Zou"
      ],
      "Ivory Coast": [
        "Abidjan", "Bas-Sassandra", "Comoé", "Denguélé", "Gôh-Djiboua",
        "Lacs", "Lagunes", "Montagnes", "Sassandra-Marahoué", "Savanes",
        "Vallée du Bandama", "Woroba", "Yamoussoukro", "Zanzan"
      ],
       Niger: [
        "Agadez", "Diffa", "Dosso", "Maradi", "Tahoua",
        "Tillabéri", "Zindar", "Niamey Capital District"
      ],

    },
      fileError:"",
      errors: {},
      backendErrors: {},
      teams: [],
      phoneCodes: ["+22", "+233", "+234", "+1", "+44", "+91"],
      
      availableStates: [],
      requiresGuardian: false
    };
  },
  methods: {
       //async fetchTeams() {
     // try { const res = await axios.get("http://127.0.0.1:8000/api/teams/"); this.teams = res.data; } 
        
      //catch (err) { console.error(err); }
   // },


    updateStates() {
      this.availableStates = this.countryStates[this.form.country] || [];
      this.form.state_of_origin = ""; // reset state when country changes
    },

 
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
 
    async fetchCountries() {
      try { const res = await axios.get("http://127.0.0.1:8000/api/countries/"); this.countries = res.data; } 
      catch (err) { console.error(err); }
    },
    async fetchStates() {
      if (!this.form.country_id) { this.states = []; return; }
      try { const res = await axios.get(`http://127.0.0.1:8000/api/states/?country=${this.form.country_id}`); this.states = res.data; } 
      catch (err) { console.error(err); }
    },
    validateForm() {
      this.errors = {};
      if (!this.form.first_name) this.errors.first_name = "First name is required.";
      if (!this.form.surname) this.errors.surname = "Surname is required.";
      if (!this.form.date_of_birth) this.errors.date_of_birth = "Date of birth is required.";
      if (!this.form.phone_country_code) this.errors.phone_country_code = "Phone code is required.";
      if (!this.form.phone_number) this.errors.phone_number = "Phone number is required.";
      if (!this.form.email) this.errors.email = "Email is required.";
      if (!this.form.country_id) this.errors.country = "Country is required.";
      if (!this.form.state_id) this.errors.state_of_origin = "State is required.";
      if (!this.form.address) this.errors.address = "Address is required.";
      if (!this.form.position) this.errors.position = "Preferred position is required.";
      if (!this.form.team) this.errors.team = "Team selection is required.";

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
      if (!this.validateForm()) { window.scrollTo(0, 0); return; }
      this.backendErrors = {};
      this.isSubmitting = true;
      this.serverErrors = null;
      try {
          await axios.post("http://127.0.0.1:8000/api/candidates/", this.form);
      // success flow...
    }   catch (err) {
        if (err.response && err.response.data) {
        // err.response.data expected to be { field_name: ["error msg", ...], ... }
          const rawErrors = err.response.data;
        // Translate backend messages to selected locale (if not English)
          const lang = this.$i18n.locale || 'en';
          if (lang === 'en') {
            this.serverErrors = rawErrors;
        } else {
            this.serverErrors = await this.translateServerErrors(rawErrors, lang);
        }
      }   else {
            this.serverErrors = { non_field_errors: ["An unexpected error occurred."] };
      }
    }     finally {
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
mounted() {
  this.fetchTeams();
  // Listen for global translation change
   // this.$root.$on("language-changed", this.translateJoinUsNow); Has become obsolete(to be changed later)
    
      },


};
</script>
