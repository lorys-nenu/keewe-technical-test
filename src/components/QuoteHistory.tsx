import { LucideHistory, LucideRefreshCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import useLocalStorage from "../hooks/useLocalStorage";
import { useStore, QuoteDataLog, CurrencyFlags, CurrencySymbol } from "../store/store";
import { formatDate } from "../lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export default function QuoteHistory() {
  const [quoteHistory, ,reloadHistory] = useLocalStorage<QuoteDataLog[]>('quoteHistory', []);
  const setBoughtCurrency = useStore(state => state.setBoughtCurrency);
  const setSelledCurrency = useStore(state => state.setSelledCurrency);
  const setAmount = useStore(state => state.setAmount);

  const handleRetryQuote = (quote: QuoteDataLog) => {
    setBoughtCurrency(quote.boughtCurrency);
    setSelledCurrency(quote.selledCurrency);
    setAmount(quote.amount);
  }

  return (
    <Popover>
      <PopoverTrigger asChild onClick={reloadHistory}>
        <LucideHistory size={24} />
      </PopoverTrigger>
      <PopoverContent className="w-screen sm:w-min">
        <ScrollArea className="h-[200px] p-2">
          {quoteHistory
            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((quote, index) => (
              <div className="flex flex-col sm:whitespace-nowrap">
                <p className="text-gray-400">{formatDate(new Date(quote.date))}</p>
                <div key={index} className="flex flex-row justify-start items-center">
                  <p>{CurrencyFlags[quote.boughtCurrency]} ➡️ {CurrencyFlags[quote.selledCurrency]}</p>
                  <p>{quote.amount}{CurrencySymbol[quote.boughtCurrency]} = {quote.quote}{CurrencySymbol[quote.selledCurrency]}</p>
                  <LucideRefreshCcw 
                    className="rounded-full cursor-pointer hover:bg-gray-200 p-1 ml-auto"
                    size={24} 
                    onClick={() => handleRetryQuote(quote)}
                    />
                </div>
              </div>
            ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}