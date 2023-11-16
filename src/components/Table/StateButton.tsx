import { getState } from '@/utils/decode';
import styled from 'styled-components';
import { ICellRendererParams } from 'ag-grid-community';

type StateValue = 'ON' | 'OFF' | 'annual';

const StateButton = (params: ICellRendererParams) => {
  const state = params.value as StateValue;
  return (
    <BtnBox className={state}>
      <Dot />
      {getState[state]}
    </BtnBox>
  );
};

export default StateButton;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 24px;
  border-radius: 20px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  margin: 0;
  font-size: 12px;
  &.ON {
    background-color: ${props => props.theme.green};
  }
  &.OFF {
    background-color: ${props => props.theme.lightGray};
  }
  &.annual {
    background-color: ${props => props.theme.secondary};
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  margin-right: 8px;
`;
