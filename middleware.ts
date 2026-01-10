import { match } from '@formatjs/intl-localematcher';
import deepmerge from 'deepmerge';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { ArrayItemType, Writeable } from 'xenopomp-essentials';

export const locales = ['en-US', 'ru-RU'] as const;
export type Locales = ArrayItemType<Writeable<typeof locales>>;

/**
 * Parse headers from Next.js
 * @param request
 */
function getHeaders(request: NextRequest): Negotiator.Headers {
  const nextHeaders = request.headers;
  const objects = nextHeaders
    .entries()
    .map(([key, value]) => ({
      [key]: value,
    }))
    .map(o => o as Record<string, string>)
    .toArray();

  return deepmerge.all<Record<string, string>>(objects);
}

// eslint-disable-next-line jsdoc/require-jsdoc
function prepareLanguages(rawLanguages: string[]) {
  if (rawLanguages.length !== 1) return rawLanguages;
  const first = rawLanguages.at(0);
  if (!first) return rawLanguages;

  // * is incorrectly handled by library
  if (first === '*') {
    console.warn(
      'Seems like you are running app inside Cypress headless mode.',
    );
    return [];
  }
  return rawLanguages;
}

/**
 * Get the preferred locale, similar to the above or using a library
 */
function getLocale(request: NextRequest) {
  const headers = getHeaders(request);
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = 'en-US';
  return match(prepareLanguages(languages), locales, defaultLocale);
}

// eslint-disable-next-line jsdoc/require-jsdoc
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
