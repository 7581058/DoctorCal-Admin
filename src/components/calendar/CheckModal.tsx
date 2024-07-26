import { GrClose } from 'react-icons/gr';
import AnnualModal from '@/components/calendar/AnnualModal';
import DutyModal from '@/components/calendar/DutyModal';
import styled from 'styled-components';

const CheckModal = ({
  isOpen,
  content,
  onClose,
  date,
}: {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  date: string;
}) => {
  return (
    <>
      {isOpen && (
        <Container>
          <ModalContainer>
            <ModalCloseButton onClick={onClose}>
              <GrClose />
            </ModalCloseButton>
            <ModalContent>
              <ContentWrap>
                {content === 'duty' ? <DutyModal date={date} onClose={onClose} /> : <AnnualModal date={date} />}
              </ContentWrap>
            </ModalContent>
          </ModalContainer>
        </Container>
      )}
    </>
  );
};

export default CheckModal;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 520px;
  height: 300px;
  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalCloseButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  text-align: right;
`;
