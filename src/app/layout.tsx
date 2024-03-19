import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviderWrapper from "./utils/context/auth.context";
import SearchProviderWrapper from "./utils/context/search.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900 text-neutral-100`} >
        <AuthProviderWrapper>
          <SearchProviderWrapper>
            {children}
          </SearchProviderWrapper>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
