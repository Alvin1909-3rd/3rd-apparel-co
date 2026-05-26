export const dynamic = 'force-dynamic'

import { getAdminSession } from '@/lib/adminAuth'
import { redirect } from 'next/navigation'
import EditClient from './EditClient'

export default async function EditProductPage() {
  const { valid } = await getAdminSession()
  if (!valid) redirect('/admin/login')
  return <EditClient />
}
