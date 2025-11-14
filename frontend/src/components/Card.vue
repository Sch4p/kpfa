<template>
  <div class="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
    <h2 class="text-lg font-bold mb-2">{{ title }}</h2>
    <p v-for="(item, index) in details" :key="index" class="text-sm text-gray-600">
      {{ item }}
    </p>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line
  name: "Card",
  props: {
    title: { type: String, required: true },
    details: { type: Array, default: () => [] }
  }
};
</script>
