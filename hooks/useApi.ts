import {
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import api from 'lib/api';

export const user = () => {
  return {
    user:
      typeof window !== "undefined" && localStorage.getItem("user")
        ? JSON.parse(
          typeof window !== "undefined" &&
          (localStorage.getItem("user") as string | any)
        )
        : null,
  };
};

type Method = "GET" | "POST" | "PUT" | "DELETE" | "InfiniteScroll";

interface ApiHookParams {
  key: string[];
  method: Method;
  url: string;
  scrollMethod?: "GET";
}

export default function useApi({
  key,
  method,
  scrollMethod,
  url,
}: ApiHookParams, useQueryParams = {}) {
  const queryClient = new QueryClient();
  switch (method) {
    case "GET":
      // eslint-disable-next-line
      const get = useQuery({
        queryKey: key,
        queryFn: () => api(method, url, {}),
        retry: 0,
        ...useQueryParams,
      });

      return { get };

    case "POST":
      // eslint-disable-next-line
      const post = useMutation({
        mutationFn: (obj: any) => api(method, url, obj),
        retry: 0,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: key });
        },
        ...useQueryParams,
      });
      return { post };

    case "PUT":
      // eslint-disable-next-line
      const put = useMutation({
        mutationFn: (obj: any) => api(method, `${url}/${obj?.id}`, obj),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
        ...useQueryParams,
      });

      return { put };

    case "DELETE":
      // eslint-disable-next-line
      const deleteObj = useMutation({
        mutationFn: (id: string) => api(method, `${url}/${id}`),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
        ...useQueryParams,
      });
      return { deleteObj };

    default:
      throw new Error(`Invalid method ${method}`);
  }
}
