import { styled } from 'styled-components';
import { registerApprove } from '@/lib/api';
import { MESSAGE_TEXTS } from '@/constants/message';
import { BUTTON_TEXTS } from '@/constants/buttons';
import { ICellRendererParams } from 'ag-grid-community';

const RequestApproveButton = (item: ICellRendererParams) => {
  const approve = async (userid: number) => {
    await registerApprove(userid);
  };

  const handleClickApprove = (name: string, dept: string, id: number) => {
    approve(id);
    alert(`${dept} ${name} ${MESSAGE_TEXTS.requestSuccess}`);
    window.location.reload();
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
