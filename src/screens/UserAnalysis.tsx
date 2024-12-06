import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useGetUsersAnalyticsQuery } from '../redux/features/analytics/analyticsApi'
import Loader from '../components/loader/Loader'



type Props = {}

export default function UserAnalysis({ }: Props) {

    const { data, isLoading } = useGetUsersAnalyticsQuery({})

    console.log(data, "user analytics")


    const analyticsData: any = []
    data && data?.users?.last12Months?.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.totalUsers })
    })

    return (
        <>
            <div className=' bg-white rounded-md py-2 '>
                {isLoading ? <Loader /> :

                    <div className='container mx-auto px-4'>
                        <div className="w-full">
                            <ResponsiveContainer width="100%" height={500}>
                                <AreaChart data={analyticsData} margin={{ top: 20, right: 30, bottom: 0 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type='monotone' dataKey="count" stroke='#4d6249' fill='#4d62d9' />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
