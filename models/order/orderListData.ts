import type {BaseFilterParams} from "~/models/BaseFilterParams";

export interface OrderListData {
    id: number;
    creationDate: string | Date;
    userId: number;
    userFullName: string;
    status: orderStatus;
    shire: string;
    city: string;
    shippingType: string;
    totalPrice: number;
    totalItemCount: number
}

export interface OrderFilterParams extends BaseFilterParams {
    userId: number | undefined;
    startDate: string | Date | undefined;
    endDate: string | Date | undefined;
    status: orderStatus | undefined;
}

export enum orderStatus {
    Pending,
    Finally,
    Shipping,
    Rejected,
}