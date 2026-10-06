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

type Pack = {
  id: string
  image_url: string
  storage_path: string
  ordre: number
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

  const [onglet, setOnglet] = useState<'rdv' | 'messages' | 'packs'>('rdv')
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([])
  const [messages, setMessages] = useState<MessageContact[]>([])
  const [packs, setPacks] = useState<Pack[]>([])
  const [chargementDonnees, setChargementDonnees] = useState(false)
  const [uploadEnCours, setUploadEnCours] = useState(false)
  const [erreurPack, setErreurPack] = useState('')

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
    const [rdvRes, msgRes, packsRes] = await Promise.all([
      supabase.from('rendez_vous').select('*').order('created_at', { ascending: false }),
      supabase.from('messages_contact').select('*').order('created_at', { ascending: false }),
      supabase.from('packs').select('*').order('ordre', { ascending: true }),
    ])
    if (rdvRes.data) setRendezVous(rdvRes.data as RendezVous[])
    if (msgRes.data) setMessages(msgRes.data as MessageContact[])
    if (packsRes.data) setPacks(packsRes.data as Pack[])
    setChargementDonnees(false)
  }

  async function handleAjouterPack(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0]
    e.target.value = ''
    if (!fichier) return
    setErreurPack('')
    setUploadEnCours(true)

    const chemin = `${Date.now()}-${fichier.name.replace(/\s+/g, '-')}`
    const { error: erreurUpload } = await supabase.storage.from('packs').upload(chemin, fichier)
    if (erreurUpload) {
      setErreurPack("Échec de l'envoi de l'image. Réessaie.")
      setUploadEnCours(false)
      return
    }

    const { data: urlData } = supabase.storage.from('packs').getPublicUrl(chemin)
    const ordreMax = packs.length > 0 ? Math.max(...packs.map(p => p.ordre)) : 0

    const { error: erreurInsert } = await supabase.from('packs').insert({
      image_url: urlData.publicUrl,
      storage_path: chemin,
      ordre: ordreMax + 1,
    })
    if (erreurInsert) {
      setErreurPack("Échec de l'enregistrement du pack. Réessaie.")
    } else {
      await chargerDonnees()
    }
    setUploadEnCours(false)
  }

  async function handleSupprimerPack(pack: Pack) {
    if (!confirm('Supprimer ce pack ? Cette action est définitive.')) return
    await supabase.storage.from('packs').remove([pack.storage_path])
    await supabase.from('packs').delete().eq('id', pack.id)
    setPacks(prev => prev.filter(p => p.id !== pack.id))
  }

  async function handleDeplacerPack(pack: Pack, direction: 'haut' | 'bas') {
    const index = packs.findIndex(p => p.id === pack.id)
    const indexVoisin = direction === 'haut' ? index - 1 : index + 1
    if (indexVoisin < 0 || indexVoisin >= packs.length) return
    const voisin = packs[indexVoisin]

    await Promise.all([
      supabase.from('packs').update({ ordre: voisin.ordre }).eq('id', pack.id),
      supabase.from('packs').update({ ordre: pack.ordre }).eq('id', voisin.id),
    ])
    await chargerDonnees()
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
          <button onClick={() => setOnglet('packs')}
            style={{ padding: '10px 20px', borderRadius: '999px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              backgroundColor: onglet === 'packs' ? rose : 'white', color: onglet === 'packs' ? 'white' : texteMuted }}>
            Packs promo ({packs.length})
          </button>
        </div>

        {chargementDonnees ? (
          <p style={{ color: texteMuted }}>Chargement...</p>
        ) : onglet === 'packs' ? (
          <div>
            <p style={{ fontSize: '13px', color: texteMuted, marginBottom: '16px' }}>
              Ajoute une image par pack (prix et détails déjà écrits dessus). Elle apparaît directement sur la page Tarifs du site.
              Utilise les flèches pour changer l'ordre d'affichage.
            </p>
            {erreurPack && <p style={{ color: '#B23A3A', fontSize: '13px', marginBottom: '14px' }}>{erreurPack}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
              {packs.map((pack, i) => (
                <div key={pack.id} style={{ border: `1px solid ${bordure}`, borderRadius: '14px', overflow: 'hidden', backgroundColor: 'white' }}>
                  <div style={{ aspectRatio: '4 / 5', backgroundColor: '#F2EBE0' }}>
                    <img src={pack.image_url} alt="Pack" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => handleDeplacerPack(pack, 'haut')} disabled={i === 0}
                        style={{ border: `1px solid ${bordure}`, background: 'white', borderRadius: '8px', width: '28px', height: '28px', cursor: i === 0 ? 'default' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}>
                        ↑
                      </button>
                      <button onClick={() => handleDeplacerPack(pack, 'bas')} disabled={i === packs.length - 1}
                        style={{ border: `1px solid ${bordure}`, background: 'white', borderRadius: '8px', width: '28px', height: '28px', cursor: i === packs.length - 1 ? 'default' : 'pointer', opacity: i === packs.length - 1 ? 0.3 : 1 }}>
                        ↓
                      </button>
                    </div>
                    <button onClick={() => handleSupprimerPack(pack)}
                      style={{ border: 'none', background: 'none', color: '#B23A3A', fontSize: '13px', cursor: 'pointer' }}>
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}

              <label style={{
                border: `2px dashed ${bordure}`, borderRadius: '14px', aspectRatio: '4 / 5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                cursor: uploadEnCours ? 'default' : 'pointer', color: texteMuted, fontSize: '13px', textAlign: 'center', padding: '12px',
              }}>
                {uploadEnCours ? 'Envoi en cours...' : <>＋<br />Ajouter un pack</>}
                <input type="file" accept="image/*" onChange={handleAjouterPack} disabled={uploadEnCours} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
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
