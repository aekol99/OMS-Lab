import React, { useEffect } from 'react';
import './BoardsMenu.css';
import { GoDiffAdded } from 'react-icons/go';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BoardItem from '../boardItem/BoardItem';

import RenameBoardModal from '../../modals/renameBoardModal/RenameBoardModal';
import DeleteBoardModal from '../../modals/deleteBoardModal/DeleteBoardModal';
import { setNewBoardModal } from '../../redux/slices/modalsSlice';

import { getAllBoards } from '../../redux/thunks/boards/getAllBoards';

function BoardsMenu() {
    const dispatch = useDispatch();
    const params = useParams();
    const boards = useSelector(state => state.boards.boards);

    const renameBoardModal = useSelector(state => state.modals.renameBoardModal);
    const deleteBoardModal = useSelector(state => state.modals.deleteBoardModal);

    useEffect(() => {
        const getAllBoardsPromise = dispatch(getAllBoards({id: params.pid}));

        return () => {
            getAllBoardsPromise.abort();
        }
    }, []);

    const afterDeleteTarget = (index) => {
        let target;
        if (boards.length === 1) {
            target = null;
        }else{
            if (index === 0) {
                target = boards[index + 1].id;
            }else if(index === boards.length - 1) {
                target = boards[index - 1].id;
            }else{
                target = boards[index - 1].id;
            }
        }
        return target;
    }
    return (
    <ul>
        <li className='new-board' onClick={() => dispatch(setNewBoardModal({state: true}))}>
            <span className='icon'><GoDiffAdded /></span>
            Create Board
        </li>

        {boards.map((board, i) => <BoardItem key={i} bid={board.id} name={board.name} path={`/project/${params.pid}/${board.id}/${params.tab}`} afterDeleteTarget={afterDeleteTarget(i)} />)}


        <RenameBoardModal state={renameBoardModal.state} />
        <DeleteBoardModal state={deleteBoardModal.state} />
    </ul>
    )
}

export default BoardsMenu