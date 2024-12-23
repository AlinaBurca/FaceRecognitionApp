import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState('');

 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const loginData={
      email: email,
      password: password,
    };  
    try{
      const response = await fetch("https://facerecognitionapp-fpvf.onrender.com/signin",{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if(!response.ok){
        throw new Error("Invalid username or password");
      }
      const data= await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
      
      onLogin();
      navigate("/")
    }catch(error){
      setError(error.message);
    }

  };

  return (
    <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <div className="pa4 black-80 center">
        <h2 className="f2 fw6 center">Sign In</h2>
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
            <div className="container">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </fieldset>
          <button type="submit">Sign In</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="register" ><a onClick={() => navigate('/forgot-password')}>Forgot password?</a></div>
        <div className="register" >Don't have an accout? <a onClick={() => navigate('/register')}>Register</a></div>

      </div>
    </article>
  );
}

export default SignIn;
