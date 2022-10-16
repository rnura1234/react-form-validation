import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

import classes from './Navigation.module.css';

const Navigation = () => {
   const ctx = useContext(AuthContext);
   return (
      <nav className={classes.nav}>
         <ul>
            {ctx.isLoggedIn && (
               <li>
                  <a href='/'>Users</a>
               </li>
            )}
            {ctx.isLoggedIn && (
               <li>
                  <a href='/'>Admin</a>
               </li>
            )}
            {ctx.isLoggedIn && (
               <li>
                  <Button onClick={ctx.onLogout}>Logout</Button>
               </li>
            )}
         </ul>
      </nav>
   );
};

export default Navigation;
