import { format } from 'timeago.js'
import { GrUpdate } from "react-icons/gr"
import { AiOutlineDelete } from 'react-icons/ai'

interface NotificationTableProps {
    currentItems: any[]
    setSelectedNotification: (notification: { id: string; status: string }) => void
    setActiveModal: (modal: string) => void
}

export default function NotificationTable({ currentItems, setSelectedNotification, setActiveModal }: NotificationTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-800">
                    <tr>
                        {["ID", "Title", "Message", "Status", "Created At", "Actions"].map((header) => (
                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems?.map((item: any) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item._id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.message}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(item.createdAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => {
                                        setSelectedNotification({ id: item._id, status: item.status })
                                        setActiveModal('update')
                                    }}
                                    disabled={item.status === "read"}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4 disabled:opacity-50"
                                >
                                    <GrUpdate size={20} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedNotification({ id: item._id, status: item.status })
                                        setActiveModal('delete')
                                    }}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

