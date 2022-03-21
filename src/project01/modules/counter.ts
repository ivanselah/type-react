const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const SET_DIFF = "counter/SET_DIFF";

export type CounterProps = { counter: number; diff: number };
type ActionProps = {
  type: "counter/INCREASE" | "counter/DECREASE" | "counter/SET_DIFF";
  diff?: number;
};

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const setDiff = (diff: number) => ({ type: SET_DIFF, diff });

const initialState = { counter: 0, diff: 1 };

export default function counter(state: CounterProps = initialState, action: ActionProps) {
  switch (action.type) {
    case INCREASE:
      console.log("T");
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };
    default:
      return state;
  }
}
