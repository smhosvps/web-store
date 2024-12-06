import React, { useEffect, useState } from 'react'
import Flyer from '../components/liveProgram/Flyer';
import { DataGrid } from "@mui/x-data-grid";
import { format } from 'timeago.js'
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai';
import { styles } from '../components/styles/style';
import { useDeleteFlyerMutation, useGetAllFlyerQuery } from '../redux/features/flyer/flyerApi';
import { toast } from 'react-toastify';
import Loader from '../components/loader/Loader';

type Props = {}

export default function FlyerScreen({ }: Props) {
    const [flyerOpen, setFlyerOpen] = useState(false)
    const [blogId, setBlogId] = useState("")
    const [open, setOpen] = useState(false)
    const { data, refetch, isLoading } = useGetAllFlyerQuery({}, { refetchOnMountOrArgChange: true })

    const flyerModal = () => {
        setFlyerOpen(true);
    };

    const [deleteFlyer, { error, isSuccess, isLoading: loading }] = useDeleteFlyerMutation({})

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Flyer center deleted successfully")
            setOpen(false)
            refetch()
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error])


    const handleDelete = async () => {
        const id = blogId
        await deleteFlyer(id)
    }


    const rows: any = []


    {
        data && data?.map((item: any) => {
            rows.push({
                id: item?._id,
                name: item?.note,
                createdAt: format(item.createdAt),
                isApprove: item?.isApprove,
                phone: item?.phone,
                avatar: item?.thumbnail?.url,
            })
        })
    }

    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        {
            field: "avatar",
            headerName: "Flyer",
            flex: 0.3,
            renderCell: (params: any) => {
                return (
                    <div className='flex justify-center items-center'>
                        <Button onClick={() => {
                            setBlogId(params.row.avatar)
                        }}>
                            <img src={params?.row?.avatar || "/noavatar.png"} alt="" className='h-[35px] w-[35px] rounded-md flex justify-center items-center' />
                        </Button>
                    </div>
                )
            },
        },
        { field: "name", headerName: "Title", flex: 0.7 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "isApprove", headerName: "Status", flex: 0.3, renderCell: (params: any) => {
                return (
                    <div>
                        {params.row.isApprove == false ?
                            <div className='text-red-400'>Not Approve</div> :
                            <div className='text-gray-100'>Approve</div>
                        }
                    </div>

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


    return (
        <>
            <div className=' bg-gray-900 p-2 rounded-md'>
        
                <div className=' px-4 md:px-0 container mx-auto'>
                    <button onClick={flyerModal} className='text-sm rounded-md bg-slate-600 p-2 font-semibold text-white'>Add a Flyer</button>
                    <>
                        {isLoading ? <Loader /> : (
                            <div className='w-full  bg-gray-100/5 rounded-md my-3 p-3 shadow-black'>
                                <Box>
                                    <Box m="40px 0 0 0" height="80vh" sx={{
                                        "& .MuiDataGrid-root": {
                                            border: " none",
                                            outline: "none"
                                        },
                                        "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                            color: "#ffffff"
                                        },
                                        "& .MuiDataGrid-sortIcon": {
                                            color: "#FFFFFF"
                                        },
                                        "& .MuiDataGrid-row": {
                                            color: "#FFFFFF",
                                            borderBottom:
                                                "1px solid #ccc!important"
                                        },
                                        "& .MuiTablePagination-root": {
                                            color: "#ffffff"
                                        },
                                        "& .MuiDataGrid-cell": {
                                            borderBottom: "none"
                                        },
                                        "& .name-column-cell": {
                                            color: "#ffffff"
                                        },
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: "#A4A9FC",
                                            color: "#000",
                                            borderBottom: "none"
                                        },
                                        "& .MultiDataGrid-virtualScroller": {
                                            backgroundColor: "#1f2a40"
                                        },
                                        "& .MultiDataGrid-footerContainer": {
                                            color: "#000",
                                            borderTop: "none",
                                            backgroundColor: "#A4A9FC",
                                        },
                                        "& .MultiCheckbox-root": {
                                            color: `#000 !important`,
                                        },
                                        "& .MultiDataGrid-toolbarContainer .MuiButton-text": {
                                            color: `#fff !important`,
                                        },
                                    }}
                                    >
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                        />
                                    </Box>
                                    {open && (
                                        <Modal
                                            open={open}
                                            onClose={() => setOpen(!open)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box className="absolute top-[30%] left-[50%] -translate-x-1/2 dark:bg-gray-700 p-3 rounded-md">
                                                <h1 className={`${styles.title} !text-lg !font-normal dark:text-white`}>
                                                    Are you sure you want to delete this Flyer ?
                                                </h1>
                                                <div className='flex w-full items-center justify-around mb-6 mt-3'>
                                                    <div className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3] !text-sm`}
                                                        onClick={() => setOpen(!open)}
                                                    >
                                                        Cancel
                                                    </div>
                                                    {loading ? <div className={`${styles.button} !w-[120px] h-[30px] bg-[crimson] !text-sm`}>Loading..</div> :
                                                        <div className={`${styles.button} !w-[120px] h-[30px] bg-[crimson] !text-sm`}
                                                            onClick={handleDelete}
                                                        >

                                                            Delete
                                                        </div>
                                                    }
                                                </div>

                                            </Box>

                                        </Modal>
                                    )}

                                </Box>
                            </div>
                        )}
                    </>
                </div>

            </div>
            {/* {active && (
            <ModalX setActive={setActive} />
        )} */}
            {flyerOpen && (
                <FlyerModal setIsOpen={setFlyerOpen} />
            )}
        </>
    )
}

const FlyerModal = ({ setIsOpen }: any) => {

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>

            <div className="fixed top-1/2 left-1/2 transform w-[95%] md:w-[50%] mt-9 -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded shadow-lg z-50">
                <div className="flex justify-between items-center mb-4 ">
                    <h2 className="text-xl font-bold">Manage Flyer</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={closeModal}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <Flyer setOpen={setIsOpen} />
            </div>
        </>

    );
};