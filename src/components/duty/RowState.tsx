import { ICellRendererParams } from 'ag-grid-community';
import { MESSAGE_TEXTS } from '@/constants/message';
import { getEvaluation } from '@/utils/decode';
import ApplyBtn from '@/components/Buttons/ApplyBtn';
import RejectBtn from '@/components/Buttons/RejectBtn';
import styled from 'styled-components';

const RowState = (type: string, params: ICellRendererParams) => {
  return (
    <Container>
      {params.data.evaluation === 'STANDBY' ? (
        <>
          <ApplyBtn scheduleId={params.data.scheduleId} />
          <RejectBtn scheduleId={params.data.scheduleId} />
        </>
      ) : type === 'duty' ? (
        <div className="done">{MESSAGE_TEXTS.dutyRequestDone}</div>
      ) : (
        <div className="evaluationContainer">{getEvaluation(params.data.evaluation)}</div>
      )}
    </Container>
  );
};

export default RowState;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1.5;
  gap: 6px;
`;
