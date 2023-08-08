import styled from 'styled-components';
import ApplyBtn from '@/components/Buttons/ApplyBtn';
import RejectBtn from '@/components/Buttons/RejectBtn';
import { DutyRequest } from '@/lib/types';

const DutyRequestsItem = ({ requests, currentPage }: { requests: DutyRequest[]; currentPage: number }) => {
  const startIndex = (currentPage - 1) * 10;
  console.log(requests);

  return (
    <Container>
      {requests.map((item, index) => (
        <RequestItem key={item.scheduleId}>
          <span className="index">{startIndex + index + 1}</span>
          <span className="name">{item.username}</span>
          <span className="level">{item.level}</span>
          <span className="duty">{item.category}</span>
          <span className="originDate">{item.startDate}</span>
          <span className="newDate">{item.startDate}</span>
          <div className="state">
            <ApplyBtn />
            <RejectBtn />
            {/* <button onClick={() => handleClickApprove(item.username, item.deptName, item.id)}>승인</button> */}
          </div>
        </RequestItem>
      ))}
    </Container>
  );
};

export default DutyRequestsItem;

const Container = styled.div`
  width: 100%;
  height: calc(100% / 10);
  box-sizing: border-box;
`;

const RequestItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
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
  .duty {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
  .originDate {
    flex-grow: 1.5;
  }
  .newDate {
    flex-grow: 1.5;
  }
  .state {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;
