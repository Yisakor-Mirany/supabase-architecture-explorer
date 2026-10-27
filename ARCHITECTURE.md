# Supabase Architecture Analysis

## 1. Target Application

Application: Supabase

Official Website: https://supabase.com

GitHub Repository: https://github.com/supabase/supabase

## 2. Architectural Style

Supabase uses a service-oriented architecture built
around a PostgreSQL database.

Its platform consists of specialized services that
provide authentication, database access, real-time
communication, and file storage.

## 3. Core Components

### PostgreSQL

The primary relational database that stores
application data.

### PostgREST

Automatically provides a REST API for interacting
with PostgreSQL.

### Supabase Auth

Handles user authentication, identity management,
and authorization-related functionality.

### Supabase Realtime

Enables real-time database change notifications,
broadcast messages, and presence tracking.

### Supabase Storage

Provides APIs for managing files and objects.

### API Gateway

Routes incoming API requests to the appropriate
backend services.

### Supabase Studio

Provides a graphical interface for managing
Supabase projects.

## 4. Initial AI Analysis

AI Tool: ChatGPT (OpenAI GPT-6)

Initial Prompt:

"Analyze the Supabase open-source architecture.
Identify its primary architectural style, core
components, database, API gateway, authentication
service, storage service, and real-time capabilities."

Initial AI Output:

ChatGPT identified Supabase as a service-oriented
architecture centered on PostgreSQL.

It identified PostgreSQL, PostgREST, Supabase Auth,
Realtime, Storage, an API gateway, and Studio as
major architectural components.

## 5. Verification Plan

Official Sources:

https://supabase.com/docs

https://github.com/supabase/supabase

Items to Verify:

- Architectural style
- Responsibilities of each service
- Communication between components
- API gateway implementation
- Differences between hosted and self-hosted setups

Verification Status: Completed - October 27, 2026

## 6. Companion Prototype

Project Name: Supabase Architecture Explorer

Purpose:

Build an interactive React application that helps
users explore Supabase's architectural components,
their responsibilities, and their relationships.

Planned Features:

- Interactive architecture dashboard
- Component information cards
- Search functionality
- Responsive design
- Input validation
- Automated tests

## 7. AI Verification Audit

### Verified Architectural Style

Supabase uses a service-oriented architecture built
around PostgreSQL.

Its specialized services provide database access,
authentication, storage, real-time communication,
and other backend capabilities.

### What AI Got Right

- PostgreSQL is the primary database.
- PostgREST provides REST API functionality.
- Supabase Auth manages authentication.
- Realtime provides real-time communication.
- Storage handles file operations.
- Studio provides a management dashboard.

### What AI Got Wrong

The initial AI analysis identified Kong as the
API gateway without mentioning alternatives.

Official documentation confirms that Envoy became
the default API gateway for self-hosted Supabase
in August 2026.

Kong remains available as an optional alternative.

### What AI Missed

The initial analysis omitted several components:

1. Edge Functions - Executes server-side functions.
2. Supavisor - Manages PostgreSQL connection pooling.
3. postgres-meta - Provides database management APIs.

### Architectural Trade-offs

Advantages:

- Services have specialized responsibilities.
- Components can be developed independently.
- PostgreSQL provides a shared data foundation.
- Open-source components support extensibility.

Disadvantages:

- Multiple services increase deployment complexity.
- Service communication requires careful configuration.
- A shared database can become a performance bottleneck.
- Self-hosting requires ongoing maintenance.

### Verification Sources

Supabase Architecture:
https://supabase.com/docs/guides/getting-started/architecture

Supabase Self-Hosting:
https://supabase.com/docs/guides/self-hosting/docker

Supabase Source Code:
https://github.com/supabase/supabase

Envoy Gateway Documentation:
https://supabase.com/docs/guides/self-hosting/self-hosted-envoy

### Conclusion

AI provided a useful initial architectural breakdown,
but independent verification revealed an outdated
API gateway assumption and missing components.

This demonstrates why AI-generated technical
information must be checked against authoritative
documentation and source code.
