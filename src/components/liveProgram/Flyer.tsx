import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateFlyerMutation, useEditFlyerMutation, useGetAllFlyerQuery } from '../../redux/features/flyer/flyerApi'

type Props = {
  setOpen: (open: boolean) => void
}

export default function Flyer({ setOpen }: Props) {
  const [createFlyer, { isLoading: isCreating, isSuccess: createSuccess, error: createError }] = useCreateFlyerMutation()
  const [editFlyer, { isLoading: isUpdating, isSuccess: updateSuccess, error: updateError }] = useEditFlyerMutation()
  const { data: flyerData, refetch } = useGetAllFlyerQuery({}, { refetchOnMountOrArgChange: true })

  const [formData, setFormData] = useState({
    id: '',
    note: '',
    thumbnail: '',
    thumbnailPreview: '',
    isApprove: false
  })

  useEffect(() => {
    if (flyerData?.live) {
      setFormData({
        id: flyerData.live._id,
        note: flyerData.live.note,
        thumbnail: '',
        thumbnailPreview: flyerData.live.thumbnail?.url || '',
        isApprove: flyerData.live.isApprove
      })
    }
  }, [flyerData])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const resizeAndCompressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = 700
          canvas.height = 1000

          ctx?.drawImage(img, 0, 0, 700, 1000)

          canvas.toBlob((blob) => {
            if (blob) {
              const reader = new FileReader()
              reader.readAsDataURL(blob)
              reader.onloadend = () => {
                const base64data = reader.result as string
                resolve(base64data)
              }
            } else {
              reject(new Error('Failed to create blob'))
            }
          }, 'image/jpeg', 0.7)
        }
        img.onerror = () => reject(new Error('Failed to load image'))
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
    })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const resizedImage = await resizeAndCompressImage(file)
        setFormData(prev => ({
          ...prev,
          thumbnail: resizedImage,
          thumbnailPreview: resizedImage
        }))
      } catch (error) {
        console.error('Error processing image:', error)
        toast.error('Failed to process image')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { id, note, thumbnail, isApprove } = formData
    const data = { note, thumbnail, isApprove }

    if (id) {
      await editFlyer({ id, data })
    } else {
      await createFlyer(data)
    }
  }

  useEffect(() => {
    if (createSuccess) {
      toast.success("Flyer created successfully")
      setOpen(false)
      refetch()
    }
    if (updateSuccess) {
      toast.success("Flyer updated successfully")
      setOpen(false)
      refetch()
    }
    if (createError || updateError) {
      const error:any = createError || updateError
      if ("data" in error) {
        toast.error((error.data as any).message)
      }
    }
  }, [createSuccess, updateSuccess, createError, updateError, setOpen, refetch])

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            maxLength={150}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter note (max 150 characters)"
            rows={3}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isApprove"
            name="isApprove"
            checked={formData.isApprove}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="isApprove" className="ml-2 block text-sm text-gray-900">
            Approve
          </label>
        </div>
        {!formData.isApprove && (
          <p className="text-xs text-red-500">Set approved to true</p>
        )}

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Flyer Image
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        {(formData.thumbnailPreview || formData.thumbnail) && (
          <div className="mt-2">
            <img
              src={formData.thumbnailPreview || formData.thumbnail}
              alt="Flyer preview"
              className="max-h-[150px] w-full object-cover rounded"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isCreating || isUpdating ? 'Processing...' : formData.id ? 'Update Flyer' : 'Create Flyer'}
          </button>
        </div>
      </form>
    </div>
  )
}