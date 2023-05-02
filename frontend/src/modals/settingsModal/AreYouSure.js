import React, { useEffect } from 'react';
import './AreYouSure.css';

import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/thunks/settings/deleteUser';
import  { resetUserDeleted } from '../../redux/slices/settingsSlice';

function AreYouSure(props) {
  const dispatch = useDispatch();
  const deleteUserData = useSelector(state => state.modals.settingsModal.data);
  const userDeleted = useSelector(state => state.settings.userDeleted);

  useEffect(() => {
    dispatch(resetUserDeleted());
  }, []);

  if (userDeleted) {
    return (
      <div className='are-you-sure'>
          <p className='user-deleted'>User Deleted Successfully!</p>
      </div>
    )
  }
  return (
    <div className='are-you-sure'>
        <p>Are You Sure? <button onClick={() => dispatch(deleteUser({id: deleteUserData}))}>Yes, I'm Sure</button></p>
    </div>
  )
}

export default AreYouSure