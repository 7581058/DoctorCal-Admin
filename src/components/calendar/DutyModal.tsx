import { useEffect, useState } from 'react';
import { getDuty, deleteDuty } from '@/lib/api';
import { styled } from 'styled-components';
import { getLevel, getPhone } from '@/utils/decode';
import { AlertState, DutyData } from '@/lib/types';
import { MODAL_TEXTS } from '@/constants/modal';
import { TABLE_HEADER_TEXTS } from '@/constants/table';
import { BUTTON_TEXTS } from '@/constants/buttons';
import { useSetRecoilState } from 'recoil';
import { stateAlert } from '@/states/stateAlert';
import Alert from '@/components/Alert';

const DutyDataInitial = {
  deptName: '',
  email: '',
  id: 0,
  level: '',
  phone: '',
  profileImageUrl: '',
  userId: 0,
  username: '',
};

const DutyModal = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const [duty, setDuty] = useState<DutyData>(DutyDataInitial);

  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDuty(date);
        setDuty(data.item);
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `당직 인원 조회 실패\n${error}`,
          type: 'error',
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDelete = async () => {
    try {
      const res = await deleteDuty(duty.id);
      if (res.success) {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `당직 삭제 실패\n${error}`,
        type: 'error',
      });
    }
  };

  return (
    <Container>
      <Alert />
      <Title>{MODAL_TEXTS.dutyModalTitle}</Title>
      <DateWrap>{date}</DateWrap>
      <TableContainer>
        <DataWrap>
          <div>{TABLE_HEADER_TEXTS.tableHeaderName}</div>
          <div>{TABLE_HEADER_TEXTS.tableHeaderDept}</div>
          <div>{TABLE_HEADER_TEXTS.tableHeaderLevel}</div>
          <div>{TABLE_HEADER_TEXTS.tableHeaderPhone}</div>
        </DataWrap>
        <DataWrap>
          <div>{duty.username}</div>
          <div>{duty.deptName}</div>
          <div>{getLevel(duty.level)}</div>
          <div>{getPhone(duty.phone)}</div>
        </DataWrap>
        <DeleteButton onClick={handleClickDelete}>{BUTTON_TEXTS.dutyDelete}</DeleteButton>
      </TableContainer>
    </Container>
  );
};

export default DutyModal;

const Container = styled.div`
  position: relative;
  height: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 8px;
`;

const DateWrap = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 700;
  margin-bottom: 64px;
`;
const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;
`;

const DataWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:first-child {
    font-weight: 900;
  }
  div {
    flex: 1;
    &:first-child {
      flex: 1;
    }
    &:nth-child(2) {
      flex: 1.5;
    }
    &:last-child {
      flex: 2;
    }
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  width: 80px;
  height: 30px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  border-radius: 4px;
  border: none;
  outline: none;
  bottom: 20px;
  left: 50%;
  margin-left: -40px;
`;
