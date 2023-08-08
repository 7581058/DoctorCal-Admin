import BoardContainer from '@/components/BoardContainer';
import DutyRequestsItem from '@/components/requests/DutyRequestsItem';
import Pagenation from '@/components/Pagenation';
import { useEffect, useState } from 'react';
import { duty } from '@/lib/api';
import styled from 'styled-components';

const header = [
  { name: 'No', width: 0.5 },
  { name: '이름', width: 1 },
  { name: '직급', width: 1 },
  { name: '유형', width: 1 },
  { name: '신청 날짜', width: 1.5 },
  { name: '희망 날짜', width: 1.5 },
  { name: '상태', width: 1 },
];

const Duty = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // 당직 리스트 호출
  const getDutyList = async (page: number) => {
    const data = await duty({ page: page });
    setRequests(data.item);
    setTotalPages(data.totalPages);
  };

  // 페이지네이션 핸들러
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === 0) {
      getDutyList(pageNumber);
      setCurrentPage(pageNumber);
    } else {
      setCurrentPage(pageNumber);
      getDutyList(pageNumber - 1);
    }
  };
  console.log('requests', requests);
  console.log('currentPage', currentPage);
  console.log('totalPages', totalPages);

  useEffect(() => {
    getDutyList(0);
  }, []);

  return (
    <Container>
      <BoardContainer title="회원 가입 요청" headers={header}>
        {requests.length > 0 ? (
          <DutyRequestsItem requests={requests} currentPage={currentPage} />
        ) : (
          <Empty>요청 목록이 존재하지 않습니다.</Empty>
        )}
      </BoardContainer>
      {requests.length > 0 ? (
        <Pagenation totalPage={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      ) : (
        <EmptyBottom />
      )}
    </Container>
  );
};

export default Duty;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  color: ${props => props.theme.primary};
  font-weight: 500;
`;

const EmptyBottom = styled.div`
  width: 100%;
  height: 20px;
`;
