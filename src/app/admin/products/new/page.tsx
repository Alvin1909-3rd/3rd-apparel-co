export const dynamic = 'force-dynamic'

import { getAdminSession } from '@/lib/adminAuth'
import { redirect } from 'next/navigation'
import NewClient from './NewClient'

export default async function NewProductPage() {
  const { valid } = await getAdminSession()
  if (!valid) redirect('/admin/login')
  return <NewClient />
}
