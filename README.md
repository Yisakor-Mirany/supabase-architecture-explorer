# Supabase Architecture Explorer

An interactive React application designed to explore and explain the software architecture of Supabase.

## Project Overview

This project analyzes Supabase's software architecture, including its major components, technologies, architectural style, and service relationships.

The application provides an interactive dashboard and architecture diagram to help users understand how Supabase works.

## Features

- Interactive architecture diagram
- 10 architectural components
- Component search functionality
- Category filtering
- Detailed component information
- Responsive design
- Accessible component interactions
- Automated testing

## Technologies Used

- React
- JavaScript
- Vite
- CSS
- Vitest
- React Testing Library

## Architecture Overview

Supabase uses a service-oriented architecture built around PostgreSQL.

### Major Components

- PostgreSQL
- PostgREST
- Supabase Auth
- Supabase Storage
- Supabase Realtime
- Edge Functions
- API Gateway
- Supavisor
- postgres-meta
- Supabase Studio

## Installation

Clone the repository:

```bash
git clone https://github.com/Yisakor-Mirany/supabase-architecture-explorer.git
```

Navigate into the project:

```bash
cd supabase-architecture-explorer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Testing

Run automated tests:

```bash
npm run test:run
```

The application includes seven automated tests covering:

1. Dashboard rendering
2. Search functionality
3. Category filtering
4. Invalid search handling
5. Component details
6. Escape key functionality
7. Architecture diagram rendering

## Production Build

```bash
npm run build
```

## Architecture Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the detailed architectural analysis and verification audit.

## Disclaimer

This is an independent educational project and is not affiliated with Supabase.
