"use client";

import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from '@/types/user';

export const getUser = async () => {
  let token;

  if (typeof window !== "undefined") {
    token = window.sessionStorage.getItem('shadowToken');
  }

  if (!token) {
    token = Cookies.get('access_token');
  }
  if (!token) {
    return null;
  }

  const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return userResponse.data as User;
}