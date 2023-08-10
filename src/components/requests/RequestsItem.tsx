import { styled } from 'styled-components';
import { registerApprove } from '@/lib/api';
import { getLevel, getPhone } from '@/utils/decode';
import { Request } from '@/lib/types';

const RequestsItem = ({ requests, currentPage }: { requests: Request[]; currentPage: number }) => {
  const approve = async (userid: number) => {
    await registerApprove(userid);
  };

  const handleClickApprove = (name: string, dept: string, id: number) => {
    approve(id);
    alert(`${dept} ${name} 가입 승인 완료`);
    window.location.reload();
  };

  const startIndex = (currentPage - 1) * 10;

  return (
    <Container>
      {requests.map((item, index) => (
        <RequestItem key={item.id}>
          <span className="index">{startIndex + index + 1}</span>
          <span className="name">{item.username}</span>
          <span className="dept">{item.deptName}</span>
          <span className="level">{getLevel(item.level)}</span>
          <span className="phone">{getPhone(item.phone)}</span>
          <span className="button">
            <ApproveButton onClick={() => handleClickApprove(item.username, item.deptName, item.id)}>
              승인
            </ApproveButton>
          </span>
        </RequestItem>
      ))}
    </Container>
  );
};

export default RequestsItem;

const Container = styled.div`
  width: 100%;
  height: calc(100% / 10);
  box-sizing: border-box;
`;

const RequestItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
    text-align: center;
    flex-basis: 0;
    color: ${props => props.theme.black};
  }
  .index {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .dept {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
  .phone {
    flex-grow: 1.5;
  }
  .button {
    flex-grow: 1;
  }
`;

const ApproveButton = styled.button`
  width: 50px;
  height: 25px;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
