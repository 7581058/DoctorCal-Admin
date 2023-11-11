import { styled } from 'styled-components';
import { registerApprove } from '@/lib/api';
import { useSetRecoilState } from 'recoil';
import { AlertState } from '@/lib/types';
import { stateAlert } from '@/states/stateAlert';
import { MESSAGE_TEXTS } from '@/constants/message';
import { BUTTON_TEXTS } from '@/constants/buttons';
import { ICellRendererParams } from 'ag-grid-community';

const RequestApproveButton = (item: ICellRendererParams) => {
  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  const handleClickApprove = async (name: string, dept: string, userid: number) => {
    try {
      const res = await registerApprove(userid);
      if (res.success) {
        setAlert({
          isOpen: true,
          content: `${dept} ${name} ${MESSAGE_TEXTS.requestSuccess}`,
          type: 'success',
        });
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `회원가입 승인 실패\n${error}`,
        type: 'error',
      });
    }
  };

  return (
    <ApproveButton onClick={() => handleClickApprove(item.data.username, item.data.deptName, item.data.id)}>
      {BUTTON_TEXTS.approve}
    </ApproveButton>
  );
};

export default RequestApproveButton;

const ApproveButton = styled.button`
  width: 50px;
  height: 25px;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
