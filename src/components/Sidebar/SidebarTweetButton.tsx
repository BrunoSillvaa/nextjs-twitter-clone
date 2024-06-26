'use client'

import useLoginModal from '@/hooks/useLoginModal'
import { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa'

export function SidebarTweetButton() {
  const loginModal = useLoginModal()

  const onClick = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal])

  return (
    <div onClick={onClick}>
      <div className='mt-6 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-sky-500 p-4 hover:bg-opacity-80 lg:hidden'>
        <FaFeather size={24} color='white' />
      </div>

      <div className='mt-6 hidden cursor-pointer items-center justify-center rounded-full bg-sky-500 px-4 py-2 hover:bg-opacity-90 lg:flex'>
        <p className='hidden text-center text-lg font-bold text-white lg:block'>
          Tweet
        </p>
      </div>
    </div>
  )
}
