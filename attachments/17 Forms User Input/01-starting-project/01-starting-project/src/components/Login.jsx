import React, { useRef } from 'react';

export default function Login() {

  const email = useRef();
  const password = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email.current.value);
    console.log("Password:", password.current.value);
    // Here you would typically handle the login logic, e.g., API call
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
