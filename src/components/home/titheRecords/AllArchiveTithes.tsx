import { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { format } from 'timeago.js';
import { useGetAllOrdersQuery } from '../../../redux/features/order/paytitheOrder';
import { IoCloseSharp } from 'react-icons/io5';
import CurrencyConverter from '../../currencyConverter/CurrencyConverter';
import { Link } from 'react-router-dom';


export default function AllAdminTitheRecords({ orderList }: any) {
    const [id, setId] = useState("")
    const [isOpen, setIsOpen] = useState(false)

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
        { field: "createdAt", headerName: "Created At", flex: 0.5 },

    ];

    const rows = orderList?.map((item: any) => ({
        id: item._id,
        name: item.name,
        amount: item.amount,
        currency:item.currency,
        tithe: item.tithe_number,
        type: item.accountType,
        month: item.month,
        createdAt: format(item.createdAt)
    }));

    return (
        <>
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
            {isOpen && (
                <Modal setIsOpen={setIsOpen} id={id} />
            )}
        </>
    );
}




const Modal = ({ setIsOpen, id }: { setIsOpen: (isOpen: boolean) => void, id: any }) => {
    const closeModal = () => {
        setIsOpen(false)
    }

    const { data: fetch, isLoading } = useGetAllOrdersQuery({})

    const data = fetch && fetch.success && fetch.orders.find((user: any) => user?._id === id);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !bg-gray-800 p-4 rounded shadow-lg z-50 w-[30%]">
                <div className="flex justify-between items-center mb-4 border-b-2 pb-2">
                    <h2 className="text-xl font-bold uppercase text-gray-200">Payee Information</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={closeModal}
                    >
                        <IoCloseSharp className="text-red-500 text-xl" />
                    </button>

                </div>
                <div>
                    <div className='mt-4 flex flex-col gap-3'>
                        <div className='flex flex-row items-center gap-2'> 
                            <div className='text-gray-200'>Name: </div>
                            <p className='text-[16px] text-gray-200'>{data?.name}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='text-gray-200'>Account Type: </div>
                            <p className='text-[16px] text-gray-200'>{data?.accountType}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='text-gray-200'>Tithe Number: </div>
                            <p className='text-[16px] text-gray-200'>
                                {data?.tithe_number}
                            </p>
                        </div>
                        <div className='flex flex-row items-center gap-2 text-gray-200'>
                            <div className='text-gray-200'>Amount Paid: </div>
                            <div className='bg-gray-200 px-1'>
                                <CurrencyConverter amount={data?.amount} />
                            </div>

                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='text-gray-200'>Month: </div>
                            <p className='text-[16px] text-gray-200'>{data?.month}</p>
                        </div>

                    </div>
                    <Link to={`/view-profile/${data?.user}`}>
                        <button className='mt-5 text-sm bg-yellow-500 p-2 rounded-md text-gray-900 font-medium'>View Profile</button>
                    </Link>

                </div>
            </div>
        </>

    );
};
