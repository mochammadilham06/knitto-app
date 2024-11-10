import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosInstance } from "./axiosInstance";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }: any) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;
      return {
        error: {
          code: err.response?.status || err?.code,
          message:
            err.response?.data ||
            err.message ||
            "An error occurred. Please try again.",
        },
      };
    }
  };

export const pixabayAPI = createApi({
  reducerPath: "pixabay",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://pixabay.com/api",
  }),
  endpoints(build) {
    return {
      getImage: build.query({
        query: ({ per_page, q } = { per_page: 10, q: "" } as any) => ({
          url: "/",
          method: "get",
          params: {
            key: localStorage.getItem("apiKey"),
            q,
            per_page,
          },
        }),
      }),
    };
  },
});

export const { useGetImageQuery } = pixabayAPI;
