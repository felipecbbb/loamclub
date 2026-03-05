import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const arialNova = localFont({
  src: [
    { path: "../../public/fonts/ArialNova-Light.ttf", weight: "300" },
    { path: "../../public/fonts/ArialNova.ttf", weight: "400" },
    { path: "../../public/fonts/ArialNova-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/ArialNova-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-arial-nova",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "LOAM CLUB",
    template: "%s | LOAM CLUB",
  },
  description:
    "Plataforma de formacion en bienestar emocional y psicologia aplicada por Lorena Amadio.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${arialNova.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
