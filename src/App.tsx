import { useState } from 'react'
import AdminPage from './pages/AdminPage'
import { supabase } from './lib/supabaseClient'

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
  const [lang, setLang] = useState<'FR' | 'AR'>('FR')

  const links: { label: string; page: Page }[] = [
    { label: 'Accueil', page: 'home' },
    { label: 'Soins', page: 'treatments' },
    { label: 'Galerie', page: 'gallery' },
    { label: 'À propos', page: 'about' },
    { label: 'Tarifs & Offres', page: 'pricing' },
    { label: 'Contact', page: 'contact' },
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
              {l.label}
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
            Prendre RDV
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
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('book')}
            className="mt-2 bg-[#8B1A6B] text-white font-display font-semibold text-sm px-5 py-3 rounded-full"
          >
            Prendre rendez-vous
          </button>
        </div>
      )}
    </header>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (p: Page) => void }) {
  const go = (p: Page) => { onNav(p); window.scrollTo(0, 0) }
  return (
    <footer className="relative bg-[#2C1810] text-[#F5E6C8] overflow-hidden">
      <BotanicalLeaf className="absolute -right-10 top-0 w-48 opacity-10 rotate-12" />
      <BotanicalLeaf className="absolute -left-10 bottom-0 w-36 opacity-10 -rotate-12" />
      <div className="relative max-w-7xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Logo size="md" light />
          <p className="mt-4 text-sm text-[#C9A96E]/80 leading-relaxed font-body">
            Médecine morpho-esthétique,<br />anti-âge & laser-thérapie.<br />Dr. Mobesser Esma
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
          <h4 className="font-display font-semibold text-[#C9A96E] tracking-wider text-xs uppercase mb-4">Liens rapides</h4>
          <ul className="space-y-2">
            {([['home','Accueil'],['treatments','Soins'],['gallery','Galerie'],['about','À propos'],['pricing','Tarifs & Offres'],['contact','Contact']] as [Page,string][]).map(([p,l]) => (
              <li key={p}><button onClick={() => go(p)} className="text-sm text-[#F5E6C8]/70 hover:text-[#C9A96E] transition-colors font-body">{l}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-[#C9A96E] tracking-wider text-xs uppercase mb-4">Contact</h4>
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
              Alger, Algérie
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#C9A96E]/20 py-4 text-center text-xs text-[#F5E6C8]/30 font-body">
        © 2024 Mon Espoir · Tous droits réservés
      </div>
    </footer>
  )
}

// ─── Page: Home ────────────────────────────────────────────────────────────

function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  const go = (p: Page) => { onNav(p); window.scrollTo(0, 0) }

  const categories = [
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
      title: 'Morpho-esthétique',
      desc: 'Remodelage du visage et du corps par des techniques non-invasives adaptées à votre morphologie unique.',
      page: 'treatments' as Page,
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Anti-âge',
      desc: 'Traitements de pointe pour atténuer les rides, restaurer la fermeté et retrouver un teint lumineux.',
      page: 'treatments' as Page,
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      ),
      title: 'Laser-thérapie',
      desc: 'Épilation définitive et traitements cutanés par laser Clarity de dernière génération.',
      page: 'treatments' as Page,
    },
  ]

  const offers = [
    { name: 'Clarity Lumière', desc: 'Corps complet + bras offerts', badge: 'POPULAIRE' },
    { name: 'Clarity Intima', desc: 'Zones intimes + maillot offert', badge: null },
    { name: 'Clarity Peau de Soie', desc: 'Visage complet + lèvres offertes', badge: 'NOUVEAU' },
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
              Médecine morpho-esthétique · Anti-âge · Laser
            </p>
            <h1
              style={{ fontFamily: "'Great Vibes', cursive" }}
              className="text-6xl md:text-7xl lg:text-8xl text-[#8B1A6B] leading-none mb-6"
            >
              Révélez votre<br />éclat naturel
            </h1>
            <div className="divider-gold mb-6 w-40" />
            <p className="font-body text-[#6B4C3B] text-lg leading-relaxed mb-8 max-w-md">
              Sous la direction du <strong>Dr. Mobesser Esma</strong>, notre clinique vous offre une approche personnalisée alliant expertise médicale et soin holistique.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => go('book')}
                className="bg-[#8B1A6B] hover:bg-[#6E1356] text-white font-display font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-[#8B1A6B]/25"
              >
                Prendre rendez-vous
              </button>
              <button
                onClick={() => go('treatments')}
                className="border border-[#C9A96E] text-[#8B1A6B] font-display font-semibold px-8 py-3.5 rounded-full hover:bg-[#C9A96E]/10 transition-colors"
              >
                Découvrir nos soins
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
                <p className="font-display font-bold text-[#8B1A6B] text-sm">+500 Patientes</p>
                <p className="font-body text-[#9E8E7A] text-xs">satisfaites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pearl-bg py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">Nos spécialités</p>
            <h2 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl text-[#8B1A6B]">Nos soins</h2>
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
                  En savoir plus <span>→</span>
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
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">Promotions en cours</p>
            <h2 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl text-[#8B1A6B]">Nos offres laser</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {offers.map(o => (
              <div key={o.name} className="card-hover bg-white rounded-2xl p-6 border border-[#E8DDD0] shadow-sm relative">
                {o.badge && (
                  <span className="absolute top-4 right-4 bg-[#C9A96E] text-white text-[10px] font-display font-bold tracking-wider px-2.5 py-1 rounded-full">
                    {o.badge}
                  </span>
                )}
                <div className="w-8 h-8 mb-4">
                  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#8B1A6B" strokeWidth="1.5" strokeDasharray="4 2"/><circle cx="16" cy="16" r="5" fill="#8B1A6B" opacity="0.2"/><circle cx="16" cy="16" r="2" fill="#8B1A6B"/></svg>
                </div>
                <h3 className="font-display font-semibold text-[#2C1810] text-lg mb-1">{o.name}</h3>
                <p className="font-body text-[#9E8E7A] text-sm">{o.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => go('pricing')}
              className="border border-[#8B1A6B] text-[#8B1A6B] font-display font-semibold px-8 py-3 rounded-full hover:bg-[#8B1A6B] hover:text-white transition-colors"
            >
              Voir tous les tarifs
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
            Prête à commencer votre parcours ?
          </h2>
          <p className="font-body text-[#F5E6C8]/80 mb-7 text-base">
            Prenez rendez-vous en ligne. Dr. Esma vous rappellera personnellement pour confirmer.
          </p>
          <button
            onClick={() => go('book')}
            className="bg-[#C9A96E] hover:bg-[#b8934d] text-[#2C1810] font-display font-bold px-10 py-4 rounded-full transition-colors shadow-lg"
          >
            Réserver ma consultation
          </button>
        </div>
      </section>
    </div>
  )
}

// ─── Page: Treatments ──────────────────────────────────────────────────────

function TreatmentsPage({ onNav }: { onNav: (p: Page) => void }) {
  const categories = [
    {
      title: 'Morpho-esthétique',
      color: '#8B1A6B',
      image: 'https://images.unsplash.com/photo-1570126737049-70d237c201de?w=600&h=400&fit=crop&auto=format',
      treatments: [
        { name: 'Mésothérapie visage', desc: 'Microinjections revitalisantes pour éclat et hydratation profonde.' },
        { name: 'Remodelage du corps', desc: 'Techniques non-invasives pour sculpter et affiner la silhouette.' },
        { name: 'Lifting sans chirurgie', desc: 'Raffermissement cutané par radiofrequence et ultrasons.' },
        { name: 'Traitement double menton', desc: "Réduction et redéfinition de l'ovale du visage." },
      ],
    },
    {
      title: 'Anti-âge',
      color: '#C9A96E',
      image: 'https://images.unsplash.com/photo-1637851496670-2bdc6c548d27?w=600&h=400&fit=crop&auto=format',
      treatments: [
        { name: 'Injections Botox®', desc: "Lissage des rides d'expression pour un regard rafraîchi et naturel." },
        { name: 'Acide hyaluronique', desc: 'Restauration du volume et redéfinition des contours du visage.' },
        { name: 'Peeling chimique', desc: 'Renouvellement cellulaire intense pour un teint unifié et lumineux.' },
        { name: 'PRP (Plasma Riche en Plaquettes)', desc: 'Régénération naturelle par les propres facteurs de croissance du patient.' },
      ],
    },
    {
      title: 'Laser-thérapie',
      color: '#6E1356',
      image: 'https://images.unsplash.com/photo-1713085085470-fba013d67e65?w=600&h=400&fit=crop&auto=format',
      treatments: [
        { name: 'Épilation laser Clarity', desc: 'Épilation définitive sur toutes les zones, toutes les carnations.' },
        { name: 'Traitement taches pigmentaires', desc: 'Effacement des taches solaires et de vieillesse par laser.' },
        { name: 'Rajeunissement cutané', desc: 'Stimulation du collagène et lissage global par laser fractionné.' },
        { name: 'Traitement acné & cicatrices', desc: "Réduction des séquelles d'acné et remodelage des cicatrices." },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -right-10 top-0 w-48 opacity-12" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">Expertise & excellence</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">Nos soins</h1>
        <GoldDivider />
        <p className="font-body text-[#6B4C3B] max-w-xl mx-auto text-base leading-relaxed">
          Chaque traitement est personnalisé selon votre morphologie, vos besoins et vos objectifs, par le Dr. Mobesser Esma.
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
                {cat.treatments.map(t => (
                  <div key={t.name} className="card-hover bg-white rounded-xl p-5 border border-[#E8DDD0] shadow-sm">
                    <div className="w-5 h-5 rounded-full mb-3" style={{ background: cat.color, opacity: 0.2 }} />
                    <div className="w-2 h-2 rounded-full -mt-7 mb-4" style={{ background: cat.color }} />
                    <h3 className="font-display font-semibold text-[#2C1810] text-base mb-1.5">{t.name}</h3>
                    <p className="font-body text-[#9E8E7A] text-sm leading-relaxed">{t.desc}</p>
                    <button className="mt-3 text-sm font-display font-semibold hover:underline" style={{ color: cat.color }}>
                      En savoir plus →
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
          Une question sur un traitement ?
        </p>
        <button onClick={() => { onNav('contact'); window.scrollTo(0,0) }} className="bg-[#C9A96E] text-[#2C1810] font-display font-bold px-8 py-3.5 rounded-full transition-colors hover:bg-[#b8934d]">
          Nous contacter
        </button>
      </div>
    </div>
  )
}

// ─── Page: About ───────────────────────────────────────────────────────────

function AboutPage() {
  const credentials = [
    "Diplôme d'État de Docteur en Médecine",
    'DES en Médecine Esthétique & Morphologique',
    'Certification Laser Clarity — Protocoles avancés',
    'Formation internationale en techniques anti-âge',
    'Membre de la SFME (Société Française de Médecine Esthétique)',
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -left-10 top-0 w-48 opacity-12 rotate-45" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">Notre équipe</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">À propos</h1>
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
              <p className="font-display text-xs font-semibold tracking-wider text-[#C9A96E] uppercase mt-0.5">Médecin morpho-esthétique</p>
            </div>
          </div>

          {/* Bio */}
          <div className="pt-4">
            <h2 className="font-display font-bold text-3xl text-[#2C1810] mb-2">Dr. Mobesser Esma</h2>
            <p className="font-display text-sm font-semibold text-[#C9A96E] tracking-wider uppercase mb-6">Médecin Morpho-Esthétique · Fondatrice de Mon Espoir</p>
            <div className="divider-gold mb-7" />
            <div className="space-y-5 font-body text-[#6B4C3B] leading-relaxed text-[15px]">
              <p>
                Passionnée par la médecine esthétique depuis le début de sa carrière, le <strong className="text-[#2C1810]">Dr. Mobesser Esma</strong> a fondé Mon Espoir avec une conviction profonde : chaque patiente mérite une approche sur mesure, bienveillante et fondée sur les dernières avancées scientifiques.
              </p>
              <p>
                Après des années de formation en France et à l'international, spécialisée en médecine morphologique et anti-âge, elle a développé une expertise reconnue dans les traitements injectables, la laser-thérapie et les techniques de remodelage corporel non-invasif.
              </p>
              <p>
                Au cabinet Mon Espoir, son approche est toujours <em>personnalisée</em> : elle prend le temps d'écouter, d'analyser et de proposer des protocoles adaptés à la morphologie et aux attentes de chaque patiente — jamais de traitements standardisés.
              </p>
              <p>
                Son philosophy : révéler la beauté naturelle, dans le respect et la durabilité, pour une confiance retrouvée.
              </p>
            </div>

            <div className="mt-9">
              <h3 className="font-display font-semibold text-[#2C1810] text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#C9A96E] block" />
                Diplômes & certifications
              </h3>
              <ul className="space-y-3">
                {credentials.map(c => (
                  <li key={c} className="flex items-start gap-3 font-body text-sm text-[#6B4C3B]">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" fill="none" stroke="#C9A96E" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    {c}
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
  const [selected, setSelected] = useState<number | null>(null)

  const cases = [
    { cat: 'Morpho-esthétique', label: 'Remodelage du menton', before: 'Double menton marqué', after: 'Ovale affiné & redéfini', img: beforeAfterChinImg },
    { cat: 'Anti-âge', label: 'Acide hyaluronique lèvres', before: 'Volume insuffisant', after: 'Lèvres harmonieuses & naturelles', img: beforeAfterLipsImg },
    { cat: 'Morpho-esthétique', label: 'Remodelage du profil', before: 'Profil déséquilibré', after: 'Contours harmonisés', img: beforeAfterProfileImg },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -right-10 bottom-0 w-48 opacity-12" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">Résultats réels</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">Galerie</h1>
        <GoldDivider />
        <p className="font-body text-[#9E8E7A] text-sm italic">
          Avec le consentement écrit des patientes. Résultats individuels variables.
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
                <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/50 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#8B1A6B] text-white text-xs font-display font-semibold px-2.5 py-1 rounded-full">
                  {c.cat}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-display font-semibold text-sm">{c.label}</p>
                </div>
              </div>
              <div className="p-4 flex gap-4">
                <div className="flex-1">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#9E8E7A] uppercase mb-0.5">Avant</p>
                  <p className="font-body text-xs text-[#6B4C3B]">{c.before}</p>
                </div>
                <div className="w-px bg-[#E8DDD0]" />
                <div className="flex-1">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#C9A96E] uppercase mb-0.5">Après</p>
                  <p className="font-body text-xs text-[#6B4C3B]">{c.after}</p>
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
              <img src={cases[selected].img} alt={cases[selected].label} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <span className="bg-[#8B1A6B]/10 text-[#8B1A6B] text-xs font-display font-semibold px-3 py-1 rounded-full">{cases[selected].cat}</span>
              <h3 className="font-display font-bold text-[#2C1810] text-xl mt-3 mb-4">{cases[selected].label}</h3>
              <div className="flex gap-6">
                <div className="flex-1 bg-[#F2EBE0] rounded-xl p-3">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#9E8E7A] uppercase mb-1">Avant</p>
                  <p className="font-body text-sm text-[#6B4C3B]">{cases[selected].before}</p>
                </div>
                <div className="flex-1 bg-[#8B1A6B]/8 rounded-xl p-3">
                  <p className="font-display text-[10px] font-semibold tracking-wider text-[#C9A96E] uppercase mb-1">Après</p>
                  <p className="font-body text-sm text-[#6B4C3B]">{cases[selected].after}</p>
                </div>
              </div>
              <p className="mt-4 text-[10px] font-body text-[#9E8E7A] italic">Résultat publié avec consentement écrit. Résultats individuels variables.</p>
              <button onClick={() => setSelected(null)} className="mt-4 w-full bg-[#8B1A6B] text-white font-display font-semibold py-2.5 rounded-full hover:bg-[#6E1356] transition-colors">
                Fermer
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
  const packages = [
    {
      name: 'Clarity Lumière',
      subtitle: 'Corps & zones mixtes',
      badge: 'POPULAIRE',
      img: promoLumiereImg,
      zones: ['Jambes complètes', 'Maillot', 'Aisselles', 'Sillons inter-fessier'],
      offert: ['Lèvre supérieure (Moustache)', 'Ligne médiane'],
      highlight: true,
    },
    {
      name: 'Clarity Intima',
      subtitle: 'Zones intimes',
      badge: null,
      img: promoIntimaImg,
      zones: ['Aisselles', 'Maillot', 'Sillon inter-fessier'],
      offert: ['Ligne médiane', 'Lèvre supérieure (Moustache)'],
      highlight: false,
    },
    {
      name: 'Clarity Douceur',
      subtitle: 'Demi-corps',
      badge: null,
      img: promoDouceurImg,
      zones: ['Demi-jambes', 'Maillot', 'Aisselles', 'Sillons inter-fessier'],
      offert: ['Lèvre supérieure (Moustache)', 'Ligne médiane'],
      highlight: false,
    },
    {
      name: 'Clarity Peau de Soie',
      subtitle: 'Corps complet',
      badge: 'BEST VALUE',
      img: promoPeauSoieImg,
      zones: ['Demi-bras', 'Demi-jambes', 'Maillot', 'Aisselles', 'Sillons inter-fessier'],
      offert: ['Lèvre supérieure (Moustache)', 'Ligne médiane'],
      highlight: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -left-10 top-0 w-48 opacity-12 rotate-12" />
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-[#C9A96E] uppercase mb-2">Transparence & confiance</p>
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">Tarifs & Offres</h1>
        <GoldDivider />
        <p className="font-body text-[#9E8E7A] text-sm max-w-md mx-auto">
          Nos forfaits laser évoluent selon les saisons. Contactez-nous pour connaître les disponibilités actuelles.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-14">
        {/* Laser packages */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-2xl text-[#2C1810] mb-2 flex items-center gap-3">
            <svg width="22" height="22" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" stroke="#8B1A6B" strokeWidth="1.5" strokeDasharray="4 2"/><circle cx="16" cy="16" r="5" fill="#8B1A6B" opacity="0.2"/><circle cx="16" cy="16" r="2" fill="#8B1A6B"/></svg>
            Forfaits Épilation Laser Clarity
          </h2>
          <p className="font-body text-sm text-[#9E8E7A] mb-8">Technologie laser Clarity — efficace sur toutes les carnations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
          {packages.map(pkg => (
            <div
              key={pkg.name}
              className={`card-hover relative rounded-2xl border flex flex-col overflow-hidden ${pkg.highlight ? 'border-[#8B1A6B] shadow-xl shadow-[#8B1A6B]/30' : 'border-[#E8DDD0] shadow-sm'}`}
            >
              {pkg.badge && (
                <span className={`absolute top-3 right-3 z-10 text-[10px] font-display font-bold tracking-wider px-2.5 py-1 rounded-full shadow ${pkg.highlight ? 'bg-[#C9A96E] text-[#2C1810]' : 'bg-[#8B1A6B] text-white'}`}>
                  {pkg.badge}
                </span>
              )}
              {/* Promo image */}
              <div className="aspect-square w-full overflow-hidden bg-[#F2EBE0]">
                <img src={pkg.img} alt={`Forfait ${pkg.name}`} className="w-full h-full object-cover" />
              </div>
              <div className={`p-5 flex flex-col flex-1 ${pkg.highlight ? 'bg-[#8B1A6B]' : 'bg-white'}`}>
                <div className={`text-xs font-display font-semibold tracking-wider uppercase mb-1 ${pkg.highlight ? 'text-[#F5E6C8]/70' : 'text-[#C9A96E]'}`}>
                  {pkg.subtitle}
                </div>
                <h3 style={{ fontFamily: "'Great Vibes', cursive" }} className={`text-3xl mb-4 ${pkg.highlight ? 'text-[#F5E6C8]' : 'text-[#8B1A6B]'}`}>
                  {pkg.name}
                </h3>
                <div className={`text-[10px] font-display font-semibold tracking-wider uppercase mb-2 ${pkg.highlight ? 'text-[#F5E6C8]/60' : 'text-[#9E8E7A]'}`}>
                  Zones incluses
                </div>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {pkg.zones.map(z => (
                    <li key={z} className={`flex items-center gap-2 text-sm font-body ${pkg.highlight ? 'text-[#F5E6C8]/90' : 'text-[#6B4C3B]'}`}>
                      <svg width="12" height="12" fill="none" stroke={pkg.highlight ? '#C9A96E' : '#8B1A6B'} strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      {z}
                    </li>
                  ))}
                </ul>
                {pkg.offert.length > 0 && (
                  <div className={`rounded-xl p-3 mb-4 ${pkg.highlight ? 'bg-[#F5E6C8]/10' : 'bg-[#8B1A6B]/5'}`}>
                    <p className="text-[10px] font-display font-bold tracking-wider uppercase mb-1.5 text-[#C9A96E]">
                      🎁 Offert
                    </p>
                    {pkg.offert.map(o => (
                      <p key={o} className={`text-xs font-body ${pkg.highlight ? 'text-[#F5E6C8]/80' : 'text-[#6B4C3B]'}`}>· {o}</p>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => { onNav('book'); window.scrollTo(0,0) }}
                  className={`w-full py-3 rounded-full font-display font-semibold text-sm transition-colors ${pkg.highlight ? 'bg-[#C9A96E] text-[#2C1810] hover:bg-[#b8934d]' : 'border border-[#8B1A6B] text-[#8B1A6B] hover:bg-[#8B1A6B] hover:text-white'}`}
                >
                  Réserver ce forfait
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F2EBE0] rounded-2xl p-6 border border-[#E8DDD0] text-center">
          <p className="font-body text-sm text-[#6B4C3B]">
            💡 <strong>Les tarifs sont disponibles sur demande.</strong> Chaque forfait est adapté à votre bilan initial. Contactez-nous pour un devis personnalisé.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Page: Contact ─────────────────────────────────────────────────────────

function ContactPage() {
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
      setErreurEnvoi("Une erreur est survenue. Merci de réessayer, ou de nous appeler directement.")
      return
    }

    setEnvoye(true)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#F2EBE0] py-16 px-5 text-center relative overflow-hidden">
        <BotanicalLeaf className="absolute -right-8 top-0 w-48 opacity-12" />
        <h1 style={{ fontFamily: "'Great Vibes', cursive" }} className="text-6xl text-[#8B1A6B]">Contactez-nous</h1>
        <GoldDivider />
        <p className="font-body text-[#6B4C3B] max-w-sm mx-auto text-sm">
          Notre équipe vous répond dans les plus brefs délais.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-[#E8DDD0] shadow-sm">
          <h2 className="font-display font-bold text-2xl text-[#2C1810] mb-6">Envoyez-nous un message</h2>
          {envoye ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🌿</div>
              <p className="font-display font-semibold text-lg text-[#8B1A6B] mb-1">Merci !</p>
              <p className="font-body text-sm text-[#6B4C3B]">Votre message a bien été reçu, nous vous répondrons rapidement.</p>
            </div>
          ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Prénom</label>
                <input type="text" required {...champ('prenom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="Yasmine" />
              </div>
              <div>
                <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Nom</label>
                <input type="text" required {...champ('nom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="Bouziane" />
              </div>
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Email</label>
              <input type="email" {...champ('email')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="yasmine@email.com" />
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">
                Téléphone <span className="text-[#C9A96E]">*</span>
              </label>
              <input type="tel" required {...champ('telephone')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0]" placeholder="0699 99 20 07" />
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Objet</label>
              <select {...champ('objet')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#6B4C3B] bg-[#FAF6F0] appearance-none">
                <option>Demande d'information</option>
                <option>Prise de rendez-vous</option>
                <option>Question sur un soin</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Message</label>
              <textarea rows={4} {...champ('message')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body text-[#2C1810] bg-[#FAF6F0] resize-none" placeholder="Bonjour, je souhaite en savoir plus sur..." />
            </div>
            {erreurEnvoi && <p className="text-sm" style={{ color: '#B23A3A' }}>{erreurEnvoi}</p>}
            <button type="submit" disabled={envoiEnCours} className="w-full bg-[#8B1A6B] hover:bg-[#6E1356] text-white font-display font-semibold py-3.5 rounded-full transition-colors shadow-md shadow-[#8B1A6B]/20 disabled:opacity-50">
              {envoiEnCours ? 'Envoi...' : 'Envoyer le message'}
            </button>
          </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          {[
            {
              icon: <svg width="20" height="20" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 11.5 19.79 19.79 0 011.07 2.82 2 2 0 013.07 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
              title: 'Appelez-nous',
              content: '0699 99 20 07',
              sub: 'Lun – Sam · 9h – 19h',
            },
            {
              icon: <svg width="20" height="20" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
              title: 'Email',
              content: 'contact@monespoir.dz',
              sub: 'Réponse sous 24h',
            },
            {
              icon: <svg width="20" height="20" fill="none" stroke="#8B1A6B" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              title: 'Notre adresse',
              content: 'Alger, Algérie',
              sub: 'Accès facile, parking disponible',
            },
          ].map(item => (
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
              <p className="font-body text-xs text-[#9E8E7A]">Carte interactive</p>
            </div>
          </div>

          {/* Social */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DDD0] shadow-sm">
            <p className="font-display font-semibold text-sm text-[#2C1810] mb-3">Suivez-nous</p>
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
    { cat: 'Morpho-esthétique', items: ['Mésothérapie visage', 'Remodelage corps', 'Lifting sans chirurgie', 'Traitement double menton'] },
    { cat: 'Anti-âge', items: ['Injections Botox®', 'Acide hyaluronique', 'Peeling chimique', 'PRP'] },
    { cat: 'Laser-thérapie', items: ['Épilation laser Clarity', 'Traitement taches pigmentaires', 'Rajeunissement cutané', 'Traitement acné & cicatrices'] },
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
      setErreurEnvoi("Une erreur est survenue. Merci de réessayer, ou de nous appeler directement.")
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
            Prendre rendez-vous en ligne
          </h1>
          <div className="divider-gold mb-5 w-32" />
          <p className="font-body text-[#6B4C3B] text-sm leading-relaxed">
            Après votre demande, nous vous appellerons ou vous enverrons un email pour confirmer la date et l'heure de votre rendez-vous.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${step >= 1 ? 'bg-[#8B1A6B] text-white' : 'bg-[#E8DDD0] text-[#9E8E7A]'}`}>1</div>
              <span className={`font-display text-sm font-medium ${step >= 1 ? 'text-[#8B1A6B]' : 'text-[#9E8E7A]'}`}>Informations de contact</span>
            </div>
            <div className="ml-4 w-px h-6 bg-[#C9A96E]/40" />
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors ${step >= 2 ? 'bg-[#8B1A6B] text-white' : 'bg-[#E8DDD0] text-[#9E8E7A]'}`}>2</div>
              <span className={`font-display text-sm font-medium ${step >= 2 ? 'text-[#8B1A6B]' : 'text-[#9E8E7A]'}`}>Choisir un soin</span>
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl shadow-[#8B1A6B]/8 border border-[#E8DDD0] overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-[#E8DDD0]">
            {[{ n: 1, label: 'Contact' }, { n: 2, label: 'Soin' }].map(t => (
              <button
                key={t.n}
                onClick={() => t.n < step || step === 2 ? setStep(t.n) : undefined}
                className={`flex-1 py-4 font-display text-sm font-semibold transition-colors ${step === t.n ? 'text-[#8B1A6B] border-b-2 border-[#8B1A6B] -mb-px' : 'text-[#9E8E7A]'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-7">
            {step === 1 && (
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); setStep(2) }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Prénom</label>
                    <input type="text" required {...champ('prenom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="Yasmine" />
                  </div>
                  <div>
                    <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Nom</label>
                    <input type="text" required {...champ('nom')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="Bouziane" />
                  </div>
                </div>
                <div>
                  <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">
                    Téléphone <span className="text-[#C9A96E]">*</span>
                  </label>
                  <input type="tel" required {...champ('telephone')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="0699 99 20 07" />
                </div>
                <div>
                  <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Email</label>
                  <input type="email" {...champ('email')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0]" placeholder="yasmine@email.com" />
                </div>
                <div>
                  <label className="font-display text-xs font-semibold tracking-wider text-[#9E8E7A] uppercase block mb-1.5">Disponibilité souhaitée</label>
                  <input type="date" {...champ('date')} className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm font-body bg-[#FAF6F0] text-[#6B4C3B]" />
                </div>
                <button type="submit" className="w-full bg-[#8B1A6B] hover:bg-[#6E1356] text-white font-display font-semibold py-3.5 rounded-full transition-colors shadow-md shadow-[#8B1A6B]/20 flex items-center justify-center gap-2">
                  Étape suivante <span className="text-lg">→</span>
                </button>
              </form>
            )}

            {step === 2 && !envoye && (
              <div>
                <p className="font-body text-sm text-[#6B4C3B] mb-6">Sélectionnez le soin pour lequel vous souhaitez prendre rendez-vous.</p>
                <div className="space-y-5">
                  {services.map(sc => (
                    <div key={sc.cat}>
                      <p className="font-display text-xs font-bold tracking-wider text-[#C9A96E] uppercase mb-2">{sc.cat}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sc.items.map(item => (
                          <button
                            key={item}
                            onClick={() => setService(item)}
                            className={`text-left px-4 py-3 rounded-xl border text-sm font-body transition-all ${service === item ? 'border-[#8B1A6B] bg-[#8B1A6B]/8 text-[#8B1A6B] font-medium' : 'border-[#E8DDD0] text-[#6B4C3B] hover:border-[#8B1A6B]/40'}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {erreurEnvoi && <p className="text-sm mt-4" style={{ color: '#B23A3A' }}>{erreurEnvoi}</p>}
                <div className="mt-6 pt-5 border-t border-[#E8DDD0] flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[#E8DDD0] text-[#9E8E7A] font-display font-semibold py-3 rounded-full hover:bg-[#F2EBE0] transition-colors">
                    Retour
                  </button>
                  <button
                    onClick={handleConfirmer}
                    disabled={!service || envoiEnCours}
                    className={`flex-1 font-display font-semibold py-3 rounded-full transition-colors ${service ? 'bg-[#8B1A6B] hover:bg-[#6E1356] text-white shadow-md shadow-[#8B1A6B]/20' : 'bg-[#E8DDD0] text-[#9E8E7A] cursor-not-allowed'}`}
                  >
                    {envoiEnCours ? 'Envoi...' : 'Confirmer la demande ✓'}
                  </button>
                </div>
              </div>
            )}

            {envoye && (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">🌿</div>
                <p className="font-display font-semibold text-lg text-[#8B1A6B] mb-1">Merci !</p>
                <p className="font-body text-sm text-[#6B4C3B]">Votre demande a bien été reçue. Nous vous recontactons très vite pour confirmer votre rendez-vous.</p>
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
    <div className="flex flex-col min-h-screen">
      <Header currentPage={page} onNav={p => { setPage(p); window.scrollTo(0, 0) }} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNav={p => { setPage(p); window.scrollTo(0, 0) }} />
    </div>
  )
}
