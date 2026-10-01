/**
 * Server-rendered inline bootstrap:
 * - dataLayer + gtag stub
 * - Consent Mode v2 defaults DENIED before any Google tags
 * - restore stored pib_consent (if present) before GTM
 * Must run before GTM.
 */
export default function ConsentBootstrapScript() {
  const code = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
(function(){
  try {
    var name = 'pib_consent=';
    var row = document.cookie.split('; ').find(function(r){ return r.indexOf(name) === 0; });
    if (!row) { window.__pibAnalyticsConsent = false; return; }
    var raw = decodeURIComponent(row.slice(name.length));
    var rec = JSON.parse(raw);
    if (!rec || rec.version !== 1 || typeof rec.analytics !== 'boolean') {
      window.__pibAnalyticsConsent = false;
      return;
    }
    window.__pibAnalyticsConsent = !!rec.analytics;
    gtag('consent', 'update', {
      analytics_storage: rec.analytics ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  } catch (e) {
    window.__pibAnalyticsConsent = false;
  }
})();
`.replace(/\n/g, " ");

  return (
    <script
      id="pib-consent-bootstrap"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
