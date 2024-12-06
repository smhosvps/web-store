import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { format } from 'timeago.js';
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetUserQuery } from '../../redux/features/api/apiSlice';

type Props = {
    orderlist: any[]
}

export default function OfferingsTable({ orderlist }: Props) {
    const { data: user } = useGetUserQuery();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "currency", headerName: "Currency", flex: 0.4 },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.4,
            renderCell: (params) => (
                <div className="text-gray-700">
                    {params.row.amount}
                </div>
            )
        },
        { field: "type", headerName: "Type of Offering", flex: 0.5 },
        { field: "ref", headerName: "Payment Ref", flex: 0.8 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "view",
            headerName: "View",
            flex: 0.2,
            renderCell: (params) => (
                <Link to={`/${user.user.role}/view-profile/${params.row.user}`} className="text-green-500 hover:text-green-700 transition-colors">
                    <FiEye size={20} />
                </Link>
            )
        },
    ];

    const rows = orderlist.map((item) => ({
        id: item._id,
        name: item.name,
        currency: item.currency,
        amount: item.amount,
        type: item.type,
        ref: item.payment_info,
        user: item.user,
        createdAt: format(item.createdAt)
    }));

    return (
        <div className="w-full bg-white rounded-lg shadow-md my-6 overflow-hidden">
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
                '& .MuiDataGrid-menuIcon': {
                    color: '#4a5568',
                },
                '& .MuiDataGrid-toolbarContainer': {
                    padding: '8px',
                    backgroundColor: '#f8f8f8',
                },
            }}>
                <DataGrid
                    rows={rows}
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
        </div>
    );
}