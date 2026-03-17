'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CommandeDetailPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/connexion')
  }, [router])

  return null
}
