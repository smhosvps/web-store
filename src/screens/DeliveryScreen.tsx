import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography } from '@mui/material';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDeleteDeliveryMutation, useGetAllDeliveryQuery } from '../redux/features/delivery/deliveryApi';
import { toast } from 'react-toastify';
import DeliveryModal from '../components/delivery/DeliveryModal';
import DeliveryModalUpdate from '../components/delivery/DeliveryModalUpdate';

export default function DeliveryScreen() {
    const { data, isLoading, refetch } = useGetAllDeliveryQuery({}, { refetchOnMountOrArgChange: true });
    const [active, setActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");

    const [deleteDelivery, { error, isSuccess }] = useDeleteDeliveryMutation();

    const handleDelete = async () => {
        await deleteDelivery(blogId);
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Delivery center deleted successfully");
            setOpen(false);
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, refetch]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "State", flex: 0.3 },
        { field: "fee", headerName: "Delivery Fee", flex: 0.4 },
        { field: "person", headerName: "Person Incharge", flex: 0.5 },
        { field: "phone", headerName: "Phone", flex: 0.3 },
        {
            field: "isApprove",
            headerName: "Status",
            flex: 0.3,
            renderCell: (params) => (
                <Typography color={params.row.isApprove ? "primary" : "error"}>
                    {params.row.isApprove ? "Approved" : "Not Approved"}
                </Typography>
            )
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params) => (
                <Button
                    onClick={() => {
                        setModalVisible(true);
                        setBlogId(params.row);
                    }}
                >
                    <FiEdit2 className="text-gray-600" size={20} />
                </Button>
            )
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params) => (
                <Button
                    onClick={() => {
                        setOpen(true);
                        setBlogId(params.row.id);
                    }}
                >
                    <AiOutlineDelete className="text-red-500" size={20} />
                </Button>
            )
        },
    ];

    const rows = data?.delivery?.map((item: any) => ({
        id: item?._id,
        name: item?.state,
        fee: item?.fee,
        person: item?.person_incharge,
        isApprove: item?.isApprove,
        phone: item?.phone,
    })) || [];

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setActive(true)}
                className="my-4"
            >
                Add a center
            </Button>
            <div className="bg-white rounded-md mt-3">
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5, page: 0 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{
                                boxShadow: 2,
                                border: 2,
                                borderColor: 'primary.light',
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                    </Box>
                )}

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="delete-modal-title"
                    aria-describedby="delete-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="delete-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete this center?
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} variant="contained" color="error">
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {active && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                        <div className="relative top-20 mx-auto p-5 border w-full md:w-[80%] lg:w-96 shadow-lg rounded-md bg-white">
                            <DeliveryModal setActive={setActive} />
                        </div>
                    </div>
                )}
                {modalVisible && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                        <div className="relative top-20 mx-auto p-5 border w-full md:w-[80%] lg:w-96 shadow-lg rounded-md bg-white">
                            <DeliveryModalUpdate setModalVisible={setModalVisible} blogId={blogId} />
                        </div>
                    </div>
                )}
            </div>
        </>

    );
}