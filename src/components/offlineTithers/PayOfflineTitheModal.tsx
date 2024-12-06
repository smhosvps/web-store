import React, { useEffect, useState } from 'react'
import { styles } from '../styles/style'
import { useCreateOrderMutation, useGetAllOfflineOrdersQuery, useGetAllOrdersCountQuery, useGetTotalIncomeQuery } from '../../redux/features/order/paytitheOrder'
import { toast } from 'react-toastify'
import { useGetAllUserCountQuery, useSearchUserQuery } from '../../redux/features/user/userApi'

type Props = {
    setIsOpen: (isOpen: boolean) => void;
    closeModal: any
}

export default function PayOfflineTitheModal({ setIsOpen, closeModal }: Props) {
    const [amount, setAmount] = useState("")
    const [month, setMonth] = useState("")
    const [name, setName] = useState("")
    const [currency, setcurrency] = useState("NGN")
    const [tithe_number, setTithe_number] = useState("");
    const [accountType, setAccountType] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [isOffline, setIsOffline] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [offlineTitherId, setOfflineTitheId] = useState("")
    const { refetch } = useGetAllOfflineOrdersQuery({}, { refetchOnMountOrArgChange: true })
    const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation()
    const { refetch: refetchg } = useGetAllOrdersCountQuery({});

    const { refetch: refetchd } = useGetAllUserCountQuery({})

    const { refetch: refetchz } = useGetTotalIncomeQuery({})

    const { data: datax, error: errorx, isLoading: loading, isFetching, refetch: refetchx, isSuccess: success } = useSearchUserQuery(
        { tithe_number: searchTerm, phone_number: searchTerm },
        { skip: !searchTerm }
    );

    const handleSearch = () => {
        refetch();
    };


    const data = {
        amount,
        month,
        currency,
        name,
        tithe_number,
        accountType,
        isOffline,
        offlineTitherId,
    }


    useEffect(() => {
        if (datax) {
            setName(datax?.user?.name)
            setTithe_number(datax?.user?.tithe_number)
            setAccountType(datax?.user?.accountType)
            setOfflineTitheId(datax?.user?._id)
        }
    }, [datax, success])

    useEffect(() => {
        if (success) {
            toast.success("User Found")
            setIsActive(true)
        }
        if (errorx) {
            if ("data" in errorx) {
                const errorMessage = errorx as any;
                // toast.error(errorMessage.data.message)
            }
        }
    }, [loading, success, errorx])

    useEffect(() => {
        if (isSuccess) {
            toast.success("Tithe Reciept created successfully")
            setIsOpen(false)
            refetch()
            refetchd()
            refetchg()
            refetchx()
            refetchz()
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isLoading, isSuccess, error])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!amount) {
            toast.error("Please enter amount")

        }
        if (!month) {
            toast.error("Please select date")
        }
        if (isOffline == false) {
            toast.error("Please check payment mode")
        }
        if (isOffline == true) {
            await createOrder(data)
        }
    }


    const handleCheckboxChange = () => {
        setIsOffline(!isOffline);
    };



    return (
        <div>
            {isActive == false ?
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Search User</h2>
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
                    <div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter Tithe Number or Phone Number"
                            className={`${styles.input} !text-gray-700`}
                        />
                        <button onClick={handleSearch} disabled={isLoading} className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' >
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                        {error && <p style={{ color: 'red' }}></p>}
                    </div>
                </div>
                :
                // currency: { type: String, enum: ['USD', 'NGN', 'GBP', "EUR"], default: 'NGN' },
                <form onSubmit={handleSubmit}>
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Create Tithe Record For User</h2>
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
                        <div className='my-5 w-full flex flex-col'>
                            <label htmlFor=''>
                                Currency
                            </label>
                            <select value={currency} onChange={(e: any) => setcurrency(e.target.value)}  className={`${styles.input} !text-gray-700 mt-2`}>
                                <option >Select currency</option>
                                <option value="USD">USD</option>
                                <option value="NGN">NGN</option>
                                <option value="GBP">GBP</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                        <div className='my-5 w-full'>

                            <label htmlFor=''>
                                Amount
                            </label>
                            <input
                                type='text'
                                name=''
                                required
                                disabled={true}
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                id="name"
                                className={`${styles.input} !text-gray-700`}
                            />
                        </div>

                        <div className='my-5 w-full'>
                            <label htmlFor=''>
                                Tithe Number
                            </label>
                            <input
                                type='text'
                                name=''
                                required
                                disabled={true}
                                value={tithe_number}
                                onChange={(e: any) => setTithe_number(e.target.value)}
                                id="name"
                                className={`${styles.input} !text-gray-700`}
                            />
                        </div>
                        <div className='my-5 w-full'>
                            <label htmlFor=''>
                                Amount
                            </label>
                            <input
                                type='number'
                                name=''
                                required
                                value={amount}
                                onChange={(e: any) => setAmount(e.target.value)}
                                id="name"
                                placeholder="Enter amount"
                                className={`${styles.input} !text-gray-700`}
                            />
                        </div>
                        <div className='my-5 w-full items-center flex' >
                            <label htmlFor=''>
                                Offline Mode
                            </label>
                            <input
                                type="checkbox"
                                checked={isOffline}
                                onChange={handleCheckboxChange}
                                className={`${styles.check} !text-gray-700`}
                            />
                            {isOffline === false &&
                                <div className='text-xs text-red-500 ml-3'>Payment mode must be check to True to be submitted.</div>
                            }
                        </div>

                        <div className='my-5 w-full'>
                            <label htmlFor=''>
                                Month
                            </label>
                            <input
                                type='date'
                                name=''
                                required
                                value={month}
                                onChange={(e: any) => setMonth(e.target.value)}
                                id="name"
                                placeholder="Please date"
                                className={`${styles.input} !text-gray-700`}
                            />
                        </div>
                        <div className='w-full flex items-center justify-end'>
                            <input
                                disabled={isLoading}
                                type='submit'
                                value="Create Offline Tithe"
                                className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
                        </div>
                    </>

                </form>
            }
        </div>

    )
}