<template>
  <div class="overlay"></div>
  <div class="search-container">
    <div class="card">
      <form @submit.prevent="searchCEP" class="input-group">
        <input
          v-model="cep"
          type="text"
          placeholder="Digite o CEP"
          @input="validateCEP"
          class="cep-input"
          maxlength="8"
        />
        <button type="submit" class="search-button">Pesquisar</button>
      </form>
      <label v-if="errorMessage" class="error-message">{{
        errorMessage
      }}</label>
      <div v-if="address" class="address-display">
        <p>Endereço: {{ address }}</p>
      </div>
      <div v-if="address" class="map-card">
        <h2>Localização no Mapa</h2>
        <iframe
          :src="mapUrl"
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          id="gmap_canvas"
          style="border: 0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const cep = ref("");
    const address = ref("");
    const errorMessage = ref("");
    const mapUrl = ref("");
    const router = useRouter();
    const store = useStore();

    const validateCEP = () => {
      cep.value = cep.value.replace(/\D/g, "");
      errorMessage.value = "";
    };

    const searchCEP = async () => {
      if (cep.value.length === 8) {
        try {
          await store.dispatch("fetchAddress", cep.value);
          const fetchedAddress = store.state.address;

          if (fetchedAddress && !fetchedAddress.includes(undefined)) {
            address.value = fetchedAddress;
            updateMapUrl(address.value);
            errorMessage.value = ""; // Limpa a mensagem de erro se o endereço for encontrado
          } else {
            address.value = "";
            mapUrl.value = "";
            errorMessage.value =
              "CEP não encontrado. Verifique o CEP e tente novamente.";
          }
        } catch (error) {
          address.value = "";
          mapUrl.value = "";
          errorMessage.value =
            "Erro ao buscar o endereço. Tente novamente mais tarde.";
        }
      } else {
        errorMessage.value = "CEP inválido. Digite um CEP válido.";
        address.value = "";
        mapUrl.value = "";
      }
    };

    const updateMapUrl = (address: string) => {
      const encodedAddress = encodeURIComponent(address);
      mapUrl.value = `https://maps.google.com/maps?width=520&height=400&hl=en&q=${encodedAddress}&t=&z=12&ie=UTF8&iwloc=B&output=embed`;
    };

    const goBack = () => {
      router.push("/");
    };

    return {
      cep,
      address,
      errorMessage,
      mapUrl,
      validateCEP,
      searchCEP,
      goBack,
    };
  },
});
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("@/assets/image-home-background.jpg");
  background-size: cover;
  background-position: center;
  z-index: 2;
  position: relative; /* Adicionado para corrigir o posicionamento do overlay */
  padding: 20px; /* Adiciona um pouco de espaçamento */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 10);
  z-index: 1;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Alinha os itens para ocupar a largura total */
  width: 100%;
  max-width: 600px; /* Ajusta o tamanho máximo do card */
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Adicionado para corrigir o posicionamento do iframe */
  overflow: hidden; /* Adicionado para garantir que o conteúdo não ultrapasse as bordas */
}

.input-group {
  display: flex;
  gap: 10px; /* Adiciona espaçamento entre o input e o botão */
}

.cep-input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Ajusta a largura para preencher o container */
  max-width: 100%;
}

.search-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  white-space: nowrap; /* Impede que o texto do botão quebre em várias linhas */
}

.search-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #ff4d4d;
  margin-top: 10px;
  font-size: 0.9rem;
}

.address-display {
  width: 100%;
}

.map-card {
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  height: 400px;
  overflow: hidden; /* Adicionado para garantir que o conteúdo do iframe não ultrapasse o card */
}

.map-card h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 768px) {
  .card {
    width: 90%;
    padding: 15px;
  }

  .cep-input {
    font-size: 0.9rem;
  }

  .search-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .map-card {
    height: 300px; /* Reduz a altura do mapa em telas menores */
  }

  .map-card h2 {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .card {
    width: 100%;
    padding: 10px;
  }

  .cep-input {
    font-size: 0.8rem;
  }

  .search-button {
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .map-card {
    height: 250px; /* Reduz a altura do mapa em telas muito pequenas */
  }

  .map-card h2 {
    font-size: 1rem;
  }
}
</style>