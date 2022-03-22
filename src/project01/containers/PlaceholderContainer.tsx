import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getComments, goToHome, PlaceholderProps } from "../modules/pleaceholder";
import { I_AllStateProps } from "../modules/rootReducer";

function PlaceholderContainer() {
  const dispatch = useDispatch();
  const res = useSelector((state: I_AllStateProps) => state.placeholder, shallowEqual);

  const onfetchComments = useCallback(() => {
    dispatch(getComments());
  }, [dispatch]);

  return <Placeholder onfetchComments={onfetchComments} dispatch={dispatch} res={res} />;
}

export default PlaceholderContainer;

function Placeholder({
  onfetchComments,
  dispatch,
  res,
}: {
  onfetchComments: () => void;
  dispatch: any;
  res: PlaceholderProps;
}) {
  const navigator = useNavigate();

  useEffect(() => {
    onfetchComments();
  }, [onfetchComments]);

  useEffect(() => {
    if (res.move) {
      navigator(`/${res.id}`, { replace: true });
    } else {
      navigator("/", { replace: true });
    }
  }, [res.id, res.move, navigator]);

  return (
    <React.Fragment>
      {!res.completed ? (
        <div style={{ display: "flex" }}>
          <div>{res.title}</div>
          <button onClick={() => dispatch(goToHome())}>home</button>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </React.Fragment>
  );
}
