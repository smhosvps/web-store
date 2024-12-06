import { useGetAllOfferingQuery } from '../../redux/features/give/offeringApi'
import OfferingsTable from '../../components/give/OfferingsTable'
import Loader from '../../components/loader/Loader'

export default function OfferingPage() {
    const { isLoading, data } = useGetAllOfferingQuery({}, { refetchOnMountOrArgChange: true })

    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <OfferingsTable orderlist={data?.offerings || []} />
                )}
            </div>
        </div>

    )
}