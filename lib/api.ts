"use client";

import axios from "axios";
let baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export interface ApiResult<TData> {
  results: Array<TData>;
  pagesCount: number;
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const config = () => {
  let token;

  if (typeof window !== "undefined") {
    token = window.sessionStorage.getItem('shadowToken');
  }

  if (!token) {
    token = getCookie('access_token');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Credentials: 'include',
    },
  };
};

const serialize = (obj) => {
  if (!obj) {
    return '';
  }

  if (obj._response) {
    delete obj._response;
  }

  const str = [];

  Object.keys(obj).forEach((key) => {
    const value = typeof obj[key] === 'object' ? JSON.stringify(obj[key]) : obj[key];
    str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  });

  return str.join('&');
};

const apiFn = async (method: string, url: string, params = {}) => {
  try {
    switch (method) {
      case "GET":
        return await axios
          .get(`${baseUrl}/${url}?${serialize(params)}`, config())
          .then((res) => res.data);

      case "POST":
        return await axios
          .post(`${baseUrl}/${url}`, params, config())
          .then((res) => res.data);

      case "PUT":
        return await axios
          .put(`${baseUrl}/${url}`, params, config())
          .then((res) => res.data);

      case "DELETE":
        return await axios
          .delete(`${baseUrl}/${url}`, config())
          .then((res) => res.data);
    }
  } catch (error: any) {
    // const err = error?.response?.data?.errors?.global || "Something went wrong";

    throw error;
  }
};

export const GET = async (url: string, params = {}) => {
  return await axios
    .get(`${baseUrl}/${url}?${serialize(params)}`, config())
    .then((res) => res.data);
}

export const POST = async (url: string, params = {}) => {
  return await axios
    .post(`${baseUrl}/${url}`, params, config())
    .then((res) => res.data);
}

export const PUT = async (url: string, params = {}) => {
  return await axios
    .put(`${baseUrl}/${url}`, params, config())
    .then((res) => res.data);
}

export const DELETE = async (url: string, params = {}) => {
  return await axios
    .delete(`${baseUrl}/${url}`, config())
    .then((res) => res.data);
}


export default apiFn;