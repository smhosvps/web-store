import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify'
import { useDeleteCountryMutation, useGetCountriesQuery } from '../../redux/features/country/countryApi'
import { Link } from 'react-router-dom'

export default function CountryManagementPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const { data: countries, isLoading, refetch } = useGetCountriesQuery()
  const [deleteCountry, { isLoading: loadingDelete, isSuccess, error }] = useDeleteCountryMutation()
  const [id, setId] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const itemsPerPage = 10

  const filteredCountries = countries?.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })

  const paginatedCountries = sortedCountries.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const handleDelete = async () => {
    await deleteCountry(id)
  }

  const totalPages = Math.ceil(sortedCountries.length / itemsPerPage)

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success("Country deleted successfully")
      setIsOpen(false)
    }
    if (error) {
      if ("data" in error) {
        const errorMessage:any = error
        toast.error(errorMessage?.data.message)
      }
    }
  }, [isSuccess, error, refetch])

  return (
    <div className="max-w-7xl mx-auto p-5 bg-white rounded-md">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Countries</h1>
        <Link to="/admin/add-country" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Country
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th 
              className="text-left p-3 bg-gray-100 border-b border-gray-200 cursor-pointer"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              Name {sortOrder === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />}
            </th>
            <th className="text-left p-3 bg-gray-100 border-b border-gray-200">Capital</th>
            <th className="text-left p-3 bg-gray-100 border-b border-gray-200">Phone Code</th>
            <th className="text-left p-3 bg-gray-100 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCountries.map((country:any) => (
            <tr key={country._id}>
              <td className="p-3 border-b border-gray-200">{country.name}</td>
              <td className="p-3 border-b border-gray-200">{country.capital}</td>
              <td className="p-3 border-b border-gray-200">{country.countryCode}</td>
              <td className="p-3 border-b border-gray-200">
                <Link to={`/admin/location/${country._id}`} className="text-blue-500 hover:underline mr-2">View</Link>
                <Link to={`/admin/country-edit/${country._id}`} className="text-green-500 hover:underline mr-2">Edit</Link>
                <button 
                  className="text-red-500 hover:underline"
                  onClick={() => { setIsOpen(true); setId(country._id); }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-5">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${page === i + 1 ? 'bg-gray-400 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {i + 1}
          </button>
        ))}
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page === totalPages} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-md">
            <h2 className="mb-4 text-lg font-semibold">Are you sure you want to delete this country?</h2>
            <div className="flex justify-end">
              <button 
                onClick={() => setIsOpen(false)} 
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
                disabled={loadingDelete}
              >
                {loadingDelete ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}