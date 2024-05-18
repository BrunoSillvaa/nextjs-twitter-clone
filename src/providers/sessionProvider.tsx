'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export default function NextAuthSessionProvider({
  children
}: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
