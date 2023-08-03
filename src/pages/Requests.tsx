import BoardContainer from '@/components/BoardContainer';
import RequestsItem from '@/components/requests/RequestsItem';
import Pagenation from '@/components/Pagenation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';

const header = [
  { name: 'No', width: 0.5 },
  { name: '이름', width: 1 },
  { name: '부서', width: 1 },
  { name: '직급', width: 1 },
  { name: '연락처', width: 1.5 },
  { name: '승인 처리', width: 1 },
];

const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getList(pageNumber);
  };

  const [requests, setRequests] = useState([]);
  const [allLength, setallLength] = useState(0);

  const getLength = async () => {
    try {
      const data = await axios.get('http://127.0.0.1:5173/daseul/requests.json');
      setallLength(data.data.item[0].total);
      return data;
    } catch (error) {
      console.warn(error);
      console.warn('fail');
      return false;
    }
  };
  const getList = async (page: number) => {
    try {
      const data = await axios.get(`http://127.0.0.1:5173/daseul/requests${page - 1}.json`);
      setRequests(data.data.item);
      return data;
    } catch (error) {
      console.warn(error);
      console.warn('fail');
      return false;
    }
  };
  useEffect(() => {
    getLength();
    getList(1);
  }, []);

  return (
    <Container>
      <BoardContainer title="회원 가입 요청" headers={header}>
        <RequestsItem requests={requests} currentPage={currentPage} />
      </BoardContainer>
      <Pagenation totalItems={allLength} currentPage={currentPage} onPageChange={handlePageChange} />
    </Container>
  );
};

export default Requests;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
`;
