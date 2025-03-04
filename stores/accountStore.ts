import type {ToastMessageOptions} from "primevue";

export const useAccountStore = defineStore("account", () => {
    const toast = useToast();
    const setAlertOutsideOfScriptSetup = (message: ToastMessageOptions) => {
        toast.add(message)
    }
    return { setAlertOutsideOfScriptSetup }
})