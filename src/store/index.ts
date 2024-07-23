import { createStore } from 'vuex';

const store = createStore({
  state: {
    address: '',
  },
  mutations: {
    setAddress(state, address) {
      state.address = address;
    },
  },
  actions: {
    async fetchAddress({ commit }, cep) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        commit('setAddress', `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    },
  },
  getters: {
    address: (state) => state.address,
  },
});

export default store;
