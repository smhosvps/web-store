// import React, { useEffect, useState } from 'react'
// import { AiOutlineRollback } from 'react-icons/ai'
// import { Link, useNavigate } from 'react-router-dom';
// import { FaChurch, FaMoneyBillTrendUp, FaStore, FaUserGroup } from "react-icons/fa6";
// import { CiBoxList } from "react-icons/ci";
// import { MdChurch, MdDashboard, MdOutlineLiveTv } from "react-icons/md";
// import { MdChecklistRtl } from "react-icons/md";
// import { FaUserShield } from "react-icons/fa";
// import { RiNotificationBadgeFill} from "react-icons/ri";
// import { AiFillNotification } from "react-icons/ai";
// import { MdHelp } from "react-icons/md";
// import { GiTeacher } from "react-icons/gi";
// import { SiGnuprivacyguard} from "react-icons/si";
// import { IoCloudOfflineSharp, IoLogOut } from "react-icons/io5";
// import image from '../images/smhos.png'

// type Props = {
    // toggleSidebar: any;
    // open: any
// }

// export default function MobileSideBar({ toggleSidebar, open }: Props) {
//     const navigate = useNavigate()


//     const [logout, setLogout] = useState(false);

//     const { isLoading, isError } = useLogOutQuery(undefined, {
//         skip: !logout
//     });

//     useEffect(() => {
//         if (logout) {
//             navigate("/auth");
//         }
//     }, [logout, navigate]);

//     const handleLogout = () => {
//         setLogout(true);
//     };



//     return (
//         <>
//             {open && (
//                 <>
//                     <div
//                         aria-hidden="true"
//                         className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
//                     ></div>
//                     <div
//                         className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 bg-gray-900 overflow-auto"

//                         aria-label="Sidebar"
//                     >
//                         <div className="flex items-center justify-between p-5 border-b-2 border-blue-800">
//                             <Link to="/">
//                                 <div className='flex justify-center items-center py-2 '>
//                                     <img src={image} alt='PayTithe' className=' h-8' />
//                                 </div>
//                             </Link>
//                             <button
//                                 onClick={toggleSidebar}
//                                 className="p-3 border-2 border-blue-800 rounded-xl"
//                                 aria-label="close sidebar"
//                             >
//                                 <AiOutlineRollback className='text-white ' />
//                             </button>
//                         </div>
//                         <div className='mt-5 pt-3 px-3 rounded-md '>

//                             <Link to="/">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <MdDashboard className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Dashboard</div>
//                                 </div>
//                             </Link>
//                             <Link to="/offering">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <FaMoneyBillTrendUp className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Offering</div>
//                                 </div>
//                             </Link>
//                             <Link to="/anonymous-giving">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <FaMoneyBillTrendUp className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Anonymous Offering</div>
//                                 </div>
//                             </Link>
//                             <Link to="/cathedral">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <MdChurch className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Sacrifice</div>
//                                 </div>
//                             </Link>
//                             <Link to="/current-tithes ">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <CiBoxList className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Online Tithes</div>
//                                 </div>
//                             </Link>
//                             <Link to="/document-offline-tithers">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <IoCloudOfflineSharp className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Offline Tithes</div>
//                                 </div>
//                             </Link>
//                             <Link to="/archived-tithes">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <MdChecklistRtl className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Archived Tithes</div>
//                                 </div>
//                             </Link>
//                             <Link to="/app-users">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <FaUserGroup className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>App Users</div>
//                                 </div>
//                             </Link>
//                             <Link to="/profile">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <FaUserShield className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Profile</div>
//                                 </div>
//                             </Link>
//                             <Link to="/live-program">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <MdOutlineLiveTv
//                                         className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Live</div>
//                                 </div>
//                             </Link>
//                             <Link to="/sermon">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <GiTeacher
//                                         className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Sermon</div> 
//                                 </div>
//                             </Link>
//                             <Link to="/store">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <FaStore
//                                         className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Store</div>
//                                 </div>
//                             </Link>
//                             <Link to="/notification">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <RiNotificationBadgeFill className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Notification</div>
//                                 </div>
//                             </Link>
//                             <Link to="/broadcast">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <AiFillNotification className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Broadcast</div>
//                                 </div>
//                             </Link>

//                             <Link to="/help-center">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <MdHelp className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Help Center</div>
//                                 </div>
//                             </Link>
//                             <Link to="/privacy">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <SiGnuprivacyguard className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Terms & Conditions</div>
//                                 </div>
//                             </Link>
//                             <Link to="/homecell-screen">
//                                 <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//                                     <FaChurch className='h-5 font-normal text-white' />
//                                     <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>House Fellowship</div>
//                                 </div>
//                             </Link>

//                             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer' onClick={handleLogout}>
//                                 <IoLogOut className='h-5 font-normal text-white' />
//                                 <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Logout</div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </>
//     )
// }


import React from 'react'

type Props = {
    toggleSidebar: any;
    open: any

}

export default function MobileSideBar({toggleSidebar, open}: Props) {
  return (
    <div>MobileSideBar</div>
  )
}