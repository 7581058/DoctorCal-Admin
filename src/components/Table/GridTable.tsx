import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import { MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ColumnData, GridTableProps } from '@/lib/types';

const createColumns = (columnsData: ColumnData[]) => {
  return columnsData.map(columnData => {
    const { headerName, field, flex, cellRenderer, filter, valueGetter } = columnData;
    const colDef: ColDef = {
      headerName,
      field,
      flex,
      cellRenderer,
      filter,
      valueGetter,
      cellStyle: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    return colDef;
  });
};

const GridTable = (props: GridTableProps) => {
  const gridRef = useRef<AgGridReact>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const { rowData, columnsData } = props;
  const columnDefs = createColumns(columnsData);
  const [minRowHeight, setMinRowHeight] = useState(40);
  const [currentRowHeight, setCurrentRowHeight] = useState(minRowHeight);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const getRowHeight = useCallback(() => {
    return currentRowHeight;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setMinRowHeight(params.api.getSizesForCurrentTheme().rowHeight);
    setCurrentRowHeight(minRowHeight);
    params.api.sizeColumnsToFit();

    if (gridRef.current) {
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
      setTotalPage(gridRef.current.api.paginationGetTotalPages());
    }
  }, []);

  const gridOptions = {
    headerHeight: 50,
    rowHeight: 40,
  };

  const onBtFirst = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.paginationGoToFirstPage();
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
    }
  }, []);

  const onBtLast = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.paginationGoToLastPage();
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
    }
  }, []);

  const onBtNext = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.paginationGoToNextPage();
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
    }
  }, []);

  const onBtPrevious = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.paginationGoToPreviousPage();
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
    }
  }, []);

  const onPaginationChanged = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      setTotalPage(gridRef.current.api.paginationGetTotalPages());
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
    }
  }, []);

  return (
    <Container>
      <div className="ag-theme-custom">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowHeight={getRowHeight}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          pagination={true}
          suppressRowTransform={true}
          paginationAutoPageSize={true}
          suppressPaginationPanel={true}
          onPaginationChanged={onPaginationChanged}
        />
      </div>
      <ButtonWrap>
        <button onClick={onBtFirst}>
          <MdFirstPage />
        </button>
        <button onClick={onBtPrevious}>
          <MdChevronLeft />
        </button>
        <span>{gridRef.current && currentPage + '/' + totalPage}</span>
        <button onClick={onBtNext}>
          <MdChevronRight />
        </button>
        <button onClick={onBtLast}>
          <MdLastPage />
        </button>
      </ButtonWrap>
    </Container>
  );
};

export default GridTable;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .ag-theme-custom {
    width: 100%;
    height: 100%;
    --ag-row-border-width: 0;
    .ag-header-cell-label {
      justify-content: center;
    }
    margin: 0;
  }
  .ag-cell-focus {
    outline: none;
    border: none !important;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0 0 0;
  align-items: center;
  justify-content: center;
  button {
    width: 32px;
    height: 32px;
    background-color: transparent;
    border: none;
    font-size: 1.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.primary};
    &:disabled {
      color: ${props => props.theme.lightGray};
    }
  }
  span {
    padding: 0 10px 0 10px;
    color: ${props => props.theme.primary};
  }
`;
