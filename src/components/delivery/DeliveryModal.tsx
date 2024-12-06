import { useEffect, useState } from 'react'
import { styles } from '../styles/style'
import { toast } from 'react-toastify'
import { useCreateDeliveryMutation, useGetAllDeliveryQuery } from '../../redux/features/delivery/deliveryApi'
import { Loader2 } from 'lucide-react'

type Props = {
    setActive: any;
}

export default function DeliveryModal({ setActive }: Props) {
    const [state, setState] = useState("")
    const [fee, setFee] = useState("")
    const [phone, setPhone] = useState("")
    const [person_incharge, setPerson_incharge] = useState("");
    const [isApprove, setIsApprove] = useState(false)
    const { refetch } = useGetAllDeliveryQuery({}, { refetchOnMountOrArgChange: true })

    const [createDelivery, { isLoading, isSuccess, error }] = useCreateDeliveryMutation()

    const data = {
        state,
        fee,
        phone,
        person_incharge,
        isApprove,
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Delivery center created successfully.")
            setActive(false)
            refetch()
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
        if (!state) {
            toast.error("Please enter state/ delivery center")

        }
        if (!fee) {
            toast.error("Please enter delivery date")
        }

        await createDelivery(data)
    }


    const handleCheckboxChange = () => {
        setIsApprove(!isApprove);
    };




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Create New Center</h2>
                        <button
                            className="text-gray-500 hover:text-gray-800 focus:outline-none"
                            onClick={() => setActive(false)}
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
                    <div className='my-5 w-full'>

                        <label htmlFor=''>
                            State
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={state}
                            onChange={(e: any) => setState(e.target.value)}
                            placeholder='Enter state'
                            id="name"
                            className={`${styles.input} !text-gray-700`}
                        />
                    </div>
                    <div className='my-5 w-full'>
                        <label htmlFor=''>
                            Delivery Fee
                        </label>
                        <input
                            type='number'
                            name=''
                            required
                            placeholder='eg. 1300'
                            value={fee}
                            onChange={(e: any) => setFee(e.target.value)}
                            id="name"
                            className={`${styles.input} !text-gray-700`}
                        />
                    </div>
                    <div className='my-5 w-full'>
                        <label htmlFor=''>
                            Person Incharge
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={person_incharge}
                            onChange={(e: any) => setPerson_incharge(e.target.value)}
                            id="name"
                            placeholder="Enter name"
                            className={`${styles.input} !text-gray-700`}
                        />
                    </div>
                    <div className='my-5 w-full'>
                        <label htmlFor=''>
                            Phone No
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={phone}
                            onChange={(e: any) => setPhone(e.target.value)}
                            id="name"
                            placeholder="Enter phone"
                            className={`${styles.input} !text-gray-700`}
                        />
                    </div>
                    <div className='my-5 w-full items-center flex' >
                        <label htmlFor=''>
                            Approve
                        </label>
                        <input
                            type="checkbox"
                            checked={isApprove}
                            onChange={handleCheckboxChange}
                            className={`${styles.check} !text-gray-700`}
                        />
                        {isApprove === false &&
                            <div className='text-xs text-red-500 ml-3'>Set approved to true </div>
                        }
                    </div>
                    <div className='w-full flex items-center justify-end'>
                        <button className='w-full bg-[#37a39a] text-center text-base p-2 text-white rounded mt-8 cursor-pointer' disabled={isLoading} type='submit'>
                            {isLoading ?
                                <div className='flex justify-center items-center'>
                                    <Loader2 className='h-4 text-white text-center' />
                                </div>
                                :
                                "Create Delivery Center"
                            }
                        </button>
                    </div>
                </>
            </form>
        </div>

    )
}