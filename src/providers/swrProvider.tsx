'use client'

import fetcher from '@/libs/fetcher'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{ fetcher, refreshInterval: 3000, revalidateIfStale: false }}
    >
      {children}
    </SWRConfig>
  )
}
