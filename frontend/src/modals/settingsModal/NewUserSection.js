import React, { useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { newUser } from '../../redux/thunks/settings/newUser';

import { resetUserCreated } from '../../redux/slices/settingsSlice';
import { resetError } from '../../redux/slices/settingsSlice';

function NewUserSection() {
    const dispatch = useDispatch();
    const userCreated = useSelector(state => state.settings.userCreated);
    const userCreatedError = useSelector(state => state.settings.error);

    const loading = useSelector(state => state.settings.loading);
    
    const username = useRef(null);
    const firstname = useRef(null);
    const lastname = useRef(null);
    const password = useRef(null);
    const userCreatedMsg = useRef(null);
    const userNotCreatedMsg = useRef(null);

    useEffect(() => {
        if (userCreated) {
            username.current.value = "";
            firstname.current.value = "";
            lastname.current.value = "";
            password.current.value = "";
            userNotCreatedMsg.current.classList.remove('done');
            userCreatedMsg.current.classList.add('done');
            dispatch(resetUserCreated());
        }
    
        if (userCreatedError) {
            userCreatedMsg.current.classList.remove('done');
            userNotCreatedMsg.current.classList.add('done');
            dispatch(resetError());
        }
    }, [userCreated, userCreatedError]);

	const handleNewUser = (e) => {
		e.preventDefault();
        let usernameValue = username.current.value;
        let firstnameValue = firstname.current.value;
        let lastnameValue = lastname.current.value;
        let passwordValue = password.current.value;

		dispatch(newUser({username: usernameValue, firstname: firstnameValue, lastname: lastnameValue, password: passwordValue}));
	}
    
  return (
    <form className='add-user' onSubmit={handleNewUser}>
        <span className='user-created-msg' ref={userCreatedMsg}>User Created Successfully</span>
        <span className='user-not-created-msg' ref={userNotCreatedMsg}>Sorry, Something Went Wrong</span>
        <div className='form-group'>
            <label>Username</label>
            <input type="text" ref={username} />
        </div>
        <div className='form-group'>
            <label>First name</label>
            <input type="text" ref={firstname} />
        </div>
        <div className='form-group'>
            <label>Last name</label>
            <input type="text" ref={lastname} />
        </div>
        <div className='form-group'>
            <label>Password</label>
            <input type="password" ref={password} />
        </div>
        <button type='submit'>{loading ? <span className='loading'><AiOutlineLoading /></span> : <FaUser />} Create</button>
    </form>
  )
}

export default NewUserSection