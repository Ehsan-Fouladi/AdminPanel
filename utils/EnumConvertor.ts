import {BannerPosition} from "~/models/banners/Banner";
import type {UserRecommendedStatus} from "~/models/comments/Comment";

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

export const GetUserRecommendStatusName = (position: UserRecommendedStatus) => {
    switch (position) {
        case  0:
            return "پیشنهاد میکنم";
        case  1:
            return "ییشنهاد نمیکنم";
        case  2:
            return "مطمن نیستم";
        default:
            return "";
    }
}