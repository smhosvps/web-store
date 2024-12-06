import SignIn from '../components/auth/SignIn'


export default function Auth() {
    return (
        <>
            <div className=' bg-gray-900 h-screen m-auto overflow-y-auto'>
                <div className='container items-center padding-container py-11 justify-between lg:justify-between flex flex-col lg:flex-row'>
                    <SignIn />
                </div>
            </div>
        </>

    )
}