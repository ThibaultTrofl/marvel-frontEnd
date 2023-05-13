import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import CustomInput from "../CustomInput";

import "./style.css";

const Modal = ({
  setSignupLogin,
  signupLogin,
  setMarvelToken,
  fullBlur,
  setFullBlur,
  marvelId,
  setMarvelId,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupAlert, setSignupAlert] = useState("");
  const [loginAlert, setLoginAlert] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/user/signup`,

        {
          account: {
            username: username,
          },
          email: email,
          password: password,
        }
      );
      if (response.data.message) {
        setSignupAlert(response.data.message);
      } else {
        Cookies.set("marvelToken", response.data.token, { expires: 7 });
        Cookies.set("marvelId", response.data._id, { expires: 7 });
        console.log(response);
        setMarvelToken(response.data.token);
        setMarvelId(response.data._id);
        setTimeout(3000);
        setSignupLogin(!signupLogin);
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(loginEmail, loginPassword);
    try {
      const response = await axios.post(
        `http://localhost:3000/user/login`,

        { email: loginEmail, password: loginPassword }
      );
      if (response.data.message) {
        setLoginAlert(response.data.message);
      } else {
        Cookies.set("marvelToken", response.data.token, { expires: 7 });
        Cookies.set("marvelId", response.data._id, { expires: 7 });
        console.log(response);
        setMarvelToken(response.data.token);
        setTimeout(setSignupLogin(!signupLogin), 10000);
        // setSignupLogin(!signupLogin);
        setFullBlur(!fullBlur);
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickClose = () => {
    // event.preventDefault();
    setSignupLogin(!signupLogin);
    setFullBlur(!fullBlur);
  };

  return (
    <>
      <div className="modal-root">
        <div className="bcg-modal"></div>
        <div className="modal">
          <button
            onClick={() => {
              handleClickClose();
            }}
          >
            X
          </button>
          <div className="signup">
            <form onSubmit={handleSignUp}>
              <CustomInput
                type="string"
                id="username"
                placeholder="Iron man"
                setData={setUsername}
                data={username}
                label="Username"
              />
              <CustomInput
                type="email"
                id="email"
                placeholder="tony.stark@starkindustries.org"
                setData={setEmail}
                data={email}
                label="Email"
              />
              {signupAlert ? (
                <p className="alert-signup">{signupAlert}</p>
              ) : (
                <p className="alert-signup"></p>
              )}
              <CustomInput
                type="password"
                id="upassword"
                placeholder="Password"
                setData={setPassword}
                data={password}
                label="Password"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="line-separation"></div>
          <div className="login">
            <form onSubmit={handleLogin}>
              <CustomInput
                type="email"
                id="loginEmail"
                placeholder="tony.stark@starkindustries.org"
                setData={setLoginEmail}
                data={loginEmail}
                label="Email"
              />
              <CustomInput
                type="password"
                id="loginPassword"
                placeholder="Password"
                setData={setLoginPassword}
                data={loginPassword}
                label="Password"
              />
              {loginAlert ? (
                <p className="alert-login">{loginAlert}</p>
              ) : (
                <p className="alert-login"></p>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
