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
        {/* Google Analytics - 태그는 항상 로드하되 Consent Mode로 제어 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7NMEJZVEB1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Consent Mode 기본 설정 (거부 상태)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'wait_for_update': 2000, // 2초 대기 (동의 배너 확인 시간)
            });
            
            // Analytics 설정 (태그는 항상 초기화 - Google Tag Assistant 감지용)
            gtag('config', 'G-7NMEJZVEB1', {
              'anonymize_ip': true, // IP 익명화 (GDPR 준수)
              'send_page_view': false, // 동의 전에는 페이지뷰 전송 안 함
            });
            
            // 동의 상태 확인 후 업데이트
            if (typeof window !== 'undefined') {
              const consent = localStorage.getItem('cookie-consent');
              if (consent === 'accepted') {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'denied',
                });
                // 동의 후 페이지뷰 전송 활성화
                gtag('config', 'G-7NMEJZVEB1', {
                  'send_page_view': true,
                });
                gtag('event', 'page_view');
              }
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

