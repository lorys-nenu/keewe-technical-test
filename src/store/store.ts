import create from 'zustand';

const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
console.log('API key:', apiKey);

enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  CAD = "CAD",
}

enum CurrencyFlags {
  USD = "🇺🇸",
  EUR = "🇪🇺",
  GBP = "🇬🇧",
  CAD = "🇨🇦",
}

enum CurrencySymbol {
  USD = "$",
  EUR = "€",
  GBP = "£",
  CAD = "C$",
}

enum CurrencyNiceNames {
  USD = "Dollar américain",
  EUR = "Euro",
  GBP = "Livre sterling",
  CAD = "Dollar canadien",
}

type QuoteData = {
  boughtCurrency: Currency
  selledCurrency: Currency
  amount: number
  quote: number
  rate: number
}

type StoreState = {
  boughtCurrency?: Currency;
  selledCurrency?: Currency;
  amount?: number;
  quote?: QuoteData;
  exchangeRates: Record<string, number>;
  setBoughtCurrency: (currency: Currency) => void;
  setSelledCurrency: (currency: Currency) => void;
  setAmount: (amount: number) => void;
  fetchExchangeRates: (baseCurrency: Currency) => Promise<void>;
  askForQuote: () => void;
};

export const useStore = create<StoreState>((set, get) => ({
  boughtCurrency: undefined,
  selledCurrency: undefined,
  amount: undefined,
  quote: undefined,
  exchangeRates: {},
  setBoughtCurrency: (currency) => {
    set({ boughtCurrency: currency });
    get().fetchExchangeRates(currency);  // Fetch exchange rates whenever boughtCurrency changes
  },
  setSelledCurrency: (currency) => set({ selledCurrency: currency }),
  setAmount: (amount) => set({ amount: amount }),
  fetchExchangeRates: async (baseCurrency: Currency) => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`);
      const data = await response.json();
      const rates = data.conversion_rates;
      set((state) => ({
        exchangeRates: {
          ...state.exchangeRates,
          ...rates,
        },
      }));
    } catch (error) {
      console.error('Failed to fetch exchange rates', error);
    }
  },
  askForQuote: async () => {
    const state = get();

    if (!state.boughtCurrency || !state.selledCurrency || !state.amount) {
      return;
    }

    // Check if exchange rates for the boughtCurrency are available, if not, fetch them
    if (!state.exchangeRates[state.boughtCurrency]) {
      await state.fetchExchangeRates(state.boughtCurrency);
    }

    const rate = state.exchangeRates[state.selledCurrency];
    const quote = state.amount * rate;

    set({
      quote: {
        boughtCurrency: state.boughtCurrency,
        selledCurrency: state.selledCurrency,
        amount: state.amount,
        quote,
        rate,
      },
    });
  },
}));

export { Currency, CurrencyFlags, CurrencySymbol, CurrencyNiceNames };
