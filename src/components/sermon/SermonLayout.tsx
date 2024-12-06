import { useState } from 'react'
import { FaSquarePlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import SermonTable from './SermonTable'
import { useGetAllSermonQuery } from '../../redux/features/sermon/sermonApi'
import Loader from '../loader/Loader'


type Props = {}

export default function SermonLayout({ }: Props) {
    const [open, setOpen] = useState(false)

    const { isLoading: loadingx, data: datax, refetch } = useGetAllSermonQuery({}, { refetchOnMountOrArgChange: true })

    const toggleSidebar = () => setOpen(prev => !prev)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
        search(e.target.value);
    };

    const search = (term: any) => {
        const filteredOfferings = datax?.filter((sermon: any) => {
            const searchFields = [sermon.title.toString()];
            return searchFields.some((field) =>
                field.toLowerCase().includes(term.toLowerCase())
            );
        });
        setSearchResults(filteredOfferings);
    };

    const sermonList = searchTerm ? searchResults : datax

    return (
        <div className=''>

            <Link to="/admin/create-sermon">
                <button className='p-2 rounded-md flex items-center hover:bg-green-500 text-white bg-[#427dae] text-base'>

                    Create Sermon
                    <FaSquarePlus className=' text-xl text-white ml-1' />
                </button>
            </Link>


            {loadingx ? <Loader /> :
                <div className='flex flex-col-reverse lg:flex-row gap-3'>
                    <div className='rounded-md my-3 shadow-black w-full' >
                        <h1 className="text-gray-100 text-[25px] ml-4 uppercase">All Sermon</h1>
                        <SermonTable sermons={sermonList} refetch={refetch} />
                    </div>
                </div>
            }
        </div>
    )
}

