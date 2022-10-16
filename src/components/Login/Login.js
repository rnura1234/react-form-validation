import React, { useContext, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

//Email Reducer function
const emailReducer = (state, action) => {
   if (action.type === 'USER_INPUT') {
      return { value: action.value, isValid: action.value.includes('@') };
   }
   if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.includes('@') };
   }
   return { value: '', isValid: true };
};

//Password Reducer Function
const passReducer = (state, action) => {
   if (action.type === 'INPUT_ENTER') {
      return { value: action.value, isValid: action.value.trim().length >= 6 };
   }
   if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.trim().length >= 6 };
   }
   return { value: '', isValid: null };
};
const Login = (props) => {
   const emailRef = useRef();
   const passRef = useRef();
   const ctx = useContext(AuthContext);
   //state management using
   //a)useState() hook
   const [formIsValid, setFormIsValid] = useState(false);

   //b) useReducer()
   //email reducer
   const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: '',
      isValid: null,
   });
   //password reducer
   const [passState, dispatchPass] = useReducer(passReducer, {
      value: '',
      isValid: null,
   });

   //rename object key using destructuring
   const { isValid: emailIsValid } = emailState;
   const { isValid: passIsValid } = passState;
   //email onchange handler function
   const emailChangeHandler = (event) => {
      dispatchEmail({ type: 'USER_INPUT', value: event.target.value });

      setFormIsValid(emailState.isValid && passState.isValid);
   };

   //password onChange handler function
   const passwordChangeHandler = (event) => {
      dispatchPass({ type: 'INPUT_ENTER', value: event.target.value });

      setFormIsValid(emailIsValid && passIsValid);
   };
   //email onBlur() handler function
   const validateEmailHandler = () => {
      dispatchEmail({ type: 'INPUT_BLUR' });
   };
   //password onBlur() handler function
   const validatePasswordHandler = () => {
      dispatchPass({ type: 'INPUT_BLUR' });
   };

   //form submit handler function
   const submitHandler = (event) => {
      event.preventDefault();
      if (formIsValid) {
         ctx.onLogin(emailState.value, emailState.value);
      } else if (!emailIsValid) {
         emailRef.current.focus();
      } else {
         passRef.current.focus();
      }
   };

   return (
      <Card className={classes.login}>
         <form onSubmit={submitHandler}>
            <Input
               label='E-mail'
               type='email'
               ref={emailRef}
               id='email'
               isValid={emailIsValid}
               value={emailState.value}
               onChange={emailChangeHandler}
               onBlur={validateEmailHandler}
            />
            <Input
               title='Password'
               label='password'
               ref={passRef}
               isValid={passIsValid}
               value={passState.value}
               onChange={passwordChangeHandler}
               onBlur={validatePasswordHandler}
            />
            <div className=''></div>
            <div className={classes.actions}>
               <Button type='submit' className={classes.btn}>
                  Login
               </Button>
            </div>
         </form>
      </Card>
   );
};

export default Login;
