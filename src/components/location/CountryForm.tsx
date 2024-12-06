'use client'

import React, { useState } from 'react'
import { PlusCircle, MinusCircle, MapPin } from 'lucide-react'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

interface Church {
  name: string
  latitude: number
  longitude: number
  landmarks: string[]
  address: string
  description?: string
}

interface Region {
  name: string
  capital?: string
  population: number | null
  churches: Church[]
}

interface CountryFormData {
  name: string
  capital: string
  countryCode: string
  currency: string
  languages: string[]
  continent: string
  regions: Region[]
}

interface CountryFormProps {
  initialData?: CountryFormData
  onSubmit: (data: CountryFormData) => Promise<void>
  isUpdate?: boolean
}

export default function CountryForm({ initialData, onSubmit, isUpdate }: CountryFormProps) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CountryFormData>(initialData || {
    name: '',
    capital: '',
    countryCode: "",
    currency: '',
    languages: [],
    continent: '',
    regions: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'languages' ? value.split(',') : value,
    }))
  }

  const handleRegionChange = (index: number, field: keyof Region, value: any) => {
    setFormData(prev => {
      const updatedRegions = [...prev.regions]
      updatedRegions[index] = { ...updatedRegions[index], [field]: value }
      return { ...prev, regions: updatedRegions }
    })
  }

  const handleChurchChange = (regionIndex: number, churchIndex: number, field: keyof Church, value: any) => {
    setFormData(prev => {
      const updatedRegions = [...prev.regions]
      const updatedChurches = [...updatedRegions[regionIndex].churches]
      updatedChurches[churchIndex] = { 
        ...updatedChurches[churchIndex], 
        [field]: field === 'landmarks' ? value : value 
      }
      updatedRegions[regionIndex] = { ...updatedRegions[regionIndex], churches: updatedChurches }
      return { ...prev, regions: updatedRegions }
    })
  }

  const addRegion = () => {
    setFormData(prev => ({
      ...prev,
      regions: [...prev.regions, { name: '', population: null, churches: [] }],
    }))
  }

  const removeRegion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      regions: prev.regions.filter((_, i) => i !== index),
    }))
  }

  const addChurch = (regionIndex: number) => {
    setFormData(prev => {
      const updatedRegions = [...prev.regions]
      updatedRegions[regionIndex] = {
        ...updatedRegions[regionIndex],
        churches: [
          ...updatedRegions[regionIndex].churches,
          { name: '', latitude: 0, longitude: 0, landmarks: [], address: '', description: '' }
        ]
      }
      return { ...prev, regions: updatedRegions }
    })
  }

  const removeChurch = (regionIndex: number, churchIndex: number) => {
    setFormData(prev => {
      const updatedRegions = [...prev.regions]
      updatedRegions[regionIndex] = {
        ...updatedRegions[regionIndex],
        churches: updatedRegions[regionIndex].churches.filter((_, i) => i !== churchIndex)
      }
      return { ...prev, regions: updatedRegions }
    })
  }

  const addLandmark = (regionIndex: number, churchIndex: number) => {
    setFormData(prev => {
      const updatedRegions = [...prev.regions]
      const updatedChurches = [...updatedRegions[regionIndex].churches]
      updatedChurches[churchIndex] = {
        ...updatedChurches[churchIndex],
        landmarks: [...updatedChurches[churchIndex].landmarks, '']
      }
      updatedRegions[regionIndex] = { ...updatedRegions[regionIndex], churches: updatedChurches }
      return { ...prev, regions: updatedRegions }
    })
  }

  const removeLandmark = (regionIndex: number, churchIndex: number, landmarkIndex: number) => {
    setFormData(prev => {
      const updatedRegions = [...prev.regions]
      const updatedChurches = [...updatedRegions[regionIndex].churches]
      updatedChurches[churchIndex] = {
        ...updatedChurches[churchIndex],
        landmarks: updatedChurches[churchIndex].landmarks.filter((_, i) => i !== landmarkIndex)
      }
      updatedRegions[regionIndex] = { ...updatedRegions[regionIndex], churches: updatedChurches }
      return { ...prev, regions: updatedRegions }
    })
  }

  const handleLandmarkChange = (regionIndex: number, churchIndex: number, landmarkIndex: number, value: string) => {
    setFormData(prev => {
      const updatedRegions = [...prev.regions]
      const updatedChurches = [...updatedRegions[regionIndex].churches]
      const updatedLandmarks = [...updatedChurches[churchIndex].landmarks]
      updatedLandmarks[landmarkIndex] = value
      updatedChurches[churchIndex] = { ...updatedChurches[churchIndex], landmarks: updatedLandmarks }
      updatedRegions[regionIndex] = { ...updatedRegions[regionIndex], churches: updatedChurches }
      return { ...prev, regions: updatedRegions }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      navigate('/admin/location')
    } catch (err) {
      console.error('Failed to save the country:', err)
    }
  }

  const viewOnMap = (latitude: number, longitude: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank')
  }

  return (
    <div className="w-full container mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-500 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-white">{isUpdate ? 'Update Country' : 'Create Country'}</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Country Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Country Name"
                required
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="capital" className="block text-sm font-medium text-gray-700">Capital</label>
              <input
                id="capital"
                name="capital"
                value={formData.capital}
                onChange={handleChange}
                placeholder="Capital"
                required
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Languages (comma-separated)</label>
              <input
                id="languages"
                name="languages"
                value={formData.languages.join(',')}
                onChange={handleChange}
                placeholder="Languages (comma-separated)"
                required
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Country Call Code</label>
              <input
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                placeholder="Country code (+234)"
                required
                className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="continent" className="block text-sm font-medium text-gray-700">Continent</label>
              <input
                id="continent"
                name="continent"
                value={formData.continent}
                onChange={handleChange}
                placeholder="Continent"
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Regions and Churches</h3>
            {formData.regions.map((region, regionIndex) => (
              <div key={regionIndex} className="border border-gray-200 p-4 mb-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-semibold">Region {regionIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeRegion(regionIndex)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor={`region-name-${regionIndex}`} className="block text-sm font-medium text-gray-700">Region Name</label>
                    <input
                      id={`region-name-${regionIndex}`}
                      value={region.name}
                      onChange={(e) => handleRegionChange(regionIndex, 'name', e.target.value)}
                      placeholder="Region Name"
                      required
                      className="mt-1 p-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <h5 className="text-sm font-semibold mb-2">Churches</h5>
                  {region.churches.map((church, churchIndex) => (
                    <div key={churchIndex} className="border border-gray-100 p-3 mb-3 rounded">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                        <input
                          value={church.name}
                          onChange={(e) => handleChurchChange(regionIndex, churchIndex, 'name', e.target.value)}
                          placeholder="Church Name"
                          required
                          className="rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <input
                          value={church.address}
                          onChange={(e) => handleChurchChange(regionIndex, churchIndex, 'address', e.target.value)}
                          placeholder="Church Address"
                          required
                          className="rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <input
                          type="number"
                          value={church.latitude || ''}
                          onChange={(e) => handleChurchChange(regionIndex, churchIndex, 'latitude', e.target.value ? Number(e.target.value) : null)}
                          placeholder="Church Latitude"
                          required
                          className="rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <input
                          type="number"
                          value={church.longitude || ''}
                          onChange={(e) => handleChurchChange(regionIndex, churchIndex, 'longitude', e.target.value ? Number(e.target.value) : null)}
                          placeholder="Church Longitude"
                          required
                          className="rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Landmarks</label>
                        {church.landmarks.map((landmark, landmarkIndex) => (
                          <div key={landmarkIndex} className="flex items-center mt-1">
                            <input
                              value={landmark}
                              onChange={(e) => handleLandmarkChange(regionIndex, churchIndex, landmarkIndex, e.target.value)}
                              placeholder="Landmark"
                              className="flex-grow rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <button
                              type="button"
                              onClick={() => removeLandmark(regionIndex, churchIndex, landmarkIndex)}
                              className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                              <MinusCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addLandmark(regionIndex, churchIndex)}
                          className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
                        >
                          <PlusCircle className="w-4 h-4 mr-2" /> Add Landmark
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <button
                          type="button"
                          onClick={() => removeChurch(regionIndex, churchIndex)}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          <MinusCircle className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => viewOnMap(church.latitude, church.longitude)}
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          <MapPin className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addChurch(regionIndex)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Church
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addRegion}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Region
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isUpdate ? 'Update' : 'Create'} Country
          </button>
        </form>
      </div>
    </div>
  )
}