import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dutyRegist, getMyPage, hospitalDoctorList } from '@/lib/api';
import { UserData, DoctorList } from '@/lib/types';
import { hname, getLevel } from '@/utils/decode';
import Btn from '@/components/Buttons/Btn';
import { FiAlertCircle } from 'react-icons/fi';
// import { Calendar } from '@/components/register';

interface RegisterFormBody {
  hospitalId: number;
  userId: number;
  chooseDate: string;
}

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [adminData, setAdminData] = useState<UserData>({
    id: 0,
    empNo: 0,
    name: '',
    email: '',
    phone: '',
    hospitalId: 0,
    deptId: 0,
    level: '',
    auth: '',
    status: '',
    annual: 0,
    duty: 0,
    profileImageUrl: '',
    hiredate: '',
    createdAt: '',
    updatedAt: '',
  });
  const [doctorList, setDoctorList] = useState<DoctorList[]>();
  const { register, handleSubmit } = useForm<RegisterFormBody>();

  // 관리자 정보 조회
  const getAdminInfo = async () => {
    await getMyPage()
      .then(res => {
        console.log(res);
        if (res.success) {
          setAdminData(res.item);
        }
        console.log(adminData);
      })
      .catch(error => console.log(error));
  };

  // 의사 목록 호출
  const hospitalDoctors = async () => {
    const res = await hospitalDoctorList(adminData.hospitalId);
    setDoctorList(res.item);
  };

  useEffect(() => {
    getAdminInfo();
    hospitalDoctors();
  }, []);

  const onSubmit = async (data: RegisterFormBody) => {
    console.log(data);
    console.log('서브미잇', data.userId, data.chooseDate);
    const body = {
      chooseDate: data.chooseDate,
    };
    try {
      await dutyRegist(data.userId, body);
    } catch (error) {
      setErrorMessage('당직 일정 등록 실패');
    }
  };

  return (
    <Container>
      <h1>당직 일정 추가</h1>
      <CalendarContainer>{/* <Calendar /> */}</CalendarContainer>
      <RegisterWrap onSubmit={handleSubmit(onSubmit)}>
        <RegisterForm>
          <Label>
            <span>병원 선택</span>
            <select defaultValue="default" {...register('hospitalId')}>
              <option value="default" disabled hidden>
                병원을 선택해 주세요.
              </option>
              <option value={adminData?.hospitalId}>{hname[adminData.hospitalId]}</option>
            </select>
          </Label>
          <Label>
            <span>당직 대상 선택</span>
            <DoctorListContainer>
              {doctorList?.map(doctor => (
                <label key={doctor.userId}>
                  <input type="radio" value={doctor.userId} className="custom-radio-input" {...register('userId')} />
                  <RadioWrap className="radioWrap">
                    <div className="box1">{doctor.username}</div>
                    <div className="box2">{getLevel(doctor.level)}</div>
                    <div className="box3">{doctor.duty}</div>
                  </RadioWrap>
                </label>
              ))}
            </DoctorListContainer>
          </Label>
          <Label>
            날짜 지정
            <input type="date" {...register('chooseDate')} />
          </Label>
          <div>
            {errorMessage && (
              <InfoBox>
                <FiAlertCircle />
                <span className="info-text">{errorMessage}</span>
              </InfoBox>
            )}
          </div>
          <Btn content={'등록하기'}></Btn>
        </RegisterForm>
      </RegisterWrap>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  flex-wrap: wrap;
  h1 {
    font-size: 18px;
    width: 100%;
  }
`;

const CalendarContainer = styled.div`
  width: 800px;
  height: 800px;
  border: 1px solid black;
`;

const RegisterWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 320px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  span {
    margin-left: 4px;
  }
`;

const DoctorListContainer = styled.div`
  width: 320px;
  height: 400px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  background-color: ${props => props.theme.white};
  overflow-y: scroll;
  input {
    display: none;
    &:checked + .radioWrap {
      .text {
        color: ${props => props.theme.primay};
      }
      font-weight: 700;
    }
    &:hover + .radioWrap {
      .text {
        color: ${props => props.theme.primay};
      }
      font-weight: 700;
    }
  }
`;

const RadioWrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  .box1 {
    flex: 1;
  }
  .box2 {
    flex: 1;
  }
  .box3 {
    flex: 0.5;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  color: red;
  font-size: 14px;
  .info-text {
    margin-left: 8px;
  }
`;
