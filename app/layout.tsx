import type { Metadata } from "next";
import { Domine } from "next/font/google";
import "./globals.css";

const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tentaciones por Sandili - Pastelería Personalizada",
  description:
    "Pastelería artesanal personalizada en La Paz, Bolivia desde 2005",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${domine.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-domine), serif" }}>
        {children}
      </body>
    </html>
  );
}
