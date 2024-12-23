import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SignInPage/SignIn.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

 
  const validateFields = () => {
    const { username, email, password } = form;

   
    if (username.trim().length < 3) {
      return "Username must be at least 3 characters long.";
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }

    
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return null; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateFields();
    if (errorMessage) {
      setForm({ ...form, error: errorMessage, success: false });
      return;
    }

    const { username, email, password } = form;

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      setForm({ ...form, success: true, error: "" });
      const data = await response.json();
      navigate("/signin");
    } catch (error) {
      setForm({ ...form, error: error.message, success: false });
    }
  };

  return (
    <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <div className="pa4 black-80">
        <h2 className="f2 fw6 center">Register</h2>
        <form className="measure center" onSubmit={handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div className="container">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="container">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="container">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </fieldset>
          <button type="submit">Register</button>
        </form>
        {form.error && <p style={{ color: "red" }}>{form.error}</p>}
        {form.success && <p style={{ color: "green" }}>Registration successful!</p>}
      </div>
    </article>
  );
}

export default Register;
