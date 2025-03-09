import type {Banner} from "~/models/banners/Banner";
import type {CreateBanner} from "~/models/banners/CreateBanner";

export const ServiceGetBanners = () => {
    return CustomFetch<Banner[]>("/Banner")
}

export const ServiceCreateBanner = (command: CreateBanner) => {
    let data = new FormData();
    data.append("Link", command.link)
    data.append("Position", command.position.toString())
    data.append("ImageFile", command.imageFile)
    return CustomFetch<CreateBanner>("/Banner", {
        method: "POST",
        body: data
    })
}

export const ServiceDeleteBanners = (id: number) => {
    return CustomFetch<Banner[]>(`/Banner/${id}`, {
        method: "DELETE",
    });
}