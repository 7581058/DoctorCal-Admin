import { hospitalDecode } from '@/utils/decode';
import { MdOutlineLocalHospital } from 'react-icons/md';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getMyPage } from '@/lib/api';
import { UserData } from '@/lib/types';

const MainHeader = () => {
  const [adminData, setAdminData] = useState<UserData>();

  // 관리자 정보 조회
  const getAdminInfo = async () => {
    await getMyPage()
      .then(res => {
        if (res.success) {
          setAdminData(res.item);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getAdminInfo();
  }, []);

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
