<template>
  <!--Test Local History-->
  <div class="home-page">

    <!-- Logo Overlay (shows once every 24h)  -->
    <transition name="fade">
      <div
        v-if="showLogoOverlay"
        class="logo-overlay d-flex flex-column align-items-center justify-content-center"
        role="dialog"
        aria-modal="true"
      >
        <button class="close-btn" @click="closeOverlay" aria-label="Close overlay">&times;</button>
        <img src="/images/logo.jpg" alt="KPFA Logo" class="overlay-logo mb-3" />
        <div class="text-center">
          <h2 class="text-white fw-bold">Welcome to Kutty Philips Football Academy</h2>
          <div class="mt-4">
            <router-link to="/join-us" class="btn btn-lg btn-light me-3">Join KPFA</router-link>
            <router-link to="/teams" class="btn btn-lg btn-outline-light me-3">View Current Teams</router-link>
            <router-link to="/eshop" class="btn btn-lg btn-light me-3">Visit eShop</router-link>
          </div>
        </div>
      </div>
    </transition>

    <!-- Hero Section (hero1.jpg) -->
    <section
      class="hero text-white text-center d-flex align-items-center justify-content-center"
      :style="heroStyle" 
      aria-label="Hero"
    >
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">{{ $t('banner.title') }}</h1>
        <p class="hero-subtitle">Building Champions of Tomorrow</p>
        <div class="hero-buttons mt-4">
          <router-link to="/join-us" class="btn btn-lg btn-primary me-3">{{ $t('buttons.join') }}</router-link>
          <router-link to="/teams" class="btn btn-lg btn-outline-light me-3">{{ $t('buttons.view_teams') }}</router-link>
          <router-link to="/eshop" class="btn btn-lg btn-success">{{ $t('buttons.visit_eshop') }}</router-link>
        </div>
      </div>
    </section>

    <div class="container my-5">

      <!-- About Snippet (static excerpt; links to About page/component) -->
      <section class="about-snippet text-center mb-5">
        <h2 class="section-title">{{ $t('navbar.aboutcontact') }}</h2>
        <p class="lead text-muted">
          Kutty Philips Football Academy nurtures young football talents through structured coaching, education, and mentorship — combining fitness, technique and character development to build tomorrow’s champions.
        </p>
        <router-link to="/about" class="btn btn-success mt-3">{{ $t('news.read_more') }}</router-link>
      </section>

      <!-- Featured Teams -->
      <section v-if="teamsLoaded" class="mb-5">
        <h2 class="text-center section-title mb-4 fw-bold">{{ $t('teams.title') }}</h2>
        <!--Men Team Card-->
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card team-card shadow-sm border-0 h-100">
              <div class="card-img-wrapper">
                <img
                  src="/images/men_team.png"
                  class="card-img-top"
                  alt="Men Team"
                />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title fw-semibold">Kutty Philips FC</h5>
                <p class="card-text text-muted">Meet our senior men’s squad, full of skill, speed, and passion.</p>
                <router-link to="/teams" class="btn btn-outline-success">
                  {{ $t('buttons.view_teams') }}
                </router-link>
              </div>
            </div>
          </div>
          <!--Women Team Card-->
          <div class="col-md-4">
            <div class="card team-card shadow-sm border-0 h-100">
              <div class="card-img-wrapper">
                <img
                  src="/images/women_team.png"
                  class="card-img-top"
                  alt="Women Team"
                />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title fw-semibold">Kutty Philips FC (Women)</h5>
                <p class="card-text text-muted"> Our women’s team—strength, skill, and determination personified.</p>
                <router-link to="/teams/women" class="btn btn-outline-success">
                  View Team
                </router-link>
              </div>
            </div>
          </div>
        <!-- Junior Team Card -->
          <div class="col-md-4">
            <div class="card team-card shadow-sm border-0 h-100">
              <div class="card-img-wrapper">
                <img
                  src="/images/junior_team.png"
                  class="card-img-top"
                  alt="Junior Team"
                />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title fw-semibold">Kutty Philips FC (Junior)</h5>
                <p class="card-text text-muted">Nurturing the future stars of KPFA with dedication and teamwork.</p>
                <router-link to="/teams/junior" class="btn btn-outline-success">
                  View Team
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="!teams || teams.length === 0" class="text-center w-100 py-4">
            <small class="text-muted">Teams are loading or not available yet.</small>
          </div>
        </div>
        
      </section>

      <!-- Latest News highlight -->
      <section v-if="newsLoaded" class="latest-news mb-5">
        <h2 class="section-title text-center mb-4">{{ $t("news.title") || "Latest News" }}</h2>
        <div class="row">
          <div
            class="col-md-4 mb-4"
            v-for="(article, idx) in (news || []).slice(0, 3)"
            :key="article && article.id ? article.id : `news-${idx}`"
          >
            <div class="card h-100 shadow-sm">
              <img v-if="article && article.image" :src="article.image" class="card-img-top" alt="News image" />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ (article && article.title) || 'Untitled' }}</h5>
                <p class="card-text text-muted">{{ (article && (article.excerpt || article.summary || (article.content && article.content.slice(0, 120) + '...'))) || '' }}</p>
                <div class="mt-auto">
                  <router-link :to="`/news/${article && article.id || ''}`" class="btn btn-sm btn-primary">{{ $t('news.read_more') }}</router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!news || news.length === 0" class="text-center w-100 py-4">
            <small class="text-muted">News are loading or not available yet.</small>
          </div>
        </div>
      </section>

    <!-- eShop Highlights (auto-scroll + chevrons) -->
    <section v-if="displayShop.length" class="mb-5 position-relative">
    <h2 class="text-center mb-4 fw-bold text-warning">eShop Highlights</h2>

    <div v-if="!shopLoaded" class="text-center text-muted py-5">
      Loading shop items…
    </div>

    <div v-else-if="shopItems.length === 0" class="text-center text-secondary py-5">
    No products available.
    </div>

        <div
          class="auto-scroll-wrapper position-relative"
          ref="scrollWrapper"
          @mouseenter="pauseScroll"
          @mouseleave="resumeScroll"
          @focusin="pauseScroll"
          @focusout="resumeScroll"
        >
          <button class="chev chev-left" @click="manualScroll(-1)" aria-label="Scroll left" title="Scroll left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>

          <div class="auto-scroll-inner d-flex" ref="scrollInner" role="list">
            <!-- primary set -->
            <div
              v-for="(item, idx) in displayShop"
              :key="item && item.id ? `shop-${item.id}` : `shop-${idx}`"
              class="card mx-2 shadow-sm auto-card"
              role="listitem"
              tabindex="0"
            >
              <img v-if="item && item.image" :src="item.image" class="card-img-top" :alt="item.name" style="height:180px;object-fit:cover;border-top-left-radius:.75rem;border-top-right-radius:.75rem;" />
              <div class="card-body text-center">
                <h6 class="card-title fw-bold mb-1">{{ (item && item.name) || 'Product' }}</h6>
                <p class="card-text text-muted mb-2">₦{{ (item && item.price) ?? '0.00' }}</p>
                <div class="d-flex justify-content-center gap-2">
                  <button class="btn btn-sm btn-outline-success" @click.stop="addToCart(item)">Add to Cart</button>
                  <router-link :to="`/eshop/${item && (item.slug || item.id) || ''}`" class="btn btn-sm btn-success">View</router-link>
                </div>
              </div>
            </div>

            <!-- duplicate for seamless loop -->
            <div
              v-for="(item, idx2) in displayShop"
              :key="item && item.id ? `shop-dup-${item.id}` : `shop-dup-${idx2}`"
              class="card mx-2 shadow-sm auto-card"
              role="listitem"
              tabindex="0"
            >
              <img v-if="item && item.image" :src="item.image" class="card-img-top" :alt="item.name" style="height:180px;object-fit:cover;border-top-left-radius:.75rem;border-top-right-radius:.75rem;" />
              <div class="card-body text-center">
                <h6 class="card-title fw-bold mb-1">{{ (item && item.name) || 'Product' }}</h6>
                <p class="card-text text-muted mb-2">₦{{ (item && item.price) ?? '0.00' }}</p>
                <div class="d-flex justify-content-center gap-2">
                  <button class="btn btn-sm btn-outline-success" @click.stop="addToCart(item)">Add to Cart</button>
                  <router-link :to="`/eshop/${item && (item.slug || item.id) || ''}`" class="btn btn-sm btn-success">View</router-link>
                </div>
              </div>
            </div>
          </div>

          <button class="chev chev-right" @click="manualScroll(1)" aria-label="Scroll right" title="Scroll right">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <div class="text-center mt-3">
          <router-link to="/eshop" class="btn btn-success btn-lg me-2">{{ $t('buttons.view_products') }}</router-link>
        </div>
      </section>

     <!-- Upcoming Match (only nearest) -->
<section class="my-5">
  <h3 class="mb-4 text-center fw-bold text-success">{{ $t('matches.upcoming') }}</h3>

  <div v-if="upcomingMatch" class="card shadow-sm p-4 border-0 mx-auto" style="max-width: 600px; background-color: #fff;">
    <div class="row align-items-center text-center">
      <!-- Home Team -->
      <div class="col-5 d-flex flex-column align-items-center">
        <img
          :src="upcomingMatch.home_team?.kpfa_logo || '/images/kpfa_logo.jpg'"
          alt="Home Team Logo"
          class="img-fluid mb-2"
          style="max-width: 70px;"
        />
        <h5 class="text-success fw-bold">{{ upcomingMatch.home_team?.name }}</h5>
      </div>

      <!-- VS -->
      <div class="col-2 d-flex flex-column align-items-center justify-content-center">
        <div
          class="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
          style="width: 40px; height: 40px; background-color: #b30000;"
        >
          VS
        </div>
        <div class="mt-2 text-danger fw-bold">
          {{ upcomingMatch.home_score }} - {{ upcomingMatch.away_score }}
        </div>
      </div>

      <!-- Away Team -->
      <div class="col-5 d-flex flex-column align-items-center">
        <img
          :src="upcomingMatch.away_team?.logo || '/images/opponent_placeholder.jpg'"
          alt="Away Team Logo"
          class="img-fluid mb-2"
          style="max-width: 70px;"
        />
        <h5 class="text-success fw-bold">{{ upcomingMatch.away_team?.name }}</h5>
      </div>
    </div>

    <!-- Match Details -->
    <div class="text-center mt-4">
      <p class="mb-1 text-success">
        <i class="bi bi-calendar-event"></i> {{ formatDate(upcomingMatch.match_date) }}
      </p>
      <p class="mb-1 text-success">
        <i class="bi bi-clock"></i> {{ formatTime(upcomingMatch.match_time) }}
      </p>
      <p class="mb-0 text-success">
        <i class="bi bi-geo-alt"></i> {{ upcomingMatch.location }}
      </p>
    </div>
  </div>
        <div v-else class="text-center py-4">
          <small class="text-muted">No upcoming matches available.</small>
        </div>
        <router-link to="/matches" class="btn btn-outline-secondary mt-3 d-block mx-auto">{{ $t('matches.list') }}</router-link>
  </section>

  </div>

    <!-- CTA Footer -->
    <section class="cta-footer text-white text-center py-5 rounded-4" style="background:#006400;">
      <h3 class="mb-3">{{ $t('cta_banner.title') }}</h3>
      <router-link to="/join-us" class="btn btn-light btn-lg mt-3">{{ $t('buttons.join') }}</router-link>
    </section>

  </div>
</template>

<script>
/*
  Restored, defensive Home.vue
  - Keeps original Bootstrap layout.
  - Logo overlay shows once every 24 hours (localStorage).
  - Data loads are defensive (paginated or flat).
  - Auto-scroll for eShop with chevrons. Manual scroll pauses auto-scroll.
  - Does not depend on external animation libraries.
*/

//import FixtureBox from "@/components/FixtureBox.vue";
import axios from "axios";
import { useCartStore } from "@/stores/cart";


export default {
  /* eslint-disable vue/multi-word-component-names */
  name: "Home",


  setup() {
    const cart = useCartStore();
    cart.load();

    function addToCart(item) {
      if (!item || !item.id) {
        // defensive: ignore or show a gentle error
        alert("Product not available yet.");
        return;
      }
      cart.addToCart({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price) || 0,
        image: item.image,
      });
      // small feedback
      alert(`${item.name} added to cart`);
    }

    return { addToCart };
  },

  data() {
    return {
      teams: [],
      news: [],
      matches: [],
      shopItemsRaw: [],
      nextMatch: null,
      showLogoOverlay: false,
      // scroll refs for eShop
      scrollWrapper: null,
      scrollInner: null,
      // flags
      teamsLoaded: false,
      newsLoaded: false,
      shopLoaded: false,
      matchesLoaded: false,
      // auto-scroll control (will be assigned in mounted)
      rafId: null,
      isPausedInternal: false,
      scrollPosInternal: 0,
      scrollSpeedInternal: 0.28,
      resumeTimeoutInternal: null,
      RESUME_DELAY: 1800,
  };
  },

  computed: {
    heroStyle() {
      return {
        backgroundImage: "url(/images/hero1.jpg)",
        backgroundSize: "",
        backgroundPosition: "center",
      };
    },
    shopItems() {
      const data = this.shopItemsRaw;
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.results)) return data.results;
      return [];
    },
    displayShop() {
      return Array.isArray(this.shopItems) ? this.shopItems.slice(0, 5) : [];
    },
  },

  methods: {
    pauseScrollManual() {
      this.isPausedInternal = true;
      if (this.resumeTimeoutInternal) clearTimeout(this.resumeTimeoutInternal);
    },
    scheduleResume() {
      if (this.resumeTimeoutInternal) clearTimeout(this.resumeTimeoutInternal);
      this.resumeTimeoutInternal = setTimeout(() => {
        this.isPausedInternal = false;
      }, this.RESUME_DELAY);
    },

    pauseScroll() {
      this.pauseScrollManual();
    },
    resumeScroll() {
      this.scheduleResume();
    },

    manualScroll(direction = 1) {
      // direction: 1 => right, -1 => left
      if (!this.$refs.scrollWrapper || !this.$refs.scrollInner) return;
      const inner = this.$refs.scrollInner;
      const wrapper = this.$refs.scrollWrapper;
      const firstCard = inner.querySelector(".auto-card");
      const gap = 12; // visual gap
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + gap : 250;
      // pause then resume
      this.pauseScrollManual();
      this.scrollPosInternal += direction * cardWidth;
      const maxScroll = inner.scrollWidth / 2;
      if (this.scrollPosInternal < 0) this.scrollPosInternal = Math.max(0, maxScroll - cardWidth);
      if (this.scrollPosInternal >= maxScroll) this.scrollPosInternal = 0;
      wrapper.scrollLeft = this.scrollPosInternal;
      this.scheduleResume();
    },

    _animateScroll() {
      // small safe animation loop
      if (!this.$refs.scrollInner || !this.$refs.scrollWrapper) {
        this.rafId = requestAnimationFrame(this._animateScroll);
        return;
      }
      if (!this.isPausedInternal) {
        this.scrollPosInternal += this.scrollSpeedInternal;
        const maxScroll = this.$refs.scrollInner.scrollWidth / 2;
        if (this.scrollPosInternal >= maxScroll) this.scrollPosInternal = 0;
        this.$refs.scrollWrapper.scrollLeft = this.scrollPosInternal;
      }
      this.rafId = requestAnimationFrame(this._animateScroll);
    },

  async _fetchAll() {
    try {
      const [teamsRes, newsRes, matchesRes, shopRes] = await Promise.all([
      axios.get("http://127.0.0.1:8000/api/teams/").catch(() => ({ data: [] })),
      axios.get("http://127.0.0.1:8000/api/news/").catch(() => ({ data: [] })),
      axios.get("http://127.0.0.1:8000/api/matches/").catch(() => ({ data: [] })),
      axios.get("http://127.0.0.1:8000/api/shop/").catch(() => ({ data: [] })),
    ]);

    // Normalize teams and filter KPFA teams
    const teamsData = Array.isArray(teamsRes.data)
      ? teamsRes.data
      : teamsRes.data.results ?? [];
    this.teams = teamsData.filter(team => team.is_kpfa_team === true);
    this.teamsLoaded = true;

    // News, Matches, Shop normalization
    this.news = Array.isArray(newsRes.data)
      ? newsRes.data
      : newsRes.data.results ?? [];
    this.newsLoaded = true;
    
    this.matches = Array.isArray(matchesRes.data)
      ? matchesRes.data
      : matchesRes.data.results ?? [];
    this.matchesLoaded = true;

    // normalize shop items
        this.shopItemsRaw = shopRes.data ?? [];
        this.shopLoaded = true;
     

    // Find nearest upcoming match
    const today = new Date();
    const upcoming = this.matches
      .filter(m => !m.is_completed && new Date(m.match_date) >= today)
      .sort((a, b) => new Date(a.match_date) - new Date(b.match_date));

    this.upcomingMatch = upcoming.length > 0 ? upcoming[0] : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    this.upcomingMatch = null;
  }
},


  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
  formatTime(timeStr) {
    return timeStr ? timeStr.slice(0, 5) : "";
  },


    // overlay control (24 hours)
    _checkOverlayFlag() {
      try {
        const raw = localStorage.getItem("kpfa_overlay_shown_at");
        if (!raw) {
          // show overlay
          this.showLogoOverlay = true;
          localStorage.setItem("kpfa_overlay_shown_at", String(Date.now()));
          return;
        }
        const ts = parseInt(raw, 10) || 0;
        const age = Date.now() - ts;
        const DAY = 24 * 60 * 60 * 1000;
        if (age > DAY) {
          this.showLogoOverlay = true;
          localStorage.setItem("kpfa_overlay_shown_at", String(Date.now()));
        } else {
          this.showLogoOverlay = false;
        }
      } catch (e) {
        // fallback: don't crash
        this.showLogoOverlay = false;
      }
    },

    closeOverlay() {
      this.showLogoOverlay = false;
    },
  },

  async mounted() {
    // overlay check
    this._checkOverlayFlag();

    // fetch data
    await this._fetchAll();

    // start auto-scroll animation (safe)
    // expose refs for template uses
    // $refs.scrollWrapper and $refs.scrollInner exist after render
    this.isPausedInternal = false;
    this.scrollPosInternal = 0;
    this.rafId = requestAnimationFrame(this._animateScroll);
  },

  beforeUnmount() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resumeTimeoutInternal) clearTimeout(this.resumeTimeoutInternal);
  },
};
</script>

<style scoped>
/* keep your hero style and layout, small refinements included */
.hero {
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero .overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;
}
.hero-content { position: relative; z-index: 1; max-width: 900px; }
.hero-title { font-size: 3.2rem; font-weight: 700; color: #fff; }
.hero-subtitle { font-size: 1.25rem; color: #e0e0e0; }

/* Overlay modal */
.logo-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.92);
  z-index: 3000;
  text-align: center;
  padding: 2rem;
}
.overlay-logo { max-width: 200px; height: auto; animation: zoomIn 700ms ease; }
@keyframes zoomIn { from { transform: scale(.9); opacity: 0 } to { transform: scale(1); opacity: 1 } }
.close-btn {
  position: absolute; right: 28px; top: 20px; font-size: 2rem; color: #fff; background: transparent; border: none;
}

/* section headings */
.section-title { font-size: 1.9rem; font-weight: 700; color: #004d00; margin-bottom: 1rem; }

/* Teams / News card image adjustments preserved from your file */
.card-img-wrapper { overflow: hidden; }
.card-img-top { width: 100%; height: 220px; object-fit: cover; transition: transform .4s ease; }
.team-card:hover .card-img-top { transform: scale(1.08); }

/* scrolling gallery styles */
.auto-scroll-wrapper { width: 100%; overflow: hidden; position: relative; padding: 10px 0; }
.auto-scroll-inner { display: flex; align-items: stretch; gap: 0.75rem; padding-left: 0.5rem; }
.auto-card { min-width: 250px; flex: 0 0 auto; border-radius: 0.75rem; overflow: hidden; transition: transform .25s ease, box-shadow .25s ease; }
.auto-card:hover { transform: translateY(-6px); box-shadow: 0 10px 24px rgba(0,0,0,0.12); }

/* chevrons */
.chev { position: absolute; top: 50%; transform: translateY(-50%); z-index: 30; width: 40px; height: 40px; border-radius: 999px; background: rgba(255,255,255,0.85); border: 1px solid rgba(0,0,0,0.06); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
.chev-left { left: 8px; } .chev-right { right: 8px; }

/* CTA Footer */
.cta-footer { background-color: #006400; color: #fff; }

/* fade transition for overlay */
.fade-enter-active, .fade-leave-active { transition: opacity .6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* responsive tweaks */
@media (max-width: 768px) {
  .hero-title { font-size: 2.2rem; }
  .auto-card { min-width: 200px; }
}
</style>
