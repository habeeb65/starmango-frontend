# StarMango Frontend

This repository contains the React-based frontend for the StarMango SaaS application, designed to connect with your existing Django backend.

## Project Structure

This is a monorepo structure using PNPM workspaces:

- `packages/webapp`: Main React application
- `packages/webapp-libs`: Shared libraries
  - `webapp-api-client`: API client for connecting to the Django backend
  - `webapp-core`: Core utilities and components
  - `webapp-tenants`: Multi-tenant functionality
  - `webapp-notifications`: Notification system
  - `webapp-users`: User management

## Features

- ✅ Modern React application with TypeScript
- ✅ Authentication system integrated with Django JWT authentication
- ✅ Multi-tenant architecture
- ✅ User management with profiles
- ✅ Notification system
- ✅ Responsive UI built with Chakra UI
- ✅ React Router for navigation

## Setup

### Prerequisites

- Node.js (v16+)
- PNPM (v7+)
- Django backend running (default: http://localhost:8000)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/habeeb65/starmango-frontend.git
cd starmango-frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with your backend configuration:

```
# API URLs
VITE_API_URL=http://localhost:8000
VITE_API_PROXY=http://localhost:8000
VITE_GRAPHQL_URL=http://localhost:8000/graphql

# Feature flags
VITE_FEATURE_REGISTRATION_ENABLED=true
VITE_FEATURE_REGISTRATION_LINK_ENABLED=true
VITE_FEATURE_PASSWORD_RESET=true
VITE_FEATURE_DEMO_MODE=false
```

4. Start the development server:

```bash
pnpm dev
```

## Connection to Django Backend

This frontend is designed to work with a Django backend that provides:

1. JWT Authentication endpoints
   - `/api/auth/token/` - Obtain JWT token pair
   - `/api/auth/token/refresh/` - Refresh token
   - `/api/auth/register/` - User registration

2. User endpoints
   - `/api/users/me/` - Current user profile
   - `/api/users/profile/` - User profile management

3. Multi-tenant endpoints
   - `/api/tenants/` - List/create tenants
   - `/api/tenants/<id>/` - Update/delete tenants
   - `/api/tenants/set-current/` - Set current tenant

4. Notification endpoints
   - `/api/notifications/` - List notifications
   - `/api/notifications/<id>/` - Update notification status
   - `/api/notifications/mark-all-read/` - Mark all notifications as read

## Configuration

The application uses environment variables for configuration. See the `.env` file for available options.

## Development

### Project Structure

- `packages/webapp/src/app`: Application setup and configuration
- `packages/webapp/src/routes`: Application routes and page components
- `packages/webapp/src/shared`: Shared components, utilities, and hooks

### Key Components

- Authentication: Login, Signup, Password Reset
- Dashboard: Main application dashboard
- Layout: Header and sidebar navigation

## Backend Integration

The application is set up to connect to your Django backend. Key integration points:

1. Authentication: JWT token handling and user authentication
2. Multi-tenancy: Tenant management and switching
3. User Management: User profiles and settings
4. Notifications: Real-time notification system

## Next Steps

- [ ] Add user profile management page
- [ ] Implement settings page
- [ ] Create project and task management components
- [ ] Add team management features
- [ ] Implement detailed notifications UI
- [ ] Add comprehensive error handling
- [ ] Set up testing framework

## License

MIT