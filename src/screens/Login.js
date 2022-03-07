import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Actions/UserActions";
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';

const Login = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  // console.log(location);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  // console.log(userLogin)
  const {error, loading, userInfo} = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant={"alert-danger"}>{error}</Message>}
        {loading && <Loading/>}
        <form 
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Login</button>
          <p>
            <Link to={redirect ? `/register?redirect=${redirect}` :"/register"}>Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
