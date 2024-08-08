'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import useUserStore from "@/zustand/userStore";

const socket = io(process.env.NEXT_PUBLIC_API_URL, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true,
});

export const connect = async () => {
  socket.open();
};

export const disconnect = () => {
  socket.disconnect();
};

export const emit = (event: string, ...args: any[]) => {
  socket.emit(event, ...args);
};

export const on = (event: string, callback: (...args: any[]) => void) => {
  socket.on(event, callback);
};

export const off = (event: string, callback: (...args: any[]) => void) => {
  socket.off(event, callback);
};

export const connected = () => socket.connected;

export const disconnected = () => socket.disconnected;

let currentUserId;

export const useSocketIo = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useUserStore((state) => state);

  socket.on('connect', () => {
    if (!isConnected) {
      // emit('subscribe', 'global');
      setIsConnected(true);
    }
    if (user) {
      if (user._id !== currentUserId) {
        currentUserId = user._id;
        emit('subscribe', `user-${user._id}`);

        if (currentUserId && currentUserId !== user._id) {
          emit('unsubscribe', `user-${user._id}`);
        }
      }
    } else {
      if (currentUserId) {
        emit('unsubscribe', `user-${currentUserId}`);
      }
      currentUserId = null;
    }
  });

  return socket;
}