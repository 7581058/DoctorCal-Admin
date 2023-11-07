import { BUTTON_TEXTS } from '@/constants/buttons';
import { MESSAGE_TEXTS } from '@/constants/message';
import { schedule } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { stateAlert } from '@/states/stateAlert';
import { useSetRecoilState } from 'recoil';
import Alert from '@/components/Alert';
import styled from 'styled-components';

const ApplyBtn = ({ scheduleId }: { scheduleId: number }) => {
  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  // 연차/당직 승인
  const approveDuty = async (scheduleId: number) => {
    if (confirm(MESSAGE_TEXTS.approveConfirm)) {
      const body = {
        evaluation: 'APPROVED',
      };
      try {
        const res = await schedule(scheduleId, body);
        if (res.success) {
          setAlert({
            isOpen: true,
            content: MESSAGE_TEXTS.approveSuccess,
            type: 'error',
          });
          location.reload();
        }
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `스케줄 승인 실패\n${error}`,
          type: 'error',
        });
      }
    }
  };

  return (
    <>
      <Alert />
      <Container onClick={() => approveDuty(scheduleId)}>{BUTTON_TEXTS.approve}</Container>
    </>
  );
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
