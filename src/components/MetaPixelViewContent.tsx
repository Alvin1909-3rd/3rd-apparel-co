'use client'

import { useEffect } from 'react'
import { pixelViewContent } from '@/lib/pixel'

interface Props {
  productId: string
  name: string
  value: number
}

export default function MetaPixelViewContent({ productId, name, value }: Props) {
  useEffect(() => {
    pixelViewContent(productId, name, value)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
