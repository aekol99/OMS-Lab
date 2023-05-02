import React from 'react';
import './HomeNotification.css';
import { profileImgColors } from '../../data/profileImgColors';

function HomeNotification(props) {
  return (
    <div className='home-notification'>
        <span className='img' style={{backgroundColor: profileImgColors[props.data.maker.firstname[0]]}}>{props.data.maker.firstname[0]}</span>
        <div className='notification-content'>
            <span>{props.data.maker.lastname} {props.data.maker.firstname}</span>
            <span>{props.data.content}</span>
        </div>
    </div>
  )
}

export default HomeNotification