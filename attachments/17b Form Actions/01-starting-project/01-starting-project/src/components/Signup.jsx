import { useActionState } from 'react';
import { isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue } from '../utils/validation';

function signUpAction(prevFormState, formData) {
  const enteredEmail = formData.get('email');
  const enteredPassword = formData.get('password');
  const enteredConfirmPassword = formData.get('confirm-password');
  const enteredFirstName = formData.get('first-name');
  const enteredLastName = formData.get('last-name');
  const enteredRole = formData.get('role');
  const enteredAcquisition = formData.getAll('acquisition');
  const termsAccepted = formData.get('terms');
  
  let errors = [];

  if (!isEmail(enteredEmail)) {
    errors.push('Invalid email address.');
  }

  if (isNotEmpty(enteredPassword) && !hasMinLength(enteredPassword, 6)) {
    errors.push('You must provide a password with at least six characters.');
  }

  if (!isEqualToOtherValue(enteredPassword, enteredConfirmPassword)) {
    errors.push('Passwords do not match.');
  }
  
  if (!isNotEmpty(enteredFirstName) || !isNotEmpty(enteredLastName)) {
    errors.push('Please provide both your first and last name.');
  }

  if (!isNotEmpty(enteredRole)) {
    errors.push('Please select a role.');
  }

  if (!termsAccepted) {
    errors.push('You must agree to the terms and conditions.');
  }

  if (enteredAcquisition.length === 0) {
    errors.push('Please select at least one acquisition channel.');
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        role: enteredRole,
        acquisition: enteredAcquisition,
        terms: termsAccepted
      }
    }
  }

  return {
    errors: null,
  }
}

export default function Signup() {

  const [formState, formAction] = useActionState(signUpAction, {
    errors: null
  })

  return (
    <form action={formAction} noValidate>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValues?.email}/>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.password}/>
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValues?.firstName}/>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValues?.lastName}/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisition.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisition.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValues?.acquisition.includes('other')}/>
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className='error'>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>

    </form>
  );
}
