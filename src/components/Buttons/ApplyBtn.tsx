import { BUTTON_TEXTS } from '@/constants/buttons';
import { MESSAGE_TEXTS } from '@/constants/message';
import { schedule } from '@/lib/api';
import styled from 'styled-components';

const ApplyBtn = ({ scheduleId }: { scheduleId: number }) => {
  // 연차/당직 승인
  const approveDuty = async (scheduleId: number) => {
    if (confirm(MESSAGE_TEXTS.approveConfirm)) {
      const body = {
        evaluation: 'APPROVED',
      };
      await schedule(scheduleId, body)
        .then(res => {
          if (res.success) {
            alert(MESSAGE_TEXTS.approveSuccess);
            location.reload();
          }
        })
        .catch(error => console.error(MESSAGE_TEXTS.approveError, error));
    }
  };

  return <Container onClick={() => approveDuty(scheduleId)}>{BUTTON_TEXTS.approve}</Container>;
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
