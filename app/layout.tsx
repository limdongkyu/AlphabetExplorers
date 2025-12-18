import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import BrowserWarning from "@/components/BrowserWarning";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/lib/theme";

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
        {/* Google Analytics Consent Mode - 동의 전 기본 설정 */}
        <Script id="google-analytics-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // 동의 상태 확인 (클라이언트 측에서 확인)
            // 기본적으로 거부 상태로 설정
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'wait_for_update': 500,
            });
          `}
        </Script>
        
        {/* Google Analytics - 동의 시에만 활성화 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7NMEJZVEB1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            
            // 동의 상태에 따라 설정 업데이트
            if (typeof window !== 'undefined') {
              const consent = localStorage.getItem('cookie-consent');
              if (consent === 'accepted') {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'denied',
                });
              }
              gtag('config', 'G-7NMEJZVEB1', {
                'anonymize_ip': true, // IP 익명화 (GDPR 준수)
              });
            }
          `}
        </Script>
        
        <ThemeProvider>
          <BrowserWarning />
          <CookieConsent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

