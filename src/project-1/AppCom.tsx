import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DiaryEditor, { StateProps } from './DiaryEditor';
import DiaryList from './DiaryList';

export type StateAddDateProps = StateProps & {
  id: string;
  created_date: number;
};

function AppCom() {
  const [dataList, setDataList] = useState<StateAddDateProps[]>([]);

  const bringData = (data: StateProps) => {
    const newData = {
      id: uuidv4(),
      author: data.author,
      content: data.content,
      emotion: data.emotion,
      created_date: new Date().getTime(),
    };
    setDataList([newData, ...dataList]);
  };

  const deleteData = (dataId: StateAddDateProps['id']) => {
    setDataList((currList) => currList.filter((data) => data.id !== dataId));
  };

  return (
    <div>
      <DiaryEditor bringData={bringData} />
      <DiaryList dataList={dataList} deleteData={deleteData} />
    </div>
  );
}

export default AppCom;
