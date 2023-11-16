import { getLevel, dname, calculateTableRowIndex } from '@/utils/decode';
import { ICellRendererParams } from 'ag-grid-community';
import StateButton from '@/components/Table/StateButton';

export const ATTENDANCE_TEXTS = Object.freeze({
  title: '근무 관리',
});

export const ATTENDANCE_COLUMN = [
  {
    headerName: 'No.',
    field: 'index',
    cellRenderer: (params: ICellRendererParams) => calculateTableRowIndex(params, 0, 10),
    flex: 0.5,
  },
  {
    headerName: '이름',
    field: 'name',
    flex: 1,
    filter: true,
  },
  {
    headerName: '파트',
    field: 'deptId',
    filter: true,
    cellRenderer: (params: ICellRendererParams) => dname[params.value],
    flex: 1.5,
  },
  {
    headerName: '직급',
    field: 'level',
    filter: true,
    cellRenderer: (params: ICellRendererParams) => getLevel(params.value),
    flex: 1,
  },
  {
    headerName: '금일 근로시간',
    field: 'todayWorkTime',
    flex: 2,
  },
  {
    headerName: '주간 근로시간',
    field: 'weekWorkTime',
    flex: 2,
  },
  {
    headerName: '월간 근로시간',
    field: 'monthWorkTime',
    flex: 2,
  },
  {
    headerName: '상태',
    field: 'status',
    flex: 1,
    cellRenderer: StateButton,
  },
];
