# StarMango Web Application

This directory will contain the main React application extracted from the SaaS boilerplate.

## Directory Structure

After extraction, the structure will include:

- `src/` - Main source code
  - `app/` - Application setup and configuration
  - `routes/` - Application routes and page components
  - `shared/` - Shared utilities and components
- `public/` - Static assets
- `project.json` - NX project configuration
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript configuration

## Development

To start the application in development mode:
```bash
pnpm --filter webapp start
```