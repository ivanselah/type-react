import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { DiaryDataContext, StateAddDateProps } from './AppCom';
import DiaryItem from './DiaryItem';

export type FuncType = (id: StateAddDateProps['id']) => void;
export type DataFuncType = (data: StateAddDateProps) => void;

function DiaryList() {
  const { dataList } = useContext(DiaryDataContext);
  useEffect(() => {
    console.log('DiaryList Update');
  });
  return (
    <DiaryListContainer>
      <h2 className="diary-list__title">코로나 격리 일기</h2>
      <h3>{`총 ${dataList.length}개`}</h3>
      <br />
      <ul>
        {dataList.map((data) => (
          <DiaryItem key={data.id} data={data} />
        ))}
      </ul>
    </DiaryListContainer>
  );
}

export default DiaryList;

const DiaryListContainer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin-top: 20px;
  .diary-list__title {
    font-size: 30px;
    text-align: center;
  }
`;
