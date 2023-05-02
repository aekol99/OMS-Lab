import React from 'react';
import { profileImgColors } from '../../data/profileImgColors';
import { AiOutlineDelete } from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import { setSettingsModalSection } from '../../redux/slices/modalsSlice';

function SearchUser(props) {
  const dispatch = useDispatch();
  return (
    <li>
        <div className='user-infos'>
        <span className='img' style={{backgroundColor: profileImgColors['a']}}>{props.data.firstname[0]}</span>
            {`${props.data.lastname} ${props.data.firstname}`}
        </div>
        <span className='delete-user' onClick={() => dispatch(setSettingsModalSection({section: 'are-you-sure', data: props.data.id}))}>Remove <AiOutlineDelete /></span>
    </li>
  )
}

export default SearchUser