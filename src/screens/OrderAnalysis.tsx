import { useEffect } from 'react'
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useGetOrdersAnalyticsQuery } from '../redux/features/analytics/analyticsApi'
import AdminIncomeAnalytics from '../components/analytics/expenses/AdminIncomeAnalytics'
import { useGetAllOrdersQuery } from '../redux/features/order/paytitheOrder';
import { Link } from 'react-router-dom';
import Loader from '../components/loader/Loader';

type Props = {}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function OrderAnalysis({ }: Props) {

    const { data, isLoading, refetch } = useGetOrdersAnalyticsQuery({});
    const { data: income } = useGetAllOrdersQuery<any>({});


    useEffect(() => {
        refetch(); // Fetch data when the component mounts or whenever it re-renders
    }, [refetch]);

    const aggregateData = (data: any) => {
        return income?.orders?.reduce((acc: any, offering: any) => {
            const existingType = acc.find((item: any) => item.currency === offering.currency);
            if (existingType) {
                existingType.amount += offering.amount;
            } else {
                acc.push({ currency: offering.currency || 'Unknown', amount: offering.amount });
            }
            return acc;
        }, []);
    };

    const aggregatedData = aggregateData(income);

    return (
        <>
            <div className='container mx-auto p-4 md:px-0'>
                <div className='flex flex-col gap-5'>
                    {isLoading ? <Loader /> :

                        <div className=''>
                            <div>
                                <div className='flex flex-col mb-9 gap-4 md:flex-row md:justify-between items-center'>
                                    <h4 className='text-blue-500 text-lg font-semibold'>Currency Distribution</h4>
                                    <Link to="/account/branches-analysis">
                                        <button className='p-2 bg-blue-600 text-white font-bold rounded-md'>Branch Analysis</button>
                                    </Link>
                                </div>

                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={aggregatedData}
                                            dataKey="amount"
                                            nameKey="currency"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={150}
                                            fill="#8884d8"
                                            label
                                        >
                                            {aggregatedData?.map((entry: any, index: any) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <AdminIncomeAnalytics data={data?.order?.last12Months} isLoading={isLoading} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}


