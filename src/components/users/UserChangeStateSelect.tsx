import { useSetRecoilState } from 'recoil';
import { userRetire } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { USER_SELECT_OPTION } from '@/constants/select';
import { MESSAGE_TEXTS } from '@/constants/message';
import { stateAlert } from '@/states/stateAlert';
import { useChangeValue } from '@/hooks/useChangeValue';
import CustomSelect from '@/components/CustomSelect';
import { ICellRendererParams } from 'ag-grid-community';
import styled from 'styled-components';

const UserChangeStateSelect = (params: ICellRendererParams) => {
  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  const { value } = useChangeValue(params.data.status);

  const handleChangeState = async (selectedValue: string) => {
    if (selectedValue) {
      try {
        const data = await userRetire(params.data.id);
        if (data.success) {
          setAlert({
            isOpen: true,
            content: `${params.data.deptName} ${params.data.username} \n ${MESSAGE_TEXTS.userChangeSuccess}`,
            type: 'success',
          });
        }
      } catch (error) {
        setAlert({
          isOpen: true,
          content: `사용자 재직 상태 변경 실패\n${error}`,
          type: 'error',
        });
      }
    }
  };

  return (
    <Container>
      <CustomSelect
        options={USER_SELECT_OPTION}
        value={value}
        onChange={selectedValue => handleChangeState(selectedValue)}
      />
    </Container>
  );
};

export default UserChangeStateSelect;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  select {
    width: 90px;
    height: 24px;
    margin: 0;
  }
`;
