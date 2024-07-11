import { LucideArrowLeftRight } from 'lucide-react';
import { useStore, CurrencySymbol } from '../store/store';

export default function QuoteDisplay() {
  const quote = useStore((state) => state.quote);

  if (!quote) return null;

  return (
    <div className="flex flex-col p-2 border border-slate-400 rounded-md shadow-md">
      <h4 className="text-center">Votre operation</h4>
      <div className="min:w-full my-2 border border-slate-400"></div>
      <div className="flex flex-col sm:flex-row w-full justify-around items-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <p>Vous achetez: </p>
          <p>{CurrencySymbol[quote.boughtCurrency]}{quote.amount} {quote.boughtCurrency}</p>
        </div>
        <div className="flex flex-col justify-center items-center rounded-lg bg-slate-300 p-4">
          <p>Taux de change</p>
          <LucideArrowLeftRight className="w-12 h-12 bg-slate-800 text-white rounded-full p-2" />
          <p>{quote.rate}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Vous vendez: </p>
          <p>{CurrencySymbol[quote.selledCurrency]}{quote.quote} {quote.selledCurrency}</p>
        </div>
      </div>
    </div>
  );
}
