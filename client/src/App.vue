<template>
  <div id="app">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { Suspense } from 'vue';
</script>
