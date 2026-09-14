// Header and navigation
const header = document.querySelector('[data-header]') || document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const closeMenu = () => { if (!header?.classList.contains('menu-open')) return; header.classList.remove('menu-open'); menuToggle?.setAttribute('aria-expanded', 'false'); menuToggle?.setAttribute('aria-label', 'Open menu'); };
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
menuToggle?.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); if (open) nav?.querySelector('a')?.focus(); });
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (header?.classList.contains('menu-open') && !header.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && header?.classList.contains('menu-open')) closeMenu(); if (!header?.classList.contains('menu-open') || event.key !== 'Tab') return; const focusable = [menuToggle, ...nav.querySelectorAll('a')].filter(Boolean); const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } });

// Services carousel: native scrolling is the baseline; buttons enhance it.
const servicesTrack = document.querySelector('[data-services-track]');
const servicesPrev = document.querySelector('[data-services-prev]');
const servicesNext = document.querySelector('[data-services-next]');
const getServiceScrollAmount = () => { const card = servicesTrack?.querySelector('.service-card'); if (!card) return 0; const styles = getComputedStyle(servicesTrack); const gap = parseFloat(styles.columnGap) || parseFloat(styles.gap) || 0; return card.getBoundingClientRect().width + gap; };
const updateServiceControls = () => { if (!servicesTrack || !servicesPrev || !servicesNext) return; const maxScroll = Math.max(0, servicesTrack.scrollWidth - servicesTrack.clientWidth); servicesPrev.disabled = servicesTrack.scrollLeft <= 2; servicesNext.disabled = servicesTrack.scrollLeft >= maxScroll - 2; };
servicesPrev?.addEventListener('click', () => servicesTrack?.scrollBy({ left: -getServiceScrollAmount(), behavior: 'smooth' }));
servicesNext?.addEventListener('click', () => servicesTrack?.scrollBy({ left: getServiceScrollAmount(), behavior: 'smooth' }));
servicesTrack?.addEventListener('scroll', updateServiceControls, { passive: true });
window.addEventListener('resize', updateServiceControls); updateServiceControls();

// Forms
const formEndpoint = window.SITE_DATA?.formEndpoint || '';
const handleForm = (form, kind) => { const status = form.querySelector('[data-form-status]'); form.addEventListener('submit', async event => { event.preventDefault(); if (!form.checkValidity()) { form.reportValidity(); status.textContent = 'Please check the highlighted fields.'; status.className = 'form-status is-error'; return; } const file = form.querySelector('[data-cv-input]')?.files?.[0]; if (file && (file.size > 5 * 1024 * 1024 || !/^application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)$/.test(file.type))) { status.textContent = 'Please choose a PDF, DOC or DOCX file smaller than 5 MB.'; status.className = 'form-status is-error'; return; } if (!formEndpoint) { const company = window.SITE_DATA || {}; const recipient = kind === 'careers' ? (company.careersEmail || 'HR@frontiertowers.com.pk') : (company.primaryEmail || 'info@frontiertowers.com.pk'); const values = Object.fromEntries(new FormData(form)); const subject = kind === 'careers' ? 'Career interest — Frontier Towers' : `Website enquiry — ${values.service || 'General enquiry'}`; const body = Object.entries(values).filter(([key, value]) => key !== 'cv' && value).map(([key, value]) => `${key}: ${value}`).join('\n'); window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; status.textContent = `Your email draft is ready for ${recipient}.`; status.className = 'form-status is-note'; return; } const button = form.querySelector('button[type="submit"]'); button.disabled = true; button.setAttribute('aria-busy', 'true'); status.textContent = 'Sending…'; try { const response = await fetch(formEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }); if (!response.ok) throw new Error('Request failed'); status.textContent = 'Thanks — your submission has been sent.'; status.className = 'form-status is-success'; form.reset(); } catch { status.textContent = 'We could not send this submission. Please use the email address shown here.'; status.className = 'form-status is-error'; } finally { button.disabled = false; button.removeAttribute('aria-busy'); } }); };
document.querySelectorAll('[data-form-status]').forEach((status, index) => { if (!status.id) status.id = `form-status-${index + 1}`; status.closest('form')?.querySelectorAll('input,select,textarea').forEach(field => field.setAttribute('aria-describedby', status.id)); });
document.querySelectorAll('[data-contact-form]').forEach(form => handleForm(form, 'contact')); document.querySelectorAll('[data-careers-form]').forEach(form => handleForm(form, 'careers'));

// Reveal animations and image handling
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } }), { threshold: 0.12 }); document.querySelectorAll('.reveal').forEach(element => observer.observe(element)); } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
document.querySelectorAll('img').forEach(image => image.addEventListener('error', () => { image.removeAttribute('src'); image.classList.add('image-failed'); }));

// Market marquee
const marketMarquee = document.querySelector('[data-market-marquee]');
if (marketMarquee) { const marketTrack = marketMarquee.querySelector('.market-track'); if (marketTrack) { const marketClone = marketTrack.cloneNode(true); marketClone.setAttribute('aria-hidden', 'true'); marketTrack.after(marketClone); } }