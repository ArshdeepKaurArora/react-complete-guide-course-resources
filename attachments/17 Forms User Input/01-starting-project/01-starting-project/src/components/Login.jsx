import React, { useRef } from 'react';

export default function Login() {

  const [notValid, setNotValid] = React.useState({
    email: false,
    password: false,
  });

  const email = useRef();
  const password = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    setNotValid((prev) => {
      return {
        ...prev,
        email: email.current.value.length === 0 || !email.current.value.includes("@"),
        password: password.current.value.length === 0,
      };
    })

    if (notValid.email || notValid.password) {
      console.log("Form is not valid. Please correct the errors.", notValid);
      return;
    }

    console.log("Email:", email.current.value);
    console.log("Password:", password.current.value);
    email.current.value = "";
    password.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          {notValid.email && (
            <p className="control-error">Please enter a valid email address.</p>
          )}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password}/>
          {notValid.password && (
            <p className="control-error">Please enter a valid password.</p>
          )}
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
