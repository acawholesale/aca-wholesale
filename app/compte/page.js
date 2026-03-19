'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'

var mockCommandes = [
  { id: 'ACA-2026-001', produit: 'Lot Premium Nike/Adidas x25', montant: '189', date: '2026-03-15', statut: 'expedie', tracking: 'FR123456789' },
  { id: 'ACA-2026-002', produit: 'Lot Basic Multi-marques x30', montant: '129', date: '2026-03-08', statut: 'livre', tracking: 'FR987654321' },
  { id: 'ACA-2026-003', produit: 'Lot Luxury x10', montant: '349', date: '2026-02-20', statut: 'livre', tracking: 'FR456123789' },
]

function statutBadge(s) {
  if (s === 'a_expedier') return { label: 'A expedier', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' }
  if (s === 'expedie') return { label: 'En cours', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' }
  if (s === 'livre') return { label: 'Livre', color: '#10b981', bg: 'rgba(16,185,129,0.12)' }
  return { label: s, color: '#888', bg: 'rgba(136,136,136,0.12)' }
}

export default function ComptePage() {
  var userState = useState(null)
  var user = userState[0]; var setUser = userState[1]
  var tabState = useState('commandes')
  var activeTab = tabState[0]; var setActiveTab = tabState[1]
  var editState = useState(false)
  var editMode = editState[0]; var setEditMode = editState[1]
  var prenomState = useState('')
  var prenomEdit = prenomState[0]; var setPrenomEdit = prenomState[1]
  var nomState = useState('')
  var nomEdit = nomState[0]; var setNomEdit = nomState[1]
  var savedState = useState(false)
  var saved = savedState[0]; var setSaved = savedState[1]

  useEffect(function() {
    var session = localStorage.getItem('aca_session')
    if (!session) {
      window.location.href = '/login'
      return
    }
    var u = JSON.parse(session)
    setUser(u)
    setPrenomEdit(u.prenom || '')
    setNomEdit(u.nom || '')
  }, [])

  function handleDeconnexion() {
    localStorage.removeItem('aca_session')
    window.location.href = '/'
  }

  function handleSaveProfil() {
    var updated = Object.assign({}, user, { prenom: prenomEdit, nom: nomEdit })
    localStorage.setItem('aca_session', JSON.stringify(updated))
    setUser(updated)
    var users = JSON.parse(localStorage.getItem('aca_users') || '[]')
    var newUsers = users.map(function(u) {
      return u.id === updated.id ? Object.assign({}, u, { prenom: prenomEdit, nom: nomEdit }) : u
    })
    localStorage.setItem('aca_users', JSON.stringify(newUsers))
    setEditMode(false)
    setSaved(true)
    setTimeout(function() { setSaved(false) }, 2500)
  }

  if (!user) {
    return <div style={{ minHeight: '100vh', background: '#080808' }} />
  }

  var tabs = [
    { id: 'commandes', label: 'Mes commandes', icon: '📦' },
    { id: 'profil', label: 'Mon profil', icon: '👤' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0e0e0e', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ background: '#fff', color: '#000', padding: '5px 8px', fontWeight: 900, fontSize: '15px', borderRadius: '5px 0 0 5px' }}>AC</span>
          <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '5px 6px', fontWeight: 900, fontSize: '15px', borderRadius: '0 5px 5px 0' }}>A</span>
          <span style={{ color: '#C4962A', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>Wholesale</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#888', fontSize: '13px' }}>Bonjour, <strong style={{ color: '#E8B84B' }}>{user.prenom}</strong></span>
          <button onClick={handleDeconnexion} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#666', fontSize: '12px', padding: '6px 12px', cursor: 'pointer' }}>Deconnexion</button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(196,150,42,0.12), rgba(232,184,75,0.06))', border: '1px solid rgba(196,150,42,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', margin: '0 0 4px 0' }}>Mon espace client</h1>
            <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{user.prenom} {user.nom} — {user.email}</p>
          </div>
          <Link href="/produits" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '8px', textDecoration: 'none' }}>
            Commander
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
          {tabs.map(function(tab) {
            var isActive = activeTab === tab.id
            return (
              <button key={tab.id} onClick={function() { setActiveTab(tab.id) }}
                style={{ flex: 1, padding: '10px 16px', background: isActive ? '#1a1a1a' : 'transparent', border: isActive ? '1px solid rgba(196,150,42,0.25)' : '1px solid transparent', borderRadius: '8px', color: isActive ? '#E8B84B' : '#555', fontSize: '13px', fontWeight: isActive ? 700 : 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {activeTab === 'commandes' && (
          <div>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px 0' }}>Mes commandes ({mockCommandes.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mockCommandes.map(function(cmd) {
                var s = statutBadge(cmd.statut)
                return (
                  <div key={cmd.id} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      <div>
                        <div style={{ color: '#C4962A', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{cmd.id}</div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{cmd.produit}</div>
                      </div>
                      <span style={{ background: s.bg, border: '1px solid ' + s.color, borderRadius: '6px', color: s.color, fontSize: '12px', fontWeight: 700, padding: '4px 10px', whiteSpace: 'nowrap' }}>{s.label}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                      <span style={{ color: '#888', fontSize: '12px' }}>📅 {cmd.date}</span>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{cmd.montant} EUR</span>
                      {cmd.tracking && cmd.statut === 'expedie' && (
                        <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 600 }}>🚚 Suivi : {cmd.tracking}</span>
                      )}
                      {cmd.statut === 'livre' && (
                        <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 600 }}>✓ Livre</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: '20px', padding: '16px 20px', background: 'rgba(196,150,42,0.06)', border: '1px solid rgba(196,150,42,0.15)', borderRadius: '10px', textAlign: 'center' }}>
              <p style={{ color: '#888', fontSize: '13px', margin: '0 0 10px 0' }}>Vous souhaitez passer une nouvelle commande ?</p>
              <Link href="/produits" style={{ color: '#C4962A', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Voir nos lots disponibles →</Link>
            </div>
          </div>
        )}

        {activeTab === 'profil' && (
          <div style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Mon profil</h2>
              {!editMode && (
                <button onClick={function() { setEditMode(true) }} style={{ background: 'rgba(196,150,42,0.12)', border: '1px solid rgba(196,150,42,0.3)', borderRadius: '6px', color: '#C4962A', fontSize: '12px', fontWeight: 700, padding: '6px 14px', cursor: 'pointer' }}>Modifier</button>
              )}
            </div>

            {saved && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#10b981', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>✓ Profil mis a jour avec succes</div>
            )}

            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {editMode ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Prenom</label>
                      <input value={prenomEdit} onChange={function(e) { setPrenomEdit(e.target.value) }}
                        style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Nom</label>
                      <input value={nomEdit} onChange={function(e) { setNomEdit(e.target.value) }}
                        style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Email</label>
                    <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', color: '#555', fontSize: '14px' }}>{user.email}</div>
                    <div style={{ color: '#555', fontSize: '11px', marginTop: '4px' }}>L email ne peut pas etre modifie</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleSaveProfil} style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Enregistrer</button>
                    <button onClick={function() { setEditMode(false); setPrenomEdit(user.prenom); setNomEdit(user.nom) }} style={{ padding: '11px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#666', fontSize: '12px', cursor: 'pointer' }}>Annuler</button>
                  </div>
                </>
              ) : (
                <>
                  {[
                    { label: 'Prenom', value: user.prenom },
                    { label: 'Nom', value: user.nom },
                    { label: 'Email', value: user.email },
                  ].map(function(field) {
                    return (
                      <div key={field.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: '#555', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{field.label}</span>
                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{field.value}</span>
                      </div>
                    )
                  })}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                    <span style={{ color: '#555', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Mot de passe</span>
                    <Link href="/mot-de-passe-oublie" style={{ color: '#C4962A', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Modifier →</Link>
                  </div>
                </>
              )}
            </div>

            <div style={{ marginTop: '20px', padding: '16px 20px', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '10px' }}>
              <div style={{ color: '#888', fontSize: '13px', marginBottom: '10px' }}>Zone de danger</div>
              <button onClick={handleDeconnexion} style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '6px', color: '#f87171', fontSize: '12px', fontWeight: 700, padding: '8px 16px', cursor: 'pointer' }}>Se deconnecter</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
