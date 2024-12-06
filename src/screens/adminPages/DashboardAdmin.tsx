import React from 'react'
import { useGetTotalIncomeQuery } from '../../redux/features/order/paytitheOrder';
import { useGetAllUserCountQuery } from '../../redux/features/user/userApi';
import { FaMagnifyingGlassChart, FaStore } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useGetTotalOfferingQuery } from '../../redux/features/give/offeringApi';
import { useGetAllSeedsIncomTotalQuery } from '../../redux/features/give/cathedralApi';
import { useTotalIncomeQuery, useTotalIncomeTaxQuery } from '../../redux/features/storeOrder/storeOrderApi';
import { useGetTotalAnanimousGiveIncomeQuery } from '../../redux/features/give/ananousApi';

export default function DashboardAdmin() {
    const { data: fetch } = useGetAllUserCountQuery<any>({});
    const { data: income } = useGetTotalIncomeQuery<any>({});
    const { data: offering } = useGetTotalOfferingQuery<any>({});
    const { data: x } = useGetAllSeedsIncomTotalQuery<any>({});
    const { data: s } = useGetTotalAnanimousGiveIncomeQuery<any>({});
    const { data: Store_income } = useTotalIncomeQuery<any>({});
    const { data: tax } = useTotalIncomeTaxQuery<any>({});

    const formatCurrency = (num: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(num);
    };

    const formatCurrencyNGN = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };


    const totalRevenue = Store_income?.totalAmount - tax?.totalAmount;


    return (
        <div className='container mx-auto px-4 md:px-0'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-4'>
           
                <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                    <h2 className="text-lg font-semibold text-gray-700 uppercase">Users</h2>
                    <p className='text-gray-500 text-sm my-1'>Total number of Registered users</p>
                    <p className="text-base font-bold text-gray-800">{fetch?.ordersCount}</p>
                    <Link to='/account/user-analysis-chart' className='absolute top-2 right-2 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-colors'>
                        <FaMagnifyingGlassChart className='text-xl text-gray-600' />
                    </Link>
                </div>
                <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                    <h2 className="text-lg font-semibold text-gray-700 uppercase">Offering</h2>
                    <p className='text-gray-500 text-sm my-1'>Total income</p>
                    {offering?.currencyStats?.map((i: any, index: number) => (
                        <div className='flex flex-row gap-2 items-center' key={index}>
                            <p className="text-base font-bold text-gray-800">{i?.currency}:</p>
                            <p className="text-base font-bold text-gray-800">{formatCurrency(i?.total, i?.currency)}</p>
                        </div>
                    ))}
                    <Link to='/account/offering-analysis' className='absolute top-2 right-2 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-colors'>
                        <FaMagnifyingGlassChart className='text-xl text-gray-600' />
                    </Link>
                </div>
                <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                    <h2 className="text-lg font-semibold text-gray-700 uppercase">Tithe</h2>
                    <p className='text-gray-500 text-sm my-1'>Total income</p>
                    {income?.currencyStats?.map((i: any, index: number) => (
                        <div className='flex flex-row gap-2 items-center' key={index}>
                            <p className="text-base font-bold text-gray-800">{i?.currency}:</p>
                            <p className="text-base font-bold text-gray-800">{formatCurrency(i?.total, i?.currency)}</p>
                        </div>
                    ))}
                    <Link to='/account/order-analysis-chart' className='absolute top-2 right-2 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-colors'>
                        <FaMagnifyingGlassChart className='text-xl text-gray-600' />
                    </Link>
                </div>
                <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                    <h2 className="text-lg font-semibold text-gray-700 uppercase">Sacrifice</h2>
                    <p className='text-gray-500 text-sm my-1'>Glory Reign & Cathedral Income</p>
                    {x?.currencyStats?.map((i: any, index: number) => (
                        <div className='flex flex-row gap-2 items-center' key={index}>
                            <p className="text-base font-bold text-gray-800">{i?.currency}:</p>
                            <p className="text-base font-bold text-gray-800">{formatCurrency(i?.total, i?.currency)}</p>
                        </div>
                    ))}
                    <Link to='/account/seeds-analysis' className='absolute top-2 right-2 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-colors'>
                        <FaMagnifyingGlassChart className='text-xl text-gray-600' />
                    </Link>
                </div>
                <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                    <h2 className="text-lg font-semibold text-gray-700 uppercase">Anonymous Give</h2>
                    <p className='text-gray-500 text-sm my-1'>Total Income</p>
                    {s?.currencyStats?.map((i: any, index: number) => (
                        <div className='flex flex-row gap-2 items-center' key={index}>
                            <p className="text-base font-bold text-gray-800">{i?.currency}:</p>
                            <p className="text-base font-bold text-gray-800">{formatCurrency(i?.total, i?.currency)}</p>
                        </div>
                    ))}
                    <Link to='/account/anonymous-giving-analysis' className='absolute top-2 right-2 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-colors'>
                        <FaMagnifyingGlassChart className='text-xl text-gray-600' />
                    </Link>
                </div>
                <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                    <h2 className="text-lg font-semibold text-gray-700 uppercase">Store</h2>
                    <p className='text-gray-500 text-sm my-1'>Income After Tax</p>
                    <p className="text-base font-bold text-gray-800">{formatCurrencyNGN(totalRevenue)}</p>
                </div>
            </div>
        </div>
    )
}