import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { styles } from '../../styles/style';
import { useTotalOrderChartQuery } from '../../../redux/features/storeOrder/storeOrderApi';


type Props = {}

export default function OrderCountChart({ }: Props) {
    const { data, isLoading } = useTotalOrderChartQuery<any>({})

    const analyticsData: any = []
    data && data?.seed?.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count })
    })

    const minValue = 0

    return (
        <div className=" bg-gray-900 p-2 mt-5 rounded-xl h-[70vh] flex flex-col items-center justify-center">
            <div className="mt-5">
                <h1 className={`${styles.label} !text-[24px] px-5 !text-start dark:text-white`}>
                    Order Analytics
                </h1>
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

        </div >
    )
}

