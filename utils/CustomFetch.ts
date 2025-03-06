import {type ApiResponse, AppStatusCode} from "~/models/ApiResponse";
import type {FetchConfig} from "~/models/config/fetchConfig";
import type {FetchError} from "~/models/FetchError";

export function CustomFetch<T>(
    url: string,
    config: FetchConfig | undefined = {}
): Promise<ApiResponse<T>> {
    const newConfig: FetchConfig = {
        baseURL: "https://shop-api.codeyad-project.ir/api",
        ...config,
        retry: 0,
    };
    const accountStore = useAccountStore();
    if(accountStore.isLogin){
        if (!newConfig.headers){
            newConfig.headers =  {};
        }
        //@ts-ignore
        newConfig.headers["authorization"] = `Bearer ${accountStore.getToken!}`;
    }
    const showError = (data: ApiResponse<any>) => {
        if (process.client) {
            if (data.metaData.appStatusCode == AppStatusCode.NotFound) {
                accountStore.setAlertOutsideOfScriptSetup({
                    severity: "warn",
                    summary: data.metaData.message,
                    life: 3000
                })
            } else {
                accountStore.setAlertOutsideOfScriptSetup({
                    severity: "error",
                    summary: data.metaData.message,
                    life: 3000
                })
            }
        }
    }
    //@ts-ignore
    return $fetch<ApiResponse<T>>(url, newConfig)
        .then((response) => {
            if (response.isSuccess == false) {
                showError(response);
            }
            return response;
        })
        .catch((e: FetchError) => {
            let CustomResponse = {
                data: undefined,
                isSuccess: false,
                metaData: {
                    appStatusCode: e.response._data?.metaData?.appStatusCode ?? AppStatusCode.ServerError,
                    message: e.response._data?.metaData?.message ?? "خطای سمت سرور",
                },
            } as ApiResponse<undefined>;
            switch (e.response.status) {
                case 400: {
                    CustomResponse.metaData.appStatusCode = AppStatusCode.BadRequest
                    CustomResponse.metaData.message =
                        e.response._data?.metaData?.message ?? "اطلاعات نامعتبر است.";
                    break;
                }
                case 401: {
                    CustomResponse.metaData.message =
                        e.response._data?.metaData?.message ?? "دسترسی غیرمجاز";
                    break;
                }
                case 404: {
                    CustomResponse.metaData.message =
                        e.response._data?.metaData?.message ?? "اطلاعات یافت نشد.";
                    break;
                }
            }
            showError(CustomResponse)
            return CustomResponse;
        });
}
