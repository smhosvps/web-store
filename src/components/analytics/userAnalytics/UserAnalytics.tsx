import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, Label, YAxis, LabelList } from 'recharts'
import { useGetUsersAnalyticsQuery } from '../../../redux/features/analytics/analyticsApi';
import { styles } from '../../styles/style';


type Props = {}

export default function UserAnalytics({ }: Props) {
    const { data, isLoading } = useGetUsersAnalyticsQuery({})
    const analyticsData: any = []
    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count })
    })

    const minValue = 0

    return (
        <div>
            <div>
                {isLoading ? (
                    <div>Loading</div>
                ) : (
                    <div className=" " >
                        <div className="mb-5">
                            <h1 className={`${styles.label} !text-[34px] px-5 !text-start dark:text-white`}>
                                Users Analytics
                            </h1>

                            <p className={`${styles.label} px-5`}>
                                Last 12 months analytics data {""}
                            </p>

                        </div>
                        <div className="w-full">
                            <ResponsiveContainer width="100%" height={380}>
                                <AreaChart data={analyticsData} margin={{ top: 20, right: 30, bottom: 0 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type='monotone' dataKey="count" stroke='#4d6249' fill='#4d62d9' />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

