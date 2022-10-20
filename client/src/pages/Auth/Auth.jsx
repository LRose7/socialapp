import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const initialState = {
    firstname: "", 
    lastname: "", 
    username: "", 
    password: "", 
    confirmpass: ""
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignup] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // Handle change in input
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if(isSignUp) {
      data.password === data.comfirmpass 
      ? dispatch(signUp(data, navigate)) 
      : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="Auth">
      {/* Left Side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>ExpressYaself</h1>
          <h6>A safe place to express yourself to the world.</h6>
        </div>
      </div>

      {/* Right Side */}

      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{isSignUp ? "Sign up":"Login"}</h3>

        {isSignUp && (
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
            required
          />
        </div>
        )}

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={data.username}
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />

          {isSignUp && (
          <input
            type="password"
            className="infoInput"
            placeholder="Confirm Password"
            name="confirmpass"
            onChange={handleChange}
            required
          />
          )}
        </div>

        <span style={{
          display: confirmPass ? "none":"block",
          color:"red", 
          fontSize:"12px", 
          alignSelf:"flex-end", 
          marginRight:"5px"
          }}
        >
          * Confirm Password does not match
        </span>
        <div>
          <span 
          style={{ 
            fontSize: "12px", 
            cursor: "pointer",
            textDecoration: "underline", 
          }} 
          onClick={() => {
            resetForm();
            setIsSignup((prev)=>!prev); 
          }}
          >
            {isSignUp 
            ? "Already have an account? Login"
            :"Don't have an account? Sign up"}
          </span>
        </div>
        <button 
        className="button infoButton" 
        type="submit"
        disabled={loading}
        >
           
          {loading ? "Loading..." : isSignUp ? "Sign Up":"Login"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Auth;