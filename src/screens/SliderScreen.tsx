import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from '@mui/material'
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { styles } from '../components/styles/style';
import { toast } from 'react-toastify';
import SliderModalUpdate from '../components/slider/SliderModalUpdate';
import { format } from 'timeago.js'
import SliderModal from '../components/slider/SliderModal';
import { useDeleteSliderMutation, useGetAllSliderQuery } from '../redux/features/slider/sliderApi';
import Loader from "../components/loader/Loader";

type Props = {}

export default function SliderScreen({ }: Props) {

    const { data, isLoading, refetch } = useGetAllSliderQuery({}, { refetchOnMountOrArgChange: true })
    const [active, setActive] = useState(false)
    const [viewM, setViewM] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [blogId, setBlogId] = useState("")

    const [deleteDelivery, { error, isSuccess }] = useDeleteSliderMutation({})

    const handleDelete = async () => {
        const id = blogId
        await deleteDelivery(id)
    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Slider center deleted successfully")
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

    const columns = [
        { field: "id", headerName: "ID", flex: 0.2 },
        {
            field: "avatar",
            headerName: "Cover",
            flex: 0.3,
            renderCell: (params: any) => {
                return (
                    <div className='flex justify-center items-center'>
                        <Button onClick={() => {
                            setViewM(!active)
                            setBlogId(params.row.avatar)
                        }}>
                            <img src={params?.row?.avatar || "/noavatar.png"} alt="" className='h-[35px] w-[35px] rounded-md flex justify-center items-center' />
                        </Button>
                    </div>
                )
            },
        },
        { field: "name", headerName: "Title", flex: 0.7 },
        { field: "url", headerName: "Category", flex: 0.4 },
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
            field: " edit   ", headerName: "Edit", flex: 0.2, renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                setModalVisible(!modalVisible)
                                setBlogId(params.row)
                            }}>
                            <FiEdit2 className="dark:text-green-500 text-black" size={20} />
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
        data && data?.map((item: any) => {
            rows.push({
                id: item?._id,
                name: item?.title,
                url: item?.url,
                createdAt: format(item.createdAt),
                isApprove: item?.isApprove,
                phone: item?.phone,
                avatar: item?.thumbnail?.url,
            })
        })
    }

    return (
        <>
            <div className=' bg-gray-900 p-2 rounded-md '>
           
                <div className='container mx-auto px-4 md:px-0'>
                    <button onClick={() => setActive(true)} className='text-sm rounded-md bg-slate-600 p-2 font-semibold text-white'>Add a slider</button>
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
                                                    Are you sure you want to delete this slider ?
                                                </h1>
                                                <div className='flex w-full items-center justify-around mb-6 mt-3'>
                                                    <div className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3] !text-sm`}
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

                                    {viewM && (
                                        <Modal
                                            open={viewM}
                                            onClose={() => setViewM(!viewM)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box className="absolute top-[20%] left-[50%] w-[80%] md:w-[60%] -translate-x-1/2 dark:bg-gray-700 p-3 rounded-md">
                                                <div>
                                                <img src={blogId || "/noavatar.png"} alt="" className=' w-[100%] rounded-md flex justify-center items-center' />
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
            {active && (
                <ModalX setActive={setActive} />
            )}
            {modalVisible && (
                <ModalY setModalVisible={setModalVisible} blogId={blogId} />
            )}
        </>
    )
}


const ModalX = ({ setActive }: any) => {

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded w-[80%] lg:w-[40%] shadow-lg z-50">
                <SliderModal setActive={setActive} />
            </div>
        </>

    );
};


const ModalY = ({ setModalVisible, blogId }: any) => {


    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded w-[80%] lg:w-[40%] shadow-lg z-50">
                <SliderModalUpdate setModalVisible={setModalVisible} blogId={blogId} />
            </div>
        </>

    );
};


