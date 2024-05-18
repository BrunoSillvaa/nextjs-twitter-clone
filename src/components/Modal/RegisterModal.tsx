'use client'

import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'

import axios from 'axios'
import toast from 'react-hot-toast'

import { Input } from '../Input'
import { Modal } from './index'

import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'

export function RegisterModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('bruno.silva@gmail.com')
  const [password, setPassword] = useState('Snapdrag0n')
  const [name, setName] = useState('Bruno Silva')
  const [username, setUsername] = useState('brunosillvaa__')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.post('/api/register', {
        email,
        name,
        username,
        password
      })

      toast.success('Account created.')

      await signIn('credentials', {
        email,
        password
      })

      registerModal.onClose()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, name, username, password])

  const onToogle = useCallback(() => {
    if (isLoading) return

    registerModal.onClose()
    loginModal.onOpen()
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
        placeholder='Name'
        onChange={e => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />

      <Input
        placeholder='Username'
        onChange={e => setUsername(e.target.value)}
        value={username}
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
        Already have an account?
        <span
          onClick={onToogle}
          className='ml-1 cursor-pointer text-white hover:underline'
        >
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Create an account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
