import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAdminGetUsersQuery } from '../../redux/features/user/userApi';
import Loader from '../loader/Loader';
import { useGetUserQuery } from '../../redux/features/api/apiSlice';


export default function PersonalProfile() {
    const { id } = useParams<{ id: string }>();
    const { data: user } = useGetUserQuery();

    const { data: fetch, isLoading } = useAdminGetUsersQuery({});

    const data = fetch?.success ? fetch.users.find((user: any) => user?._id === id) : null;

    const InfoItem = ({ label, value }: { label: string; value?: string }) => (
        value ? <div className='text-gray-700 text-sm md:text-base'><span className="font-semibold">{label}:</span> {value}</div> : null
    );

    const ActionButton = ({ to, className, children }: { to: string; className: string; children: React.ReactNode }) => (
        <Link to={to}>
            <button className={`${className} px-4 py-2 rounded-md text-white transition-colors duration-300`}>
                {children}
            </button>
        </Link>
    );

    if (isLoading) return <Loader />;
    if (!data) return <div className='p-3 flex justify-center items-center'><h1 className='text-2xl text-gray-700 mt-5'>Account does not exist.</h1></div>;

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='container mx-auto px-4'>
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <div className='p-6'> 
                        {data.role == "account" && (
                            <div className="flex flex-wrap gap-4 mb-6">
                                {data._id && (
                                    <ActionButton to={`/${user.user.role}/all-tithe-paid-online/${data._id}`} className="bg-green-600 hover:bg-green-700">
                                        See all Online tithes paid
                                    </ActionButton>
                                )}
                                {data.tithe_number && ( 
                                    <ActionButton to={`/${user.user.role}/all-tithe-paid/${data.tithe_number}`} className="bg-blue-600 hover:bg-blue-700">
                                        See all Offline tithes paid
                                    </ActionButton>
                                )}
                            </div>
                        )} 

                        <div className='flex flex-col lg:flex-row gap-8'>
                            <div className='lg:w-2/3'>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <InfoItem label="Name" value={data.name} />
                                    <InfoItem label="Email" value={data.email} />
                                    <InfoItem label="Phone" value={data.phone_number} />
                                    <InfoItem label="Account Type" value={data.accountType} />
                                    <InfoItem label="Tithe Number" value={data.tithe_number} />
                                    <InfoItem label="House Fellowship" value={data.h_name} />
                                    <InfoItem label="Started worshiping since" value={data.started_since} />
                                    <InfoItem label="Gender" value={data.gender} />
                                    <InfoItem label="Date of Birth" value={new Date(data.date_of_birth).toLocaleDateString()} />
                                    <InfoItem label="Occupation" value={data.occupation} />
                                    <InfoItem label="Marital Status" value={data.marrital_status} />
                                    <InfoItem label="Address" value={data.address} />
                                    <InfoItem label="City" value={data.location} />
                                    <InfoItem label="Country" value={data.country} />
                                </div>

                                {(data?.tithe_number?.length > 0 || data?.corporate_tithe?.length > 0 || data?.ministry_tithe?.length > 0) && (
                                    <div className="flex-row justify-start border-t-[1px] border-gray-800 py-2 mt-4">
                                  
                                            <div className="items-center flex gap-5">
                                                <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Tithe Numbers</h1>
                                            </div>
                                     
                                        <div className="flex-col">
                                         
                                            {data?.tithe_number?.length > 0 &&
                                                <div className="mt-2 text-gray-700 text-sm md:text-base flex gap-2">
                                                    <p className="font-bold" >Personal:</p>
                                                    <p  >{data?.tithe_number}</p>
                                                </div>
                                            }
                                            {data?.corporate_tithe?.length > 0 &&
                                                 <div className="mt-2 text-gray-700 text-sm md:text-base flex gap-2">
                                                    <p className="font-bold">Corporate:</p>
                                                    <p >{data?.corporate_tithe}</p>
                                                </div>
                                            }
                                            {data?.ministry_tithe?.length > 0 &&
                                                 <div className="mt-2 text-gray-700 text-sm md:text-base flex gap-2">
                                                    <p className="font-bold" >Ministry:</p>
                                                    <p>{data?.ministry_tithe}</p>

                                                </div>
                                            }
                                        </div>

                                    </div>
                                )}

                                {data.accountType === "Ministry" && (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Church Information</h2>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <InfoItem label="Name" value={data.church_name} />
                                            <InfoItem label="Address" value={data.church_address} />
                                            <InfoItem label="Country" value={data.church_country} />
                                        </div>
                                    </>
                                )}

                                

                                {data.accountType === "Personal" && data.service_group && data.service_group.length > 0 && (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Service Group</h2>
                                        <div className='grid grid-cols-2 gap-3'>
                                            {data.service_group.map((group: any, index: number) => (
                                                <div key={index} className='text-blue-600 text-sm md:text-base'>{group.title}</div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {data.avatar?.url && (
                                <div className='lg:w-1/3'>
                                    <div className='bg-green-100 p-4 rounded-lg shadow-sm'>
                                        <img src={data.avatar.url} alt='Profile' className='w-full h-auto rounded-md' />
                                        <div className='mt-2 text-gray-700 text-base text-center'>Profile Image</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


















// import React, { useState, useEffect, useCallback } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Loader from '../loader/Loader';
// import { useAdminGetUsersQuery } from '../../redux/features/user/userApi';
// import { useGetUserQuery } from '../../redux/features/api/apiSlice';


// export default function PersonalProfile() {
//     const { id } = useParams<{ id: string }>();
//     const { data: user } = useGetUserQuery();
//     const { data: fetch, isLoading } = useAdminGetUsersQuery({});
//     const [loading, setLoading] = useState(false);
//     const [countryData, setCountryData] = useState([]);
//     const [stateData, setStateData] = useState([]);


//     const data = fetch?.success ? fetch.users.find((user: any) => user?._id === id) : null;

 
//     const fetchCountries = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
//                 headers: {
//                     'X-CSCAPI-KEY': 'dzd3QW9nZFgwYlh5RmJaYm1VbER5ZmNTam9QeTgyc2VWQWpKakM0bg=='
//                 }
//             });
//             const countryArray = response.data.map((country:any) => ({
//                 value: country.iso2,
//                 label: country.name
//             }));
//             setCountryData(countryArray);
//         } catch (error) {
//             console.error('Error fetching countries:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);


//     console.log(countryData, "country")

//     const fetchStates = useCallback(async (country:any) => {
//         if (!country) return;
//         try {
//             const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
//                 headers: {
//                     'X-CSCAPI-KEY': 'dzd3QW9nZFgwYlh5RmJaYm1VbER5ZmNTam9QeTgyc2VWQWpKakM0bg=='
//                 }
//             });
//             const stateArray = response.data.map((state:any) => ({
//                 value: state.iso2,
//                 label: state.name
//             }));
//             setStateData(stateArray);
//         } catch (error) {
//             console.error('Error fetching states:', error);
//         }
//     }, []);

//     useEffect(() => {
//         fetchCountries();
//     }, [fetchCountries]);

//     useEffect(() => {
//         if (data?.country) {
//             fetchStates(data.country);
//         }
//     }, [data?.country, fetchStates]);

//     const filteredStateValue:any = useCallback(() => {
//         if (!data?.location || !Array.isArray(stateData)) return '';
//         const filteredState = stateData.find((s:any) => s.value === data.location);
//         return filteredState ? filteredState?.label : '';
//     }, [data?.location, stateData]);

//     const filteredCountryValue:any = useCallback(() => {
//         if (!data?.country || !Array.isArray(countryData)) return '';
//         const filteredCountry = countryData.find((c:any) => c.value === data.country);
//         return filteredCountry ? filteredCountry.label : '';
//     }, [data?.country, countryData]);

//     const InfoItem = ({ label, value }: { label: string; value?: string }) => (
//         value ? <div className='text-gray-700 text-sm md:text-base'><span className="font-semibold">{label}:</span> {value}</div> : null
//     );

//     const ActionButton = ({ to, className, children }: { to: string; className: string; children: React.ReactNode }) => (
//         <Link to={to}>
//             <button className={`${className} px-4 py-2 rounded-md text-white transition-colors duration-300`}>
//                 {children}
//             </button>
//         </Link>
//     );

    

//     if (loading) return <Loader />;
//     if (!data) return <div className='p-3 flex justify-center items-center'><h1 className='text-2xl text-gray-700 mt-5'>Account does not exist.</h1></div>;

//     return (
//         <div className='min-h-screen bg-gray-100'>
//             <div className='container mx-auto px-4'>
//                 <div className='bg-white rounded-lg shadow-md overflow-hidden'>
//                     <div className='p-6'>
//                         {data.role === "account" && (
//                             <div className="flex flex-wrap gap-4 mb-6">
//                                 {data?._id && (
//                                     <ActionButton to={`/${user?.role}/all-tithe-paid-online/${data?._id}`} className="bg-green-600 hover:bg-green-700">
//                                         See all Online tithes paid
//                                     </ActionButton>
//                                 )}
//                                 {data?.tithe_number && (
//                                     <ActionButton to={`/${user?.role}/all-tithe-paid/${data?.tithe_number}`} className="bg-blue-600 hover:bg-blue-700">
//                                         See all Offline tithes paid
//                                     </ActionButton>
//                                 )}
//                             </div>
//                         )}
                    
//                         <div className='flex flex-col lg:flex-row gap-8'>
//                             <div className='lg:w-2/3'>
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
//                                 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                                     <InfoItem label="Name" value={data.name} />
//                                     <InfoItem label="Email" value={data.email} />
//                                     <InfoItem label="Phone" value={data.phone_number} />
//                                     <InfoItem label="Account Type" value={data.accountType} />
//                                     <InfoItem label="Tithe Number" value={data.tithe_number} />
//                                     <InfoItem label="House Fellowship" value={data.h_name} />
//                                     <InfoItem label="Started worshiping since" value={data.started_since} />
//                                     <InfoItem label="Gender" value={data.gender} />
//                                     <InfoItem label="Date of Birth" value={new Date(data.date_of_birth).toLocaleDateString()} />
//                                     <InfoItem label="Occupation" value={data.occupation} />
//                                     <InfoItem label="Marital Status" value={data.marrital_status} />
//                                     <InfoItem label="Address" value={data.address} />
//                                     <InfoItem label="City" value={filteredStateValue()} />
//                                     <InfoItem label="Country" value={filteredCountryValue()} />
//                                 </div>

//                                 {data?.accountType === "Ministry" && (
//                                     <>
//                                         <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Church Information</h2>
//                                         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                                             <InfoItem label="Name" value={data?.church_name} />
//                                             <InfoItem label="Address" value={data?.church_address} />
//                                             <InfoItem label="Country" value={data?.church_country} />
//                                         </div>
//                                     </>
//                                 )}

//                                 {data?.accountType === "Personal" && data?.service_group && data?.service_group.length > 0 && (
//                                     <>
//                                         <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Service Group</h2>
//                                         <div className='grid grid-cols-2 gap-3'>
//                                             {data?.service_group.map((group: any, index: number) => (
//                                                 <div key={index} className='text-blue-600 text-sm md:text-base'>{group.title}</div>
//                                             ))}
//                                         </div>
//                                     </>
//                                 )}
//                             </div>

//                             {data?.avatar?.url && (
//                                 <div className='lg:w-1/3'>
//                                     <div className='bg-green-100 p-4 rounded-lg shadow-sm'>
//                                         <img src={data?.avatar.url} alt='Profile' className='w-full h-auto rounded-md' />
//                                         <div className='mt-2 text-gray-700 text-base text-center'>Profile Image</div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

