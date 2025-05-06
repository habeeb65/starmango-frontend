# Frontend Libraries

This directory will contain shared libraries extracted from the SaaS boilerplate, organized as separate packages:

## Packages

After extraction, the following packages will be available:

- `webapp-api-client`: API client for connecting to the backend services
- `webapp-core`: Core utilities, hooks, and components
- `webapp-contentful`: Contentful CMS integration
- `webapp-crud-demo`: CRUD demo components
- `webapp-documents`: Document management components
- `webapp-finances`: Payment and subscription components
- `webapp-generative-ai`: AI integration
- `webapp-notifications`: Notification system
- `webapp-tenants`: Multi-tenant management

## Integration with StarMango Backend

These libraries will be adapted to work with your custom Django backend. Particularly, the `webapp-api-client` package will be modified to communicate with your backend API endpoints.