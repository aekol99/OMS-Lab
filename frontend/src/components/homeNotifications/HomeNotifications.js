import React, { useEffect} from 'react';
import './HomeNotifications.css';
import HomeNotification from '../homeNotification/HomeNotification';

import { useSelector, useDispatch } from 'react-redux';
import { getAllNotifications } from '../../redux/thunks/notifications/getAllNotifications';

function HomeNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);
  useEffect(() => {
    const getAllNotificatinsPromise = dispatch(getAllNotifications({id: localStorage.getItem('loggedin')}));

    return () => {
      getAllNotificatinsPromise.abort();
    }
  }, []);
  return (
    <div className='home-notifications'>
        <h3>Notifications</h3>
        <div className='notifications'>
          {(notifications && notifications.length > 0) ? notifications.map((notification, i) => <HomeNotification key={i} data={notification} />) : "There are no notifications at the moment."}
        </div>
    </div>
  )
}

export default HomeNotifications