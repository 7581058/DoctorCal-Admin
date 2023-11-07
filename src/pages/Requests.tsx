import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { getRegister } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { MESSAGE_TEXTS } from '@/constants/message';
import { PAGE_TITLE_TEXTS } from '@/constants/pageTitle';
import { stateAlert } from '@/states/stateAlert';
import BoardContainer from '@/components/BoardContainer';
import RequestsItem from '@/components/requests/RequestsItem';
import Pagenation from '@/components/Pagenation';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import styled from 'styled-components';

const header = [
  { name: 'No', width: 0.5 },
  { name: '이름', width: 1 },
  { name: '부서', width: 1 },
  { name: '직급', width: 1 },
  { name: '연락처', width: 1.5 },
  { name: '승인 처리', width: 1 },
];

const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('desc');
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  useEffect(() => {
    const savedSort = localStorage.getItem('requestsSort');
    if (savedSort) {
      setSort(savedSort);
    }
    getSortedList(0, savedSort || sort);
  }, [sort]);

  const getSortedList = async (page: number, selectedSort: string) => {
    try {
      setIsLoading(true);
      const res = await getRegister({ page: page, sort: `createdAt,${selectedSort}` });
      setRequests(res.item);
      setTotalPages(res.totalPages);
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `회원가입 요청 리스트 조회 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    localStorage.setItem('requestsSort', selectedSort);
    setCurrentPage(1);
    setSort(selectedSort);
    getSortedList(0, selectedSort);
  };

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === 0) {
      getSortedList(pageNumber, sort);
      setCurrentPage(pageNumber);
    } else {
      setCurrentPage(pageNumber);
      getSortedList(pageNumber - 1, sort);
    }
  };

  return (
    <Container>
      <Alert />
      {isLoading && <Loading />}
      <select value={sort} onChange={handleChangeSort}>
        <option value="desc">최신순</option>
        <option value="asc">오래된순</option>
      </select>
      <BoardContainer title={PAGE_TITLE_TEXTS.requestTitle} headers={header}>
        {requests.length > 0 ? (
          <RequestsItem requests={requests} currentPage={currentPage} />
        ) : (
          !isLoading && <Empty>{MESSAGE_TEXTS.listEmpty}</Empty>
        )}
      </BoardContainer>
      {requests.length > 0 ? (
        <Pagenation totalPage={totalPages} currentPage={currentPage} onPageChange={handleChangePage} />
      ) : (
        <EmptyBottom />
      )}
    </Container>
  );
};

export default Requests;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px 80px 60px 80px;
  box-sizing: border-box;
  select {
    position: absolute;
    right: 80px;
    width: 100px;
    height: 30px;
    margin-top: -5px;
  }
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: ${props => props.theme.lightGray};
  font-weight: 500;
`;

const EmptyBottom = styled.div`
  width: 100%;
  height: 20px;
`;
