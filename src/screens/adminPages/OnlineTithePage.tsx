import AllAdminTitheRecords from '../../components/home/titheRecords/AllAdminTitheRecords';
import Loader from '../../components/loader/Loader';
import { useGetAllOrdersQuery } from '../../redux/features/order/paytitheOrder';

export default function OnlineTithePage() {
    const { isLoading, data } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true })

    return (
        <div className="container mx-auto px-4 md:px-0"> 
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <AllAdminTitheRecords orderList={data?.orders || []} />
                )} 
            </div>
        </div>

    )
}