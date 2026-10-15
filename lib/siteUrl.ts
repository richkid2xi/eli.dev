/**
 * Site URL configuration with environment variable support and fallback.
 */
export const FALLBACK_SITE_URL = 'https://elidex.vercel.app';

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    FALLBACK_SITE_URL;
  return url.replace(/\/+$/, '');
}
