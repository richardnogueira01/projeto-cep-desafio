import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: 'Home',
    text1: 'Welcome to the CEP Search System',
    search: 'Search ZIP Code',
    enterZip: 'Enter ZIP Code',
    searchButton: 'Search',
    address: 'Address',
    location: 'Location on the Map',
    notFound: 'ZIP Code not found. Please check the ZIP Code and try again.',
    error: 'Error fetching the address. Please try again later.',
    invalid: 'Invalid ZIP Code. Please enter a valid ZIP Code.',
  },
  pt: {
    welcome: 'Inicio',
    text1: 'Bem Vindo ao Sistema de Busca CEP',
    search: 'Pesquisar CEP',
    enterZip: 'Digite o CEP',
    searchButton: 'Pesquisar',
    address: 'Endereço',
    location: 'Localização no Mapa',
    notFound: 'CEP não encontrado. Verifique o CEP e tente novamente.',
    error: 'Erro ao buscar o endereço. Tente novamente mais tarde.',
    invalid: 'CEP inválido. Digite um CEP válido.',
  },
};

const i18n = createI18n({
  locale: 'pt', // idioma padrão
  fallbackLocale: 'en', // idioma de fallback
  messages,
});

export default i18n;
