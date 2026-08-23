import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexander's Moda | Uniformes institucionales y moda colegial",
  description:
    "Uniformes Institucionales y moda colegial. Catálogo, pedidos y atención directa por WhatsApp.",
  metadataBase: new URL("https://alexander-s-moda.vercel.app"),
  openGraph: {
    title: "Alexander's Moda | Uniformes institucionales y moda colegial",
    description:
      "Uniformes Institucionales y moda colegial. Catálogo, pedidos y atención directa por WhatsApp.",
    url: "https://alexander-s-moda.vercel.app",
    siteName: "Alexander's Moda",
    images: [
      {
        url: "https://res.cloudinary.com/dkq95jus0/image/upload/v1787432031/og-banner-guindo-marca_mdwk3m.png",
        width: 1200,
        height: 630,
        alt: "Alexander's Moda",
      },
    ],
    locale: "es_BO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander's Moda | Uniformes institucionales y moda colegial",
    description:
      "Uniformes Institucionales y moda colegial. Catálogo, pedidos y atención directa por WhatsApp.",
    images: ["https://res.cloudinary.com/dkq95jus0/image/upload/v1787432031/og-banner-guindo-marca_mdwk3m.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Alex+Brush&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
