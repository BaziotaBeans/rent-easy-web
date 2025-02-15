import type { Metadata } from "next";
import { Geist, Geist_Mono, Alex_Brush } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { OverlayFocusProvider } from "@/contexts/overlay-focus-provider";
import { SearchMapProvider } from "@/contexts/search-map-provider";
import { PropertyDetailDialogProvider } from "@/contexts/property-detail-dialog-store-provider";
import { SignInDialogProvider } from "@/contexts/sign-in-dialog-provider";
import AppProgressBarProvider from "@/providers/app-progress-bar-provider";

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

export const metadata: Metadata = {
  title: {
    absolute: "", // if the template is set ignore all
    default: "Home | Renteasy",
    template: "%s | Renteasy",
  },
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
            <body
              className={`${geistSans.variable} ${geistMono.variable} ${alexBrush.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
            >
              <QueryProvider>
                <AppProgressBarProvider>
                  <PropertyDetailDialogProvider>
                    {children}
                  </PropertyDetailDialogProvider>
                </AppProgressBarProvider>
                <Toaster />
                <ToasterSonner />
              </QueryProvider>
            </body>
          </OverlayFocusProvider>
        </SignInDialogProvider>
      </SearchMapProvider>
    </html>
  );
}
