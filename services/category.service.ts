import type {Category} from "~/models/categorise/Category";

export const ServiceGetCategorise = () => {
    return CustomFetch<Category[]>("/Category")
}