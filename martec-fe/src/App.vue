<template>
  <Index></Index>
  <RouterView :key="useRoute().fullPath"></RouterView>
</template>
<script lang="ts" setup>
import Index from '@/Index.vue'
import { RouterView, useRoute } from 'vue-router'
</script>