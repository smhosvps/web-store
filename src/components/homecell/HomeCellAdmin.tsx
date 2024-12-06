import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { toast } from 'react-toastify'
import { styles } from '../styles/style'
import { useCreateGuideMutation, useEditGuideMutation, useGetGuideQuery } from '../../redux/features/homecell/houseFellowshipApi';
import { IoClose } from 'react-icons/io5';
import Loader from '../loader/Loader';


type Props = {}

export default function HomeCellAdmin({ }: Props) {
    const { data: dataP, refetch } = useGetGuideQuery({}, { refetchOnMountOrArgChange: true })
    const [createGuide, { isSuccess: success, isLoading: loading, error: errorP }] = useCreateGuideMutation({})
    const [editGuide, { isSuccess, isLoading, error }] = useEditGuideMutation({})

    const [id, setId] = useState<any>({})
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [detail, setValue] = useState("");
    const [date, setDate] = useState("")
    const [url, setUrl] = useState("")



    useEffect(() => {
        if (id) {
            setTitle(id.title)
            setCategory(id.category)
            setValue(id.detail)
            setDate(id.date)
            setUrl(id.url)
        }
    }, [id])



    const data = {
        title,
        detail,
        url,
        date,
        category
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!category) {
            return toast.error("Select category");
        }
        if (!title) {
            return toast.error("Enter your title");
        }
        if (!detail) {
            return toast.error("Enter your detail");
        }
        if (!url) {
            return toast.error("Enter manual url");
        }
        if (!date) {
            return toast.error("Enter pick date for the manual");
        }
        const idx = id?._id

        await editGuide({ idx, data })

    }

    const handleCreate = async (e: any) => {
        e.preventDefault()
        if (!category) {
            return toast.error("Select category");
        }
        if (!title) {
            return toast.error("Enter your title");
        }
        if (!detail) {
            return toast.error("Enter your detail");
        }
        if (!url) {
            return toast.error("Enter manual url");
        }
        if (!date) {
            return toast.error("Enter pick date for the manual");
        }
        e.preventDefault()
        await createGuide({ title, detail, url, date, category })

    }



    useEffect(() => {
        if (success) {
            refetch()
            setTitle("")
            setValue("")
            setCategory("")
            setIsOpen(false)
            toast.success("Manual created successfully")
        }
        if (isSuccess) {
            refetch()
            setId({})
            setIsEdit(false)
            toast.success("Manual updated successfully")
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
        <div className=' h-screen overflow-x-hidden overflow-y-auto'>


            {isLoading ? (
                <Loader />
            ) : (
                <div className='p-3'>
                    <div className='flex flex-col md:flex-col gap-3 md:max-w-[80%] '>
                        {dataP?.homeguide?.length < 3 &&
                            <div className='flex justify-end items-end'>
                                <button className="text-blue-800 bg-blue-50 rounded-md p-2 mt-2 font-semibold" onClick={() => setIsOpen(true)}>Create Guide</button>
                            </div>
                        }
                        {dataP?.homeguide.map((i: any, index: number) => (
                            <div className='bg-gray-900 rounded-md p-2' >
                                <h1 className='text-gray-100 text-2xl lg:text-3xl'>{i?.category}</h1>
                                <h1 className='text-gray-400 text-xl my-1'>{i?.title}</h1>
                                <h1 className='text-gray-500 text-base'>{i?.date}</h1>
                                <button className="text-blue-800 bg-blue-50 rounded-md p-2 mt-2 font-semibold" onClick={() => { setId(i); setIsEdit(true) }}>Edit</button>
                            </div>
                        ))}

                    </div>

                </div>
            )}

            {isOpen &&
                <CreateNew
                    title={title}
                    setTitle={setTitle}
                    detail={detail}
                    setValue={setValue}
                    date={date}
                    setDate={setDate}
                    url={url}
                    setUrl={setUrl}
                    category={category}
                    setCategory={setCategory}
                    handleCreate={handleCreate}
                    loading={loading}
                    setIsopen={setIsOpen}
                />
            }

            {isEdit &&
                <Edit
                    title={title}
                    setTitle={setTitle}
                    detail={detail}
                    setValue={setValue}
                    date={date}
                    setDate={setDate}
                    url={url}
                    setUrl={setUrl}
                    category={category}
                    setCategory={setCategory}
                    handleCreate={handleSubmit}
                    loading={isLoading}
                    setIsopen={setIsEdit}
                />
            }
        </div >
    )
}




const CreateNew = ({
    title,
    setTitle,
    detail,
    setValue,
    date,
    setDate,
    url,
    setUrl,
    category,
    setCategory,
    handleCreate,
    loading,
    setIsopen
}: any) => {

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[600px] bg-gray-900 p-2 md:p-5 lg:p-8  rounded shadow-lg z-50 w-[90%] md:w-[80%] lg:w-[50%] overflow-y-auto">

                <div>
                    <div className="flex justify-between items-center">
                        <h1 className='text-xl uppercase text-gray-100 my-5'>Create House Fellowship Manual</h1>
                        <IoClose className='text-3xl text-red-700' onClick={() => setIsopen(false)} />
                    </div>

                    <form onSubmit={handleCreate} className={`${styles.label}`}>
                        <div className='w-[100%] my-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Category
                            </label>
                            <select
                                name=''
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`${styles.input} !space-x-3 !tracking-wider`}
                            >
                                <option>--Select option--</option>
                                <option value="Corporate fellowship">Corporate guide</option>
                                <option value="Home fellowship">Homefellowship guide</option>
                            </select>
                        </div>
                        <div className='w-[100%]'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Title
                            </label>
                            <input
                                type='name'
                                name=''
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                id="name"
                                placeholder='Enter title'
                                className={`${styles.input} !space-x-3 !tracking-wider`}
                            />
                        </div>
                        <div className='w-[100%] mt-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Date
                            </label>
                            <input
                                type="date"
                                name=''
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                id="name"
                                placeholder='Enter pick date'
                                className={`${styles.input} !space-x-3 !tracking-wider`}
                            />
                        </div>
                        <div className='w-[100%] mt-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                PDF Link
                            </label>
                            <input
                                type="url"
                                name=''
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                id="name"
                                placeholder='Enter url of the manual'
                                className={`${styles.input} !space-x-3 !tracking-wider`}
                            />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Short Highlight
                            </label>
                            <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row w-full bg-slate-200 mt-3 rounded-md' >
                                <ReactQuill
                                    theme="bubble"
                                    value={detail}
                                    onChange={setValue}
                                    placeholder='Write note'
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

            </div>
        </>
    )
}


const Edit = ({
    title,
    setTitle,
    detail,
    setValue,
    date,
    setDate,
    url,
    setUrl,
    category,
    setCategory,
    handleCreate,
    loading,
    setIsopen
}: any) => {

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-2 md:p-5 lg:p-8  rounded shadow-lg z-50 w-[90%] md:w-[80%] lg:w-[50%] overflow-y-auto">

                <div>
                    <div className="flex justify-between items-center">
                        <h1 className='text-xl uppercase text-gray-100 my-5'>Edit House Fellowship Manual</h1>
                        <IoClose className='text-3xl text-red-700' onClick={() => setIsopen(false)} />
                    </div>

                    <form onSubmit={handleCreate} className={`${styles.label}`}>
                        <div className='w-[100%] my-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Category
                            </label>
                            <select
                                name=''
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`${styles.input} !space-x-3 !tracking-wider`}
                            >
                                <option>--Select option--</option>
                                <option value="Corporate fellowship">Corporate guide</option>
                                <option value="Home fellowship">Homefellowship guide</option>
                            </select>
                        </div>
                        <div className='w-[100%]'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Title
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
                        <div className='w-[100%] mt-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Date
                            </label>
                            <input
                                type="date"
                                name=''
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                id="name"
                                placeholder='Enter pick date'
                                className={`${styles.input} !space-x-3 !tracking-wider`}
                            />
                        </div>
                        <div className='w-[100%] mt-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                PDF Link
                            </label>
                            <input
                                type="url"
                                name=''
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                id="name"
                                placeholder='Enter url of the manual'
                                className={`${styles.input} !space-x-3 !tracking-wider`}
                            />
                        </div>
                        <div className='my-5'>
                            <label htmlFor='' className='text-gray-300 font-semibold'>
                                Short Highlight
                            </label>
                            <div className='px-2 md:px-0 flex flex-1 flex-col-reverse md:flex-row w-full bg-slate-200 mt-3 rounded-md' >
                                <ReactQuill
                                    theme="bubble"
                                    value={detail}
                                    onChange={setValue}
                                    placeholder='Write note'
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

            </div>
        </>
    )
}
