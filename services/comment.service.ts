import type {FilterResult} from "~/models/FilterResult";
import type {Comment, CommentFilterParams} from "~/models/comments/Comment";
import {CommentStatus} from "~/models/comments/Comment";

export const ServiceGetComment = (filterParams: CommentFilterParams) => {
    return CustomFetch<FilterResult<Comment>>("/Comment", {
        query: filterParams
    })
}

export const ServiceDeleteComment = (id: number) => {
    return CustomFetch(`/Comment/${id}`, {
        method: "DELETE"
    });
}

export const ServiceChangeStatusComment = (id: number, status: CommentStatus | number) => {
    return CustomFetch(`/Comment/changeStatus`, {
        method: "PUT",
        body: { status, id }
    });
}