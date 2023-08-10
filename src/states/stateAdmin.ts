import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const AdminState = atom({
  key: 'AdminState',
  default: {
    id: 0,
    empNo: 0,
    name: '',
    email: '',
    phone: '',
    hospitalId: 0,
    deptId: 0,
    level: '',
    auth: '',
    status: '',
    annual: 0,
    duty: 0,
    profileImageUrl: '',
    hiredate: '',
    createdAt: '',
    updatedAt: '',
  },
  effects_UNSTABLE: [persistAtom],
});
