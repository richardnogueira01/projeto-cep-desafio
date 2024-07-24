<template>
  <div class="home-container">
    <div class="overlay"></div>
    <h1>{{ $t('welcome') }}</h1>
    <button @click="goToSearch" class="search-button">{{ $t('search') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const goToSearch = () => {
      router.push('/search');
    };
    return { goToSearch };
  },
});
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background-image: url('@/assets/image-home-background.jpg'); /* Coloque aqui o URL da imagem de fundo desejada */
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
}

.home-container h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  z-index: 2;
}

.home-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  z-index: 2;
}

.search-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.6s ease;
  z-index: 2;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
