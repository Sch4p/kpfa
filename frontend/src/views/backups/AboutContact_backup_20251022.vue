<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="fw-bold mb-0 text-danger">KPFA Official Store</h1>
        <small class="text-muted">Top-quality football kits and academy merchandise</small>
      </div>
      <div>
        <router-link to="/cart" class="btn btn-outline-dark" aria-label="View cart">
          🛒 Cart
          <span v-if="cart.items.length" class="badge bg-danger ms-2">{{ cart.items.length }}</span>
        </router-link>
      </div>
    </div>

    <div class="row mb-3 gx-3 gy-3">
      <!-- Filters -->
      <aside class="col-md-3">
        <div class="card p-3 shadow-sm border-0">
          <label class="form-label fw-semibold">Category</label>
          <select v-model="category" @change="loadProducts" class="form-select mb-3" aria-label="Filter by category">
            <option value="">All</option>
            <option v-for="c in categories" :key="c">{{ c }}</option>
          </select>

          <label class="form-label fw-semibold">Search</label>
          <div class="input-group mb-3">
            <input v-model="q" @keyup.enter="loadProducts" placeholder="Search items..." class="form-control" />
            <button class="btn btn-danger" @click="loadProducts" :disabled="loading">Go</button>
          </div>

          <div class="text-end">
            <button class="btn btn-link text-secondary p-0" @click="resetFilters">Reset filters</button>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <section class="col-md-9">
        <div v-if="loading" class="text-center py-5" aria-busy="true">
          <div class="spinner-border text-danger" role="status" aria-hidden="true"></div>
          <p class="mt-3">Loading products...</p>
        </div>

        <div v-else class="row g-3">
          <template v-if="products.length">
            <div v-for="p in products" :key="p.id" class="col-sm-6 col-md-4">
              <article class="card shop-card h-100 border-0" :aria-labelledby="'title-'+p.id">
                <img
                  v-if="p.image"
                  :src="imageUrl(p.image)"
                  class="shop-img"
                  :alt="p.name"
                  loading="lazy"
                />
                <div v-else class="shop-img bg-light d-flex align-items-center justify-content-center">
                  <small class="text-muted">No image</small>
                </div>

                <div class="card-body d-flex flex-column">
                  <h5 :id="'title-'+p.id" class="card-title">{{ p.name }}</h5>

                  <!-- Short description for card; full description shown on detail page -->
                  <p class="card-text text-muted small text-truncate">{{ p.description }}</p>

                  <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                      <span class="price-badge">₦{{ formatPrice(p.price) }}</span>
                      <div class="small text-muted mt-1" v-if="p.stock_quantity !== undefined">
                        <span v-if="p.stock_quantity > 0">{{ p.stock_quantity }} in stock</span>
                        <span v-else class="text-danger">Out of stock</span>
                      </div>
                    </div>

                    <div class="btn-group" role="group" aria-label="Product actions">
                      <router-link
                        :to="{ name: 'ProductDetail', params: { id: p.id } }"
                        class="btn btn-sm btn-outline-primary"
                      >
                        View
                      </router-link>

                      <button
                        class="btn btn-sm btn-danger"
                        @click="addToCart(p)"
                        :disabled="p.stock_quantity !== undefined && p.stock_quantity <= 0"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </template>

          <div v-else class="col-12 text-center py-5">
            <p class="text-muted">No items found for this selection.</p>
            <button class="btn btn-outline-secondary" @click="resetFilters">Clear filters</button>
          </div>
        </div>

        <!-- Pagination -->
        <nav v-if="pageCount > 1" class="mt-4" aria-label="Product pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: page === 1 }">
              <a class="page-link" @click="changePage(page - 1)" href="#" @click.prevent>Prev</a>
            </li>

            <li v-for="n in pageCount" :key="n" class="page-item" :class="{ active: page === n }">
              <a class="page-link" @click="changePage(n)" href="#" @click.prevent>{{ n }}</a>
            </li>

            <li class="page-item" :class="{ disabled: page === pageCount }">
              <a class="page-link" @click="changePage(page + 1)" href="#" @click.prevent>Next</a>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from "vue";
import { useCartStore } from "../stores/cart";


export default {
  name: "eShop",
  setup() {
    const products = ref([]);
    const categories = ref([]);
    const loading = ref(false);
    const q = ref("");
    const category = ref("");
    const page = ref(1);
    const pageCount = ref(1);
    const cart = useCartStore();
    const alerts = ref([]);

    // Sanitize text lightly (avoid rendering raw HTML)
    function safeText(str) {
      if (!str) return "";
      return String(str);
    }

    function formatPrice(val) {
      try {
        return Number(val).toFixed(2);
      } catch (e) {
        return val;
      }
    }

    function imageUrl(src) {
      if (!src) return "";
      // if already absolute URL, return it; else prepend origin
      if (src.startsWith("http://") || src.startsWith("https://")) return src;
      if (src.startsWith("/")) return window.location.origin + src;
      return window.location.origin + "/" + src;
    }

    async function loadProducts() {
      loading.value = true;
      try {
        const params = { search: q.value, category: category.value, page: page.value };
        // explicit absolute API path (matches your working endpoint)
        const res = await axios.get("http://127.0.0.1:8000/api/shop/", { params });
        // API might return { results: [...], page_count: N } or just an array
        const data = res.data.results ?? res.data;
        products.value = Array.isArray(data) ? data : [];
        pageCount.value = res.data.page_count ?? res.data.total_pages ?? 1;
        categories.value = [...new Set(products.value.map((p) => p.category).filter(Boolean))];
        // SEO: set sensible title
        document.title = "KPFA Shop — Official Merchandise";
      } catch (err) {
        console.error("Error loading products:", err);
        alerts.value.push({ type: "danger", text: "Failed to load products. Try again." });
      } finally {
        loading.value = false;
      }
    }

    function addToCart(p) {
      // defensive copy of the product shape that frontend expects
      const item = {
        id: p.id,
        name: safeText(p.name),
        price: p.price,
        stock_quantity: p.stock_quantity,
        image: p.image,
      };
      cart.addToCart(item, 1);
      // small non-blocking toast (browser alert as fallback)
      try {
        // prefer a subtle UI toast if you have one; fallback to alert:
        alert(`${p.name} added to cart`);
      } catch (e) {
        // ignore
      }
    }

    function changePage(n) {
      if (n < 1) n = 1;
      page.value = n;
      loadProducts();
    }

    function resetFilters() {
      q.value = "";
      category.value = "";
      loadProducts();
    }

    onMounted(loadProducts);

    return {
      products,
      categories,
      loading,
      q,
      category,
      addToCart,
      cart,
      page,
      pageCount,
      changePage,
      resetFilters,
      imageUrl,
      formatPrice,
      alerts,
    };
  },
};

</script>

<style scoped>
@import "../assets/shop.css";
/* @admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('home_team', 'away_team', 'date', 'location', 'score')
    search_fields = ('home_team__name', 'away_team', 'location')
    list_filter = ('date',) */

/* class Match(models.Model):
    # KPFA team choices
    KPFA_TEAM_CHOICES = [
        ('Men', 'Men Team'),
        ('Women', 'Women Team'),
        ('Junior', 'Junior Team'),
    ]

    # Indicates which KPFA team is playing in this match
    kpfa_team = models.CharField(
        max_length=20,
        choices=KPFA_TEAM_CHOICES,
        blank=True,  # optional for old records or flexibility
        null=True
    )

    # True if KPFA is the home team, False if away
    is_home = models.BooleanField(default=True, help_text="True if KPFA is the home team")

    # Flexible team fields
    home_team = models.CharField(max_length=100, default="TBD")
    away_team = models.CharField(max_length=100, default="TBD")

    location = models.CharField(max_length=200, blank=True, null=True)
    score = models.CharField(max_length=20, blank=True, null=True)
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} on {self.date or 'TBD'}"   */
    
    /*class Opponent(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='opponent_logos/', blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name */
    
    /* Match ViewSet
     class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer 
    */

    /* Match Serializer 
    class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'
      */
</style>
