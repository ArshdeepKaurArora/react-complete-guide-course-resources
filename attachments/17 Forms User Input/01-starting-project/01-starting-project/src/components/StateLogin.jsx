//@ts-check

import { Input } from "./Input";
import { hasMinLength, isEmail } from "../util/validation";
import {useInput} from "../hooks/useInput";

export default function Login() {

  const {formData: emailValue, didEdit: didEditEmail, handleChange: handleChangeEmail, handleBlur: handleBlurEmail} = useInput();
  const {formData: passwordValue, didEdit: didEditPassword, handleChange: handleChangePassword, handleBlur: handleBlurPassword} = useInput();

  const emailIsInvalid = didEditEmail && !isEmail(emailValue);
  const passwordIsInvalid = didEditPassword && !hasMinLength(passwordValue, 6);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email:", emailValue);
    console.log("password:", passwordValue);
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
          onChange={(event) => handleChangeEmail(event.target.value)}
          onBlur={(event) => handleBlurEmail()}
          error={emailIsInvalid ? "Please enter a valid email address." : ""}
          value={emailValue}
        />

        <Input 
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) => handleChangePassword(event.target.value)}
          onBlur={(event) => handleBlurPassword()}
          error={passwordIsInvalid ? "Password must be at least 6 characters long." : ""}
          value={passwordValue}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
