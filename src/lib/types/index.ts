// 프로젝트에 사용되는 types 정리 //

// 사용자 데이터
export interface UserData {
  id: number;
  empNo: number;
  name: string;
  email: string;
  phone: string;
  hospitalId: number;
  deptId: number;
  level: string;
  auth: string;
  status: string;
  annual: number;
  duty: number;
  profileImageUrl: string;
  hiredate: string;
  createdAt: string;
  updatedAt: string;
}

// 로그인
export interface LoginBody {
  email: string;
  password: string;
}

// 회원가입
export interface SignUpBody {
  email: string;
  password: string;
  phone: string;
  name: string;
  hospitalId: number;
  deptId: number;
}

// 비밀번호 변경
export interface editPasswordBody {
  newPassword: string;
  oldPassword: string;
}

// 마이페이지 수정
export interface EditMyPageBody {
  name: string;
  deptId: number;
  phone: string;
  image: string;
}

// 연차 등록
export interface CreateAnnualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

//연차 내용 수정
export interface EditAnnualBody {
  startDate: Date;
  endDate: Date;
  reason: string;
}

// 당직 등록
export interface CreateDutyBody {
  startDate: Date;
}

// 당직 내용 수정
export interface EditDutyBody {
  startDate: Date;
}

// 캘린더 조회
export interface Schedule {
  category: string;
  deptName: string;
  endDate: string;
  evaluation: string;
  hospitalName: string;
  id: number;
  level: string;
  name: string;
  startDate: string;
}

// 날짜별 휴가 조회
export interface AnnualData {
  deptName: string;
  id: number;
  level: string;
  phone: string;
  username: string;
}

// 날짜별 당직 조회
export interface DutyData {
  deptName: string;
  email: string;
  id: number;
  level: string;
  phone: string;
  profileImageUrl: string;
  userId: number;
  username: string;
}

// 페이지
export interface PagesBody {
  page: number;
  size?: number;
  sort?: string;
}

// 페이지네이션
export interface Pagination {
  pagination: number;
}

// 스케쥴 승인,반려
export interface Eveluation {
  evaluation: string;
}

// 병원 과 리스트 조회
export interface DeptList {
  hospitalId: number;
}

// 관리자 회원가입요청 리스트
export interface Request {
  id: number;
  username: string;
  phone: string;
  hospitalName: string;
  deptName: string;
  level: string;
  auth: string;
  status: string;
}

// 관리자 당직변경관리 리스트
export interface DutyRequest {
  category: string;
  createdAt: string;
  evaluation: string;
  level: string;
  scheduleId: number;
  startDate: string;
  username: string;
}

// 관리자 사용자 리스트
export interface Users {
  auth: string;
  deptName: string;
  hospitalName: string;
  id: number;
  level: string;
  phone: string;
  status: string;
  username: string;
}
