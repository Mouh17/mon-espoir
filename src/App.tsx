import { useState } from 'react'
import AdminPage from './pages/AdminPage'
import { supabase } from './lib/supabaseClient'
import { LangProvider, useLang, treatmentItemsData, credentialsData, galleryCasesData, offersData, packagesData } from './lib/i18n'

import drEsmaImg from './imports/Mobesser_Esma.jpg'
import beforeAfterChinImg from './imports/481234830_652878670583573_5156618047632366556_n.jpg'
import beforeAfterLipsImg from './imports/487455454_670159365522170_6398878267319666788_n.jpg'
import beforeAfterProfileImg from './imports/594969437_867587595779345_1129263964073090330_n.jpg'
import promoLumiereImg from './imports/789594424_1091456640059105_6249044475897090736_n.jpg'
import promoIntimaImg from './imports/789612391_1091456570059112_6178748215899378472_n.jpg'
import promoDouceurImg from './imports/790301030_1091456590059110_8168561585328786717_n.jpg'
import promoPeauSoieImg from './imports/791380880_1091456616725774_207929196390399073_n.jpg'

type Page = 'home' | 'treatments' | 'about' | 'gallery' | 'pricing' | 'contact' | 'book'

// ─── SVG Decorations ───────────────────────────────────────────────────────

function BotanicalLeaf({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 170 C60 170 10 120 10 70 C10 30 35 5 60 5 C85 5 110 30 110 70 C110 120 60 170 60 170Z" fill="#8B1A6B" opacity="0.15"/>
      <path d="M60 170 L60 5" stroke="#8B1A6B" strokeWidth="1" opacity="0.2"/>
      <path d="M60 50 C60 50 35 45 25 30" stroke="#8B1A6B" strokeWidth="0.8" opacity="0.15"/>
      <path d="M60 80 C60 80 30 72 18 55" stroke="#8B1A6B" strokeWidth="0.8" opacity="0.15"/>
      <path d="M60 110 C60 110 35 100 25 82" stroke="#8B1A6B" strokeWidth="0.8" opacity="0.15"/>
      <path d="M60 50 C60 50 85 45 95 30" stroke="#8B1A6B" strokeWidth="0.8" opacity="0.15"/>
      <path d="M60 80 C60 80 90 72 102 55" stroke="#8B1A6B" strokeWidth="0.8" opacity="0.15"/>
      <path d="M60 110 C60 110 85 100 95 82" stroke="#8B1A6B" strokeWidth="0.8" opacity="0.15"/>
    </svg>
  )
}

function GoldDivider() {
  return <div className="divider-gold my-8" />
}

// ─── Logo ──────────────────────────────────────────────────────────────────

function Logo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const dim = { sm: 36, md: 44, lg: 60 }[size]
  const textSize = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl' }[size]
  return (
    <div className="flex items-center gap-2.5">
      <svg width={dim} height={dim} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="40" fill="#8B1A6B"/>
        <ellipse cx="40" cy="30" rx="11" ry="15" fill="none" stroke="#F5E6C8" strokeWidth="1.2" transform="rotate(-20 40 30)"/>
        <ellipse cx="40" cy="30" rx="11" ry="15" fill="none" stroke="#F5E6C8" strokeWidth="1.2" transform="rotate(20 40 30)"/>
        <ellipse cx="40" cy="27" rx="7.5" ry="10" fill="#F5E6C8" opacity="0.92"/>
        <ellipse cx="40" cy="23" rx="3.5" ry="3" fill="#8B1A6B" opacity="0.3"/>
        <path d="M33 38 Q40 48 47 38" fill="none" stroke="#F5E6C8" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M36 55 Q40 60 44 55" fill="#F5E6C8" opacity="0.5"/>
      </svg>
      <span
        style={{ fontFamily: "'Great Vibes', cursive" }}
        className={`${textSize} leading-none ${light ? 'text-[#FAF6F0]' : 'text-[#8B1A6B]'}`}
      >
        Mon Espoir
      </span>
    </div>
  )
}

// ─── Header ────────────────────────────────────────────────────────────────

function Header({ currentPage, onNav }: { currentPage: Page; onNav: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const links: { labelKey: 'navHome' | 'navTreatments' | 'navGallery' | 'navAbout' | 'navPricing' | 'navContact'; page: Page }[] = [
    { labelKey: 'navHome', page: 'home' },
    { labelKey: 'navTreatments', page: 'treatments' },
    { labelKey: 'navGallery', page: 'gallery' },
    { labelKey: 'navAbout', page: 'about' },
    { labelKey: 'navPricing', page: 'pricing' },
    { labelKey: 'navContact', page: 'contact' },
  ]

  const go = (p: Page) => { onNav(p); setMenuOpen(false); window.scrollTo(0, 0) }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-sm border-b border-[#E8DDD0]">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-20">
        <button onClick={() => go('home')} className="flex-shrink-0">
          <Logo size="md" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`nav-link font-display text-sm font-medium tracking-wide transition-colors ${currentPage === l.page ? 'text-[#8B1A6B] active' : 'text-[#6B4C3B] hover:text-[#8B1A6B]'}`}
            >
              {t(l.labelKey)}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex rounded-full border border-[#C9A96E] overflow-hidden text-xs font-display font-semibold">
            {(['FR', 'AR'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 transition-colors ${lang === l ? 'bg-[#C9A96E] text-white' : 'text-[#C9A96E] hover:bg-[#C9A96E]/10'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => go('book')}
            className="bg-[#8B1A6B] hover:bg-[#6E1356] text-white font-display font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            {t('bookNowShort')}
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#8B1A6B] transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#8B1A6B] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#8B1A6B] transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-t border-[#E8DDD0] px-5 py-4 flex flex-col gap-3">
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`font-display text-sm font-medium text-left py-1.5 border-b border-[#E8DDD0] last:border-0 ${currentPage === l.page ? 'text-[#8B1A6B]' : 'text-[#6B4C3B]'}`}
            >
              {t(l.labelKey)}
            </button>
          ))}
          <div className="flex rounded-full border border-[#C9A96E] overflow-hidden text-xs font-display font-semibold w-fit">
            {(['FR', 'AR'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 transition-colors ${lang === l ? 'bg-[#C9A96E] text-white' : 'text-[#C9A96E]'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => go('book')}
            className="mt-2 bg-[#8B1A6B] text-white font-display font-semibold text-sm px-5 py-3 rounded-full"
          >
            {t('bookNowLong')}
          </button>
        </div>
      )}
    </header>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (p: Page) => void }) {
  const { t } = useLang()
  const go = (p: Page) => { onNav(p); window.scrollTo(0, 0) }
  return (
    <footer className="relative bg-[#2C1810] text-[#F5E6C8] overflow-hidden">
      <BotanicalLeaf className="absolute -right-10 top-0 w-48 opacity-10 rotate-12" />
      <BotanicalLeaf className="absolute -left-10 bottom-0 w-36 opacity-10 -rotate-12" />
      <div className="relative max-w-7xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Logo size="md" light />
          <p className="mt-4 text-sm text-[#C9A96E]/80 leading-relaxed font-body">
            {t('footerTagline')}
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-[#C9A96E]/40 flex items-center justify-center hover:bg-[#C9A96E]/20 transition-colors">
              <svg width="16" height="16" fill="#C9A96E" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-[#C9A96E]/40 flex items-center justify-center hover:bg-[#C9A96E]/20 transition-colors">
              <svg width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#C9A96E"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-[#C9A96E] tracking-wider text-xs uppercase mb-4">{t('footerQuickLinks')}</h4>
          <ul className="space-y-2">
            {([['home','navHome'],['treatments','navTreatments'],['gallery','navGallery'],['about','navAbout'],['pricing','navPricing'],['contact','navContact']] as [Page, 'navHome'|'navTreatments'|'navGallery'|'navAbout'|'navPricing'|'navContact'][]).map(([p,k]) => (
              <li key={p}><button onClick={() => go(p)} className="text-sm text-[#F5E6C8]/70 hover:text-[#C9A96E] transition-colors font-body">{t(k)}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-[#C9A96E] tracking-wider text-xs uppercase mb-4">{t('footerContact')}</h4>
          <ul className="space-y-3 text-sm font-body text-[#F5E6C8]/70">
            <li className="flex items-start gap-2">
              <svg width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 11.5 19.79 19.79 0 011.07 2.82 2 2 0 013.07 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              0699 99 20 07
            </li>
            <li className="flex items-start gap-2">
              <svg width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              contact@monespoir.dz
            </li>
            <li className="flex items-start gap-2">
              <svg width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="1.5" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {t('footerAddress')}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#C9A96E]/20 py-4 text-center text-xs text-[#F5E6C8]/30 font-body">
        {t('footerRights')}
      </div>
    </footer>
  )
}

// ─── Page: Home ────────────────────────────────────────────────────────────

function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  const { t, bi } = useLang()
  const go = (p: Page) => { onNav(p); window.scrollTo(0, 0) }

  const categories = [
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
      title: t('catMorpho'),
      desc: t('catMorphoDesc'),
      page: 'treatments' as Page,
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: t('catAntiAge'),
      desc: t('catAntiAgeDesc'),
      page: 'treatments' as Page,
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      ),
      title: t('catLaser'),
      desc: t('catLaserDesc'),
      page: 'treatments' as Page,
    },
  ]

  const offers = [
    { name: 'Clarity Lumière', ...offersData[0] },
    { name: 'Clarity Intima', ...offersData[1] },
    { name: 'Clarity Peau de Soie', ...offersData[2] },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#F2EBE0]">
        <BotanicalLeaf className="absolute right-0 top-0 w-64 md:w-96 opacity-15 translate-x-1/4 -translate-y-1/8" />
        <BotanicalLeaf className="absolute left-0 bottom-0 w-48 opacity-10 -translate-x-1/4 rotate-180" />
        <div className="max-w-7xl mx-auto px-5 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 py-16 items-center">
          <div className="relative z-10">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-4">
              {t('homeEyebrow')}
            </p>
            <h1
              style={{ fontFamily: "'Great Vibes', cursive" }}
              className="text-6xl md:text-7xl lg:text-8xl text-[#8B1A6B] leading-none mb-6"
            >
              {t('homeH1Line1')}<br />{t('homeH1Line2')}
            </h1>
            <div className="divider-gold mb-6 w-40" />
            <p className="font-body text-[#6B4C3B] text-lg leading-relaxed mb-8 max-w-md">
              {t('homeIntro')}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => go('book')}
                className="bg-[#8B1A6B] hover:bg-[#6E1356] text-white font-display font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-[#8B1A6B]/25"
              >
                {t('bookNowLong')}
              </button>
              <button
                onClick={() => go('treatments')}
                className="border border-[#C9A96E] text-[#8B1A6B] font-display font-semibold px-8 py-3.5 rounded-full hover:bg-[#C9A96E]/10 transition-colors"
              >
                {t('discoverTreatments')}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-2xl shadow-[#8B1A6B]/15">
              <img
                src={drEsmaImg}
                alt="Dr. Mobesser Esma — Cabinet Mon Espoir"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B1A6B]/30 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-[#FAF6F0] rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-[#E8DDD0]">
              <div className="w-10 h-10 bg-[#8B1A6B]/10 rounded-full flex items-center justify-center">
                <svg width="20" height="20" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <p className="font-display font-bold text-[#8B1A6B] text-sm">{t('badgePatients')}</p>
                <p className="font-body text-[#9E8E7A] text-xs">{t('badgeSatisfied')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pearl-bg py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">{t('specialtiesEyebrow')}</p>
            <h2 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl text-[#8B1A6B]">{t('ourTreatmentsTitle')}</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(c => (
              <div key={c.title} className="card-hover bg-white rounded-2xl p-8 border border-[#E8DDD0] shadow-sm flex flex-col">
                <div className="w-14 h-14 bg-[#8B1A6B]/8 rounded-xl flex items-center justify-center mb-5">
                  {c.icon}
                </div>
                <h3 className="font-display font-semibold text-[#2C1810] text-xl mb-3">{c.title}</h3>
                <p className="font-body text-[#6B4C3B] text-sm leading-relaxed flex-1">{c.desc}</p>
                <button
                  onClick={() => go(c.page)}
                  className="mt-6 text-[#8B1A6B] font-display font-semibold text-sm flex items-center gap-1.5 hover:gap-3 transition-all"
                >
                  {t('learnMore')} <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers teaser */}
      <section className="bg-[#F2EBE0] py-20 px-5 relative overflow-hidden">
        <BotanicalLeaf className="absolute -right-10 top-1/2 w-56 opacity-12 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">{t('offersEyebrow')}</p>
            <h2 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl text-[#8B1A6B]">{t('laserOffersTitle')}</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {offers.map(o => (
              <div key={o.name} className="card-hover bg-white rounded-2xl p-6 border border-[#E8DDD0] shadow-sm relative">
                {o.badge && (
                  <span className="absolute top-4 right-4 bg-[#C9A96E] text-white text-[10px] font-display font-bold tracking-wider px-2.5 py-1 rounded-full">
                    {bi(o.badge)}
                  </span>
                )}
                <div className="w-8 h-8 mb-4">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#8B1A6B" strokeWidth="1.5" strokeDasharray="4 2"/><circle cx="16" cy="16" r="5" fill="#8B1A6B" opacity="0.2"/><circle cx="16" cy="16" r="2" fill="#8B1A6B"/></svg>
                </div>
                <h3 className="font-display font-semibold text-[#2C1810] text-lg mb-1">{o.name}</h3>
                <p className="font-body text-[#9E8E7A] text-sm">{bi(o.desc)}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => go('pricing')}
              className="border border-[#8B1A6B] text-[#8B1A6B] font-display font-semibold px-8 py-3 rounded-full hover:bg-[#8B1A6B] hover:text-white transition-colors"
            >
              {t('seeAllPricing')}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#8B1A6B] py-14 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <BotanicalLeaf className="absolute -left-10 top-0 w-48" />
          <BotanicalLeaf className="absolute -right-10 bottom-0 w-36 rotate-180" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl text-[#F5E6C8] mb-3">
            {t('ctaTitle')}
          </h2>
          <p className="font-body text-[#F5E6C8]/80 mb-7 text-base">
            {t('ctaText')}
          </p>
          <button
            onClick={() => go('book')}
            className="bg-[#C9A96E] hover:bg-[#b8934d] text-[#2C1810] font-display font-bold px-10 py-4 rounded-full transition-colors shadow-lg"
          >
            {t('ctaButton')}
          </button>
        </div>
      </section>
    </div>
  )
}

// ─── Page: Treatments ──────────────────────────────────────────────────────

function TreatmentsPage({ onNav }: { onNav: (p: Page) => void }) {
  const { t, bi } = useLang()
  const categories = [
    { title: t('catMorpho'), color: '#8B1A6B', image: 'https://images.unsplash.com/photo-1570126737049-70d237c201de?w=600&h=400&fit=crop&auto=format', treatments: treatmentItemsData.morpho },
    { title: t('catAntiAge'), color: '#C9A96E', image: 'https://images.unsplash.com/photo-1637851496670-2bdc6c548d27?w=600&h=400&fit=crop&auto=format', treatments: treatmentItemsData.antiAge },
    { title: t('catLaser'), color: '#6E1356', image: 'https://images.unsplash.com/photo-1713085085470-fba013d67e65?w=600&h=400&fit=crop&auto=format', treatments: treatmentItemsData.laser },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -right-10 top-0 w-48 opacity-12" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">{t('treatmentsEyebrow')}</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">{t('ourTreatmentsTitle')}</h1>
        <GoldDivider />
        <p className="font-body text-[#6B4C3B] max-w-xl mx-auto text-base leading-relaxed">
          {t('treatmentsIntro')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-16 space-y-20">
        {categories.map(cat => (
          <div key={cat.title}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-12 rounded-full" style={{ background: cat.color }} />
              <h2 className="font-display font-bold text-3xl text-[#2C1810]">{cat.title}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-[#E8DDD0] aspect-[4/3]">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.treatments.map(tr => (
                  <div key={bi(tr.name)} className="card-hover bg-white rounded-xl p-5 border border-[#E8DDD0] shadow-sm">
                    <div className="w-5 h-5 rounded-full mb-3" style={{ background: cat.color, opacity: 0.2 }} />
                    <div className="w-2 h-2 rounded-full -mt-7 mb-4" style={{ background: cat.color }} />
                    <h3 className="font-display font-semibold text-[#2C1810] text-base mb-1.5">{bi(tr.name)}</h3>
                    <p className="font-body text-[#9E8E7A] text-sm leading-relaxed">{bi(tr.desc)}</p>
                    <button className="mt-3 text-sm font-display font-semibold hover:underline" style={{ color: cat.color }}>
                      {t('learnMore')} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#8B1A6B] py-12 px-5 text-center">
        <p style={{ fontFamily: "'Great Vibes', cursive" }} className="text-4xl text-[#F5E6C8] mb-4">
          {t('treatmentsBannerTitle')}
        </p>
        <button onClick={() => { onNav('contact'); window.scrollTo(0,0) }} className="bg-[#C9A96E] text-[#2C1810] font-display font-bold px-8 py-3.5 rounded-full transition-colors hover:bg-[#b8934d]">
          {t('contactUs')}
        </button>
      </div>
    </div>
  )
}

// ─── Page: About ───────────────────────────────────────────────────────────

function AboutPage() {
  const { t, bi } = useLang()

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -left-10 top-0 w-48 opacity-12 rotate-45" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">{t('aboutEyebrow')}</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">{t('aboutTitle')}</h1>
        <GoldDivider />
      </div>

      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-[#E8DDD0] shadow-xl shadow-[#8B1A6B]/10">
              <img
                src={drEsmaImg}
                alt="Dr. Mobesser Esma — Médecin morpho-esthétique"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/40 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-[#FAF6F0]/95 backdrop-blur-sm rounded-2xl p-4 border border-[#E8DDD0]">
              <p style={{ fontFamily: "'Great Vibes', cursive" }} className="text-2xl text-[#8B1A6B]">Dr. Mobesser Esma</p>
              <p className="font-display text-xs font-semibold tracking-wider text-[#C9A96E] uppercase mt-0.5">{t('drTitle')}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="pt-4">
            <h2 className="font-display font-bold text-3xl text-[#2C1810] mb-2">Dr. Mobesser Esma</h2>
            <p className="font-display text-sm font-semibold text-[#C9A96E] tracking-wider uppercase mb-6">{t('drSubtitle')}</p>
            <div className="divider-gold mb-7" />
            <div className="space-y-5 font-body text-[#6B4C3B] leading-relaxed text-[15px]">
              <p>{t('bioP1')}</p>
              <p>{t('bioP2')}</p>
              <p>{t('bioP3')}</p>
              <p>{t('bioP4')}</p>
            </div>

            <div className="mt-9">
              <h3 className="font-display font-semibold text-[#2C1810] text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#C9A96E] block" />
                {t('credentialsTitle')}
              </h3>
              <ul className="space-y-3">
                {credentialsData.map(c => (
                  <li key={bi(c)} className="flex items-start gap-3 font-body text-sm text-[#6B4C3B]">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    {bi(c)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page: Gallery ─────────────────────────────────────────────────────────

function GalleryPage() {
  const { t, bi } = useLang()
  const [selected, setSelected] = useState<number | null>(null)

  const cases = [
    { cat: t('catMorpho'), ...galleryCasesData[0], img: beforeAfterChinImg },
    { cat: t('catAntiAge'), ...galleryCasesData[1], img: beforeAfterLipsImg },
    { cat: t('catMorpho'), ...galleryCasesData[2], img: beforeAfterProfileImg },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -right-10 bottom-0 w-48 opacity-12" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">{t('galleryEyebrow')}</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">{t('galleryTitle')}</h1>
        <GoldDivider />
        <p className="font-body text-[#9E8E7A] text-sm italic">
          {t('galleryConsent')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="card-hover text-left rounded-2xl overflow-hidden border border-[#E8DDD0] shadow-sm group bg-white"
            >
              <div className="relative aspect-[4/5] bg-[#E8DDD0] overflow-hidden">
                <img src={c.img} alt={bi(c.label)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/50 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#8B1A6B] text-white text-xs font-display font-semibold px-2.5 py-1 rounded-full">
                  {c.cat}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-display font-semibold text-sm">{bi(c.label)}</p>
                </div>
              </div>
              <div className="p-4 flex gap-4">
                <div className="flex-1">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#9E8E7A] uppercase mb-0.5">{t('before')}</p>
                  <p className="font-body text-xs text-[#6B4C3B]">{bi(c.before)}</p>
                </div>
                <div className="w-px bg-[#E8DDD0]" />
                <div className="flex-1">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#C9A96E] uppercase mb-0.5">{t('after')}</p>
                  <p className="font-body text-xs text-[#6B4C3B]">{bi(c.after)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="bg-[#FAF6F0] rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-[4/3] bg-[#E8DDD0]">
              <img src={cases[selected].img} alt={bi(cases[selected].label)} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <span className="bg-[#8B1A6B]/10 text-[#8B1A6B] text-xs font-display font-semibold px-3 py-1 rounded-full">{cases[selected].cat}</span>
              <h3 className="font-display font-bold text-[#2C1810] text-xl mt-3 mb-4">{bi(cases[selected].label)}</h3>
              <div className="flex gap-6">
                <div className="flex-1 bg-[#F2EBE0] rounded-xl p-3">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#9E8E7A] uppercase mb-1">{t('before')}</p>
                  <p className="font-body text-sm text-[#6B4C3B]">{bi(cases[selected].before)}</p>
                </div>
                <div className="flex-1 bg-[#8B1A6B]/8 rounded-xl p-3">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#C9A96E] uppercase mb-1">{t('after')}</p>
                  <p className="font-body text-sm text-[#6B4C3B]">{bi(cases[selected].after)}</p>
                </div>
              </div>
              <p className="mt-4 text-[10px] font-body text-[#9E8E7A] italic">{t('lightboxConsent')}</p>
              <button onClick={() => setSelected(null)} className="mt-4 w-full bg-[#8B1A6B] text-white font-display font-semibold py-2.5 rounded-full hover:bg-[#6E1356] transition-colors">
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page: Pricing ─────────────────────────────────────────────────────────

function PricingPage({ onNav }: { onNav: (p: Page) => void }) {
  const { t, bi } = useLang()
  const packages = [
    { name: 'Clarity Lumière', img: promoLumiereImg, highlight: true, ...packagesData[0] },
    { name: 'Clarity Intima', img: promoIntimaImg, highlight: false, ...packagesData[1] },
    { name: 'Clarity Douceur', img: promoDouceurImg, highlight: false, ...packagesData[2] },
    { name: 'Clarity Peau de Soie', img: promoPeauSoieImg, highlight: false, ...packagesData[3] },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -left-10 top-0 w-48 opacity-12 rotate-12" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">{t('pricingEyebrow')}</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">{t('pricingTitle')}</h1>
        <GoldDivider />
        <p className="font-body text-[#9E8E7A] text-sm max-w-md mx-auto">
          {t('pricingIntro')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-14">
        {/* Laser packages */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-2xl text-[#2C1810] mb-2 flex items-center gap-3">
            <svg width="22" height="22" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" stroke="#8B1A6B" strokeWidth="1.5" strokeDasharray="4 2"/><circle cx="16" cy="16" r="5" fill="#8B1A6B" opacity="0.2"/><circle cx="16" cy="16" r="2" fill="#8B1A6B"/></svg>
            {t('packagesTitle')}
          </h2>
          <p className="font-body text-sm text-[#9E8E7A] mb-8">{t('packagesSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
          {packages.map(pkg => (
            <div
              key={pkg.name}
              className={`card-hover relative rounded-2xl border flex flex-col overflow-hidden ${pkg.highlight ? 'border-[#8B1A6B] shadow-xl shadow-[#8B1A6B]/30' : 'border-[#E8DDD0] shadow-sm'}`}
            >
              {pkg.badge && (
                <span className={`absolute top-3 right-3 z-10 text-[10px] font-display font-bold tracking-wider px-2.5 py-1 rounded-full shadow ${pkg.highlight ? 'bg-[#C9A96E] text-[#2C1810]' : 'bg-[#8B1A6B] text-white'}`}>
                  {bi(pkg.badge)}
                </span>
              )}
              {/* Promo image */}
              <div className="aspect-square w-full overflow-hidden bg-[#F2EBE0]">
                <img src={pkg.img} alt={`Forfait ${pkg.name}`} className="w-full h-full object-cover" />
              </div>
              <div className={`p-5 flex flex-col flex-1 ${pkg.highlight ? 'bg-[#8B1A6B]' : 'bg-white'}`}>
                <div className={`text-xs font-display font-semibold tracking-wider uppercase mb-1 ${pkg.highlight ? 'text-[#F5E6C8]/70' : 'text-[#C9A96E]'}`}>
                  {bi(pkg.subtitle)}
                </div>
                <h3 style={{ fontFamily: "'Great Vibes', cursive" }} className={`text-3xl mb-4 ${pkg.highlight ? 'text-[#F5E6C8]' : 'text-[#8B1A6B]'}`}>
                  {pkg.name}
                </h3>
                <div className={`text-[10px] font-display font-semibold tracking-wider uppercase mb-2 ${pkg.highlight ? 'text-[#F5E6C8]/60' : 'text-[#9E8E7A]'}`}>
                  {t('zonesIncluded')}
                </div>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {pkg.zones.map(z => (
                    <li key={bi(z)} className={`flex items-center gap-2 text-sm font-body ${pkg.highlight ? 'text-[#F5E6C8]/90' : 'text-[#6B4C3B]'}`}>
                      <svg width="12" height="12" fill="none" stroke={pkg.highlight ? '#C9A96E' : '#8B1A6B'} strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      {bi(z)}
                    </li>
                  ))}
                </ul>
                {pkg.offert.length > 0 && (
                  <div className={`rounded-xl p-3 mb-4 ${pkg.highlight ? 'bg-[#F5E6C8]/10' : 'bg-[#8B1A6B]/5'}`}>
                    <p className="text-[10px] font-display font-bold tracking-wider uppercase mb-1.5 text-[#C9A96E]">
                      {t('freeGift')}
                    </p>
                    {pkg.offert.map(o => (
                      <p key={bi(o)} className={`text-xs font-body ${pkg.highlight ? 'text-[#F5E6C8]/80' : 'text-[#6B4C3B]'}`}>· {bi(o)}</p>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => { onNav('book'); window.scrollTo(0,0) }}
                  className={`w-full py-3 rounded-full font-display font-semibold text-sm transition-colors ${pkg.highlight ? 'bg-[#C9A96E] text-[#2C1810] hover:bg-[#b8934d]' : 'border border-[#8B1A6B] text-[#8B1A6B] hover:bg-[#8B1A6B] hover:text-white'}`}
                >
                  {t('bookThisPackage')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F2EBE0] rounded-2xl p-6 border border-[#E8DDD0] text-center">
          <p className="font-body text-sm text-[#6B4C3B]">
            💡 {t('pricingNote')}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Page: Contact ─────────────────────────────────────────────────────────

function ContactPage() {
  const { t } = useLang()
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', objet: "Demande d'information", message: '' })
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [erreurEnvoi, setErreurEnvoi] = useState('')
  const [envoye, setEnvoye] = useState(false)

  const champ = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value })),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnvoiEnCours(true)
    setErreurEnvoi('')

    const { error } = await supabase.from('messages_contact').insert({
      prenom: form.prenom,
      nom: form.nom,
      email: form.email || null,
      telephone: form.telephone,
      objet: form.objet,
      message: form.message || null,
    })

    setEnvoiEnCours(false)

    if (error) {
      console.error(error)
      setErreurEnvoi(t('errorGeneric'))
      return
    }

    setEnvoye(true)
  }

  const infoItems = [
    {
      icon: <svg width="20" height="20" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 11.5 19.79 19.79 0 011.07 2.82 2 2 0 013.07 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
      title: t('callUs'),
      content: '0699 99 20 07',
      sub: t('callUsHours'),
    },
    {
      icon: <svg width="20" height="20" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      title: t('labelEmail'),
      content: 'contact@monespoir.dz',
      sub: t('emailUsSub'),
    },
    {
      icon: <svg width="20" height="20" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      title: t('ourAddress'),
      content: t('footerAddress'),
      sub: t('addressSub'),
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -right-8 top-0 w-48 opacity-12" />
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">{t('contactTitle')}</h1>
        <GoldDivider />
        <p className="font-body text-[#6B4C3B] max-w-sm mx-auto text-sm">
          {t('contactIntro')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-[#E8DDD0] shadow-sm">
          <h2 className="font-display font-bold text-2xl text-[#2C1810] mb-6">{t('sendMessageTitle')}</h2>
          {envoye ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🌿</div>
              <p className="font-display font-semibold text-lg text-[#8B1A6B] mb-1">{t('thankYou')}</p>
              <p className="font-body text-sm text-[#6B4C3B]">{t('messageSentText')}</p>
            </div>
          ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelFirstName')}</label>
                <input type="text" required {...champ('prenom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="Yasmine" />
              </div>
              <div>
                <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelLastName')}</label>
                <input type="text" required {...champ('nom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="Bouziane" />
              </div>
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelEmail')}</label>
              <input type="email" {...champ('email')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="yasmine@email.com" />
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">
                {t('labelPhone')} <span className="text-[#C9A96E]">*</span>
              </label>
              <input type="tel" required {...champ('telephone')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="0699 99 20 07" />
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelSubject')}</label>
              <select {...champ('objet')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#6B4C3B] bg-[#FAF6F0] appearance-none">
                <option value="Demande d'information">{t('optInfoRequest')}</option>
                <option value="Prise de rendez-vous">{t('optAppointment')}</option>
                <option value="Question sur un soin">{t('optTreatmentQuestion')}</option>
                <option value="Autre">{t('optOther')}</option>
              </select>
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelMessage')}</label>
              <textarea rows={4} {...champ('message')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0] resize-none" placeholder="Bonjour, je souhaite en savoir plus sur..." />
            </div>
            {erreurEnvoi && <p className="text-sm" style={{ color: '#B23A3A' }}>{erreurEnvoi}</p>}
            <button type="submit" disabled={envoiEnCours} className="w-full bg-[#8B1A6B] hover:bg-[#6E1356] text-white font-display font-semibold py-3.5 rounded-full transition-colors shadow-md shadow-[#8B1A6B]/20 disabled:opacity-50">
              {envoiEnCours ? t('sending') : t('sendMessage')}
            </button>
          </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          {infoItems.map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#E8DDD0] shadow-sm flex gap-4">
              <div className="w-10 h-10 bg-[#8B1A6B]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-[#2C1810]">{item.title}</p>
                <p className="font-body text-sm text-[#8B1A6B] font-medium mt-0.5">{item.content}</p>
                <p className="font-body text-xs text-[#9E8E7A] mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden border border-[#E8DDD0] shadow-sm bg-[#E8DDD0] aspect-video flex items-center justify-center relative">
            <div className="text-center">
              <svg width="32" height="32" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <p className="font-body text-xs text-[#9E8E7A]">{t('interactiveMap')}</p>
            </div>
          </div>

          {/* Social */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DDD0] shadow-sm">
            <p className="font-display font-semibold text-sm text-[#2C1810] mb-3">{t('followUs')}</p>
            <div className="flex gap-3">
              <a href="#" className="flex-1 flex items-center justify-center gap-2 border border-[#E8DDD0] rounded-xl py-2.5 hover:bg-[#8B1A6B]/5 transition-colors group">
                <svg width="16" height="16" fill="#8B1A6B" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                <span className="font-display text-xs font-semibold text-[#6B4C3B]">Facebook</span>
              </a>
              <a href="#" className="flex-1 flex items-center justify-center gap-2 border border-[#E8DDD0] rounded-xl py-2.5 hover:bg-[#8B1A6B]/5 transition-colors">
                <svg width="16" height="16" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#8B1A6B"/></svg>
                <span className="font-display text-xs font-semibold text-[#6B4C3B]">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page: Book ────────────────────────────────────────────────────────────

function BookPage() {
  const { t, bi } = useLang()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ prenom: '', nom: '', telephone: '', email: '', date: '' })
  const [service, setService] = useState<string | null>(null)
  const [envoiEnCours, setEnvoiEnCours] = useState(false)
  const [erreurEnvoi, setErreurEnvoi] = useState('')
  const [envoye, setEnvoye] = useState(false)

  const champ = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value })),
  })

  const services = [
    { cat: t('catMorpho'), items: treatmentItemsData.morpho },
    { cat: t('catAntiAge'), items: treatmentItemsData.antiAge },
    { cat: t('catLaser'), items: treatmentItemsData.laser },
  ]

  const handleConfirmer = async () => {
    if (!service) return
    setEnvoiEnCours(true)
    setErreurEnvoi('')

    const { error } = await supabase.from('rendez_vous').insert({
      prenom: form.prenom,
      nom: form.nom,
      telephone: form.telephone,
      email: form.email || null,
      date_disponible: form.date || null,
      service,
    })

    setEnvoiEnCours(false)

    if (error) {
      console.error(error)
      setErreurEnvoi(t('errorGeneric'))
      return
    }

    setEnvoye(true)
  }

  return (
    <div className="min-h-screen bg-[#F2EBE0]">
      <div className="max-w-5xl mx-auto px-5 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Left */}
        <div className="lg:col-span-2 pt-4">
          <BotanicalLeaf className="w-24 mb-4 opacity-40" />
          <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl text-[#8B1A6B] mb-4 leading-snug">
            {t('bookTitle')}
          </h1>
          <div className="divider-gold mb-5 w-32" />
          <p className="font-body text-[#6B4C3B] text-sm leading-relaxed">
            {t('bookIntro')}
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${step >= 1 ? 'bg-[#8B1A6B] text-white' : 'bg-[#E8DDD0] text-[#9E8E7A]'}`}>1</div>
              <span className={`font-display text-sm font-medium ${step >= 1 ? 'text-[#8B1A6B]' : 'text-[#9E8E7A]'}`}>{t('stepContactInfo')}</span>
            </div>
            <div className="ml-4 w-px h-6 bg-[#C9A96E]/40" />
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${step >= 2 ? 'bg-[#8B1A6B] text-white' : 'bg-[#E8DDD0] text-[#9E8E7A]'}`}>2</div>
              <span className={`font-display text-sm font-medium ${step >= 2 ? 'text-[#8B1A6B]' : 'text-[#9E8E7A]'}`}>{t('stepChooseTreatment')}</span>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl shadow-[#8B1A6B]/8 border border-[#E8DDD0] overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-[#E8DDD0]">
            {[{ n: 1, label: t('tabContact') }, { n: 2, label: t('tabTreatment') }].map(tb => (
              <button
                key={tb.n}
                onClick={() => tb.n < step || step === 2 ? setStep(tb.n) : undefined}
                className={`flex-1 py-4 font-display text-sm font-semibold transition-colors ${step === tb.n ? 'text-[#8B1A6B] border-b-2 border-[#8B1A6B] -mb-px' : 'text-[#9E8E7A]'}`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          <div className="p-7">
            {step === 1 && (
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); setStep(2) }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelFirstName')}</label>
                    <input type="text" required {...champ('prenom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="Yasmine" />
                  </div>
                  <div>
                    <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelLastName')}</label>
                    <input type="text" required {...champ('nom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="Bouziane" />
                  </div>
                </div>
                <div>
                  <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">
                    {t('labelPhone')} <span className="text-[#C9A96E]">*</span>
                  </label>
                  <input type="tel" required {...champ('telephone')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="0699 99 20 07" />
                </div>
                <div>
                  <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelEmail')}</label>
                  <input type="email" {...champ('email')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="yasmine@email.com" />
                </div>
                <div>
                  <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">{t('labelAvailability')}</label>
                  <input type="date" {...champ('date')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0] text-[#6B4C3B]" />
                </div>
                <button type="submit" className="w-full bg-[#8B1A6B] hover:bg-[#6E1356] text-white font-display font-semibold py-3.5 rounded-full transition-colors shadow-md shadow-[#8B1A6B]/20 flex items-center justify-center gap-2">
                  {t('nextStep')} <span className="text-lg">→</span>
                </button>
              </form>
            )}

            {step === 2 && !envoye && (
              <div>
                <p className="font-body text-sm text-[#6B4C3B] mb-6">{t('chooseServiceIntro')}</p>
                <div className="space-y-5">
                  {services.map(sc => (
                    <div key={sc.cat}>
                      <p className="font-display text-xs font-bold tracking-wider text-[#C9A96E] uppercase mb-2">{sc.cat}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sc.items.map(item => (
                          <button
                            key={bi(item.name)}
                            onClick={() => setService(bi(item.name))}
                            className={`text-left px-4 py-3 rounded-xl border text-sm font-body transition-all ${service === bi(item.name) ? 'border-[#8B1A6B] bg-[#8B1A6B]/8 text-[#8B1A6B] font-medium' : 'border-[#E8DDD0] text-[#6B4C3B] hover:border-[#8B1A6B]/40'}`}
                          >
                            {bi(item.name)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {erreurEnvoi && <p className="text-sm mt-4" style={{ color: '#B23A3A' }}>{erreurEnvoi}</p>}
                <div className="mt-6 pt-5 border-t border-[#E8DDD0] flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[#E8DDD0] text-[#9E8E7A] font-display font-semibold py-3 rounded-full hover:bg-[#F2EBE0] transition-colors">
                    {t('back')}
                  </button>
                  <button
                    onClick={handleConfirmer}
                    disabled={!service || envoiEnCours}
                    className={`flex-1 font-display font-semibold py-3 rounded-full transition-colors ${service ? 'bg-[#8B1A6B] hover:bg-[#6E1356] text-white shadow-md shadow-[#8B1A6B]/20' : 'bg-[#E8DDD0] text-[#9E8E7A] cursor-not-allowed'}`}
                  >
                    {envoiEnCours ? t('sending') : t('confirmRequest')}
                  </button>
                </div>
              </div>
            )}

            {envoye && (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">🌿</div>
                <p className="font-display font-semibold text-lg text-[#8B1A6B] mb-1">{t('thankYou')}</p>
                <p className="font-body text-sm text-[#6B4C3B]">{t('bookSuccessText')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────

export default function App() {
  // Page d'administration : accessible uniquement via l'URL directe /admin,
  // volontairement absente du menu de navigation public.
  if (window.location.pathname === '/admin') {
    return <AdminPage />
  }

  return (
    <LangProvider>
      <SiteShell />
    </LangProvider>
  )
}

function SiteShell() {
  const { lang } = useLang()
  const [page, setPage] = useState<Page>('home')

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNav={setPage} />
      case 'treatments': return <TreatmentsPage onNav={setPage} />
      case 'about': return <AboutPage />
      case 'gallery': return <GalleryPage />
      case 'pricing': return <PricingPage onNav={setPage} />
      case 'contact': return <ContactPage />
      case 'book': return <BookPage />
    }
  }

  return (
    <div dir={lang === 'AR' ? 'rtl' : 'ltr'} className="flex flex-col min-h-screen">
      <Header currentPage={page} onNav={p => { setPage(p); window.scrollTo(0, 0) }} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNav={p => { setPage(p); window.scrollTo(0, 0) }} />
    </div>
  )
}
