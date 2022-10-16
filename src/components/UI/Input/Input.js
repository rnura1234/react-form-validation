import React, { useImperativeHandle, useRef } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
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
      <React.Fragment>
         <div
            className={`${classes.control} ${
               props.isValid === false ? classes.invalid : ''
            }`}
         >
            <label htmlFor={props.id}>{props.label}</label>
            <input
               type={props.type}
               ref={inputRef}
               id={props.id}
               value={props.value}
               onChange={props.onChange}
               onBlur={props.onChange}
            />
         </div>
      </React.Fragment>
   );
});

export default Input;
