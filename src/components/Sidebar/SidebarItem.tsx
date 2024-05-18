import { IconType } from 'react-icons'
import { Inter } from 'next/font/google'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'

interface SidebarItemProps {
  href: string
  label: string
  icon: IconType
  auth?: boolean
  onClick?: () => void
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export function SidebarItem({
  href,
  label,
  icon: Icon,
  auth,
  onClick
}: SidebarItemProps) {
  const { data: currentUser } = useCurrentUser()
  const loginModal = useLoginModal()
  const router = useRouter()

  const handleClick = useCallback(() => {
    if (onClick) return onClick()

    if (auth && !currentUser) loginModal.onOpen()
    else if (href) router.push(href)
  }, [onClick, href, router, auth, currentUser, loginModal])

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div className='relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden'>
        <Icon size={28} color='white' />
      </div>

      <div className='relative hidden cursor-pointer items-center gap-4 rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex'>
        <Icon size={24} color='white' />
        <p className={` hidden text-xl text-neutral-200 lg:block`}>{label}</p>
      </div>
    </div>
  )
}
