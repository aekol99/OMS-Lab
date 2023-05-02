import React from 'react';
import { profileImgColors } from '../../data/profileImgColors';

import { useDispatch } from 'react-redux';
import { addTeamMember } from '../../redux/slices/projectsSlice';
import { deleteTeamMember } from '../../redux/slices/projectsSlice';

function TeamMember(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (props.type === "searched") {
      dispatch(addTeamMember(props.data));
    }else{
      dispatch(deleteTeamMember(props.data));
    }
  }
  return (
    <li onClick={handleClick}>
        <div className='user-infos'>
        <span className='img' style={{backgroundColor: profileImgColors['a']}}>{props.data.firstname[0]}</span>
            {`${props.data.lastname} ${props.data.firstname}`}
        </div>
    </li>
  )
}

export default TeamMember