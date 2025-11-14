<template>
  <!--import { onMounted } from 'vue';
    import { useCartStore } from '@/stores/cart';   
    setup() {
    const cart = useCartStore();
    onMounted(() => cart.load());
  },-->
  <div :dir="isRtl ? 'rtl' : 'ltr'">
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Hero Banner -->
    <HeroBanner />

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #004d00;">
      <div class="container-fluid">
        <!-- Mobile toggler -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">{{ $t('navbar.home')}}</router-link>
            </li>
           <li 
  class="nav-item dropdown"
  @mouseenter="showDropdown = true"
  @mouseleave="showDropdown = false"
  :class="{ active: $route.path.startsWith('/teams') }"
  style="position: relative;"
>
  <a
    href="#"
    class="nav-link dropdown-toggle text-white fw-normal"
    role="button"
  >
    {{ $t('navbar.teams') }}
  </a>

  <transition name="slide-fade">
    <ul
      v-show="showDropdown"
      class="dropdown-menu show border-0 shadow mt-2"
      style="
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 190px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #004d00;
        padding: 0;
      "
    >
      <li
        v-for="(team, index) in teamSubmenus"
        :key="team.route"
        :style="{
          backgroundColor: index % 2 === 0 ? '#004d00' : '#006600',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }"
        @mouseover="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <router-link
          :to="team.route"
          class="dropdown-item d-block text-center fw-bold"
          :style="{
            color:
              hoverIndex === index
                ? '#004d00' // Green when hovered (white bg)
                : 'white',
            backgroundColor:
              hoverIndex === index
                ? 'white' // White background on hover
                : index % 2 === 0
                ? '#004d00'
                : '#006600',
            transition: 'all 0.3s ease',
          }"
        >
          {{ team.label }}
        </router-link>
      </li>
    </ul>
  </transition>
</li>

            <li class="nav-item">
              <router-link to="/news" class="nav-link" :class="{ active: $route.path === '/news' }">{{ $t('navbar.news')}}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/matches" class="nav-link" :class="{ active: $route.path === '/matches' }">{{ $t('navbar.matches')}}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/videos" class="nav-link" :class="{ active: $route.path === '/videos' }">{{ $t('navbar.videos') }}</router-link>
            </li>

            <li class="nav-item">
            <router-link to="/eshop" class="nav-link">{{ $t('navbar.eshop') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">{{ $t('navbar.aboutcontact')}}</router-link>
            </li>
          </ul>

          <!-- Right-aligned section -->
          <ul class="navbar-nav ms-auto d-flex gap-3 align-items-center">
            <!-- Show logged in username -->
            <li v-if="username" class="nav-item text-white fw-bold">
              {{ $t('navbar.greetings') }}, {{ username }}
            </li>

            <!-- Logout button -->
            <li v-if="username" class="nav-item">
              <button class="btn btn-sm btn-outline-light" @click="logout">{{ $t('auth.logout')}}</button>
            </li>

            <!-- Join Us Now Button -->
            <li class="nav-item">
              <router-link
                to="/join-us"
                class="nav-link px-3 py-2 d-flex justify-content-center align-items-center"
                :style="joinUsStyle"
                @mouseover="hoverJoinUs(true)"
                @mouseleave="hoverJoinUs(false)"
              >
                {{ $t('buttons.join') }}
              </router-link>
            </li>

            <!-- Sign-Up/Login Button -->
            <li class="nav-item" v-if="!username">
              <router-link
                :to="{ path: '/fan-auth', query: { redirect: $route.fullPath } }"
                class="nav-link px-3 py-2 d-flex justify-content-center align-items-center"
                :style="signUpStyle"
                @mouseover="hoverSignUp(true)"
                @mouseleave="hoverSignUp(false)"
              >
                {{ $t('buttons.login') }}
              </router-link>
            </li>

            <!-- Language Switcher -->
            <li class="nav-item d-flex align-items-center">
              <select :value="$i18n.locale" 
              @change="changeLanguage($event)" 
             
              class="form-select form-select-sm">
              
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="yo">Yoruba</option>
                <option value="ha">Hausa</option>
                <option value="ig">Igbo</option>
                <option value="tw">Twi(Ghana)</option>
                <option value="ga">Ga(Ghana)</option>
                <option value="ar">Arabic</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="flex-grow-1 container my-4">
    

      <!-- Router View -->
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3">
      {{ $t('footer.copyright')}}<br>
      {{ $t('footer.developer')}}
    </footer>
  </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart'; 
import HeroBanner from "@/components/HeroBanner.vue";
import { emitter } from "@/utils/emitter";
//import axios from "axios";


export default {
  computed: {
    isRtl() {
     
      return this.$i18n.locale === "ar";
    },
  },
  name: "App",
  components: { HeroBanner },

  setup() {
    const cart = useCartStore();
    onMounted(() => cart.load());
  },
 
  data() {
    return {
      showDropdown: false,
    hoverIndex: null,
    teamSubmenus: [
      { label: "Men's Team", route: "/teams" },
      { label: "Women's Team", route: "/teams/women" },
      { label: "Junior Team", route: "/teams/junior" },
    ],
    

      username: null,

      joinUsStyle: {
        backgroundColor: "#950606",
        color: "#fff",
        borderRadius: "0.25rem",
        height: "50px",
        minWidth: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s",
      },
      signUpStyle: {
        backgroundColor: "#6c757d",
        color: "#fff",
        borderRadius: "0.25rem",
        height: "50px",
        minWidth: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s",
      },
    };
  },
  mounted() {
    // Load username from localStorage at startup
    this.username = localStorage.getItem("username");

    // Listen for login/logout changes across tabs
    window.addEventListener("storage", this.syncUser);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.syncUser);
  },
  methods: {
    changeLanguage(event) {
    const newLang = event.target.value;
    this.$i18n.locale = newLang;
    // Notify other components (like Home.vue) instantly
    emitter.emit("locale-changed", newLang);
  },

     // async handleGlobalLanguageChange(selectedLang) {
     //   try {
    // Translate all dynamic content
    // 1 Update backend API calls (e.g., News, Home, Matches, etc.)
     // const routesToTranslate = ["/news", "/", "/matches", "/teams"];
     //   if (routesToTranslate.includes(this.$route.path)) {
      //    this.$emit("language-changed", selectedLang);
 //}

    // 2 Optional: store selectedLang in localStorage to persist language
  //  localStorage.setItem("selectedLanguage", selectedLang);
 // } catch (error) {
  //  console.error("Global translation error:", error);
 // }
//},

    //async languageChanged(selectedLang) {
      // Example dynamic translation
    //  const textToTranslate = "Some dynamic text to translate";
     // try {
     //   const translated = await this.translateText(textToTranslate, selectedLang);
    //    this.dynamicText = translated;
    //  } catch (error) {
    //    console.error("Error during translation:", error);
    //  }
   // },
  //  async translateText(text, targetLang) {
 //     try {
   //     const response = await axios.post("http://127.0.0.1:8000/api/translate/", {
  //        text: text,
  //        target_lang: targetLang,
  //      });
  //      return response.data.translated_text;
  //    } catch (error) {
  //      console.error("Translation error:", error.response ? error.response.data : error);
   //     return text; // fallback
  //    }
  //  },
    syncUser() {
      this.username = localStorage.getItem("username");
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.username = null;
      this.$router.push("/");
    },
    hoverJoinUs(isHovered) {
      this.joinUsStyle.backgroundColor = isHovered ? "#fff" : "#CD1C18";
      this.joinUsStyle.color = isHovered ? "#CD1C18" : "#fff";
    },
    hoverSignUp(isHovered) {

      this.signUpStyle.backgroundColor = isHovered ? "#fff" : "#6c757d";
      this.signUpStyle.color = isHovered ? "#6c757d" : "#fff";
    },
   // changeLanguage(event) {
   //   const selectedLang = event.target.value;
   //   this.$i18n.locale = selectedLang; 
  //    localStorage.setItem("selectedLanguage", selectedLang);

  // Also trigger the dynamic translation event
      //this.handleGlobalLanguageChange(selectedLang);
 // },

    
  },
  watch: {
  '$i18n.locale': {
    immediate: true,
    //handler(newLang) {
      //this.handleGlobalLanguageChange(newLang);
 //}
  }
},
};

</script>

<style>
/* Add any global styles here */
 /* Default LTR (English, French, Yoruba, Hausa, Igbo, Twi, Ga) */
      body[dir="ltr"] {
      text-align: left;
      direction: ltr;
      }       
      /* RTL for Arabic */
      body[dir="rtl"] {
      text-align: right;
      direction: rtl;
    }

    /* Enable dropdown on hover */
.hover-dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
}

/* Optional — keep it smooth */
.dropdown-menu {
  transition: all 0.2s ease-in-out;
}

/* Ensure dropdown stays visible when hovered */
.hover-dropdown .dropdown-menu {
  display: none;
  position: absolute;
}

/* Smooth dropdown slide animation */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}




/* Hover glow and transition */
.dropdown-menu .dropdown-item {
  transition: all 0.3s ease-in-out;
}



/* Optional: Rounded corners & subtle shadow for dropdown itself */
.dropdown-menu {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
}




</style>
