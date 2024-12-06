import React, { useEffect, useState } from 'react'
import { styles } from '../styles/style'
import { useCreateLiveFeedMutation, useGetLiveFeedQuery, useUpdateLiveFeedMutation } from '../../redux/features/live/liveServices'
import { toast } from 'react-toastify'

type Props = {}

export default function LiveFeed({ }: Props) {
    const [videoId, setVideoId] = useState("")
    const [status, setStatus] = useState("")
    const [info, setInfo] = useState("")
    const [createLiveFeed, { error, isSuccess, data, isLoading }] = useCreateLiveFeedMutation({})
    const [updateLiveFeed, { error: errorx, isSuccess: success, data: datax, isLoading: isLoadingUpdate }] = useUpdateLiveFeedMutation({})
    const { data: x, refetch } = useGetLiveFeedQuery({}, { refetchOnMountOrArgChange: true })
    const [id, setId] = useState("")

    const handleCreateLiveFeed = async (e: any) => {
        e.preventDefault();
        await createLiveFeed({ info, status, videoId })
    }

    const liveVideoUrl = `https://www.youtube.com/embed/live_stream?channel=${videoId}`;

    const handleUpdatedLiveFeed = async (e: any) => {
        e.preventDefault();
        await updateLiveFeed({ id, info, status, videoId })
    }

    useEffect(() => {
        if (x) {
            setId(x?.live?._id)
            setInfo(x?.live?.info);
            setVideoId(x?.live?.videoId);
            setStatus(x?.live?.status)
        }
    }, [x])

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Successfully created a livefeed";
            toast.success(message);
            refetch()
            //   navigate('/profile');
        }
        if (success) {
            const message = datax?.message || "Successfully updated a livefeed";
            toast.success(message);
            refetch()
            //   navigate('/profile');
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
        if (errorx) {
            if ("data" in errorx) {
                const errorData = errorx as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error, success, errorx])


    return (
        <div className='bg-gray-100 p-2'>
            <div style={{ paddingTop: "41%", position: "relative" }}>
                {liveVideoUrl && (
                    <iframe
                        style={{
                            border: 0,
                            width: "100%",
                            height: "100%",
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                        src={liveVideoUrl}
                        title={info}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={true}
                    ></iframe>
                )}
                {!liveVideoUrl && <p className='text-black dark:text-white font-medium text-lg'>Please provide a valid YouTube channel ID in the URL.</p>}
            </div>
            {x?.live ? <form onSubmit={handleUpdatedLiveFeed}>
                <div className='my-5 w-full'>
                    <label htmlFor=''>
                        Channel ID
                    </label>
                    <input
                        type="text"
                        name=''
                        required
                        value={videoId}
                        onChange={(e: any) => setVideoId(e.target.value)}
                        id="name"
                        placeholder="Example is qwedff"
                        className={`${styles.input} !text-gray-700 !text-base`}
                    />
                </div>
                <div className='my-5 w-full'>
                    <label htmlFor=''>
                        Information
                    </label>
                    <textarea
                        name=''
                        required
                        maxLength={150}
                        value={info}
                        onChange={(e: any) => setInfo(e.target.value)}
                        id="name"
                        placeholder="Enter description"
                        className={`${styles.input} !text-gray-700 !text-base !py-2`}
                    ></textarea>
                </div>

                <div>
                    <label htmlFor='' className="text-gray-800 text-base">
                        Live Status
                    </label>
                    <select

                        required
                        value={status}
                        onChange={(e: any) => setStatus(e.target.value)}
                        id="category"
                        className={`${styles.input} !text-blue-500 custom-select`}
                    >
                        <option value=''>--Please select live status--</option>
                        <option value='online'>Online</option>
                        <option value='offline'>Offline</option>
                    </select>
                </div>
                <div className='w-full flex items-center justify-end'>
                    {isLoadingUpdate ?
                        <div className='w-full md:w-[180px] bg-[#37a39a] py-2 mt-6 text-center text-base text-white rounded cursor-pointer' >
                            loading...
                        </div> :
                        <input
                            type='submit'
                            value="Update"
                            className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-base text-white rounded mt-8 cursor-pointer' />
                    }
                </div>
            </form>
                :
                <form onSubmit={handleCreateLiveFeed}>
                    <div className='my-5 w-full'>
                        <label htmlFor=''>
                            VideoID
                        </label>
                        <input
                            type="text"
                            name=''
                            required
                            value={videoId}
                            onChange={(e: any) => setVideoId(e.target.value)}
                            id="name"
                            placeholder="Example is qwedff"
                            className={`${styles.input} !text-gray-700 !text-base`}
                        />
                    </div>
                    <div className='my-5 w-full'>
                        <label htmlFor=''>
                            Information
                        </label>
                        <textarea
                            name=''
                            required
                            maxLength={150}
                            value={info}
                            onChange={(e: any) => setInfo(e.target.value)}
                            id="name"
                            placeholder="Enter description"
                            className={`${styles.input} !text-gray-700 !text-base !py-2`}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor='' className="text-gray-800 text-base">
                            Live Status
                        </label>
                        <select

                            required
                            value={status}
                            onChange={(e: any) => setStatus(e.target.value)}
                            id="category"
                            className={`${styles.input} !text-blue-500 custom-select`}
                        >
                            <option value=''>--Please select live status--</option>
                            <option value='online'>Online</option>
                            <option value='offline'>Offline</option>
                        </select>
                    </div>
                    <div className='w-full flex items-center justify-end'>
                        {isLoading ?
                            <div className='w-full md:w-[180px] bg-[#37a39a] py-2 mt-6 text-center text-base text-white rounded cursor-pointer' >
                                loading...
                            </div> :
                            <input
                                type='submit'
                                value="Go live"
                                className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-base text-white rounded mt-8 cursor-pointer' />
                        }


                    </div>
                </form>
            }

        </div>
    )
}
