import type {SeoData} from "~/models/SeoData";

export interface CreateProductCommand {
    title: string;
    imageFile: any;
    slug: string;
    seoData: SeoData;
    description: string;
    specifications: string;
    categoryId: string;
    subCategoryId: string;
}