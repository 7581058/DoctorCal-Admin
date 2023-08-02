import { BsPersonFillGear, BsCalendarPlus, BsCalendarWeek, BsFillPersonPlusFill } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const SideBar = () => {
  const navigate = useNavigate();

  const handleClickLogout = () => {
    //토큰 삭제 로직 추가 필요
    navigate('/');
  };

  return (
    <Container>
      <Logo>Dr.Cal </Logo>
      <Menu>
        <MenuItem to="/duty">
          <BsCalendarWeek />
          <span>당직 변경 관리</span>
        </MenuItem>
        <MenuItem to="/annual">
          <BsCalendarPlus />
          <span>연차 신청 관리</span>
        </MenuItem>
        <MenuItem to="/users">
          <BsPersonFillGear />
          <span>사용자 관리</span>
        </MenuItem>
        <MenuItem to="/requests">
          <BsFillPersonPlusFill />
          <span>회원 가입 요청</span>
        </MenuItem>
      </Menu>
      <AdminLogo>
        ADMIN<span>관리자</span>
      </AdminLogo>
      <LogoutBtn onClick={handleClickLogout}>로그아웃</LogoutBtn>
      <Mark>©Dr.Cal</Mark>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.white};
`;

const Logo = styled.span`
  margin-top: 40px;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 50px;
`;

const MenuItem = styled(NavLink)`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    margin-left: 16px;
    box-sizing: border-box;
    height: 24px;
  }
  &.active {
    color: ${props => props.theme.primary};
    span {
      border-bottom: 2px solid ${props => props.theme.primary};
    }
  }
`;

const AdminLogo = styled.span`
  position: absolute;
  bottom: 140px;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.theme.black};
  span {
    margin-left: 5px;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${props => props.theme.gray};
  }
`;

const LogoutBtn = styled.button`
  position: absolute;
  bottom: 60px;
  border: none;
  outline: none;
  margin-top: 20px;
  background-color: transparent;
  color: ${props => props.theme.primary};
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
`;

const Mark = styled.span`
  position: absolute;
  bottom: 20px;
  font-size: 0.8125rem;
  color: ${props => props.theme.lightGray};
`;
