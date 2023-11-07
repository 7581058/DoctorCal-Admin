import { MdOutlineLocalHospital } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { hospitalDecode } from '@/utils/decode';
import { stateAdmin } from '@/states/stateAdmin';
import styled from 'styled-components';

const MainHeader = () => {
  const adminData = useRecoilValue(stateAdmin);

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
