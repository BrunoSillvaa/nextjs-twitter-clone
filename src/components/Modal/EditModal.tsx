'use client'

import { useCallback, useEffect, useState } from 'react'

import useEditModal from '@/hooks/useEditModal'

import { Input } from '../Input'
import { Modal } from './index'

import toast from 'react-hot-toast'
import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import { ImageUpload } from '../ImageUpload'

export function EditModal() {
  const editModal = useEditModal()

  const { data: currentUser } = useCurrentUser()
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id)

  const [coverImage, setCoverImage] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCoverImage(currentUser?.coverImage)
    setProfileImage(currentUser?.profileImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
  }, [currentUser])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.patch('/api/edit', {
        coverImage,
        profileImage,
        name,
        username,
        bio
      })
      
      mutateFetchedUser()

      toast.success('Updated!', {
        duration: 4000,
        position: 'top-center'
      })

      editModal.onClose()

    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }, [
    coverImage,
    profileImage,
    name,
    username,
    bio,
    editModal,
    mutateFetchedUser
  ])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        label='Upload profile Image'
        value={profileImage}
        disabled={isLoading}
        isRounded
        onChange={image => setProfileImage(image)}
      />

      <ImageUpload
        label='Upload cover Image'
        value={coverImage}
        disabled={isLoading}
        onChange={image => setCoverImage(image)}
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
        placeholder='Bio'
        onChange={e => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='mt-4 text-center text-neutral-400'>
      <p>
        First time using Twitter?
        <span
          // onClick={onToogle}
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
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
