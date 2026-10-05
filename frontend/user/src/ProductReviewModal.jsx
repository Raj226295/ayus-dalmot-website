import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './product-review-modal.css'

const initialForm = account => ({ rating: 0, title: '', content: '', email: account?.email || '', displayName: account?.name || '', anonymous: false, images: [] })

function StarIcon({ filled = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.6 2.88 5.83 6.44.94-4.66 4.54 1.1 6.41L12 17.29l-5.76 3.03 1.1-6.41-4.66-4.54 6.44-.94L12 2.6Z" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" /></svg>
}

function RatingPicker({ value, onChange, label = 'rating' }) {
  const [hovered, setHovered] = useState(0)
  const shown = hovered || value
  return <div className="product-review-stars" role="radiogroup" aria-label={label} onMouseLeave={() => setHovered(0)}>{[1,2,3,4,5].map(star => <button key={star} type="button" role="radio" aria-checked={value === star} aria-label={`${star} out of 5 stars`} className={star <= shown ? 'is-active' : ''} onMouseEnter={() => setHovered(star)} onFocus={() => setHovered(star)} onBlur={() => setHovered(0)} onClick={() => onChange(star)}><StarIcon filled={star <= shown} /></button>)}</div>
}

export default function ProductReviewModal({ product, account, apiUrl, openerRef, onClose, onSubmitted }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => initialForm(account))
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submittedReview, setSubmittedReview] = useState(null)
  const [storeRating, setStoreRating] = useState(0)
  const [discardOpen, setDiscardOpen] = useState(false)
  const dialogRef = useRef(null)
  const fileRef = useRef(null)
  const dirty = Boolean(form.rating || form.title || form.content || form.email !== (account?.email || '') || form.displayName !== (account?.name || '') || form.anonymous || form.images.length)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const dialog = dialogRef.current
    dialog?.querySelector('button, input, textarea, [href]')?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') { event.preventDefault(); requestClose() }
      if (event.key !== 'Tab' || !dialog) return
      const focusable = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [href], [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0], last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); openerRef?.current?.focus() }
  }, [])

  const requestClose = () => {
    if (!submittedReview && dirty) setDiscardOpen(true)
    else onClose()
  }
  const chooseRating = rating => { setForm(current => ({ ...current, rating })); setError(''); window.setTimeout(() => setStep(2), 210) }
  const nextFromReview = () => {
    const content = form.content.trim()
    if (content.length < 10) { setError('Please write at least 10 characters about your experience.'); return }
    if (content.length > 2000) { setError('Review content cannot exceed 2000 characters.'); return }
    setError(''); setStep(3)
  }
  const nextFromAbout = () => {
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) { setError('Please enter a valid email address.'); return }
    if (form.displayName.trim().length < 2) { setError('Please enter your display name.'); return }
    setError(''); setStep(4)
  }
  const addImages = async fileList => {
    const files = [...(fileList || [])]
    if (form.images.length + files.length > 5) { setError('You can upload up to 5 images.'); return }
    const invalid = files.find(file => !['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)
    if (invalid) { setError('Use JPEG, PNG or WebP images up to 5 MB each.'); return }
    const images = await Promise.all(files.map(file => new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, url: reader.result }); reader.readAsDataURL(file) })))
    setForm(current => ({ ...current, images: [...current.images, ...images] })); setError('')
  }
  const submit = async () => {
    if (!form.rating || form.content.trim().length < 10 || !/^\S+@\S+\.\S+$/.test(form.email.trim()) || form.displayName.trim().length < 2) { setError('Please complete all required review information.'); return }
    setSubmitting(true); setError('')
    try {
      const response = await fetch(`${apiUrl}/reviews`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product.id, productName: product.name, productImage: product.image, rating: form.rating, reviewTitle: form.title.trim(), reviewContent: form.content.trim(), displayName: form.displayName.trim(), email: form.email.trim(), anonymous: form.anonymous, reviewImages: form.images.map(image => image.url) }) })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload.message || 'Review could not be submitted.')
      setSubmittedReview(payload.review); setStep(5); onSubmitted?.(payload.review)
    } catch (submitError) { setError(submitError.message || 'Review could not be submitted. Please try again.') }
    finally { setSubmitting(false) }
  }
  const saveStoreRating = async rating => {
    setStoreRating(rating)
    if (!submittedReview?.id) return
    fetch(`${apiUrl}/reviews/${encodeURIComponent(submittedReview.id)}/store-rating`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rating }) }).catch(() => undefined)
  }

  const actions = step < 5 && step > 1 ? <footer className="product-review-actions"><button type="button" className="is-back" onClick={() => { setError(''); setStep(current => current - 1) }}>← <span>Back</span></button><button type="button" className="is-primary" disabled={submitting} onClick={step === 2 ? nextFromReview : step === 3 ? nextFromAbout : submit}>{submitting ? 'Submitting…' : step === 4 ? 'Submit Review' : 'Next →'}</button></footer> : null

  return createPortal(<div className="product-review-overlay" onMouseDown={event => event.target === event.currentTarget && requestClose()}>
    <section ref={dialogRef} className="product-review-modal" role="dialog" aria-modal="true" aria-labelledby="product-review-title">
      <button type="button" className="product-review-close" aria-label="Close review form" onClick={requestClose}>×</button>
      {step < 5 ? <div className="product-review-progress" aria-label={`Step ${step} of 4`}>{[1,2,3,4].map(item => <i className={item <= step ? 'is-active' : ''} key={item} />)}</div> : null}
      <div className="product-review-step" key={step}>
        {step === 1 ? <div className="product-review-rating-step"><header><h2 id="product-review-title">How would you rate this product?</h2><p>We would love it if you would share a bit about your experience.</p></header><img src={product.image} alt={product.alt || product.name}/><h3>{product.name}</h3><RatingPicker value={form.rating} onChange={chooseRating} label={`Rate ${product.name}`} /><div className="product-review-scale"><span>Poor</span><span>Great</span></div>{error ? <p className="product-review-error">{error}</p> : null}</div> : null}
        {step === 2 ? <div className="product-review-form-step"><header><h2 id="product-review-title">{product.name}</h2><RatingPicker value={form.rating} onChange={rating => setForm(current => ({ ...current, rating }))} label={`Selected rating for ${product.name}`} /><div className="product-review-scale"><span>Poor</span><span>Great</span></div></header><label>Review content (Required)<textarea value={form.content} minLength="10" maxLength="2000" onChange={event => setForm(current => ({ ...current, content: event.target.value }))} placeholder="Start writing here…"/><small>{form.content.length}/2000</small></label><label>Review Title<input value={form.title} maxLength="150" onChange={event => setForm(current => ({ ...current, title: event.target.value }))} placeholder="Give your review a title"/></label><p className="product-review-legal">We'll only contact you about your review if necessary. By submitting your review, you agree to our <a href="#terms">terms and conditions</a> and <a href="#terms">privacy policy</a>.</p></div> : null}
        {step === 3 ? <div className="product-review-form-step"><header><h2 id="product-review-title">About you</h2><p>Please tell us more about you.</p></header><label>Email address (Required)<input type="email" value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} placeholder="Your email address"/><small>We respect your privacy.</small></label><label>Display name (Required)<input value={form.displayName} onChange={event => setForm(current => ({ ...current, displayName: event.target.value }))} placeholder="Display name"/></label><label className="product-review-checkbox"><input type="checkbox" checked={form.anonymous} onChange={event => setForm(current => ({ ...current, anonymous: event.target.checked }))}/><span>Post review as anonymous</span></label></div> : null}
        {step === 4 ? <div className="product-review-photo-step"><header><h2 id="product-review-title">Share a picture</h2><p>Upload a photo to support your review.</p></header><button type="button" className="product-review-dropzone" onClick={() => fileRef.current?.click()} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); addImages(event.dataTransfer.files) }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V3m0 0L7 8m5-5 5 5M5 14v6h14v-6"/></svg><strong>Click to upload or drag and drop</strong><span>Up to 5 JPEG, PNG or WebP photos · 5 MB each</span></button><input ref={fileRef} className="sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={event => { addImages(event.target.files); event.target.value = '' }}/>{form.images.length ? <div className="product-review-previews">{form.images.map((image,index) => <figure key={`${image.name}-${index}`}><img src={image.url} alt={`Review upload ${index + 1}`}/><button type="button" aria-label={`Remove ${image.name}`} onClick={() => setForm(current => ({ ...current, images: current.images.filter((_,itemIndex) => itemIndex !== index) }))}>×</button></figure>)}</div> : null}</div> : null}
        {step === 5 ? <div className="product-review-success"><h2 id="product-review-title">Thanks for your review!</h2><p>We are processing it and it will appear on the store after moderation.</p><h3>Would you like to share your experience<br/>of shopping with us?</h3><p>We value your feedback and use it to improve. Please share any thoughts or suggestions you have.</p><RatingPicker value={storeRating} onChange={saveStoreRating} label="Rate your shopping experience"/><div className="product-review-scale"><span>Poor</span><span>Great</span></div><button type="button" className="product-review-success-close" onClick={onClose}>Close</button></div> : null}
      </div>
      {error ? <p className="product-review-error" role="alert">{error}</p> : null}
      {actions}
      {discardOpen ? <div className="product-review-discard" role="alertdialog" aria-modal="true" aria-labelledby="discard-review-title"><div><h3 id="discard-review-title">Discard your review?</h3><p>Your entered review information will be lost.</p><span><button type="button" onClick={() => setDiscardOpen(false)}>Keep Writing</button><button type="button" className="is-danger" onClick={onClose}>Discard</button></span></div></div> : null}
    </section>
  </div>, document.body)
}
