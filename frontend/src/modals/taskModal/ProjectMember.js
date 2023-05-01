import React, { useEffect } from 'react';
import { profileImgColors } from '../../data/profileImgColors';

import { useSelector, useDispatch } from 'react-redux';

import { setActiveSection } from '../../redux/slices/taskSlice';
import { setTaskInfos } from '../../redux/slices/taskSlice';
import { changeTaskInfos } from '../../redux/thunks/task/changeTaskInfos';
import { resetTaskChanged } from '../../redux/slices/taskSlice';

function ProjectMember(props) {
  const dispatch = useDispatch();
  console.log("project member");

  const taskid = useSelector(state => state.modals.openedTaskModal.id);
  const handleSetAssignee = () => {
    dispatch(setTaskInfos({target: "assignee", value: props.data}));
		dispatch(changeTaskInfos({taskid, target: "assignee", value: props.data.id}));
  }

  const taskChanged = useSelector(state => state.task.taskChanged);
  useEffect(() => {
    if (taskChanged) {
      dispatch(resetTaskChanged());
      dispatch(setActiveSection("options"));
    }
  });
  return (
    <li onClick={handleSetAssignee}>
        <div className='user-infos'>
        <span className='img' style={{backgroundColor: profileImgColors['a']}}>{props.data.firstname[0]}</span>
            {`${props.data.lastname} ${props.data.firstname}`}
        </div>
    </li>
  )
}

export default ProjectMember