import React from 'react'
import ChnagePassword from '../components/auth/ChnagePassword'

type Props = {}

export default function ChangePassword({ }: Props) {
    return (
        <>
            <div className=' bg-gray-900 h-screen m-auto overflow-y-auto'>
                <div className='max-container items-center padding-container py-11 justify-between lg:justify-between flex flex-col lg:flex-row'>
                <ChnagePassword/>
                </div>
            </div>
        </>
    )
}