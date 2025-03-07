export default defineNuxtRouteMiddleware((to, from) => {
    const accountStore = useAccountStore();
    if (!to.path.toLocaleLowerCase().startsWith("/auth")) {
        if (!accountStore.isLogin) {
            return navigateTo("/auth", {open: {target: "_self"}})
        }
    } else {
        if (accountStore.isLogin) {
            return navigateTo("/", {open: {target: "_self"}})
        }
    }
})