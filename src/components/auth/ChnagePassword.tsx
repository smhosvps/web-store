import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useReset_passwordMutation } from '../../redux/features/auth/authApi';
import images from "../images/smhos.png"
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { MdLockPerson } from 'react-icons/md';


type Props = {}

export default function ChnagePassword({ }: Props) {
    const [reset_password, { data, isLoading, isSuccess, error }] = useReset_passwordMutation()
    const { resetToken } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [token, setToken] = useState(resetToken)
    const [reset_code, setReset_code] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPassword = {
        token,
        reset_code,
        newPassword
    }

    const validateCode = (reset_code: any) => {
        const re = /^\d+$/;
        return re.test(String(reset_code));
    };

    const validatePassword = (newPassword: any) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        return re.test(newPassword);
    };

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();

        if (!reset_code) {
            return toast.error("Enter your OTP code");
        } else if (!validateCode(reset_code)) {
            return toast.error("Number can only contain digits");
        }

        if (!newPassword) {
            return toast.error("Enter your new password")
        }
        else if (!validatePassword(newPassword)) {
            return toast.error("Password must be at least 6 characters and include uppercase, lowercase, number, and special character");
        }
        if (!confirmPassword) {
            return toast.error("Password must be at least 6 characters and include uppercase, lowercase, number, and special character")
        }

        else if (confirmPassword !== newPassword) {
            return toast.error("Password do not match")
        }
        await reset_password(resetPassword)
    }


    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Password Reset Successful"
            toast.success(message);
            navigate('/');
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])



    return (
        <div className=' dark:bg-gray-300 flex justify-center py-2 items-center bg-opacity-25 inset-0 fixed top-0 bottom-0 right-0 left-0'>

            <div className='mx-auto max-w-xl'>
                <div className='flex justify-center items-center pb-4 bg-gray-900 pt-3 rounded-t-xl'>
                    <img src={images} alt='logo' className='h-[40px]' />
                </div>
                <div className='bg-gray-900 p-2 lg:p-4 scroll-m-3 rounded-b-xl' >
                    <div className='p-3 bg-white  rounded-md'>
                        <h1 className='text-[22px] md:text-[35px] lg:text-[30px] font-medium mb-3 text-center'>Change Password</h1>
                        <p className='my-1 font-normal text-base'>Please enter details to reset your <strong className='text-blue-500'>SMHOS</strong> password.</p>

                        <div className='mt-3'>
                            <div className="border border-red-400 p-3 rounded-lg flex items-center mt-3">
                                <AiOutlineFieldNumber className='mr-2 text-2xl text-blue-600' />
                                <input
                                    type="number"
                                    value={reset_code}
                                    onChange={(e) => setReset_code(e.target.value)}
                                    placeholder='Enter OTP' className=' w-full text-base outline-none' />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className="border border-red-400 p-3 rounded-lg flex items-center mt-3">
                                <MdLockPerson className='mr-2 text-2xl text-blue-600' />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder='Enter new password' className=' w-full text-base outline-none' />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className="border border-red-400 p-3 rounded-lg flex items-center mt-3">
                                <MdLockPerson className='mr-2 text-2xl text-blue-600' />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm Password' className=' w-full text-base outline-none' />
                            </div>

                        </div>
                        <button
                            onClick={handleOnSubmit}
                            className="flexCenter gap-3 rounded-full border w-full p-4 my-5 bg-black text-base"
                        >
                            {isLoading == true ? <label className="bold-16 whitespace-nowrap cursor-pointer text-white text-base">Loading</label > : <label className="bold-16 whitespace-nowrap cursor-pointer text-white">Reset Password</label>}


                        </button>

                    </div>

                </div >
            </div>
        </div >
    )
}