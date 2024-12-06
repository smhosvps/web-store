import React, { useEffect, useState } from 'react'
import { styles } from '../styles/style'
import { toast } from 'react-toastify'
import { useEditProfileMutation, useGetUserInfoQuery } from '../../redux/features/user/userApi'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useGetUserQuery } from '../../redux/features/api/apiSlice'

type Props = {}

export default function OnboardProfile({ }: Props) {
  const { data: x, refetch } = useGetUserInfoQuery({}, { refetchOnMountOrArgChange: true })

  const [editProfile, { data, isLoading, isSuccess, error }] = useEditProfileMutation()
  const navigate = useNavigate()
  const { data: user} = useGetUserQuery();
  const [email, setEmail] = useState(x?.user?.email)
  const [name, setName] = useState(x?.user?.name)
  const [phone_number, setPhone_number] = useState(x?.user?.phone_number)
  const [date_of_birth, setdate_of_birth] = useState(x?.user?.date_of_birth)
  const [gender, setGender] = useState(x?.user?.gender)
  const [occupation, setOccupation] = useState(x?.user?.occupation)
  const [location, setLocation] = useState(x?.user?.location)
  const [country, setCountry] = useState(x?.user?.country)
  const [marrital_status, setMarrital_status] = useState(x?.user?.marrital_status)
  const [address, setAddress] = useState(x?.user?.address)
  const [tithe_number, setTithe_number] = useState(x?.user?.tithe_number);
  const [married_to, setMarried_to] = useState(x?.user?.married_to)
  const [church_name, setChurch_name] = useState(x?.user?.church_name)
  const [church_address, setChurch_address] = useState(x?.user?.church_address)
  const [accountType, setAccountType] = useState(x?.user?.accountType)
  const [church_country, setchurch_country] = useState(x?.user?.church_country)
  const [h_name, setH_name] = useState(x?.user?.h_name)
  const [works_at, setWorks_at] = useState(x?.user?.works_at)
  const [salary_expection, setSalary_Expectation] = useState(x?.user?.salary_expection)
  const [working_since, setWorking_since] = useState(x?.user?.working_since)
  const [service_group, setService_group] = useState([{ title: "" }])
  const [is_employed, setIs_employed] = useState(x?.user?.is_employed)
  const [started_since, setStarted_since] = useState(x?.user?.started_since)
  const [image, setImage] = useState(x?.user?.avatar?.url)


  useEffect(() => {
    if (x) {
      setService_group(x?.user?.service_group);
    }
  }, [x])

  const updateProfile = {
    email,
    name,
    phone_number,
    date_of_birth,
    gender,
    occupation,
    location,
    country,
    marrital_status,
    address,
    tithe_number,
    married_to,
    church_name,
    church_address,
    accountType,
    church_country,
    h_name,
    works_at,
    salary_expection,
    working_since,
    service_group,
    is_employed,
    started_since,
  }


  // Generate Tithe number
  const generateRandomNumber = () => {
    if (tithe_number.length === 0) {
      const newNumber: string = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setTithe_number(newNumber);
    }
  };

  const clearNumbers = () => {
    setTithe_number("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    await editProfile(updateProfile)
  }


  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Successfully updated your profile";
      toast.success(message);
      refetch()
      navigate(`/${user?.user?.role}/settings`);
    } 
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };



  return (
    <div className=''>
      <div className=''>
        <form onSubmit={handleSubmit} className={`${styles.label}`}>
          <div className='flex justify-between items-center gap-3'>
            <div className='w-full'>
              <label htmlFor='' className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type='name'
                name=''
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                id="name"
                placeholder="Enter name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

              />
            </div>
            <div className='my-5 w-full'>
              <label htmlFor='' className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                readOnly
                type='email'
                name=''
                required
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                id="name"
                placeholder="Enter email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-3'>
            <div className='my-5 w-full'>
              <label htmlFor='' className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type='phone'
                name=''
                required
                value={phone_number}
                onChange={(e: any) => setPhone_number(e.target.value)}
                id="name"
                placeholder="Enter phone number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor='' className="block text-sm font-medium text-gray-700">
                Account categories
              </label>
              <select

                required
                value={accountType}
                onChange={(e: any) => setAccountType(e.target.value)}
                id="category"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value=''>--Please select type--</option>
                <option value='Personal'>Personal</option>
                <option value='Ministry'>Ministry</option>
                <option value='Corporate Organization'>Corporate Organization</option>
              </select>
            </div>
          </div>
          <br />


          <div className='w-full flex justify-between items-center'>
            <div className={tithe_number == " " ? 'w-[45%]' : "w-full"}>
              <label className="block text-sm font-medium text-gray-700" >
                Tithe Number
              </label>
              <input
                readOnly
                type='number'
                name=''
                required
                value={tithe_number}
                onChange={(e: any) => setTithe_number(e.target.value)}
                id="name"
                placeholder="Tithe number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {tithe_number == "" &&
              <div className='w-[45%]'>
                <div className='flex flex-row gap-2 items-center justify-start'>
                  <button className=' bg-green-700 px-3 py-2 text-white text-[10px] rounded-md' onClick={generateRandomNumber}>Generate Tithe Number</button>
                  <button className=' bg-red-600 py-2 px-2 text-[10px] rounded-md' onClick={clearNumbers}>Clear Numbers</button>
                </div>
              </div>
            }
          </div>
          <div className='flex justify-between items-center gap-3'>
            <div className='my-5 w-full'>
              <label className="block text-sm font-medium text-gray-700" >
                Date of Birth
              </label>
              <input
                type="date"
                name=''
                required
                value={date_of_birth}
                onChange={(e: any) => setdate_of_birth(e.target.value)}
                id="name"
                placeholder="Date of Birth"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {accountType == "Personal" &&
              <div className='my-5 w-full'>
                <label className="block text-sm font-medium text-gray-700" htmlFor=''>
                  Gender
                </label>
                <select

                  required
                  value={gender}
                  onChange={(e: any) => setGender(e.target.value)}
                  id="category"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value=''>--Please select gender--</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              </div>
            }
          </div>

          {accountType == "Personal" &&
            <div className='my-5'>
              <label htmlFor='' className="text-gray-600 text-base">
                Address
              </label>
              <input
                type='married_to'
                name=''
                required
                value={address}
                onChange={(e: any) => setAddress(e.target.value)}
                id="name"
                placeholder="Address"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          }

          <br />
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div >
      {isOpen && (
        <Modal setIsOpen={setIsOpen} image={image} refetch={refetch} />
      )}
    </div >


  )
}

