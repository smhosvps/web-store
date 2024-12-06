import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDeleteScheduleMutation, useUpdateScheduleMutation } from '../../redux/features/live/liveServices'

type Props = {
  x: any[]
  refetch: () => void
}

export default function Schedules({ x, refetch }: Props) {
  const [activeModal, setActiveModal] = useState<'update' | 'delete' | null>(null)
  const [selectedId, setSelectedId] = useState('')
  const [date, setDate] = useState('')
  const [info, setInfo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [updateSchedule, { isLoading: updateLoading, isSuccess: updateSuccess, error: updateError }] = useUpdateScheduleMutation()
  const [deleteSchedule, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteScheduleMutation()

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Schedule updated successfully')
      setActiveModal(null)
      refetch()
    }
    if (deleteSuccess) {
      toast.success('Schedule deleted successfully')
      setActiveModal(null)
      refetch()
    }
    if (updateError || deleteError) {
      toast.error('An error occurred. Please try again.')
    }
  }, [updateSuccess, deleteSuccess, updateError, deleteError, refetch])

  const handleUpdate = async () => {
    await updateSchedule({ id: selectedId, info, date })
  }

  const handleDelete = async () => {
    await deleteSchedule(selectedId)
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = x?.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems?.map((item: any, index: number) => (
              <tr key={item._id} className="hover:bg-gray-200 hover:text-black">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.info}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setActiveModal('update')
                      setSelectedId(item._id)
                      setDate(item.date)
                      setInfo(item.info)
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal('delete')
                      setSelectedId(item._id)
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= x?.length}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastItem, x?.length)}</span> of{' '}
              <span className="font-medium">{x?.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              {Array.from({ length: Math.ceil(x?.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === index + 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= x?.length}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {activeModal === 'update' && (
              <>
                <h2 className="text-xl font-bold mb-4">Update Schedule</h2>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
                <textarea
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  rows={3}
                  placeholder="Enter description"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={updateLoading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    {updateLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </>
            )}
            {activeModal === 'delete' && (
              <>
                <h2 className="text-xl font-bold mb-4">Delete Schedule</h2>
                <p className="mb-4">Are you sure you want to delete this schedule?</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}