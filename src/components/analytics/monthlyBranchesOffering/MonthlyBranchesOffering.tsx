import React, { useState } from 'react';
import { useGetMonthlyTransactionSummaryQuery } from '../../../redux/features/order/paytitheOrder';


export default function MonthlyBranchesOffering({ }) {
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));

    const { data, error, isLoading } = useGetMonthlyTransactionSummaryQuery({ year, month });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // The query will automatically refetch when year or month changes
    };

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-600">Error: {(error as any).data?.error || 'An error occurred'}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Monthly Transaction Summary</h1>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="year" className="block mb-2">Year:</label>
                        <input
                            type="number"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="border rounded px-2 py-1"
                            min="2000"
                            max="2099"
                        />
                    </div>
                    <div>
                        <label htmlFor="month" className="block mb-2">Month:</label>
                        <select
                            id="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="border rounded px-2 py-1"
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                <option key={m} value={m.toString().padStart(2, '0')}>
                                    {new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="self-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Fetch Summary
                        </button>
                    </div>
                </div>
            </form>

            {data && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Summary for {new Date(parseInt(data.year), parseInt(data.month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Branch</th>
                                    <th className="border px-4 py-2">Currency</th>
                                    <th className="border px-4 py-2">Total Amount</th>
                                    <th className="border px-4 py-2">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.branchSummaries.map((branch: any) =>
                                    branch.currencies.map((currency: any, index: any) => (
                                        <tr key={`${branch.branch}-${currency.currency}`}>
                                            {index === 0 && (
                                                <td rowSpan={branch.currencies.length} className="border px-4 py-2">
                                                    {branch.branch}
                                                </td>
                                            )}
                                            <td className="border px-4 py-2">{currency.currency}</td>
                                            <td className="border px-4 py-2">{currency.totalAmount.toLocaleString()}</td>
                                            <td className="border px-4 py-2">{currency.count}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
