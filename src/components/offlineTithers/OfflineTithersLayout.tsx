import { useState } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'
import MobileSideBar from '../navBar/MobileSideBar'
import { useGetAllOfflineOrdersQuery } from '../../redux/features/order/paytitheOrder'
import NotificationIcon from '../notification/NotificationIcon'
import PayOfflineTitheModal from './PayOfflineTitheModal' 
import OfflineTitheTable from './OfflineTitheTable'
import { MdEditDocument } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaFileImport } from 'react-icons/fa6'
import Loader from '../loader/Loader'

type Props = {} 

export default function OfflineTithersLayout({ }: Props) {
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => setOpen(prev => !prev)
    const { isLoading, data } = useGetAllOfflineOrdersQuery({}, { refetchOnMountOrArgChange: true })

    const [isOpen, setIsOpen] = useState(false);
 
    const openModal = () => {
        setIsOpen(true);
    };


    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
        search(e.target.value);
    };

    const search = (term: any) => {
        const filteredUsers = data?.orders.filter((user: any) => {
            // Convert tithe_number to string and number for searching
            const searchFields = [
                user.name.toLowerCase(),
                user.tithe_number.toString(),
                user.tithe_number // Keep the number format for comparison
            ];

            // Check if any field includes the search term (string) or matches the term (number)
            return searchFields.some((field) => {
                if (typeof field === 'number' && !isNaN(term)) {
                    // Compare numbers directly
                    return field === Number(term);
                } else {
                    // Compare strings
                    return field.toString().toLowerCase().includes(term.toString().toLowerCase());
                }
            });
        });
        setSearchResults(filteredUsers);
    };

    const orderList = searchTerm ? searchResults : data?.orders;

    return (
        <>
            <div className=' h-screen overflow-x-hidden overflow-y-auto'>
                <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
                    <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
                        <CiMenuFries className='text-2xl text-gray-500' />
                    </div>
                    <div className='hidden md:flex flex-row items-center bg-slate-200 rounded-r-md mr-5 '>
                        <div className='px-2'>
                            <FaSearch className='text-lg text-gray-900' />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or tithe number"
                            value={searchTerm}
                            onChange={handleChange}
                            className='py-2 text-base px-3 outline-none w-full text-black h-[35px]'
                        />
                    </div>

                    <div>
                        <div className='flex flex-row items-center '>

                            <NotificationIcon />
                        </div>
                    </div>


                </div>
                <div className='p-3'>
                    <div className='flex gap-3 justify-end items-end'>
                        <div onClick={openModal} className='flex cursor-pointer items-center shadow-xl hover:bg-blue-500 text-white bg-[#0079ff] px-3 py-2 rounded-sm text-sm'>
                            New offline Tithe
                            <MdEditDocument className=' text-xl text-white ml-1' />
                        </div>
                        <Link to="/manage-tithe-records">
                            <div onClick={openModal} className='flex cursor-pointer items-center shadow-xl hover:bg-orange-400 text-white bg-[#fc8c01] px-3 py-2 rounded-sm text-sm'>
                                Manage Records
                                <FaFileImport className=' text-xl text-white ml-1' />
                            </div>
                        </Link>

                    </div>
                    <div className='flex flex-col md:flex-row gap-3 max-w-[80%'>
                        {isLoading ? <Loader /> : (

                            <OfflineTitheTable orderList={orderList} />
                        )}
                    </div>

                </div>
                <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
            </div>
            {isOpen && (
                <Modal setIsOpen={setIsOpen} />
            )}
        </>
    )
}

const Modal = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded w-[80%] lg:w-[40%] shadow-lg z-50">
                <PayOfflineTitheModal setIsOpen={setIsOpen} closeModal={closeModal} />
            </div>
        </>

    );
};
