export const BannerImageUrl = (imageName: string) => {
    const config = useRuntimeConfig()
    return `${config.public.BASE_URL}/images/banners/${imageName}`
}

export const CategoryImageUrl = (imageName: string) => {
    const config = useRuntimeConfig()
    return `${config.public.BASE_URL}/images/categories/${imageName}`
}

export const ProductImageUrl = (imageName: string) => {
    const config = useRuntimeConfig()
    return `${config.public.BASE_URL}/images/products/${imageName}`;
};