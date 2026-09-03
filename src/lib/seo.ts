/**
 * setSeo — one-stop per-route SEO meta updater.
 *
 * Sets document.title plus every search/social meta tag (description, OG,
 * Twitter card, canonical) so each route carries its own unique tags instead
 * of inheriting index.html's site-wide defaults.
 *
 * Usage (inside a page's useEffect):
 *   setSeo({
 *     title: '...',
 *     description: '...',
 *     path: '/services',
 *     image: '/images/SEO.jpeg', // optional, defaults to hero-bg.webp
 *   })
 */

const SITE_URL = 'https://www.monstamediaparramatta.com'
const DEFAULT_IMAGE = SITE_URL + '/images/hero-bg.webp'

interface SeoConfig {
  title: string
  description: string
  /** Route path, e.g. '/', '/services', '/crm' — used for canonical + og:url */
  path: string
  /** Optional per-page OG/Twitter title override (defaults to `title`) */
  ogTitle?: string
  /** Optional per-page OG/Twitter description override (defaults to `description`) */
  ogDescription?: string
  /** Optional per-page share image (absolute URL or site-root path) */
  image?: string
}

export function setSeo({ title, description, path, ogTitle, ogDescription, image }: SeoConfig) {
  document.title = title

  const imageUrl = image ? (image.startsWith('http') ? image : SITE_URL + image) : DEFAULT_IMAGE
  const canonicalUrl = SITE_URL + path

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }

  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', ogTitle ?? title)
  setMeta('meta[property="og:description"]', 'content', ogDescription ?? description)
  setMeta('meta[property="og:url"]', 'content', canonicalUrl)
  setMeta('meta[property="og:image"]', 'content', imageUrl)
  setMeta('meta[name="twitter:title"]', 'content', ogTitle ?? title)
  setMeta('meta[name="twitter:description"]', 'content', ogDescription ?? description)
  setMeta('meta[name="twitter:url"]', 'content', canonicalUrl)
  setMeta('meta[name="twitter:image"]', 'content', imageUrl)

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', canonicalUrl)
}
