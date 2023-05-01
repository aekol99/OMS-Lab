import React, { useEffect, useRef } from 'react';
import './NotificationsModal.css';
import { AiOutlineNotification } from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux';
import { setNotificationsModal } from '../../redux/slices/modalsSlice';
import ModalNotification from '../../components/modalNotification/ModalNotification';
import { getAllNotifications } from '../../redux/thunks/notifications/getAllNotifications';


function NotificationsModal(props) {
	const dispatch = useDispatch();
	const notifications = useSelector(state => state.notifications.notifications);

	const getAllNotificationsPromise = useRef(null);
	const modalOpened = useSelector(state => state.modals.notificationsModal.state);
	useEffect(() => {
		if (modalOpened) {
			console.log("notifications modal executed");
			getAllNotificationsPromise.current = dispatch(getAllNotifications({id: localStorage.getItem('loggedin')}));
		}

		return () => {
			if (getAllNotificationsPromise.current) {
				getAllNotificationsPromise.current.abort();
			}
		}
	  }, [modalOpened]);
	if(!props.state) return null;
	return (
		<div className="modal" onClick={() => dispatch(setNotificationsModal({state: false}))}>
			<div className="overlay">
				<div className='content' onClick={(e) => e.stopPropagation()}>
					<div className='modal-header'>
						<AiOutlineNotification />
						<span>Notifications</span>
					</div>
					<div className='modal-body'>
					{(notifications && notifications.length > 0) ? notifications.map((notification, i) => <ModalNotification key={i} data={notification} />) : "There are no notifications at the moment."}
					</div>
					<div className='modal-footer'>
						<button onClick={() => dispatch(setNotificationsModal({state: false}))}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotificationsModal