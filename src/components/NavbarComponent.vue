<template>
  <nav class="navbar">
    <div class="container-menu-items">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/search" class="nav-link">Busca</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarComponent",
});
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #000000;
  padding: 20px 20px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.logo {
  height: 40px; /* Ajuste a altura conforme necessário */
}

.navbar .container-menu-items {
  margin-left: 20vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
