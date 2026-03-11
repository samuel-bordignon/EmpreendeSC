import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Empreende SC",
  description: "Sistema de gerenciamento de empreendimentos catarinenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-background`}
      >
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
