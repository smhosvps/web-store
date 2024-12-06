import { useGetAllAnanimousOfferingQuery } from '../../redux/features/give/ananousApi'
import AnanimousTable from '../../components/give/AnanimousTable'
import Loader from '../../components/loader/Loader'

export default function AnonymousPage() {
    const { isLoading, data } = useGetAllAnanimousOfferingQuery({}, { refetchOnMountOrArgChange: true })

    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <AnanimousTable orderlist={data?.ananimous || []} />
                )}
            </div>
        </div>

    )
}