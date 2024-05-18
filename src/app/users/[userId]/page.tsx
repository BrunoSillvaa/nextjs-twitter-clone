'use client'

import useUser from '@/hooks/useUser'

import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

import { Header } from '@/components/Header'
import { UserHero } from '@/components/User/UserHero'
import { UserBio } from '@/components/User/UserBio'

export default function UserView() {
  const { userId } = useParams()
  const { data: user, isLoading } = useUser(userId as string)

  if (isLoading || !user) {
    return (
      <div className='flex h-full items-center justify-center'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header label={user?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  )
}
