'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
      style={{ border: '1px solid #2e2e2e', color: '#9e9a94' }}
    >
      Logout
    </button>
  )
}
