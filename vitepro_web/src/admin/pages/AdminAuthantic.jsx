import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function AdminAuthantic() {

  const admin_auth=localStorage.getItem('a_id');

  return (
     admin_auth ? <Outlet/> : <Navigate to='/admin-login' />   
  )
}

export default AdminAuthantic