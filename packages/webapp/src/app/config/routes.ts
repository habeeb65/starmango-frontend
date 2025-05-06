/**
 * Application routes configuration
 */
export const ROUTES = {
  home: '/',
  auth: {
    index: '/auth',
    login: '/auth/login',
    signup: '/auth/signup',
    confirmEmail: '/auth/confirm-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  app: {
    index: '/app',
    profile: '/app/profile',
    settings: '/app/settings',
  },
};