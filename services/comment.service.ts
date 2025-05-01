import type {FilterResult} from "~/models/FilterResult";
import type {Comment, CommentFilterParams} from "~/models/comments/Comment";

export const ServiceGetComment = (filterParams: CommentFilterParams) => {
    return CustomFetch<FilterResult<Comment>>("/Comment", {
        query: filterParams
    })
}