import React from 'react'
import { Navigate, Outlet } from 'react-router';

const isUserLogin = () => {
  const token = window.localStorage.getItem("userInfo");
  return token ? true : false;
}

const PrivateRouter = () => {
  const isLogin = isUserLogin();
  return isLogin ? <Outlet/> : <Navigate to="/login"/>
}
export default PrivateRouter
