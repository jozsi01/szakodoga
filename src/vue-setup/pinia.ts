import { createPinia, defineStore } from 'pinia';
import { Store } from 'src/store';

export const pinia = createPinia();
export const useStore = defineStore('main-store', Store);
export type Store = ReturnType<typeof useStore>;
