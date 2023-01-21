import { DashboardPage } from "Pages/DashboardPages";
import  PhotoUpload from "Pages/PhotoUpload";

import { ROUTES } from "constants/routes";

import { RouteObj } from "./Router.type";
import { Gratification } from "Components/Gratification";

// import ProtectedRoute from './ProtectedRouter';

export const APP_ROUTES: RouteObj[] = [
  {
    path: ROUTES.DASHBOARD,
    exact: true,
    element: <DashboardPage />,
  },
  {
    path: ROUTES.GRATIFICATION,
    exact: true,
    element: <Gratification />,
  },
  {
    path: ROUTES.PHOTOUPLOAD,
    exact: true,
    element: <PhotoUpload />,
  },
  {
    path: ROUTES.PHOTOSUCCESS,
    exact: true,
    element: <DashboardPage />,
  },
];
