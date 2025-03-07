export const BannerImageUrl = (imageName: string) => {
    const config = useRuntimeConfig()
    return `${config.public.BASE_URL}/images/banners/${imageName}`
}