import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectMembers } from '../../redux/thunks/project/getProjectMembers';
import ProjectMember from './ProjectMember';

function TaskAssignee() {
  const params = useParams();
  const dispatch = useDispatch();
  const projectMembers = useSelector(state => state.project.projectMembers);
  console.log(projectMembers);
  useEffect(() => {
    const projectMembersPromise = dispatch(getProjectMembers({projectid: params.pid}));

    return () => {
      projectMembersPromise.abort();
    }
  }, []);
  return (
    <div className='task-assignee'>
      <ul>
        {projectMembers ? projectMembers.map((member, i) => <ProjectMember key={i} data={member} />) : null}
      </ul>
    </div>
  )
}

export default TaskAssignee