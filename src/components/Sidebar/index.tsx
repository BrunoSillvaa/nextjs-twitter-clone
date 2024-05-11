import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'

import { Logo } from './Logo'
import { Item } from './Item'
import { BiLogOut } from 'react-icons/bi'
import { TweetButton } from './TweetButton'

export function Sidebar() {
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
    },
    {
      label: 'Profile',
      href: '/users/123',
      icon: FaUser,
    },
  ]

  return (
    <aside className='col-span-1 h-full'>
      <div className='flex flex-col items-center'>
        <div className='space-y-2 lg:w-[230px]'>
          <Logo />
          {items.map(item => (
            <Item
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          <Item
            onClick={() => {}}
            icon={BiLogOut}
            label='Logout'
            href='/logout'
          />
          <TweetButton />
        </div>
      </div>
    </aside>
  )
}
