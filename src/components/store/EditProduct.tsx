import React, { useEffect, useState } from 'react';
import { useEditProductXMutation, useGetAllProductQuery } from '../../redux/features/product/productApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


type Props = {}

interface ProductData {
    price: string;
    stock: string;
    offer: string;
    name: string;
    category: string;
    isApprove: boolean;
    desc: string;
    video_ad: string;
    isPdf: boolean;
    pdf: string;
}

interface ImageData {
    public_id: string;
    url: string;
}

interface Product {
    _id: string;
    name: string;
    desc: string;
    price: string;
    offer: string;
    category: string;
    stock: string;
    isApprove: boolean;
    video_ad: string;
    images: ImageData[];
    isPdf: boolean;
    pdf: string;
}

export default function EditProduct({ }: Props) {
    const [editProductX, { isLoading, isSuccess, error }] = useEditProductXMutation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, refetch } = useGetAllProductQuery({}, { refetchOnMountOrArgChange: true });

    const [productData, setProductData] = useState<ProductData>({
        price: '',
        stock: '',
        offer: '',
        name: '',
        category: '',
        isApprove: false,
        isPdf: false,
        pdf: "",
        desc: '',
        video_ad: '',
    });

    const [images, setImages] = useState<(ImageData | File)[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'details' | 'images'>('details');

    useEffect(() => {
        const productDataFind = data?.find((i: Product) => i?._id === id);
        if (productDataFind) {
            setProductData({
                name: productDataFind?.name,
                desc: productDataFind?.desc,
                price: productDataFind?.price,
                offer: productDataFind?.offer,
                category: productDataFind?.category,
                stock: productDataFind?.stock,
                isApprove: productDataFind?.isApprove,
                video_ad: productDataFind?.video_ad,
                isPdf: productDataFind?.isPdf,
                pdf: productDataFind?.pdf,
            });

            if (productDataFind.images && Array.isArray(productDataFind.images)) {
                setImages(productDataFind.images);
                setImagePreviews(productDataFind.images.map((img: ImageData) => img.url));
            }
        }
    }, [data, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked }: any = e.target;
        setProductData({
            ...productData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob(blob => {
                    if (blob) {
                        resolve(new File([blob], file.name, { type: file.type }));
                    } else {
                        reject(new Error('Image resizing failed.'));
                    }
                }, file.type);
            };

            img.onerror = () => {
                reject(new Error('Image loading failed.'));
            };
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = Array.from(e.target.files || []);
        const resizedFiles = await Promise.all(files.map(file => resizeImage(file, 500, 500)));
        const newImages = [...images];
        newImages[index] = resizedFiles[0];
        setImages(newImages);

        const previews = resizedFiles.map(file => URL.createObjectURL(file));
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = previews[0];
        setImagePreviews(newImagePreviews);
    };

    const handleAddImageInput = () => {
        setImages([...images, null as unknown as ImageData | File]);
        setImagePreviews([...imagePreviews, '']);
    };

    const handleRemoveImage = (index: number) => {
        if (images.length <= 1) return;
        const newImages = images.filter((_, i) => i !== index);
        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newImagePreviews);
    };

    const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Remove empty image inputs
        const filteredImages = images.filter(image => image !== null);

        // Convert images to base64
        const base64Images = await Promise.all(
            filteredImages.map(file => new Promise<string | undefined>((resolve, reject) => {
                if (file instanceof File) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = error => reject(error);
                } else {
                    resolve(file?.url); // for initial images already present
                }
            }))
        );

        const productPayload = {
            ...productData,
            images: base64Images,
        };

        await editProductX({ id, productPayload });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Product updated successfully");
            refetch();
            navigate("/store/store");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isLoading, isSuccess, error, refetch, navigate]);

    return (
        <div className='p-4 rounded-md bg-white container mx-auto'>
            <div className=''>
                <div className='flex border-b border-gray-200 mb-5'>
                    <button
                        className={`w-1/2 text-center py-3 text-base ${activeTab === 'details' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Product Details
                    </button>
                    <button
                        className={`w-1/2 text-center text-base py-3 ${activeTab === 'images' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('images')}
                    >
                        Image Upload
                    </button>
                </div>
                {activeTab === 'details' ? (
                    <form onSubmit={handleSubmitData}>
                        <div className="flex flex-col lg:flex-row items-center gap-3">
                            <div className='w-full'>
                                <label htmlFor='name' className="text-gray-600 text-base">Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    required
                                    onChange={handleChange}
                                    value={productData.name}
                                    id="name"
                                    placeholder='Eg. the real you'
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor='category' className="text-gray-600 text-base">
                                    Category
                                </label>
                                <select
                                    name='category'
                                    required
                                    onChange={handleChange}
                                    value={productData.category}
                                    id="category"
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    <option value='New Releases'>New Releases</option>
                                    <option value='Faith'>Faith</option>
                                    <option value='Family'>Family</option>
                                    <option value='Prayer'>Prayer</option>
                                    <option value='Wisdom'>Wisdom</option>
                                    <option value='Favour'>Favour</option>
                                    <option value='Praise'>Praise</option>
                                    <option value='Divine Health'>Divine Health</option>
                                    <option value='Restoration'>Restoration</option>
                                    <option value='eBook'>eBook</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-3 mt-5">
                            <div className='w-full'>
                                <label htmlFor='price' className="text-gray-600 text-base">Price</label>
                                <input
                                    type='number'
                                    name='price'
                                    required
                                    onChange={handleChange}
                                    value={productData.price}
                                    id="price"
                                    placeholder='Eg. 100'
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor='offer' className="text-gray-600 text-base">Offer (NGN)</label>
                                <input
                                    type='number'
                                    name='offer'
                                    required
                                    onChange={handleChange}
                                    value={productData.offer}
                                    id="offer"
                                    placeholder='Eg. 0'
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-3 mt-5">
                            <div className='w-full'>
                                <label htmlFor='stock' className="text-gray-600 text-base">Stock</label>
                                <input
                                    type='number'
                                    name='stock'
                                    required
                                    onChange={handleChange}
                                    value={productData.stock}
                                    id="stock"
                                    placeholder='Eg. 1'
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className='w-full my-5'>
                            <label htmlFor='desc' className="text-gray-600 text-base">Description</label>
                            <textarea
                                name='desc'
                                required
                                onChange={handleChange}
                                value={productData.desc}
                                id="desc"
                                placeholder='Eg. this is a brief description of the book'
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-48"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-3">
                            <div className='w-full'>
                                <label htmlFor='video_ad' className="text-gray-600 text-base">Video Ad</label>
                                <input
                                    type='text'
                                    name='video_ad'
                                    onChange={handleChange}
                                    value={productData.video_ad}
                                    id="video_ad"
                                    placeholder='Eg. https://youtu.be/hdTNpDSZZEs'
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className='w-full flex items-center'>
                                <label htmlFor='isPdf' className="text-gray-600 text-base mr-2">Is PDF</label>
                                <input
                                    type='checkbox'
                                    name='isPdf'
                                    onChange={handleChange}
                                    checked={productData.isPdf}
                                    id="isPdf"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                            </div>
                        </div>

                        {productData?.isPdf && (
                            <div className='w-full my-5'>
                                <label htmlFor='pdf' className="text-gray-600 text-base">PDF</label>
                                <input
                                    type='text'
                                    name='pdf'
                                    required={productData.isPdf}
                                    onChange={handleChange}
                                    value={productData.pdf}
                                    id="pdf"
                                    placeholder='Eg. https://example.com/ebook.pdf'
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        )}

                        <div className='w-full my-5'>
                            <label htmlFor='isApprove' className="text-gray-600 text-base">
                                Approval Status
                            </label>
                            <div className="mt-3 flex gap-3 items-center">
                                <input
                                    type='checkbox'
                                    name='isApprove'
                                    checked={productData.isApprove}
                                    onChange={handleChange}
                                    id="isApprove"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <label htmlFor="isApprove" className="text-gray-600">
                                    Approved
                                </label>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <button
                                disabled={isLoading}
                                type='submit'
                                className='w-full border text-base border-blue-700 bg-transparent hover:bg-blue-700 hover:text-white text-blue-700 font-bold py-2 px-4 rounded mt-4 transition duration-300'
                            >
                                {isLoading ? "Loading..." : "Update Product"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitData}>
                        <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className='relative'>
                                    <div className='w-32 h-32 bg-gray-100 rounded-md overflow-hidden border border-gray-300'>
                                        {preview && <img src={preview} alt={`Preview ${index}`} className='object-cover w-full h-full' />}
                                        <input
                                            type='file'
                                            accept='image/*'
                                            onChange={(e) => handleImageChange(e, index)}
                                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                        />
                                    </div>
                                    {images.length > 1 && index < images.length - 1 && (
                                        <button
                                            type='button'
                                            onClick={() => handleRemoveImage(index)}
                                            className='absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full transform -translate-x-1/2 -translate-y-1/2'
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={handleAddImageInput}
                                className='w-32 h-32 flex items-center justify-center bg-gray-100 rounded-md text-base text-gray-600 cursor-pointer border border-gray-300 hover:bg-gray-200 transition duration-300'
                            >
                                + Add Image
                            </button>
                        </div>
                        <div className='mt-4'>
                            <button
                                type='submit'
                                className='w-full border text-base border-blue-700 bg-transparent hover:bg-blue-700 hover:text-white text-blue-700 font-bold py-2 px-4 rounded mt-4 transition duration-300'
                            >
                                {isLoading ? "Loading..." : "Update Product"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}