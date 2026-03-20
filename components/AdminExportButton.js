'use client'

import { useState } from 'react'

/**
 * Bouton d'export pour le dashboard admin.
 * Usage : <AdminExportButton />
 * Place ce composant dans app/admin/page.js en haut du dashboard.
 */
export default function AdminExportButton() {
  const [loading, setLoading] = useState(false)

  async function handleExport(format) {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/export?format=${format}`)
      if (!res.ok) {
        alert('Erreur lors de l\'export. Vérifiez que vous êtes connecté.')
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `commandes-${new Date().toISOString().slice(0, 10)}.${format}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export error:', err)
      alert('Erreur réseau lors de l\'export.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => handleExport('csv')}
        disabled={loading}
        aria-label="Exporter les commandes en CSV"
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
      >
        {loading ? '⏳' : '📥'} Export CSV
      </button>
      <button
        onClick={() => handleExport('json')}
        disabled={loading}
        aria-label="Exporter les commandes en JSON"
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
      >
        {loading ? '⏳' : '📋'} Export JSON
      </button>
    </div>
  )
}
