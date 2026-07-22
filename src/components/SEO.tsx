import { useEffect } from "react";
import { siteConfig } from "@/config/site";

export function SEO() {
  useEffect(() => {
    document.title = `${siteConfig.name} - ${siteConfig.title}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", siteConfig.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", `${siteConfig.name} - ${siteConfig.title}`);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", siteConfig.description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (siteConfig.siteUrl && ogUrl) {
      ogUrl.setAttribute("content", siteConfig.siteUrl);
    } else if (siteConfig.siteUrl && !ogUrl) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      meta.setAttribute('content', siteConfig.siteUrl);
      document.head.appendChild(meta);
    }

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const jsonLd: any = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": siteConfig.name,
      "jobTitle": siteConfig.title,
      "sameAs": []
    };
    
    if (siteConfig.siteUrl) {
      jsonLd.url = siteConfig.siteUrl;
    }

    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}
