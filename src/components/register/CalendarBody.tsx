import { useState } from 'react';
import dayjs from 'dayjs';
import { styled } from 'styled-components';
import { Schedule } from '@/lib/types';
import { getLevel } from '@/utils/decode';
import { CheckModal } from '@/components/register';

const CalendarBody = ({ scheduleData, currentMonth }: { scheduleData: Schedule[]; currentMonth: dayjs.Dayjs }) => {
  const monthStart = currentMonth.startOf('month');
  const firstDayOfMonth = monthStart.day();
  const firstDate = monthStart.subtract(firstDayOfMonth, 'day');

  const [calendarData] = useState<Schedule[]>(scheduleData);

  const [modalOpen, setModalOpen] = useState(false);

  const handleClickDuty = (date: dayjs.Dayjs) => {
    const clickDate = date.format('YYYY-MM-DD');
    setModalOpen(true);
  };

  //달력 7일 6주 고정
  const Date = (firstDate: dayjs.Dayjs) => {
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = firstDate.add(i, 'day');
      days.push(day);
    }
    return days;
  };
  const mapToDate = (dateArray: dayjs.Dayjs[]) => {
    return dateArray.map((date, index) => {
      const dateObj = dayjs(date);
      const arrDuty: string[] = [];

      Object.keys(calendarData).map(item => {
        const index = parseInt(item, 10);
        const cal = calendarData[index];

        //당직 출력
        if (cal.category === 'DUTY' && cal.startDate === dateObj.format('YYYY-MM-DD')) {
          arrDuty.push(cal.name, cal.level);
        }
      });

      //스타일
      const className = () => {
        const className = 'dates';
        if (dateObj.format('M') !== currentMonth.format('M')) {
          if (34 < index && index < 42) {
            return className + ' outdate lastline';
          } else if (index % 7 === 6) {
            return className + ' outdate rightline';
          }
          return className + ' outdate';
        } else {
          if (dateObj.format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD')) {
            return className + ' today';
          } else if (index % 7 === 6) {
            return className + ' rightline';
          } else if (34 < index && index < 42) {
            return className + ' lastline';
          } else {
            return className;
          }
        }
      };

      return (
        <div key={index} className={className()}>
          <span className="calendar-date">{dateObj.format('D')}</span>
          {arrDuty.length > 0 ? (
            <Duty onClick={() => handleClickDuty(dateObj)}>
              <span className="duty-name">• {arrDuty[0]}</span>
              <span>{getLevel(arrDuty[1])}</span>
            </Duty>
          ) : (
            ''
          )}
        </div>
      );
    });
  };

  return <Container>{mapToDate(Date(firstDate))}<CheckModal isOpen={modalOpen} onClose={() => setModalOpen(false)}></Container>;
};

export default CalendarBody;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: calc(100% - 90px);
  border-right: 1px solid ${props => props.theme.gray};
  border-left: 1px solid ${props => props.theme.gray};
  border-bottom: 1px solid ${props => props.theme.gray};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${props => props.theme.white};
  box-sizing: border-box;
  .dates {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.gray};
    border-right: 1px solid ${props => props.theme.gray};
    padding: 5px;
    font-weight: 700;
    //날짜
    .calendar-date {
      position: absolute;
      top: 5px;
      left: 5px;
    }
    &.today {
      border: 3px solid ${props => props.theme.secondary};
      .calendar-date {
        display: flex;
        color: ${props => props.theme.primary};
        margin-left: -3px;
        margin-top: -3px;
      }
    }
    &.outdate {
      color: #c9c8c8;
    }
    &.lastline {
      border-bottom: none;
    }
    &.rightline {
      border-right: none;
    }
    &:nth-child(42) {
      border-right: none;
    }
  }
`;

const Duty = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 20px;
  font-weight: 400;
  color: ${props => props.theme.primary};
  box-sizing: border-box;
  .duty-name {
    margin-right: 5px;
    font-weight: 700;
  }
`;
