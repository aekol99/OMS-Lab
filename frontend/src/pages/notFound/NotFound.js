import React from 'react';
import './NotFound.css';

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
        Not Found
        <Link to="/">Back to Homepage</Link>
    </>
  )
}

export default NotFound