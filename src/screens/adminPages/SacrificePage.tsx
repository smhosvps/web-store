import { useGetAllCathedralXQuery } from '../../redux/features/give/cathedralApi';
import CatheralTable from '../../components/give/CathedralTable';
import Loader from '../../components/loader/Loader';

export default function SacrificePage() {
    const { isLoading, data } = useGetAllCathedralXQuery<any>({}, { refetchOnMountOrArgChange: true });

    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader/>
                    </div>
                ) : (
                    <CatheralTable orderlist={data?.seed || []} />
                )}
            </div>
        </div>

    )
}