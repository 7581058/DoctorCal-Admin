interface Hospital {
  hospital: string;
  dept: deptDecode;
}

interface hospitalDecode {
  [key: number]: Hospital;
}

interface deptDecode {
  [key: number]: string;
}

export const hospitalDecode: hospitalDecode = {
  1: {
    hospital: '서울대학교 병원',
    dept: {
      1: '응급의학과',
      2: '내과',
      3: '외과',
      4: '산부인과',
      5: '가정의학과',
      6: '피부과',
      7: '마취통증의학과',
      8: '안과',
      9: '이비인후과',
      10: '신경외과',
      11: '정신건강의학과',
    },
  },
  2: {
    hospital: '연세 세브란스 병원',
    dept: {
      12: '응급의학과',
      13: '내과',
      14: '외과',
      15: '산부인과',
      16: '성형외과',
      17: '신경과',
      18: '영상의학과',
      19: '이비인후과',
      20: '정형외과',
      21: '피부과',
      22: '정신건강의학과',
    },
  },
  3: {
    hospital: '고려대학교 안암병원',
    dept: {
      23: '응급의학과',
      24: '소화기내과',
      25: '흉부외과',
      26: '정신건강의학과',
      27: '순환기내과',
      28: '간담췌외과',
      29: '산부인과',
      30: '신경과',
      31: '정형외과',
      32: '핵의학과',
      33: '가정의학과',
    },
  },
};

export const getLevel = (level: string) => {
  if (level == 'PK') {
    return '본과실습생';
  } else if (level == 'INTERN') {
    return '인턴';
  } else if (level == 'RESIDENT') {
    return '전공의';
  } else if (level == 'FELLOW') {
    return '전문의';
  }
};

export const hname = {
  1: '서울대학교 병원',
  2: '연세 세브란스 병원',
  3: '고려대학교 안암병원',
};

interface Dname {
  [key: number]: string;
}

export const dname: Dname = {
  1: '응급의학과',
  2: '내과',
  3: '외과',
  4: '산부인과',
  5: '가정의학과',
  6: '피부과',
  7: '마취통증의학과',
  8: '안과',
  9: '이비인후과',
  10: '신경외과',
  11: '정신건강의학과',
  12: '응급의학과',
  13: '내과',
  14: '외과',
  15: '산부인과',
  16: '성형외과',
  17: '신경과',
  18: '영상의학과',
  19: '이비인후과',
  20: '정형외과',
  21: '피부과',
  22: '정신건강의학과',
  23: '응급의학과',
  24: '소화기내과',
  25: '흉부외과',
  26: '정신건강의학과',
  27: '순환기내과',
  28: '간담췌외과',
  29: '산부인과',
  30: '신경과',
  31: '정형외과',
  32: '핵의학과',
  33: '가정의학과',
};

export const getPhone = (phone: string) => {
  const part = phone.match(/^(\d{3})(\d{4})(\d{0,4})$/);
  if (part === null) return phone;
  return `${part[1]}-${part[2]}-${part[3]}`;
};

export const getAuth = (auth: string) => {
  if (auth === 'ADMIN') return '관리자';
  else if (auth === 'USER') return '일반';
};

export const getCategory = (category: string) => {
  if (category === 'ANNUAL') {
    return '휴가 신청';
  } else {
    return '당직 변경 신청';
  }
};

export const getEvaluation = (eveluation: string) => {
  if (eveluation === 'STANDBY') {
    return '대기';
  } else if (eveluation === 'APPROVED') {
    return '승인';
  } else if (eveluation === 'REJECTED') {
    return '반려';
  } else if (eveluation === 'CANCELED') {
    return '취소';
  }
};
