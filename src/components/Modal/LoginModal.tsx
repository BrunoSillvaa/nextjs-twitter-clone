'use client'

import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import { Input } from '../Input'
import { Modal } from './index'

import toast from 'react-hot-toast'

export function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('bruno.silva@gmail.com')
  const [password, setPassword] = useState('Snapdrag0n')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      const result = await signIn('credentials', {
        email,
        password,
        redirect: true
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      toast.success('Logado com sucesso!', {
        duration: 4000,
        position: 'top-right'
      })

      loginModal.onClose()
    } catch (error) {
      toast.error('Falha ao logar!')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal, email, password])

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
        type='password'
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
