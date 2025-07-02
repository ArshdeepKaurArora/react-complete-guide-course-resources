import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getAuthToken } from '../util/auth';

function RootLayout() {

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

export function loader() {
  return getAuthToken();
}
