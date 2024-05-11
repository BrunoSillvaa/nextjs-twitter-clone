'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface HeaderProps {
  label: string
  showBackArrow?: boolean
}

export function Header({ label, showBackArrow }: HeaderProps) {
  const router = useRouter()
  const handleback = useCallback(() => {
    router.back()
  }, [router])

  return (
    <header className='border-b-[1px] border-neutral-800 p-5'>
      <div className='flex flex-row items-center gap-2'>
        {showBackArrow && (
          <BiArrowBack
            className='cursor-pointer transition hover:opacity-70'
            onClick={handleback}
            size={20}
            color='white'
          />
        )}
        <h1 className='text-xl font-semibold text-white'>{label}</h1>
      </div>
    </header>
  )
}
