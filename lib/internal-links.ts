// Auto-link key phrases to relevant blog posts for SEO
// Keys are case-insensitive phrases. Values are slugs.

export const INTERNAL_LINKS: Record<string, string> = {
  "how to start an online store": "how-to-start-online-store-australia",
  "start an online store in australia": "how-to-start-online-store-australia",
  "shopify alternatives": "shopify-alternatives-australia",
  "alternative to shopify": "shopify-alternatives-australia",
  "AI tools for ecommerce": "ai-tools-for-ecommerce",
  "stripe vs paypal": "stripe-vs-paypal-australia",
  "payment gateway": "best-payment-gateways-australia",
  "payment processor": "best-payment-gateways-australia",
  "GST for online businesses": "gst-for-online-business-australia",
  "$75,000 threshold": "gst-for-online-business-australia",
  "GST registration": "gst-for-online-business-australia",
  "SEO for small business": "seo-for-small-business-australia",
  "Google Business Profile": "seo-for-small-business-australia",
  "local SEO": "seo-for-small-business-australia",
  "first 10 customers": "first-10-customers-ecommerce",
  "getting your first customers": "first-10-customers-ecommerce",
};

/**
 * Auto-link phrases in markdown content to blog posts.
 * Only links the FIRST occurrence per phrase to avoid over-linking.
 * Skips phrases that are already inside links or code blocks.
 */
export function autoLinkContent(markdown: string, currentSlug: string): string {
  let result = markdown;
  const linkedPhrases = new Set<string>();

  for (const [phrase, slug] of Object.entries(INTERNAL_LINKS)) {
    // Skip linking to current post
    if (slug === currentSlug) continue;
    // Skip if already linked
    if (linkedPhrases.has(phrase.toLowerCase())) continue;

    // Match phrase only if NOT already in a markdown link [text](url)
    // Use a pattern that matches the phrase as a whole word, not inside brackets
    const regex = new RegExp(`(?<!\\[)\\b(${phrase.replace(/[.*+?^${}()|[\]\\$]/g, "\\$&")})\\b(?!\\]\\()`, "i");
    const match = result.match(regex);

    if (match) {
      const original = match[0];
      result = result.replace(regex, `[${original}](/blog/${slug})`);
      linkedPhrases.add(phrase.toLowerCase());
    }
  }

  return result;
}
