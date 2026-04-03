


import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function UserAfterAuth() {
    
    const user_auth=localStorage.getItem('u_id');

    return (
       user_auth ? <Outlet/> : <Navigate to='/' />   
    )
}

export default UserAfterAuth