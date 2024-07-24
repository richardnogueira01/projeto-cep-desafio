<template>
  <nav class="navbar">
    <div class="container-menu-items">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <router-link to="/" class="nav-link">{{ $t('welcome') }}</router-link>
      <router-link to="/search" class="nav-link">{{ $t('search') }}</router-link>
    </div>
    <div class="language-switch">
      <img src="@/assets/pt.png" alt="Português" class="flag" @click="switchLanguage('pt')" />
      <img src="@/assets/en.png" alt="English" class="flag" @click="switchLanguage('en')" />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "NavbarComponent",
  setup() {
    const { locale } = useI18n();

    const switchLanguage = (language: string) => {
      locale.value = language;
    };

    return { switchLanguage };
  },
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
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.logo {
  height: 40px;
}

.container-menu-items {
  display: flex;
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

.language-switch {
  display: flex;
  align-items: center;
  max-width: 200px;
  gap: 10px;
}

.flag {
  width: 30px; 
  cursor: pointer;
}

@media (max-width: 768px) {

  .container-menu-items {
  display: flex;
  align-items: center;
  gap: 25px !important;
  font-size: 14px;
}

.container-menu-items .logo {
  height: 30px;
}

.language-switch {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
    margin-right: 25px;
}

}

</style>
