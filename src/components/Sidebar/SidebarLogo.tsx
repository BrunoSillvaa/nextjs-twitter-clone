'use client'

import { useRouter } from 'next/navigation'
import { BsTwitter } from 'react-icons/bs'

export function SidebarLogo() {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/')}
      className='flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 transition hover:bg-blue-300 hover:bg-opacity-10'
    >
      <BsTwitter size={28} color='white' />
    </div>
  )
}
