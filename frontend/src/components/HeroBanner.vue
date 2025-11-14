<template>
  <section class="position-relative" style="height: 250px; background-color: #CD1C18;"> <!-- Chili Red -->
    <div class="d-flex align-items-center justify-content-start h-100">
      <img
        src="/images/logo.jpg"
        alt="Kutty Phillip FA Logo"
        class="object-contain"
        style="width: auto; height: 100%;" 
      />
      <div class="p-5 text-center text-white flex-grow-1">
        <h1 class="display-5 fw-light mb-3">{{ $t('banner.title') }}</h1>
        <p class="lead mb-0">{{$t('banner.tagline')}}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  /* eslint-disable vue/multi-word-component-names */
  name: "HeroBanner",
};
</script>
