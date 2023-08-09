import { schedule } from '@/lib/api';
import styled from 'styled-components';

const ApplyBtn = ({ scheduleId }: { scheduleId: number }) => {
  // 연차/당직 승인
  const approveDuty = async (scheduleId: number) => {
    if (confirm('승인 처리 하시겠습니까?')) {
      const body = {
        evaluation: 'APPROVED',
      };
      await schedule(scheduleId, body)
        .then(res => {
          if (res.success) {
            alert('승인 처리가 완료되었습니다.');
            location.reload();
          }
        })
        .catch(error => console.error('당직 승인 실패', error));
    }
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
