import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'

type RendezVous = {
  id: string
  created_at: string
  prenom: string
  nom: string
  telephone: string
  email: string | null
  date_disponible: string | null
  service: string | null
}

type MessageContact = {
  id: string
  created_at: string
  prenom: string
  nom: string
  email: string | null
  telephone: string
  objet: string | null
  message: string | null
}

const rose = '#8B1A6B'
const or = '#C9A96E'
const creme = '#FAF6F0'
const bordure = '#E8DDD0'
const texte = '#2C1810'
const texteMuted = '#9E8E7A'

const inputStyle = {
  backgroundColor: 'white',
  border: `1px solid ${bordure}`,
  borderRadius: '10px',
  color: texte,
  fontSize: '14px',
  padding: '12px 16px',
  width: '100%',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [chargementSession, setChargementSession] = useState(true)

  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreurConnexion, setErreurConnexion] = useState('')
  const [connexionEnCours, setConnexionEnCours] = useState(false)

  const [onglet, setOnglet] = useState<'rdv' | 'messages'>('rdv')
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([])
  const [messages, setMessages] = useState<MessageContact[]>([])
  const [chargementDonnees, setChargementDonnees] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChargementSession(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    chargerDonnees()
  }, [session])

  async function chargerDonnees() {
    setChargementDonnees(true)
    const [rdvRes, msgRes] = await Promise.all([
      supabase.from('rendez_vous').select('*').order('created_at', { ascending: false }),
      supabase.from('messages_contact').select('*').order('created_at', { ascending: false }),
    ])
    if (rdvRes.data) setRendezVous(rdvRes.data as RendezVous[])
    if (msgRes.data) setMessages(msgRes.data as MessageContact[])
    setChargementDonnees(false)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setConnexionEnCours(true)
    setErreurConnexion('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse })
    setConnexionEnCours(false)
    if (error) setErreurConnexion('Email ou mot de passe incorrect.')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  if (chargementSession) {
    return <div style={{ minHeight: '100vh', backgroundColor: creme }} />
  }

  if (!session) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F2EBE0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', maxWidth: '380px', width: '100%', border: `1px solid ${bordure}` }}>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: rose, marginBottom: '4px' }}>Espace cabinet</h1>
          <p style={{ fontSize: '14px', color: texteMuted, marginBottom: '24px' }}>Connectez-vous pour voir les demandes reçues.</p>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: texteMuted, display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: texteMuted, display: 'block', marginBottom: '6px' }}>Mot de passe</label>
            <input type="password" style={inputStyle} value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required />
          </div>
          {erreurConnexion && <p style={{ color: '#B23A3A', fontSize: '13px', marginBottom: '14px' }}>{erreurConnexion}</p>}
          <button type="submit" disabled={connexionEnCours}
            style={{ width: '100%', padding: '14px', borderRadius: '999px', backgroundColor: rose, color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            {connexionEnCours ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: creme, padding: '32px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: rose }}>Demandes reçues</h1>
          <button onClick={handleLogout} style={{ border: `1px solid ${bordure}`, background: 'white', padding: '10px 18px', borderRadius: '999px', fontSize: '13px', cursor: 'pointer', color: texteMuted }}>
            Se déconnecter
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button onClick={() => setOnglet('rdv')}
            style={{ padding: '10px 20px', borderRadius: '999px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              backgroundColor: onglet === 'rdv' ? rose : 'white', color: onglet === 'rdv' ? 'white' : texteMuted }}>
            Rendez-vous ({rendezVous.length})
          </button>
          <button onClick={() => setOnglet('messages')}
            style={{ padding: '10px 20px', borderRadius: '999px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              backgroundColor: onglet === 'messages' ? rose : 'white', color: onglet === 'messages' ? 'white' : texteMuted }}>
            Messages ({messages.length})
          </button>
        </div>

        {chargementDonnees ? (
          <p style={{ color: texteMuted }}>Chargement...</p>
        ) : onglet === 'rdv' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rendezVous.length === 0 && <p style={{ color: texteMuted }}>Aucune demande pour l'instant.</p>}
            {rendezVous.map(r => (
              <div key={r.id} style={{ backgroundColor: 'white', border: `1px solid ${bordure}`, borderRadius: '14px', padding: '18px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ color: rose }}>{r.prenom} {r.nom}</strong>
                  <span style={{ fontSize: '12px', color: texteMuted }}>{formatDate(r.created_at)}</span>
                </div>
                <div style={{ fontSize: '13px', color: texteMuted, marginTop: '6px' }}>
                  📞 <a href={`tel:${r.telephone}`} style={{ color: texte }}>{r.telephone}</a>
                  {r.email && <> · ✉️ {r.email}</>}
                  {r.date_disponible && <> · 📅 {r.date_disponible}</>}
                </div>
                {r.service && <div style={{ fontSize: '13px', marginTop: '6px', color: or }}>{r.service}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.length === 0 && <p style={{ color: texteMuted }}>Aucun message pour l'instant.</p>}
            {messages.map(m => (
              <div key={m.id} style={{ backgroundColor: 'white', border: `1px solid ${bordure}`, borderRadius: '14px', padding: '18px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ color: rose }}>{m.prenom} {m.nom}</strong>
                  <span style={{ fontSize: '12px', color: texteMuted }}>{formatDate(m.created_at)}</span>
                </div>
                <div style={{ fontSize: '13px', color: texteMuted, marginTop: '6px' }}>
                  📞 <a href={`tel:${m.telephone}`} style={{ color: texte }}>{m.telephone}</a>
                  {m.email && <> · ✉️ {m.email}</>}
                  {m.objet && <> · {m.objet}</>}
                </div>
                {m.message && <p style={{ fontSize: '13px', marginTop: '8px', color: texte }}>{m.message}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
