import React, { useEffect, useState } from 'react';
import { useCreateProductMutation } from '../../redux/features/product/productApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [createProduct, { isLoading, isSuccess, error }] = useCreateProductMutation();
    const [productData, setProductData] = useState({
        price: '',
        stock: '',
        offer: '',
        name: '',
        category: '',
        isApprove: false,
        isPdf: false,
        pdf: '',
        desc: '',
        video_ad: '',
        images: []
    });

    console.log(productData, "data")

    const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<'details' | 'images'>('details');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked }: any = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImageFiles(prevImages => [...prevImages, ...files]);
        setUploadProgress(prevProgress => [...prevProgress, ...files.map(() => 0)]);
    };

    const removeImage = (index: number) => {
        setImageFiles(prevImages => prevImages.filter((_, i) => i !== index));
        setUploadProgress(prevProgress => prevProgress.filter((_, i) => i !== index));
    };

    const resizeAndCompressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    let width = img.width;
                    let height = img.height;

                    // Resize the image to 500px
                    if (width > height) {
                        if (width > 500) {
                            height *= 500 / width;
                            width = 500;
                        }
                    } else {
                        if (height > 500) {
                            width *= 500 / height;
                            height = 500;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;

                    ctx?.drawImage(img, 0, 0, width, height);

                    // Compress the image to 500kB
                    let quality = 0.9;
                    let base64 = canvas.toDataURL('image/jpeg', quality);
                    while (base64.length / 1024 > 500 && quality > 0.1) {
                        quality -= 0.1;
                        base64 = canvas.toDataURL('image/jpeg', quality);
                    }
                    resolve(base64);
                };
                img.onerror = () => reject(new Error('Failed to load image'));
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (productData?.isApprove && imageFiles?.length === 0) {
            alert('You cannot approve a product without images.');
            return;
        }

        if (!productData?.name) {
            return toast.error("Enter your product name");
        }
        if (!productData?.price) {
            return toast.error("Enter your product price");
        }

        if (!productData?.offer) {
            return toast.error("Enter your product name");
        }
        if (!productData?.desc) {
            return toast.error("Enter your product price");
        }
        if (!productData?.category) {
            return toast.error("Enter your product price");
        }

        // Resize and compress images to base64 with progress tracking
        const imagesBase64 = await Promise.all(imageFiles.map(async (file, index) => {
            setUploadProgress(prevProgress => {
                const newProgress = [...prevProgress];
                newProgress[index] = 0;
                return newProgress;
            });
            const base64Image = await resizeAndCompressImage(file!);
            setUploadProgress(prevProgress => {
                const newProgress = [...prevProgress];
                newProgress[index] = 100;
                return newProgress;
            });
            return base64Image;
        }));

        // Prepare the product data
        const finalProductData = {
            ...productData,
            images: imagesBase64,
        };

        await createProduct(finalProductData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Product created successfully");
            navigate("/store/store");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isLoading, isSuccess, error, navigate]);

    return (
        <div className="container mx-auto p-4 bg-white">
            <div className="">
                <div className="flex border-b border-gray-200 mb-5">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    {activeTab === 'details' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={productData.name}
                                        onChange={handleInputChange}
                                        placeholder="Eg. The Real You"
                                        className="mt-1 block p-2 w-full rounded-md border-gray-300 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        name="category"
                                        id="category"
                                        required
                                        value={productData.category}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="New Releases">New Releases</option>
                                        <option value="Faith">Faith</option>
                                        <option value="Family">Family</option>
                                        <option value="Prayer">Prayer</option>
                                        <option value="Wisdom">Wisdom</option>
                                        <option value="Favour">Favour</option>
                                        <option value="Praise">Praise</option>
                                        <option value="Divine Health">Divine Health</option>
                                        <option value="Restoration">Restoration</option>
                                        <option value="eBook">eBook</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        required
                                        value={productData.price}
                                        onChange={handleInputChange}
                                        placeholder="Eg. 100"
                                        className="mt-1 block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="offer" className="block text-sm font-medium text-gray-700">Offer (NGN)</label>
                                    <input
                                        type="number"
                                        name="offer"
                                        id="offer"
                                        required
                                        value={productData.offer}
                                        onChange={handleInputChange}
                                        placeholder="Eg. 0"
                                        className="mt-1 p-2 block border w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    required
                                    value={productData.stock}
                                    onChange={handleInputChange}
                                    placeholder="Eg. 20"
                                    className="mt-1 p-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    rows={5}
                                    name="desc"
                                    id="desc"
                                    required
                                    value={productData.desc}
                                    onChange={handleInputChange}
                                    placeholder="Enter product description"
                                    className="mt-1 p-2 block border w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="video_ad" className="block text-sm font-medium text-gray-700">Video Ad</label>
                                <input
                                    type="text"
                                    name="video_ad"
                                    id="video_ad"
                                    value={productData.video_ad}
                                    onChange={handleInputChange}
                                    placeholder="Eg. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    className="mt-1 p-2 border block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isPdf"
                                    id="isPdf"
                                    checked={productData.isPdf}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 p-2 border text-blue-600 focus:ring-blue-500 border-gray-400 rounded"
                                />
                                <label htmlFor="isPdf" className="ml-2 block text-sm text-gray-900">Is PDF</label>
                            </div>
                            {productData.isPdf && (
                                <div>
                                    <label htmlFor="pdf" className="block text-sm font-medium text-gray-700">PDF URL</label>
                                    <input
                                        type="text"
                                        name="pdf"
                                        id="pdf"
                                        value={productData.pdf}
                                        onChange={handleInputChange}
                                        placeholder="Eg. https://example.com/book.pdf"
                                        className="mt-1 p-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isApprove"
                                    id="isApprove"
                                    checked={productData.isApprove}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 p-2 text-blue-600 focus:ring-blue-500 border-gray-400 rounded"
                                />
                                <label htmlFor="isApprove" className="ml-2 block text-sm text-gray-900">Approve</label>
                            </div>
                        </div>
                    )}
                    {activeTab === 'images' && (
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="images" className="block text-sm font-medium text-gray-700">Add Images</label>
                                <div className="mt-1 flex items-center space-x-2">
                                    <label htmlFor="images" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <IoAddOutline className="mr-2 h-5 w-5" />
                                        Add Image
                                    </label>
                                    <input
                                        type="file"
                                        id="images"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {imageFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(file!)}
                                                alt={`Product ${index + 1}`}
                                                className="h-24 w-24 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 inline-flex items-center p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                <IoCloseOutline className="h-5 w-5" />
                                            </button>
                                            {uploadProgress[index] < 100 && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                                                    <div className="text-white text-sm font-medium">{uploadProgress[index]}%</div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                        >
                            {isLoading ? 'Creating Product...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateProduct;
