import { useEffect, useState } from 'react'
import { Menu, X, Settings, LayoutDashboard, UserPlus, File, LucideMove, TicketCheck, TicketIcon, TicketPlus, UserSquare2Icon } from 'lucide-react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { useGetOrderNotificationQuery } from '../redux/features/notification/notification'
import { useGetUserQuery } from '../redux/features/api/apiSlice'
import { useResizeObserver } from '../components/hooks/useResizeObserver'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../redux/features/auth/authApi'
import { userLoggedOut } from '../redux/features/auth/authSlice'

interface LayoutProps {
    children?: React.ReactNode
}

export default function SharedLayout({ children }: LayoutProps) {
    const { data: user, isLoading:loading } = useGetUserQuery();
    const { data } = useGetOrderNotificationQuery({})
    // Calculate the number of unread notifications
    const unreadCount = data?.notifications?.filter((item: any) => item.status === 'unread')?.length;
    const readCount = data?.notifications?.filter((item: any) => item.status === 'read')?.length;
    const { ref, width } = useResizeObserver<HTMLDivElement>();
    const navigate = useNavigate()
    const dispatch = useDispatch();
  
    const location = useLocation()

    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(userLoggedOut());
            // Navigate to sign-in page
            navigate("/");
            // Refresh the page
            window.location.reload();
        } catch (err) {
            console.error('Failed to log out:', err);
        }
    };


    useEffect(() => {
        if (loading) {
            window.location.reload();
        }
    }, [loading]);



    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)


    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/account' },
        { icon: UserPlus, label: 'Offering', href: '/account/offering' },
        { icon: File, label: 'Anonymous', href: '/account/anonymous' },
        { icon: LucideMove, label: 'Sacrifice', href: '/account/sacrifice' },
        // { icon: TicketCheck, label: 'Online Tithe', href: '/current-tithes' },
        { icon: TicketIcon, label: 'Online Tithes', href: '/account/live-tithes' },
        { icon: TicketPlus, label: 'Live Tithes', href: '/account/online-tithes' },
        { icon: Settings, label: 'Settings', href: '/account/settings' },
    ]

    return (
        <div className="flex h-screen bg-gray-100" ref={ref}>
            {/* Sidebar */}
            <div className={`bg-white w-64 fixed h-full transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static z-30`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl font-bold">Finance Panel</h1>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link to={item.href}>
                                    <button
                                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${location.pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-green-200 hover:text-gray-900'}`}
                                    >
                                        <item.icon className="mr-3 h-6 w-6" />
                                        {item.label}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            <Menu className="h-6 w-6" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-900">{navItems.find(item => item.href === location.pathname)?.label || 'Dashboard'}</h1>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
                                >
                                    <span>{user?.user?.name}</span>
                                    <img
                                        src={user?.user?.avatar?.url || "/placeholder.svg?height=96&width=96"}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        <Link to="/account/notification" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <div className='relative cursor-pointer mr-3' >
                                            <div>Notification</div>
                                                <span className='absolute -top-1 -right-5 bg-white rounded-full w-[30px] h-[30px] text-[16px] font-medium flex items-center justify-center text-red-600'> {unreadCount > 0 ? unreadCount : readCount}</span>
                                            </div>
                                        </Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                Login/Signup
                            </div>
                        )}
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <Outlet />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}