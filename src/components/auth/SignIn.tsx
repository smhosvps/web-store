import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { Link } from 'react-router-dom'
import images from "../images/smhos.png"
import { MdAttachEmail, MdLockPerson } from 'react-icons/md';
import Loader from '../loader/Loader';

export default function SignIn() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, { data, isLoading, isSuccess, error }] = useLoginMutation()

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        return re.test(password);
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            return toast.error("Enter your email");
        } else if (!validateEmail(email)) {
            return toast.error("Enter a valid email");
        }
        if (!password) {
            return toast.error("Enter your password");
        } else if (!validatePassword(password)) {
            return toast.error("Password must be at least 6 characters and include uppercase, lowercase, number, and special character");
        }
        await login({ email, password })
    }

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Login Successful";
            toast.success(message);

           navigate("/store")
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error, data, navigate, location])

    return (
        <>
            {isLoading ? <Loader /> :
                <div className='dark:bg-gray-300 flex justify-center py-2 items-center bg-opacity-25 inset-0 fixed top-0 bottom-0 right-0 left-0'>
                    <div className='mx-auto max-w-xl rounded-xl'>
                        <div className='flex justify-center items-center pb-4 bg-gray-900 pt-3 rounded-t-xl'>
                            <img src={images} alt='logo' className='h-[40px]' />
                        </div>

                        <div className='bg-gray-900 p-2 lg:p-4 scroll-m-3 rounded-b-xl'>
                            <div className='p-3 bg-white rounded-md'>
                                <h1 className='text-[22px] md:text-[35px] lg:text-[30px] font-medium mb-3 text-center'>Login</h1>
                                <p className='my-1 font-normal text-base text-gray-700'>Please enter login details to have full access to your <strong className='text-blue-500'>SMHOS</strong> account.</p>

                                <div className='mt-3'>
                                    <div className="border border-red-400 p-3 rounded-lg flex items-center mt-3">
                                        <MdAttachEmail className='mr-2 text-2xl text-blue-600' />
                                        <input
                                            type="email"
                                            value={email.toLowerCase()}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter email address' className='w-full text-base outline-none' />
                                    </div>
                                </div>

                                <div className='mt-3'>
                                    <div className="border border-red-400 p-3 rounded-lg flex items-center mt-3">
                                        <MdLockPerson className='mr-2 text-2xl text-blue-600' />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Enter password' className='w-full text-base outline-none' />
                                    </div>
                                </div>
                                <Link to="/forgot-password">
                                    <h4 className='pt-2 text-base text-blue-600 cursor-pointer'>Forgot password?</h4>
                                </Link>

                                <button onClick={handleOnSubmit}
                                    className="flexCenter gap-3 rounded-full border w-full p-4 my-5 bg-black text-base"
                                >
                                    {isLoading ? <label className="bold-16 whitespace-nowrap cursor-pointer text-white">Loading</label> : <label className="bold-16 whitespace-nowrap cursor-pointer text-white font-semibold">Sign in</label>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

