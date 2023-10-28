import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dutyRegist, hospitalDoctorList } from '@/lib/api';
import { DoctorList } from '@/lib/types';
import { hospitalDecode, getLevel } from '@/utils/decode';
import Btn from '@/components/Buttons/Btn';
import { FiAlertCircle } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { AdminState } from '@/states/stateAdmin';
import Calendar from '@/components/calendar/Calendar';
import Loading from '@/components/Loading';
import { MESSAGE_TEXTS } from '@/constants/message';
import { BUTTON_TEXTS } from '@/constants/buttons';
import { REGISTER_TEXTS } from '@/constants/register';

interface RegisterFormBody {
  hospitalId: number;
  userId: number;
  chooseDate: string;
}

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const adminData = useRecoilValue(AdminState);
  const [doctorList, setDoctorList] = useState<DoctorList[]>();
  const { register, handleSubmit } = useForm<RegisterFormBody>();
  const [isLoading, setIsLoading] = useState(false);

  // 의사 목록 호출
  const hospitalDoctors = async () => {
    try {
      setIsLoading(true);
      const res = await hospitalDoctorList();
      setDoctorList(res.item);
    } catch (error) {
      setIsLoading(false);
      console.error(MESSAGE_TEXTS.getDoctorListConsoleError, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    hospitalDoctors();
  }, []);

  const onSubmit = async (data: RegisterFormBody) => {
    const body = {
      chooseDate: data.chooseDate,
    };
    try {
      await dutyRegist(data.userId, body);
      location.reload();
    } catch (error) {
      setErrorMessage(MESSAGE_TEXTS.dutyAddError);
    }
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
      <RegisterWrap onSubmit={handleSubmit(onSubmit)}>
        <RegisterForm>
          <Label>
            <span>{REGISTER_TEXTS.hospitalName}</span>
            <input value={hospitalDecode[adminData.hospitalId].hospital} readOnly {...register('hospitalId')} />
          </Label>
          <Label>
            <span>{REGISTER_TEXTS.selectDutyTarget}</span>
            <DoctorListContainer>
              {doctorList?.map(doctor => (
                <label key={doctor.userId}>
                  <input type="radio" value={doctor.userId} className="custom-radio-input" {...register('userId')} />
                  <RadioWrap className="radioWrap">
                    <div className="box1">{doctor.username}</div>
                    <div className="box2">{doctor.deptName}</div>
                    <div className="box2">{getLevel(doctor.level)}</div>
                    <div className="box3">{doctor.duty}</div>
                  </RadioWrap>
                </label>
              ))}
            </DoctorListContainer>
          </Label>
          <Label>
            {REGISTER_TEXTS.selectDate}
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
          <Btn content={BUTTON_TEXTS.register}></Btn>
        </RegisterForm>
      </RegisterWrap>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  flex-wrap: wrap;
  h1 {
    font-size: 18px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 80px;
  }
`;

const CalendarContainer = styled.div`
  width: 900px;
  height: 800px;
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
      font-weight: 700;
    }
    &:hover + .radioWrap {
      font-weight: 700;
    }
  }
`;

const RadioWrap = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-around;
  padding: 16px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  .box1 {
    flex: 1.2;
    text-align: left;
  }
  .box2 {
    flex: 1.5;
  }
  .box3 {
    flex: 0.2;
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
