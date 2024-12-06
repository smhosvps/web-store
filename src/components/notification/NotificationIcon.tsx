import { IoMdNotificationsOutline } from 'react-icons/io'
import { useGetOrderNotificationQuery } from '../../redux/features/notification/notification'
import { Link } from 'react-router-dom'
import { useGetUserInfoQuery } from '../../redux/features/user/userApi'

type Props = {}

export default function NotificationIcon({ }: Props) {
    const { data } = useGetOrderNotificationQuery({}, { refetchOnMountOrArgChange: true })
    const { data: x } = useGetUserInfoQuery({}, { refetchOnMountOrArgChange: true })
    // Calculate the number of unread notifications
    const unreadCount = data?.notifications?.filter((item: any) => item.status === 'unread')?.length;
    const readCount = data?.notifications?.filter((item: any) => item.status === 'read')?.length;

    return (
        <div className='flex flex-row items-center justify-between gap-6'>
            <div className='flex flex-row items-center mr-4'>
                <Link to="/notification">
                    <div className='relative cursor-pointer m-2' >
                        <IoMdNotificationsOutline className="text-3xl cursor-pointer text-red-500" />
                        <span className='absolute -top-1 -right-5 bg-white rounded-full w-[30px] h-[30px] text-[16px] font-medium flex items-center justify-center text-red-600'> {unreadCount > 0 ? unreadCount : readCount}</span>
                    </div>
                </Link>
            </div>
            <div className="">
                <div className='flex flex-row items-end'>
                    <div className='flex border rounded-full shadow-xl'>
                        <img src={x?.user?.avatar?.url} alt='PayTithe' className='rounded-full h-10 w-10' />
                    </div>
                    <div className='ml-2'>
                        <p className='text-sm font-medium text-white ml-1'>{x?.user?.name}</p>
                        {x?.user?.role == "admin" && <p className='text-xs font-medium text-yellow-300 ml-1 mt-1'>Admin User</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}