import { getLevel, getCategory, calculateTableRowIndex } from '@/utils/decode';
import { ICellRendererParams } from 'ag-grid-community';
import RowState from '@/components/duty/RowState';

export const DUTYS_COLUMN = [
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
    headerName: '직급',
    field: 'level',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => getLevel(params.value),
  },
  {
    headerName: '유형',
    field: 'category',
    flex: 1.5,
    cellRenderer: (params: ICellRendererParams) => getCategory(params.value),
  },
  {
    headerName: '신청 날짜',
    field: 'startDate',
    flex: 1.5,
  },
  {
    headerName: '희망 날짜',
    field: 'updateDate',
    flex: 1.5,
  },
  {
    headerName: '상태',
    field: 'evaluation',
    flex: 1.5,
    cellRenderer: (params: ICellRendererParams) => RowState('duty', params),
  },
];
