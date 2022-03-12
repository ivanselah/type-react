import styled from 'styled-components';
import { StateAddDateProps } from './AppCom';
import { FuncType } from './DiaryList';

function DiaryItem({ data, deleteData, modifyData }: { data: StateAddDateProps; deleteData: FuncType; modifyData: FuncType }) {
  return (
    <DiaryItemContainer>
      <li>
        <p className="diary-item__title">제목 : {data.title}</p>
        <p className="diary-item__content">내용 : {data.content}</p>
        <p className="diary-item__date">작성 시간 : {new Date(data.created_date).toLocaleString('ko-kr')}</p>
        <LineBorder />
        <p>감정점수 : {data.emotion}</p>
      </li>
      <div>
        <button
          className="diary-item__delete"
          onClick={() => {
            if (window.confirm('정말로 삭제하시겠습니까?')) deleteData(data.id);
          }}
        >
          삭제
        </button>
        <button className="diary-item__modify" onClick={() => modifyData(data.id)}>
          수정
        </button>
      </div>
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

  .diary-item__delete,
  .diary-item__modify {
    width: 50px;
    padding: 5px;
    font-size: 15px;
    cursor: pointer;
    color: #ffffff;
    margin-right: 5px;
  }

  .diary-item__title {
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
