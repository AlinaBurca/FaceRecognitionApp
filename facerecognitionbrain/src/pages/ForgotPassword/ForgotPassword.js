import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SignInPage/SignIn.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault(); 
     
    try{
      const response = await fetch("https://facerecognitionapp-fpvf.onrender.com/forgot-password",{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({email}),
      });

      if(!response.ok){
        throw new Error("Email not found");
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
        <h2 className="f2 fw6 center">Forgot Password</h2>
        <form className="measure center" onSubmit={handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div className="container">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </fieldset>
          <button type="submit">Send reset link</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </article>
  );
}

export default ForgotPassword;
