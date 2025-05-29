import { useState } from "react";
import { Input } from "./Input";
import { hasMinLength, isEmail } from "../util/validation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !isEmail(formData.email);
  const passwordIsInvalid = didEdit.password && !hasMinLength(formData.password, 6);

  const handleChange = (key, value) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
    setDidEdit((prevNotValid) => {
      return {
        ...prevNotValid,
        [key]: false,
      };
    });
  };

  const handleBlur = (key, value) => {
    setDidEdit((prevNotValid) => {
      return {
        ...prevNotValid,
        [key]: true,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onChange={(event) => handleChange("email", event.target.value)}
          onBlur={(event) => handleBlur("email", event.target.value)}
          error={emailIsInvalid ? "Please enter a valid email address." : ""}
        />

        <Input 
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) => handleChange("password", event.target.value)}
          onBlur={(event) => handleBlur("password", event.target.value)}
          error={passwordIsInvalid ? "Password must be at least 6 characters long." : ""}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
