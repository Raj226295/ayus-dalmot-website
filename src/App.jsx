import { useEffect, useRef, useState } from 'react'
import './App.css'

const menuLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const announcementItems = [
  'Pure Ingredients.',
  'Authentic Taste.',
  'Ayush Quality.',
  'Delivering Happiness Across India',
]

const defaultNavHref = menuLinks[0].href
const accountStorageKey = 'ayush-kursela-account'
const addressStorageKey = 'ayush-kursela-addresses'
const wishlistStorageKey = 'ayush-kursela-wishlist'
const defaultAccountAddresses = [
  { id: 'home', label: 'Home', addressLine: '85 P, Barauni – Purnea Hwy', cityLine: 'Maranga, Purnia, Bihar 854301', phone: '+91 91234 56789', isDefault: true, icon: 'home' },
  { id: 'office', label: 'Office', addressLine: '2nd Floor, Sagar Building', cityLine: 'Naya Tola, Purnia, Bihar 854301', phone: '+91 98765 43210', isDefault: false, icon: 'building' },
]

function formatBagWeight(weight) {
  return Number.isInteger(weight) ? String(weight) : Number(weight).toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

function readStoredAccount() {
  if (typeof window === 'undefined') return null

  try {
    const account = JSON.parse(window.localStorage.getItem(accountStorageKey) || 'null')
    return account?.name && account?.email ? account : null
  } catch {
    return null
  }
}

function persistAccount(account) {
  window.localStorage.setItem(accountStorageKey, JSON.stringify(account))
}

function readStoredAddresses() {
  if (typeof window === 'undefined') return defaultAccountAddresses
  try {
    const stored = JSON.parse(window.localStorage.getItem(addressStorageKey) || 'null')
    return Array.isArray(stored) ? stored : defaultAccountAddresses
  } catch {
    return defaultAccountAddresses
  }
}

function readStoredWishlist() {
  if (typeof window === 'undefined') return []
  try {
    const stored = JSON.parse(window.localStorage.getItem(wishlistStorageKey) || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function getCurrentNavHref() {
  if (typeof window === 'undefined') {
    return defaultNavHref
  }

  const currentHash = window.location.hash.split('?')[0]

  return menuLinks.some((item) => item.href === currentHash) ? currentHash : defaultNavHref
}

function getCurrentPageHash() {
  if (typeof window === 'undefined') {
    return defaultNavHref
  }

  return window.location.hash || defaultNavHref
}

const footerLinks = {
  quickLinks: [
    'Home',
    'Products',
    'About Us',
    'Quality',
    'Retail Mode',
    'Wholesale Mode',
    'Contact Us',
  ],
  products: [
    'Sattu',
    'Paneer Bhujia',
    'Nimbu Bhujia',
    'Katarr Matar',
    'Kursela Chanachur',
    'Mixture',
    'Bhujia',
    'Diet Chidwa',
  ],
  customerCare: [
    'Help Center',
    'Shipping Policy',
    'Return Policy',
    'Terms & Conditions',
    'Privacy Policy',
    'Order Tracking',
  ],
}

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: '/ayush/facebook.png',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: '/ayush/instagram.png',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/911234567890',
    icon: '/ayush/whatsapp.png',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: '/ayush/youtube.png',
  },
]

const featureItems = [
  {
    title: '100% Pure Ingredients',
    description: 'No artificial colors & flavors',
    icon: 'leaf',
  },
  {
    title: 'Hygienically Processed',
    description: 'Clean & safe production',
    icon: 'shield',
  },
  {
    title: 'No Added Preservatives',
    description: 'Original & natural ingredients',
    icon: 'drop',
  },
  {
    title: 'Pan India Delivery',
    description: 'Fast & reliable shipping',
    icon: 'truck',
  },
]

const factoryBenefits = [
  { label: '100% Pure Ingredients', icon: 'leaf' },
  { label: 'Hygienically Prepared', icon: 'drop' },
  { label: 'No Added Preservatives', icon: 'flask' },
]

const trustItems = [
  {
    title: 'Trusted by Lakhs of Families',
    description: 'Loved across generations',
    icon: 'badge',
  },
  {
    title: 'Authentic Taste Since 1989',
    description: 'Tradition in every batch',
    icon: 'leaf',
  },
  {
    title: 'Made with Love in Every Bite',
    description: 'Premium care from our kitchen',
    icon: 'heart',
  },
]

const footerContactInfo = {
  phone: '+91 12345 67890',
  phoneNote: 'Mon - Sat: 9AM to 6PM',
  email: 'info@ayushkursela.com',
  emailNote: 'We reply within 24hrs',
  addressTitle: '85 P, Barauni - Purnea Hwy',
  addressBody: 'Maranga, Purnia, Maranga, Bihar 854301',
}

const contactHeroItems = [
  { label: 'Pure Ingredients', icon: 'leaf' },
  { label: 'Trusted Quality', icon: 'shield' },
  { label: 'Loved by Millions', icon: 'heart' },
]

const contactFaqItems = [
  {
    id: 'products',
    question: 'What products does the company offer?',
    answer:
      'Ayush Kursela offers a curated range of namkeen and traditional snack favourites including bhujia, mixture, matar, sattu and regional specialties prepared with premium ingredients.',
  },
  {
    id: 'availability',
    question: 'Where are your products available?',
    answer:
      'Our products are available across multiple retail counters, partner stores and direct business channels. For the fastest assistance, reach out to our team and we will guide you to the nearest available source.',
  },
  {
    id: 'wholesale',
    question: 'Do you offer bulk or wholesale orders?',
    answer:
      'Yes. We support bulk and wholesale enquiries for retailers, distributors and hospitality partners. Share your quantity requirements and city details, and our team will assist you with the next steps.',
  },
  {
    id: 'bulk-order',
    question: 'How can I place a bulk order?',
    answer:
      'You can use the message form on this page, email us directly, or call our support line. Please include the product name, quantity, delivery location and timeline so we can respond quickly.',
  },
  {
    id: 'partnership',
    question: 'Do you have partnership or distributorship opportunities?',
    answer:
      'We welcome meaningful partnership and distributorship conversations. Send us your business profile and region details, and our team will get back to you after reviewing the opportunity.',
  },
]

const contactMapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${footerContactInfo.addressTitle}, ${footerContactInfo.addressBody}`,
)}`

const contactMapEmbedHref = `https://www.google.com/maps?q=${encodeURIComponent(
  `${footerContactInfo.addressTitle}, ${footerContactInfo.addressBody}`,
)}&output=embed`

const footerFeatureItems = [
  {
    title: '100% Pure Ingredients',
    description: 'No artificial colors & flavors',
    icon: 'leaf',
  },
  {
    title: 'Hygienically Processed',
    description: 'Clean & safe production',
    icon: 'shield',
  },
  {
    title: 'No Added Preservatives',
    description: '0% maida & harmful chemicals',
    icon: 'drop',
  },
  {
    title: 'Pan India Delivery',
    description: 'Fast & reliable shipping',
    icon: 'truck',
  },
]

const footerQuickLinkTargets = {
  Home: '#home',
  Products: '#products',
  'About Us': '#about',
  Quality: '#footer-usp',
  'Retail Mode': '#shopping-modes',
  'Wholesale Mode': '#shopping-modes',
  'Contact Us': '#contact',
}

const footerMetaHighlights = [
  {
    id: 'trusted',
    title: 'Trusted by',
    emphasis: 'Lakhs of Families',
    subtitle: 'â˜…â˜…â˜…â˜…â˜…',
    icon: 'badge',
  },
  {
    id: 'taste',
    title: 'Authentic Taste',
    emphasis: 'Since 1989',
    subtitle: '',
    icon: 'leaf',
  },
  {
    id: 'love',
    title: 'Made with Love',
    emphasis: 'In Every Bite',
    subtitle: '',
    icon: 'heart',
  },
]

const paymentMethods = [
  { label: 'UPI', tone: 'upi' },
  { label: 'Visa', tone: 'visa' },
  { label: 'Mastercard', tone: 'mastercard' },
  { label: 'RuPay', tone: 'rupay' },
  { label: 'Paytm', tone: 'paytm' },
]

const productCatalog = [
  {
    id: 'katarr-matar',
    name: 'Katarr Matar',
    weight: '150g',
    price: 25,
    wholesale: { pcsPerBag: 120, weightKgPerBag: 5.4, ratePerBag: 820 },
    image: '/ayush/product-katarr-matar.png',
    alt: 'Ayush Katarr Matar product pack',
  },
  {
    id: 'bhujia',
    name: 'Bhujia',
    weight: '150g',
    price: 25,
    wholesale: { pcsPerBag: 100, weightKgPerBag: 5, ratePerBag: 760 },
    image: '/ayush/product-bhujia.png',
    alt: 'Ayush Bhujia product pack',
  },
  {
    id: 'mixture',
    name: 'Mixture',
    weight: '150g',
    price: 25,
    wholesale: { pcsPerBag: 90, weightKgPerBag: 4.5, ratePerBag: 700 },
    image: '/ayush/product-mixture.png',
    alt: 'Ayush Mixture product pack',
  },
  {
    id: 'sattu',
    name: 'Ayush Sattu',
    weight: '500g',
    price: 65,
    wholesale: { pcsPerBag: 30, weightKgPerBag: 15, ratePerBag: 1260 },
    image: '/ayush/product-sattu.png',
    alt: 'Ayush Sattu product pack',
  },
  {
    id: 'paneer-bhujia',
    name: 'Paneer Bhujia',
    weight: '150g',
    price: 30,
    wholesale: { pcsPerBag: 100, weightKgPerBag: 5, ratePerBag: 920 },
    image: '/ayush/product-paneer-bhujia.png',
    alt: 'Ayush Paneer Bhujia product pack',
  },
  {
    id: 'nimbu-bhujia',
    name: 'Nimbu Bhujia',
    weight: '150g',
    price: 25,
    wholesale: { pcsPerBag: 110, weightKgPerBag: 5.5, ratePerBag: 790 },
    image: '/ayush/product-nimbu-bhujia.png',
    alt: 'Ayush Nimbu Bhujia product pack',
  },
  {
    id: 'kursela-chanachur',
    name: 'Kursela Chanachur',
    weight: '200g',
    price: 35,
    wholesale: { pcsPerBag: 80, weightKgPerBag: 4.8, ratePerBag: 880 },
    image: '/ayush/product-kursela-chanachur.png',
    alt: 'Ayush Kursela Chanachur product pack',
  },
]

const bestsellerProducts = [
  {
    id: 'bestseller-sattu',
    name: 'Ayush Sattu',
    weight: '500g',
    price: 65,
    wholesale: { pcsPerBag: 30, weightKgPerBag: 15, ratePerBag: 1260 },
    image: '/ayush/product-sattu.png',
    alt: 'Ayush Sattu bestseller pack',
    isBestseller: true,
  },
  {
    id: 'bestseller-katarrar-matar',
    name: 'Katarrar Matar',
    weight: '150g',
    price: 25,
    wholesale: { pcsPerBag: 120, weightKgPerBag: 5.4, ratePerBag: 820 },
    image: '/ayush/product-katarr-matar.png',
    alt: 'Ayush Katarrar Matar bestseller pack',
  },
  {
    id: 'bestseller-nimbu-bhujiya',
    name: 'Nimbu Bhujiya',
    weight: '200g',
    price: 30,
    wholesale: { pcsPerBag: 110, weightKgPerBag: 5.5, ratePerBag: 790 },
    image: '/ayush/product-nimbu-bhujia.png',
    alt: 'Ayush Nimbu Bhujiya bestseller pack',
  },
  {
    id: 'bestseller-mixture',
    name: 'Mixture',
    weight: '400g',
    price: 55,
    wholesale: { pcsPerBag: 90, weightKgPerBag: 4.5, ratePerBag: 700 },
    image: '/ayush/product-mixture.png',
    alt: 'Ayush Mixture bestseller pack',
  },
  {
    id: 'bestseller-kursela-chanachur',
    name: 'Kursela Chanachur',
    weight: '200g',
    price: 35,
    wholesale: { pcsPerBag: 80, weightKgPerBag: 4.8, ratePerBag: 880 },
    image: '/ayush/product-kursela-chanachur.png',
    alt: 'Ayush Kursela Chanachur bestseller pack',
  },
  {
    id: 'bestseller-paneer-bhujiya',
    name: 'Paneer Bhujiya',
    weight: '200g',
    price: 40,
    wholesale: { pcsPerBag: 100, weightKgPerBag: 5, ratePerBag: 920 },
    image: '/ayush/product-paneer-bhujia.png',
    alt: 'Ayush Paneer Bhujiya bestseller pack',
  },
]

const baseCartItemCount = 0

function Icon({ name, className = '' }) {
  switch (name) {
    case 'filter':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 6h16M7 12h10M10 18h4" />
          <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'grid':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      )
    case 'menu':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      )
    case 'user':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="8" r="4" />
        </svg>
      )
    case 'lock':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
        </svg>
      )
    case 'bag':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2M9 13h.01M15 13h.01" />
        </svg>
      )
    case 'package':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z" /><path d="m4 7 8 4 8-4M12 11v10" />
        </svg>
      )
    case 'logout':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9" />
        </svg>
      )
    case 'home':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 9-8 9 8v9H3v-9Z" /><path d="M9 20v-6h6v6" /></svg>
      )
    case 'building':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V4h12v17M16 9h4v12M8 8h4M8 12h4M8 16h4M10 21v-2" /></svg>
      )
    case 'edit':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m4 20 4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" /><path d="m14.5 6.7 2.8 2.8" /></svg>
      )
    case 'trash':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M10 11v5M14 11v5M9 7l1-3h4l1 3M6 7l1 13h10l1-13" /></svg>
      )
    case 'more':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="12" cy="19" r="1.7" /></svg>
      )
    case 'headset':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14v3a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 1ZM20 14v3a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 1Z" /></svg>
      )
    case 'chat':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h14v11H9l-4 3V5Z" /><path d="M9 10h6M9 13h4" /></svg>
      )
    case 'return':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m8 7-4 4 4 4M4 11h10a5 5 0 0 1 5 5v1" /><path d="M8 3h10v8" /></svg>
      )
    case 'eye':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
          <circle cx="12" cy="12" r="2.6" />
        </svg>
      )
    case 'eye-off':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 3 18 18M10.6 6.2A10.5 10.5 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.1 2.8M6.3 6.4C3.8 8.1 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 3.1-.5M10.2 10.3a2.6 2.6 0 0 0 3.5 3.5" />
        </svg>
      )
    case 'cart':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M3 4h2l2.4 10.5a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H7" />
        </svg>
      )
    case 'share':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5.5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="18.5" r="2.5" />
          <path d="M8.35 10.8 15.65 6.7" />
          <path d="M8.35 13.2 15.65 17.3" />
        </svg>
      )
    case 'search':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.2 4.2" />
        </svg>
      )
    case 'truck':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h11v9H3z" />
          <path d="M14 9h3l4 4v2h-7z" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="18" cy="18" r="1.5" />
        </svg>
      )
    case 'leaf':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 4c-8 0-14 4.5-14 11 0 3.2 2 5 5 5 6.5 0 11-6 9-16z" />
          <path d="M5 13c4 0 7 2 9 6" />
        </svg>
      )
    case 'drop':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3c4 5 6 8.5 6 11a6 6 0 1 1-12 0c0-2.5 2-6 6-11z" />
        </svg>
      )
    case 'flask':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 2h4" />
          <path d="M10 2v6l-5.5 9.2A2 2 0 0 0 6.2 20h11.6a2 2 0 0 0 1.7-2.8L14 8V2" />
          <path d="M8.3 14h7.4" />
        </svg>
      )
    case 'shield':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
          <path d="M9.2 12.2l1.9 1.9 3.7-4.1" />
        </svg>
      )
    case 'badge':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="9.5" r="5.5" />
          <path d="M9.8 15l-1.5 5 3.7-2.2 3.7 2.2-1.5-5" />
          <path d="M9.6 9.6l1.5 1.5 3-3.2" />
        </svg>
      )
    case 'heart':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
        </svg>
      )
    case 'heart-filled':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
        </svg>
      )
    case 'chevron-left':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 5.5 8 12l6.5 6.5" />
        </svg>
      )
    case 'chevron-right':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9.5 5.5 16 12l-6.5 6.5" />
        </svg>
      )
    case 'phone':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 4h4l1.5 4-2.2 1.8a15 15 0 0 0 6.1 6.1l1.8-2.2 4 1.5v4a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      )
    case 'card':
      return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18M7 15h3" /></svg>
    case 'qr':
      return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h3v3h3M14 20h3M20 14v2" /></svg>
    case 'calendar':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M4 10h16" />
        </svg>
      )
    case 'weight':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 7.5a3.5 3.5 0 1 1 7 0" />
          <path d="M6 8h12l2 12H4L6 8Z" />
          <path d="M10 12h4M12 10v4" />
        </svg>
      )
    case 'reset':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8V4m0 0h4M5 4l3.1 3.1A7 7 0 1 1 5.5 14" />
        </svg>
      )
    case 'list':
      return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" fill="currentColor" /><circle cx="4.5" cy="12" r="1" fill="currentColor" /><circle cx="4.5" cy="18" r="1" fill="currentColor" /></svg>
    case 'ruler':
      return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h8v18H7zM7 7h4M7 11h3M7 15h4M15 18h4v3h-4" /></svg>
    case 'trending':
      return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 17 5-5 4 4 7-9M15 7h5v5" /></svg>
    case 'clock':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3.2 2" />
        </svg>
      )
    case 'store':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10v10h16V10" />
          <path d="M3 10h18l-2-6H5l-2 6z" />
          <path d="M8 10v1.2a2 2 0 0 0 4 0V10m0 0v1.2a2 2 0 0 0 4 0V10" />
          <path d="M9 20v-5h6v5" />
        </svg>
      )
    case 'mail':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16v12H4z" />
          <path d="M4 8l8 6 8-6" />
        </svg>
      )
    case 'pin':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s6-6.2 6-11a6 6 0 1 0-12 0c0 4.8 6 11 6 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'mail-filled':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16v12H4z" />
          <path d="M4 8l8 6 8-6" />
        </svg>
      )
    case 'send':
      return (
        <svg
          aria-hidden="true"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22l-4-9-9-4 20-7z" />
        </svg>
      )
    default:
      return null
  }
}

function scrollToHashTarget(href, options = {}) {
  const { behavior = 'smooth', updateUrl = true } = options

  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    !href.startsWith('#')
  ) {
    return false
  }

  const targetId = href.replace('#', '')
  const target = document.getElementById(targetId)

  if (!target) {
    if (updateUrl) {
      window.location.hash = href
    }

    return false
  }

  const headerHeight =
    document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0
  const targetTop =
    target.getBoundingClientRect().top + window.scrollY - headerHeight - 12

  if (updateUrl) {
    window.history.replaceState(null, '', href)
  }

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior,
  })

  return true
}

function triggerProductCta() {
  scrollToHashTarget('#shopping-modes')
}

function buildProductShareUrl(product, sectionId = 'products') {
  const shareUrl = new URL(window.location.href)

  shareUrl.hash = sectionId
  shareUrl.search = ''
  shareUrl.searchParams.set('product', product.id)

  return shareUrl.toString()
}

async function copyTextToClipboard(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fall through to the document copy fallback below.
    }
  }

  if (typeof document === 'undefined') {
    return false
  }

  const hiddenField = document.createElement('textarea')

  hiddenField.value = text
  hiddenField.setAttribute('readonly', '')
  hiddenField.style.position = 'fixed'
  hiddenField.style.opacity = '0'
  hiddenField.style.pointerEvents = 'none'

  document.body.appendChild(hiddenField)
  hiddenField.focus()
  hiddenField.select()

  const didCopy = document.execCommand('copy')

  document.body.removeChild(hiddenField)

  return didCopy
}

async function shareCurrentProduct(product, sectionId = 'products') {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'unavailable'
  }

  const productUrl = buildProductShareUrl(product, sectionId)

  const payload = {
    title: `Ayush Kursela - ${product.name}`,
    text: `${product.name} ${product.weight} - â‚¹${product.price}`,
    url: productUrl,
  }

  try {
    if (typeof navigator.share === 'function') {
      await navigator.share(payload)
      return 'shared'
    }
  } catch (error) {
    if (error?.name === 'AbortError') {
      return 'cancelled'
    }
  }

  const didCopy = await copyTextToClipboard(productUrl)

  return didCopy ? 'copied' : 'unavailable'
}

function FooterLinkItem({ item }) {
  const handleClick = (event) => {
    if (!item.href.startsWith('#')) {
      return
    }

    event.preventDefault()
    scrollToHashTarget(item.href)
  }

  return (
    <a className="footer-list-link" href={item.href} onClick={handleClick}>
      <Icon name="chevron-right" className="footer-list-link__icon" />
      <span>{item.label}</span>
    </a>
  )
}

function FooterPanelSection({ panel, isCollapsible, isOpen, onToggle }) {
  const panelId = `footer-panel-${panel.id}`
  const panelClasses = [
    'footer-section-panel',
    isCollapsible ? 'is-collapsible' : 'is-static',
    isOpen ? 'is-open' : '',
  ]
    .filter(Boolean)
    .join(' ')
  const bodyClasses = [
    'footer-section-panel__body',
    !isCollapsible || isOpen ? 'is-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={panelClasses}>
      <button
        type="button"
        className="footer-section-panel__toggle"
        aria-expanded={isCollapsible ? isOpen : true}
        aria-controls={panelId}
        onClick={() => {
          if (isCollapsible) {
            onToggle(panel.id)
          }
        }}
      >
        <span>{panel.title}</span>
        <span className="footer-section-panel__symbol" aria-hidden="true">
          <Icon name="chevron-right" className="footer-section-panel__symbol-icon" />
        </span>
      </button>

      <div className={bodyClasses} id={panelId}>
        <div className="footer-section-panel__body-inner">
          {panel.type === 'links' ? (
            <ul className="footer-section-panel__list">
              {panel.items.map((item) => (
                <li key={item.label}>
                  <FooterLinkItem item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="footer-contact-list">
              {panel.items.map((item) => (
                <div key={item.title} className="footer-contact-item">
                  <span className="footer-contact-item__icon">
                    <Icon name={item.icon} className="stroke-icon" />
                  </span>
                  <div className="footer-contact-item__content">
                    {item.href ? (
                      <a className="footer-contact-item__title" href={item.href}>
                        {item.title}
                      </a>
                    ) : (
                      <p className="footer-contact-item__title">{item.title}</p>
                    )}
                    {item.note ? <p className="footer-contact-item__note">{item.note}</p> : null}
                    {item.body ? <p className="footer-contact-item__body">{item.body}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Reveal({ as: Tag = 'section', className = '', children, ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const classes = ['reveal', visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  )
}

function TopBar() {
  const marqueeItems = [...announcementItems, ...announcementItems]

  return (
    <div className="announcement-bar" role="region" aria-label="Store announcements">
      <p className="sr-only">{announcementItems.join(' ')}</p>

      <div className="announcement-bar__viewport" aria-hidden="true">
        <div className="announcement-bar__track">
          {marqueeItems.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="announcement-bar__item"
            >
              {index % announcementItems.length === announcementItems.length - 1 ? (
                <Icon name="truck" className="announcement-bar__icon" />
              ) : null}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Navbar({ activePageHref, cartItemCount = baseCartItemCount, wishlistCount = 0, isAuthenticated = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeHref, setActiveHref] = useState(getCurrentNavHref)
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 18,
  )
  const displayedActiveHref = menuLinks.some((item) => item.href === activePageHref)
    ? activePageHref
    : activeHref
  const mobileSearchInputRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)

    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleHashChange = () => setActiveHref(getCurrentNavHref())
    const handleScroll = () => setIsScrolled(window.scrollY > 18)

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!mobileSearchOpen) {
      return
    }

    mobileSearchInputRef.current?.focus()
  }, [mobileSearchOpen])

  const navigateToSection = (href) => {
    setActiveHref(href)

    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    // Primary navigation changes the route first. Some home sections reuse these
    // ids, so scrolling the currently rendered DOM would otherwise prevent the
    // intended page from mounting (notably for #products).
    if (window.location.hash !== href) {
      window.location.hash = href
      return
    }

    // Re-selecting the active menu item returns the user to the top of that page.
    scrollToHashTarget(href, { behavior: 'smooth', updateUrl: false })
  }

  const handleNavLinkClick = (event, href) => {
    event.preventDefault()
    setMenuOpen(false)
    setMobileSearchOpen(false)
    navigateToSection(href)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const normalizedQuery = searchQuery.trim().toLowerCase()
    const matchedNavItem = menuLinks.find((item) =>
      item.label.toLowerCase().includes(normalizedQuery),
    )
    const matchedProduct = productCatalog.find((product) =>
      product.name.toLowerCase().includes(normalizedQuery),
    )
    const targetHref =
      matchedNavItem?.href ?? (matchedProduct || normalizedQuery ? '#products' : defaultNavHref)

    setMenuOpen(false)
    setMobileSearchOpen(false)
    navigateToSection(targetHref)
  }

  const toggleMenu = () => {
    setMenuOpen((value) => !value)
    if (menuOpen) setMobileProductsOpen(false)
    setMobileSearchOpen(false)
  }

  const toggleMobileSearch = () => {
    setMobileSearchOpen((value) => !value)
    setMenuOpen(false)
  }

  return (
    <header
      className={['site-header', isScrolled ? 'is-scrolled' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="shell-content site-header__inner">
        <div className="site-header__desktop">
          <a
            className="brand-mark"
            href="#home"
            aria-label="Ayush Kursela home"
            onClick={(event) => handleNavLinkClick(event, '#home')}
          >
            <img src="/ayush/logo-navbar-clean.png" alt="Ayush Kursela logo" />
          </a>

          <nav className="site-nav site-nav--desktop" aria-label="Primary">
            {menuLinks.map((item) => (
              <a
                key={item.label}
                className={displayedActiveHref === item.href ? 'is-active' : ''}
                href={item.href}
                aria-current={displayedActiveHref === item.href ? 'page' : undefined}
                onClick={(event) => handleNavLinkClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions site-header__actions--desktop">
            <form className="site-search" role="search" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />
              <button
                type="submit"
                className="site-search__button"
                aria-label="Submit product search"
              >
                <Icon name="search" className="site-search__icon" />
              </button>
            </form>

            <button type="button" className="icon-button" aria-label={isAuthenticated ? 'Open my account' : 'Open login page'} onClick={(event) => handleNavLinkClick(event, isAuthenticated ? '#account' : '#login')}>
              <Icon name="user" className="icon-button__icon" />
            </button>
            <button type="button" className="icon-button icon-button--wishlist" aria-label="Open wishlist" onClick={(event) => handleNavLinkClick(event, '#wishlist')}>
              <Icon name="heart" className="icon-button__icon" />
              {wishlistCount > 0 ? <span className="icon-button__badge" aria-hidden="true">{wishlistCount}</span> : null}
            </button>
            <button
              type="button"
              className="icon-button icon-button--cart"
              aria-label="Shopping cart"
              onClick={(event) => handleNavLinkClick(event, '#cart')}
            >
              <Icon name="cart" className="icon-button__icon" />
              {cartItemCount > 0 ? (
                <span className="icon-button__badge" aria-hidden="true">
                  {cartItemCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="site-header__mobile">
          <div className="site-header__mobile-start">
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={toggleMenu}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} className="menu-toggle__icon" />
            </button>
          </div>

          <a
            className="brand-mark brand-mark--mobile"
            href="#home"
            aria-label="Ayush Kursela home"
            onClick={(event) => handleNavLinkClick(event, '#home')}
          >
            <img src="/ayush/logo-navbar-clean.png" alt="Ayush Kursela logo" />
          </a>

          <div className="site-header__actions site-header__actions--mobile">
            <button
              type="button"
              className={['icon-button', mobileSearchOpen ? 'is-active' : '']
                .filter(Boolean)
                .join(' ')}
              aria-expanded={mobileSearchOpen}
              aria-controls="mobile-search-panel"
              aria-label={mobileSearchOpen ? 'Close product search' : 'Open product search'}
              onClick={toggleMobileSearch}
            >
              <Icon name="search" className="icon-button__icon" />
            </button>
            <button type="button" className="icon-button" aria-label={isAuthenticated ? 'Open my account' : 'Open login page'} onClick={(event) => handleNavLinkClick(event, isAuthenticated ? '#account' : '#login')}>
              <Icon name="user" className="icon-button__icon" />
            </button>
            <button type="button" className="icon-button icon-button--wishlist" aria-label="Open wishlist" onClick={(event) => handleNavLinkClick(event, '#wishlist')}>
              <Icon name="heart" className="icon-button__icon" />
              {wishlistCount > 0 ? <span className="icon-button__badge" aria-hidden="true">{wishlistCount}</span> : null}
            </button>
            <button
              type="button"
              className="icon-button icon-button--cart"
              aria-label="Shopping cart"
              onClick={(event) => handleNavLinkClick(event, '#cart')}
            >
              <Icon name="cart" className="icon-button__icon" />
              {cartItemCount > 0 ? (
                <span className="icon-button__badge" aria-hidden="true">
                  {cartItemCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div
          className={['site-header__mobile-search', mobileSearchOpen ? 'is-open' : '']
            .filter(Boolean)
            .join(' ')}
          id="mobile-search-panel"
        >
          <form className="site-search site-search--mobile" role="search" onSubmit={handleSearchSubmit}>
            <input
              ref={mobileSearchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
            <button
              type="submit"
              className="site-search__button"
              aria-label="Submit product search"
            >
              <Icon name="search" className="site-search__icon" />
            </button>
          </form>
        </div>

        <div
          className={['site-header__panel', menuOpen ? 'is-open' : '']
            .filter(Boolean)
            .join(' ')}
          id="site-navigation"
        >
          <nav className="site-nav site-nav--mobile" aria-label="Mobile primary">
            {menuLinks.map((item) => item.href === '#products' ? (
              <div className={['mobile-products-menu', mobileProductsOpen ? 'is-open' : ''].filter(Boolean).join(' ')} key={item.label}>
                <button type="button" className={displayedActiveHref === item.href ? 'is-active' : ''} aria-expanded={mobileProductsOpen} aria-controls="mobile-product-types" onClick={() => setMobileProductsOpen((value) => !value)}>
                  <span>{item.label}</span><Icon name="chevron-right" />
                </button>
                <div className="mobile-products-menu__list" id="mobile-product-types">
                  <a href="#products" onClick={(event) => handleNavLinkClick(event, '#products')}>All Products</a>
                  {productCatalog.map((product) => <a key={`mobile-menu-${product.id}`} href={`#products?product=${product.id}`} onClick={(event) => handleNavLinkClick(event, `#products?product=${product.id}`)}>{product.name.replace('Ayush ', '')}</a>)}
                </div>
              </div>
            ) : (
              <a key={item.label} className={displayedActiveHref === item.href ? 'is-active' : ''} href={item.href} aria-current={displayedActiveHref === item.href ? 'page' : undefined} onClick={(event) => handleNavLinkClick(event, item.href)}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

function HeroBanner() {
  return (
    <Reveal as="section" className="hero-section" id="home">
      <div className="shell-content shell-content--wide">
        <div className="hero-frame">
          <img
            src="/ayush/hero-packshot.png"
            alt="Kursela Dalmot premium hero banner with product pack and namkeen bowl"
            className="full-bleed-image hero-frame__desktop-banner"
          />
          <video
            className="hero-frame__mobile-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Ayush Kursela home banner"
          >
            <source src="/ayush/home-mobile-banner.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </Reveal>
  )
}

function AboutIntroSection() {
  return (
    <Reveal as="section" className="about-page__section about-page__intro" id="about">
      <div className="shell-content shell-content--wide">
        <div className="about-page__frame about-page__frame--intro">
          <img
            src="/ayush/about-intro-composite.png"
            alt="About Us introduction section with legacy message, brand story, and company highlights"
            className="about-page__image"
            loading="eager"
          />
        </div>
      </div>
    </Reveal>
  )
}

function AboutProductRangeSection({ onAddToCart, onBuyNow, onShareProduct }) {
  return (
    <div className="about-page__product-range">
      <div className="about-page__product-range-heading">
        <p className="sr-only">Our Product Range</p>
        <h2 className="sr-only">Something for Every Craving</h2>
        <img
          src="/ayush/about-product-range-heading.png"
          alt=""
          aria-hidden="true"
          className="about-page__product-range-heading-image"
          loading="lazy"
        />
      </div>

      <ProductCarousel
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onShareProduct={onShareProduct}
      />
    </div>
  )
}

function AboutChooseSection({ onAddToCart, onBuyNow, onShareProduct }) {
  return (
    <Reveal as="section" className="about-page__section about-page__choose">
      <div className="shell-content shell-content--wide">
        <div className="about-page__choose-stack">
          <div className="about-page__frame about-page__frame--choose">
            <img
              src="/ayush/about-choose-top.png"
              alt="Why Choose Us section featuring quality promises and facilities"
              className="about-page__image"
              loading="lazy"
            />
          </div>

          <AboutProductRangeSection
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            onShareProduct={onShareProduct}
          />
        </div>
      </div>
    </Reveal>
  )
}

function AboutPage({ onAddToCart, onBuyNow, onShareProduct }) {
  return (
    <main className="about-page">
      <AboutIntroSection />
      <AboutChooseSection
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onShareProduct={onShareProduct}
      />
    </main>
  )
}

function validateContactFormValues(values) {
  const errors = {}

  if (!values.firstName.trim()) {
    errors.firstName = 'Please enter your first name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.phone.trim() && !/^[+\d\s()-]{8,}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please share your message.'
  }

  return errors
}

function ContactInfoCard({ body, children, href, icon, label, note, title }) {
  const CardTitle = href ? 'a' : 'p'
  const titleProps = href ? { href } : {}

  return (
    <article className="contact-card">
      <span className="contact-card__icon">
        <Icon name={icon} className="stroke-icon" />
      </span>

      <div className="contact-card__content">
        <p className="contact-card__label">{label}</p>
        <CardTitle className="contact-card__title" {...titleProps}>
          {title}
        </CardTitle>
        {body ? <p className="contact-card__body">{body}</p> : null}
        {note ? <p className="contact-card__note">{note}</p> : null}
        {children}
      </div>
    </article>
  )
}

function ContactFaqItem({ isOpen, item, onToggle }) {
  return (
    <article className={['contact-faq', isOpen ? 'is-open' : ''].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="contact-faq__toggle"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="contact-faq__question">{item.question}</span>
        <span className="contact-faq__chevron" aria-hidden="true">
          <Icon name="chevron-right" className="contact-faq__chevron-icon" />
        </span>
      </button>

      <div className="contact-faq__answer-wrap">
        <div className="contact-faq__answer">
          <p>{item.answer}</p>
        </div>
      </div>
    </article>
  )
}

function ContactPage() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitState, setSubmitState] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(contactFaqItems[0]?.id ?? null)

  const handleFieldChange = (field) => (event) => {
    const nextValue = event.target.value

    setFormValues((current) => ({
      ...current,
      [field]: nextValue,
    }))

    setFormErrors((current) => {
      if (!current[field]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })

    if (submitState.type !== 'idle') {
      setSubmitState({ type: 'idle', message: '' })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validateContactFormValues(formValues)

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors)
      setSubmitState({
        type: 'error',
        message: 'Please review the highlighted fields and try again.',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitState({ type: 'idle', message: '' })

    await new Promise((resolve) => window.setTimeout(resolve, 650))

    setIsSubmitting(false)
    setFormValues({
      firstName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
    setFormErrors({})
    setSubmitState({
      type: 'success',
      message: 'Thanks for reaching out. Our team will get back to you shortly.',
    })
  }

  return (
    <main className="contact-page">
      <Reveal as="section" className="contact-page__hero" id="contact">
        <div className="shell-content shell-content--wide">
          <div className="contact-page__hero-shell">
            <div className="sr-only">
              <p>Get In Touch</p>
              <h1>Contact Us</h1>
              <p>We&apos;d love to hear from you!</p>
              <p>
                Whether you have a question about our products, partnerships, or
                anything else, our team is ready to answer all your queries.
              </p>
              <ul>
                {contactHeroItems.map((item) => (
                  <li key={item.label}>{item.label}</li>
                ))}
              </ul>
            </div>
            <img
              src="/ayush/contact-hero-banner.png"
              alt=""
              className="contact-page__hero-banner"
              loading="eager"
              aria-hidden="true"
            />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="contact-page__message-section">
        <div className="shell-content contact-page__content-wrap">
          <div className="contact-page__message-shell">
            <img
              src="/ayush/contact-message-stage.png"
              alt=""
              className="contact-page__stage-art"
              aria-hidden="true"
            />
            <div className="contact-page__message-grid">
              <div className="contact-page__help-column">
                <div className="contact-page__section-heading">
                  <p className="contact-page__section-label">Get In Touch</p>
                  <h2>We&apos;re Here to Help</h2>
                  <div className="contact-page__section-divider" aria-hidden="true" />
                </div>

                <div className="contact-page__help-cards">
                  <ContactInfoCard
                    icon="phone"
                    label="Phone"
                    title={footerContactInfo.phone}
                    note="Friendly support available during business hours"
                    body={footerContactInfo.phoneNote}
                    href="tel:+911234567890"
                  />

                  <ContactInfoCard
                    icon="mail"
                    label="Email"
                    title={footerContactInfo.email}
                    note={footerContactInfo.emailNote}
                    body="Share product, retail or partnership queries anytime."
                    href={`mailto:${footerContactInfo.email}`}
                  />

                  <ContactInfoCard
                    icon="pin"
                    label="Address"
                    title={footerContactInfo.addressTitle}
                    body={footerContactInfo.addressBody}
                    note="Visit us or connect for retailer and wholesale assistance."
                    href={contactMapHref}
                  />

                  <ContactInfoCard
                    icon="heart"
                    label="Follow Us"
                    title="Join our growing snack-loving community"
                    note="Stay updated on launches, offers and everyday moments from Ayush Kursela."
                  >
                    <div className="contact-card__socials" aria-label="Social media links">
                      {socialLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="contact-card__social"
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                        >
                          <img src={item.icon} alt="" loading="lazy" />
                        </a>
                      ))}
                    </div>
                  </ContactInfoCard>
                </div>
              </div>

              <div className="contact-page__form-column">
                <div className="contact-page__section-heading contact-page__section-heading--form">
                  <p className="contact-page__section-label">Send Us A Message</p>
                  <h2>Message Us</h2>
                  <p className="contact-page__section-copy">
                    Tell us what you need and the right Ayush Kursela team member will
                    respond with the next steps.
                  </p>
                  <div className="contact-page__section-divider" aria-hidden="true" />
                </div>

                <form className="contact-form" noValidate onSubmit={handleSubmit}>
                  <div className="contact-form__grid">
                    <label className="contact-form__field">
                      <span>First Name <strong aria-hidden="true">*</strong></span>
                      <input
                        type="text"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleFieldChange('firstName')}
                        aria-invalid={Boolean(formErrors.firstName)}
                        placeholder="Your first name"
                      />
                      {formErrors.firstName ? (
                        <span className="contact-form__error">{formErrors.firstName}</span>
                      ) : null}
                    </label>

                    <label className="contact-form__field">
                      <span>Your Email <strong aria-hidden="true">*</strong></span>
                      <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleFieldChange('email')}
                        aria-invalid={Boolean(formErrors.email)}
                        placeholder="name@example.com"
                      />
                      {formErrors.email ? (
                        <span className="contact-form__error">{formErrors.email}</span>
                      ) : null}
                    </label>

                    <label className="contact-form__field">
                      <span>Phone Number</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleFieldChange('phone')}
                        aria-invalid={Boolean(formErrors.phone)}
                        placeholder="Optional"
                      />
                      {formErrors.phone ? (
                        <span className="contact-form__error">{formErrors.phone}</span>
                      ) : null}
                    </label>

                    <label className="contact-form__field">
                      <span>Subject</span>
                      <input
                        type="text"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleFieldChange('subject')}
                        placeholder="How can we help?"
                      />
                    </label>

                    <label className="contact-form__field contact-form__field--full">
                      <span>Your Message <strong aria-hidden="true">*</strong></span>
                      <textarea
                        name="message"
                        value={formValues.message}
                        onChange={handleFieldChange('message')}
                        aria-invalid={Boolean(formErrors.message)}
                        placeholder="Tell us about your question, order requirement or partnership enquiry."
                      />
                      {formErrors.message ? (
                        <span className="contact-form__error">{formErrors.message}</span>
                      ) : null}
                    </label>
                  </div>

                  <div className="contact-form__actions">
                    <button type="submit" className="contact-form__submit" disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Icon name="send" className="contact-form__submit-icon" />
                    </button>

                    {submitState.type !== 'idle' ? (
                      <p
                        className={[
                          'contact-form__status',
                          submitState.type === 'success'
                            ? 'is-success'
                            : 'is-error',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        role="status"
                      >
                        {submitState.message}
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="contact-page__location-section">
        <div className="shell-content">
          <div className="contact-store-locator">
            <article className="contact-store-locator__details">
              <div className="contact-store-locator__eyebrow">
                <span className="contact-store-locator__eyebrow-icon">
                  <Icon name="pin" />
                </span>
                <span>Our Store Location</span>
              </div>

              <h2>Find Us <span>Here</span></h2>
              <p className="contact-store-locator__intro">
                We're easy to find! Visit our store for the best quality products and warm service.
              </p>

              <a
                className="contact-store-locator__featured-address"
                href={contactMapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the Ayush Kursela store address in Google Maps"
              >
                <Icon name="pin" />
                <span>
                  <strong>{footerContactInfo.addressTitle}</strong>
                  <small>{footerContactInfo.addressBody}</small>
                </span>
              </a>

              <div className="contact-store-locator__info-list">
                <div className="contact-store-locator__info-row">
                  <span className="contact-store-locator__info-icon"><Icon name="store" /></span>
                  <div>
                    <strong>Store Address</strong>
                    <p>{footerContactInfo.addressTitle},<br />{footerContactInfo.addressBody}</p>
                  </div>
                </div>
                <div className="contact-store-locator__info-row">
                  <span className="contact-store-locator__info-icon"><Icon name="clock" /></span>
                  <div>
                    <strong>Store Timing</strong>
                    <p>{footerContactInfo.phoneNote}</p>
                  </div>
                </div>
                <div className="contact-store-locator__info-row">
                  <span className="contact-store-locator__info-icon"><Icon name="phone" /></span>
                  <div>
                    <strong>Contact Us</strong>
                    <p>{footerContactInfo.phone}</p>
                  </div>
                </div>
              </div>

              <a
                className="contact-store-locator__primary-link"
                href={contactMapHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span><Icon name="send" />Tap to Open in Maps</span>
                <Icon name="chevron-right" />
              </a>
            </article>

            <div className="contact-store-locator__map">
              <iframe
                src={contactMapEmbedHref}
                title="Ayush Kursela store location on Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <a
                className="contact-store-locator__map-address"
                href={contactMapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open store address in Google Maps"
              >
                <Icon name="pin" />
                <span>
                  <strong>{footerContactInfo.addressTitle}</strong>
                  <small>{footerContactInfo.addressBody}</small>
                </span>
              </a>

              <a
                className="contact-store-locator__map-link"
                href={contactMapHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="send" />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="contact-page__faq-section">
        <div className="shell-content">
          <div className="contact-page__faq-heading">
            <p className="contact-page__section-label">FAQs</p>
            <h2>Frequently Asked Questions</h2>
            <div className="contact-page__section-divider" aria-hidden="true" />
          </div>

          <div className="contact-page__faq-list">
            {contactFaqItems.map((item) => (
              <ContactFaqItem
                key={item.id}
                item={item}
                isOpen={openFaqId === item.id}
                onToggle={() =>
                  setOpenFaqId((current) => (current === item.id ? null : item.id))
                }
              />
            ))}
          </div>
        </div>
      </Reveal>
    </main>
  )
}

function GoogleMark() {
  return (
    <svg className="login-page__google-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.7h3.3c1.9-1.8 2.9-4.4 2.9-7.7Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.3l-3.3-2.6c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.7A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.5 14a6 6 0 0 1 0-3.9V7.3H3.1a10 10 0 0 0 0 9.4L6.5 14Z" />
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.9.5 3.9 1.5l2.9-2.9A9.8 9.8 0 0 0 3.1 7.3l3.4 2.8A5.9 5.9 0 0 1 12 5.9Z" />
    </svg>
  )
}

function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!identifier.trim() || !password) {
      setMessage('Please enter your email/mobile number and password.')
      return
    }

    setMessage('')
    setIsSubmitting(true)
    window.setTimeout(() => {
      const existingAccount = readStoredAccount()
      const account = existingAccount ?? {
        name: identifier.includes('@') ? identifier.split('@')[0].replace(/[._-]/g, ' ') : 'Ayush Customer',
        email: identifier.includes('@') ? identifier : 'customer@ayushkursela.com',
        mobile: identifier.includes('@') ? '+91 91234 56789' : identifier,
      }
      onLogin(account)
      setIsSubmitting(false)
      window.location.hash = '#account'
    }, 450)
  }

  const handleUnavailableAction = () => {
    setMessage('This authentication option is not connected yet.')
  }

  return (
    <main className="login-page" id="login">
      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title">Login</h1>
        <div className="login-card__ornament" aria-hidden="true"><span /></div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="login-field">
            <span className="sr-only">Email or mobile number</span>
            <Icon name="user" className="login-field__icon" />
            <input
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(event) => { setIdentifier(event.target.value); setMessage('') }}
              placeholder="Email / Mobile Number"
            />
          </label>

          <label className="login-field">
            <span className="sr-only">Password</span>
            <Icon name="lock" className="login-field__icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => { setPassword(event.target.value); setMessage('') }}
              placeholder="Password"
            />
            <button type="button" className="login-field__visibility" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} />
            </button>
          </label>

          <button type="button" className="login-form__forgot" onClick={handleUnavailableAction}>Forgot Password?</button>

          {message ? <p className="login-form__message" role="status">{message}</p> : null}

          <button type="submit" className="login-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-form__divider" aria-hidden="true"><span>OR</span></div>

          <button type="button" className="login-form__google" onClick={handleUnavailableAction}>
            <GoogleMark />
            <span>Login with Google</span>
          </button>

          <p className="login-form__signup">
            Don&apos;t have an account?{' '}
            <button type="button" onClick={() => { window.location.hash = '#register' }}>Sign up</button>
          </p>
        </form>
      </section>
    </main>
  )
}

function RegisterPage({ onRegister }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setMessage('Please complete all registration fields.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    onRegister({ name: fullName.trim(), email: email.trim(), mobile: '+91 91234 56789' })
    window.location.hash = '#account'
  }

  const handleUnavailableAction = () => setMessage('This authentication option is not connected yet.')

  return (
    <main className="login-page register-page" id="register">
      <section className="login-card register-card" aria-labelledby="register-title">
        <h1 id="register-title">Register</h1>
        <div className="login-card__ornament" aria-hidden="true"><span /></div>

        <form className="login-form register-form" onSubmit={handleSubmit} noValidate>
          <label className="login-field">
            <span className="sr-only">Full name</span>
            <Icon name="user" className="login-field__icon" />
            <input type="text" autoComplete="name" value={fullName} onChange={(event) => { setFullName(event.target.value); setMessage('') }} placeholder="Full Name" />
          </label>

          <label className="login-field">
            <span className="sr-only">Email address</span>
            <Icon name="mail" className="login-field__icon" />
            <input type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setMessage('') }} placeholder="Email Address" />
          </label>

          <label className="login-field">
            <span className="sr-only">Password</span>
            <Icon name="lock" className="login-field__icon" />
            <input type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => { setPassword(event.target.value); setMessage('') }} placeholder="Password" />
            <button type="button" className="login-field__visibility" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}><Icon name={showPassword ? 'eye-off' : 'eye'} /></button>
          </label>

          <label className="login-field">
            <span className="sr-only">Confirm password</span>
            <Icon name="lock" className="login-field__icon" />
            <input type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value); setMessage('') }} placeholder="Confirm Password" />
            <button type="button" className="login-field__visibility" onClick={() => setShowConfirmPassword((value) => !value)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}><Icon name={showConfirmPassword ? 'eye-off' : 'eye'} /></button>
          </label>

          {message ? <p className="login-form__message" role="status">{message}</p> : null}

          <button type="submit" className="login-form__submit">Register</button>

          <div className="login-form__divider" aria-hidden="true"><span>OR</span></div>

          <button type="button" className="login-form__google" onClick={handleUnavailableAction}>
            <GoogleMark />
            <span>Register with Google</span>
          </button>

          <p className="login-form__signup">
            Already have an account?{' '}
            <button type="button" onClick={() => { window.location.hash = '#login' }}>Login</button>
          </p>
        </form>
      </section>
    </main>
  )
}

function OrderProgress({ status }) {
  const isShipped = status === 'Shipped'
  const stages = [
    { label: 'Ordered', date: isShipped ? '10 May' : '12 May', icon: 'bag', state: 'done' },
    { label: 'Packed', date: isShipped ? '11 May' : '13 May', icon: 'package', state: isShipped ? 'done' : 'current' },
    { label: 'Shipped', date: isShipped ? '12 May' : '—', icon: 'truck', state: isShipped ? 'current' : 'pending' },
    { label: 'Delivered', date: '—', icon: 'shield', state: 'pending' },
  ]

  return (
    <div className="account-order__tracking">
      <span className={['account-order__label', isShipped ? 'account-order__label--shipped' : ''].filter(Boolean).join(' ')}>{status}</span>
      <ol>
        {stages.map((stage) => (
          <li key={stage.label} className={`is-${stage.state}`}>
            <span className="account-order__stage-icon"><Icon name={stage.icon} /></span>
            <strong>{stage.label}</strong>
            <small>{stage.date}</small>
          </li>
        ))}
      </ol>
    </div>
  )
}

function AccountPage({ user, onLogout, onAddToCart, onBuyNow, onUpdateAccount }) {
  const [activePanel, setActivePanel] = useState('orders')
  const [notice, setNotice] = useState('')
  const [settingsView, setSettingsView] = useState('menu')
  const [profileDraft, setProfileDraft] = useState({ name: user.name, dob: user.dob || '', gender: user.gender || '' })
  const [contactDraft, setContactDraft] = useState({ email: user.email, mobile: user.mobile || '' })
  const [passwordDraft, setPasswordDraft] = useState({ current: '', next: '', confirm: '' })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(Boolean(user.twoFactorEnabled))
  const [addresses, setAddresses] = useState(readStoredAddresses)
  const [addressEditor, setAddressEditor] = useState(null)
  const [supportView, setSupportView] = useState('menu')
  const [openFaq, setOpenFaq] = useState(null)
  const [supportDraft, setSupportDraft] = useState({ subject: '', message: '' })
  const [returnDraft, setReturnDraft] = useState({ orderNumber: '', reason: '', details: '' })
  const initials = user.name.split(' ').map((name) => name[0]).join('').slice(0, 2).toUpperCase()
  const accountItems = [
    { id: 'orders', icon: 'bag', title: 'My Orders', description: 'View orders, order details and tracking.' },
    { id: 'addresses', icon: 'pin', title: 'Saved Addresses', description: 'Manage delivery addresses and defaults.' },
    { id: 'wishlist', icon: 'heart', title: 'Wishlist', description: 'See your saved product favourites.' },
    { id: 'settings', icon: 'user', title: 'Account Settings', description: 'Update your personal information and password.' },
    { id: 'support', icon: 'mail', title: 'Help & Support', description: 'Contact, FAQ and returns assistance.' },
  ]
  const showNotice = (text) => setNotice(text)
  const openSettingsView = (view) => { setActivePanel('settings'); setSettingsView(view); setNotice('') }
  const saveProfile = (event) => {
    event.preventDefault()
    if (!profileDraft.name.trim()) return showNotice('Name is required.')
    onUpdateAccount({ ...user, ...profileDraft, name: profileDraft.name.trim() })
    setSettingsView('menu')
    showNotice('Personal information updated successfully.')
  }
  const saveContact = (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(contactDraft.email)) return showNotice('Enter a valid email address.')
    if (!/^[+\d][\d\s-]{8,}$/.test(contactDraft.mobile)) return showNotice('Enter a valid mobile number.')
    onUpdateAccount({ ...user, email: contactDraft.email.trim(), mobile: contactDraft.mobile.trim() })
    setSettingsView('menu')
    showNotice('Email and mobile number updated successfully.')
  }
  const savePassword = (event) => {
    event.preventDefault()
    if (!passwordDraft.current) return showNotice('Enter your current password.')
    if (passwordDraft.next.length < 8) return showNotice('New password must contain at least 8 characters.')
    if (passwordDraft.next !== passwordDraft.confirm) return showNotice('New passwords do not match.')
    setPasswordDraft({ current: '', next: '', confirm: '' })
    setSettingsView('menu')
    showNotice('Password changed successfully.')
  }
  const toggleTwoFactor = () => {
    const nextValue = !twoFactorEnabled
    setTwoFactorEnabled(nextValue)
    onUpdateAccount({ ...user, twoFactorEnabled: nextValue })
    showNotice(`Two-factor authentication ${nextValue ? 'enabled' : 'disabled'}.`)
  }
  useEffect(() => {
    window.localStorage.setItem(addressStorageKey, JSON.stringify(addresses))
  }, [addresses])
  const openAddressEditor = (address = null) => setAddressEditor({
    id: address?.id || `address-${Date.now()}`,
    label: address?.label || '',
    addressLine: address?.addressLine || '',
    cityLine: address?.cityLine || '',
    phone: address?.phone || '',
    isDefault: address?.isDefault || addresses.length === 0,
    icon: address?.icon || 'home',
  })
  const saveAddress = (event) => {
    event.preventDefault()
    if (!addressEditor.label.trim() || !addressEditor.addressLine.trim() || !addressEditor.cityLine.trim() || !addressEditor.phone.trim()) return showNotice('Please complete all address fields.')
    setAddresses((current) => {
      const exists = current.some((address) => address.id === addressEditor.id)
      const next = exists ? current.map((address) => address.id === addressEditor.id ? addressEditor : address) : [...current, addressEditor]
      return addressEditor.isDefault ? next.map((address) => ({ ...address, isDefault: address.id === addressEditor.id })) : next
    })
    setAddressEditor(null)
    showNotice('Address saved successfully.')
  }
  const deleteAddress = (id) => {
    setAddresses((current) => {
      const remaining = current.filter((address) => address.id !== id)
      return remaining.some((address) => address.isDefault) || remaining.length === 0 ? remaining : remaining.map((address, index) => ({ ...address, isDefault: index === 0 }))
    })
    setAddressEditor(null)
    showNotice('Address deleted successfully.')
  }
  const setDefaultAddress = (id) => {
    setAddresses((current) => current.map((address) => ({ ...address, isDefault: address.id === id })))
    showNotice('Default delivery address updated.')
  }
  const submitSupportTicket = (event) => {
    event.preventDefault()
    if (!supportDraft.subject.trim() || !supportDraft.message.trim()) return showNotice('Please enter a subject and message.')
    setSupportDraft({ subject: '', message: '' })
    setSupportView('menu')
    showNotice(`Support ticket #AKS-${String(Date.now()).slice(-6)} submitted successfully.`)
  }
  const submitReturnRequest = (event) => {
    event.preventDefault()
    if (!returnDraft.orderNumber.trim() || !returnDraft.reason || !returnDraft.details.trim()) return showNotice('Please complete all return/refund fields.')
    setReturnDraft({ orderNumber: '', reason: '', details: '' })
    setSupportView('menu')
    showNotice(`Return/refund request for ${returnDraft.orderNumber.trim()} submitted successfully.`)
  }
  const supportFaqs = [
    ['How can I track my order?', 'Open My Orders and select Track Order to view the latest delivery status.'],
    ['Can I change my delivery address?', 'You can edit an address before dispatch from Saved Addresses. For an active order, contact support.'],
    ['How do returns and refunds work?', 'Submit the Return / Refund form with your order number. Our team will review it and respond within 24 hours.'],
    ['How long does delivery take?', 'Most orders arrive within 3–7 business days, depending on your delivery location.'],
  ]

  return (
    <main className="account-page" id="account">
      <div className="shell-content account-page__inner">
        <section className="account-profile" aria-labelledby="account-title">
          <div className="account-profile__avatar" aria-hidden="true">{initials}</div>
          <div className="account-profile__details">
            <p className="account-page__eyebrow">MY ACCOUNT</p>
            <div className="account-profile__name-row"><h1 id="account-title">{user.name}</h1></div>
            <p>{user.email}</p>
            <p>{user.mobile || '+91 91234 56789'}</p>
          </div>
          <button type="button" className="account-button account-button--secondary" onClick={() => openSettingsView('profile')}>Edit Profile</button>
        </section>

        <div className="account-layout">
          <nav className="account-nav" aria-label="Account options">
            <div className="account-nav__heading">
              <p>MY ACCOUNT</p>
              <span aria-hidden="true">— ◉ —</span>
            </div>
            {accountItems.map((item) => (
              <button key={item.id} type="button" className={activePanel === item.id ? 'is-active' : ''} onClick={() => { setActivePanel(item.id); setNotice('') }}>
                <Icon name={item.icon} />
                <span><strong>{item.title}</strong><small>{item.description}</small></span>
                <Icon name="chevron-right" />
              </button>
            ))}
            <button type="button" className="account-nav__logout" onClick={onLogout}>
              <Icon name="logout" />
              <span><strong>Logout</strong><small>Sign out from your account</small></span>
            </button>
          </nav>

          <section className="account-panel" aria-live="polite">
            {activePanel === 'orders' ? <>
              <h2>My Orders</h2><p className="account-panel__intro">Track your recent purchases and delivery status.</p>
              <div className="account-summary" aria-label="Order summary">
                <button type="button" onClick={() => showNotice('All order history opened.')}><Icon name="bag" /><span><strong>12</strong><small>All Orders</small></span></button>
                <button type="button" onClick={() => showNotice('Processing orders opened.')}><Icon name="clock" /><span><strong>03</strong><small>Processing</small></span></button>
                <button type="button" onClick={() => showNotice('Shipped orders opened.')}><Icon name="truck" /><span><strong>04</strong><small>Shipped</small></span></button>
                <button type="button" onClick={() => showNotice('Delivered orders opened.')}><Icon name="shield" /><span><strong>05</strong><small>Delivered</small></span></button>
              </div>
              <article className="account-order account-order--detailed">
                <img src="/ayush/product-sattu.png" alt="Ayush Sattu order" />
                <div className="account-order__product"><strong>Order #AK-10248</strong><p>Ayush Kursela Mixture · 2110</p><small>1L Glass Jar</small><b>₹899</b></div>
                <div className="account-order__meta"><div className="account-order__meta-item"><span className="account-order__meta-icon"><Icon name="calendar" /></span><span><strong>12 May 2025</strong><small>Order Date</small></span></div><div className="account-order__meta-item"><span className="account-order__meta-icon account-order__meta-icon--rupee">₹</span><span><strong>₹899</strong><small>Total Amount</small></span></div></div>
                <OrderProgress status="Processing" />
                <button type="button" className="account-order__button" onClick={() => showNotice('Order #AK-10248 details opened.')}>View Details</button>
              </article>
              <article className="account-order account-order--detailed">
                <img src="/ayush/product-katarr-matar.png" alt="Ayush Katarr Matar order" />
                <div className="account-order__product"><strong>Order #AK-10247</strong><p>Ayush Katarr Matar</p><small>500g</small><b>₹60</b></div>
                <div className="account-order__meta"><div className="account-order__meta-item"><span className="account-order__meta-icon"><Icon name="calendar" /></span><span><strong>10 May 2025</strong><small>Order Date</small></span></div><div className="account-order__meta-item"><span className="account-order__meta-icon account-order__meta-icon--rupee">₹</span><span><strong>₹120</strong><small>Total Amount</small></span></div></div>
                <OrderProgress status="Shipped" />
                <button type="button" className="account-order__button" onClick={() => showNotice('Tracking for Order #AK-10247 opened.')}>Track Order</button>
              </article>
              <div className="account-statuses"><span>Processing</span><span>Shipped</span><span>Delivered</span><span>Cancelled</span></div>
            </> : null}
            {activePanel === 'addresses' ? <>
              <div className="account-panel__title-row"><div><h2>Saved Addresses</h2><p className="account-panel__intro">Manage your saved delivery addresses.</p></div><button type="button" className="account-button" onClick={() => openAddressEditor()}>＋&nbsp; Add New Address</button></div>
              {addressEditor ? <form className="account-edit-form account-address-form" onSubmit={saveAddress}>
                <h3>{addresses.some((address) => address.id === addressEditor.id) ? 'Edit Address' : 'Add New Address'}</h3>
                <div className="account-edit-form__grid"><label>Address Label<input value={addressEditor.label} onChange={(event) => setAddressEditor({ ...addressEditor, label: event.target.value })} placeholder="Home, Office…" /></label><label>Phone Number<input type="tel" value={addressEditor.phone} onChange={(event) => setAddressEditor({ ...addressEditor, phone: event.target.value })} /></label></div>
                <label>Street / Building<input value={addressEditor.addressLine} onChange={(event) => setAddressEditor({ ...addressEditor, addressLine: event.target.value })} /></label>
                <label>City, State and PIN Code<input value={addressEditor.cityLine} onChange={(event) => setAddressEditor({ ...addressEditor, cityLine: event.target.value })} /></label>
                <label className="account-edit-form__checkbox"><input type="checkbox" checked={addressEditor.isDefault} onChange={(event) => setAddressEditor({ ...addressEditor, isDefault: event.target.checked })} /> Use as default delivery address</label>
                <div className="account-edit-form__actions"><button type="button" onClick={() => setAddressEditor(null)}>Cancel</button><button type="submit">Save Address</button></div>
              </form> : null}
              {addresses.map((address) => <article key={address.id} className="account-address account-address--detailed"><div className="account-address__icon"><Icon name={address.icon} /></div><div className="account-address__content"><strong>{address.label} {address.isDefault ? <em>Default</em> : null}</strong><p>{address.addressLine}<br />{address.cityLine}<br />{address.phone}</p></div><button type="button" className="account-address__more" aria-label={`${address.label} address options`} onClick={() => openAddressEditor(address)}><Icon name="more" /></button><div className="account-address__actions"><button type="button" onClick={() => openAddressEditor(address)}><Icon name="edit" /> Edit</button><button type="button" className="is-delete" onClick={() => deleteAddress(address.id)}><Icon name="trash" /> Delete</button><button type="button" className="is-default" disabled={address.isDefault} onClick={() => setDefaultAddress(address.id)}>{address.isDefault ? '✓ Default Address' : 'Set as Default'}</button></div></article>)}
              {addresses.length === 0 ? <p className="account-panel__empty">No saved addresses yet. Add your first delivery address.</p> : null}
              <p className="account-address__note">✓&nbsp; Your default address will be used for all deliveries.</p>
            </> : null}
            {activePanel === 'wishlist' ? <>
              <h2>Wishlist</h2><p className="account-panel__intro">Your saved favourites, ready whenever you are.</p>
              <article className="account-wishlist"><img src="/ayush/product-katarr-matar.png" alt="Katarr Matar" /><div><strong>Katarr Matar</strong><p>150g · ₹25</p></div><div className="account-panel__actions"><button type="button" onClick={() => { onAddToCart(productCatalog.find((product) => product.id.includes('katarr')) ?? productCatalog[0]); showNotice('Katarr Matar added to cart.') }}>Add to Cart</button><button type="button" onClick={() => { onBuyNow(); showNotice('Checkout is ready from your cart.') }}>Buy Now</button></div></article>
            </> : null}
            {activePanel === 'settings' ? <>
              <h2>Account Settings</h2><p className="account-panel__intro">Keep your account details and password secure.</p>
              {settingsView === 'menu' ? <div className="account-settings account-settings--detailed">
                <button type="button" onClick={() => openSettingsView('profile')}><span><Icon name="user" /></span><span><strong>Edit Personal Information</strong><small>Update your name, date of birth and other details.</small></span><Icon name="chevron-right" /></button>
                <button type="button" onClick={() => openSettingsView('contact')}><span><Icon name="mail" /></span><span><strong>Update Email / Mobile</strong><small>Update your email address and mobile number.</small></span><Icon name="chevron-right" /></button>
                <button type="button" onClick={() => openSettingsView('password')}><span><Icon name="lock" /></span><span><strong>Change Password</strong><small>Choose a strong password to keep your account secure.</small></span><Icon name="chevron-right" /></button>
                <button type="button" onClick={toggleTwoFactor}><span><Icon name="shield" /></span><span><strong>Two-Factor Authentication</strong><small>Add an extra layer of security to your account.</small></span><em>{twoFactorEnabled ? 'Active' : 'Inactive'}</em><Icon name="chevron-right" /></button>
              </div> : null}
              {settingsView === 'profile' ? <form className="account-edit-form" onSubmit={saveProfile}>
                <h3>Edit Personal Information</h3>
                <label>Full Name<input value={profileDraft.name} onChange={(event) => setProfileDraft({ ...profileDraft, name: event.target.value })} autoComplete="name" /></label>
                <div className="account-edit-form__grid"><label>Date of Birth<input type="date" value={profileDraft.dob} onChange={(event) => setProfileDraft({ ...profileDraft, dob: event.target.value })} /></label><label>Gender<select value={profileDraft.gender} onChange={(event) => setProfileDraft({ ...profileDraft, gender: event.target.value })}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></label></div>
                <div className="account-edit-form__actions"><button type="button" onClick={() => setSettingsView('menu')}>Cancel</button><button type="submit">Save Changes</button></div>
              </form> : null}
              {settingsView === 'contact' ? <form className="account-edit-form" onSubmit={saveContact}>
                <h3>Update Email / Mobile</h3>
                <label>Email Address<input type="email" value={contactDraft.email} onChange={(event) => setContactDraft({ ...contactDraft, email: event.target.value })} autoComplete="email" /></label>
                <label>Mobile Number<input type="tel" value={contactDraft.mobile} onChange={(event) => setContactDraft({ ...contactDraft, mobile: event.target.value })} autoComplete="tel" /></label>
                <div className="account-edit-form__actions"><button type="button" onClick={() => setSettingsView('menu')}>Cancel</button><button type="submit">Update Contact</button></div>
              </form> : null}
              {settingsView === 'password' ? <form className="account-edit-form" onSubmit={savePassword}>
                <h3>Change Password</h3>
                <label>Current Password<input type="password" value={passwordDraft.current} onChange={(event) => setPasswordDraft({ ...passwordDraft, current: event.target.value })} autoComplete="current-password" /></label>
                <div className="account-edit-form__grid"><label>New Password<input type="password" value={passwordDraft.next} onChange={(event) => setPasswordDraft({ ...passwordDraft, next: event.target.value })} autoComplete="new-password" /></label><label>Confirm New Password<input type="password" value={passwordDraft.confirm} onChange={(event) => setPasswordDraft({ ...passwordDraft, confirm: event.target.value })} autoComplete="new-password" /></label></div>
                <div className="account-edit-form__actions"><button type="button" onClick={() => setSettingsView('menu')}>Cancel</button><button type="submit">Change Password</button></div>
              </form> : null}
              <aside className="account-security-note"><Icon name="shield" /><span><strong>We never share your personal information</strong><small>Your data is 100% safe and secure with us.</small></span></aside>
            </> : null}
            {activePanel === 'support' ? <>
              <div className="account-panel__title-row"><div><h2>Help &amp; Support</h2><p className="account-panel__intro">Our team is here to help with every order.</p></div>{supportView !== 'menu' ? <button type="button" className="account-button account-button--secondary" onClick={() => { setSupportView('menu'); setNotice('') }}>← Back</button> : null}</div>
              {supportView === 'menu' ? <div className="account-support-links">
                <button type="button" onClick={() => { setSupportView('contact'); setNotice('') }}><span><Icon name="headset" /></span><span><strong>Contact Us</strong><small>Submit a support ticket for any assistance.</small></span><Icon name="chevron-right" /></button>
                <button type="button" onClick={() => { setSupportView('faq'); setNotice('') }}><span><Icon name="chat" /></span><span><strong>FAQ</strong><small>Find answers to frequently asked questions.</small></span><Icon name="chevron-right" /></button>
                <button type="button" onClick={() => { setSupportView('return'); setNotice('') }}><span><Icon name="return" /></span><span><strong>Return / Refund Help</strong><small>Submit your order details to our support team.</small></span><Icon name="chevron-right" /></button>
              </div> : null}
              {supportView === 'contact' ? <form className="account-edit-form account-support-form" onSubmit={submitSupportTicket}>
                <h3>Contact Support</h3>
                <div className="account-edit-form__grid"><label>Your Name<input value={user.name} readOnly /></label><label>Email Address<input value={user.email} readOnly /></label></div>
                <label>Subject<input value={supportDraft.subject} onChange={(event) => setSupportDraft({ ...supportDraft, subject: event.target.value })} placeholder="How can we help?" /></label>
                <label>Message<textarea value={supportDraft.message} onChange={(event) => setSupportDraft({ ...supportDraft, message: event.target.value })} placeholder="Describe your issue in detail" /></label>
                <div className="account-edit-form__actions"><button type="button" onClick={() => setSupportView('menu')}>Cancel</button><button type="submit">Submit Ticket</button></div>
              </form> : null}
              {supportView === 'faq' ? <div className="account-faq-list">{supportFaqs.map(([question, answer], index) => <article key={question} className={openFaq === index ? 'is-open' : ''}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq((current) => current === index ? null : index)}><strong>{question}</strong><span>{openFaq === index ? '−' : '+'}</span></button>{openFaq === index ? <p>{answer}</p> : null}</article>)}</div> : null}
              {supportView === 'return' ? <form className="account-edit-form account-support-form" onSubmit={submitReturnRequest}>
                <h3>Return / Refund Request</h3>
                <div className="account-edit-form__grid"><label>Order Number<input value={returnDraft.orderNumber} onChange={(event) => setReturnDraft({ ...returnDraft, orderNumber: event.target.value })} placeholder="e.g. AK-10248" /></label><label>Reason<select value={returnDraft.reason} onChange={(event) => setReturnDraft({ ...returnDraft, reason: event.target.value })}><option value="">Select a reason</option><option>Damaged product</option><option>Wrong product received</option><option>Missing item</option><option>Quality issue</option><option>Other</option></select></label></div>
                <label>Details<textarea value={returnDraft.details} onChange={(event) => setReturnDraft({ ...returnDraft, details: event.target.value })} placeholder="Tell us what happened" /></label>
                <div className="account-edit-form__actions"><button type="button" onClick={() => setSupportView('menu')}>Cancel</button><button type="submit">Submit Request</button></div>
              </form> : null}
              <aside className="account-support-note"><Icon name="shield" /><span><strong>We are here for you!</strong><small>Your satisfaction is our top priority.</small></span><Icon name="headset" /></aside>
              <div className="account-support-contact">
                <a href="https://wa.me/919123456789?text=Hello%20Ayush%20Kursela%20Support%2C%20I%20need%20help." target="_blank" rel="noreferrer"><Icon name="chat" /><span><strong>Live Chat</strong><small>Chat on WhatsApp<br />9 AM – 9 PM</small></span></a>
                <a href="mailto:support@ayushkursela.com"><Icon name="mail" /><span><strong>Email Support</strong><small>support@ayushkursela.com<br />Response in 24 hrs</small></span></a>
                <a href="tel:+919123456789"><Icon name="phone" /><span><strong>Call Us</strong><small>+91 12345 67890<br />9 AM – 6 PM</small></span></a>
                <span><Icon name="clock" /><span><strong>Support Hours</strong><small>Mon – Sat<br />9 AM – 6 PM</small></span></span>
              </div>
            </> : null}
            {notice ? <p className="account-panel__notice">{notice}</p> : null}
          </section>
        </div>
      </div>
    </main>
  )
}

function ProductCard({ cardContext = 'catalog', onAddToCart, onBuyNow, onShareProduct, onToggleWishlist, wishlistIds = [], product, sectionId = 'products', shoppingMode = 'retail' }) {
  const [quantity, setQuantity] = useState('1')
  const [bagQuantity, setBagQuantity] = useState(5)
  const isWishlisted = wishlistIds.includes(product.id)
  const pieceCount = Math.max(1, Number.parseInt(quantity, 10) || 1)
  const wholesale = product.wholesale
  const isWholesale = shoppingMode === 'wholesale' && wholesale
  const totalPcs = isWholesale ? wholesale.pcsPerBag * bagQuantity : 0
  const totalWeightKg = isWholesale ? wholesale.weightKgPerBag * bagQuantity : 0
  const salePrice = isWholesale ? wholesale.ratePerBag * bagQuantity : pieceCount * 5
  const offerLabel = product.offerLabel ?? '5% OFF'
  const selectedProduct = {
    ...product,
    price: salePrice,
    weight: isWholesale ? `${bagQuantity} Bags` : `${pieceCount} ${pieceCount === 1 ? 'piece' : 'pieces'}`,
    quantity: isWholesale ? bagQuantity : pieceCount,
  }

  const handleShareClick = async (event) => {
    event.stopPropagation()
    if (onShareProduct) {
      await onShareProduct(product, sectionId)
    }
  }

  const handleCartClick = (event) => {
    event.stopPropagation()
    onAddToCart(selectedProduct)
  }

  const handleBuyNowClick = (event) => {
    event.stopPropagation()
    onBuyNow(selectedProduct)
  }

  return (
    <article className={`product-card product-card--${cardContext}`}>
      <span className="product-card__offer">{offerLabel}</span>
      <button
        type="button"
        className="product-card__share"
        aria-label={`Share ${product.name}`}
        onClick={handleShareClick}
      >
        <Icon name="share" className="product-card__share-icon" />
      </button>
      <button
        type="button"
        className={['product-card__wishlist', isWishlisted ? 'is-active' : ''].filter(Boolean).join(' ')}
        aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
        aria-pressed={isWishlisted}
        onClick={(event) => { event.stopPropagation(); onToggleWishlist(product) }}
      >
        <Icon name="heart" className="product-card__wishlist-icon" />
      </button>

      <div className="product-card__image-shell">
        <img
          src={product.image}
          alt={product.alt}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      <div className="product-card__details">
        <div className="product-card__title-row">
          <h3 className="product-card__title">{product.name}</h3>

          <button
            type="button"
            className="product-card__cart-action"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleCartClick}
          >
            <Icon name="cart" className="product-card__cart-icon" />
          </button>
        </div>

        {isWholesale ? <>
          <label className="product-card__variant-label product-card__variant-label--wholesale">
            <span className="sr-only">Select bags for {product.name}</span>
            <select className="product-card__variant product-card__wholesale-select" value={bagQuantity} onChange={(event) => setBagQuantity(Number(event.target.value))} aria-label={`Select bags for ${product.name}`}>
              {[5, 6, 7, 8, 9, 10, 15, 20].map((bags) => (
                <option key={bags} value={bags}>{bags === 5 ? '5 Bags (Minimum)' : `${bags} Bags`} • {wholesale.pcsPerBag * bags} PCS • {formatBagWeight(wholesale.weightKgPerBag * bags)} KG</option>
              ))}
            </select>
            <span className="product-card__wholesale-value" aria-hidden="true">
              <span>{bagQuantity === 5 ? '5 Bags (Minimum)' : `${bagQuantity} Bags`}</span>
              <span className="product-card__wholesale-separator">•</span>
              <span>{totalPcs} PCS</span>
              <span className="product-card__wholesale-separator">•</span>
              <span>{formatBagWeight(totalWeightKg)} KG</span>
              <Icon name="chevron-right" />
            </span>
          </label>
          <p className={['product-card__bag-detail', cardContext === 'home' && sectionId !== 'bestsellers' ? 'product-card__bag-detail--home-mobile' : ''].filter(Boolean).join(' ')}><Icon name="bag" /> 1 Bag <span>•</span> {wholesale.pcsPerBag} PCS <span>•</span> {formatBagWeight(wholesale.weightKgPerBag)} KG <span>•</span> ₹{wholesale.ratePerBag} / Bag</p>
        </> : <label className="product-card__variant-label">
          <span className="sr-only">Select pieces for {product.name}</span>
          <input
            className="product-card__variant"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            list={`pieces-${product.id}`}
            value={quantity}
            placeholder="Pieces"
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => setQuantity(event.target.value.replace(/\D/g, ''))}
            onBlur={() => setQuantity(String(pieceCount))}
            aria-label={`Select pieces for ${product.name}`}
          />
          <datalist id={`pieces-${product.id}`}>
            {[1, 2, 5, 10, 20].map((pieces) => <option key={pieces} value={pieces}>{pieces} {pieces === 1 ? 'piece' : 'pieces'}</option>)}
          </datalist>
          <span className="product-card__pieces-suffix">{pieceCount === 1 ? 'piece' : 'pieces'}</span>
        </label>}

        {product.rating && product.reviewCount ? (
          <p className="product-card__rating">
            <span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span>
            <span>({product.reviewCount})</span>
          </p>
        ) : null}

        <div className="product-card__price-row">
          <p className="product-card__price">₹{salePrice}</p>
        </div>
        <p className="product-card__unit-price">{isWholesale ? `₹${wholesale.ratePerBag} × ${bagQuantity} Bags` : `₹5 per piece · ${pieceCount} ${pieceCount === 1 ? 'piece' : 'pieces'}`}</p>
        {isWholesale ? <p className="product-card__minimum-order"><Icon name="package" /> Minimum order: 5 Bags</p> : null}
      </div>

      <button
        type="button"
        className="product-card__button"
        aria-label={`Buy ${product.name}`}
        onClick={handleBuyNowClick}
      >
        <Icon name="cart" /> BUY NOW
      </button>
    </article>
  )
}

function WishlistPage({ wishlistIds, onAddToCart, onRemove, onClear }) {
  const allProducts = [...productCatalog, ...bestsellerProducts]
  const savedProducts = wishlistIds.map((id) => allProducts.find((product) => product.id === id)).filter(Boolean)
  const recommendedProducts = productCatalog.filter((product) => !wishlistIds.includes(product.id)).slice(0, 3)
  const estimatedValue = savedProducts.reduce((total, product) => total + (product.wholesale ? product.wholesale.ratePerBag * 5 : product.price), 0)
  const moveToCart = (product) => {
    const wholesale = product.wholesale
    onAddToCart({ ...product, price: wholesale ? wholesale.ratePerBag * 5 : product.price, weight: wholesale ? '5 Bags' : product.weight, quantity: wholesale ? 5 : 1 })
    onRemove(product)
  }
  const moveAllToCart = () => {
    savedProducts.forEach((product) => {
      const wholesale = product.wholesale
      onAddToCart({ ...product, price: wholesale ? wholesale.ratePerBag * 5 : product.price, weight: wholesale ? '5 Bags' : product.weight, quantity: wholesale ? 5 : 1 })
    })
    onClear()
  }

  return (
    <main className="wishlist-page" id="wishlist">
      <div className="shell-content wishlist-page__inner">
        <div className="wishlist-heading-row"><div><h1>My Wishlist <Icon name="heart" /></h1><p>Products you&apos;ve liked and saved for later</p></div><div className="wishlist-heading-actions"><button type="button" disabled={!savedProducts.length} onClick={moveAllToCart}><Icon name="cart" /> Move All to Cart</button><button type="button" className="is-clear" disabled={!savedProducts.length} onClick={onClear}><Icon name="trash" /> Clear Wishlist</button></div></div>
        <section className="wishlist-summary" aria-label="Wishlist summary"><div><Icon name="heart" /><span><small>Total Saved Items</small><strong>{savedProducts.length}</strong></span></div><div><Icon name="package" /><span><small>Available Items</small><strong>{savedProducts.length}</strong></span></div><div><span className="wishlist-summary__rupee">₹</span><span><small>Total Est. Value</small><strong>₹{estimatedValue.toLocaleString('en-IN')}</strong></span></div></section>
        {savedProducts.length ? <section className="wishlist-grid" aria-label="Saved products">{savedProducts.map((product) => {
          const wholesale = product.wholesale
          return <article className="wishlist-card" key={product.id}><span className="wishlist-card__offer">5% OFF</span><button type="button" className="wishlist-card__remove" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product)}><Icon name="trash" /></button><img src={product.image} alt={product.alt} /><h2>{product.name}</h2><p className="wishlist-card__stock">In Stock</p>{wholesale ? <><p className="wishlist-card__variant">5 Bags (Minimum) <span>•</span> {wholesale.pcsPerBag * 5} PCS <span>•</span> {formatBagWeight(wholesale.weightKgPerBag * 5)} KG</p><p className="wishlist-card__bag">1 Bag&nbsp; • &nbsp;{wholesale.pcsPerBag} PCS&nbsp; • &nbsp;{formatBagWeight(wholesale.weightKgPerBag)} KG<br /><strong>₹{wholesale.ratePerBag} / Bag</strong></p><strong className="wishlist-card__price">₹{(wholesale.ratePerBag * 5).toLocaleString('en-IN')}</strong><small>₹{wholesale.ratePerBag} × 5 Bags</small><em>Minimum order: 5 Bags</em></> : <strong className="wishlist-card__price">₹{product.price}</strong>}<button type="button" className="wishlist-card__cart" onClick={() => moveToCart(product)}><Icon name="cart" /> Move to Cart</button><a href="#products">View Product</a></article>
        })}</section> : <section className="wishlist-empty"><Icon name="heart" /><h2>Your wishlist is empty</h2><p>Tap the heart on any product to save it here.</p><a href="#products">Explore Products</a></section>}
        <section className="wishlist-recommendations" aria-labelledby="wishlist-recommendations-title">
          <div className="wishlist-recommendations__heading"><div><Icon name="heart" /><h2 id="wishlist-recommendations-title">You may also like</h2></div><a href="#products">View all products →</a></div>
          <div className="wishlist-recommendations__grid">{recommendedProducts.map((product, index) => <article key={product.id} className="wishlist-recommendation-card"><img src={product.image} alt={product.alt} loading="lazy" /><div><h3>{product.name}</h3><p><span aria-label={`${4.5 + index * .1} out of 5 stars`}>★</span> {(4.5 + index * .1).toFixed(1)}</p><strong>₹{product.wholesale ? (product.wholesale.ratePerBag * 5).toLocaleString('en-IN') : product.price}</strong></div><button type="button" aria-label={`Add ${product.name} to cart`} onClick={() => { const wholesale = product.wholesale; onAddToCart({ ...product, price: wholesale ? wholesale.ratePerBag * 5 : product.price, weight: wholesale ? '5 Bags' : product.weight, quantity: wholesale ? 5 : 1 }) }}><Icon name="cart" /></button></article>)}</div>
        </section>
        <section className="wishlist-continue"><div><Icon name="heart" /><span><strong>Loved a product?</strong><p>Items in your wishlist are saved here. Add them to cart anytime!</p></span></div><a href="#products">Continue Shopping →</a></section>
      </div>
    </main>
  )
}

function CartPage({ cartItems, onUpdateQuantity, onRemove, onMoveToWishlist, onCheckout }) {
  const items = Object.values(cartItems)
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
  const tax = Math.round(subtotal * .05)
  const total = subtotal + tax
  return <main className="cart-page" id="cart"><div className="shell-content cart-page__inner">
    <div className="cart-page__heading"><div><h1>Your Cart ({items.length} {items.length === 1 ? 'Item' : 'Items'})</h1><p>Review your items and proceed to checkout</p></div><a href="#products">← Continue Shopping</a></div>
    {items.length ? <div className="cart-layout"><section className="cart-items" aria-label="Cart products">{items.map((item) => { const product = item.product; const wholesale = product.wholesale; const isWholesale = item.mode === 'wholesale'; return <article className="cart-item" key={product.id}><img src={product.image} alt={product.alt} /><div className="cart-item__details"><h2>{product.name}</h2><p>{product.weight}</p>{isWholesale && wholesale ? <><small>{item.quantity} Bags (Minimum) • {wholesale.pcsPerBag * item.quantity} PCS • {formatBagWeight(wholesale.weightKgPerBag * item.quantity)} KG</small><span><Icon name="bag" /> 1 Bag&nbsp; • &nbsp;{wholesale.pcsPerBag} PCS&nbsp; • &nbsp;{formatBagWeight(wholesale.weightKgPerBag)} KG&nbsp; • &nbsp;₹{wholesale.ratePerBag} / Bag</span></> : <small>{item.quantity} {item.quantity === 1 ? 'piece' : 'pieces'}</small>}</div><div className="cart-item__price"><strong>₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</strong><small>₹{item.unitPrice} × {item.quantity} {isWholesale ? 'Bags' : 'Pieces'}</small></div><div className="cart-item__actions"><button type="button" className="is-delete" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)}><Icon name="trash" /></button><div><button type="button" disabled={item.quantity <= item.minimum} onClick={() => onUpdateQuantity(product.id, item.quantity - 1)}>−</button><strong>{item.quantity}</strong><button type="button" onClick={() => onUpdateQuantity(product.id, item.quantity + 1)}>＋</button></div><button type="button" aria-label={`Move ${product.name} to wishlist`} onClick={() => onMoveToWishlist(product)}><Icon name="heart" /></button></div></article>})}<aside className="cart-minimum-note"><Icon name="shield" /> Minimum order for each wholesale product is 5 Bags</aside></section>
      <aside className="cart-summary"><h2>Order Summary</h2><p><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></p><p><span>Shipping Charges</span><em>FREE</em></p><p><span>Tax (5%)</span><strong>₹{tax.toLocaleString('en-IN')}</strong></p><div><span>Total Amount</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><small>You save on wholesale pricing with this order</small><aside><Icon name="truck" /><span><strong>Estimated Delivery</strong><small>3 – 5 Business Days</small></span></aside><button type="button" onClick={onCheckout}><Icon name="lock" /> PROCEED TO CHECKOUT</button><a href="#account"><Icon name="user" /> Checkout as Wholesale</a><footer><span><Icon name="shield" /> Secure Payments</span><span><Icon name="return" /> Easy Returns</span><span><Icon name="headset" /> 24/7 Support</span></footer></aside>
    </div> : <section className="cart-empty"><Icon name="cart" /><h2>Your cart is empty</h2><p>Add products to your cart to see them here.</p><a href="#products">Explore Products</a></section>}
  </div></main>
}

function BuyNowPage({ product, user, onComplete }) {
  const wholesale = product?.wholesale
  const initialQuantity = Math.max(1, Number(product?.quantity) || (String(product?.weight).includes('Bag') ? 5 : 1))
  const isWholesale = Boolean(wholesale && String(product?.weight).includes('Bag'))
  const minimum = isWholesale ? 5 : 1
  const [quantity, setQuantity] = useState(Math.max(minimum, initialQuantity))
  const [delivery, setDelivery] = useState('standard')
  const [payment, setPayment] = useState('upi')
  const [saveAddress, setSaveAddress] = useState(false)
  const [message, setMessage] = useState('')
  const [address, setAddress] = useState({ name: user?.name || '', phone: user?.mobile || '', building: '', street: '', city: '', state: '', pincode: '' })
  const savedAddresses = readStoredAddresses()
  if (!product) return <main className="buy-now-page"><div className="shell-content cart-empty"><h2>No product selected</h2><a href="#products">Explore Products</a></div></main>
  const unitPrice = isWholesale ? wholesale.ratePerBag : Math.max(1, Math.round(product.price / initialQuantity))
  const subtotal = unitPrice * quantity
  const shipping = delivery === 'express' ? 120 : 0
  const tax = Math.round(subtotal * .05)
  const total = subtotal + shipping + tax
  const placeOrder = (event) => {
    event.preventDefault()
    if (Object.values(address).some((value) => !String(value).trim())) { setMessage('Please complete the delivery address.'); return }
    setMessage('Order placed successfully! Your confirmation number is AK-' + String(Date.now()).slice(-6) + '.')
    onComplete?.()
  }
  return <main className="buy-now-page" id="buy-now"><form className="shell-content buy-now-page__inner" onSubmit={placeOrder}>
    <nav className="buy-now-breadcrumb"><a href="#home">Home</a><span>›</span><span>Buy Now</span></nav>
    <header className="buy-now-heading"><div><h1>Buy Now</h1><p>You&apos;re almost there! Just a few details to place your order.</p></div><span><Icon name="shield" /> 100% Secure Checkout</span></header>
    <section className="buy-now-product"><img src={product.image} alt={product.alt} /><div><h2>{product.name}</h2><p>{product.weight}</p>{isWholesale ? <><span>{quantity} Bags (Minimum)</span><span>{wholesale.pcsPerBag * quantity} PCS</span><span>{formatBagWeight(wholesale.weightKgPerBag * quantity)} KG</span><aside><Icon name="bag" /> 1 Bag&nbsp; • &nbsp;{wholesale.pcsPerBag} PCS&nbsp; • &nbsp;{formatBagWeight(wholesale.weightKgPerBag)} KG<br /><strong>₹{wholesale.ratePerBag} / Bag</strong></aside></> : null}</div><div className="buy-now-product__price"><strong>₹{subtotal.toLocaleString('en-IN')}</strong><small>₹{unitPrice} × {quantity} {isWholesale ? 'Bags' : 'Pieces'}</small></div><div className="buy-now-quantity"><button type="button" disabled={quantity <= minimum} onClick={() => setQuantity((value) => Math.max(minimum, value - 1))}>−</button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity((value) => value + 1)}>＋</button></div></section>
    <section className="checkout-section"><div className="checkout-section__heading"><h2><Icon name="pin" /> Delivery Address</h2><select aria-label="Use a saved address" defaultValue="" onChange={(e) => { const saved = savedAddresses.find((item) => item.id === e.target.value); if (saved) setAddress({ name: user?.name || '', phone: saved.phone, building: saved.addressLine, street: '', city: saved.cityLine, state: 'Bihar', pincode: saved.cityLine.match(/\d{6}/)?.[0] || '' }) }}><option value="">Saved Addresses</option>{savedAddresses.map((item) => <option key={item.id} value={item.id}>{item.label}{item.isDefault ? ' (Default)' : ''}</option>)}</select></div><div className="checkout-address-grid"><input placeholder="Full Name*" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} /><input placeholder="Phone Number*" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} /><input placeholder="House / Flat / Building*" value={address.building} onChange={(e) => setAddress({ ...address, building: e.target.value })} /><input placeholder="Area / Street / Landmark*" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} /><input placeholder="City*" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /><input placeholder="State*" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} /><input placeholder="Pincode*" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} /></div><label className="checkout-save-address"><input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} /> Save this address for future orders</label></section>
    <section className="checkout-section"><h2><Icon name="truck" /> Delivery Options</h2><div className="checkout-options"><label className={delivery === 'standard' ? 'is-active' : ''}><input type="radio" name="delivery" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} /><span><strong>Standard Delivery</strong><small>3 – 5 Business Days</small></span><em>FREE</em></label><label className={delivery === 'express' ? 'is-active' : ''}><input type="radio" name="delivery" checked={delivery === 'express'} onChange={() => setDelivery('express')} /><span><strong>Express Delivery</strong><small>1 – 2 Business Days</small></span><em>₹120</em></label></div></section>
    <section className="checkout-section"><h2><Icon name="card" /> Payment Method</h2><div className="checkout-payments">{[['upi','UPI / QR','qr'],['card','Card','card'],['netbanking','Net Banking','building'],['cod','COD','truck']].map(([id,label,icon]) => <label key={id} className={payment === id ? 'is-active' : ''}><input type="radio" name="payment" checked={payment === id} onChange={() => setPayment(id)} /><Icon name={icon} /><span><strong>{label}</strong><small>{id === 'cod' ? 'Cash on Delivery' : id === 'card' ? 'Debit / Credit Card' : '100% secure payment'}</small></span></label>)}</div><aside className="checkout-secure-strip"><Icon name="shield" /> Secure Payments <b>•</b> 100% Safe &amp; Secure <b>•</b> Easy Returns</aside></section>
    <section className="checkout-final"><div><h2><Icon name="bag" /> Order Summary</h2><article><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{quantity} {isWholesale ? 'Bags' : 'Pieces'} · ₹{unitPrice} / {isWholesale ? 'Bag' : 'Piece'}</small></span><b>₹{subtotal.toLocaleString('en-IN')}</b></article></div><aside><p><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></p><p><span>Shipping Charges</span><strong>{shipping ? `₹${shipping}` : 'FREE'}</strong></p><p><span>Tax (5%)</span><strong>₹{tax.toLocaleString('en-IN')}</strong></p><div><span>Total Amount</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><small><Icon name="truck" /> Estimated Delivery: {delivery === 'express' ? '1 – 2' : '3 – 5'} Business Days</small><button type="submit"><Icon name="lock" /> PLACE ORDER</button>{message ? <p className="checkout-message" role="status">{message}</p> : null}</aside></section>
    <section className="checkout-trust"><span><Icon name="shield" /><b>Quality Assured</b><small>Premium Quality Products</small></span><span><Icon name="truck" /><b>Fast Delivery</b><small>Across India</small></span><span><Icon name="return" /><b>Easy Returns</b><small>Hassle Free Returns</small></span><span><Icon name="headset" /><b>24/7 Support</b><small>We&apos;re here to help</small></span></section>
  </form></main>
}

function ProductsPage({ initialShoppingMode = 'wholesale', initialProductFilter = 'all', onAddToCart, onBuyNow, onShareProduct, onToggleWishlist, wishlistIds }) {
  const availableSizes = [...new Set(productCatalog.map((product) => product.weight))]
  const [productFilter, setProductFilter] = useState(initialProductFilter)
  const [sizeFilter, setSizeFilter] = useState('all')
  const [weightFilter, setWeightFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [shoppingMode, setShoppingMode] = useState(initialShoppingMode)
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState('grid')
  const [showAllMobileProducts, setShowAllMobileProducts] = useState(false)
  const availableMobilePackSizes = shoppingMode === 'wholesale'
    ? [...new Set(productCatalog.map((product) => product.wholesale?.pcsPerBag).filter(Boolean))]
    : availableSizes
  const availableMobileWeights = [...new Set(productCatalog.map((product) => (
    shoppingMode === 'wholesale'
      ? `${formatBagWeight((product.wholesale?.weightKgPerBag || 0) * 5)} KG`
      : product.weight
  )))]

  useEffect(() => {
    setShowAllMobileProducts(false)
  }, [productFilter, sizeFilter, weightFilter, priceFilter, sortBy, shoppingMode])

  const visibleProducts = productCatalog
    .filter((product) => productFilter === 'all' || product.id === productFilter)
    .filter((product) => {
      if (sizeFilter === 'all') return true
      if (sizeFilter.startsWith('pcs-')) return product.wholesale?.pcsPerBag === Number(sizeFilter.replace('pcs-', ''))
      return product.weight === sizeFilter
    })
    .filter((product) => {
      const displayedWeight = shoppingMode === 'wholesale'
        ? `${formatBagWeight((product.wholesale?.weightKgPerBag || 0) * 5)} KG`
        : product.weight
      return weightFilter === 'all' || displayedWeight === weightFilter
    })
    .filter((product) => {
      if (priceFilter === 'under-30') return product.price < 30
      if (priceFilter === '30-50') return product.price >= 30 && product.price <= 50
      if (priceFilter === 'over-50') return product.price > 50
      const wholesaleTotal = (product.wholesale?.ratePerBag || product.price) * 5
      if (priceFilter === 'wholesale-under-4000') return wholesaleTotal < 4000
      if (priceFilter === 'wholesale-4000-5000') return wholesaleTotal >= 4000 && wholesaleTotal <= 5000
      if (priceFilter === 'wholesale-over-5000') return wholesaleTotal > 5000
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <main className="products-page-main" id="products">
      <div className="products-page-content">
        <section className="products-mobile-categories" aria-label="Product categories">
          <div className="products-mobile-categories__track">
            {productCatalog.map((product) => (
              <button
                key={`mobile-category-${product.id}`}
                type="button"
                className={productFilter === product.id ? 'is-active' : ''}
                aria-pressed={productFilter === product.id}
                onClick={() => setProductFilter(product.id)}
              >
                <span><img src={product.image} alt="" aria-hidden="true" /></span>
                <strong>{product.name.replace('Ayush ', '')}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="products-mobile-toolbar" aria-label="Mobile product filters">
          <div className="products-mobile-toolbar__heading">
            <p>Showing products in <strong>{productFilter === 'all' ? 'All Categories' : productCatalog.find((product) => product.id === productFilter)?.name}</strong></p>
            <label>
              <span>Sort by</span>
              <Icon name="trending" className="products-mobile-toolbar__sort-icon" />
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="popular">Popularity</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>

          <div className="products-mobile-toolbar__filters">
            <span className="products-mobile-toolbar__filter-label"><Icon name="filter" /> Filter</span>
            <label><span className="sr-only">Price</span><span className="products-mobile-toolbar__rupee" aria-hidden="true">₹</span><select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}><option value="all">Price</option>{shoppingMode === 'wholesale' ? <><option value="wholesale-under-4000">Under ₹4,000</option><option value="wholesale-4000-5000">₹4,000–₹5,000</option><option value="wholesale-over-5000">Above ₹5,000</option></> : <><option value="under-30">Under ₹30</option><option value="30-50">₹30–₹50</option><option value="over-50">Above ₹50</option></>}</select></label>
            <label><span className="sr-only">Pack size</span><Icon name="package" /><select value={sizeFilter} onChange={(event) => setSizeFilter(event.target.value)}><option value="all">Pack Size</option>{availableMobilePackSizes.map((size) => <option key={`pack-${size}`} value={shoppingMode === 'wholesale' ? `pcs-${size}` : size}>{shoppingMode === 'wholesale' ? `${size} PCS / Bag` : size}</option>)}</select></label>
            <label><span className="sr-only">Weight</span><Icon name="weight" /><select value={weightFilter} onChange={(event) => setWeightFilter(event.target.value)}><option value="all">Weight</option>{availableMobileWeights.map((weight) => <option key={`weight-${weight}`} value={weight}>{weight}</option>)}</select></label>
            <button type="button" onClick={() => { setProductFilter('all'); setSizeFilter('all'); setWeightFilter('all'); setPriceFilter('all'); setSortBy('popular') }}>Reset <Icon name="reset" /></button>
          </div>
        </section>

        <section className="products-filter-bar" aria-label="Product filters">
          <div className="products-filter-bar__label">
            <Icon name="filter" />
            <span>Filter By</span>
          </div>

          <label className="products-filter-control">
            <Icon name="bag" />
            <span className="sr-only">Product</span>
            <select value={productFilter} onChange={(event) => setProductFilter(event.target.value)}>
              <option value="all">All Products</option>
              {productCatalog.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
            </select>
          </label>

          <label className="products-filter-control">
            <Icon name="ruler" />
            <span className="sr-only">Pack size</span>
            <select value={sizeFilter} onChange={(event) => setSizeFilter(event.target.value)}>
              <option value="all">Size</option>
              {availableSizes.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>

          <label className="products-filter-control">
            <span className="products-filter-control__rupee">₹</span>
            <span className="sr-only">Price range</span>
            <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
              <option value="all">Price</option>
              <option value="under-30">Under ₹30</option>
              <option value="30-50">₹30 – ₹50</option>
              <option value="over-50">Above ₹50</option>
            </select>
          </label>

          <div className="products-mode-toggle" aria-label="Shopping mode">
            {['retail', 'wholesale'].map((mode) => (
              <button key={mode} type="button" aria-pressed={shoppingMode === mode} className={shoppingMode === mode ? 'is-active' : ''} onClick={() => setShoppingMode(mode)}>
                <span aria-hidden="true" /> {mode}
              </button>
            ))}
          </div>

          <div className="products-sort">
            <span>Sort By</span>
            <label className="products-filter-control">
              <Icon name="trending" />
              <span className="sr-only">Sort products</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="popular">Popular</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
            <div className="products-view-toggle" aria-label="Product view">
              <button type="button" className={viewMode === 'grid' ? 'is-active' : ''} aria-label="Grid view" aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')}><Icon name="grid" /></button>
              <button type="button" className={viewMode === 'list' ? 'is-active' : ''} aria-label="List view" aria-pressed={viewMode === 'list'} onClick={() => setViewMode('list')}><Icon name="list" /></button>
            </div>
          </div>
        </section>

        <p className="products-result-count">Showing {visibleProducts.length} products</p>

        <section className={`products-catalog-grid products-catalog-grid--${viewMode}${showAllMobileProducts ? ' is-mobile-expanded' : ''}`} aria-label="Product catalog">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onShareProduct={onShareProduct}
              onToggleWishlist={onToggleWishlist}
              wishlistIds={wishlistIds}
              sectionId="products"
              shoppingMode={shoppingMode}
            />
          ))}
        </section>
        {!showAllMobileProducts && visibleProducts.length > 6 ? (
          <button type="button" className="products-mobile-view-more" onClick={() => setShowAllMobileProducts(true)}>
            View More <Icon name="chevron-right" />
          </button>
        ) : null}
      </div>
    </main>
  )
}

function ProductCarousel({ onAddToCart, onBuyNow, onShareProduct, onToggleWishlist, wishlistIds }) {
  const getVisibleCards = () => {
    if (typeof window === 'undefined') {
      return 4
    }

    if (window.innerWidth <= 680) {
      return 1
    }

    if (window.innerWidth <= 980) {
      return 3
    }

    return 4
  }

  const [visibleCards, setVisibleCards] = useState(getVisibleCards)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const syncVisibleCards = () => setVisibleCards(getVisibleCards())

    window.addEventListener('resize', syncVisibleCards)

    return () => window.removeEventListener('resize', syncVisibleCards)
  }, [])

  const maxStartIndex = Math.max(productCatalog.length - visibleCards, 0)
  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < maxStartIndex

  useEffect(() => {
    setCurrentIndex((value) => Math.min(value, maxStartIndex))
  }, [maxStartIndex])

  const scrollProducts = (direction) => {
    setCurrentIndex((value) => {
      const nextIndex = value + direction

      return Math.max(0, Math.min(nextIndex, maxStartIndex))
    })
  }

  const visibleProducts = productCatalog.slice(currentIndex, currentIndex + visibleCards)
  const renderedProducts = visibleCards === 1 ? productCatalog : visibleProducts

  return (
    <div className="product-carousel-shell">
      <div className="product-carousel" aria-label="Premium Ayush product carousel">
        <div className="product-carousel__content">
          <button
            type="button"
            className={['product-carousel__arrow', !canScrollPrev ? 'is-disabled' : '']
              .filter(Boolean)
              .join(' ')}
            aria-label="Scroll products left"
            disabled={!canScrollPrev}
            onClick={() => scrollProducts(-1)}
          >
            <Icon name="chevron-left" className="product-carousel__arrow-icon" />
          </button>

          <div className="product-carousel__viewport">
            <div className="product-carousel__track">
              {renderedProducts.map((product) => (
                <ProductCard
                  cardContext="home"
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                  onShareProduct={onShareProduct}
                  onToggleWishlist={onToggleWishlist}
                  wishlistIds={wishlistIds}
                  shoppingMode="wholesale"
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className={['product-carousel__arrow', 'product-carousel__arrow--next', !canScrollNext ? 'is-disabled' : '']
              .filter(Boolean)
              .join(' ')}
            aria-label="Scroll products right"
            disabled={!canScrollNext}
            onClick={() => scrollProducts(1)}
          >
            <Icon name="chevron-right" className="product-carousel__arrow-icon" />
          </button>
        </div>
      </div>

      <div className="product-carousel__cta-wrap">
        <a className="product-carousel__cta" href="#products">
          Explore more
        </a>
      </div>
    </div>
  )
}

function BrandStorySection({ onAddToCart, onBuyNow, onShareProduct, onToggleWishlist, wishlistIds }) {
  const mobileRibbonRef = useRef(null)

  const scrollMobileRibbon = (direction) => {
    const ribbon = mobileRibbonRef.current
    if (!ribbon) return

    const firstItem = ribbon.querySelector('.mobile-product-ribbon__item')
    const itemWidth = firstItem?.getBoundingClientRect().width || ribbon.clientWidth / 4
    ribbon.scrollBy({ left: direction * (itemWidth + 8), behavior: 'smooth' })
  }

  return (
    <Reveal as="section" className="brand-story-section" id="products">
      <div className="shell-content shell-content--wide">
        <div className="brand-story-stage">
          <img
            src="/ayush/brand-story.png"
            alt="Ayush Taste of Royalty brand story artwork"
            className="full-bleed-image"
            loading="lazy"
          />

          <div className="mobile-product-ribbon-shell">
            <button
              type="button"
              className="mobile-product-ribbon__arrow mobile-product-ribbon__arrow--prev"
              aria-label="Show previous product categories"
              onClick={() => scrollMobileRibbon(-1)}
            >
              <Icon name="chevron-left" />
            </button>

            <div ref={mobileRibbonRef} className="mobile-product-ribbon" aria-label="Popular Ayush products">
              {productCatalog.map((product) => (
                <span className="mobile-product-ribbon__item" key={`mobile-ribbon-${product.id}`}>
                  <span className="mobile-product-ribbon__circle">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </span>
                  <span className="mobile-product-ribbon__name">{product.name}</span>
                </span>
              ))}
            </div>

            <button
              type="button"
              className="mobile-product-ribbon__arrow mobile-product-ribbon__arrow--next"
              aria-label="Show next product categories"
              onClick={() => scrollMobileRibbon(1)}
            >
              <Icon name="chevron-right" />
            </button>
          </div>

          <div className="brand-story-stage__carousel">
            <ProductCarousel
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onShareProduct={onShareProduct}
              onToggleWishlist={onToggleWishlist}
              wishlistIds={wishlistIds}
            />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function ArtworkSection({ id, src, alt, className = '' }) {
  return (
    <Reveal as="section" className={['artwork-section', className].join(' ')} id={id}>
      <div className="shell-content shell-content--wide">
        <img src={src} alt={alt} className="full-bleed-image" loading="lazy" />
      </div>
    </Reveal>
  )
}

function HeritageSection() {
  return (
    <Reveal as="section" className="artwork-section artwork-section--heritage" id="heritage">
      <div className="shell-content shell-content--wide">
        <div className="heritage-panel">
          <img
            src="/ayush/heritage-scene.png"
            alt="Bihar heritage illustration with temple and camel riders"
            className="full-bleed-image heritage-panel__image"
            loading="lazy"
          />

          <div className="heritage-panel__content">
            <h2 className="heritage-panel__title">
              <span>About Us</span>
              <span> - Ayush Kursela</span>
            </h2>

            <p className="heritage-panel__eyebrow">Kursela ki pehchaan, Bihar ka swad</p>

            <div className="heritage-panel__copy">
              <p>Crafting authentic flavours from the heart of Bihar.</p>
              <p>Ayush Kursela brings generations of tradition to every bite.</p>
              <p>
                Made with premium ingredients expertly curated to bring you the
                true essence of Bihar, our snacks are loved across India for their
                unmatched freshness, taste, and quality.
              </p>
            </div>

            <div className="heritage-panel__divider" aria-hidden="true" />

            <a className="heritage-panel__cta" href="#about">
              Discover More
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function ModeSelection() {
  const [mobileMode, setMobileMode] = useState('wholesale')

  const selectMobileMode = (mode) => {
    setMobileMode(mode)
    window.location.hash = `#products?mode=${mode}`
  }

  return (
    <Reveal as="section" className="mode-section" id="shopping-modes">
      <div className="shell-content">
        <div className="retail-wholesale-wrapper retail-wholesale-wrapper--desktop">
          <a
            className="mode-card"
            href="#products?mode=retail"
            aria-label="Open retail mode for individual customers"
          >
            <img
              src="/ayush/retail-mode-banner.png"
              alt="Retail Mode banner for individual customers"
              loading="lazy"
            />
          </a>

          <a
            className="mode-card"
            href="#products?mode=wholesale"
            aria-label="Open wholesale mode for business and resellers"
          >
            <img
              src="/ayush/wholesale-mode-banner.png"
              alt="Wholesale Mode banner for business and resellers"
              loading="lazy"
            />
          </a>
        </div>

        <fieldset className="mobile-mode-selector">
          <legend className="sr-only">Choose shopping mode</legend>
          {['retail', 'wholesale'].map((mode) => (
            <label className="mobile-mode-selector__option" key={mode}>
              <input
                type="radio"
                name="mobile-shopping-mode"
                value={mode}
                checked={mobileMode === mode}
                onChange={() => selectMobileMode(mode)}
              />
              <span className="mobile-mode-selector__control" aria-hidden="true" />
              <span>{mode === 'retail' ? 'Retail' : 'Wholesale'}</span>
            </label>
          ))}
        </fieldset>
      </div>
    </Reveal>
  )
}

function BestsellersSection({ onAddToCart, onBuyNow, onShareProduct, onToggleWishlist, wishlistIds }) {
  return (
    <Reveal as="section" className="bestsellers-section" id="bestsellers">
      <div className="shell-content">
        <div className="bestsellers-shell">
          <div className="bestsellers-heading">
            <h2 className="sr-only">Our Bestsellers</h2>
            <p className="sr-only">Loved by Millions, Every Day!</p>
            <img
              src="/ayush/bestsellers-banner-custom.png"
              alt=""
              aria-hidden="true"
              className="bestsellers-heading__image"
              loading="lazy"
            />
          </div>

          <div className="bestseller-grid" aria-label="Our bestseller products">
            {bestsellerProducts.map((product) => (
              <ProductCard
                cardContext="home"
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onShareProduct={onShareProduct}
                onToggleWishlist={onToggleWishlist}
                wishlistIds={wishlistIds}
                sectionId="bestsellers"
                shoppingMode="wholesale"
              />
            ))}
          </div>
          <div className="bestsellers-explore-wrap">
            <a className="bestsellers-explore-button" href="#products">Explore More</a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function FactoryBanner() {
  return (
    <Reveal as="section" className="factory-section" id="factory">
      <div className="shell-content">
        <div className="factory-banner factory-banner--image">
          <img
            className="factory-banner__image"
            src="/ayush/factory-authentic-banner-thin.png"
            alt="Ayush Kursela banner with namkeen bowls, logo, authentic taste message, and factory building"
            loading="lazy"
          />
        </div>
      </div>
    </Reveal>
  )
}

function FeaturesStrip({ className = '' }) {
  const mobileFeatures = [
    { title: '100% Natural', subtitle: 'No Preservatives', icon: 'leaf' },
    { title: 'Premium Quality', subtitle: 'Best Ingredients', icon: 'badge' },
    { title: 'Fast Delivery', subtitle: 'Pan India', icon: 'truck' },
    { title: 'Secure Payment', subtitle: '100% Safe', icon: 'shield' },
  ]

  return (
    <Reveal as="section" className={['feature-strip', className].filter(Boolean).join(' ')}>
      <div className="shell-content">
        <div className="mobile-home-feature-grid" aria-label="Ayush quality and service benefits">
          {mobileFeatures.map((feature) => (
            <article className="mobile-home-feature" key={feature.title}>
              <span className="mobile-home-feature__icon"><Icon name={feature.icon} /></span>
              <strong>{feature.title}</strong>
              <small>{feature.subtitle}</small>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

function LinkColumn({ title, items }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <a href="#home">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactRow({ icon, title, body, note }) {
  return (
    <div className="contact-row">
      <div className="contact-row__icon">
        <Icon name={icon} className="stroke-icon" />
      </div>
      <div>
        <p className="contact-row__title">{title}</p>
        <p className="contact-row__body">{body}</p>
        <p className="contact-row__note">{note}</p>
      </div>
    </div>
  )
}

function Footer() {
  const [openPanel, setOpenPanel] = useState(null)
  const [isMobileFooter, setIsMobileFooter] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 768,
  )
  const currentYear = new Date().getFullYear()
  const footerPanels = [
    {
      id: 'quick-links',
      title: 'Quick Links',
      type: 'links',
      items: footerLinks.quickLinks.map((label) => ({
        label,
        href: footerQuickLinkTargets[label] ?? '#home',
      })),
    },
    {
      id: 'our-products',
      title: 'Our Products',
      type: 'links',
      items: footerLinks.products.map((label) => ({
        label,
        href: '#products',
      })),
    },
    {
      id: 'customer-care',
      title: 'Customer Care',
      type: 'links',
      items: footerLinks.customerCare.map((label) => ({
        label,
        href: `mailto:${footerContactInfo.email}?subject=${encodeURIComponent(`Ayush Kursela - ${label}`)}`,
      })),
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      type: 'contact',
      items: [
        {
          icon: 'phone',
          title: footerContactInfo.phone,
          note: footerContactInfo.phoneNote,
          href: 'tel:+911234567890',
        },
        {
          icon: 'mail',
          title: footerContactInfo.email,
          note: footerContactInfo.emailNote,
          href: `mailto:${footerContactInfo.email}`,
        },
        {
          icon: 'pin',
          title: footerContactInfo.addressTitle,
          body: footerContactInfo.addressBody,
        },
      ],
    },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const syncMobileFooter = (event) => {
      setIsMobileFooter(event.matches)
    }

    setIsMobileFooter(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncMobileFooter)

      return () => mediaQuery.removeEventListener('change', syncMobileFooter)
    }

    mediaQuery.addListener(syncMobileFooter)

    return () => mediaQuery.removeListener(syncMobileFooter)
  }, [])

  const togglePanel = (panelId) => {
    setOpenPanel((current) => (current === panelId ? null : panelId))
  }

  return (
    <Reveal as="footer" className="page-footer" id="site-footer">
      <div className="shell-content footer-shell">
        <div className="footer-usp-bar" id="footer-usp">
          {footerFeatureItems.map((item, index) => (
            <article key={item.title} className="footer-usp-item">
              <span className="footer-usp-item__icon">
                <Icon name={item.icon} className="stroke-icon" />
              </span>
              <div className="footer-usp-item__copy">
                <p className="footer-usp-item__title">{item.title}</p>
                <p className="footer-usp-item__description">{item.description}</p>
              </div>
              {index < footerFeatureItems.length - 1 ? (
                <span className="footer-usp-item__separator" aria-hidden="true" />
              ) : null}
            </article>
          ))}
        </div>

        <div className="footer-main-grid">
          <section className="footer-brand-panel">
            <img
              src="/ayush/logo-ayush-kursela-clean.png"
              alt="Ayush Kursela logo"
              className="footer-brand-panel__logo"
            />

            <h2 className="footer-brand-panel__tagline">
              <span>Pure Taste.</span>{' '}
              <span className="footer-brand-panel__tagline-accent">Trusted Quality.</span>
            </h2>

            <p className="footer-brand-panel__copy">
              From our kitchen to your home - delicious snacks made with love and
              the finest ingredients since 1989.
            </p>

            <div className="footer-socials">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={[
                    'footer-social',
                    `footer-social--${item.label.toLowerCase()}`,
                  ].join(' ')}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  <img src={item.icon} alt="" loading="lazy" />
                </a>
              ))}
            </div>
          </section>

          <div className="footer-links-grid">
            {footerPanels.map((panel) => (
              <FooterPanelSection
                key={panel.id}
                panel={panel}
                isCollapsible={isMobileFooter}
                isOpen={openPanel === panel.id}
                onToggle={togglePanel}
              />
            ))}
          </div>
        </div>

        <section className="footer-newsletter-card" id="footer-newsletter">
          <img
            className="footer-newsletter-card__bg"
            src="/ayush/footer-newsletter-banner.png"
            alt=""
            loading="lazy"
            aria-hidden="true"
          />

          <div className="footer-newsletter-card__content">
            <div className="footer-newsletter-card__intro">
              <span className="footer-newsletter-card__icon">
                <Icon name="mail-filled" className="stroke-icon" />
              </span>

              <div className="footer-newsletter-card__copy">
                <h3>Stay Updated</h3>
                <p>
                  Subscribe to get updates on new products, offers & exclusive
                  deals.
                </p>
              </div>
            </div>

            <form
              className="footer-newsletter-card__form"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>

        <div className="footer-meta-row">
          <div className="footer-meta-row__items">
            {footerMetaHighlights.map((item) => (
              <article key={item.id} className="footer-meta-highlight">
                <span className="footer-meta-highlight__icon">
                  <Icon name={item.icon} className="stroke-icon" />
                </span>
                <div className="footer-meta-highlight__copy">
                  <p className="footer-meta-highlight__title">{item.title}</p>
                  <p className="footer-meta-highlight__emphasis">{item.emphasis}</p>
                  {item.subtitle || item.id === 'trusted' ? (
                    <p className="footer-meta-highlight__subtitle" aria-label="5 star rating">
                      {item.id === 'trusted' ? '\u2605\u2605\u2605\u2605\u2605' : item.subtitle}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="footer-payments">
            <span className="footer-payments__label">We Accept</span>
            <div className="footer-payments__list" aria-label="Accepted payment methods">
              {paymentMethods.map((item) => (
                <span
                  key={item.label}
                  className={[
                    'footer-payment-chip',
                    `footer-payment-chip--${item.tone}`,
                  ].join(' ')}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="footer-copyright">
          © {currentYear} Ayush Kursela. All Rights Reserved.
        </p>
      </div>
    </Reveal>
  )
}

function SiteToast({ message }) {
  if (!message) {
    return null
  }

  return (
    <div className="site-toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}

function MobileBottomNav({ pageHash, currentHash, cartCount = 0, wishlistCount = 0, isAuthenticated = false }) {
  const items = [
    { label: 'Home', href: '#home', icon: 'home', active: pageHash === '#home' },
    { label: 'Categories', href: '#products', icon: 'grid', active: pageHash === '#products' },
    { label: 'Wishlist', href: '#wishlist', icon: 'heart', active: pageHash === '#wishlist', count: wishlistCount },
    { label: 'Cart', href: '#cart', icon: 'cart', active: pageHash === '#cart' || pageHash === '#buy-now', count: cartCount },
    {
      label: 'Account',
      href: isAuthenticated ? '#account' : '#login',
      icon: 'user',
      active: currentHash === '#account' || currentHash === '#login' || currentHash === '#register',
    },
  ]

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={['mobile-bottom-nav__item', item.active ? 'is-active' : ''].filter(Boolean).join(' ')}
          aria-current={item.active ? 'page' : undefined}
        >
          <span className="mobile-bottom-nav__icon-wrap">
            <Icon name={item.icon} className="mobile-bottom-nav__icon" />
            {item.count > 0 ? (
              <span className="mobile-bottom-nav__badge" aria-label={`${item.count} items`}>
                {item.count > 99 ? '99+' : item.count}
              </span>
            ) : null}
          </span>
          <span className="mobile-bottom-nav__label">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

function App() {
  const [cartItems, setCartItems] = useState({})
  const [wishlistIds, setWishlistIds] = useState(readStoredWishlist)
  const [toastMessage, setToastMessage] = useState('')
  const [checkoutProduct, setCheckoutProduct] = useState(null)
  const [currentHash, setCurrentHash] = useState(getCurrentPageHash)
  const [account, setAccount] = useState(readStoredAccount)

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const syncCurrentHash = () => setCurrentHash(getCurrentPageHash())

    window.addEventListener('hashchange', syncCurrentHash)

    return () => window.removeEventListener('hashchange', syncCurrentHash)
  }, [])

  const isAboutPage = currentHash === '#about'
  const isContactPage = currentHash === '#contact'
  const pageHash = currentHash.split('?')[0]
  const isProductsPage = pageHash === '#products'
  const isWishlistPage = pageHash === '#wishlist'
  const isCartPage = pageHash === '#cart'
  const isBuyNowPage = pageHash === '#buy-now'
  const isLoginPage = currentHash === '#login'
  const isRegisterPage = currentHash === '#register'
  const isAccountPage = currentHash === '#account' && Boolean(account)
  const isAuthPage = isLoginPage || isRegisterPage

  useEffect(() => {
    window.localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlistIds))
  }, [wishlistIds])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollToHashTarget(pageHash, {
        behavior: 'auto',
        updateUrl: false,
      })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [currentHash, pageHash, isAboutPage, isContactPage, isProductsPage, isLoginPage, isRegisterPage, isAccountPage])

  const cartItemCount = Object.keys(cartItems).length

  const handleAddToCart = (product) => {
    const quantity = Math.max(1, Number(product.quantity) || 1)
    const mode = product.wholesale && String(product.weight).includes('Bag') ? 'wholesale' : 'retail'
    const unitPrice = mode === 'wholesale' ? product.wholesale.ratePerBag : Math.round(product.price / quantity)
    setCartItems((current) => ({
      ...current,
      [product.id]: current[product.id]
        ? { ...current[product.id], quantity: current[product.id].quantity + quantity }
        : { product, quantity, unitPrice, mode, minimum: mode === 'wholesale' ? 5 : 1 },
    }))
    setToastMessage(`${product.name} added to cart`)
  }

  const handleShareProduct = async (product, sectionId) => {
    const shareResult = await shareCurrentProduct(product, sectionId)

    if (shareResult === 'copied') {
      setToastMessage('Product link copied')
    }
  }

  const handleBuyNow = (product) => {
    if (!product) { window.location.hash = '#cart'; return }
    setCheckoutProduct(product)
    window.location.hash = '#buy-now'
  }

  const handleToggleWishlist = (product) => {
    setWishlistIds((current) => {
      const isSaved = current.includes(product.id)
      setToastMessage(isSaved ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`)
      return isSaved ? current.filter((id) => id !== product.id) : [...current, product.id]
    })
  }

  const handleLogin = (nextAccount) => {
    persistAccount(nextAccount)
    setAccount(nextAccount)
  }

  const handleLogout = () => {
    window.localStorage.removeItem(accountStorageKey)
    setAccount(null)
    setToastMessage('You have been logged out.')
    window.location.hash = '#home'
  }
  const handleUpdateCartQuantity = (id, quantity) => setCartItems((current) => ({ ...current, [id]: { ...current[id], quantity: Math.max(current[id].minimum, quantity) } }))
  const handleRemoveCartItem = (id) => setCartItems((current) => { const next = { ...current }; delete next[id]; return next })
  const handleMoveCartItemToWishlist = (product) => { setWishlistIds((current) => current.includes(product.id) ? current : [...current, product.id]); handleRemoveCartItem(product.id); setToastMessage(`${product.name} moved to wishlist`) }

  const handleUpdateAccount = (nextAccount) => {
    persistAccount(nextAccount)
    setAccount(nextAccount)
  }

  return (
    <div className={['site-shell', isProductsPage ? 'site-shell--products' : ''].filter(Boolean).join(' ')}>
      <TopBar />
      <Navbar activePageHref={pageHash} cartItemCount={cartItemCount} wishlistCount={wishlistIds.length} isAuthenticated={Boolean(account)} />

      {isAboutPage ? (
        <AboutPage
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onShareProduct={handleShareProduct}
        />
      ) : isContactPage ? (
        <ContactPage />
      ) : isProductsPage ? (
        <ProductsPage
          key={currentHash}
          initialShoppingMode={currentHash.includes('mode=retail') ? 'retail' : 'wholesale'}
          initialProductFilter={new URLSearchParams(currentHash.split('?')[1] || '').get('product') || 'all'}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onShareProduct={handleShareProduct}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />
      ) : isWishlistPage ? (
        <WishlistPage wishlistIds={wishlistIds} onAddToCart={handleAddToCart} onRemove={handleToggleWishlist} onClear={() => { setWishlistIds([]); setToastMessage('Wishlist cleared.') }} />
      ) : isCartPage ? (
        <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateCartQuantity} onRemove={handleRemoveCartItem} onMoveToWishlist={handleMoveCartItemToWishlist} onCheckout={() => setToastMessage('Checkout is ready.')} />
      ) : isBuyNowPage ? (
        <BuyNowPage product={checkoutProduct} user={account} onComplete={() => setToastMessage('Order placed successfully.')} />
      ) : isLoginPage ? (
        <LoginPage onLogin={handleLogin} />
      ) : isRegisterPage ? (
        <RegisterPage onRegister={handleLogin} />
      ) : isAccountPage ? (
        <AccountPage user={account} onLogout={handleLogout} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onUpdateAccount={handleUpdateAccount} />
      ) : (
        <main className="home-main">
          <HeroBanner />
          <BrandStorySection
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onShareProduct={handleShareProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
          <FeaturesStrip className="mobile-home-features" />
          <HeritageSection />
          <ModeSelection />
          <BestsellersSection
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onShareProduct={handleShareProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
          <FactoryBanner />
        </main>
      )}

      {!isAuthPage && !isAccountPage && !isWishlistPage ? <Footer /> : null}
      <MobileBottomNav
        pageHash={pageHash}
        currentHash={currentHash}
        cartCount={cartItemCount}
        wishlistCount={wishlistIds.length}
        isAuthenticated={Boolean(account)}
      />
      <SiteToast message={toastMessage} />
    </div>
  )
}

export default App

