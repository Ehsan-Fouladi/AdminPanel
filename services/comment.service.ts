import type {FilterResult} from "~/models/FilterResult";
import type {CommentFilterParams} from "~/models/comments/Comment";

export const ServiceGetComment = (filterParams: CommentFilterParams) => {
    return CustomFetch<FilterResult<Comment>>("/api/Comment", {
        query: filterParams
    })
}