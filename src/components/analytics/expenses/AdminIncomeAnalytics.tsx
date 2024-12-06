import Loader from "../../loader/Loader";


type Props = {
    data: any;
    isLoading: any
}

export default function AdminIncomeAnalytics({ data, isLoading }: Props) {

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
        const csvContent = data?.map((item: any) => {
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
        <div>

            <div className=''>
                <div className='flex justify-between'>
                    <h4 className='text-blue-500 font-medium text-lg mb-4'>Monthly Total Tithe Income</h4>
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
                            {data?.map((item: any, index:any) => (
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
        </div >
    )
}

