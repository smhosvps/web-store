import { useParams } from 'react-router-dom';
import { useGetAllProductQuery } from '../../redux/features/product/productApi';
import { FaFilePdf } from "react-icons/fa6";
import Loader from '../loader/Loader';

type Props = {}

export default function ProductPreview({ }: Props) {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true });
    const productDataFind = data?.find((i: any) => i?._id === id);


    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };


    return (
        <div className=' bg-white container mx-auto p-4 rounded-md '>
          
            {isLoading ? <Loader /> :
                <div className=''>
                    <div className="product-details">
                        <h1 className='text-gray-600 mb-1 text-[25px] font-medium'>Name: {productDataFind?.name}</h1>
                        <p className='text-gray-600 mb-1 text-[18px] font-medium'>Price: {formatCurrency(productDataFind?.price)}</p>
                        <p className='text-gray-600 mb-1 text-[18px] font-medium'>Offer Price: {formatCurrency(productDataFind?.offer)}</p>
                        <p className='text-gray-600 mb-1 text-[18px] font-medium'>Category: {productDataFind?.category}</p>
                        <p className='text-gray-600 mb-1 text-[18px] font-medium'>Description: {productDataFind?.desc}</p>
                        <p className='text-gray-600 mb-1 text-[18px] font-medium'>Stock: {productDataFind?.stock}</p>
                        <p className='text-gray-600 mb-1 text-[18px] font-medium'>Approved: {productDataFind?.isApprove ? "Yes" : "No"}</p>
                        <p className='text-gray-600 mb-1 text-[18px] font-medium'>Ebook: {productDataFind?.isPdf ? "Yes" : "No"}</p>
                        <div>
                            {productDataFind?.pdf?.url?.length > 0 &&
                                    <div className='bg-white p-2 rounded-md w-[60px] flex justify-center items-center'>
                                        <FaFilePdf className='text-red-700 text-4xl' />
                                    </div>
                               
                            }
                        </div>
                        <div className="flex flex-row ">
                            {productDataFind?.images?.map((image: any) => (
                                <img key={image._id} src={image.url} alt={`Image of ${productDataFind?.name}`} className='h-[200px] w-[200px] ml-3 mt-6 rounded-md' />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}