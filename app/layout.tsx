import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "알파벳 탐험대 - Alphabet Explorers",
  description: "재미있게 배우는 알파벳 대소문자 학습 앱",
  authors: [{ name: "jisubpapa" }],
  creator: "jisubpapa",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "알파벳 탐험대",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased touch-pan-y">
        {children}
      </body>
    </html>
  );
}

