import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * SEO Component to handle Page Title, Meta Description, and Canonical Links.
 * This ensures Google correctly indexes the "primary" version of each page.
 */
const SEO = ({ title, description, canonical }) => {
  const location = useLocation();
  const domain = "https://mayspear.com"; // Change to your actual domain if different

  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }

    // Construct the canonical URL properly
    let finalUrl = canonical || `${domain}${location.pathname}${location.search}`;
    
    // Sanitize: ensure it starts with domain and handles trailing slash
    // If it's a relative path, prepend domain
    if (finalUrl.startsWith("/")) {
        finalUrl = `${domain}${finalUrl}`;
    }
    
    // Remove trailing slash for consistency (except for root domain)
    if (finalUrl.endsWith("/") && finalUrl !== `${domain}/`) {
        finalUrl = finalUrl.slice(0, -1);
    }

    canonicalLink.setAttribute("href", finalUrl);

  }, [title, description, canonical, location.pathname, location.search]);

  return null; // This component doesn't render anything to the screen
};

export default SEO;
