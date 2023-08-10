import BoardContainer from '@/components/BoardContainer';
import RequestsItem from '@/components/requests/RequestsItem';
import Pagenation from '@/components/Pagenation';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { register } from '@/lib/api';

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

  useEffect(() => {
    const savedSort = localStorage.getItem('requestsSort');
    if (savedSort) {
      setSort(savedSort);
    }
    getSortedList(0, savedSort || sort);
  }, []);

  const getSortedList = async (page: number, selectedSort: string) => {
    const data = await register({ page: page, sort: `createdAt,${selectedSort}` });
    setRequests(data.item);
    setTotalPages(data.totalPages);
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
      <select value={sort} onChange={handleChangeSort}>
        <option value="desc">최신순</option>
        <option value="asc">오래된순</option>
      </select>
      <BoardContainer title="회원 가입 요청" headers={header}>
        {requests.length > 0 ? (
          <RequestsItem requests={requests} currentPage={currentPage} />
        ) : (
          <Empty>요청 목록이 존재하지 않습니다.</Empty>
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
