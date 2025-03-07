import type {Banner} from "~/models/banners/Banner";

export const getBanners = () => {
    return CustomFetch<Banner[]>("/Banner")
}