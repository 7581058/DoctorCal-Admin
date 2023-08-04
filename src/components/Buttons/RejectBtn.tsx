import styled from 'styled-components';

const RejectBtn = () => {
  return <Container>반려</Container>;
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
