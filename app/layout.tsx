import ClientLayout from './client-layout';
import { Inter } from "next/font/google";
import "./globals.css";
import "./app.css";
import Providers from "@/lib/provider";
import Meta from '@/components/Meta';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  ...Meta({
  }),
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="overflow-x-hidden">
        <div className={`${inter.className} bg-white flex min-h-screen items-stretch overflow-x-hidden`}>
          <Providers>
            <main className="flex flex-col w-screen overflow-x-hidden">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <ClientLayout>
        {children}
      </ClientLayout>
    </RootLayout>
  );
}
