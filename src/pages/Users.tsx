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

  const getList = async (page: number) => {
    const data = await users({ page: page });
    setUserList(data.item);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    getList(0);
  }, []);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === 0) {
      getList(pageNumber);
      setCurrentPage(pageNumber);
    } else {
      setCurrentPage(pageNumber);
      getList(pageNumber - 1);
    }
  };

  return (
    <Container>
      <BoardContainer title="사용자 관리" headers={header}>
        {userList.length > 0 ? (
          <UsersItem userList={userList} currentPage={currentPage} />
        ) : (
          <Empty>요청 목록이 존재하지 않습니다.</Empty>
        )}
      </BoardContainer>
      {userList.length > 0 ? (
        <Pagenation totalPage={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
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
