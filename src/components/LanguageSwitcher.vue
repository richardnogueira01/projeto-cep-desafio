<!-- src/components/LanguageSwitcher.vue -->
<template>
    <div class="language-switcher">
      <button v-for="lang in languages" :key="lang" @click="changeLanguage(lang)">
        {{ lang.toUpperCase() }}
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  export default defineComponent({
    setup() {
      const { locale } = useI18n();
      const languages = ['en', 'pt'];
  
      const changeLanguage = (lang: string) => {
        locale.value = lang;
      };
  
      return {
        languages,
        changeLanguage,
      };
    },
  });
  </script>
  
  <style scoped>
  .language-switcher {
    display: flex;
    gap: 10px;
  }
  
  button {
    background-color: transparent;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  
  button:hover {
    text-decoration: underline;
  }
  </style>
  