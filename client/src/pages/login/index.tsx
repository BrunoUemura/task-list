/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

import { Link, Redirect, useHistory } from "react-router-dom";

import { MdEmail, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { LoginContainer, LoginLogo, LoginForm } from "./styles";
import { Authentication } from "../../services/authentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleEyeClick = (e: any) => {
    e.preventDefault();
    setShow(!show);
  };

  const clearFields = (): void => {
    setEmail("");
    setPassword("");
  };

  const incompleteFields = (): void => {
    alert("Incorrect email or password.");
    clearFields();
  };

  const authenticationSucceeded = (token: string) => {
    localStorage.setItem("token", token);
    alert("Authentication succeeded!");
    document.location.href = "/";
  };

  const authenticationFailed = (): void => {
    alert("Authentication failed! Verify email and password.");
    clearFields();
    // router.push("/login");
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      incompleteFields();
      return;
    }

    try {
      const token: string = await Authentication.logIn({
        email,
        password,
      });
      if (token) {
        authenticationSucceeded(token);
      } else {
        authenticationFailed();
      }
    } catch (err) {
      authenticationFailed();
    }
  };

  return (
    <LoginContainer>
      <LoginLogo>
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/41da3NERJ4L.png"
          alt="Login App"
        />
      </LoginLogo>
      <LoginForm>
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
        <div className="button-containers">
          <button type="submit" className="signin-button" onClick={handleLogin}>
            Sign in
          </button>
          <h4>Not registered yet?</h4>
          <Link to="/register">
            <button type="submit" className="signup-button">
              Sign up
            </button>
          </Link>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
