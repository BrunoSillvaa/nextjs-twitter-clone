'use client'

import useUsers from '@/hooks/useUsers'
import { Avatar } from '../Avatar'

export function FollowBar() {
  const { data: fetchedUsers = [] } = useUsers()

  if (fetchedUsers.lenght === 0 ) {
    return null
  }

  return (
    <aside className='hidden px-6 py-4 lg:block'>
      <div className='rounded-xl bg-neutral-800 p-4'>
        <h2 className='text-lg font-normal text-white'>Who to follow?</h2>
        <div className='mt-4 flex flex-col gap-6'>
          {fetchedUsers.map((user: Record<string, any>) => (
            <div className='flex flex-row gap-4' key={user.id}>
                <Avatar userId={user.id} />
                <div className='flex flex-col'>
                  <p className='text-white font-semibold text-sm'>{user.name}</p>
                  <p className='text-neutral-400 text-sm'>@{user.username}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
