import OrderCount from './OrderCount'

type Props = {}

export default function OrderLayout({ }: Props) {

    return (
        <div className='container mx-auto'>
            <OrderCount />
        </div>
    )
}