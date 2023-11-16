import axios from 'axios';
import { Eveluation, LoginBody, PagesBody, dutyRegistBody } from '@/lib/types/index.ts';

const { VITE_BASE_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('authToken')}`,
  },
});

// 로그인
export const login = async (body: LoginBody) => {
  const res = await instance.post('/user/login', body);
  return res;
};

// 로그아웃
export const logout = async () => {
  const res = await instance.post('/user/logout');
  return res.data;
};

// 마이페이지
export const getMyPage = async () => {
  const res = await instance.get('/user/myPage', {
    headers: {
      Authorization: `${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

// 사용자 관리
export const getUsers = async (body: PagesBody) => {
  const res = await authInstance.get('/admin/users', { params: body });
  return res.data;
};

// 회원가입 요청 리스트
export const getRegister = async (body: PagesBody) => {
  const res = await authInstance.get('/admin/register', { params: body });
  return res.data;
};

// 회원가입 요청 승인
export const registerApprove = async (id: number) => {
  const res = await authInstance.post(`/admin/users/${id}/approve`);
  return res.data;
};

// 사용자 재직 상태 변경
export const userRetire = async (id: number) => {
  const res = await authInstance.post(`/admin/users/${id}/retire`);
  return res.data;
};

// 연차 결재 관리
export const annual = async (body: PagesBody) => {
  const res = await authInstance.get('/admin/annual', { params: body });
  return res.data;
};

// 당직 결재 관리
export const duty = async (body: PagesBody) => {
  const res = await authInstance.get('/admin/duty', { params: body });
  return res.data;
};

// 스케쥴 승인,반려
export const schedule = async (scheduleId: number, body: Eveluation) => {
  const res = await authInstance.post(`/admin/${scheduleId}/evaluation`, body);
  return res.data;
};

// 병원 정보 리스트
export const hospitalListInfo = async () => {
  const res = await instance.get('/hospital');
  return res.data;
};

// 병원 과 리스트
export const hospitalDeptList = async (hospitalId: number) => {
  const res = await authInstance.get(`/admin/dept/${hospitalId}`);
  return res.data;
};

// 병원 별 의사 목록
export const hospitalDoctorList = async () => {
  const res = await authInstance.get(`/admin/hospitalUsers`);
  return res.data;
};

// 당직 추가
export const dutyRegist = async (userId: number, body: dutyRegistBody) => {
  const res = await instance.post(`/admin/${userId}/createDuty`, body);
  return res.data;
};

// 당직 삭제
export const deleteDuty = async (id: number) => {
  const res = await authInstance.post(`/admin/${id}/deleteDuty`);
  return res.data;
};

// 달력 조회
export const getCalendar = async () => {
  const res = await authInstance.get('/schedule/');
  return res.data;
};

// 날짜별 휴가 인원 조회
export const getAnnual = async (date: string) => {
  const res = await authInstance.get(`/schedule/date?chooseDate=${date}&category=ANNUAL`);
  return res.data;
};

// 날짜별 당직 인원 조회
export const getDuty = async (date: string) => {
  const res = await authInstance.get(`/schedule/date?chooseDate=${date}&category=DUTY`);
  return res.data;
};

// 근무관리 대시보드
export const getAttendanceDashboard = async () => {
  const res = await authInstance.get(`/admin/work/dashboard`);
  return res.data;
};

// 근무관리 사용자 목록
export const getAttendanceUsers = async () => {
  const res = await authInstance.get(`/admin/work`);
  return res.data;
};
