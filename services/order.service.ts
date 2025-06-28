import type {OrderFilterParams, OrderListData} from "~/models/order/orderListData";
import type {FilterResult} from "~/models/FilterResult";

export const ServiceGetOrder = (filterParams: OrderFilterParams) => {
    return CustomFetch<FilterResult<OrderListData>>(`/Order`, {
        query: filterParams
    });
}