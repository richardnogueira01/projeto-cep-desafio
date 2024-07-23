<template>
  <div>
    <input v-model="cep" type="text" placeholder="Digite o CEP" @input="validateCEP" />
    <button @click="searchCEP">Pesquisar</button>
    <div v-if="address">
      <p>Endereço: {{ address }}</p>
    </div>
    <button @click="goBack">Voltar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const cep = ref('');
    const address = ref('');
    const router = useRouter();
    const store = useStore();

    const validateCEP = () => {
      cep.value = cep.value.replace(/\D/g, '');
    };

    const searchCEP = async () => {
      if (cep.value.length === 8) {
        await store.dispatch('fetchAddress', cep.value);
        address.value = store.state.address;
      } else {
        alert('CEP inválido. Digite um CEP válido.');
      }
    };

    const goBack = () => {
      router.push('/');
    };

    return { cep, address, validateCEP, searchCEP, goBack };
  },
});
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
