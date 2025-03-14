import type {Banner} from "~/models/banners/Banner";
import type {CreateBanner, EditBanner} from "~/models/banners/CreateBanner";

export const ServiceGetBanners = () => {
    return CustomFetch<Banner[]>("/Banner")
}

export const ServiceGetBannersByeId = (id: number) => {
    return CustomFetch<Banner>(`/Banner/${id}`)
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

export const ServiceUpdateBanner = (command: EditBanner) => {
    let data = new FormData();
    data.append("Id", command.id.toString())
    data.append("Link", command.link)
    data.append("Position", command.position.toString())
    if (command.imageFile) {
        data.append("ImageFile", command.imageFile)
    }
    return CustomFetch<CreateBanner>("/Banner", {
        method: "PUT",
        body: data
    })
}

export const ServiceDeleteBanners = (id: number) => {
    return CustomFetch<Banner[]>(`/Banner/${id}`, {
        method: "DELETE",
    });
}

