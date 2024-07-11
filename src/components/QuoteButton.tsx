import { Button } from '../components/ui/button';
import { useStore } from '../store/store';

export default function QuoteButton() {
  const boughtCurrency = useStore((state) => state.boughtCurrency);
  const selledCurrency = useStore((state) => state.selledCurrency);
  const amount = useStore((state) => state.amount);
  const askForQuote = useStore((state) => state.askForQuote);

  return (
    <Button 
      onClick={askForQuote} 
      className="bg-teal-700 hover:bg-teal-900"
      disabled={!boughtCurrency || !selledCurrency || !amount || boughtCurrency === selledCurrency}
      >
      Demander une cotation
    </Button>
  );
}
