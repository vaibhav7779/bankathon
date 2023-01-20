import { FC } from 'react';
import { Navigate, useLocation } from 'react-router';

import { IProtectedRouteProps } from './Router.type';

export const ProtectedRouter: FC<IProtectedRouteProps> = ({ component: Component }) => {
  //   const history = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin') || true;
  //   responseInterceptor(history);
  const isAuthenticated = localStorage?.getItem('user') || true;

  if (isAuthenticated) {
    return <Component />;
  } else {
    return (
      <Navigate to={isAdmin ? '/admin/login' : '/'} replace state={{ from: location.pathname }} />
    );
  }
};

export default ProtectedRouter;
