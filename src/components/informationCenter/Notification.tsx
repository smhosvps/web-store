import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDeleteNotificationPlusMutation, useEditReadMutation, useGetOrderNotificationQuery } from '../../redux/features/notification/notification'
import NotificationTable from '../notification/NotificationTable'
import Pagination from '../notification/Pagination'
import Modal from '../notification/Modal'
import Loader from '../loader/Loader'

export default function Notification() {
    const { isLoading, data, refetch } = useGetOrderNotificationQuery({}, { refetchOnMountOrArgChange: true })
    const [editRead] = useEditReadMutation()
    const [deleteNotificationPlus] = useDeleteNotificationPlusMutation()
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [selectedNotification, setSelectedNotification] = useState<{ id: string; status: string } | null>(null)
    const [newStatus, setNewStatus] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    const handleUpdateStatus = useCallback(async () => {
        if (selectedNotification) {
            try {
                await editRead({ id: selectedNotification.id, status: newStatus }).unwrap()
                toast.success("Notification status updated successfully")
                refetch()
                setActiveModal(null)
            } catch (error) {
                toast.error("Failed to update notification status")
            }
        }
    }, [selectedNotification, newStatus, editRead, refetch])

    const handleDelete = useCallback(async () => {
        if (selectedNotification) {
            try {
                await deleteNotificationPlus(selectedNotification.id).unwrap()
                toast.success("Notification deleted successfully")
                refetch()
                setActiveModal(null)
            } catch (error) {
                toast.error("Failed to delete notification")
            }
        }
    }, [selectedNotification, deleteNotificationPlus, refetch])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data?.notifications.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = useCallback((pageNumber: number) => setCurrentPage(pageNumber), [])

    if (isLoading) return <Loader />

    return (
        <div className="container mx-auto px-4 md:px-0">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <NotificationTable
                    currentItems={currentItems}
                    setSelectedNotification={setSelectedNotification}
                    setActiveModal={setActiveModal}
                />
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={data?.notifications.length || 0}
                    paginate={paginate}
                />
            </div>

            <Modal
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                selectedNotification={selectedNotification}
                newStatus={newStatus}
                setNewStatus={setNewStatus}
                handleUpdateStatus={handleUpdateStatus}
                handleDelete={handleDelete}
            />
        </div>
    )
}

