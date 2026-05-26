'use client'

import { useEffect } from 'react'
import { pixelPurchase } from '@/lib/pixel'

interface Props {
  value: number
  contentIds: string[]
  numItems: number
}

export default function MetaPixelPurchase({ value, contentIds, numItems }: Props) {
  useEffect(() => {
    pixelPurchase(value, contentIds, numItems)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
