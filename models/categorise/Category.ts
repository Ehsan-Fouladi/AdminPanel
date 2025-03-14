import type {SeoData} from "~/models/SeoData";

export interface Category {
    "id": number,
    "title": string,
    "slug": string,
    "imageName": string,
    "seoData": SeoData,
    "childs": Category[],
    "creationDate": Date
}