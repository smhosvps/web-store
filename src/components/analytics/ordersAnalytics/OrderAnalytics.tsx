import React, { FC, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useGetOrdersAnalyticsQuery } from '../../../redux/features/analytics/analyticsApi';
import { styles } from '../../styles/style';

type Props = {
    isDashboard?: boolean;
}

const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
    const { data, refetch } = useGetOrdersAnalyticsQuery({});

    useEffect(() => {
        refetch(); // Fetch data when the component mounts or whenever it re-renders
    }, [refetch]);

    const analyticsData: any = []
    data && data?.order?.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count })
    })

    const minValue = 0

    return (
        <div>

            <div className="">
                <div className="mb-5">
                    <h1 className={`${styles.label} !text-[34px] px-5 !text-start dark:text-white`}>
                        Order Analytics
                    </h1>
                    <p className={`${styles.label} px-5`}>
                        Last 12 months analytics data
                    </p>
                </div>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={450}>
                        <AreaChart data={analyticsData} margin={{ top: 20, right: 30, bottom: 0 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type='monotone' dataKey="count" stroke='#4d6249' fill='#4d62d9' />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default OrderAnalytics;
