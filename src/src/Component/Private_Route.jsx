import React from 'react';
import { Navigate } from 'react-router-dom';

function Private_Route({ children }) {
  let flag = localStorage.getItem('Railway_auth') || false;
  
  if (!flag) {
    return <Navigate to="/login" replace={true} />;
  }
  
  return (
    <>
      {children}
    </>
  );
}

export default Private_Route;
