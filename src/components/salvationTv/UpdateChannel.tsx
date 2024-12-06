import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { styles } from '../styles/style'
import { useEditTvMutation } from '../../redux/features/salvationTv/salvationApi'

type Props = {
  setOpen: any;
  refetch: any;
  id: any
}

export default function UpdateChannel({ setOpen, refetch, id }: Props) {
  const [editTv, { error: errorx, isSuccess: success, isLoading: isLoadingUpdate }] = useEditTvMutation({})
  const [url, setUrl] = useState(id?.link)
  const [title, setTitle] = useState(id?.name)
  const [thumbnail, setThumbnail] = useState()
  const [lang, setLang] = useState(id?.lang)
  const [isApprove, setIsApprove] = useState(id?.status)
  const [thumbnailEdit, setThumbnailEdit] = useState(id.thumbnail)

  const handleUpdatedLiveFeed = async (e: any) => { 
    e.preventDefault();
    const idx = id.id
    await editTv({
      idx, 
      url,
      isApprove,
      thumbnail,
      title,
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
    if (success) {
      toast.success("Channel created successfully")
      setOpen(false)
      refetch()
    }
    if (errorx) {
      if ("data" in errorx) {
        const errorData = errorx as any;
        toast.error(errorData.data.message)
      }
    }
  }, [success, errorx])

  const handleCheckboxChange = () => {
    setIsApprove(!isApprove);
  };


  return (
    <div className=' overflow-y-auto'>

      <form onSubmit={handleUpdatedLiveFeed} className={`${styles.label}`}>

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
          className={`w-full min-h-[10vh] dark:border-gray-800 border-[#00000026] rounded-md mt-3 p-3 border flex items-center justify-center ${thumbnail ? "bg-blue-500" : "bg-transparent"
            }`}
        >
          {thumbnail || thumbnailEdit ? (
            <img src={thumbnail || thumbnailEdit}
              alt=''
              className='h-[150px] w-full object-cover' />
          ) : (
            <span className='text-black dark:text-white'>
              Your thumbnail will appear here
            </span>
          )}


        </label>
        <br />

        <div className='w-full flex items-center justify-end -mt-8'>
          {isLoadingUpdate ? <div className="text-black font-semibold mt-1">Creating...</div> :
            <input
              type='submit'
              disabled={isLoadingUpdate}
              value="Update channel"
              className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
          }
        </div>

      </form>
    </div>

  )
}