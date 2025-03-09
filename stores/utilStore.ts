import type {ToastMessageOptions} from "primevue";
import type {LoginData} from "~/models/auth/LoginData";

export const useUtilStore = defineStore("utilStore", () => {
    const globalLoading = ref(false);
    return {globalLoading}
})