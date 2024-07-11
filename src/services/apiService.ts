import { Currency } from "../store/store";

const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const fetchExchangeRates = async (baseCurrency: Currency) => {
  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`);
  const data = await response.json();
  const rates = data.conversion_rates;
  return rates;
}
