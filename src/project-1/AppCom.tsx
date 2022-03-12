import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DiaryEditor, { StateProps } from './DiaryEditor';
import DiaryList from './DiaryList';

export type StateAddDateProps = StateProps & {
  id: string;
  created_date: number;
};

function AppCom() {
  const [dataList, setDataList] = useState<StateAddDateProps[]>([]);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [targetData, setTargetData] = useState<StateAddDateProps>();
  const targetId = useRef<string>();

  const bringData = (data: StateProps) => {
    const newData = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      created_date: new Date().getTime(),
    };
    if (modifyModalVisible) {
      setDataList((currList) => {
        return currList.map((item) => {
          if (item.id === targetId.current) {
            return {
              ...item,
              title: data.title,
              content: data.content,
              emotion: data.emotion,
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
