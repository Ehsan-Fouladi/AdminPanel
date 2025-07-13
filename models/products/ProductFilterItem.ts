import type {BaseFilterParams} from "~/models/BaseFilterParams";

export interface ProductFilterItem {
    id: number;
    creationAt: Date;
    title: string;
    imageName: string;
    slug: string;
}

export interface ProductFilterParams extends BaseFilterParams {
    title: string | undefined;
    slug: string | undefined;
    id: number | undefined
}