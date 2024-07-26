import { AnnualBody } from '@/lib/types';
import { getCategory, getEvaluation } from '@/utils/decode';
import RejectBtn from '@/components/Buttons/RejectBtn';
import ApplyBtn from '@/components/Buttons/ApplyBtn';
import styled from 'styled-components';

const AnnualItem = ({ requests, currentPage }: { requests: AnnualBody[]; currentPage: number }) => {
  const startIndex = (currentPage - 1) * 10;

  return (
    <Container>
      {requests.map((item, index) => (
        <AnnualItems key={item.scheduleId}>
          <div className="index">{startIndex + index + 1}</div>
          <div className="name">{item.username}</div>
          <div className="annual">{getCategory(item.category)}</div>
          <div className="startDate">{item.startDate.toString()}</div>
          <div className="endDate">{item.endDate.toString()}</div>
          {item.evaluation === 'STANDBY' ? (
            <div className="evaluationContainer">
              <ApplyBtn scheduleId={item.scheduleId} />
              <RejectBtn scheduleId={item.scheduleId} />
            </div>
          ) : (
            <div className="evaluationContainer">{getEvaluation(item.evaluation)}</div>
          )}
        </AnnualItems>
      ))}
    </Container>
  );
};

export default AnnualItem;

const Container = styled.div`
  width: 100%;
  height: calc(100% / 10);
  box-sizing: border-box;
`;

const AnnualItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  div {
    text-align: center;
    flex-basis: 0;
    color: ${props => props.theme.black};
  }
  .index {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .annual {
    flex-grow: 1;
  }
  .startDate {
    flex-grow: 1.5;
  }
  .endDate {
    flex-grow: 1.5;
  }
  .evaluationContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-grow: 1;
  }
`;
