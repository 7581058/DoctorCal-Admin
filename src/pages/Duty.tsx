import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { duty } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { SORT_SELECT_OPTION } from '@/constants/select';
import { DUTYS_COLUMN } from '@/constants/duty';
import { PAGE_TITLE_TEXTS } from '@/constants/pageTitle';
import { stateAlert } from '@/states/stateAlert';
import { useChangeValue } from '@/hooks/useChangeValue';
import GridTable from '@/components/Table/GridTable';
import CustomSelect from '@/components/CustomSelect';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import styled from 'styled-components';

const Duty = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  const { value, handleValueChange } = useChangeValue('desc');

  const getDutyList = async (page: number, selectedSort: string) => {
    try {
      setIsLoading(true);
      const res = await duty({ page: page, sort: `createdAt,${selectedSort}` });
      setRequests(res.item);
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `당직 결재 리스트 조회 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDutyList(0, value);
  }, [value]);

  return (
    <Container>
      <Alert />
      {isLoading && <Loading />}
      <TitleContainer>
        <PageTitle>{PAGE_TITLE_TEXTS.dutyTitle}</PageTitle>
        <SubTitle>
          <CustomSelect options={SORT_SELECT_OPTION} value={value} onChange={handleValueChange} />
        </SubTitle>
      </TitleContainer>
      <GridTable rowData={requests} columnsData={DUTYS_COLUMN} />
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
  select {
    position: absolute;
    right: 80px;
    width: 100px;
    height: 30px;
    margin-top: -5px;
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
