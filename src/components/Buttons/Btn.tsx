import styled from 'styled-components';

const Btn = ({ content }: { content: string }) => {
  return <Container>{content}</Container>;
};

export default Btn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 46px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
