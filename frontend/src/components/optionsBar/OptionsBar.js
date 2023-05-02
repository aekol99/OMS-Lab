import React from 'react';
import './OptionsBar.css';
import { BsSearch } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowUp, IoIosArrowDown  } from 'react-icons/io';

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProjectTasksMenu from '../projectTasksMenu/ProjectTasksMenu';
import BoardsMenu from '../boardsMenu/BoardsMenu';

import NewBoardModal from '../../modals/newBoardModal/NewBoardModal';
import { setNewBoardModal } from '../../redux/slices/modalsSlice';
import { setProjectLastUpdates } from '../../redux/thunks/boards/setProjectLastUpdates';
import { getProjectInfos } from '../../redux/thunks/projects/getProjectInfos';

function OptionsBar() {
    const params = useParams();
    const board = params.bid;
    const taskTab = params.tab;

    const projectInfos = useSelector(state => state.boards.projectInfos);

    const [projectTasksMenuOpened, setProjectTasksMenuOpened] = useState(true);
    const [boardsMenuOpened, setBoardsMenuOpened] = useState(true);

    const dispatch = useDispatch();
    const newBoardModal = useSelector(state => state.modals.newBoardModal);

    const fixedOptionsBar = useRef(null);
    useEffect(() => {
        let width = document.querySelector('.options-bar').clientWidth;
        fixedOptionsBar.current.style.minWidth = width + 'px';
        const getProjectInfosPromise = dispatch(getProjectInfos({projectid: params.pid}));

        return () => {
            getProjectInfosPromise.abort();
        }
    }, []);
    
    useEffect(() => {
        const setProjectLastUpdatesPromise = dispatch(setProjectLastUpdates({ userid: localStorage.getItem("loggedin"), projectid: params.pid, taskTab, board}));

        return setProjectLastUpdatesPromise.abort();
    }, [board, taskTab]);

    return (
        <div className='fixed-options-bar' ref={fixedOptionsBar}>
            <div className='options-bar'>
                <div className='project'>
                    <p>{projectInfos.length != 0 ? projectInfos.name : ""}</p>
                    <p title={projectInfos.length != 0 ? projectInfos.description : ""}>{projectInfos.length != 0 ? projectInfos.description.slice(0, 25) + '...' : ""}</p>
                </div>
                <div className='search'>
                    <form>
                        <span><BsSearch /></span>
                        <input type="text" placeholder='search board' />
                    </form>
                    <button onClick={() => dispatch(setNewBoardModal({state: true}))}><AiOutlinePlus /></button>
                </div>
                <div className='project-tasks'>
                    <p onClick={() => setProjectTasksMenuOpened(!projectTasksMenuOpened)}><span>{projectTasksMenuOpened ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>PROJECT TASKS</p>
                    {projectTasksMenuOpened ? <ProjectTasksMenu /> : null}
                </div>
                <div className='boards'>
                    <p onClick={() => setBoardsMenuOpened(!boardsMenuOpened)}><span>{boardsMenuOpened ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>BOARDS</p>
                    {boardsMenuOpened ? <BoardsMenu /> : null}
                </div>
            </div>
            
            <NewBoardModal state={newBoardModal.state} />
        </div>
    )
}

export default OptionsBar