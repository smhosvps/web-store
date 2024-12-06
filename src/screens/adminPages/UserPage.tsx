import Loader from '../../components/loader/Loader'
import AlllUsers from '../../components/users/AllUsers'
import { useAdminGetUsersQuery } from '../../redux/features/user/userApi'

type Props = {}

export default function UserPage({ }: Props) {
    const { isLoading, data, refetch } = useAdminGetUsersQuery({}, { refetchOnMountOrArgChange: true })
    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <AlllUsers userList={data?.users|| []}  refetch={refetch}/>
                )}
            </div>
        </div>
    )
}