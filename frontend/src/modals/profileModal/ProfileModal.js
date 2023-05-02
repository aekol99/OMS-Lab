import React, { useEffect, useRef } from 'react';
import './ProfileModal.css';
import { CgProfile } from 'react-icons/cg';
import { profileImgColors } from '../../data/profileImgColors';

import { useSelector, useDispatch } from 'react-redux';
import { setProfileModal } from '../../redux/slices/modalsSlice';
import { getUserInfos } from '../../redux/thunks/profile/getProfileInfos';

function ProfileModal(props) {
	const dispatch = useDispatch();
	const profileInfos = useSelector(state => state.profile.profileInfos);

	const getUserInfosPromise = useRef(null);
	const modalOpened = useSelector(state => state.modals.profileModal.state);
	useEffect(() => {
		if (modalOpened) {
			getUserInfosPromise.current = dispatch(getUserInfos({userid: localStorage.getItem('loggedin')}));
		}

		return () => {
			if (getUserInfosPromise.current) {
				getUserInfosPromise.current.abort();
			}
		}
	}, [modalOpened]);
	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setProfileModal({state: false}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<CgProfile />
						<span>Profile</span>
					</div>
					<div className='modal-body profile-infos'>
						<span className='img' style={{backgroundColor: profileImgColors[profileInfos ? profileInfos.firstname[0] : "#a62640"]}}>{profileInfos ? profileInfos.firstname[0] : ""}</span>
						<div className='user-infos'>
							<p>{profileInfos ? `${profileInfos.lastname} ${profileInfos.firstname}` : ""}</p>
							<p>{profileInfos ? '@'+profileInfos.username : ""}</p>
						</div>
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setProfileModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileModal