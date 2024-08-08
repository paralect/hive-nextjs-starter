'use client'

import _ from 'lodash';
import React, { Component, useEffect } from 'react';
import useUserStore from "@/zustand/userStore";
import { getUser } from 'lib/auth';
import { connect, disconnect } from '@/lib/socketIo';
import { useSocketIo } from '@/lib/socketIo';
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import { Toaster } from '@/components/ui/sonner'

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

interface ClientWrapperProps {
  children: React.ReactNode;
}

function ClientWrapper({ children }: ClientWrapperProps) {
  const { user, shadowToken, setShadowToken, setUser } = useUserStore((state) => state);

  const socket = useSocketIo();

  const pathname = usePathname();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userFromApi = await getUser();
        if (userFromApi) {
          setUser(userFromApi);
        }
      } catch (err) {
        console.error('Error loading user:', err);
      }
    }

    if (!user) {
      loadUser();
    }

    connect();
    socket.on('user:updated', (newUser) => {
      setUser(newUser);
    });

    return () => {
      disconnect();
      socket.off('user:updated');
    };
  }, []);

  return (
    <>
      <Toaster></Toaster>
      {shadowToken && (
        <div className="fixed px-4 left-0 top-0 bg-primary w-full text-center flex items-center justify-start z-10 h-[50px]">
          <div className="bold">Admin login</div>
          <div className="absolute right-4 top-1">
            <Button onClick={() => {
              setShadowToken(null);
              window.location.href = '/admin/users';
            }} variant="outline">Back to admin view</Button>
          </div>
        </div>
      )}
      {user || pathname.startsWith('/auth') ? (<div className={`${shadowToken ? 'mt-[50px]' : ''} h-full overflow-x-auto md:overflow-x-hidden`}>{children}</div>) : null}
    </>
  );
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ErrorBoundary>
      <ClientWrapper>{children}</ClientWrapper>
    </ErrorBoundary>
  );
}