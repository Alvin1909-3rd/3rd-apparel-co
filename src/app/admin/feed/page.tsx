export const dynamic = 'force-dynamic'

import { getAdminSession } from '@/lib/adminAuth'
import { redirect } from 'next/navigation'
import FeedClient from './FeedClient'

export default async function AdminFeedPage() {
  const { valid } = await getAdminSession()
  if (!valid) redirect('/admin/login')
  return <FeedClient />
}
