import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { styles } from '../styles/style'
import { useCreateTvMutation } from '../../redux/features/salvationTv/salvationApi'

type Props = {
  setOpen: any;
  refetch: any
}

export default function AddChannel({ setOpen, refetch }: Props) {
  const [createTv, { isLoading, isSuccess, error }] = useCreateTvMutation()
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [lang, setLang] = useState("")
  const [isApprove, setIsApprove] = useState(false)



  const handleSubmitData = async (e: any) => {
    e.preventDefault();
    await createTv({
      url,
      isApprove,
      title,
      thumbnail,
      lang
    })
  }


  const imageHandler = async (e: any) => {

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const thumbnail: any = fileReader.result;
        setThumbnail(
          thumbnail
        )
      }
    }
    fileReader.readAsDataURL(e.target.files[0])
  }


  useEffect(() => {
    if (isSuccess) {
      toast.success("Channel created successfully")
      setOpen(false)
      refetch()
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message)
      }
    }
  }, [isSuccess, error])

  const handleCheckboxChange = () => {
    setIsApprove(!isApprove);
  };


  return (
    <div className='overflow-y-auto'>

      <form onSubmit={handleSubmitData} className={`${styles.label}`}>

        <div className='w-[100%]'>
          <label htmlFor='' className='text-gray-300 font-semibold'>
            Title
          </label>
          <input
            type='name'
            name=''
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="name"
            placeholder='Enter title'
            className={`${styles.input} !space-x-3 !tracking-wider`}
          />
        </div>
        <br />
        <div className='w-[100%] my-2'>
          <label htmlFor='' className='text-gray-300 font-semibold'>
            Language
          </label>
          <select
            name=''
            required
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className={`${styles.input} !space-x-3 !tracking-wider`}
          >
            <option>--Select option--</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Chinese">Chinese</option>
            <option value="Arabic">Arabic</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className='w-[100%] mt-5'>
          <label htmlFor='' className='text-gray-300 font-semibold'>
            Url
          </label>
          <input
            type="url"
            name=''
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="name"
            placeholder='Enter url'
            className={`${styles.input} !space-x-3 !tracking-wider`}
          />
        </div>
        <div className='w-full md:flex justify-between'>
          <div className='my-2 w-full items-center flex md:ml-2' >
            <label htmlFor='' className="text-gray-100">
              Approve
            </label>
            <input
              type="checkbox"
              checked={isApprove}
              onChange={handleCheckboxChange}
              className={`${styles.check} !text-gray-700`}
            />
            {isApprove === false &&
              <div className='text-xs text-red-500 ml-3'>Set approved to true </div>
            }
          </div>
        </div>
  
        <div className='w-full'>
          <input
            type='file'
            accept='image/png,image/jpg,image/jpeg,image/webp'
            id='thumbnail'
            className=''
            onChange={imageHandler}
          />

        </div>

        <label htmlFor='file'
          className={`w-full dark:border-gray-800 border-[#00000026] rounded-md mt-3 border flex items-center justify-center ${thumbnail ? "bg-blue-500" : "bg-transparent"
            }`}

        >
          {thumbnail ? (
            <img src={thumbnail}
              alt=''
              className='h-[150px] w-full object-cover' />
          ) : (
            <span className='text-black dark:text-white'>
              Drag and drop your thumbnail here or click to browse
            </span>
          )}

        </label>

        <br />

        <div className='w-full flex items-center justify-end -mt-8'>
          {isLoading ? <div className="text-black font-semibold mt-1">Creating...</div> :
            <input
              type='submit'
              disabled={isLoading}
              value="Create channel"
              className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
          }
        </div>

      </form>
    </div>

  )
}