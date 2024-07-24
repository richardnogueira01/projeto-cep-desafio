// src/vue-i18n.d.ts
import { DefineLocaleMessage, VueMessageType } from 'vue-i18n';

declare module 'vue-i18n' {
  // Define os tipos para os recursos de tradução disponíveis
  interface DefineLocaleMessage {
    welcome: string;
    search: string;
    enterZip: string;
    searchButton: string;
    address: string;
    location: string;
    notFound: string;
    error: string;
    invalid: string;
  }

  // Define os tipos para a interface Vue
  interface VueI18n {
    $t(key: keyof DefineLocaleMessage): string;
  }

  // Adicione o tipo ao Vue
  interface Vue {
    $t(key: keyof DefineLocaleMessage): string;
  }
}
