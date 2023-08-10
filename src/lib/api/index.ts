import { Eveluation, LoginBody, PagesBody, dutyRegistBody } from '@/lib/types/index.ts';
import axios from 'axios';

// const host =
//   window.location.hostname === 'localhost'
//     ? 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com'
//     : 'api';

const instance = axios.create({
  baseURL: 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInstance = axios.create({
  baseURL: 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('authToken')}`,
  },
});

// 로그인
export const login = async (body: LoginBody) => {
  try {
    const res = await instance.post('/user/login', body);
    return res;
  } catch (error) {
    console.log('로그인 실패', error);
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const res = await instance.post('/user/logout');
    return res.data;
  } catch (error) {
    console.log('로그아웃 실패');
  }
};

// 마이페이지
export const getMyPage = async () => {
  try {
    const res = await instance.get('/user/myPage', {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log('마이페이지 조회 실패', error);
  }
};

// 사용자 관리
export const users = async (body: PagesBody) => {
  try {
    const res = await authInstance.get('/admin/users', { params: body });
    return res.data;
  } catch (error) {
    console.log('사용자 리스트 불러오기 실패', error);
  }
};

// 회원가입 요청 리스트
export const register = async (body: PagesBody) => {
  try {
    const res = await authInstance.get('/admin/register', { params: body });
    return res.data;
  } catch (error) {
    console.log('회원가입 요청 불러오기 실패', error);
  }
};

// 회원가입 요청 승인
export const registerApprove = async (id: number) => {
  try {
    const res = await authInstance.post(`/admin/users/${id}/approve`);
    return res.data;
  } catch (error) {
    console.log('회원가입 요청 승인 실패', error);
  }
};

// 사용자 재직 상태 변경
export const userRetire = async (id: number) => {
  try {
    const res = await authInstance.post(`/admin/users/${id}/retire`);
    return res.data;
  } catch (error) {
    console.log('사용자 재직 상태 변경 실패', error);
    return error;
  }
};

// 연차 결재 관리
export const annual = async (body: PagesBody) => {
  try {
    const res = await authInstance.get('/admin/annual', { params: body });
    return res.data;
  } catch (error) {
    console.log('연차 결재 관리 실패', error);
  }
};

// 당직 결재 관리
export const duty = async (body: PagesBody) => {
  try {
    const res = await authInstance.get('/admin/duty', { params: body });
    return res.data;
  } catch (error) {
    console.log('당직 결재 관리 실패', error);
  }
};

// 스케쥴 승인,반려
export const schedule = async (scheduleId: number, body: Eveluation) => {
  try {
    const res = await authInstance.post(`/admin/${scheduleId}/evaluation`, body);
    return res.data;
  } catch (error) {
    console.log('스케쥴 승인 반려 처리 실패', error);
  }
};

// 병원 정보 리스트
export const hospitalListInfo = async () => {
  try {
    const res = await instance.get('/hospital/list');
    return res.data;
  } catch (error) {
    console.log('병원 정보 리스트 조회 실패', error);
  }
};

// 병원 과 리스트
export const hospitalDeptList = async (hospitalId: number) => {
  try {
    const res = await authInstance.get(`/admin/dept/${hospitalId}/list`);
    return res.data;
  } catch (error) {
    console.log('병원 과 리스트 불러오기 실패', error);
  }
};

// 병원 별 의사 목록
export const hospitalDoctorList = async () => {
  try {
    const res = await instance.get(`/admin/hospitalUsers`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log('병원 의사 리스트 불러오기 실패', error);
  }
};

// 당직 추가
export const dutyRegist = async (userId: number, body: dutyRegistBody) => {
  try {
    const res = await instance.post(`/admin/${userId}/createDuty`, body);
    return res.data;
  } catch (error) {
    console.log('당직 추가 실패', error);
    throw error;
  }
};

// 당직 삭제
export const dutyDelete = async (scheduleId: number) => {
  try {
    const res = await authInstance.post(`/admin/${scheduleId}/deleteDuty`);
    return res.data;
  } catch (error) {
    console.log('당직 삭제 실패', error);
  }
};

// 달력 조회
export const getCalendar = async () => {
  try {
    const res = await authInstance.get('/schedule/');
    return res.data;
  } catch (error) {
    console.log('캘린더 조회 실패', error);
  }
};
