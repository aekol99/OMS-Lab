import React, { useEffect } from 'react';
import { profileImgColors } from '../../data/profileImgColors';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTaskComment } from '../../redux/thunks/task/deleteTaskComment';
import { resetCommentDeleted } from '../../redux/slices/taskSlice';

function TaskComment(props) {
  const dispatch = useDispatch();
  const commentDeleted = useSelector(state => state.task.commentDeleted);
  const handleDeleteComment = () => {
    dispatch(deleteTaskComment({commentid: props.data.id}));
  }

  useEffect(() => {
    if (commentDeleted) {
      dispatch(resetCommentDeleted());
    }
  }, [commentDeleted]);
  return (
    <div className='task-comment'>
        <span className='img' style={{backgroundColor: profileImgColors[props.data.owner.firstname[0]]}}>{props.data.owner.firstname[0]}</span>
        <div className='user-infos'>
          <div className='header'>
            <p>{props.data.owner.lastname} {props.data.owner.firstname}</p>
            {props.data.userid == localStorage.getItem('loggedin') ? <span onClick={handleDeleteComment}><RiDeleteBin6Line /></span> : null}
          </div>
          <small>{props.data.created_at.split('T')[0]} at {props.data.created_at.split('T')[1].split('.')[0]}</small>
          <p>{props.data.content}</p>
        </div>
    </div>
  )
}

export default TaskComment