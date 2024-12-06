import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateAvatarMutation } from '../../redux/features/user/userApi';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  image: string,
  refetch: any
};

export default function Modal({ setIsOpen, image, refetch }: Props) {

  const [loadUser, setLoadUser] = useState(false)
  const [updateAvatar, { data, isLoading, isSuccess, error }] = useUpdateAvatarMutation();

  const closeModal = () => {
    setIsOpen(false);
  };


  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result as string; // Convert to string
          updateAvatar(avatar); // Pass the string directly
        }
      };
      fileReader.readAsDataURL(file);
    }
  };



  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true)
      refetch()
      setIsOpen(false)
    }
    if (error) {
      console.log(error)
    }
  }, [isSuccess, error,])

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Successfully updated your profile";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])





  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Profile Picture</h2>
          <button className="text-gray-500 hover:text-gray-800 focus:outline-none" onClick={closeModal}>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form>
          <div className="bg-white p-8 rounded shadow-lg">
            {image && <img src={image} alt="Preview" className="mb-4 w-32 h-32 object-cover" />}{' '}
            {/* Display the preview image */}
            <input type="file" onChange={imageHandler} />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              type="button"
              className="mt-4 bg-gray-300 ml-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
