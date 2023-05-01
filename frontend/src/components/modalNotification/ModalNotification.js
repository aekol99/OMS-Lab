import React from 'react';
import './ModalNotification.css';
import { profileImgColors } from '../../data/profileImgColors';

function ModalNotification(props) {
  return (
    <div className='modal-notification'>
        <span className='img' style={{backgroundColor: profileImgColors[props.data.maker.firstname[0]]}}>{props.data.maker.firstname[0]}</span>
        <div className='notification-content'>
            <span>{props.data.maker.lastname} {props.data.maker.firstname}</span>
            <span>{props.data.content}</span>
        </div>
    </div>
  )
}

export default ModalNotification