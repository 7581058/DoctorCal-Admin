import styled from 'styled-components';

const BoardContainer = ({
  title,
  headers,
  children,
}: {
  title: string;
  headers: { name: string; width: number }[];
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <BoardBackground>
        <BoardHeader>
          {headers.map((header, index) => (
            <HeaderItem $hwidth={header.width} key={index}>
              {header.name}
            </HeaderItem>
          ))}
        </BoardHeader>
        <BoardList>{children}</BoardList>
      </BoardBackground>
    </Container>
  );
};

export default BoardContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Title = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`;

const BoardBackground = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.white};
`;

const BoardHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.gray};
`;

const HeaderItem = styled.div<{ $hwidth: number }>`
  display: flex;
  flex-grow: ${props => props.$hwidth};
  justify-content: center;
  align-items: center;
  flex-basis: 0;
`;

const BoardList = styled.div`
  width: 100%;
  height: 100%;
`;
