import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useForgot_passwordMutation } from '../../redux/features/auth/authApi'
import images from "../images/smhos.png"
import { MdAttachEmail } from 'react-icons/md';

type Props = {}

export default function ForgotPasswordReset({ }: Props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    const validateEmail = (email: any) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };


    const [forgot_password, { data, isLoading, isSuccess, error }] = useForgot_passwordMutation()


    const forgetPassword = {
        email
    }

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();

        if (!email) {
            return toast.error("Enter your email");
        } else if (!validateEmail(email)) {
            return toast.error("Enter a valid email");
        }
        await forgot_password(forgetPassword)
    }

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Login Successful";
            toast.success(message);
            navigate('/reset-password');
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
                <div className='bg-gray-900 p-2 lg:p-4 scroll-m-3 rounded-b-xl'>
                    <div className='p-3 bg-white  rounded-md'>
                    <h1 className='text-[22px] md:text-[35px] lg:text-[30px] font-medium mb-3 text-center'>Forgot Password</h1>
                        <p className='my-1 font-normal text-base'>Please enter email to change your <strong className='text-blue-500'>SMHOS</strong> password.</p>
                        <div className='mt-3'>
                            <div className="border border-red-400 p-3 rounded-lg flex items-center mt-3">
                                <MdAttachEmail className='mr-2 text-2xl text-blue-600' />
                                <input
                                    type="email"
                                    value={email.toLowerCase()}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter email address' className=' w-full text-base outline-none' />
                            </div>
                        </div>
                        <button
                            onClick={handleOnSubmit}
                            className="flexCenter gap-3 rounded-full border w-full p-4 my-5 bg-black text-base"
                        >
                            {isLoading == true ? <label className="bold-16 whitespace-nowrap cursor-pointer text-white">Loading</label > : <label className="bold-16 whitespace-nowrap cursor-pointer text-white">Change Password</label>}


                        </button>
                        <Link to="/sign-in">
                            <h4 className=' text-gray-500 text-base pb-4'>Return to <span className=' text-blue-600 font-semibold cursor-pointer'>Login</span></h4>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}