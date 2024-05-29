'use client'

import { useState } from 'react'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import useCurrentUser from '@/hooks/useCurrentUser'
import usePosts from '@/hooks/usePosts'

import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from '../Button'
import { Avatar } from '../Avatar'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
}

export function Form({ placeholder, isComment, postId }: FormProps) {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()
  const { mutate: mutatePosts } = usePosts()

  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      await axios.post('/api/posts', {
        body
      })

      toast.success('Tweet Created')

      setBody('')

      mutatePosts()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className='w-full'>
            <textarea
              className='placeholder:neutral-500 peer mt-3 w-full resize-none bg-black text-[20px] text-white outline-none ring-0 disabled:opacity-80'
              placeholder={placeholder}
              disabled={isLoading}
              onChange={e => setBody(e.target.value)}
              value={body}
            />

            <hr className='opacity-0 -[1px] w-full border-neutral-800 transition peer-focus:opacity-100' />
            
            <div className='mt-4 flex flex-row justify-end'>
              <Button
                label='Tweet'
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='mb-4 text-center text-2xl font-bold text-white'>
            Welcome to Twitter
          </h1>

          <div className='flex flex-row items-center justify-center gap-4'>
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button label='Register' onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  )
}
