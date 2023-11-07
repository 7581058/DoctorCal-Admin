import BoardContainer from '@/components/BoardContainer';
import DutyRequestsItem from '@/components/duty/DutyRequestsItem';
import Pagenation from '@/components/Pagenation';
import { useEffect, useState } from 'react';
import { duty } from '@/lib/api';
import styled from 'styled-components';
import Loading from '@/components/Loading';
import { MESSAGE_TEXTS } from '@/constants/message';
import { PAGE_TITLE_TEXTS } from '@/constants/pageTitle';
import Alert from '@/components/Alert';
import { AlertState } from '@/lib/types';
import { stateAlert } from '@/states/stateAlert';
import { useSetRecoilState } from 'recoil';

const header = [
  { name: 'No', width: 0.5 },
  { name: '이름', width: 1 },
  { name: '직급', width: 1 },
  { name: '유형', width: 1 },
  { name: '신청 날짜', width: 1.5 },
  { name: '희망 날짜', width: 1.5 },
  { name: '상태', width: 1.5 },
];

const Duty = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('desc');
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  // 당직 리스트 호출
  const getDutyList = async (page: number) => {
    try {
      setIsLoading(true);
      const res = await duty({ page: page });
      setRequests(res.item);
      setTotalPages(res.totalPages);
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `당직 결재 리스트 호출 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 당직 리스트 호출 (정렬)
  const getSortedDutyList = async (page: number, selectedSort: string) => {
    try {
      setIsLoading(true);
      const data = await duty({ page: page, sort: `createdAt,${selectedSort}` });
      setRequests(data.item);
      setTotalPages(data.totalPages);
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `당직 결재 리스트 정렬 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 정렬 핸들러
  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const selectedSort = event.target.value;
    localStorage.setItem('requestsSort', selectedSort);
    setSort(selectedSort);
    getSortedDutyList(0, selectedSort);
    setIsLoading(false);
  };

  // 페이지네이션 핸들러
  const handlePageChange = (pageNumber: number) => {
    setIsLoading(true);
    if (pageNumber === 0) {
      getDutyList(pageNumber);
      setCurrentPage(pageNumber);
    } else {
      setCurrentPage(pageNumber);
      getDutyList(pageNumber - 1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const savedSort = localStorage.getItem('requestsSort');
    if (savedSort) {
      setSort(savedSort);
    }
    getSortedDutyList(0, savedSort || sort);
  }, [sort]);

  return (
    <Container>
      <Alert />
      {isLoading && <Loading />}
      <Select value={sort} onChange={handleChangeSort}>
        <option value="desc">최신순</option>
        <option value="asc">오래된순</option>
      </Select>
      <BoardContainer title={PAGE_TITLE_TEXTS.dutyTitle} headers={header}>
        {requests.length > 0 ? (
          <DutyRequestsItem requests={requests} currentPage={currentPage} />
        ) : (
          !isLoading && <Empty>{MESSAGE_TEXTS.listEmpty}</Empty>
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
  padding: 20px 80px 60px 80px;
  box-sizing: border-box;
`;

const Select = styled.select`
  position: absolute;
  right: 80px;
  width: 100px;
  height: 30px;
  margin-top: -5px;
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
