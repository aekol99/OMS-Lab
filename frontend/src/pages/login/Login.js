import React from 'react';
import './Login.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../redux/thunks/auth/login';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const error = useSelector(state => state.auth.error );

    const dispatch = useDispatch();

    const tryLogin = (e) => {
        e.preventDefault();
        dispatch(login({username, password}));
    }

  return (
    <div className='login'>
        <form onSubmit={tryLogin}>
            <div className='login-header'>
              <img className='logo' src="/logo.png" alt="" />
              <h1>OMSLab</h1>
            </div>
            {error ? <span className='login-error'>{error}</span> : null}
            <label htmlFor='username'>Username:</label>
            <input type="text" name="username" onChange={(e) => { setUsername(e.target.value) }} />
            <label htmlFor='password'>Password:</label>
            <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;