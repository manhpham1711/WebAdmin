import React from 'react';

const Login = React.lazy(() => import('./views/pages/login/Login'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// User
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
// Place
const Places = React.lazy(() => import('./views/places/Places'));
const Place = React.lazy(() => import('./views/places/Place'));
const EditPlace = React.lazy(()=>import('./views/places/EditPlace'));
// Report - User
const UserReports = React.lazy(()=> import('./views/reports/users/UserReports'));
const UserReport = React.lazy(()=> import('./views/reports/users/UserReport'));

// Report - App
const AppReport = React.lazy(()=> import('./views/reports/App/AppReports'));

const routes = [
  { path: '/', exact: true, name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // Report - Users
  { path:'/reportUs',exact: true, name:'UserReports', component:UserReports},
  { path:'/reportUs/:id',exact: true, name: 'UserReport', component: UserReport },

  // REport - Apps
  { path: '/reportAs', name:'AppReport', component:AppReport},
  
  //User
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  
  // Place //
  { path: '/places', exact: true,  name: 'Places', component: Places },
  { path: '/places/:id', exact: true, name: 'Place Details', component: Place },
  { path: '/edit', exact: true,  name: 'EditPlace', component: EditPlace },
];

export default routes;
