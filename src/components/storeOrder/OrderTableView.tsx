import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'timeago.js'
import { styles } from '../styles/style';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAdminGetUsersQuery } from '../../redux/features/user/userApi';
import { GrUpdate } from 'react-icons/gr';
import { IoArrowBackOutline, IoCloseSharp } from 'react-icons/io5';
import { useDeleteOrderMutation, useUpdateOrderMutation, useGetAllOrderQuery } from '../../redux/features/storeOrder/storeOrderApi';
import { useGetAllProductQuery } from '../../redux/features/product/productApi';
import Loader from '../loader/Loader';


type Props = {}

export default function OrderTableView({ }: Props) {

    const { isLoading, data, refetch } = useGetAllOrderQuery<any>({}, { refetchOnMountOrArgChange: true })
    const { data: products, isLoading: load } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true });

    const [updateOrder, { error: errorD, isSuccess: success, isLoading: loadingOrder }] = useUpdateOrderMutation({})
    const { data: fetch } = useAdminGetUsersQuery({})
    const [deleteOrder, { error, isSuccess }] = useDeleteOrderMutation({})
    const [active, setActive] = useState(false)
    const [orderItems, setOrderItems] = useState([]);
    const [id, setId] = useState("")
    const [open, setOpen] = useState(false)
    const [item, setItem] = useState("")
    const [userid, setUserId] = useState("")
    const [blogId, setBlogId] = useState("")
    const [d, setDetails] = useState<any>({})
    const [status, setStatus] = useState("")

    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    const dataFind = fetch && fetch?.users?.find((user: any) => user?._id === userid);

    const handleDelete = async () => {
        const id = blogId
        await deleteOrder(id)
    }

    const getOrderItemsDetails = (orderItems: any, products: any) => {
        return orderItems && orderItems?.map((item: any) => {
            const product = products && products?.find((product: any) => product?._id == item?._id);
            return product ? { ...product, quantity: item.quantity } : null;
        }).filter((item: any) => item !== null);
    };

    useEffect(() => {
        if (!load) {
            const itemsDetails = getOrderItemsDetails(item, products);
            setOrderItems(itemsDetails);
        }
    }, [item]);

    const handleUpdateOrder = async () => {
        await updateOrder({ id, status })
    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Order deleted successfully")
            setOpen(false)
        }
        if (success) {
            refetch()
            toast.success("Order updated successfully")
            setActive(false)

        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
        if (errorD) {
            if ("data" in errorD) {
                const errorMessage = errorD as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error, errorD, success])



    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Purchase By", flex: 0.5 },
        { field: "type", headerName: "Order Type", flex: 1 },
        { field: "total", headerName: "Total", flex: 0.5 },
        { field: "payment", headerName: "PaymentInfo", flex: 0.5 },
        { field: "status", headerName: "Status", flex: 0.5 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },

        {
            field: "view   ", headerName: "Update Dispute", flex: 0.3, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setActive(!active)
                            setId(params.row.id)
                            setUserId(params.row.view)
                            setDetails(params?.row)
                            setItem(params.row.items)
                        }}>
                            <GrUpdate className="text-blue-100 hover:text-red-200" size={20} />
                        </Button>
                    </>
                )
            }
        },

        {
            field: "   delete  ", headerName: "Delete", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setOpen(!open)
                            setBlogId(params.row.id)
                        }}>
                            <AiOutlineDelete className="dark:text-red-500 text-black" size={20} />
                        </Button>
                    </>
                )
            }
        },

    ]

    const rows: any = []


    {
        data && data?.orders?.forEach((item: any) => {
            rows.push({
                id: item._id,
                type: item.type,
                total: item.total,
                payment: item.payment_info,
                name: item.name,
                status: item.status,
                view: item.user,
                d_fee: item.d_fee,
                phone: item.phone,
                items: item.items,
                address: item.address,
                d_city: item.city,
                createdAt: format(item.createdAt)
            })
        })
    }

    return (
        <>
            <div className=' rounded-md bg-gray-900 '>
                <div className='container mx-auto p-4 rounded-md'>
                <h1 className='text-2xl text-gray-100 text-center mt-2 uppercase'>Order</h1>
                    <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
                        {isLoading ? (<Loader />) : (
                            <Box m="20px">
                                <Box m="40px 0 0 0" height="60vh" sx={{
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
                                {open && (
                                    <Modal
                                        open={open}
                                        onClose={() => setOpen(!open)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box className="absolute top-[30%] left-[50%] -translate-x-1/2 dark:bg-gray-700 p-3 rounded-md">
                                            <h1 className={`${styles.title} !text-lg dark:text-white font-normal`}>
                                                Are you sure you want to delete order ?
                                            </h1>
                                            <div className='flex w-full items-center justify-around mb-6 mt-3'>
                                                <div className={`${styles.button} !font-medium !w-[120px] h-[30px] bg-[#57c7a3] !text-sm`}
                                                    onClick={() => setOpen(!open)}
                                                >
                                                    Cancel
                                                </div>
                                                <div className={`${styles.button} !w-[120px] h-[30px] bg-[crimson] !text-sm`}
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </div>
                                            </div>

                                        </Box>

                                    </Modal>
                                )}
                                {active && (
                                    <Modal
                                        open={active}
                                        onClose={() => setActive(!active)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box className="absolute top-[10%] left-[50%] w-[90%] md:w-[80%] lg:w-[60%] -translate-x-1/2 bg-gray-800   p-3 rounded-md">
                                            <div className='flex justify-between items-center mb-4 border-b-2 border-gray-300'>
                                                <h1 className={`${styles.title} !text-lg dark:!text-white uppercase`}>
                                                    Order Details
                                                </h1>
                                                <button onClick={() => setActive(false)}>
                                                    <IoCloseSharp className='text-xl  text-gray-300' />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-3">
                                                <div>
                                                    <h1 className='text-white mb-2 font-medium'>Personal Details</h1>
                                                    <div className=" items-center">
                                                        {dataFind?.avatar?.url.length > 0 &&
                                                            <img src={dataFind?.avatar?.url} alt='' className="h-[100px] w-[100px] rounded-md" />
                                                        }
                                                        <div className='text-sm text-sky-200 mt-2'>{dataFind?.name}</div>
                                                        <div className='text-sm text-sky-200 mt-2'>{dataFind?.email}</div>
                                                        <div className='text-sm text-sky-200 mt-2'>{dataFind?.phone_number}</div>
                                                    </div>
                                                </div>
                                                <div className="h-[200px] overflow-auto mx-2">
                                                    <h1 className='text-white mb-2 font-medium'>Item Details</h1>

                                                    {orderItems && orderItems?.map((i: any, index: number) => (
                                                        <Link to={`/view-product/${i?._id}`}>
                                                            <div key={index}>
                                                                <div className='text-sm text-sky-200 mt-2'>S/N: {index + 1}</div>
                                                                <div className='text-sm text-sky-200 mt-2'>{i?.name}</div>
                                                                <div className='text-sm text-red-200 mt-2'>Cost: {formatCurrency(i?.offer)} + Quantity: {i?.quantity}</div>
                                                            </div>
                                                        </Link>
                                                    ))}


                                                </div>
                                                <div>
                                                    <h1 className='text-white mb-2 font-medium'>Checkout Details</h1>
                                                    <div>
                                                        <div className='text-sm text-sky-200 uppercase font-medium'>Order Type: Delivery</div>
                                                        <div className='text-sm text-sky-200 mt-2'>Owner: {d?.name}</div>
                                                        {d?.type == "Home Delivery" &&
                                                            <div className='text-sm text-red-200 mt-2'>State: {d?.city}</div>
                                                        }
                                                        <div className='text-sm text-white mt-2'>Total Item Cost: {formatCurrency(d?.total)}</div>
                                                        {d?.type == "Home Delivery" &&
                                                            <div className='text-sm text-white mt-2'>Delivery Fee: {formatCurrency(d?.d_fee)}</div>
                                                        }
                                                        {d?.type == "Home Delivery" &&
                                                            <div className='text-sm text-white mt-2'>Contact Person: {d?.phone}</div>
                                                        }
                                                        {d?.d_city?.length > 0 &&
                                                            <div className='text-sm text-white mt-2'>State: {d?.d_city}</div>
                                                        }
                                                        {d?.type == "Home Delivery" &&
                                                            <div className='text-sm text-white mt-2'>Address: {d?.address}</div>
                                                        }
                                                        <div>
                                                            <h3 className="text-gray-200 text-xl mt-3">Status : <strong >{d?.status}</strong> </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='flex w-full items-center flex-col mb-6 mt-3'>

                                                {d?.status === "Processing" &&
                                                    <select

                                                        required
                                                        value={status}
                                                        onChange={(e: any) => setStatus(e.target.value)}
                                                        id="status"
                                                        className={`${styles.input} text-red-600 custom-select !bg-gray-900`}
                                                    >
                                                        <option value='Cancelled'>Cancel Order</option>
                                                        <option value='Delivered'>Delivered</option>
                                                        <option value='Successful'>Successful</option>
                                                    </select>
                                                } 
                                                {d?.status === "Processing" &&
                                                    <div className={`${styles.button} h-[30px] bg-blue-400 !rounded-md mt-6 !text-base !text-white`}
                                                        onClick={handleUpdateOrder}
                                                    >
                                                        {loadingOrder ? "Loading.." : "Update Status"}
                                                    </div>
                                                }
                                            </div>

                                        </Box>

                                    </Modal>
                                )}
                            </Box>
                        )}


                    </div>
                </div>
            </div>
        </>
    )
}

