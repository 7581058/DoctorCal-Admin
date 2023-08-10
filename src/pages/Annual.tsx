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
  { name: '상태', width: 1 },
];

const Annual = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('desc');

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setCurrentPage(1);
    setSort(selectedSort);
  };

  useEffect(() => {
    const annualData = async (page: number, sort: string) => {
      const response = await annual({ page: page, sort: `createdAt,${sort}` });
      setRequestsData(response.item);
      setTotalPages(response.totalPages);
    };
    annualData(currentPage - 1, sort);
  }, [currentPage, sort]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      <select value={sort} onChange={handleChangeSort}>
        <option value="desc">최신순</option>
        <option value="asc">오래된순</option>
      </select>

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
