import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import Image from 'next/image'

interface ImageUploadProps {
  label: string
  value?: string
  disabled?: boolean
  isRounded?: boolean
  onChange: (selectedFile: string) => void
}

export function ImageUpload({
  label,
  value,
  isRounded,
  disabled,
  onChange
}: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState(value)
  const [preview, setPreview] = useState('')

  const onDrop = (files: any) => {
    const file = files[0]
    if (file) {
      onChange(file)
  
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled,
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  const handleRemove = () => {
    setSelectedFile('')
    setPreview('')
  }

  return (

    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer'
      })}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className={'flex items-center justify-center'}>
          <Image
            src={preview}
            height='100'
            width='100'
            alt='Uploaded image'
            className={isRounded ? 'rounded-full' : 'rounded-md'}
          />
        </div>
      ) : (
        <p className='text-white'>{label}</p>
      )}
    </div>
  )
}
