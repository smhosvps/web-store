import Loader from '../../components/loader/Loader'
import { useGetAllOfflineOrdersQuery } from '../../redux/features/order/paytitheOrder';
import AllArchiveTithes from '../../components/home/titheRecords/AllArchiveTithes';
import { MdEditDocument } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaFileImport } from 'react-icons/fa6';
import { useState } from 'react';
import PayOfflineTitheModal from '../../components/offlineTithers/PayOfflineTitheModal';

export default function OfflineTithePage() {
    const { isLoading, data } = useGetAllOfflineOrdersQuery({}, { refetchOnMountOrArgChange: true })
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };


    return (
        <>
            <div className="container mx-auto px-4 md:px-0">
                <div className='flex gap-3 justify-end items-end mb-2'>
                    <div onClick={openModal} className='flex cursor-pointer items-center shadow-xl hover:bg-blue-500 text-white bg-[#0079ff] px-3 py-2 rounded-sm text-sm'>
                        New offline Tithe
                        <MdEditDocument className=' text-xl text-white ml-1' />
                    </div>
                    <Link to="/account/manage-tithe-records">
                        <div onClick={openModal} className='flex cursor-pointer items-center shadow-xl hover:bg-orange-400 text-white bg-[#fc8c01] px-3 py-2 rounded-sm text-sm'>
                            Manage Records
                            <FaFileImport className=' text-xl text-white ml-1' />
                        </div>
                    </Link>

                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader />
                        </div>
                    ) : (
                        <AllArchiveTithes orderList={data?.orders || []} />
                    )}
                </div>
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
