import React from 'react';
import TaskOptions from './TaskOptions';
import TaskAssignee from './TaskAssignee';

import { useSelector } from 'react-redux';

function ModalBodySwitcher() {
    const activeSection = useSelector(state => state.task.activeSection);

    if (activeSection == "task-assignee") {
        return (<TaskAssignee />)
    }
    return (<TaskOptions />)
}

export default ModalBodySwitcher