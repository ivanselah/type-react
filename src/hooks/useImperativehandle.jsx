import React, { useState, useEffect, useReducer, useContext, useRef, useImperativeHandle } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/AuthContext';

function emailReducer(state, action) {
  switch (action.type) {
    case 'USER_INPUT': {
      return { value: action.value, isValid: action.value.includes('@') };
    }
    case 'INPUT_BLUR': {
      return { value: state.value, isValid: state.value.includes('@') };
    }
    default:
      return { value: '', isValid: false };
  }
}

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'PASSWORD_INPUT': {
      return { value: action.value, isValid: action.value.trim().length > 6 };
    }
    case 'PASSWORD_BLUR': {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    default:
      return { value: '', isValid: false };
  }
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: false });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: false });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordISValid } = passwordState;

  const { onLogin } = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordISValid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordISValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <CustomInput
          ref={emailInputRef}
          id='email' //
          label='E-Mail'
          type='email'
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <CustomInput
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button submit={onLogin} type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

const CustomInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={inputRef} type={props.type} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
    </div>
  );
});
