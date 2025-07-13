import type {ProductFilterItem, ProductFilterParams} from "~/models/products/ProductFilterItem";
import type {FilterResult} from "~/models/FilterResult";

export const ServiceGetProductsByFilter = (filterParams: ProductFilterParams) => {
    return CustomFetch<FilterResult<ProductFilterItem>>("/Product", {
        query: filterParams
    });
}