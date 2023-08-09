import { schedule } from '@/lib/api';
import styled from 'styled-components';

const RejectBtn = ({ scheduleId }: { scheduleId: number }) => {
  // 연차/당직 반려
  const rejectDuty = async (scheduleId: number) => {
    if (confirm('반려 처리 하시겠습니까?')) {
      const body = {
        evaluation: 'REJECTED',
      };
      await schedule(scheduleId, body)
        .then(res => {
          if (res.success) {
            alert('반려 처리가 완료되었습니다.');
            location.reload();
          }
        })
        .catch(error => console.error('당직 반려 실패', error));
    }
  };

  return <Container onClick={() => rejectDuty(scheduleId)}>반려</Container>;
};

export default RejectBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 26px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.red};
  color: ${props => props.theme.white};
`;
