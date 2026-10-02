import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayşe AKTAŞ | Software Developer",
  description:
    "Ayşe AKTAŞ'ın kişisel portföyü. Modern web ve mobil çözümleri, Flutter ve Go geliştirme projeleri.",
  keywords: [
    "Ayşe AKTAŞ",
    "Software Developer",
    "Mobile App Developer",
    "Flutter Developer",
    "Backend Developer",
    "Go Developer",
    "Portfolio",
    "Software Engineering"
  ],
  authors: [{ name: "Ayşe AKTAŞ", url: "https://ayseaktas.com" }],
  creator: "Ayşe AKTAŞ",
  metadataBase: new URL("https://ayseaktas.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/tr",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Ayşe AKTAŞ | Software Developer",
    description:
      "Modern ve performanslı yazılım çözümleri sunan Ayşe AKTAŞ'ın kişisel portföyünü keşfedin.",
    url: "https://ayseaktas.com",
    siteName: "Ayşe AKTAŞ",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayşe AKTAŞ Portfolio",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayşe AKTAŞ | Software Developer",
    description: "Mobile & Backend Software Engineer.",
    creator: "@ayseaktas",
    images: ["/images/og-image.png"],
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" style={{ margin: "0", padding: "0", minWidth: "100%" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
