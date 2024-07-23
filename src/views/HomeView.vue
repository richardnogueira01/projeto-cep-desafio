<template>
  <div>
    <h1>Bem-vindo ao Sistema de Pesquisa de CEP</h1>
    <img src="" alt="Descrição da imagem">
    <button @click="goToSearch">Pesquisar CEP</button>
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
/* Adicione seus estilos aqui */
</style>
