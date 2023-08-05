import { Eveluation, Login, Pages } from '@/components/lib/types/index.ts';
import axios from 'axios';

// register({ page: 0 }).then(a => console.log(a.item)) 사용

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkb2N0b3JjYWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkS2R1RHpxNXhkMmk0LjNPMTFldm9RLmlEakVVdC9Na3J1V2tQL1RiM3ZEbnlhSTFBcEZxNVciLCJhdXRoIjoiQURNSU4iLCJpZCI6MjcsImV4cCI6MTY5MTQxMjQ1NiwidXNlcm5hbWUiOiJhZG1pbiIsInN0YXR1cyI6IkFQUFJPVkVEIn0.zuFG_LIOuVsZBkNMNw5W5LmZCFKxPGaL3R9BF3MJQWLEsN5V81M6JS8H9Vkd9JksMt286QFuKmu-Rf93CkjORw`;
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
    Authorization: `Bearer ${token}`,
  },
});

// 로그인
export const login = async (body: Login) => {
  try {
    const res = await instance.post('user/login', body);
    return res.data;
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
