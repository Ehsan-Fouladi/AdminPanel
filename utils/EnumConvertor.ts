import {BannerPosition} from "~/models/banners/Banner";

export const GetBannerPositionName = (position: BannerPosition) => {
    switch (position.toString()) {
        case  BannerPosition.بالای_اسلایدر:
            return "بالای اسلایدر";
        case  BannerPosition.سمت_چپ_اسلایدر:
            return "سمت چپ اسلایدر";
        case  BannerPosition.زیر_اسلایدر:
            return "زیر اسلایدر";
        case  BannerPosition.وسط_صفحه:
            return "وسط صفحه";
        case  BannerPosition.سمت_راست_شگفت_انگیز:
            return "سمت راست شگفت انگیز";
        default:
            return "";
    }
}