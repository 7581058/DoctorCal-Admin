import {
  BsPersonFillGear,
  BsCalendarPlus,
  BsCalendarWeek,
  BsFillPersonPlusFill,
  BsCalendarHeart,
  BsClockHistory,
} from 'react-icons/bs';

interface MenuItem {
  to: string;
  icon: React.ElementType;
  text: string;
}

export const SIDE_BAR_OPTIONS: MenuItem[] = [
  { to: '/duty', icon: BsCalendarWeek, text: '당직 변경 관리' },
  { to: '/register', icon: BsCalendarPlus, text: '당직 일정 추가' },
  { to: '/annual', icon: BsCalendarHeart, text: '연차 신청 관리' },
  { to: '/users', icon: BsPersonFillGear, text: '사용자 관리' },
  { to: '/requests', icon: BsFillPersonPlusFill, text: '회원 가입 요청' },
  { to: '/attendance', icon: BsClockHistory, text: '근무 관리' },
];

export const SIDE_BAR_TEXT = {
  logoFront: 'ADMIN',
  logoBack: '관리자',
  mark: '©Dr.Cal',
};
