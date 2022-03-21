import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DiaryStateContext } from './AppCom';

export type StateProps = {
  title: string;
  content: string;
  emotion: number;
};

function DiaryEditor() {
  const [state, setState] = useState<StateProps>({
    title: '',
    content: '',
    emotion: 1,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { bringData, modifyModalVisible, targetData } = useContext(DiaryStateContext);

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      currentTarget: { value, name },
    } = event;
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    if (modifyModalVisible && targetData) {
      setState({
        title: targetData.title,
        content: targetData.content,
        emotion: targetData.emotion,
      });
    }
  }, [modifyModalVisible, targetData]);

  useEffect(() => {
    console.log('Diary Editor 렌더');
  });

  const onSubmit = () => {
    const input = inputRef.current?.value;
    const textarea = textareaRef.current?.value;
    if (!input || !textarea) {
      alert('입력 값이 없습니다.');
      return;
    }
    if (input.length < 5) {
      alert('5글자 이상 입력해주세요.');
      inputRef.current.focus();
    } else if (textarea.length < 10) {
      alert('10글자 이상 입력해주세요.');
      textareaRef.current.focus();
    } else {
      if (bringData) bringData(state);
      alert('저장완료');
      setState({
        title: '',
        content: '',
        emotion: 1,
      });
    }
  };

  return (
    <DiaryEditorContainer>
      <h2>오늘의일기</h2>
      <div>
        <input ref={inputRef} name="title" value={state.title} onChange={onChangeHandle} />
      </div>
      <div>
        <textarea ref={textareaRef} name="content" value={state.content} onChange={onChangeHandle} />
      </div>
      <EmotionContainer>
        <div>감정점수 :</div>
        <select name="emotion" value={state.emotion} onChange={onChangeHandle}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </EmotionContainer>
      <div>
        <button onClick={onSubmit}>{modifyModalVisible ? '수정하기' : '저장하기'}</button>
      </div>
    </DiaryEditorContainer>
  );
}

export default memo(DiaryEditor);

const DiaryEditorContainer = styled.div`
  border: 1px solid gray;
  text-align: center;
  padding: 20px;

  input,
  textarea {
    margin-bottom: 20px;
    width: 500px;
    padding: 10px;
    margin: 10px auto;
  }
  textarea {
    height: 150px;
  }
`;

const EmotionContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  margin: 0 auto;

  select {
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
    margin: 10px auto;
  }
`;
