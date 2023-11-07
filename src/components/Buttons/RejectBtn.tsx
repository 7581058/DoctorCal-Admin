import { BUTTON_TEXTS } from '@/constants/buttons';
import { MESSAGE_TEXTS } from '@/constants/message';
import { schedule } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { stateAlert } from '@/states/stateAlert';
import { useSetRecoilState } from 'recoil';
import Alert from '@/components/Alert';
import styled from 'styled-components';

const RejectBtn = ({ scheduleId }: { scheduleId: number }) => {
  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  // 연차/당직 반려
  const rejectDuty = async (scheduleId: number) => {
    if (confirm(MESSAGE_TEXTS.rejectConfirm)) {
      const body = {
        evaluation: 'REJECTED',
      };

      try {
        const res = await schedule(scheduleId, body);
        if (res.success) {
          setAlert({
            isOpen: true,
            content: MESSAGE_TEXTS.rejectSuccess,
            type: 'error',
          });
          location.reload();
        }
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `스케줄 반려 실패\n${error}`,
          type: 'error',
        });
      }
    }
  };

  return (
    <>
      <Alert />
      <Container onClick={() => rejectDuty(scheduleId)}>{BUTTON_TEXTS.reject}</Container>
    </>
  );
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
