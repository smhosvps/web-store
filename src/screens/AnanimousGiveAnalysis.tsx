import { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useGetAnanimousAnalyticsQuery } from '../redux/features/analytics/analyticsApi';
import { useGetAllAnanimousOfferingQuery, useGetTotalAnanimousGiveIncomeQuery } from '../redux/features/give/ananousApi';
import Loader from '../components/loader/Loader';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PieChartComponent() {
    const { data: x, isLoading } = useGetAnanimousAnalyticsQuery({});
    const { data } = useGetAllAnanimousOfferingQuery({});

    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        if (x?.order?.last12Months) {
            const sortedData: any = [...x.order.last12Months]?.sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime());
            setMonthlyData(sortedData);
        }
    }, [x]);

    const aggregateData = (data: any) => {
        return  data?.ananimous?.reduce((acc: any, offering: any) => {
            const existingType = acc.find((item: any) => item.currency === offering.currency);
            if (existingType) {
                existingType.amount += offering.amount;
            } else {
                acc.push({ currency: offering.currency || 'Unknown', amount: offering.amount });
            }
            return acc;
        }, []);
    };

    const aggregatedData = aggregateData(data);

    const formatCurrency = (amount: any, currency = 'USD') => {
        if (currency === 'null' || currency === null) {
            currency = 'USD';
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
        }).format(amount);
    };

  

    const downloadCSV = () => {
        const headers = ['Month', 'Total Amount', 'Currencies'];
        const csvContent = monthlyData?.map((item: any) => {
            const currenciesString = Object.entries(item.currencies)
                .map(([currency, amount]) => `${currency === 'null' ? 'Unknown' : currency}: ${formatCurrency(amount, currency === 'null' ? 'USD' : currency)}`)
                .join(', ');
            return `${item.month},${currenciesString}`;
        }).join('\n');

        const csv = [headers.join(','), csvContent].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'monthly_income.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) return <Loader />;

    return (
        <div className='container mx-auto p-4 md:px-0'>
            <div className='flex flex-col gap-5'>
                <div>
                    <h4 className='text-blue-500 text-lg mb-4 font-semibold'>Currency Distribution</h4>
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

                <div className=''>
                    <div className='flex justify-between'>
                        <h4 className='text-blue-500 font-medium text-lg mb-4'>Monthly Total Ananimous Income</h4>
                        <button
                            onClick={downloadCSV}
                            className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Download CSV
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-800 text-gray-300">
                                    <th className="py-3 px-4 font-semibold">Month</th>
                                    <th className="py-3 px-4 font-semibold">Currencies</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-700 text-gray-100">
                                {monthlyData.map((item: any, index) => (
                                    <tr key={index} className="border-b border-gray-600 hover:bg-gray-600">
                                        <td className="py-3 px-4">{item.month}</td>
                                        <td className="py-3 px-4">
                                            {Object.entries(item.currencies).map(([currency, amount], idx) => (
                                                <div key={idx}>
                                                    {currency !== 'null' ? `${currency}: ${formatCurrency(amount, currency)}` : `Unknown: ${formatCurrency(amount, 'USD')}`}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}