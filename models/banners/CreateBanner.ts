import type {BannerPosition} from "~/models/banners/Banner";

export interface CreateBanner {
    link: string;
    position: BannerPosition;
    imageFile: any;
}

export interface EditBanner {
    id: number | string;
    link: string;
    position: BannerPosition;
    imageFile: any | undefined;
}