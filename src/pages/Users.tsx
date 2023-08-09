import BoardContainer from '@/components/BoardContainer';
import UsersItem from '@/components/users/UsersItem';
import Pagenation from '@/components/Pagenation';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { users } from '@/lib/api';

const header = [
  { name: 'No', width: 0.5 },
  { name: '이름', width: 1 },
  { name: '부서', width: 1 },
  { name: '직급', width: 1 },
  { name: '연락처', width: 1.5 },
  { name: '권한', width: 1 },
  { name: '상태', width: 1 },
];

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    const savedSort = localStorage.getItem('usersSort');
    if (savedSort) {
      setSort(savedSort);
    }
    getSortedList(0, savedSort || sort);
  }, []);

  const getSortedList = async (page: number, selectedSort: string) => {
    const data = await users({ page: page, sort: `${selectedSort}` });
    setUserList(data.item);
    setTotalPages(data.totalPages);
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    localStorage.setItem('usersSort', selectedSort);
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
      <select className="sort" value={sort} onChange={handleChangeSort}>
        <option value="createdAt,desc">최신순</option>
        <option value="createdAt,asc">오래된순</option>
      </select>
      <BoardContainer title="사용자 관리" headers={header}>
        {userList.length > 0 ? (
          <UsersItem userList={userList} currentPage={currentPage} />
        ) : (
          <Empty>사용자 목록이 존재하지 않습니다.</Empty>
        )}
      </BoardContainer>
      {userList.length > 0 ? (
        <Pagenation totalPage={totalPages} currentPage={currentPage} onPageChange={handleChangePage} />
      ) : (
        <EmptyBottom />
      )}
    </Container>
  );
};

export default Users;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .sort {
    position: absolute;
    right: 30px;
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
  font-size: 1.125rem;
  color: ${props => props.theme.primary};
  font-weight: 500;
`;

const EmptyBottom = styled.div`
  width: 100%;
  height: 20px;
`;
