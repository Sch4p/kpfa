<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="fw-bold mb-0 text-danger">{{ $t('eshop.heading') }}</h1>
        <small class="text-muted">{{ $t('eshop.subhead') }}</small>
      </div>
      <div>
        <router-link to="/cart" class="btn btn-outline-dark" aria-label="View cart">
          🛒 {{ $t('eshop.cart') }}
          <span v-if="cart.length" class="badge bg-danger ms-2">{{ cart.length }}</span>
        </router-link>
      </div>
    </div>

    <div class="row mb-3 gx-3 gy-3">
      <!-- Filters -->
      <aside class="col-md-3">
        <div class="card p-3 shadow-sm border-0">
          <label class="form-label fw-semibold">{{ $t('eshop.category') }}</label>
          <select v-model="category" @change="loadProducts" class="form-select mb-3" aria-label="Filter by category">
            <option value="">All</option>
            <option v-for="c in categories" :key="c">{{ c }}</option>
          </select>

          <label class="form-label fw-semibold">{{ $t('eshop.search') }}</label>
          <div class="input-group mb-3">
            <input v-model="q" @keyup.enter="loadProducts" placeholder="Search items..." class="form-control" />
            <button class="btn btn-danger" @click="loadProducts" :disabled="loading">{{ $t('eshop.go') }}</button>
          </div>

          <div class="text-end">
            <button class="btn btn-link text-secondary p-0" @click="resetFilters">{{ $t('eshop.reset') }}</button>
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
                        {{ $t('buttons.view') }}
                      </router-link>

                      <button
                        v-if="!inCart(p.id)"
                        class="btn btn-sm btn-danger"
                        @click="addToCart(p)"
                        :disabled="p.stock_quantity <= 0"
                      >
                        {{ $t('buttons.add_to_cart') }}
                      </button>

                      <div v-else class="input-group input-group-sm w-auto">
                        <button class="btn btn-outline-danger" @click="decrementCart(p)">-</button>
                        <input
                          type="text"
                          readonly
                          class="form-control text-center"
                          style="max-width: 40px"
                          :value="getCartQuantity(p.id)"
                        />
                        <button class="btn btn-outline-success" @click="incrementCart(p)">+</button>
                      </div>
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
              <a class="page-link" @click.prevent="changePage(page - 1)">Prev</a>
            </li>

            <li v-for="n in pageCount" :key="n" class="page-item" :class="{ active: page === n }">
              <a class="page-link" @click.prevent="changePage(n)">{{ n }}</a>
            </li>

            <li class="page-item" :class="{ disabled: page === pageCount }">
              <a class="page-link" @click.prevent="changePage(page + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "eShop",
  data() {
    return {
      products: [],
      categories: [],
      loading: false,
      q: "",
      category: "",
      page: 1,
      pageCount: 1,
      cart: JSON.parse(localStorage.getItem("kpfa_cart")) || [],
    };
  },
  methods: {
    async loadProducts() {
      this.loading = true;
      try {
        const params = { search: this.q, category: this.category, page: this.page };
        const res = await axios.get("http://127.0.0.1:8000/api/shop/", { params });
        const data = res.data.results ?? res.data;
        this.products = Array.isArray(data) ? data : [];
        this.pageCount = res.data.page_count ?? res.data.total_pages ?? 1;
        this.categories = [...new Set(this.products.map((p) => p.category).filter(Boolean))];
        document.title = "KPFA Shop — Official Merchandise";
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        this.loading = false;
      }
    },
    resetFilters() {
      this.q = "";
      this.category = "";
      this.loadProducts();
    },
    changePage(n) {
      if (n < 1) n = 1;
      this.page = n;
      this.loadProducts();
    },
    imageUrl(src) {
      if (!src) return "";
      if (src.startsWith("http://") || src.startsWith("https://")) return src;
      if (src.startsWith("/")) return window.location.origin + src;
      return window.location.origin + "/" + src;
    },
    formatPrice(val) {
      try {
        return Number(val).toFixed(2);
      } catch {
        return val;
      }
    },

    // 🛒 CART LOGIC
    saveCart() {
      localStorage.setItem("kpfa_cart", JSON.stringify(this.cart));
    },
    inCart(id) {
      return this.cart.some((item) => item.id === id);
    },
    getCartQuantity(id) {
      const item = this.cart.find((i) => i.id === id);
      return item ? item.qty : 0;
    },
    addToCart(p) {
      const existing = this.cart.find((i) => i.id === p.id);
      if (existing) {
        existing.qty++;
      } else {
        this.cart.push({ id: p.id, name: p.name, price: p.price, qty: 1, image: p.image });
      }
      this.saveCart();
    },
    incrementCart(p) {
      const item = this.cart.find((i) => i.id === p.id);
      if (item) {
        item.qty++;
        this.saveCart();
      }
    },
    decrementCart(p) {
      const item = this.cart.find((i) => i.id === p.id);
      if (item) {
        item.qty--;
        if (item.qty <= 0) {
          this.cart = this.cart.filter((i) => i.id !== p.id);
        }
        this.saveCart();
      }
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>

<style scoped>
@import "../assets/shop.css";
</style>
