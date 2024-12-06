import { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from '@mui/material';
import { FiEye } from "react-icons/fi";
import { RiTextDirectionR } from "react-icons/ri";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useUpdateRoleMutation } from "../../redux/features/user/userApi";
import { toast } from "react-toastify";
import { useGetUserQuery } from '../../redux/features/api/apiSlice';

type Props = {
    userList: any[];
    refetch: () => void;
}

export default function AllUsers({ userList, refetch }: Props) {
    const [active, setActive] = useState(false);
    const { data: user, isLoading } = useGetUserQuery();
    const [selectedUser, setSelectedUser] = useState({ id: "", name: "", role: "" });
    const [updateRole, { error: updateError, isSuccess: updateSuccess }] = useUpdateRoleMutation();

    const handleUpdateRole = useCallback(async () => {
        if (selectedUser.id && selectedUser.role) {
            await updateRole({ id: selectedUser.id, role: selectedUser.role });
        }
    }, [selectedUser, updateRole]);

    useEffect(() => {
        if (updateError && "data" in updateError) {
            toast.error((updateError.data as any).message);
        }
        if (updateSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
        }
    }, [updateError, updateSuccess, refetch]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.2 },
        {
            field: "avatar",
            headerName: "Profile",
            flex: 0.2,
            renderCell: (params) => (
                <img src={params.row.avatar || "/noavatar.png"} alt="" className="h-8 w-8 rounded-full object-cover" />
            ),
        },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "gender", headerName: "Gender", flex: 0.2 },
        { field: "tithe", headerName: "Tithe Number", flex: 0.3 },
        { field: "type", headerName: "Account Type", flex: 0.3 },
        { field: "role", headerName: "Role", flex: 0.2 },
        { field: "createdAt", headerName: "Created At", flex: 0.3 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.3,
            renderCell: (params) => (
                <div className="flex space-x-2">
                    <Link to={`/${user?.user?.role}/view-profile/${params.row.id}`}>
                        <Button className="min-w-0 p-1">
                            <FiEye className="text-blue-500 hover:text-blue-700" size={20} />
                        </Button>
                    </Link>
                    <Button
                        className="min-w-0 p-1"
                        onClick={() => {
                            setSelectedUser({ id: params.row.id, name: params.row.name, role: params.row.role });
                            setActive(true);
                        }}
                    >
                        <RiTextDirectionR className="text-green-500 hover:text-green-700" size={20} />
                    </Button>
                </div>
            ),
        },
    ];

    const rows = userList.map((item) => ({
        id: item._id,
        avatar: item.avatar?.url,
        name: item.name,
        gender: item.gender,
        tithe: item.tithe_number,
        type: item.accountType,
        role: item.role,
        createdAt: format(item.createdAt),
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

            <Modal
                open={active}
                onClose={() => setActive(false)}
                aria-labelledby="update-role-modal"
                aria-describedby="modal-to-update-user-role"
            >
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-medium mb-4 text-gray-800">Update User Role</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name</label>
                            <input
                                type="text"
                                id="name"
                                value={selectedUser.name}
                                disabled
                                className="mt-1 p-2 text-gray-600 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                value={selectedUser.role}
                                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                className="mt-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="account">Account</option>
                                <option value="user">User</option>
                                <option value="store">Store</option>
                            </select>
                        </div>
                        <button
                            onClick={handleUpdateRole}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Update Role
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}