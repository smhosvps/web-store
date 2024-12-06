import { styles } from '../styles/style';

type Props = { amount: number }

export default function CurrencyConverter({ amount }: Props) {
    const formatCurrency = (num: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(num);
    };

    return (
        <div className={`${styles.label} !text-gray-700`}>{formatCurrency(amount)}</div>
    )
}