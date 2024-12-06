import { useState } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import { IoMdMail, IoMdNotificationsOutline } from 'react-icons/io'
import MobileSideBar from '../navBar/MobileSideBar'


type Props = {}

export default function UserTitheRecords({ }: Props) {
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => setOpen(prev => !prev)

    return (
        <>
            <div className=' h-screen overflow-x-hidden overflow-y-auto'>
                <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
                    <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
                        <CiMenuFries className='text-2xl text-gray-500'  />
                    </div>
                    <div className='hidden md:flex flex-row items-center bg-[#00419e] rounded-r-md mr-5 '>
                        <input type='text' placeholder='Search tithe no' className='py-2 text-sm px-3 outline-none bg-slate-200 w-full text-black h-[35px]'></input>
                        <div className='px-2 cursor-pointer'>
                            <FaSearch className='text-lg' color='white' />
                        </div>

                    </div>

                    <div>
                        <div className='flex flex-row items-center '>

                            <div className='relative cursor-pointer m-2' >
                                <IoMdNotificationsOutline className="text-2xl cursor-pointer text-white" />
                                <span className='absolute -top-1 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[10px] flex items-center justify-center text-white'>45</span>
                            </div>
                            <div className='relative cursor-pointer m-2' >
                                <IoMdMail className="text-2xl cursor-pointer text-white" />
                                <span className='absolute -top-1 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[10px] flex items-center justify-center text-white'>45</span>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='p-3'>

                </div>
                <MobileSideBar toggleSidebar={toggleSidebar} open={open}/>
            </div>
            
        </>
    )
}