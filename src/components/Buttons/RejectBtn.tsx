import { BUTTON_TEXTS } from '@/constants/buttons';
import { MESSAGE_TEXTS } from '@/constants/message';
import { schedule } from '@/lib/api';
import styled from 'styled-components';

const RejectBtn = ({ scheduleId }: { scheduleId: number }) => {
  // 연차/당직 반려
  const rejectDuty = async (scheduleId: number) => {
    if (confirm(MESSAGE_TEXTS.rejectConfirm)) {
      const body = {
        evaluation: 'REJECTED',
      };
      await schedule(scheduleId, body)
        .then(res => {
          if (res.success) {
            alert(MESSAGE_TEXTS.rejectSuccess);
            location.reload();
          }
        })
        .catch(error => console.error(MESSAGE_TEXTS.rejectError, error));
    }
  };

  return <Container onClick={() => rejectDuty(scheduleId)}>{BUTTON_TEXTS.reject}</Container>;
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
