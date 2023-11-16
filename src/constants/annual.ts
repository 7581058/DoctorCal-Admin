import { getCategory, calculateTableRowIndex, splitTimeStamp } from '@/utils/decode';
import { ICellRendererParams, ValueGetterParams } from 'ag-grid-community';
import RowState from '@/components/duty/RowState';

export const ANNUAL_COLUMN = [
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
    headerName: '유형',
    field: 'category',
    flex: 1.5,
    cellRenderer: (params: ICellRendererParams) => getCategory(params.value),
  },
  {
    headerName: '신청 날짜',
    field: 'createdAt',
    flex: 1,
    cellRenderer: (params: ICellRendererParams) => splitTimeStamp(params.value),
  },
  {
    headerName: '희망 날짜',
    flex: 2,
    valueGetter: (params: ValueGetterParams) => {
      const field1 = params.data.startDate;
      const field2 = params.data.endDate;
      return `${field1} - ${field2}`;
    },
  },
  {
    headerName: '상태',
    field: 'evaluation',
    flex: 1.5,
    cellRenderer: (params: ICellRendererParams) => RowState('annual', params),
  },
];
