'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import { Avatar } from '@/components/Avatar'
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'

interface PostItemProps {
  userId?: string
  data?: Record<string, any>
}

export function PostItem({ userId, data }: PostItemProps) {
  const router = useRouter()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()

  const goToUser = (event: any) => {
    event.stopPropagation()

    router.push(`/users/${data?.user.id}`)
  }

  const goToPost = () => {
    router.push(`/posts/${data?.id}`)
  }

  const onLike = (event: any) => {
    event.stopPropagation()

    loginModal.onOpen()
  }

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null
    return formatDistanceToNowStrict(data?.createdAt)
  }, [data])

  return (
    <div
      onClick={goToPost}
      className='cursor-pointer border-b-[1px] border-neutral-800 p-5 transition hover:bg-neutral-900'
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar userId={data?.user.id} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={goToUser}
              className='cursor-pointer font-semibold text-white hover:underline'
            >
              {data?.user.name}
            </p>

            <span
              onClick={goToUser}
              className='hidden cursor-pointer text-neutral-500 hover:underline md:block'
            >
              @{data?.user.username}
            </span>

            <span className='text-sm text-neutral-500'>{createdAt}</span>
          </div>

          <div className='mt-1 text-white'>{data?.body}</div>

          <div className='mt-3 flex flex-row items-center gap-10'>
            <div className='flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{data?.comments?.length || 0}</p>
            </div>

            <div
              onClick={onLike}
              className='flex cursor-pointer flex-row items-center gap-2 text-neutral-500 transition hover:text-red-500'
            >
              <AiOutlineHeart size={20} />
              <p>{data?.comments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
