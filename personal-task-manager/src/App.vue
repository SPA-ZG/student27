<script setup>
import AppMenu from './components/AppMenu.vue'
</script>

<template>
  <AppMenu title="Personal Task Manager" />
  <section class="vh-100">
    <div class="container py-5 h-100">
      <RouterView />
    </div>
  </section>
</template>

<style>
body {
  background-color: #f1f1f1;
}
</style>
