import { atom } from 'recoil';
import { AlertState } from '@/lib/types';

export const stateAlert = atom<AlertState>({
  key: 'stateAlert',
  default: {
    isOpen: false,
    content: '',
    type: 'error',
  },
});
