import type { Metadata } from "next";
import { Urbanist, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import ApolloWrapper from "@/components/ApolloWrapper";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmsans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Deili Management",
  description: "Manage your daily tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} ${dmsans.variable} antialiased`}>
        <ApolloWrapper>
          <SessionProviderWrapper>
            <ClientLayout>{children}</ClientLayout>
          </SessionProviderWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
