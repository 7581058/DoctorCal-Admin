import UserChangeStateSelect from '@/components/users/UserChangeStateSelect';
import { getLevel, calculateTableRowIndex, getAuth } from '@/utils/decode';
import { ICellRendererParams } from 'ag-grid-community';

export const USERS_COLUMN = [
  {
    headerName: 'No.',
    field: 'index',
    flex: 0.5,
    cellRenderer: (params: ICellRendererParams) => calculateTableRowIndex(params, 0, 10),
  },
  {
    headerName: '이름',
    field: 'username',
    flex: 1,
  },
  {
    headerName: '파트',
    field: 'deptName',
    flex: 1.5,
  },
  {
    headerName: '직급',
    field: 'level',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => getLevel(params.value),
  },
  {
    headerName: '연락처',
    field: 'phone',
    flex: 1.5,
  },
  {
    headerName: '권한',
    field: 'auth',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => getAuth(params.value),
  },
  {
    headerName: '상태',
    field: 'status',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => UserChangeStateSelect(params),
  },
];
