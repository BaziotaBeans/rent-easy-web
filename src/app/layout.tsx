import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Nunito,
  Nunito_Sans,
  Alex_Brush,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { OverlayFocusProvider } from "@/contexts/overlay-focus-provider";
import { SearchMapProvider } from "@/contexts/search-map-provider";
import { PropertyDetailDialogProvider } from "@/contexts/property-detail-dialog-store-provider";
import { SignInDialogProvider } from "@/contexts/sign-in-dialog-provider";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renteasy",
  description: "Plataforma de aluguel de imóvel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <SearchMapProvider>
        <SignInDialogProvider>
          <OverlayFocusProvider>
            {/* <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
          > */}
            <body
              // className={`${nunitoSans.variable} ${nunito.variable} antialiased font-[family-name:var(--font-nunito-sans)]`}
              className={`${geistSans.variable} ${geistMono.variable} ${alexBrush.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
            >
              <QueryProvider>
                <PropertyDetailDialogProvider>
                  {children}
                </PropertyDetailDialogProvider>
                <Toaster />
                <ToasterSonner/>
              </QueryProvider>
            </body>
          </OverlayFocusProvider>
        </SignInDialogProvider>
      </SearchMapProvider>
    </html>
  );
}
