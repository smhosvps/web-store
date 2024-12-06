import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGetStoreTaxAnalyticsQuery } from '../../../redux/features/analytics/analyticsApi';

type Props = {}

export default function TaxAnalyticsView({ }: Props) {
    const { data } = useGetStoreTaxAnalyticsQuery<any>({})
    const analyticsData = data?.order?.last12Months?.map((item: any) => ({
        name: item.month,
        Tax_Payout: item.totalAmount
    }));

    return (
        <div className='mx-auto container p-4 rounded-md bg-gray-900'>
            <div className='border-b border-gray-700 shadow-md'>
                <div className='container items-center p-3 bg-gray-900'>
                    <div className=''>
                        <div className='text-[25px] font-semibold text-gray-100 uppercase text-center'>Tax Analysis</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] m-auto mt-6'>
                <div className="mb-5">
                    <p className='px-5 text-white mt-4'>
                        Last 12 months analytics data {""}
                    </p>

                </div>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={analyticsData} margin={{ top: 20, right: 30, bottom: 0 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type='monotone' dataKey="Tax_Payout" stroke='#4d6249' fill='#4d62d9' />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div >
    )
}

