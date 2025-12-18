// Google Analytics gtag 타입 정의
interface Window {
  dataLayer: any[];
  gtag: (
    command: 'config' | 'event' | 'js' | 'consent',
    targetId: string | Date,
    config?: {
      analytics_storage?: 'granted' | 'denied';
      ad_storage?: 'granted' | 'denied';
      wait_for_update?: number;
      anonymize_ip?: boolean;
      [key: string]: any;
    }
  ) => void;
}

