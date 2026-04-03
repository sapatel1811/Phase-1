


import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function UserBeforeAuth() {
    
    const user_auth=localStorage.getItem('u_id');

    return (
       user_auth ? <Navigate to='/' />  : <Outlet/>    
    )
}

export default UserBeforeAuth