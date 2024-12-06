import { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { useGetAllFaqQuery } from '../../redux/features/fag/faqApi'
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';



type Props = {}

export default function InformationCenter({ }: Props) {
    const { isLoading, data } = useGetAllFaqQuery({}, { refetchOnMountOrArgChange: true })


    return (
        <>

            {isLoading ? (
                <Loader />
            ) : (
                <div className='p-3'>
                    <div className='flex gap-3 justify-end items-end'>

                        {data == "" &&
                            <Link to="/admin/manage-faq">
                                <div className='flex cursor-pointer items-center shadow-xl hover:bg-green-500 text-white bg-green-700 px-3 py-2 rounded-sm text-sm'>
                                    Manage Faq
                                    <MdCreateNewFolder className=' text-xl text-white ml-1' />
                                </div>
                            </Link>
                        }

                    </div>

                    <div className='flex flex-col-reverse md:flex-row gap-3 md:max-w-[70%]'>
                        {data &&
                            <div className=' basis-[70%]  bg-gray-100 rounded-md my-3 p-3 shadow-black'>
                                {data?.map((i: any, index: number) => (
                                    <div key={index}>
                                        <div className='flex justify-between items-center flex-row'>
                                            <div className='mb-2 text-xl font-medium'>{i?.name}</div>
                                            <Link to={`/admin/edit-faq/${i._id}`}>
                                                <div className='bg-blue-900 shadow-sm p-[5px] flex cursor-pointer flex-row items-center gap-2 rounded-md text-blue-100 text-sm'>
                                                    <CiEdit className="text-lg text-blue-100" />
                                                    Edit
                                                </div>
                                            </Link>

                                        </div>

                                        <div className='text-sm md:text-[16px] text-gray-700'>{i?.description}</div>
                                        <Faq data={i?.faq} />
                                    </div>
                                ))}
                            </div>
                        }
                        {data &&
                            <div className=' basis-[30%] '>

                            </div>
                        }
                    </div>

                </div>
            )}

        </>
    )
}

const Faq = (data: any) => {

    const [activeId, setActiveId] = useState(null);


    const toggleActive = (id: any) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div>
            {data?.data?.map((faq: any) => (
                <div key={faq._id} className="faq-item">
                    <div
                        className={`text-sm md:text-lg text-blue-500 font-medium cursor-pointer mt-3 ${activeId === faq.id ? 'text-gray-700' : ''}`}
                        onClick={() => toggleActive(faq._id)}
                    >
                        {faq.question}
                    </div>
                    {activeId === faq._id && (
                        <div className="text-gray-700 text-sm md:text-[16px] bg-slate-50 p-2 rounded-md">{faq?.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

