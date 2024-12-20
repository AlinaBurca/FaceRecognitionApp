// import { React, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignIn = ({ onLogin }) => {
//   const [userEmail, setUserEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(userEmail);
//     console.log(password);

//     if (userEmail === "alina" && password === "12345") {
//       onLogin();
//       navigate("/");
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//       <div className="pa4 black-80">
//         <form className="measure center" onSubmit={handleSubmit}>
//           <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//             <legend className="f2 fw6 center">Sign In</legend>
//             <div className="mt3">
//               <label className="db fw6 lh-copy f4" htmlFor="email-address">
//                 Email
//               </label>
//               <input
//                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                 type="email"
//                 name="email-address"
//                 id="email-address"
//                 value={userEmail}
//                 onChange={(e) => setUserEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mv3">
//               <label className="db fw6 lh-copy f4" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </fieldset>
//           <div className="">
//             <button
//               className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
//               type="submit"
//             >
//               Sign in
//             </button>
//           </div>
//           <div className="lh-copy mt3">
//             <a href="#0" className="f6 link dim black db">
//               Register
//             </a>
//             <a href="#0" className="f6 link dim black db">
//               Forgot your password?
//             </a>
//           </div>
//         </form>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>
//     </article>
//   );
// };

// export default SignIn;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne reîncărcarea paginii
    // Simulează autentificarea
    if (username === "admin" && password === "1234") {
      onLogin(); // Marchează utilizatorul ca autentificat
      navigate("/"); // Redirecționează către pagina principală
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <div className="pa4 black-80">
        <h2 className="f2 fw6 center">Sign In</h2>
        <form className="measure center" onSubmit={handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
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
      </div>
    </article>
  );
}

export default SignIn;
