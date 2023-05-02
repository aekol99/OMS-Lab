import React, { useEffect } from 'react';
import './PrimaryBar.css';
import { BsSearch } from 'react-icons/bs';
import { BsArchive } from 'react-icons/bs';
import { SlSettings } from 'react-icons/sl';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineNotification, AiOutlinePlus } from 'react-icons/ai';
import { profileImgColors } from '../../data/profileImgColors';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../redux/slices/authSlice';
// modals
import NotificationsModal from '../../modals/notificationsModal/NotificationsModal';
import NewProjectModal from '../../modals/newProjectModal/NewProjectModal';
import ProjectSearchModal from '../../modals/projectSearchModal/ProjectSearchModal';
import SettingsModal from '../../modals/settingsModal/SettingsModal';
import ProfileModal from '../../modals/profileModal/ProfileModal';
// redux actions
import { setProjectSearchModal, setNewProjectModal, setNotificationsModal, setSettingsModal, setProfileModal } from '../../redux/slices/modalsSlice';

import { getUserInfos } from '../../redux/thunks/profile/getProfileInfos';

function PrimaryBar() {
    const projectSearchModal = useSelector(state => state.modals.projectSearchModal);
    const newProjectModal = useSelector(state => state.modals.newProjectModal);
    const notificationsModal = useSelector(state => state.modals.notificationsModal);
    const settingsModal = useSelector(state => state.modals.settingsModal);
    const profileModal = useSelector(state => state.modals.profileModal);


    const dispatch = useDispatch();
    const profileInfos = useSelector(state => state.profile.profileInfos);
    useEffect(() => {
        if (!profileInfos || profileInfos.id != localStorage.getItem('loggedin')) {
            dispatch(getUserInfos({userid: localStorage.getItem('loggedin')}));
        }
	}, []);
    return (
        <div className='fixed-primary-bar'>
            <div className='primary-bar'>
                <ul className='top-section'>
                    <li className='logo'><img src="/logo.png" alt="logo" /></li>
                    <li><Link to="/"><BsArchive /></Link></li>
                    <li onClick={() => dispatch(setProjectSearchModal({state: true}))}><BsSearch /></li>
                    <li onClick={() => dispatch(setNewProjectModal({state: true}))}><AiOutlinePlus /></li>
                </ul>
                <ul className='bottom-section'>
                    <li onClick={() => dispatch(setNotificationsModal({state: true}))}><AiOutlineNotification /></li>
                    <li onClick={() => dispatch(setSettingsModal({state: true}))}><SlSettings /></li>
                    <li style={{transform: "scaleX(-1)"}} onClick={() => { dispatch(logout()) }}><FiLogOut /></li>
                    <li onClick={() => dispatch(setProfileModal({state: true}))}>
                        <span className='img' title={profileInfos ? `${profileInfos.lastname} ${profileInfos.firstname}` : ""} style={{backgroundColor: profileImgColors[profileInfos ? profileInfos.firstname[0] : "#a62640"]}}>{profileInfos ? profileInfos.firstname[0] : ""}</span>
                    </li>
                </ul>
            </div>

            <ProjectSearchModal state={projectSearchModal.state} />
            <NewProjectModal state={newProjectModal.state} />
            <NotificationsModal state={notificationsModal.state} />
            <SettingsModal state={settingsModal.state} />
            <ProfileModal state={profileModal.state} />
        </div>
    )
}

export default PrimaryBar