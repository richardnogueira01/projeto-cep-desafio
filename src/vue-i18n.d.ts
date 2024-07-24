import 'vue-i18n';
 
declare module 'vue-i18n' {
  export interface MessageSchema {
    welcome: string;
    message: string;
  }
 
  export interface VueI18n {
    locale: string;
    messages: Record<string, MessageSchema>;
  }
}
 
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t(key: keyof MessageSchema): string;
    $i18n: VueI18n;
  }
}
 