import { useEffect, useRef, useState } from 'react'
import './App.css'

const menuLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

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

const paymentMethods = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'Paytm']

const productCatalog = [
  {
    id: 'katarr-matar',
    name: 'Katarr Matar',
    weight: '150g',
    price: 25,
    image: '/ayush/product-katarr-matar.png',
    alt: 'Ayush Katarr Matar product pack',
  },
  {
    id: 'bhujia',
    name: 'Bhujia',
    weight: '150g',
    price: 25,
    image: '/ayush/product-bhujia.png',
    alt: 'Ayush Bhujia product pack',
  },
  {
    id: 'mixture',
    name: 'Mixture',
    weight: '150g',
    price: 25,
    image: '/ayush/product-mixture.png',
    alt: 'Ayush Mixture product pack',
  },
  {
    id: 'sattu',
    name: 'Ayush Sattu',
    weight: '500g',
    price: 65,
    image: '/ayush/product-sattu.png',
    alt: 'Ayush Sattu product pack',
  },
  {
    id: 'paneer-bhujia',
    name: 'Paneer Bhujia',
    weight: '150g',
    price: 30,
    image: '/ayush/product-paneer-bhujia.png',
    alt: 'Ayush Paneer Bhujia product pack',
  },
  {
    id: 'nimbu-bhujia',
    name: 'Nimbu Bhujia',
    weight: '150g',
    price: 25,
    image: '/ayush/product-nimbu-bhujia.png',
    alt: 'Ayush Nimbu Bhujia product pack',
  },
  {
    id: 'kursela-chanachur',
    name: 'Kursela Chanachur',
    weight: '200g',
    price: 35,
    image: '/ayush/product-kursela-chanachur.png',
    alt: 'Ayush Kursela Chanachur product pack',
  },
]

function Icon({ name, className = '' }) {
  switch (name) {
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
    default:
      return null
  }
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
  return (
    <div className="announcement-bar">
      <div className="shell-content announcement-bar__inner">
        <p>Pure Ingredients. Authentic Taste. Ayush Quality.</p>
        <p className="announcement-bar__delivery">
          <Icon name="truck" className="announcement-bar__icon" />
          Delivering Happiness Across India
        </p>
      </div>
    </div>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)

    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="shell-content site-header__inner">
        <a className="brand-mark" href="#home" aria-label="Ayush Kursela home">
          <img src="/ayush/logo.png" alt="Ayush Kursela logo" />
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} className="menu-toggle__icon" />
        </button>

        <div
          className={['site-header__panel', menuOpen ? 'is-open' : '']
            .filter(Boolean)
            .join(' ')}
          id="site-navigation"
        >
          <nav className="site-nav" aria-label="Primary">
            {menuLinks.map((item, index) => (
              <a
                key={item.label}
                className={index === 0 ? 'is-active' : ''}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <button type="button" className="icon-button" aria-label="Profile">
              <Icon name="user" className="icon-button__icon" />
            </button>
            <button type="button" className="icon-button" aria-label="Shopping cart">
              <Icon name="cart" className="icon-button__icon" />
            </button>
          </div>
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
            className="full-bleed-image"
          />
        </div>
      </div>
    </Reveal>
  )
}

function ProductCard({ isWishlisted, onToggleWishlist, product }) {
  return (
    <article className="product-card">
      <button
        type="button"
        className={['product-card__wishlist', isWishlisted ? 'is-active' : '']
          .filter(Boolean)
          .join(' ')}
        aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={isWishlisted}
        onClick={() => onToggleWishlist(product.id)}
      >
        <Icon
          name={isWishlisted ? 'heart-filled' : 'heart'}
          className="product-card__wishlist-icon"
        />
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
        <h3>{product.name}</h3>
        <p className="product-card__weight">{product.weight}</p>
        <p className="product-card__price">{`\u20B9${product.price}`}</p>
      </div>

      <button type="button" className="product-card__button">
        <Icon name="cart" className="product-card__button-icon" />
        Buy Now
      </button>
    </article>
  )
}

function ProductCarousel() {
  const trackRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [wishlistState, setWishlistState] = useState(() =>
    Object.fromEntries(productCatalog.map((product) => [product.id, false])),
  )

  useEffect(() => {
    const track = trackRef.current

    if (!track) {
      return undefined
    }

    const syncScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth
      setCanScrollPrev(track.scrollLeft > 4)
      setCanScrollNext(track.scrollLeft < maxScrollLeft - 4)
    }

    const pendingImages = Array.from(track.querySelectorAll('img'))
      .filter((image) => !image.complete)

    pendingImages.forEach((image) => image.addEventListener('load', syncScrollState))

    track.addEventListener('scroll', syncScrollState, { passive: true })
    window.addEventListener('resize', syncScrollState)

    let resizeObserver

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncScrollState)
      resizeObserver.observe(track)
    }

    syncScrollState()

    return () => {
      pendingImages.forEach((image) => image.removeEventListener('load', syncScrollState))
      track.removeEventListener('scroll', syncScrollState)
      window.removeEventListener('resize', syncScrollState)

      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  const scrollProducts = (direction) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const firstCard = track.querySelector('.product-card')
    const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0
    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width
      : track.clientWidth

    const cardsPerStep = Math.max(
      1,
      Math.round((track.clientWidth + gap) / Math.max(cardWidth + gap, 1)),
    )

    const scrollAmount = cardWidth * cardsPerStep + gap * cardsPerStep

    track.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  const toggleWishlist = (productId) => {
    setWishlistState((current) => ({
      ...current,
      [productId]: !current[productId],
    }))
  }

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

          <div className="product-carousel__viewport" ref={trackRef}>
            <div className="product-carousel__track">
              {productCatalog.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={Boolean(wishlistState[product.id])}
                  onToggleWishlist={toggleWishlist}
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
        <a className="product-carousel__cta" href="#shopping-modes">
          Explore more
        </a>
      </div>
    </div>
  )
}

function BrandStorySection() {
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

          <div className="brand-story-stage__carousel">
            <ProductCarousel />
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

function ModeSelection() {
  return (
    <Reveal as="section" className="mode-section" id="shopping-modes">
      <div className="shell-content">
        <div className="mode-grid">
          <a
            className="mode-card"
            href="#shopping-modes"
            aria-label="Explore retail mode for individual customers"
          >
            <img
              src="/ayush/retail-card.png"
              alt="Retail mode card for individual customers"
              loading="lazy"
            />
          </a>

          <span className="mode-or-badge" aria-hidden="true">
            OR
          </span>

          <div className="mode-or-badge mode-or-badge--mobile" aria-hidden="true">
            OR
          </div>

          <a
            className="mode-card"
            href="#contact"
            aria-label="Enquire about wholesale mode for business and resellers"
          >
            <img
              src="/ayush/wholesale-card.png"
              alt="Wholesale mode card for business and resellers"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

function FactoryBanner() {
  return (
    <Reveal as="section" className="factory-section" id="about">
      <div className="shell-content">
        <div className="factory-banner">
          <div className="factory-banner__media factory-banner__media--left">
            <img
              src="/ayush/factory-bowls.png"
              alt="Bowls of Ayush namkeen varieties"
              loading="lazy"
            />
          </div>

          <div className="factory-banner__content">
            <img
              className="factory-banner__logo"
              src="/ayush/logo.png"
              alt="Ayush Kursela logo"
              loading="lazy"
            />
            <p className="factory-banner__eyebrow">Authentic Taste</p>
            <h2>Since Generations</h2>
            <p className="factory-banner__copy">
              Ayush Kursela Dalmot is made with carefully selected ingredients and
              time-honored recipes that bring you the taste of trust, purity, and
              quality in every bite.
            </p>

            <div className="factory-banner__benefits">
              {factoryBenefits.map((item) => (
                <div key={item.label} className="factory-benefit">
                  <span className="factory-benefit__icon">
                    <Icon name={item.icon} className="stroke-icon" />
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="factory-banner__media factory-banner__media--right">
            <img
              src="/ayush/factory-building.png"
              alt="Ayush Kursela Dalmot factory building"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function FeaturesStrip() {
  return (
    <Reveal as="section" className="feature-strip">
      <div className="shell-content">
        <div className="feature-strip__grid">
          {featureItems.map((item) => (
            <article key={item.title} className="feature-item">
              <div className="feature-item__icon">
                <Icon name={item.icon} className="stroke-icon" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
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
  return (
    <Reveal as="footer" className="page-footer" id="contact">
      <div className="shell-content">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/ayush/logo.png" alt="Ayush Kursela logo" className="footer-brand__logo" />
            <h3>Pure Taste. Trusted Quality.</h3>
            <p>
              From our kitchen to your home, delicious snacks made with love and
              the finest ingredients since 1989.
            </p>

            <div className="social-links">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="social-link"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  <img src={item.icon} alt="" loading="lazy" />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Quick Links" items={footerLinks.quickLinks} />
          <LinkColumn title="Our Products" items={footerLinks.products} />
          <LinkColumn title="Customer Care" items={footerLinks.customerCare} />

          <div className="footer-column footer-column--contact">
            <h3>Contact Us</h3>
            <div className="contact-list">
              <ContactRow
                icon="phone"
                title="+91 12345 67890"
                body="Mon - Sat: 9AM to 6PM"
                note="Call us for orders and support"
              />
              <ContactRow
                icon="mail"
                title="info@ayushkursela.com"
                body="We reply within 24hrs"
                note="Reach us for product and business queries"
              />
              <ContactRow
                icon="pin"
                title="Ayush Kursela, India"
                body="Bihar, India - 852123"
                note="Serving premium namkeen across India"
              />
            </div>
          </div>
        </div>

        <div className="newsletter-panel">
          <div className="newsletter-panel__intro">
            <span className="newsletter-panel__icon">
              <Icon name="mail-filled" className="stroke-icon" />
            </span>
            <div>
              <h3>Stay Updated</h3>
              <p>
                Subscribe to get updates on new products, offers & exclusive
                deals.
              </p>
            </div>
          </div>

          <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
            <button type="submit">Subscribe</button>
          </form>

          <div className="newsletter-panel__packs" aria-hidden="true">
            <img src="/ayush/newsletter-packs.png" alt="" loading="lazy" />
          </div>
        </div>

        <div className="trust-strip">
          <div className="trust-strip__items">
            {trustItems.map((item) => (
              <div key={item.title} className="trust-item">
                <div className="trust-item__icon">
                  <Icon name={item.icon} className="stroke-icon" />
                </div>
                <div>
                  <p className="trust-item__title">{item.title}</p>
                  <p className="trust-item__description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-methods">
            <span className="payment-methods__label">We Accept</span>
            <div className="payment-methods__list" aria-label="Accepted payment methods">
              {paymentMethods.map((item) => (
                <span key={item} className="payment-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="footer-copyright">(c) 2026 Ayush Kursela. All Rights Reserved.</p>
      </div>
    </Reveal>
  )
}

function App() {
  return (
    <div className="site-shell">
      <TopBar />
      <Navbar />

      <main>
        <HeroBanner />
        <BrandStorySection />
        <ArtworkSection
          id="heritage"
          src="/ayush/heritage-scene.png"
          alt="Bihar heritage illustration with temple and camel riders"
          className="artwork-section--heritage"
        />
        <ModeSelection />
        <FactoryBanner />
        <FeaturesStrip />
      </main>

      <Footer />
    </div>
  )
}

export default App
