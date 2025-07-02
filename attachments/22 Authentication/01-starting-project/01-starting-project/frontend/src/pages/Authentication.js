import AuthForm from '../components/AuthForm';
import { redirect } from 'react-router-dom';
import { setAuthToken } from '../util/auth';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  console.log(mode);

  if (mode !== 'login' && mode !== 'signup') {
    return Response.json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw Response.json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const responseData = await response.json();
  const token = responseData.token;
  setAuthToken(token);

  return redirect('/');
}