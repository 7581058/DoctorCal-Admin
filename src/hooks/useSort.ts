import { useState } from 'react';

export const useSort = (initialSort = 'desc') => {
  const [sort, setSort] = useState(initialSort);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  return {
    sort,
    setSort,
    handleSortChange,
  };
};
