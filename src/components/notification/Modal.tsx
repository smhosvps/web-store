interface ModalProps {
    activeModal: string | null
    setActiveModal: (modal: string | null) => void
    selectedNotification: { id: string; status: string } | null
    newStatus: string
    setNewStatus: (status: string) => void
    handleUpdateStatus: () => void
    handleDelete: () => void
}

export default function Modal({
    activeModal,
    setActiveModal,
    selectedNotification,
    newStatus,
    setNewStatus,
    handleUpdateStatus,
    handleDelete
}: ModalProps) {
    if (!activeModal) return null

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    {activeModal === 'update' && (
                        <>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Update Status</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Current status: {selectedNotification?.status}
                                </p>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="mt-2 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                >
                                    <option value="">Select new status</option>
                                    <option value="read">Read</option>
                                </select>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={handleUpdateStatus}
                                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Update Status
                                </button>
                            </div>
                        </>
                    )}
                    {activeModal === 'delete' && (
                        <>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Notification</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this notification?
                                </p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                    <div className="items-center px-4 py-3">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

