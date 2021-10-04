import React, { useState } from "react";
import "./login.css";

import { MdEmail, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleEyeClick = (e: any) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="login">
      <div className="login-logo">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/41da3NERJ4L.png"
          alt="Login App"
        />
      </div>
      <div className="login-form">
        <h1>Task List</h1>
        <div className="login-input-email">
          <MdEmail />
          <input
            type="text"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input-password">
          <MdLock />
          <input
            type={show ? "text" : "password"}
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-input-password-eye">
            {show ? (
              <HiEye size={20} onClick={handleEyeClick} />
            ) : (
              <HiEyeOff size={20} onClick={handleEyeClick} />
            )}
          </div>
        </div>
        <button type="submit">Sign in</button>
        <h4>Not registered yet?</h4>
        <button type="submit">Sign up</button>
      </div>
    </div>
  );
};

export default Login;
