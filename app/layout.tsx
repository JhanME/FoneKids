import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"; // <--- CAMBIO 1: Importar Clerk
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoneKids", // <--- Personalicé el título de una vez
  description: "Aplicación educativa para niños",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // CAMBIO 2: Envolver toda la estructura HTML con ClerkProvider
    <ClerkProvider>
      <html lang="es"> {/* <--- Cambié "en" por "es" para SEO en español */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
