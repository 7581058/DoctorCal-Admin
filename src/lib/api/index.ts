import { Eveluation, LoginBody, PagesBody } from '@/lib/types/index.ts';
import axios from 'axios';

// register({ page: 0 }).then(a => console.log(a.item)) 사용

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
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
});

// 로그인
export const login = async (body: LoginBody) => {
  try {
    const res = await instance.post('user/login', body);
    return res;
  } catch (error) {
    console.log('로그인 실패', error);
  }
};

// 사용자 관리
export const users = async (body: Pages) => {
  try {
    const res = await authInstance.get('admin/users', { params: body });
    return res.data;
  } catch (error) {
    console.log('사용자 리스트 불러오기 실패', error);
  }
};

// 회원가입 요청 리스트
export const register = async (body: Pages) => {
  try {
    const res = await authInstance.get('admin/register', { params: body });
    return res.data;
  } catch (error) {
    console.log('회원가입 요청 불러오기 실패', error);
  }
};

// 회원가입 요청 승인
export const registerApprove = async (id: number) => {
  try {
    const res = await authInstance.post(`admin/users/${id}/approve`);
    return res.data;
  } catch (error) {
    console.log('회원가입 요청 승인 실패', error);
  }
};

// 사용자 재직 상태 변경
export const userRetire = async (id: number) => {
  try {
    const res = await authInstance.post(`admin/users/${id}/retire`);
    return res.data;
  } catch (error) {
    console.log('사용자 재직 상태 변경 실패', error);
  }
};

// 연차 결재 관리
export const annual = async (body: Pages) => {
  try {
    const res = await authInstance.get('admin/annual', { params: body });
    return res.data;
  } catch (error) {
    console.log('연차 결재 관리 실패', error);
  }
};

// 당직 결재 관리
export const duty = async (body: Pages) => {
  try {
    const res = await authInstance.get('admin/duty', { params: body });
    return res.data;
  } catch (error) {
    console.log('당직 결재 관리 실패', error);
  }
};

// 스케쥴 승인,반려
export const schedule = async (scheduleId: number, body: Eveluation) => {
  try {
    const res = await authInstance.post(`admin/${scheduleId}/evaluation`, body);
    return res.data;
  } catch (error) {
    console.log('스케쥴 승인 반려 처리 실패', error);
  }
};

//병원 정보 리스트
export const hospitalList = async () => {
  try {
    const res = await authInstance.get(`admin/hospital/list`);
    return res.data;
  } catch (error) {
    console.log('병원 정보 불러오기 실패', error);
  }
};

//병원 과 리스트
export const hospitalDeptList = async (hospitalId: number) => {
  try {
    const res = await authInstance.get(`admin/dept/${hospitalId}/list`);
    return res.data;
  } catch (error) {
    console.log('병원 과 리스트 불러오기 실패', error);
  }
};
