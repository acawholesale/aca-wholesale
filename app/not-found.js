import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-black text-white/10 select-none mb-2">404</p>
      <h1 className="text-3xl font-bold mb-3">Page introuvable</h1>
      <p className="text-white/50 mb-8 max-w-md">
        Cette page n&apos;existe pas ou a été déplacée.
        Revenez à l&apos;accueil pour découvrir nos lots.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition"
        >
          Accueil
        </Link>
        <Link
          href="/produits"
          className="border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:border-white/50 transition"
        >
          Nos lots
        </Link>
      </div>
    </main>
  )
}
