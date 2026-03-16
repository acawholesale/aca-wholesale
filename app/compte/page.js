'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

const STATUS_CONFIG = {
  en_attente: { label: 'En attente',     color: 'bg-yellow-100 text-yellow-800', emoji: '⏳' },
  confirmee:  { label: 'Confirmée',      color: 'bg-blue-100 text-blue-800',     emoji: '✅' },
  preparee:   { label: 'En préparation', color: 'bg-orange-100 text-orange-800', emoji: '📦' },
  expediee:   { label: 'Expédiée',       color: 'bg-purple-100 text-purple-800', emoji: '🚚' },
  livree:     { label: 'Livrée',         color: 'bg-green-100 text-green-800',   emoji: '🎉' },
  annulee:    { label: 'Annulée',        color: 'bg-red-100 text-red-800',       emoji: '❌' },
}

export default function Compte() {
  const { user, profile, loading, signOut, updateProfile } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('commandes')
  const [editMode, setEditMode] = useState(false)
  const [profileForm, setProfileForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/connexion')
  }, [user, loading, router])

  useEffect(() => {
    if (profile) {
      setProfileForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        postal_code: profile.postal_code || '',
        country: profile.country || 'France',
      })
    }
  }, [profile])

  useEffect(() => {
    if (user) fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    setOrdersLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setOrdersLoading(false)
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    await updateProfile(profileForm)
    setSaving(false)
    setEditMode(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) return (
    <main className="bg-[#f0f0f3] min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-32">
        <div className="text-center"><div className="text-4xl mb-3 animate-pulse">⏳</div><p className="text-gray-500 text-sm">Chargement...</p></div>
      </div>
    </main>
  )

  if (!user) return null

  return (
    <main className="bg-[#f0f0f3] min-h-screen">
      <Navbar />
      <section className="bg-black text-white py-10 md:py-14 rounded-b-[24px] md:rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Bonjour,</p>
              <h1 className="text-2xl md:text-4xl font-black">{profile?.first_name || user.email.split('@')[0]} 👋</h1>
              <p className="text-gray-400 text-sm mt-1">{user.email}</p>
            </div>
            <button onClick={handleSignOut} className="text-gray-400 hover:text-white text-xs border border-gray-700 px-4 py-2 rounded-full transition-colors">
              Se déconnecter
            </button>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex gap-2 mb-6">
          {[{ id: 'commandes', label: '📦 Mes commandes' }, { id: 'profil', label: '👤 Mon profil' }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === t.id ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              style={activeTab !== t.id ? { boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.9)' } : {}}>
              {t.label}
            </button>
          ))}
        </div>
        {activeTab === 'commandes' && (
          <div>
            {ordersLoading ? (
              <div className="text-center py-16"><div className="text-3xl mb-3 animate-pulse">📦</div><p className="text-gray-500 text-sm">Chargement...</p></div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 md:p-16 text-center" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
                <div className="text-5xl mb-4">🛍️</div>
                <h2 className="font-black text-xl mb-2">Aucune commande pour l&apos;instant</h2>
                <p className="text-gray-500 text-sm mb-6">Parcourez nos lots et passez votre première commande !</p>
                <Link href="/produits" className="inline-block bg-black text-white px-8 py-3.5 rounded-full font-black text-sm hover:bg-blue-600 transition-colors">VOIR NOS LOTS →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.en_attente
                  const date = new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                  return (
                    <div key={order.id} className="bg-white rounded-2xl p-5 md:p-6" style={{ boxShadow: '6px 6px 14px rgba(0,0,0,0.07), -6px -6px 14px rgba(255,255,255,0.8)' }}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{date}</p>
                          <p className="font-black text-sm md:text-base">Commande #{order.id.split('-')[0].toUpperCase()}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{order.order_items?.length || 0} lot(s) · {order.total_price}€</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 ${status.color}`}>
                          {status.emoji} {status.label}
                        </span>
                      </div>
                      {order.order_items?.length > 0 && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                          {order.order_items.map(item => (
                            <div key={item.id} className="flex-shrink-0 bg-gray-50 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700">
                              {item.product_emoji} {item.product_name} ×{item.quantity}
                            </div>
                          ))}
                        </div>
                      )}
                      <Link href={`/compte/commande/${order.id}`} className="inline-block text-xs font-bold text-blue-600 hover:underline">Voir le détail →</Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
        {activeTab === 'profil' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-3xl p-6 md:p-8" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-lg">Mes informations</h2>
                {!editMode && <button onClick={() => setEditMode(true)} className="text-xs font-bold border border-gray-300 px-4 py-2 rounded-full hover:border-black transition-colors">✏️ Modifier</button>}
              </div>
              {saveSuccess && <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl px-4 py-3 mb-4">✅ Profil mis à jour !</div>}
              {!editMode ? (
                <div className="space-y-0">
                  {[
                    { label: 'Prénom', value: profile?.first_name },
                    { label: 'Nom', value: profile?.last_name },
                    { label: 'Email', value: user.email },
                    { label: 'Téléphone', value: profile?.phone },
                    { label: 'Adresse', value: profile?.address },
                    { label: 'Ville', value: profile?.city },
                    { label: 'Code postal', value: profile?.postal_code },
                    { label: 'Pays', value: profile?.country },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider w-28 flex-shrink-0 pt-0.5">{label}</span>
                      <span className="text-sm font-medium text-gray-800">{value || <span className="text-gray-300 italic">Non renseigné</span>}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Prénom</label>
                      <input value={profileForm.first_name || ''} onChange={e => setProfileForm(p => ({ ...p, first_name: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom</label>
                      <input value={profileForm.last_name || ''} onChange={e => setProfileForm(p => ({ ...p, last_name: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Téléphone</label>
                    <input value={profileForm.phone || ''} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" placeholder="+33 6 00 00 00 00" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Adresse</label>
                    <input value={profileForm.address || ''} onChange={e => setProfileForm(p => ({ ...p, address: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Code postal</label>
                      <input value={profileForm.postal_code || ''} onChange={e => setProfileForm(p => ({ ...p, postal_code: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ville</label>
                      <input value={profileForm.city || ''} onChange={e => setProfileForm(p => ({ ...p, city: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pays</label>
                      <select value={profileForm.country || 'France'} onChange={e => setProfileForm(p => ({ ...p, country: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white rounded-xl">
                        <option>France</option><option>Belgique</option><option>Suisse</option><option>Luxembourg</option><option>Allemagne</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setEditMode(false)} className="flex-1 border-2 border-gray-300 py-3 rounded-full font-bold text-sm hover:border-black transition-colors">Annuler</button>
                    <button type="submit" disabled={saving} className="flex-1 bg-black text-white py-3 rounded-full font-black text-sm hover:bg-blue-600 transition-colors disabled:opacity-50">{saving ? 'Enregistrement...' : 'SAUVEGARDER'}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
