import { useEffect, useState } from 'react';
import { getAnnual } from '@/lib/api';
import { styled } from 'styled-components';
import { getLevel, getPhone } from '@/utils/decode';
import { AnnualData } from '@/lib/types';
import { TABLE_HEADER_TEXTS } from '@/constants/table';
import { MODAL_TEXTS } from '@/constants/modal';

const AnnualModal = ({ date }: { date: string }) => {
  const [annual, setAnnual] = useState<AnnualData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAnnual(date);
      setAnnual(data.item);
    })();
  }, [date]);

  return (
    <Container>
      <Title>{MODAL_TEXTS.annualModalTitle}</Title>
      <DateWrap>{date}</DateWrap>
      <TableContainer>
        <DataWrap className="header">
          <div>{TABLE_HEADER_TEXTS.tableHeaderIndex}</div>
          <div>{TABLE_HEADER_TEXTS.tableHeaderName}</div>
          <div>{TABLE_HEADER_TEXTS.tableHeaderDept}</div>
          <div>{TABLE_HEADER_TEXTS.tableHeaderLevel}</div>
          <div className="phone">{TABLE_HEADER_TEXTS.tableHeaderPhone}</div>
        </DataWrap>
        <Users>
          {annual.map((item, index) => (
            <DataWrap className="users" key={index}>
              <div>{index + 1}</div>
              <div>{item.username}</div>
              <div>{item.deptName}</div>
              <div>{getLevel(item.level)}</div>
              <div>{getPhone(item.phone)}</div>
            </DataWrap>
          ))}
        </Users>
      </TableContainer>
    </Container>
  );
};

export default AnnualModal;

const Container = styled.div`
  height: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;
  box-sizing: border-box;
`;

const DataWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  &.header {
    font-weight: 900;
  }
  div {
    flex: 2;
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 3;
    }
  }
  &.users {
    display: flex;
    align-items: center;
    height: 30px;
  }
  .phone {
    padding-right: 17px;
  }
`;

const Users = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  overflow-y: auto;
`;
