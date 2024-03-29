import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { postRegister } from "../../services/backend";
import "./register.css";
import dogSVG from "../../assets/dog-api-logo.svg";
import type { RegisterData } from "../../services/backend";

export default function Register() {
  const [badDetails, setBadDetails] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<Boolean>(false);

  const navigate = useNavigate();
  function clickModalBG(event: MouseEvent) {
    const target = event.target as HTMLBodyElement;
    if (target.getAttribute("class") === "darkBG") navigate(-1);
  }
  useEffect(() => {
    document.addEventListener("click", clickModalBG);
    return () => {
      setIsRegistered(false);
      document.removeEventListener("click", clickModalBG);
    };
  }, []);

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);

    const registerData = Object.fromEntries(data) as RegisterData;

    const registerDataWithoutConfirm = _.omit(registerData, "confirmPassword");
    const response = await postRegister(registerDataWithoutConfirm);

    if (response === 200) {
      setBadDetails("");
      setIsRegistered(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }
    return setBadDetails(response);
  }

  return (
    <div className="darkBG">
      {isRegistered && <span>Registration Successful!</span>}

      <form onSubmit={handleClick} className="register-container">
        <img src={dogSVG} alt="Dog SVG" className="brandTwo" />
        {!isRegistered && (
          <>
            <div className="register-close" onClick={() => navigate(-1)} />
            <input
              className="register-input"
              name="username"
              placeholder="Username"
            />
            <input
              className="register-input"
              name="email"
              placeholder="Email"
            />
            <input
              className="register-input"
              name="password"
              placeholder="Password"
            />
            <input
              className="register-input"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            {badDetails && <span className="register-bad">{badDetails}</span>}

            <button className="register-button">Sign Up!</button>
          </>
        )}
        {isRegistered && (
          <span className="register-success">Registration Successful!</span>
        )}
      </form>
    </div>
  );
}
