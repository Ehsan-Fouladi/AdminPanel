import { AppStatusCode, type ApiResponse } from "~/models/ApiResponse";
import type { FetchConfig } from "~/models/config/fetchConfig";
import type { FetchError } from "~/models/FetchError";

export function CustomFetch<T>(
  url: string,
  config: FetchConfig | undefined = {}
): Promise<ApiResponse<T>> {
  const newConfig: FetchConfig = {
    baseURL: "https://shop-api.codeyad-project.ir/api",
    ...config,
    retry: 0,
  };
  //@ts-ignore
  return $fetch<ApiResponse<T>>(url, newConfig)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((e: FetchError) => {
      let CustomResponse = {
        data: undefined,
        isSuccess: false,
        metaData: {
          appStatusCode: AppStatusCode.ServerError,
          message: "خطای سمت سرور",
        },
      } as ApiResponse<undefined>;
      switch (e.response.status) {
        case 400: {
          CustomResponse.metaData.message =
            e.response._data?.MetaData?.Message ?? "اطلاعات نامعتبر است.";
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
      return CustomResponse;
    });
}
