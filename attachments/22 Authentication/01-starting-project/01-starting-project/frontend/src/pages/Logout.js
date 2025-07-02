import { redirect } from 'react-router-dom';
import { removeAuthToken } from '../util/auth';

export function loader() {
  removeAuthToken();
  return redirect('/');
}