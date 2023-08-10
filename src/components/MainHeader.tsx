import { hospitalDecode } from '@/utils/decode';
import { MdOutlineLocalHospital } from 'react-icons/md';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { AdminState } from '@/states/stateAdmin';

const MainHeader = () => {
  const adminData = useRecoilValue(AdminState);

  return (
    <Container>
      <HosPitalName>
        <MdOutlineLocalHospital />
        {adminData && <span className="hospital-name">{hospitalDecode[adminData.hospitalId].hospital}</span>}
      </HosPitalName>
    </Container>
  );
};

export default MainHeader;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 64px;
  color: ${props => props.theme.gray};
  font-weight: 500;
`;

const HosPitalName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 32px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
