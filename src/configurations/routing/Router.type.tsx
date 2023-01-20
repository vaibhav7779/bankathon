import { FunctionComponent, ReactElement } from 'react';

export interface IProtectedRouteProps {
  component: FunctionComponent;
}

export type RouteObj = {
  path: string;
  exact?: boolean;
  element: ReactElement;
};

export interface IAppRoutesProps {
  appRoutes: RouteObj[];
}
