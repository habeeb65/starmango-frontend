import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@sb/webapp-api-client';
import { Layout } from '../shared/components/layout';
import { AuthRoutesContainer } from './auth/authRoutesContainer.component';
import { PrivateRoutes } from './auth/privateRoutes.component';
import { Landing } from '../routes/landing';
import { Login } from '../routes/auth/login';
import { Signup } from '../routes/auth/signup';
import { PasswordReset } from '../routes/auth/passwordReset';
import { Dashboard } from '../routes/dashboard';
import { RoutesConfig } from './config/routes';

export const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path={RoutesConfig.home} element={isLoggedIn ? <Navigate to={RoutesConfig.dashboard} /> : <Landing />} />
        
        {/* Auth routes */}
        <Route path={RoutesConfig.auth.index} element={<AuthRoutesContainer />}>
          <Route path={RoutesConfig.auth.login} element={<Login />} />
          <Route path={RoutesConfig.auth.signup} element={<Signup />} />
          <Route path={RoutesConfig.auth.passwordReset} element={<PasswordReset />} />
        </Route>
        
        {/* Protected routes */}
        <Route path={RoutesConfig.private.index} element={<PrivateRoutes />}>
          <Route path={RoutesConfig.dashboard} element={<Dashboard />} />
          <Route path="/projects" element={<div>Projects page (Coming soon)</div>} />
          <Route path="/tasks" element={<div>Tasks page (Coming soon)</div>} />
          <Route path="/calendar" element={<div>Calendar page (Coming soon)</div>} />
          <Route path="/reports" element={<div>Reports page (Coming soon)</div>} />
          <Route path="/team" element={<div>Team page (Coming soon)</div>} />
          <Route path="/settings" element={<div>Settings page (Coming soon)</div>} />
          <Route path="/profile" element={<div>Profile page (Coming soon)</div>} />
        </Route>

        {/* 404 route - must be at the end */}
        <Route path="*" element={<Navigate to={RoutesConfig.home} replace />} />
      </Routes>
    </Layout>
  );
};