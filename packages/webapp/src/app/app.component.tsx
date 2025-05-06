import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from './config/routes';
import { AuthRoutesContainer } from './auth/authRoutesContainer.component';
import { PrivateRoutes } from './auth/privateRoutes.component';

/**
 * Main App component that handles routing
 */
export const App = () => {
  return (
    <Routes>
      {/* Auth routes (login, signup, password reset, etc.) */}
      <Route path={ROUTES.auth.index} element={<AuthRoutesContainer />}>
        <Route path={ROUTES.auth.login} element={<div>Login Component Placeholder</div>} />
        <Route path={ROUTES.auth.signup} element={<div>Signup Component Placeholder</div>} />
        <Route path={ROUTES.auth.confirmEmail} element={<div>Confirm Email Component Placeholder</div>} />
        <Route path={ROUTES.auth.forgotPassword} element={<div>Forgot Password Component Placeholder</div>} />
        <Route path={ROUTES.auth.resetPassword} element={<div>Reset Password Component Placeholder</div>} />
      </Route>

      {/* Private routes (protected, requires authentication) */}
      <Route path={ROUTES.app.index} element={<PrivateRoutes />}>
        <Route index element={<div>Dashboard Component Placeholder</div>} />
        <Route path={ROUTES.app.profile} element={<div>Profile Component Placeholder</div>} />
        <Route path={ROUTES.app.settings} element={<div>Settings Component Placeholder</div>} />
      </Route>

      {/* Landing page */}
      <Route path={ROUTES.home} element={<div>Landing Page Component Placeholder</div>} />

      {/* Handle 404 */}
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
};