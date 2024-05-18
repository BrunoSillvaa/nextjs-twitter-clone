'use client'

import { signOut } from 'next-auth/react'

import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

import { SidebarLogo } from './SidebarLogo'
import { SidebarItem } from './SidebarItem'
import { SidebarTweetButton } from './SidebarTweetButton'

import useCurrentUser from '@/hooks/useCurrentUser'

export function Sidebar() {
  const { data: currentUser } = useCurrentUser()

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true
    },
    {
      label: 'Profile',
      href: `/users/12`,
      icon: FaUser,
      auth: true
    }
  ]

  return (
    <aside className='col-span-1 h-full'>
      <div className='flex flex-col items-center'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map(item => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label='Logout'
              href='/logout'
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </aside>
  )
}
