import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAttendanceDashboard, getAttendanceUsers } from '@/lib/api';
import { AlertState } from '@/lib/types';
import { stateAlert } from '@/states/stateAlert';
import { PAGE_TITLE_TEXTS } from '@/constants/pageTitle';
import { ATTENDANCE_COLUMN } from '@/constants/attendance';
import { convertDay } from '@/utils/convertDay';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';
import DashBoard from '@/components/DashBoard';
import GridTable from '@/components/Table/GridTable';
import styled from 'styled-components';

const Attendance = () => {
  const [dashBoardData, setDashBoardData] = useState({
    dayWork: '0:00:00',
    weekWork: '0:00:00',
    monthWork: '0:00:00',
  });
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState('0000년 00월 00일 (0)');
  const [isLoading, setIsLoading] = useState(false);

  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  // 근무 관리 데이터 호출
  const getAttendanceData = async () => {
    try {
      setIsLoading(true);
      const [resDashboard, resUser] = await Promise.all([getAttendanceDashboard(), getAttendanceUsers()]);
      if (resDashboard.success) {
        setDashBoardData(resDashboard.item);
      }
      if (resUser.success) {
        setTableData(resUser.item);
      }
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `근무 관리 데이터 호출 실패\n${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 오늘 날짜 구하기
  const getTodayDate = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const day = convertDay(new Date().getDay());

    setDate(`${year}년 ${month + 1}월 ${date}일 (${day})`);
  };

  useEffect(() => {
    getAttendanceData();
    getTodayDate();
  }, []);

  return (
    <Container>
      <Alert />
      {isLoading && <Loading />}
      <TitleContainer>
        <PageTitle>{PAGE_TITLE_TEXTS.attendanceTitle}</PageTitle>
        <SubTitle>{date}</SubTitle>
      </TitleContainer>
      <DashBoard data={dashBoardData} />
      <GridTable rowData={tableData} columnsData={ATTENDANCE_COLUMN} />
    </Container>
  );
};

export default Attendance;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px 80px 60px 80px;
  box-sizing: border-box;
  select {
    position: absolute;
    right: 80px;
    width: 100px;
    height: 30px;
    margin-top: -5px;
  }
`;

const PageTitle = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;
