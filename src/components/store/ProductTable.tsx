import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2, FiEye } from "react-icons/fi"
import { format } from 'timeago.js'
import { styles } from '../styles/style';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../redux/features/product/productApi';

type Props = {
    product: any[];
    refetch: () => void;
}

export default function ProductTable({ product, refetch }: Props) {
    const [open, setOpen] = useState(false)
    const [blogId, setBlogId] = useState("")

    const [deleteProduct, { error, isSuccess }] = useDeleteProductMutation()

    const handleDelete = async () => {
        const id = blogId
        await deleteProduct(id)
    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Product deleted successfully")
            setOpen(false)
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error, refetch])

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "category", headerName: "Category", flex: 0.5 },
        { field: "status", headerName: "Status", flex: 0.5 },
        { field: "offer", headerName: "Offer", flex: 0.5 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "view",
            headerName: "View",
            flex: 0.2,
            renderCell: (params) => (
                <Link to={`/store/view-product/${params.row.id}`}>
                    <Button>
                        <FiEye className="text-gray-600" size={20} />
                    </Button>
                </Link>
            )
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params) => (
                <Link to={`/store/edit-product/${params.row.id}`}>
                    <Button>
                        <FiEdit2 className="text-gray-600" size={20} />
                    </Button>
                </Link>
            )
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params) => (
                <Button onClick={() => {
                    setOpen(true)
                    setBlogId(params.row.id)
                }}>
                    <AiOutlineDelete className="text-red-500" size={20} />
                </Button>
            )
        },
    ]

    const rows = product.map((item: any) => ({
        id: item._id,
        name: item.name,
        category: item.category,
        status: item.isApprove,
        offer: item.offer,
        createdAt: format(item.createdAt)
    }))

    return (
        <div className='w-full bg-white rounded-md my-3 p-3'>
            <Box m="20px">
                <Box m="40px 0 0 0" height="70vh" sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                        outline: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column-cell": {
                        color: "#6B7280"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#F3F4F6",
                        color: "#374151",
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#ffffff"
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: "#F3F4F6",
                    },
                    "& .MuiCheckbox-root": {
                        color: `#6B7280 !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `#374151 !important`,
                    },
                    "& .MuiTablePagination-root": {
                        color: "#374151"
                    },
                    "& .MuiTablePagination-selectIcon": {
                        color: "#374151"
                    },
                    "& .MuiTablePagination-actions": {
                        color: "#374151"
                    },
                }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: GridToolbar,
                        }}
                    />
                </Box>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="absolute top-[30%] left-[50%] -translate-x-1/2 bg-white p-3 rounded-md">
                        <h1 className={`${styles.title} !text-lg text-gray-800`}>
                            Are you sure you want to delete this Product?
                        </h1>
                        <div className='flex w-full items-center justify-around mb-6 mt-3'>
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </Box>
                </Modal>
            </Box>
        </div>
    )
}