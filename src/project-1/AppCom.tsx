import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DiaryEditor, { StateProps } from './DiaryEditor';
import DiaryList from './DiaryList';

export type StateAddDateProps = StateProps & {
  id: string;
  created_date: number;
};

type InitSateProps = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

// https://jsonplaceholder.typicode.com/comments

function AppCom() {
  const [dataList, setDataList] = useState<StateAddDateProps[]>([]);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [targetData, setTargetData] = useState<StateAddDateProps>();
  const targetId = useRef<string>();

  const createNewObject = (data: StateProps): StateAddDateProps => {
    const newData = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      created_date: new Date().getTime(),
    };
    return newData;
  };

  useEffect(() => {
    const getData = async () => {
      let initDataList: StateAddDateProps[] = [];
      const response = await (await fetch('https://jsonplaceholder.typicode.com/comments')).json();
      const cutData: InitSateProps[] = response.slice(0, 20);
      cutData.forEach((data) => {
        const randomEmotion = Math.floor(Math.random() * 5) + 1;
        initDataList.push(createNewObject({ title: data.email, content: data.body, emotion: randomEmotion }));
      });
      setDataList(initDataList);
    };
    getData();
  }, []);

  const bringData = (data: StateProps) => {
    const newData = createNewObject(data);
    if (modifyModalVisible) {
      setDataList((currList) => {
        return currList.map((item) => {
          if (item.id === targetId.current) {
            return {
              ...item,
              title: data.title,
              content: data.content,
              emotion: data.emotion,
              created_date: new Date().getTime(),
            };
          } else {
            return item;
          }
        });
      });
      modifyVisibleToggle();
    } else {
      setDataList([newData, ...dataList]);
    }
  };

  const deleteData = (dataId: StateAddDateProps['id']) => {
    setDataList((currList) => currList.filter((data) => data.id !== dataId));
  };

  const modifyVisibleToggle = () => {
    setModifyModalVisible((visible) => !visible);
  };

  const modifyData = (dataId: StateAddDateProps['id']) => {
    const targetData = dataList.find((data) => data.id === dataId);
    targetId.current = dataId;
    setTargetData(targetData);
    modifyVisibleToggle();
  };

  return (
    <div>
      <DiaryEditor bringData={bringData} modifyModalVisible={modifyModalVisible} targetData={targetData!} />
      <DiaryList dataList={dataList} deleteData={deleteData} modifyData={modifyData} />
    </div>
  );
}

export default AppCom;
