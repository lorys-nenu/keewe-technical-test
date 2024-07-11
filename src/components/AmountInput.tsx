import React from 'react';
import { Input } from '../components/ui/input';
import { useStore } from '../store/store';

export default function AmountInput(){
  const amount = useStore((state) => state.amount);
  const setAmount = useStore((state) => state.setAmount);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return <Input onChange={handleInputChange} value={amount} type="number" />;
}
