import styled from 'styled-components';

interface PagenationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagenation: React.FC<PagenationProps> = ({ totalPage, currentPage, onPageChange }) => {
  const handleClickPage = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      handleClickPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      handleClickPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <PageNumber key={i} onClick={() => handleClickPage(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </PageNumber>,
      );
    }
    return pageNumbers;
  };

  return (
    <Container>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        &lt;
      </button>
      {renderPageNumbers()}
      <button onClick={goToNextPage} disabled={currentPage === totalPage}>
        &gt;
      </button>
    </Container>
  );
};

export default Pagenation;

const Container = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  button {
    border: none;
    outline: none;
    font-size: 1.125rem;
    color: ${props => props.theme.primary};
    &:disabled {
      color: ${props => props.theme.lightGray};
    }
  }
`;

const PageNumber = styled.span`
  color: ${props => props.theme.gray};
  cursor: pointer;
  font-size: 1.125rem;
  &.active {
    color: ${props => props.theme.primary};
    font-weight: 700;
  }
`;
