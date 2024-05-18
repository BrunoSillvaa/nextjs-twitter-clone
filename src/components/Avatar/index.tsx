'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import useUser from '@/hooks/useUser'
import Image from 'next/image'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

export function Avatar({ userId, isLarge, hasBorder }: AvatarProps) {
  const { data: user } = useUser(userId)
  const router = useRouter()

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation()

      const url = `/users/${userId}`

      router.push(url)
    },
    [userId, router]
  )

  return (
    <div
      className={`
      ${hasBorder && 'border-4 border-black'}
      ${isLarge ? 'h-32' : 'h-12'}
      ${isLarge ? 'w-32' : 'w-12'}
      relative
      cursor-pointer
      rounded-full
      transition
      hover:opacity-90
    `}
    >
      <Image
        fill
        alt='Avatar'
        onClick={onClick}
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        src={user?.profileImage || '/images/placeholder.png'}
      />
    </div>
  )
}
