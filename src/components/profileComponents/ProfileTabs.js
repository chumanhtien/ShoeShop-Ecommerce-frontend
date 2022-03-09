import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { updateUserProfile } from "../../Redux/Actions/UserActions";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("******");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pasueOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000 // ms
  }

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  // console.log(userDetails);
  const {loading, error, userInfo} = userDetails;
  // console.log(userInfo);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // console.log(userDetails);
  const {loading: updateLoading} = userUpdateProfile;
  // console.log(userInfo);
  
  useEffect(() => {
    if(userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    //password match
    if (password !== confirmPassword) {
      if(!toast.isActive(toastId.current)){ // Chi hien ra 1 Toast tai 1 thoi diem
        toastId.current = toast.error("Password doesn't match", Toastobjects)
      }
      // alert("Password do not match");
    }
    else {
      //UPDATE PROFILE
      dispatch(updateUserProfile({id: userDetails._id, name, email, password}));
      if(!toast.isActive(toastId.current)){ // Chi hien ra 1 Toast tai 1 thoi diem
        toastId.current = toast.success("Profile has already been updated", Toastobjects)
      }
    }
  }
  return (
    <>
    <Toast/>
    {error && <Message variant="alert-danger">{error}</Message>}
    {(loading || updateLoading) && <Loading/>}
    {/* {updateLoading && <Loading/>} */}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input className="form-control" 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)}/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input className="form-control" 
              type="email" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input className="form-control" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input 
              className="form-control" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
