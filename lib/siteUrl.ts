/**
 * Site URL configuration with environment variable support and fallback.
 */
export const FALLBACK_SITE_URL = 'https://elikem.dev';

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;
  return url.replace(/\/+$/, '');
}
