import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { IAppRoutesProps } from './Router.type';

const AppRoutes: FC<IAppRoutesProps> = ({ appRoutes }) => {
  return (
    <Suspense>
      <Routes>
        {appRoutes.map((routesProps, key) => (
          <Route key={key} {...routesProps} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
