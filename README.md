# StarMango Frontend

Frontend for the StarMango application - extracted from SaaS boilerplate.

This repository contains the React frontend components extracted from the SaaS boilerplate, modified to work with the custom Django backend.

## Structure

- `packages/webapp` - Main React application
- `packages/webapp-libs` - Frontend libraries and shared components

## Setup

This project uses pnpm for package management.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm --filter webapp start
```