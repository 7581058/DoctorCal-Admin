//로그인
export interface Login {
  email: string;
  password: string;
}

//페이지
export interface Pages {
  page: number;
  size?: number;
}

//페이지네이션
export interface Pagination {
  pagination: number;
}

//스케쥴 승인,반려
export interface Eveluation {
  evaluation: string;
}

//병원 과 리스트 조회
export interface DeptList {
  hospitalId: number;
}
