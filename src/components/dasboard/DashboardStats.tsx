import React, { useState } from 'react'
import { useGetTotalIncomeQuery } from '../../redux/features/order/paytitheOrder';
import { useGetAllUserCountQuery } from '../../redux/features/user/userApi';
import { FaMagnifyingGlassChart, FaStore } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { CiMenuFries } from 'react-icons/ci';
import NotificationIcon from '../notification/NotificationIcon';
import MobileSideBar from '../navBar/MobileSideBar';
import { useGetTotalOfferingQuery } from '../../redux/features/give/offeringApi';
import { useGetAllSeedsIncomTotalQuery } from '../../redux/features/give/cathedralApi';
import { useTotalIncomeQuery, useTotalIncomeTaxQuery } from '../../redux/features/storeOrder/storeOrderApi';
import { useGetTotalAnanimousGiveIncomeQuery } from '../../redux/features/give/ananousApi';
import Loader from '../loader/Loader';

type Props = {}

export default function DashboardStats({ }: Props) {
    const { data: fetch, isLoading } = useGetAllUserCountQuery<any>({});
    const { data: income } = useGetTotalIncomeQuery<any>({});
    const { data: offering } = useGetTotalOfferingQuery<any>({});
    const { data: x } = useGetAllSeedsIncomTotalQuery<any>({});
    const { data: s } = useGetTotalAnanimousGiveIncomeQuery<any>({});
    const { data: Store_income } = useTotalIncomeQuery<any>({});
    const { data: tax } = useTotalIncomeTaxQuery<any>({});

    const [open, setOpen] = useState(false);
    const toggleSidebar = () => setOpen(prev => !prev);

    // currency Converter
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    const totalRevenue = Store_income?.totalAmount - tax?.totalAmount;

    return (
        <>
            <div className=' h-screen overflow-x-hidden overflow-y-auto'>
                <div className='flex justify-between items-center border-b-2 px-4 md:px-6 lg:px-8 py-2'>
                    <div className='flex lg:hidden py-2 cursor-pointer' onClick={() => setOpen(true)}>
                        <CiMenuFries className='text-xl md:text-2xl text-white' />
                    </div>
                    <div></div>

                    <div>
                        <div className='flex flex-row items-center '>
                            <NotificationIcon />
                        </div>
                    </div>


                </div>
                {isLoading ?
                    <>
                        <Loader />
                    </>
                    :
                    <div className=' p-2 gap-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-4 gap-5'>
                            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-8 relative border border-blue-300'>
                                <h1 className="text-[18px] md:text-[25px] text-white uppercase">USERS</h1>
                                <h4 className='text-blue-50 text-[16px] my-2'>Total Number of Registered Tithers</h4>
                                <h1 className="text-[18px] md:text-[25px] text-yellow-300">{fetch?.ordersCount}</h1>

                                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                                    <Link to="/user-analysis-chart">
                                        <div>
                                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                                        </div>
                                    </Link>

                                </div>
                            </div>
                            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-6 relative border border-blue-300'>
                                <h1 className="text-[18px] md:text-[25px] text-white uppercase">Tithe</h1>
                                <h4 className='text-blue-50 text-[16px] my-2'>Total income</h4>
                                <h1 className="text-[18px] md:text-[25px] text-yellow-300">{formatCurrency(income?.totalAmount)}</h1>
                                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                                    <Link to="/order-analysis-chart">
                                        <div>
                                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                                        </div>
                                    </Link>

                                </div>
                            </div>
                            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-6 relative border border-blue-300'>
                                <h1 className="text-[18px] md:text-[25px] text-white uppercase">Offering</h1>
                                <h4 className='text-blue-50 text-[16px] my-2'>Total income</h4>
                                <h1 className="text-[18px] md:text-[25px] text-yellow-300">{formatCurrency(offering?.totalAmount)}</h1>
                                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                                    <Link to="/offering-analysis">
                                        <div>
                                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                                        </div>
                                    </Link>

                                </div>
                            </div>

                            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-6 relative border border-blue-300'>
                                <h1 className="text-[18px] md:text-[25px] text-white uppercase">Sacrifice</h1>
                                <h4 className='text-blue-50 text-[16px] my-2'>Glory Reign & Cathedral Income </h4>
                                <h1 className="text-[18px] md:text-[25px] text-yellow-300">{formatCurrency(x?.totalAmount)}</h1>
                                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                                    <Link to="/seeds-analysis">
                                        <div>
                                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                                        </div>
                                    </Link>

                                </div>
                            </div>
                            <div className='flex-1 bg-gray-900 rounded-lg px-3 py-8 relative border border-blue-300'>
                                <h1 className="text-[18px] md:text-[25px] text-white uppercase">Anonymous Give</h1>
                                <h4 className='text-blue-50 text-[16px] my-2'>Total Income</h4>
                                <h1 className="text-[18px] md:text-[25px] text-yellow-300">{formatCurrency(s?.totalAmount)}</h1>
                                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                                    <Link to="/anonymous-giving-analysis">
                                        <div>
                                            <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                                        </div>
                                    </Link>

                                </div>
                            </div>
                            <div className='flex-1 bg-gray-900 relative rounded-lg px-3 py-6 border border-blue-300'>
                                <h1 className="text-[18px] md:text-[25px] text-white uppercase">Store</h1>
                                <h4 className='text-blue-50 text-[16px] my-2'>Online Transactions & Income</h4>
                                <h1 className="text-[18px] md:text-[25px] text-yellow-300">{formatCurrency(totalRevenue)}</h1>
                                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                                    <Link to="/store-transaction-analysis">
                                        <div>
                                            <FaStore className='text-2xl text-white font-semibold' />
                                        </div>
                                    </Link>

                                </div>
                            </div>

                        </div>
                    </div>
                }
            </div>
            <MobileSideBar toggleSidebar={toggleSidebar} open={open} />
        </>

    )
}
