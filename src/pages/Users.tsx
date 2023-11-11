import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { AlertState } from '@/lib/types';
import { getUsers } from '@/lib/api';
import { PAGE_TITLE_TEXTS } from '@/constants/pageTitle';
import { SORT_SELECT_OPTION } from '@/constants/select';
import { USERS_COLUMN } from '@/constants/users';
import { stateAlert } from '@/states/stateAlert';
import { useChangeValue } from '@/hooks/useChangeValue';
import GridTable from '@/components/Table/GridTable';
import Loading from '@/components/Loading';
import CustomSelect from '@/components/CustomSelect';
import Alert from '@/components/Alert';
import styled from 'styled-components';

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  const { value, handleValueChange } = useChangeValue('desc');

  const getUsersList = async (page: number, selectedSort: string) => {
    try {
      setIsLoading(true);
      const res = await getUsers({ page: page, sort: `createdAt,${selectedSort}` });
      setUserList(res.item);
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `사용자 목록 조회 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersList(0, value);
  }, [value]);

  return (
    <Container>
      <Alert />
      {isLoading && <Loading />}
      <TitleContainer>
        <PageTitle>{PAGE_TITLE_TEXTS.usersTitle}</PageTitle>
        <SubTitle>
          <CustomSelect options={SORT_SELECT_OPTION} value={value} onChange={handleValueChange} />
        </SubTitle>
      </TitleContainer>
      <GridTable rowData={userList} columnsData={USERS_COLUMN} />
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
  padding: 20px 80px 60px 80px;
  box-sizing: border-box;
  select {
    width: 100px;
    height: 30px;
  }
`;

const PageTitle = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;
