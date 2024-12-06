import OrderLayout from '../components/storeOrder/OrderLayout'

type Props = {}

export default function StoreTransactions({ }: Props) {
  return (
    <>
      <div className=' bg-gray-100 rounded-md'>
        <OrderLayout />
      </div>
    </>
  )
}