import { IconType } from 'react-icons'
import {Inter} from 'next/font/google'

interface ItemProps {
  href: string
  label: string
  icon: IconType
  onClick?: () => void
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export function Item({ href, label, icon: Icon }: ItemProps) {
  return (
    <div className="flex flex-row items-center">
      <div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
      </div>

      <div className="relative hidden cursor-pointer items-center gap-4 rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex">
        <Icon size={24} color="white" />
        <p className={` hidden lg:block text-neutral-200 text-xl`}>{label}</p>
      </div>
    </div>
  )
}
