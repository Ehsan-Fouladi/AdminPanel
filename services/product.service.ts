import type {ProductFilterItem, ProductFilterParams} from "~/models/products/ProductFilterItem";
import type {FilterResult} from "~/models/FilterResult";
import type {CreateProductCommand} from "~/models/products/CreateProductCommand";

export const ServiceGetProductsByFilter = (filterParams: ProductFilterParams) => {
    return CustomFetch<FilterResult<ProductFilterItem>>("/Product", {
        query: filterParams
    });
}

export const ServiceCreateProduct = (command: CreateProductCommand) => {
    const formData = new FormData();
    formData.append("Title", command.title);
    formData.append("ImageFile", command.imageFile);
    formData.append("Description", command.description);
    formData.append("CategoryId", command.categoryId.toString());
    formData.append("SubCategoryId", command.subCategoryId.toString());
    formData.append("Slug", command.slug);
    if (command.seoData.metaTitle) {
        formData.append("SeoData.MetaTitle", command.seoData.metaTitle)
    }
    if (command.seoData.canonical) {
        formData.append("SeoData.Canonical", command.seoData.canonical)
    }
    if (command.seoData.metaKeyWords) {
        formData.append("SeoData.MetaKeyWords", command.seoData.metaKeyWords)
    }
    if (command.seoData.metaDescription) {
        formData.append("SeoData.MetaDescription", command.seoData.metaDescription)
    }
    if (command.seoData.indexPage) {
        formData.append("SeoData.IndexPage", command.seoData.indexPage.toString())
    }
    formData.append("Specifications", command.specifications);
    return CustomFetch("/Product", {
        method: "POST",
        body: formData
    });
}