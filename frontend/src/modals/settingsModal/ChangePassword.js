import React, { useRef, useEffect } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineLoading } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';

import { changePassword } from '../../redux/thunks/settings/changePassword';

import { resetPasswordChnaged } from '../../redux/slices/settingsSlice';
import { resetError } from '../../redux/slices/settingsSlice';

function ChangePassword() {
    const dispatch = useDispatch();
    const oldpassword = useRef("");
    const newpassword = useRef("");
    const passwordChangedMsg = useRef(null);
    const passwordNotChangedMsgMsg = useRef(null);
    
    const passwordChanged = useSelector(state => state.settings.passwordChanged);
    const passwordChangedError = useSelector(state => state.settings.error);

    const loading = useSelector(state => state.settings.loading);
    
    useEffect(() => {
        if (passwordChanged) {
            oldpassword.current.value = "";
            newpassword.current.value = "";
            passwordNotChangedMsgMsg.current.classList.remove('done');
            passwordChangedMsg.current.classList.add('done');
            dispatch(resetPasswordChnaged());
        }
    
        if (passwordChangedError) {
            passwordChangedMsg.current.classList.remove('done');
            passwordNotChangedMsgMsg.current.classList.add('done');
            dispatch(resetError());
        }
    }, [passwordChanged, passwordChangedError]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword({id: localStorage.getItem("loggedin"), oldpassword: oldpassword.current.value, newpassword: newpassword.current.value}));
    }
  return (
    <form className='change-password' onSubmit={handleSubmit}>
        <span className='password-changed-msg' ref={passwordChangedMsg}>Password Changed Successfully</span>
        <span className='password-not-changed-msg' ref={passwordNotChangedMsgMsg}>Sorry, Something Went Wrong</span>
        <div className='form-group'>
            <label>Old password</label>
            <input type="password" ref={oldpassword} />
        </div>
        <div className='form-group'>
            <label>New password</label>
            <input type="password" ref={newpassword} />
        </div>
        <button type='submit'>{loading ? <span className='loading'><AiOutlineLoading /></span> : <RiLockPasswordLine />} Change</button>
    </form>
  )
}

export default ChangePassword