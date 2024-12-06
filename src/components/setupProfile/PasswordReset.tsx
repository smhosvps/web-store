import React, { useEffect, useState } from 'react'
import { useUpdatePasswordMutation } from '../../redux/features/user/userApi'
import { toast } from 'react-toastify'
import { styles } from '../styles/style';

type Props = {
    setIsOpen: any;
}

export default function PasswordReset({ setIsOpen }: Props) {
    const [updatePassword, { data, isSuccess, error }] = useUpdatePasswordMutation()
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")


    const update = {
        oldPassword,
        newPassword
    }

    const validatePasswordNew = (newPassword: any) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        return re.test(newPassword);
    };


    const validatePasswordOld = (oldPassword: any) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        return re.test(oldPassword);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!newPassword) {
            return toast.error("Enter your new password")
        }
        else if (!validatePasswordNew(newPassword)) {
            return toast.error("Password must be at least 6 characters and include uppercase, lowercase, number, and special character");
        }

        if (!oldPassword) {
            return toast.error("Enter your old password")
        }
        else if (!validatePasswordOld(oldPassword)) {
            return toast.error("Password must be at least 6 characters and include uppercase, lowercase, number, and special character");
        }

        await updatePassword(update)
    }


    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Successfully updated your profile";
            toast.success(message);
            setIsOpen(false)
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    return (
        <form onSubmit={handleSubmit}>
            <div className='my-5 w-full'>
                <label htmlFor=''>
                    New Password
                </label>
                <input
                    type='password'
                    name=''
                    required
                    value={newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                    id="name"
                    placeholder="Enter new password"
                    className={`${styles.input} !text-gray-700 !text-base`}
                />
            </div>
            <div className='my-5 w-full'>
                <label htmlFor=''>
                    Old Password
                </label>
                <input
                    type='password'
                    name=''
                    required
                    value={oldPassword}
                    onChange={(e: any) => setOldPassword(e.target.value)}
                    id="name"
                    placeholder="Enter old password"
                    className={`${styles.input} !text-gray-700 !text-base`}
                />
            </div>
            <div className='w-full flex items-center justify-end'>
                <input
                    type='submit'
                    value="Update password"
                    className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-base text-white rounded mt-8 cursor-pointer' />
            </div>
        </form>
    )
}