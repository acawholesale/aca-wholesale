function CommandesTab() {
  const [filtre, setFiltre] = useState('tous')
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState(null)
  const [orders, setOrders] = useState(mockOrders)
  const [bulkConfirm, setBulkConfirm] = useState(null)

  const filtered = orders.filter(function(o) {
    if (filtre !== 'tous' && o.statut !== filtre) return false
    if (dateDebut && o.date < dateDebut) return false
    if (dateFin && o.date > dateFin) return false
    return true
  })

  const toggleSelect = function(id) { setSelected(function(s) { return s.includes(id) ? s.filter(function(x){return x!==id}) : [...s, id] }) }
  const toggleAll = function() { setSelected(selected.length === filtered.length ? [] : filtered.map(function(o){return o.id})) }
  const selectedOrders = orders.filter(function(o) { return selected.includes(o.id) })

  const changeStatut = function(id, newStatut) {
    setOrders(function(prev) { return prev.map(function(o) { return o.id === id ? Object.assign({}, o, {statut: newStatut}) : o }) })
    if (detail && detail.id === id) setDetail(function(prev) { return Object.assign({}, prev, {statut: newStatut}) })
  }

  const bulkChangeStatut = function(newStatut) {
    setOrders(function(prev) { return prev.map(function(o) { return selected.includes(o.id) ? Object.assign({}, o, {statut: newStatut}) : o }) })
    setBulkConfirm(newStatut)
    setTimeout(function() {
      setSelected([])
      setBulkConfirm(null)
    }, 1500)
  }

  const statutOptions = ['à expédier', 'expédié', 'livré']
  const statutClass = { 'à expédier': 'bg-red-500/20 text-red-400', 'expédié': 'bg-blue-500/20 text-blue-400', 'livré': 'bg-green-500/20 text-green-400' }
  const statutBtnStyle = { 'à expédier': {background:'rgba(239,68,68,0.2)', color:'#f87171', border:'1px solid rgba(239,68,68,0.3)'}, 'expédié': {background:'rgba(59,130,246,0.2)', color:'#60a5fa', border:'1px solid rgba(59,130,246,0.3)'}, 'livré': {background:'rgba(34,197,94,0.2)', color:'#4ade80', border:'1px solid rgba(34,197,94,0.3)'} }

  if (detail) {
    return (
      <div>
        <button onClick={function(){setDetail(null)}} className="mb-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300">← Retour aux commandes</button>
        <div className="p-6 rounded-xl border border-white/10" style={{background:'rgba(255,255,255,0.05)'}}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-yellow-400">{detail.id}</h2>
              <p className="text-gray-400">{detail.date}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (statutClass[detail.statut] || '')}>{detail.statut}</span>
              <div className="flex gap-1 flex-wrap justify-end">
                {statutOptions.filter(function(s){return s !== detail.statut}).map(function(s) {
                  return (
                    <button key={s} onClick={function(){changeStatut(detail.id, s)}} className="px-3 py-1 rounded-full text-xs border transition-all hover:opacity-80" style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.15)', color:'#ccc'}}>
                      → {s}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-2 uppercase">Client</h3>
            <p className="font-medium">{detail.client}</p>
            <p className="text-gray-400 text-sm">{detail.email}</p>
            <p className="text-gray-400 text-sm">{detail.adresse}</p>
          </div>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 text-gray-400 text-sm">Article</th>
                <th className="text-center py-2 text-gray-400 text-sm">Taille</th>
                <th className="text-center py-2 text-gray-400 text-sm">Qté</th>
                <th className="text-right py-2 text-gray-400 text-sm">Prix</th>
              </tr>
            </thead>
            <tbody>
              {detail.articles.map(function(a, i) {
                return (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2">{a.nom}</td>
                    <td className="py-2 text-center">{a.taille}</td>
                    <td className="py-2 text-center">{a.qty}</td>
                    <td className="py-2 text-right">{a.prix}€</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="text-right text-xl font-bold text-yellow-400">Total : {detail.total}€</div>
          <button onClick={function(){printMultiple([detail])}} className="mt-4 px-6 py-2 rounded-lg font-bold text-black" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>🖨️ Imprimer le bordereau</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">Commandes</h2>
        <button onClick={function(){printMultiple(filtered)}} className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black text-sm" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>
          🖨️ Imprimer tous ({filtered.length})
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {['tous','à expédier','expédié','livré'].map(function(s) {
          return (
            <button key={s} onClick={function(){setFiltre(s)}} className={'px-4 py-1.5 rounded-full text-sm font-medium border transition-all ' + (filtre === s ? 'text-black border-yellow-500' : 'text-gray-300 border-white/20 hover:border-yellow-500/50')} style={filtre === s ? {background:'linear-gradient(135deg,#C4962A,#E8B84B)'} : {}}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <input type="date" value={dateDebut} onChange={function(e){setDateDebut(e.target.value)}} className="px-3 py-1.5 rounded-lg text-sm text-white border border-white/20" style={{background:'rgba(255,255,255,0.07)'}} />
        <span className="text-gray-400">→</span>
        <input type="date" value={dateFin} onChange={function(e){setDateFin(e.target.value)}} className="px-3 py-1.5 rounded-lg text-sm text-white border border-white/20" style={{background:'rgba(255,255,255,0.07)'}} />
      </div>

      {/* Barre d'actions groupées */}
      {selected.length > 0 && (
        <div className="mb-4 p-4 rounded-xl flex flex-wrap items-center gap-3" style={{background:'rgba(196,150,42,0.12)', border:'1px solid rgba(196,150,42,0.35)'}}>
          {bulkConfirm ? (
            <span className="text-green-400 font-bold text-sm">✓ {selected.length} commande{selected.length > 1 ? 's' : ''} passée{selected.length > 1 ? 's' : ''} en &quot;{bulkConfirm}&quot;</span>
          ) : (
            <>
              <span className="text-yellow-300 font-bold text-sm">{selected.length} sélectionnée{selected.length > 1 ? 's' : ''} —</span>
              <span className="text-gray-400 text-sm">Changer le statut :</span>
              {statutOptions.map(function(s) {
                return (
                  <button key={s} onClick={function(){bulkChangeStatut(s)}} className="px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:opacity-80" style={statutBtnStyle[s]}>
                    {s === 'à expédier' ? '⏳' : s === 'expédié' ? '📦' : '✅'} {s}
                  </button>
                )
              })}
              <button onClick={function(){printMultiple(selectedOrders)}} className="ml-auto px-4 py-1.5 rounded-lg font-bold text-black text-xs" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>
                🖨️ Imprimer ({selected.length})
              </button>
            </>
          )}
        </div>
      )}

      <div className="rounded-xl overflow-hidden border border-white/10">
        <table className="w-full">
          <thead>
            <tr style={{background:'rgba(255,255,255,0.07)'}}>
              <th className="p-3 text-left"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
              <th className="p-3 text-left text-gray-400 text-sm">Commande</th>
              <th className="p-3 text-left text-gray-400 text-sm">Date</th>
              <th className="p-3 text-left text-gray-400 text-sm">Client</th>
              <th className="p-3 text-left text-gray-400 text-sm">Total</th>
              <th className="p-3 text-left text-gray-400 text-sm">Statut</th>
              <th className="p-3 text-left text-gray-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(function(order) {
              return (
                <tr key={order.id} className={'border-t border-white/5 hover:bg-white/5 transition-colors' + (selected.includes(order.id) ? ' bg-yellow-500/5' : '')}>
                  <td className="p-3"><input type="checkbox" checked={selected.includes(order.id)} onChange={function(){toggleSelect(order.id)}} /></td>
                  <td className="p-3 font-mono text-yellow-400 text-sm">{order.id}</td>
                  <td className="p-3 text-gray-300 text-sm">{order.date}</td>
                  <td className="p-3 text-sm">{order.client}</td>
                  <td className="p-3 font-medium">{order.total}€</td>
                  <td className="p-3">
                    <select value={order.statut} onChange={function(e){changeStatut(order.id, e.target.value)}} className={'px-2 py-1 rounded-full text-xs font-medium cursor-pointer outline-none ' + (statutClass[order.statut] || '')} style={{background:'transparent', border:'1px solid rgba(255,255,255,0.15)'}}>
                      {statutOptions.map(function(s) { return <option key={s} value={s} style={{background:'#1a1a1a', color:'#fff'}}>{s}</option> })}
                    </select>
                  </td>
                  <td className="p-3">
                    <button onClick={function(){setDetail(order)}} className="px-3 py-1 rounded text-xs border border-white/20 hover:border-yellow-500/50 transition-colors">Voir</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
