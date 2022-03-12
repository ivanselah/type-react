import styled from 'styled-components';
import { StateAddDateProps } from './AppCom';

function DiaryItem({ data, deleteData }: { data: StateAddDateProps; deleteData: (id: StateAddDateProps['id']) => void }) {
  return (
    <DiaryItemContainer>
      <div
        className="diary-item__close"
        onClick={() => {
          if (window.confirm('정말로 삭제하시겠습니까?')) deleteData(data.id);
        }}
      >
        &times;
      </div>
      <li>
        <p className="diary-item__auther">작성자 : {data.author}</p>
        <p className="diary-item__content">내용 : {data.content}</p>
        <p className="diary-item__date">작성 시간 : {new Date(data.created_date).toLocaleString('ko-kr')}</p>
        <LineBorder />
        <p>감정점수 : {data.emotion}</p>
      </li>
    </DiaryItemContainer>
  );
}

export default DiaryItem;

const DiaryItemContainer = styled.div`
  background-color: #ffffff;
  margin-bottom: 10px;
  color: black;
  padding: 20px;
  border-radius: 15px;

  p {
    margin-bottom: 5px;
  }

  .diary-item__close {
    text-align: end;
    font-size: 20px;
    cursor: pointer;
  }

  .diary-item__auther {
    color: tomato;
  }

  .diary-item__content {
    font-weight: bold;
  }

  .diary-item__date {
    color: gray;
  }

  box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.5);
`;

const LineBorder = styled.div`
  border-bottom: 2px solid gray;
  margin: 10px 0;
`;
