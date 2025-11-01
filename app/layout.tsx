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
  openGraph: {
    title: "Tentaciones por Sandili - Pastelería Personalizada",
    description:
      "Pastelería artesanal personalizada en La Paz, Bolivia desde 2005",
    url: "https://tentaciones.com",
    siteName: "Tentaciones por Sandili",
    images: [
      {
        url: "/logo.webp",
        width: 520,
        height: 320,
        alt: "Tentaciones por Sandili",
      },
    ],
    locale: "es_BO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentaciones por Sandili - Pastelería Personalizada",
    description:
      "Pastelería artesanal personalizada en La Paz, Bolivia desde 2005",
    images: ["/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FSL3Q4TW1T"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FSL3Q4TW1T');
            `,
          }}
        />
      </head>
      <body
        className={`${domine.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-domine), serif" }}>
        {children}
      </body>
    </html>
  );
}
