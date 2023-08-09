import { styled } from 'styled-components';

const CheckModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Container>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </Container>
  );
};

export default CheckModal;

const Container = styled.div`
  width: 300px;
  height: 200px;
  background-color: ${props => props.theme.white};
`;
