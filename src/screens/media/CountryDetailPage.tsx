import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useGetCountryByIdQuery } from '../../redux/features/country/countryApi'


export default function CountryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: country, error, isLoading } = useGetCountryByIdQuery<any>(id || '')
  const [selectedRegion, setSelectedRegion] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">Error: {(error as any).message}</div>
  if (!country) return <div className="text-center py-10">Country not found</div>

  const openCitiesDialog = (region: any) => {
    setSelectedRegion(region)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">{country.name}</h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Currency:</strong> {country.currency}</p>
            <p><strong>Languages:</strong> {country.languages?.join(', ')}</p>
            <p><strong>Country code:</strong> {country.countryCode}</p>
            <p><strong>Continent:</strong> {country.continent}</p>
          </div>

          {country.description && (
            <div>
              <strong>Description:</strong>
              <div className='text-gray-700 mt-1 text-sm md:text-base' dangerouslySetInnerHTML={{ __html: country.description }} />
            </div>
          )}

          {country.religions && country.religions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Religions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Religion</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {country.religions.map((religion: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{religion.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{religion.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Regions and Cities</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {country.regions?.map((region: any) => (
                <div key={region.name} className="mb-4 p-4 border rounded-lg shadow-sm">
                  <h4 className="text-md font-semibold">{region.name}</h4>
                  <button
                    onClick={() => openCitiesDialog(region)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    View Cities
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Link to="/admin/location" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200">
              Back to Countries List
            </Link>
            <Link to={`/admin/country-edit/${country._id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
              Edit Country
            </Link>
          </div>
        </div>


      </div>
      {isDialogOpen && selectedRegion && (
        <div className="mt-5">
          <div className="bg-white rounded-lg container w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className='flex flex-row justify-between items-center'>
                <h2 className="text-xl font-semibold mb-4">{selectedRegion.name} Cities</h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                >
                  Close
                </button>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-500">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Church</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Landmarks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedRegion.churches?.map((city: any) => (
                    <tr key={city.name}>
                      <td className="px-6 py-4 whitespace-nowrap">{city.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{city.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{city?.Landmarks?.map((i: any) => <div>{i}</div>)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{city?.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
