<template>
  <div class="overlay"></div>
  <div class="search-container">
    <div class="card">
      <form @submit.prevent="searchCEP" class="input-group">
        <input
          v-model="cep"
          type="text"
          :placeholder="$t('enterZip')"
          @input="validateCEP"
          class="cep-input"
          maxlength="8"
        />
        <button type="submit" class="search-button">{{ $t('searchButton') }}</button>
      </form>
      <label v-if="errorMessage" class="error-message">{{ $t(errorMessage) }}</label>
      <div v-if="address" class="address-display">
        <p>{{ $t('address') }}: {{ address }}</p>
      </div>
      <div v-if="address" class="map-card">
        <h2>{{ $t('location') }}</h2>
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
            errorMessage.value = "";
          } else {
            address.value = "";
            mapUrl.value = "";
            errorMessage.value = 'notFound';
          }
        } catch (error) {
          address.value = "";
          mapUrl.value = "";
          errorMessage.value = 'error';
        }
      } else {
        errorMessage.value = 'invalid';
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
  position: relative; 
  padding: 20px; 
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
  align-items: stretch; 
  width: 100%;
  max-width: 600px; 
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; 
  overflow: hidden; 
}

.input-group {
  display: flex;
  gap: 10px; 
}

.cep-input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; 
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
  white-space: nowrap; 
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
  overflow: hidden; 
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
    height: 300px; 
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
    height: 250px; 
  }

  .map-card h2 {
    font-size: 1rem;
  }
}
</style>
