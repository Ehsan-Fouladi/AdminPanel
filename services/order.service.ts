import type {OrderFilterParams, OrderListData} from "~/models/order/orderListData";
import type {FilterResult} from "~/models/FilterResult";
import type {OrderData} from "~/models/order/orderData";

export const ServiceGetOrder = (filterParams: OrderFilterParams) => {
    return CustomFetch<FilterResult<OrderListData>>(`/Order`, {
        query: filterParams
    });
}

export const ServiceGetOrderById = (orderId: number) => {
    return CustomFetch<OrderData>(`/Order/${orderId}`)
}

export const ServiceSendOrder = (id: number) => {
    return CustomFetch<OrderData>(`/Order/SendOrder/${id}`, {
        method: "PUT",
    })
}