'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PrintLabels() {
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const data = sessionStorage.getItem('aca_print_labels')
      if (data) {
        setLabels(JSON.parse(data))
      }
    } catch {}
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
        Chargement des étiquettes...
      </div>
    )
  }

  if (labels.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ color: '#666', fontSize: 14 }}>Aucune étiquette à imprimer</p>
        <Link href="/admin" style={{ color: '#C4962A', fontSize: 14, textDecoration: 'none' }}>← Retour à l&apos;admin</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      {/* Header — hidden on print */}
      <div className="print-hide" style={{ background: '#111', borderBottom: '2px solid #C4962A', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2, margin: 0 }}>Étiquettes GLS</h1>
          <p style={{ color: '#C4962A', fontSize: 13, margin: '2px 0 0' }}>{labels.length} étiquette{labels.length > 1 ? 's' : ''} prête{labels.length > 1 ? 's' : ''}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/admin" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, borderRadius: 4, cursor: 'pointer', textDecoration: 'none' }}>
            ← Admin
          </Link>
          <button onClick={() => window.print()} style={{ background: 'linear-gradient(135deg,#C4962A,#E8B84B)', color: '#000', border: 'none', padding: '10px 24px', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, borderRadius: 4, cursor: 'pointer' }}>
            Imprimer tout
          </button>
        </div>
      </div>

      {/* Labels */}
      <div style={{ padding: 24, maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {labels.map((label, i) => (
          <div key={i} className="label-container">
            {/* Label header — hidden on print */}
            <div className="print-hide" style={{ background: '#1a1a1a', padding: '10px 16px', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#C4962A', fontWeight: 900, fontSize: 14, letterSpacing: 1 }}>{label.id}</span>
              <span style={{ color: '#9ca3af', fontSize: 13 }}>{label.client}</span>
            </div>
            {/* PDF rendered as image from base64 */}
            <div style={{ background: '#fff', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
              <PdfViewer base64={label.b64} id={label.id} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          .print-hide { display: none !important; }
          body { background: #fff !important; }
          .label-container { page-break-after: always; }
          .label-container:last-child { page-break-after: avoid; }
        }
      `}</style>
    </div>
  )
}

function PdfViewer({ base64, id }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!base64) return
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const blobUrl = URL.createObjectURL(blob)
    setUrl(blobUrl)
    return () => URL.revokeObjectURL(blobUrl)
  }, [base64])

  if (!url) return <div style={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>Chargement...</div>

  return (
    <iframe
      src={url}
      title={`Étiquette ${id}`}
      style={{ width: '100%', height: 600, border: 'none', display: 'block' }}
    />
  )
}
