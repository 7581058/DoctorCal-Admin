import AnnualItem from '@/components/Annual/AnnualItem';
import BoardContainer from '@/components/BoardContainer';
import Pagenation from '@/components/Pagenation';
import { annual } from '@/lib/api';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const header = [
  { name: 'No', width: 0.5 },
  { name: '이름', width: 1 },
  { name: '유형', width: 1 },
  { name: '신청 날짜', width: 1.5 },
  { name: '희망 날짜', width: 1.5 },
  { name: '상태', width: 1.5 },
];

const Annual = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const annualData = async (page: number) => {
    const response = await annual({ page });
    setRequestsData(response.data);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    annualData(currentPage - 1); // Fetch data with the correct page number
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === 0) {
      setCurrentPage(1); // Start page numbers from 1
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      <BoardContainer title="연차 신청 관리" headers={header}>
        {requestsData.length > 0 ? (
          <AnnualItem requests={requestsData} currentPage={currentPage} />
        ) : (
          <Empty>요청 목록이 존재하지 않습니다.</Empty>
        )}
      </BoardContainer>
      {requestsData.length > 0 && (
        <Pagenation totalPage={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      )}
    </Container>
  );
};

export default Annual;

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
  font-size: 2rem;
  color: ${props => props.theme.lightGray};
  font-weight: 500;
`;
