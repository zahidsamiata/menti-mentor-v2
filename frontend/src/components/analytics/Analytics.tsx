/**
 * Analytics — Google Tag Manager + GA4 (gtag.js) + Microsoft Clarity yükleyici.
 *
 * `next/script` (afterInteractive) ile yüklenir; ek bağımlılık yok.
 * Ölçüm ID'leri GİZLİ DEĞİLDİR — client HTML'de zaten görünür → koda gömülü tutulur.
 *
 * Yalnız `production`'da render edilir: lokal/dev trafiği GA/Clarity verisini kirletmesin.
 *
 * ⚠️ KVKK: İzleme çerezleri açık rıza gerektirir. Çerez-izni bandı (yol haritası #56)
 * henüz YOK → bu kodlar şu an rıza-öncesi tetikleniyor. Bant eklenince Consent Mode v2
 * ile koşullandırılmalı (rıza verilene dek tag tetiklenmemeli).
 */
import Script from 'next/script';

const GTM_ID = 'GTM-WVRM7WFN';
const GA4_ID = 'G-920PDSDB4D';
const CLARITY_ID = 'y6gtphs1l7';

const isProd = process.env.NODE_ENV === 'production';

/** `<head>`/`<body>` içine yerleştirilen betikler (GTM + GA4 + Clarity). */
export function Analytics() {
  if (!isProd) return null;

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* Google Analytics 4 (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
      </Script>
    </>
  );
}

/**
 * GTM `<noscript>` iframe — JS kapalı tarayıcılar için.
 * GTM şartı: açılan `<body>` etiketinden HEMEN SONRA render edilmeli.
 */
export function GtmNoScript() {
  if (!isProd) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
