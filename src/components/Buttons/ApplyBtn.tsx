import { schedule } from '@/lib/api';
import styled from 'styled-components';

const ApplyBtn = ({ scheduleId }: number) => {
  console.log(scheduleId);

  // 당직 승인
  const approveDuty = async (scheduleId: number) => {
    console.log(scheduleId);
    const body = {
      evaluation: 'APPROVED',
    };
    await schedule(scheduleId, body)
      .then(res => {
        console.log('당직 승인 성공', res);
        // setDutyState(!dutyState);
        location.reload();
      })
      .catch(error => console.error('당직 승인 실패', error));
  };

  return <Container onClick={() => approveDuty(scheduleId)}>승인</Container>;
};

export default ApplyBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 26px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
