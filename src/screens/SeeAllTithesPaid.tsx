import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserByTitheNumberQuery} from '../redux/features/order/paytitheOrder'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { Box } from '@mui/material'
import Loader from '../components/loader/Loader'


export default function SeeAllTithesPaid() {
    const { id: ID } = useParams<{ id: string }>();
    const { data, isLoading } = useGetUserByTitheNumberQuery(ID)

    const [searchTerm, setSearchTerm] = useState('')

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num)
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.5 },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.4,
            renderCell: (params) => (
                <div className="text-gray-700">
                    {formatCurrency(params.row.amount)}
                </div>
            )
        },
        { field: "tithe", headerName: "Tithe Number", flex: 0.3 },
        { field: "type", headerName: "Account Type", flex: 0.3 },
        {
            field: "offline",
            headerName: "Paid",
            flex: 0.3,
            renderCell: () => (
                <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Online
                </div>
            )
        },
        { field: "month", headerName: "Month", flex: 0.3 },
    ]

    const rows = data?.orders?.map((item: any) => ({
        id: item?._id,
        avatar: item?.avatar?.url,
        name: item?.name,
        amount: item?.amount,
        tithe: item?.tithe_number,
        type: item?.accountType,
        month: item?.month,

    })) || []

    const filteredRows = rows.filter((row: any) =>
        Object.values(row).some(
            (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 sm:px-0 lg:px-0 ">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader />
                        </div>
                    ) : (
                        <Box sx={{
                            height: 600,
                            width: '100%',
                            '& .MuiDataGrid-root': {
                                border: 'none',
                                backgroundColor: 'white',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #f0f0f0',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f8f8f8',
                                color: '#333',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: '1px solid #f0f0f0',
                                backgroundColor: '#f8f8f8',
                            },
                            '& .MuiTablePagination-root': {
                                color: '#333',
                            },
                            '& .MuiDataGrid-row': {
                                color: '#4a5568',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#f7fafc',
                            },
                            '& .MuiCheckbox-root': {
                                color: '#4a5568',
                            },
                            '& .MuiDataGrid-columnSeparator': {
                                display: 'none',
                            },
                        }}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 10, page: 0 },
                                    },
                                }}
                                pageSizeOptions={[10, 25, 50]}
                                checkboxSelection
                                disableRowSelectionOnClick
                                slots={{
                                    toolbar: GridToolbar,
                                }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                        quickFilterProps: { debounceMs: 500 },
                                    },
                                }}
                            />
                        </Box>
                    )}
                </div>
            </div>
        </div>
    )
}
