import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateSliderMutation, useGetAllSliderQuery } from '../../redux/features/slider/sliderApi'

type Props = {
    setActive: (active: boolean) => void;
}

export default function SliderModal({ setActive }: Props) {
    const [createSlider, { isLoading, isSuccess, error }] = useCreateSliderMutation()
    const { refetch } = useGetAllSliderQuery({}, { refetchOnMountOrArgChange: true })

    const [data, setFormData] = useState({
        title: '',
        thumbnail: '',
        url: '',
        isApprove: false
    })


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const compressedImage = await compressImage(file)
                setFormData(prev => ({ ...prev, thumbnail: compressedImage }))
            } catch (error) {
                console.error('Error processing image:', error)
                toast.error('Failed to process image')
            }
        }
    }

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target?.result as string
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')
                    canvas.width = 1200
                    canvas.height = 600

                    ctx?.drawImage(img, 0, 0, 1200, 600)

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
                    }, 'image/jpeg', 0.7) // Adjust quality to meet 100KB limit
                }
                img.onerror = () => reject(new Error('Failed to load image'))
            }
            reader.onerror = () => reject(new Error('Failed to read file'))
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createSlider(data)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Slider created successfully")
            setActive(false)
            refetch()
        }
        if (error && 'data' in error) {
            toast.error((error.data as any).message)
        }
    }, [isSuccess, error, setActive, refetch])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Add Slider</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={() => setActive(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={handleInputChange}
                            required
                            placeholder="Eg. Enjoying the grace of God"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="url"
                            name="url"
                            value={data.url}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">--Select--</option>
                            <option value="Store">Store</option>
                            <option value="Sermon">Sermon</option>
                            <option value="Schedule">Schedule</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isApprove"
                            name="isApprove"
                            checked={data.isApprove}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="isApprove" className="ml-2 block text-sm text-gray-900">
                            Approve
                        </label>
                    </div>
                    {!data.isApprove && (
                        <p className="text-xs text-red-500">Set approved to true</p>
                    )}
                    <div>
                        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                            Thumbnail
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
                    {data.thumbnail && (
                        <div className="mt-2">
                            <img
                                src={data.thumbnail}
                                alt="Thumbnail preview"
                                className="max-w-full h-auto rounded"
                            />
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Creating...' : 'Create Slider'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}