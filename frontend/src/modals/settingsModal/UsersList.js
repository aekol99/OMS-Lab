import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';

import { getAllUsers } from '../../redux/thunks/settings/getAllUsers';
import { setSettingsModalSection } from '../../redux/slices/modalsSlice';
import { searchUsers } from '../../redux/thunks/settings/searchUsers';

import SearchUser from './SearchUser';

function UsersList(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const loading = useSelector(state => state.settings.loading);
    const allUsers = useSelector(state => state.settings.allUsers);

    return (
    <form className='users-list'>
        <button onClick={() => dispatch(setSettingsModalSection({section: "add-user"}))}><FaUser /> Add user</button>
        <p>Search users</p>
        <div className='search-bar'>
            <input type="text" onChange={(e) => dispatch(searchUsers({pattern: e.target.value}))} />
            <BsSearch />
        </div>
        <ul>
            {allUsers ? allUsers.filter(user => user.id != localStorage.getItem('loggedin')).map((user, i) => <SearchUser key={i} data={user} />) : loading ? <li>Please wait, where loading users</li> : null }
        </ul>
    </form>
  )
}

export default UsersList