import React, { useEffect, useState } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import MobileSideBar from '../navBar/MobileSideBar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useAdminGetUsersQuery } from '../../redux/features/user/userApi'
import { useCreatePrivacyMutation, useEditPolicyMutation, useGetAllPrivacyQuery } from '../../redux/features/privacy/privacyApi'
import { toast } from 'react-toastify'
import { styles } from '../styles/style'
import Loader from '../loader/Loader';




type Props = {}

export default function Privacy({ }: Props) {
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => setOpen(prev => !prev)

    const { data: dataP, refetch } = useGetAllPrivacyQuery({}, { refetchOnMountOrArgChange: true })

    const { data: Admin } = useAdminGetUsersQuery({})
    const [editPolicy, { isSuccess, isLoading, error }] = useEditPolicyMutation({})
    const [createPrivacy, { isSuccess: success, isLoading: loading, error: errorP }] = useCreatePrivacyMutation({})

    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [detail, setValue] = useState(dataP?.privacy?.detail);
    const newData = Admin && Admin.users.filter((item: any) => item.role === "admin")

    useEffect(() => {
        if (dataP) {
            setTitle(dataP?.privacy?.title)
            setValue(dataP?.privacy?.detail)
        }
    }, [dataP])



    const data = {
        title,
        detail
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title) {
            return toast.error("Enter your privacy title");
        }
        if (!detail) {
            return toast.error("Enter your privacy detail");
        }
        const id = dataP?.privacy?._id

        await editPolicy({ id, data })

    }

    const handleCreate = async (e: any) => {
        if (!title) {
            return toast.error("Enter your privacy title");
        }
        if (!detail) {
            return toast.error("Enter your privacy detail");
        }
        e.preventDefault()
        await createPrivacy({ title, detail })

    }


    useEffect(() => {
        if (success) {
            refetch()
            setTitle("")
            setValue("")
            toast.success("Privacy created successfully")
        }
        if (isSuccess) {
            refetch()
            toast.success("Privacy updated successfully")
            setIsOpen(false)
        }
        if (errorP) {
            if ("data" in errorP) {
                const errorMessage = errorP as any;
                toast.error(errorMessage.data.message)
            }
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error, errorP, success])

    return (
        <div className=' mx-auto container px-4 md:px-0'>

            {isLoading ? (
                <Loader />
            ) : (
                <div className='p-3'>
                    <div className='flex flex-col md:flex-row gap-3 md:w-[80%] '>
                        {!dataP?.privacy &&
                            <div>
                                <h1 className='text-xl uppercase text-gray-100 my-5'>Create Privacy</h1>
                                <form onSubmit={handleCreate} className={`${styles.label}`}>
                                    <div className='w-[100%]'>
                                        <label htmlFor='' className='text-gray-300 font-semibold'>
                                            Privacy Title
                                        </label>
                                        <input
                                            type='name'
                                            name=''
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            id="name"
                                            placeholder='Enter privacy title'
                                            className={`${styles.input} !space-x-3 !tracking-wider`}
                                        />
                                    </div>
                                    <div className='my-5'>
                                        <label htmlFor='' className='text-gray-300 font-semibold'>
                                            Privacy Description
                                        </label>
                                        <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row w-full bg-slate-200 mt-3 rounded-md' >
                                            <ReactQuill
                                                theme="bubble"
                                                value={detail}
                                                onChange={setValue}
                                                placeholder='Write privacy'
                                                className={`${styles.input} !h-min !py-2 !text-gray-800 font-medium line-clamp-6`}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full flex items-center justify-end'>
                                        {loading ? <div className='text-base text-gray-200 mt-8'>Loading..</div> :
                                            <input

                                                type='submit'
                                                value="Submit"
                                                className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
                                        }
                                    </div>
                                </form>
                            </div>
                        }
                        {dataP?.privacy?._id?.length > 0 &&
                            <div className=' bg-white rounded-md my-3 p-3'>
                                <div className=' bg-blue-700'>
                                    <div className=' mx-auto max-w-[91%] flex  justify-center items-center py-5 md:py-10 lg:py-16'>
                                        {isOpen == true ? (
                                            <input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder='Enter Policy Title'
                                                className={`${styles.input}`}></input>
                                        ) : (
                                            <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row text-4xl text-center justify-center text-white'>
                                                {dataP?.privacy?.title}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isOpen === true ? (
                                    <div className='flex  justify-center items-center py-10 w-full'>
                                        <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row w-full' >
                                            <ReactQuill
                                                theme="bubble"
                                                value={detail}
                                                onChange={setValue}
                                                placeholder='Write new policy'
                                                className={`${styles.input} !h-min !py-2 !text-gray-800 font-medium line-clamp-6`}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className=' mx-auto w-full flex flex-col  justify-center items-center py-10'>
                                        {newData && isOpen === false && (
                                            <div className='w-full flex justify-end'>
                                                <div className={`${styles.button} !w-[180px] !mb-4 !text-sm`}
                                                    onClick={() => {
                                                        setIsOpen(!isOpen)
                                                    }}>
                                                    Edit Policy
                                                </div>
                                            </div>
                                        )}
                                        <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row'>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: dataP?.privacy?.detail }}
                                                className='text-sm text-gray-900'
                                            />
                                        </div>
                                    </div>
                                )}
                                {isOpen == true && (

                                    <button className="!mb-4 w-full !text-sm bg-black text-white py-3 cursor-default"
                                        onClick={handleSubmit}>
                                        Submit
                                    </button>

                                )}
                            </div>
                        }

                    </div>

                </div>
            )}

            <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
        </div >
    )
}