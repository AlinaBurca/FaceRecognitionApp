

import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../SignInPage/SignIn.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  
  const validatePassword = () => {
    
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null; 
  };


  const handleResetPassword = async (e) => {
    e.preventDefault(); 
    const errorMessage = validatePassword();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const token = searchParams.get("token"); 
    try{
      const response = await fetch("https://facerecognitionapp-fpvf.onrender.com/reset-password",{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({token, password}),
      });

      if(!response.ok){
        throw new Error("Invalid or expired token");
      }
      const data= await response.json();
        setMessage(data.message);
        setError("");
    }catch(error){
      setError(error.message);
        setMessage("");
    }

  };

  return (
    <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <div className="pa4 black-80 center">
        <h2 className="f2 fw6 center">Reset Password</h2>
        <form className="measure center" onSubmit={handleResetPassword}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
           
            <div className="container">
              <label>New Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </fieldset>
          <button type="submit">Reset Password</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
       

      </div>
    </article>
  );
}

export default ResetPassword;
