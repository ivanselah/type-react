import { Dispatch, Action } from "redux";

const GET_COMMENTS = "GET_COMMENTS";
const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
const GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL";
const MOVE_TO_HOME = "MOVE_TO_HOME";

type CommentsActionProps = {
  type: "GET_COMMENTS" | "GET_COMMENTS_SUCCESS" | "GET_COMMENTS_FAIL" | "MOVE_TO_HOME";
  res?: any;
  fail?: any;
  move?: boolean;
};

export type PlaceholderProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  move?: boolean;
};

/*
 *  store => middleware(store.dispatch, store.getState) => next
 */

const useFetch = async (url: string): Promise<PlaceholderProps> => {
  return await (await fetch(url)).json();
};

// action function
export const getComments = () => async (dispatch: Dispatch<Action>, getState: () => Action) => {
  dispatch({ type: GET_COMMENTS });
  try {
    const res = await useFetch("https://jsonplaceholder.typicode.com/todos/1");
    dispatch({ type: GET_COMMENTS_SUCCESS, res });
  } catch (e) {
    dispatch({ type: GET_COMMENTS_FAIL, fail });
  }
};

export const goToHome = () => (dispatch: Dispatch<Action>, getState: () => Action) => {
  dispatch({ type: MOVE_TO_HOME, move: true });
};

const initialState = {
  userId: 0,
  id: 0,
  title: "jsonplaceholder",
  completed: true,
};

// reducer
export default function placeholder(state: PlaceholderProps = initialState, action: CommentsActionProps) {
  switch (action.type) {
    case GET_COMMENTS:
      console.log("fetch start");
      return state;
    case GET_COMMENTS_SUCCESS:
      return { ...action.res };
    case GET_COMMENTS_FAIL:
      console.log(action.fail);
      return state;
    case MOVE_TO_HOME:
      return {
        ...state,
        move: state.move ? !state.move : action.move,
      };
    default:
      return state;
  }
}
