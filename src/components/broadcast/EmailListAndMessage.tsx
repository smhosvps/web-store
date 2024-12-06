import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Modal, Typography, TextField } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai';
import { useCreateMessageMutation, useDeleteMessagesMutation, useGetAllMessagesQuery } from '../../redux/features/marketing/marketingApi';
import { toast } from 'react-toastify';
import { format } from 'timeago.js'

export default function EmailListAndMessage() {
    const { isLoading, data, refetch } = useGetAllMessagesQuery({}, { refetchOnMountOrArgChange: true })
    const [createMessage, { error: updateError, isSuccess: updateSuccess, isLoading: loading }] = useCreateMessageMutation()
    const [deleteMessages, { error: ErrorDelete, isSuccess }] = useDeleteMessagesMutation()
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [userId, setUserId] = useState("")
    const [message, setMessage] = useState("")
    const [subject, setSubject] = useState("")

    const handleUpdateRole = async () => {
        await createMessage({ message, subject })
    }

    const handleDelete = async () => {
        await deleteMessages(userId)
    }

    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message)
            }
        }

        if (updateSuccess) {
            refetch()
            toast.success("Email sent and created successfully!")
            setActive(false)
        }

        if (isSuccess) {
            refetch()
            toast.success("User deleted successfully")
            setOpen(false)
        }
        if (ErrorDelete) {
            if ("data" in ErrorDelete) {
                const errorMessage = ErrorDelete as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, ErrorDelete, updateError, updateSuccess, refetch])

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "from", headerName: "From", flex: 0.4 },
        { field: "to", headerName: "Recipients", flex: 0.4 },
        { field: "subject", headerName: "Subject", flex: 0.6 },
        { field: "message", headerName: "Message", flex: 1 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params) => (
                <Button onClick={() => {
                    setOpen(true)
                    setUserId(params.row.id)
                }}>
                    <AiOutlineDelete className="text-red-600" size={20} />
                </Button>
            )
        },
    ]

    const rows = data ? data.map((item: any) => ({
        id: item._id,
        from: item.from,
        to: item.to,
        subject: item.subject,
        message: item.message,
        createdAt: format(item.createdAt)
    })) : []

    return (
        <div className='w-full bg-white rounded-md my-3 p-3 shadow-md'>
            <Box>
                <div className='w-full flex justify-end mb-4'>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActive(true)}
                    >
                        Send New Message
                    </Button>
                </div>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5, page: 0 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        loading={isLoading}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                            '& .MuiDataGrid-cell': {
                                color: 'text.secondary',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: 'background.paper',
                                color: 'text.primary',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Box>
                <Modal
                    open={active}
                    onClose={() => setActive(false)}
                    aria-labelledby="send-message-modal"
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
                        borderRadius: 2,
                    }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Send New Message
                        </Typography>
                        <TextField
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateRole}
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Send Message'}
                        </Button>
                    </Box>
                </Modal>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="delete-modal"
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
                        borderRadius: 2,
                    }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Are you sure you want to delete this message?
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
            </Box>
        </div>
    )
}