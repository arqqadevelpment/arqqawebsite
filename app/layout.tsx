import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
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
    .select("site_url, org_name, org_logo_url, social_profiles, ga4_id, gtm_id, meta_pixel_id")
    .single();

  const siteUrl = settings?.site_url ?? "https://arqqa.net";
  const { gtm_id: gtmId, ga4_id: ga4Id, meta_pixel_id: metaPixelId } = settings ?? {};

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: settings?.org_name ?? "ARQQA",
    url: siteUrl,
    ...(settings?.org_logo_url ? { logo: settings.org_logo_url } : {}),
    ...(settings?.social_profiles?.length ? { sameAs: settings.social_profiles } : {}),
  };

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
