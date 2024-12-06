import React, { useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from '@mui/material'
import { FiEye} from "react-icons/fi"
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { useGetAllOfflineOrdersQuery } from '../../redux/features/order/paytitheOrder';
import CurrencyConverter from '../currencyConverter/CurrencyConverter';
import { IoCloseSharp } from 'react-icons/io5';


type Props = {
    orderList: any
}

export default function OfflineTitheTable({ orderList }: Props) {

    const [id, setId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.5 },
        {
            field: "amount", headerName: "Amount", flex: 0.4, renderCell: (params: any) => {
                return (
                    <div>
                        {formatCurrency(params.row.amount)}
                    </div>
                )
            }
        },
        { field: "tithe", headerName: "Tithe Number", flex: 0.3 },
        { field: "type", headerName: "Account Type", flex: 0.5 },
        { field: "month", headerName: "Month", flex: 0.3 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "  ", headerName: "View", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => { setIsOpen(true); setId(params.row.tithe) }}
                        >
                            <FiEye className="text-white" size={20} />
                        </Button>
                    </>

                )
            }
        },

    ]

    const rows: any = []


    {
        orderList && orderList?.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                amount: item.amount,
                tithe: item.tithe_number,
                type: item.accountType,
                month: item.month,
                createdAt: format(item.createdAt)
            })
        })
    }

    return (
        <>
            <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
            <div>offline tithes</div>
                <Box>
                <Box m="40px 0 0 0" height="70vh" sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            outline: "none"
                        },
                        "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-sortIcon": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-row": {
                            color: "#ebedf0",
                            borderBottom: "1px solid #ccc!important"
                        },
                        "& .MuiTablePagination-root": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        "& .name-column-cell": {
                            color: "#ebedf0"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#A4A9FC",
                            color: "#091e42",
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            // backgroundColor: "#ebedf0"
                        },
                        "& .MuiDataGrid-footerContainer": {
                            color: "#ebedf0",
                            borderTop: "none",
                        },

                        "& .MuiTablePagination-caption": {
                            color: "#ebedf0",
                        },
                        "& .MuiTablePagination-select": {
                            color: "#ebedf0",
                        },
                        "& .MuiTablePagination-actions": {
                            color: "#ffffff",
                        },
                        "& .MuiCheckbox-root": {
                            color: `#000 !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `#ebedf0 !important`,
                        },
                    }}
                    >
                        <DataGrid checkboxSelection rows={rows} columns={columns} /> 
                    </Box>

                </Box>
            </div>
            {isOpen && (
                <Modal setIsOpen={setIsOpen} id={id} />
            )}
        </>

    )
}


const Modal = ({ setIsOpen, id }: { setIsOpen: (isOpen: boolean) => void, id: any }) => {
    const closeModal = () => {
        setIsOpen(false)
    }

    const { data: fetch } = useGetAllOfflineOrdersQuery({}, { refetchOnMountOrArgChange: true })

    const data = fetch && fetch.success && fetch.orders.find((user: any) => user?.tithe_number === id);

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
