function CommandesTab() {
  const [filtre, setFiltre] = useState('tous')
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState(null)

  const filtered = mockOrders.filter(o => {
    if (filtre !== 'tous' && o.statut !== filtre) return false
    if (dateDebut && o.date < dateDebut) return false
    if (dateFin && o.date > dateFin) return false
    return true
  })

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(o => o.id))
  const selectedOrders = mockOrders.filter(o => selected.includes(o.id))

  if (detail) {
    return (
      <div>
        <button onClick={() => setDetail(null)} className="mb-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300">← Retour aux commandes</button>
        <div className="p-6 rounded-xl border border-white/10" style={{background:'rgba(255,255,255,0.05)'}}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-yellow-400">{detail.id}</h2>
              <p className="text-gray-400">{detail.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${detail.statut === 'à expédier' ? 'bg-red-500/20 text-red-400' : detail.statut === 'expédié' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{detail.statut}</span>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm text-gray-400 mb-2 uppercase">Client</h3>
              <p className="font-medium">{detail.client}</p>
              <p className="text-gray-400 text-sm">{detail.email}</p>
              <p className="text-gray-400 text-sm">{detail.adresse}</p>
            </div>
          </div>
          <table className="w-full mb-4">
            <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-gray-400 text-sm">Article</th><th className="text-center py-2 text-gray-400 text-sm">Taille</th><th className="text-center py-2 text-gray-400 text-sm">Qté</th><th className="text-right py-2 text-gray-400 text-sm">Prix</th></tr></thead>
            <tbody>{detail.articles.map((a, i) => <tr key={i} className="border-b border-white/5"><td className="py-2">{a.nom}</td><td className="py-2 text-center">{a.taille}</td><td className="py-2 text-center">{a.qty}</td><td className="py-2 text-right">{a.prix}€</td></tr>)}</tbody>
          </table>
          <div className="text-right text-xl font-bold text-yellow-400">Total : {detail.total}€</div>
          <button onClick={() => printMultiple([detail])} className="mt-4 px-6 py-2 rounded-lg font-bold text-black" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>🖨️ Imprimer le bordereau</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">Commandes</h2>
        <button
          onClick={() => printMultiple(filtered)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black text-sm"
          style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}
        >
          🖨️ Imprimer tous les bordereaux ({filtered.length})
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {['tous','à expédier','expédié','livré'].map(s => (
          <button key={s} onClick={() => setFiltre(s)} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtre === s ? 'text-black border-yellow-500' : 'text-gray-300 border-white/20 hover:border-yellow-500/50'}`} style={filtre === s ? {background:'linear-gradient(135deg,#C4962A,#E8B84B)'} : {}}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
        ))}
      </div>

      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm text-white border border-white/20" style={{background:'rgba(255,255,255,0.07)'}} />
        <span className="text-gray-400">→</span>
        <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm text-white border border-white/20" style={{background:'rgba(255,255,255,0.07)'}} />
        {selected.length > 0 && (
          <button onClick={() => printMultiple(selectedOrders)} className="ml-auto px-5 py-1.5 rounded-lg font-bold text-black text-sm" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>
            🖨️ Imprimer la sélection ({selected.length})
          </button>
        )}
      </div>

      <div className="rounded-xl overflow-hidden border border-white/10">
        <table className="w-full">
          <thead>
            <tr style={{background:'rgba(255,255,255,0.07)'}}>
              <th className="p-3 text-left"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded" /></th>
              <th className="p-3 text-left text-gray-400 text-sm">Commande</th>
              <th className="p-3 text-left text-gray-400 text-sm">Date</th>
              <th className="p-3 text-left text-gray-400 text-sm">Client</th>
              <th className="p-3 text-left text-gray-400 text-sm">Total</th>
              <th className="p-3 text-left text-gray-400 text-sm">Statut</th>
              <th className="p-3 text-left text-gray-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-3"><input type="checkbox" checked={selected.includes(order.id)} onChange={() => toggleSelect(order.id)} /></td>
                <td className="p-3 font-mono text-yellow-400 text-sm">{order.id}</td>
                <td className="p-3 text-gray-300 text-sm">{order.date}</td>
                <td className="p-3 text-sm">{order.client}</td>
                <td className="p-3 font-medium">{order.total}€</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.statut === 'à expédier' ? 'bg-red-500/20 text-red-400' : order.statut === 'expédié' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{order.statut}</span></td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => setDetail(order)} className="px-3 py-1 rounded text-xs border border-white/20 hover:border-yellow-500/50 transition-colors">Voir</button>
                  <button onClick={() => printMultiple([order])} className="px-3 py-1 rounded text-xs border border-white/20 hover:border-yellow-500/50 transition-colors">🖨️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
