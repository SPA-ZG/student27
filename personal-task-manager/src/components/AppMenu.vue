<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand">{{ title }}</a>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link"><RouterLink to="/">Dashboard</RouterLink></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><RouterLink to="/open">Open Tasks</RouterLink></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><RouterLink to="/closed">Archived Tasks</RouterLink></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    RouterLink
  }
}
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

.active {
  color: green;
}
</style>
