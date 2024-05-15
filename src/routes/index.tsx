import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { NoMatch } from './not-found';
import { Routes } from './routes.enum.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to='start-page' />,
      },
      {
        path: Routes.startPage,
        async lazy() {
          const { StartPage } = await import('../pages/start-page');
          return {
            Component: StartPage,
          };
        },
      },
      {
        path: Routes.demoPage,
        async lazy() {
          const { DemoPage } = await import('../pages/demo-page');
          return {
            Component: DemoPage,
          };
        },
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
]);
