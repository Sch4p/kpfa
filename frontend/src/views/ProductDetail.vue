<template>
  <div class="container py-4" v-if="product">
    <div class="row">
      <!-- Product Images -->
      <div class="col-md-6">
        <div v-if="product.images && product.images.length">
          <img :src="selectedImage" class="img-fluid mb-2 rounded shadow-sm" />
          <div class="d-flex gap-2 mt-2">
            <img
              v-for="img in product.images"
              :key="img"
              :src="img"
              @click="selectedImage = img"
              class="rounded border"
              style="width:60px; height:60px; cursor:pointer; object-fit:cover;"
            />
          </div>
        </div>
        <img v-else-if="product.image" :src="product.image" class="img-fluid rounded shadow-sm" />
      </div>

      <!-- Product Info -->
      <div class="col-md-6">
        <h2 class="fw-bold">{{ product.name || "Loading..." }}</h2>
        <p class="h4 text-success">₦{{ formatPrice(product.price) }}</p>
        <p class="text-muted">{{ product.description || "" }}</p>

        <div class="mb-3">
          <label class="form-label">{{ $t('product.qnty') }}</label>
          <input type="number" v-model.number="qty" min="1" class="form-control w-25" />
        </div>

        <div>
          <button class="btn btn-success me-2" @click="addToCart" :disabled="!product.id">
            {{ $t('buttons.add_to_cart') }}
          </button>
          <button class="btn btn-primary me-2" @click="buyNow" :disabled="!product.id">
            {{ $t('product.buy_now') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Product Reviews -->
    <product-reviews v-if="product.id" :product-id="product.id" class="mt-5" />
  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-success" role="status"></div>
    <p class="text-muted mt-3">Loading product details...</p>
  </div>

  <!-- Back link -->
  <div class="text-start mt-4">
    <a @click.prevent="$router.push({ name: 'eShop' })" class="text-decoration-none text-danger fw-bold">
      <i class="bi bi-arrow-left me-1"></i> Back to eShop
    </a>
  </div>
  
</template>

<script>
import ProductReviews from "@/components/ProductReviews.vue";
import axios from "axios";

export default {
  /* eslint-disable vue/multi-word-component-names */
  name: "ProductDetail",
  components: { ProductReviews },
  data() {
    return {
      product: null,
      qty: 1,
      selectedImage: null,
      cart: JSON.parse(localStorage.getItem("kpfa_cart")) || [],
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/shop/${this.$route.params.id}/`);
      this.product = res.data || {};
      this.selectedImage =
        (res.data.images && res.data.images[0]) || res.data.image || null;
    } catch (err) {
      console.error("Failed to load product:", err);
      this.product = {};
    }
  },
  methods: {
    saveCart() {
      localStorage.setItem("kpfa_cart", JSON.stringify(this.cart));
    },
    addToCart() {
      if (!this.product || !this.product.id) return;

      const existing = this.cart.find((i) => i.id === this.product.id);
      if (existing) {
        existing.qty += this.qty;
      } else {
        this.cart.push({
          id: this.product.id,
          name: this.product.name,
          price: parseFloat(this.product.price),
          image: this.product.image,
          qty: this.qty,
        });
      }

      this.saveCart();
      alert("✅ Added to cart!");
    },

    // 💡 FIXED: Buy Now now properly sets cart and redirects
    buyNow() {
      if (!this.product || !this.product.id) return;

      // overwrite the cart with this single product
      const singleItem = [
        {
          id: this.product.id,
          name: this.product.name,
          price: parseFloat(this.product.price),
          image: this.product.image,
          qty: this.qty,
        },
      ];
      localStorage.setItem("kpfa_cart", JSON.stringify(singleItem));

      // then go straight to checkout
      this.$router.push("/checkout");
    },

    formatPrice(val) {
      try {
        return Number(val).toFixed(2);
      } catch {
        return val;
      }
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
}
</style>
