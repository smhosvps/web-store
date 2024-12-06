// import { useEffect, useState } from 'react'
// import image from '../images/smhos.png'
// import { Link, useNavigate } from 'react-router-dom'
// import { FaChurch, FaMoneyBillTrendUp, FaStore, FaUserGroup } from "react-icons/fa6";
// import { CiBoxList } from "react-icons/ci";
// import { MdChurch, MdDashboard, MdOutlineLiveTv } from "react-icons/md";
// import { MdChecklistRtl } from "react-icons/md";
// import { FaUserShield } from "react-icons/fa";
// import { RiNotificationBadgeFill} from "react-icons/ri";
// import { AiFillNotification } from "react-icons/ai";
// import { MdHelp } from "react-icons/md";
// import { SiGnuprivacyguard } from "react-icons/si";
// import { IoCloudOfflineSharp, IoLogOut } from "react-icons/io5";
// import { useLogOutQuery } from '../../redux/features/auth/authApi';
// import { GiTeacher } from 'react-icons/gi';


// type Props = {}


// export default function Sidebar({ }: Props) {

//   const navigate = useNavigate()


//   const [logout, setLogout] = useState(false);

//   const { isLoading, isError } = useLogOutQuery(undefined, {
//     skip: !logout // Skip the query if logout is false
//   });

//   useEffect(() => {
//     if (logout) {
//       navigate("/auth");
//     }
//   }, [logout, navigate]);

//   const handleLogout = () => {
//     setLogout(true);
//   };


//   return (
//     <div className='bg-gray-900 h-screen overflow-y-auto'>
//       <div className='px-[15px] pt-2'>
//         <Link to="/">
//           <div className='flex justify-center items-center py-2 '>
//             <img src={image} alt='smhos' className=' h-[60px]' />
//           </div>
//         </Link>
//         <div className='mt-5 border-t-2 pt-3 px-3 rounded-md border-blue-40'>
//           <Link to="/">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <MdDashboard className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Dashboard</div>
//             </div>
//           </Link>
//           <Link to="/offering">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <FaMoneyBillTrendUp className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Offering</div>
//             </div>
//           </Link>
//           <Link to="/anonymous-giving">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <FaMoneyBillTrendUp className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Anonymous Offerings</div>
//             </div>
//           </Link>
//           <Link to="/cathedral">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <MdChurch className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Sacrifice</div>
//             </div>
//           </Link>
//           <Link to="/current-tithes">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <CiBoxList className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Online Tithes</div>
//             </div>
//           </Link>
//           <Link to="/document-offline-tithers">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <IoCloudOfflineSharp className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Offline Tithes</div>
//             </div>
//           </Link>
//           <Link to="/archived-tithes">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <MdChecklistRtl className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Archived Tithes</div>
//             </div>
//           </Link>
//           <Link to="/app-users">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <FaUserGroup className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>App Users</div>
//             </div>
//           </Link>
//           <Link to="/profile">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <FaUserShield className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Profile</div>
//             </div>
//           </Link>
//           <Link to="/live-program">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <MdOutlineLiveTv
//                 className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Live</div>
//             </div>
//           </Link>
//           <Link to="/sermon">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <GiTeacher
//                 className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Sermon</div>
//             </div>
//           </Link>
//           <Link to="/store">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <FaStore
//                 className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Store</div>
//             </div>
//           </Link>
//           <Link to="/notification">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <RiNotificationBadgeFill className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Notification</div>
//             </div>
//           </Link>
//           <Link to="/broadcast">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <AiFillNotification className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Broadcast</div>
//             </div>
//           </Link>

//           <Link to="/help-center">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <MdHelp className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Help Center</div>
//             </div>
//           </Link>
//           <Link to="/privacy">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <SiGnuprivacyguard className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Terms & Conditions</div>
//             </div>
//           </Link>
//           <Link to="/homecell-screen">
//             <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer'>
//               <FaChurch  className='h-5 font-normal text-white' />
//               <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>House Fellowship</div>
//             </div>
//           </Link>
//           <div className='flex gap-2 mb-3 text-xl font-medium font-serif cursor-pointer' onClick={handleLogout}>
//             <IoLogOut className='h-5 font-normal text-white' />
//             <div className='text-sm md:text-[15px] font-sans font-semibold text-white hover:text-blue-700'>Logout</div>
//           </div>
//         </div>

//       </div>
//     </div>

//   )
// }


import React from 'react'

type Props = {}

export default function Sidebar({}: Props) {
  return (
    <div>Sidebar</div>
  )
}