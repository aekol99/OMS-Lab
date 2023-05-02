import React from 'react';
import './HomeProject.css';
import { profileImgColors } from '../../data/profileImgColors';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { useDispatch } from 'react-redux';

import { setDeleteProjectModal } from '../../redux/slices/modalsSlice';

import { Link } from 'react-router-dom';

function HomeProject(props) {
  const dispatch = useDispatch();
  
  return (
    <div className='column'>
      <div className='home-project'>
        <div className='home-project-header'>
          <span className='img' title={`${props.data.owner.lastname} ${props.data.owner.firstname}`} style={{backgroundColor: profileImgColors[props.data.owner.firstname[0]]}}>{props.data.owner.firstname[0]}</span>

          {props.data.owner.id == localStorage.getItem('loggedin') ? <div className='delete-btn' onClick={() => dispatch(setDeleteProjectModal({state: true, projectid: props.data.id, projectName: props.data.name}))}><RiDeleteBin6Line /></div> : null}

        </div>
          <Link to={`/project/${props.data.id}/${props.data.board}/${props.data.lastTaskTab}`}>{props.data.name}</Link>
          <span className='created-at'>Created at {props.data.created_at.split('T')[0]}</span>
          <p title={props.data.description}>{props.data.description.length <= 28 ? props.data.description : props.data.description.slice(0,24) + '...'}</p>
      </div>
    </div>
  )
}

export default HomeProject