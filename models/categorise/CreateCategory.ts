import type {SeoData} from "~/models/SeoData";

export interface CreateCategory {
    parentId: number | undefined;
    slug: string;
    title: string;
    imageFile: any | undefined;
    seoData: SeoData;
}