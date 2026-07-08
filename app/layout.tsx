import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Atlas Guess — nájdi to na mape",
  description: "Bezplatná hra na hádanie miest podľa fotiek z celého sveta."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body bg-chart-ink text-chart-paper antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
