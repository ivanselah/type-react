import React, { useState } from 'react';
import styled from 'styled-components';

type StateProps = {
  author: string;
  content: string;
  emotion: number;
};

function DiaryEditor() {
  const [state, setState] = useState<StateProps>({
    author: '',
    content: '',
    emotion: 1,
  });

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      currentTarget: { value, name },
    } = event;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = () => {
    alert('저장완료');
  };

  return (
    <DiaryEditorContainer>
      <h2>오늘의일기</h2>
      <div>
        <input name="author" value={state.author} onChange={onChangeHandle} />
      </div>
      <div>
        <textarea name="content" value={state.content} onChange={onChangeHandle} />
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
        <button onClick={onSubmit}>저장하기</button>
      </div>
    </DiaryEditorContainer>
  );
}

export default DiaryEditor;

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
