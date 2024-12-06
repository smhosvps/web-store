import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSquarePlus } from 'react-icons/fa6'
import ProductTable from './ProductTable'
import MobileSideBar from '../navBar/MobileSideBar'
import { useGetAllProductQuery } from '../../redux/features/product/productApi'
import { FaSearch } from 'react-icons/fa'
import Loader from '../loader/Loader'

type Props = {}

export default function StoreLayout({ }: Props) {
    const [open, setOpen] = useState(false)
    const { isLoading, data, refetch } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true })
    const toggleSidebar = () => setOpen(prev => !prev)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
        search(e.target.value);
    };

    const search = (term: any) => {
        const filteredOfferings = data?.filter((user: any) => {
            const searchFields = [user.name.toString()];
            return searchFields.some((field) =>
                field.toLowerCase().includes(term.toLowerCase())
            );
        });
        setSearchResults(filteredOfferings);
    };

    const productList = searchTerm ? searchResults : data

    return (
        <>

            <div className=' h-screen overflow-x-hidden overflow-y-auto'>
                <div className='flex flex-row justify-between'>
                    <div className='hidden md:flex flex-row items-center bg-slate-200 rounded-r-md mr-5 '>
                        <div className='px-2'>
                            <FaSearch className='text-lg text-gray-900' />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleChange}
                            className='py-2 px-3 outline-none w-full text-black h-[35px] text-base'
                        />
                    </div>
                    <div className='flex gap-3 justify-end items-end'>
                        <div className='flex items-center justify-between gap-4'>
                            <Link to="/store/create-product">
                                <button className='flex items-center shadow-xl hover:bg-green-500 text-white bg-[#427dae] px-3 py-2 rounded-sm text-base cursor-pointer'>
                                    Create Product
                                    <FaSquarePlus className=' text-xl text-white ml-1' />
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>


                <div className='p-3'>

                    {isLoading ? <Loader /> :
                        <div className='flex flex-col-reverse lg:flex-row gap-3'>
                            <div className=' bg-gray-100 rounded-md w-full' >
                                <ProductTable product={productList} refetch={refetch} />
                            </div>
                        </div>
                    }
                    <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
                </div>

            </div>
        </>
    )
}