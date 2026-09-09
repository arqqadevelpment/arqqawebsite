import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import { InjectHTML } from "@/components/dashboard/InjectHTML";
import "./globals.css";

// Self-hosted at build time and preloaded, replacing the render-blocking
// @import of fonts.googleapis.com that used to sit at the top of globals.css.
// Inter is a variable font, so omitting `weight` ships one file covering the
// full 200-800 range the design uses instead of six static cuts.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ARQQA: Agencies Sell Creativity. We Deliver Certainty.",
  description:
    "ARQQA is a MarTech Growth System. 13 years, 4 MENA markets, 50+ specialists, one integrated engine for strategy, creative, media, and technology.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select(
      "site_url, org_name, org_logo_url, social_profiles, ga4_id, gtm_id, meta_pixel_id, linkedin_partner_id, gsc_verification, clarity_id, head_snippet, body_snippet, site_alternate_name, default_title, org_name_ar, org_legal_name, org_phone, org_email, org_street, org_city, org_region, org_postal_code, org_country, favicon_url",
    )
    .single();

  const siteUrl = settings?.site_url ?? "https://arqqa.net";
  const {
    gtm_id: gtmId,
    ga4_id: ga4Id,
    meta_pixel_id: metaPixelId,
    linkedin_partner_id: linkedinId,
    gsc_verification: gscVerification,
    clarity_id: clarityId,
    head_snippet: headSnippet,
    body_snippet: bodySnippet,
  } = settings ?? {};

  // Accept either a bare token or the full <meta ...> tag pasted from Search Console.
  const gscContent = gscVerification?.includes("<meta")
    ? gscVerification.match(/content=["']([^"']*)["']/)?.[1]
    : gscVerification;

  const hasAddress = settings?.org_street || settings?.org_city || settings?.org_country;

  // schema.org's `logo`/`image` want an absolute URL — resolve a relative "/foo.webp".
  const absoluteLogo = settings?.org_logo_url
    ? /^https?:\/\//i.test(settings.org_logo_url)
      ? settings.org_logo_url
      : `${siteUrl}${settings.org_logo_url.startsWith("/") ? "" : "/"}${settings.org_logo_url}`
    : undefined;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: settings?.org_name ?? "ARQQA",
    url: siteUrl,
    ...(settings?.org_name_ar ? { alternateName: settings.org_name_ar } : {}),
    ...(settings?.org_legal_name ? { legalName: settings.org_legal_name } : {}),
    ...(absoluteLogo ? { logo: absoluteLogo } : {}),
    ...(settings?.org_phone ? { telephone: settings.org_phone } : {}),
    ...(settings?.org_email ? { email: settings.org_email } : {}),
    ...(hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            ...(settings?.org_street ? { streetAddress: settings.org_street } : {}),
            ...(settings?.org_city ? { addressLocality: settings.org_city } : {}),
            ...(settings?.org_region ? { addressRegion: settings.org_region } : {}),
            ...(settings?.org_postal_code ? { postalCode: settings.org_postal_code } : {}),
            ...(settings?.org_country ? { addressCountry: settings.org_country } : {}),
          },
        }
      : {}),
    ...(settings?.social_profiles?.length ? { sameAs: settings.social_profiles } : {}),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: settings?.default_title || settings?.org_name || "ARQQA",
    url: siteUrl,
    ...(settings?.site_alternate_name ? { alternateName: settings.site_alternate_name } : {}),
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {gscContent && <meta name="google-site-verification" content={gscContent} />}
        {gtmId && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        {!gtmId && ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
            </Script>
          </>
        )}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
        {linkedinId && (
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`_linkedin_partner_id="${linkedinId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
          </Script>
        )}
        {clarityId && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
          </Script>
        )}
        <InjectHTML html={headSnippet ?? null} target="head" />
      </head>
      <body suppressHydrationWarning className="min-h-full antialiased bg-stone-950 text-stone-50">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {linkedinId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${linkedinId}&fmt=gif`}
            />
          </noscript>
        )}
        <InjectHTML html={bodySnippet ?? null} target="body" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
