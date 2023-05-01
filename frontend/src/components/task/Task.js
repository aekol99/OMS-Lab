import React from 'react';
import './Task.css';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { useSelector, useDispatch } from 'react-redux';

import { setDaggedTaskId } from '../../redux/slices/appSlice';
import { setDraggedFrom } from '../../redux/slices/appSlice';
import { setMoveAfterTaskID } from '../../redux/slices/projectSlice';
import { setOpenedTaskModal } from '../../redux/slices/modalsSlice';
import { setDeleteTaskModal } from '../../redux/slices/modalsSlice';

function Task(props) {
    const moveAfterTaskID = useSelector(state => state.project.moveAfterTaskID);

    const dispatch = useDispatch();

    const dragStart = (e) => {
        setTimeout(()=>{e.target.classList.add("dragged-task")},0)
        dispatch(setDaggedTaskId(props.taskId));
        dispatch(setDraggedFrom(props.taskFrom));
    }
    
    const dragEnd = (e) => {
        e.target.classList.remove("dragged-task");
        dispatch(setDaggedTaskId(null));
        dispatch(setDraggedFrom(null));

        dispatch(setMoveAfterTaskID({target: null, where: 'after'}));
        console.log("ended");
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(setDeleteTaskModal({state: true, taskid: props.taskId, taskName: props.taskName}));
    }

  return  (<>
            {(moveAfterTaskID.target === props.taskId && moveAfterTaskID.where === 'begin') ? <div style={{backgroundColor: "#ffffff50"}} className='task' ></div> : null}
            <div style={{backgroundColor: props.color}} className='task' id={props.taskId} draggable={true} onDragStart={dragStart} onDragEnd={dragEnd} onClick={() => dispatch(setOpenedTaskModal({state: true, id: props.taskId}))}>
                <div className='task-body'>
                    {props.taskName}
                </div>
                <div className='task-footer'>
                    <div className='delete-btn' onClick={handleDelete}><RiDeleteBin6Line /></div>
                </div>
            </div>
            {(moveAfterTaskID.target === props.taskId && moveAfterTaskID.where === 'after') ? <div style={{backgroundColor: "#ffffff50"}} className='task' ></div> : null}
          </>)

}

export default Task