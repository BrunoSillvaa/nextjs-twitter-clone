'use client'

import { useCallback, useState } from 'react'

import useLoginModal from '@/hooks/useLoginModal'

import { Input } from '../Input'
import { Modal } from '../Modal'
import useRegisterModal from '@/hooks/useRegisterModal'

export function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      loginModal.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal])

  const onToogle = useCallback(() => {
    if (isLoading) return

    loginModal.onClose()
    registerModal.onOpen()
  }, [isLoading, registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={e => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />

      <Input
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='mt-4 text-center text-neutral-400'>
      <p>
        First time using Twitter?
        <span
          onClick={onToogle}
          className='ml-1 cursor-pointer text-white hover:underline'
        >
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
