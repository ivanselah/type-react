import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DiaryEditor, { StateProps } from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';

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

  const getData = useCallback(async () => {
    let initDataList: StateAddDateProps[] = [];
    const response = await (await fetch('https://jsonplaceholder.typicode.com/comments')).json();
    const cutData: InitSateProps[] = response.slice(0, 20);
    cutData.forEach((data) => {
      const randomEmotion = Math.floor(Math.random() * 5) + 1;
      initDataList.push(createNewObject({ title: data.email, content: data.body, emotion: randomEmotion }));
    });
    setDataList(initDataList);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  /*
   * useCallback => 으로 감싸고 디펜던시에 dataList를 넣고 삭제버튼을 눌러도 재 랜더된다.
     왜냐하면 dataList가 변경되기 때문에 만약 디펜던시에 dataList를 빼고 한다면 함수형 업데이트를 활용해서 
     함수가 다시 생성되지 않아도 최신 dataList를 받아 업데이트 하도록한다.
   */
  const bringData = useCallback(
    (data: StateProps) => {
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
        setDataList((data) => [newData, ...data]);
      }
    },
    [modifyModalVisible]
  );

  const deleteData = useCallback((dataId: StateAddDateProps['id']) => {
    setDataList((currList) => currList.filter((data) => data.id !== dataId));
  }, []);

  const modifyVisibleToggle = () => {
    setModifyModalVisible((visible) => !visible);
  };

  const modifyData = useCallback((data: StateAddDateProps) => {
    targetId.current = data.id;
    setTargetData(data);
    modifyVisibleToggle();
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = dataList.filter((data) => data.emotion >= 3).length;
    const badCount = dataList.length - goodCount;
    const goodRatio = (goodCount / dataList.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [dataList]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div>
      <OptimizeTest />
      <DiaryEditor bringData={bringData} modifyModalVisible={modifyModalVisible} targetData={targetData!} />
      <div>{dataList.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList dataList={dataList} deleteData={deleteData} modifyData={modifyData} />
    </div>
  );
}

export default AppCom;
