import React from 'react';
import { profileImgColors } from '../../data/profileImgColors';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProjectSearchModal } from '../../redux/slices/modalsSlice';

function SearchProject(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setProjectSearchModal({state: false}));
    navigate(`/project/${props.data.id}/bid1/progress-tracker`);
  }
  return (
    <li>
        <div className='project-infos'>
            <p onClick={handleClick}>{props.data.name}</p>
            <p>{props.data.description}</p>
        </div>
        <span>{props.data.created_at.split('T')[0]}</span>
        <span className='img' title={`${props.data.owner.lastname} ${props.data.owner.firstname}`} style={{backgroundColor: profileImgColors[props.data.owner.firstname[0]]}}>{props.data.owner.firstname[0]}</span>
    </li>
  )
}

export default SearchProject