import SelectCurrency from './components/SelectCurrency';
import AmountInput from './components/AmountInput';
import QuoteButton from './components/QuoteButton';
import QuoteDisplay from './components/QuoteDisplay';

export default function App() {
  return (
    <div className="flex flex-col gap-4 w-screen h-screen px-8 py-4 md:px-24 md:py-12">
      <img 
        src="https://mobicheckin-assets.s3.amazonaws.com/uploads/events/64ed894e64e0f43118edc012/guests/avatars/medium_fit_W090PTJ_Logo_KEEWE_primary.png" 
        alt="Keewe Logo" 
        className="w-fit h-16 mx-auto"
      />
      <div className="flex flex-row w-full gap-4">
      <SelectCurrency type="bought" />
      <AmountInput />
      </div>
      <SelectCurrency type="selled" />
      <QuoteButton />
      <QuoteDisplay />
      <p className="text-center">Made with ❤️ by Lorys Aveneau</p>
    </div>
  );
}
