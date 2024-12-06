import EmailListAndMessage from './EmailListAndMessage'


type Props = {}

export default function BroadCastLayout({ }: Props) {

    return (
        <>
            <div className='p-3'>
                <div>
                    <EmailListAndMessage />
                </div>
            </div>

        </>
    )
}