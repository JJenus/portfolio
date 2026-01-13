import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const Analytics = () => {
  useEffect(() => {
    // Google Analytics (gtag.js)
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR_TRACKING_ID';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) { window.dataLayer.push(args); }
    gtag('js', new Date());
    gtag('config', 'G-YOUR_TRACKING_ID');

    // Track page views on hash changes (for single page app)
    const handleHashChange = () => {
      gtag('config', 'G-YOUR_TRACKING_ID', {
        page_path: window.location.hash || '/'
      });
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
};

export default Analytics;