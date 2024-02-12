<script>
import userService from './services/user.service.js'

export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      userService.logout()
    }
  }
}
</script>

<template>
  <a-layout :style="{ height: '100%' }">
    <a-layout-header
      :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
      v-if="this.$route.name !== 'login'"
      class="header"
    >
      <div class="logo"><img src="/Screenshot_1.png" width="85" height="64" alt="" /></div>
      <div><RouterLink to="/login" @click="logout">logout</RouterLink></div>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', width: '100%' }">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.logo {
  display: block;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
