import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getCalendar } from '@/lib/api';
import { Schedule } from '@/lib/types';
import CalendarBody from '@/components/calendar/CalendarBody';

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState<Schedule[]>();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const fetchData = async () => {
    const data = await getCalendar();
    setScheduleData(data.item);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const prevMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.add(1, 'month'));
  };

  const handleClickToday = () => {
    setCurrentMonth(dayjs(dayjs().format('YYYY-MM-DD')));
  };

  return (
    <Container>
      <Header>
        <CalendarButtons>
          <button className="prev-button" onClick={prevMonth} disabled={!scheduleData}>
            &lt;
          </button>
          <button className="next-button" onClick={nextMonth} disabled={!scheduleData}>
            &gt;
          </button>
        </CalendarButtons>
        <button className="today-button" onClick={handleClickToday} disabled={!scheduleData}>
          오늘
        </button>
        <MonthWrapper>{currentMonth.format('YYYY년 M월')}</MonthWrapper>
      </Header>

      {scheduleData ? (
        <>
          <Weeks>
            {weekDays.map(day => (
              <Week className="weeks" key={day}>
                <div>{day}</div>
              </Week>
            ))}
          </Weeks>
          <CalendarBody scheduleData={scheduleData} currentMonth={currentMonth} />
        </>
      ) : (
        <>
          <Weeks></Weeks>
          <Loading></Loading>
        </>
      )}
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .today-button {
    width: 45px;
    height: 30px;
    border: none;
    outline: none;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 4px;
    color: ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    cursor: pointer;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: calc(100% - 90px);
  border-right: 1px solid ${props => props.theme.gray};
  border-left: 1px solid ${props => props.theme.gray};
  border-bottom: 1px solid ${props => props.theme.gray};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 30px;
  .prev-button,
  .next-button {
    height: 30px;
    border: none;
    outline: none;
    border: 1px solid ${props => props.theme.gray};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.gray};
    cursor: pointer;
  }
  .prev-button {
    width: 45px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  .next-button {
    width: 45px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const CalendarButtons = styled.div`
  display: flex;
`;

const MonthWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const Weeks = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-left: 1px solid ${props => props.theme.gray};
  border-top: 1px solid ${props => props.theme.gray};
  border-right: 1px solid ${props => props.theme.gray};
  margin-top: 20px;
  background-color: ${props => props.theme.white};
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-right: 1px solid ${props => props.theme.gray};
    color: ${props => props.theme.gray};
    font-weight: 500;
    &:last-child {
      padding-right: 1px;
      border-right: none;
    }
  }
`;

const Week = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% / 7);
`;
