import { ReactNode } from 'react'
import { Sidebar } from '../Sidebar'
import { FollowBar } from '../FollowBar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className='xl:px-30 container mx-auto grid h-full max-w-6xl grid-cols-4'>
      <Sidebar />
      
      <div className='col-span-3 border-x-[1px] border-neutral-800 lg:col-span-2'>
        {children}
      </div>

      <FollowBar />
    </main>
  )
}
