import React, { useState } from 'react'
import { CiEdit, CiMenuFries } from 'react-icons/ci'
import { RxReset } from "react-icons/rx"
import { Link } from 'react-router-dom'
import { useGetUserInfoQuery } from '../../redux/features/user/userApi'
import PasswordReset from '../setupProfile/PasswordReset'
import { useGetUserQuery } from '../../redux/features/api/apiSlice'
import Loader from '../loader/Loader'

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: user } = useGetUserQuery();
    const { isLoading, data } = useGetUserInfoQuery({}, { refetchOnMountOrArgChange: true })

    const openModal = () => setIsOpen(true)

    const InfoItem = ({ label, value }: { label: string; value?: string }) => (
        value ? <div className='text-gray-700 text-sm md:text-base'><span className="font-semibold">{label}:</span> {value}</div> : null
    )

    const ActionButton = ({ onClick, icon, children, className }: { onClick: () => void; icon: React.ReactNode; children: React.ReactNode; className: string }) => (
        <button onClick={onClick} className={`flex items-center shadow-md hover:bg-opacity-80 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300 ${className}`}>
            {children}
            {icon}
        </button>
    )

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="container mx-auto px-4 md:px-0 py-0">
                <div className="flex space-x-4 mb-6">
                    <Link to={`/${user.user.role}/profile-setup`}>
                        <ActionButton onClick={() => { }} icon={<CiEdit className="ml-2 text-xl" />} className="bg-blue-600">
                            Edit Profile
                        </ActionButton>
                    </Link>
                    <ActionButton onClick={openModal} icon={<RxReset className="ml-2 text-xl" />} className="bg-green-600">
                        Reset Password
                    </ActionButton>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Name" value={data?.user?.name} />
                                <InfoItem label="Email" value={data?.user?.email} />
                                <InfoItem label="Phone" value={data?.user?.phone_number} />
                                <InfoItem label="Account Type" value={data?.user?.accountType} />
                                <InfoItem label="Tithe Number" value={data?.user?.tithe_number} />
                                <InfoItem label="Employment Status" value={data?.user?.is_employed} />
                                <InfoItem label="House Fellowship" value={data?.user?.h_name} />
                                <InfoItem label="Started worshiping since" value={data?.user?.started_since} />
                                <InfoItem label="Gender" value={data?.user?.gender} />
                                <InfoItem label="Date of Birth" value={data?.user?.date_of_birth} />
                                <InfoItem label="Occupation" value={data?.user?.occupation} />
                                <InfoItem label="Marital Status" value={data?.user?.marrital_status} />
                                <InfoItem label="Married to" value={data?.user?.married_to} />
                                <InfoItem label="Address" value={data?.user?.address} />
                                <InfoItem label="City" value={data?.user?.location} />
                                <InfoItem label="Country" value={data?.user?.country} />
                            </div>

                            {data?.user?.accountType === "Ministry" && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Church Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoItem label="Name" value={data?.user?.church_name} />
                                        <InfoItem label="Address" value={data?.user?.church_address} />
                                        <InfoItem label="Country" value={data?.user?.church_country} />
                                    </div>
                                </>
                            )}

                            {data?.user?.is_employed === "Employed" && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Employment Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoItem label="Works at" value={data?.user?.works_at} />
                                        <InfoItem label="Monthly Income" value={data?.user?.salary_expection} />
                                        <CalculateByPercent income={data?.user?.salary_expection} />
                                        <InfoItem label="Started working since" value={data?.user?.working_since} />
                                    </div>
                                </>
                            )}

                            {data?.user?.accountType === "Membership" && data?.user?.service_group && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Service Group</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {data?.user?.service_group.map((group: any, index: number) => (
                                            <div key={index} className="text-blue-600">{group.title}</div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {data?.user?.avatar?.url && (
                            <div className="lg:w-1/3">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <img src={data?.user?.avatar?.url} alt="Profile" className="w-full h-auto rounded-md" />
                                    <div className="mt-2 text-gray-700 text-center">Profile Image</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isOpen && <Modal setIsOpen={setIsOpen} />}
        </div>
    )
}

const CalculateByPercent = ({ income }: { income: string }) => {
    const numericIncome = Number(income.replace(/,/g, ''));
    const tenPercent = numericIncome * 0.1;
    return (
        <div className="text-gray-700 text-sm md:text-base">
            <span className="font-semibold">10% of Amount:</span> ₦{tenPercent.toFixed(2)}
        </div>
    )
}

const Modal = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-md p-6 rounded-lg shadow-xl z-50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
                    <button
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <PasswordReset setIsOpen={setIsOpen} />
            </div>
        </>
    );
};