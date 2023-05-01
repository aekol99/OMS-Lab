import React from 'react';
import './BoardItem.css';
import { BsArchive } from 'react-icons/bs';
import { BiRename } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setRenameBoardModal } from '../../redux/slices/modalsSlice';
import { setDeleteBoardModal } from '../../redux/slices/modalsSlice';

function BoardItem(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const isActiveTab = (boardid) => {
        return (Number(params.bid) === Number(boardid)) ? 'board-name active' :'board-name';
    }
    return (
        <li>
            <Link to={props.path} className={isActiveTab(props.bid)}>
                <span className='icon'><BsArchive /></span>
                {props.name}
            </Link>
            <div className='more'>
                <span onClick={() => dispatch(setRenameBoardModal({state: true, boardid: props.bid, boardName: props.name}))}><BiRename /></span>
                <span onClick={() => dispatch(setDeleteBoardModal({state: true, boardid: props.bid, boardName: props.name, afterDeleteTarget: props.afterDeleteTarget}))}><RiDeleteBin6Line /></span>
            </div>
        </li>
    )
}

export default BoardItem