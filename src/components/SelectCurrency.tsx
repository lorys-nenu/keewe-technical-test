import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useStore, Currency, CurrencyFlags, CurrencyNiceNames } from '../store/store';

type SelectCurrencyProps = {
  type: 'bought' | 'selled';
}

export default function SelectCurrency({ type }: SelectCurrencyProps) {
  const currency = useStore((state) => type === 'bought' ? state.boughtCurrency : state.selledCurrency);
  const setCurrency = useStore((state) => type === 'bought' ? state.setBoughtCurrency : state.setSelledCurrency);

  return (
    <Select onValueChange={setCurrency} value={currency}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Device ${type === 'bought' ? 'achetée' : 'vendue'}`} />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Currency).map((currency) => (
          <SelectItem key={currency} value={currency}>
            {CurrencyFlags[currency]} {CurrencyNiceNames[currency]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
