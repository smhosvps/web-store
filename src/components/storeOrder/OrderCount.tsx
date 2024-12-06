import { Link } from 'react-router-dom';
import {
    useOderCountQuery,
    useTotalDeliveryStatQuery,
    useTotalIncomeQuery,
    useTotalIncomeTaxQuery,
    useTotalRejectedOrderStatQuery
} from '../../redux/features/storeOrder/storeOrderApi';
import { FaMagnifyingGlassChart } from 'react-icons/fa6';

type Props = {}

export default function OrderCount({ }: Props) {
    const { data } = useOderCountQuery<any>({});
    const { data: income } = useTotalIncomeQuery<any>({});
    const { data: rejected } = useTotalRejectedOrderStatQuery<any>({});
    const { data: tax } = useTotalIncomeTaxQuery<any>({});
    const { data: d_fee } = useTotalDeliveryStatQuery<any>({});

    // currency Converter
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    const totalRevenue = income?.totalAmount - tax?.totalAmount;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  ">
            <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                <h2 className="text-lg font-semibold text-gray-700 uppercase">Order</h2>
                <p className='text-gray-500 text-sm my-1'>Successful Pickup & Delivery Order</p>
                <p className="text-base font-bold text-gray-800">{data?.ordersCount}</p>
                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to='/store/store-order-table-view' >
                        <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                    </Link>
                </div>
            </div>
            <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                <h2 className="text-lg font-semibold text-gray-700 uppercase">Rejected Order</h2>
                <p className='text-gray-500 text-sm my-1'>Total Order Rejected</p>
                <p className="text-base font-bold text-gray-800">{rejected?.ordersCount}</p>

            </div>
            <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                <h2 className="text-lg font-semibold text-gray-700 uppercase">Revenue</h2>
                <p className='text-gray-500 text-sm my-1'>All Product Sold</p>
                <p className="text-base font-bold text-gray-800">{formatCurrency(totalRevenue)}</p>
                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to='/store/store-order-income-view' >
                        <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                    </Link>
                </div>
            </div>
            <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                <h2 className="text-lg font-semibold text-gray-700 uppercase">VAT</h2>
                <p className='text-gray-500 text-sm my-1'>All Items Successfully Sold</p>
                <p className="text-base font-bold text-gray-800">{formatCurrency(tax?.totalAmount)}</p>
                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to='/store/store-order-tax-view' >
                        <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                    </Link>
                </div>
            </div>
            <div className='bg-white rounded-lg p-4 border border-gray-300 relative shadow-sm'>
                <h2 className="text-lg font-semibold text-gray-700 uppercase">Delivery</h2>
                <p className='text-gray-500 text-sm my-1'>Delivery Expenses From Day One</p>
                <p className="text-base font-bold text-gray-800">{formatCurrency(d_fee?.totalAmount)}</p>
                <div className='absolute top-3 right-3 bg-gray-700 rounded-md p-2 cursor-pointer'>
                    <Link to='/store/store-order-fee-view' >
                        <FaMagnifyingGlassChart className='text-2xl text-white font-semibold' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

// Modal table