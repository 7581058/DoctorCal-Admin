import { useState } from 'react';

export const useChangeValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  return {
    value,
    setValue,
    handleValueChange,
  };
};
