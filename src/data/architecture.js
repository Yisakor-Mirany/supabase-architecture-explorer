export const architectureComponents = [
  {
    id: 1,
    name: "PostgreSQL",
    category: "Database",
    description:
      "The primary relational database used to store and manage application data.",
    technology: "PostgreSQL",
    responsibilities: [
      "Store application data",
      "Execute SQL queries",
      "Maintain data integrity",
    ],
  },
  {
    id: 2,
    name: "PostgREST",
    category: "API",
    description:
      "Automatically exposes PostgreSQL database functionality through a RESTful API.",
    technology: "Haskell",
    responsibilities: [
      "Generate REST APIs",
      "Process database requests",
      "Integrate with PostgreSQL permissions",
    ],
  },
  {
    id: 3,
    name: "Supabase Auth",
    category: "Authentication",
    description: "Manages user authentication, identity, and access tokens.",
    technology: "Go",
    responsibilities: [
      "Authenticate users",
      "Manage user sessions",
      "Issue authentication tokens",
    ],
  },
  {
    id: 4,
    name: "Supabase Realtime",
    category: "Realtime",
    description: "Provides real-time communication using WebSockets.",
    technology: "Elixir",
    responsibilities: [
      "Broadcast messages",
      "Track user presence",
      "Stream database changes",
    ],
  },
  {
    id: 5,
    name: "Supabase Storage",
    category: "Storage",
    description: "Provides APIs for storing and managing files and objects.",
    technology: "TypeScript",
    responsibilities: [
      "Upload files",
      "Download files",
      "Manage storage access",
    ],
  },
  {
    id: 6,
    name: "API Gateway",
    category: "Infrastructure",
    description:
      "Routes incoming API requests to the appropriate backend services.",
    technology: "Envoy / Kong",
    responsibilities: [
      "Route API requests",
      "Provide a unified API entry point",
      "Support gateway-level security controls",
    ],
  },
  {
    id: 7,
    name: "Supabase Studio",
    category: "Dashboard",
    description: "A graphical interface for managing Supabase projects.",
    technology: "Next.js",
    responsibilities: [
      "Manage database tables",
      "Configure project settings",
      "Provide administrative tools",
    ],
  },
  {
    id: 8,
    name: "Edge Functions",
    category: "Compute",
    description: "Runs server-side TypeScript and JavaScript functions.",
    technology: "Deno",
    responsibilities: [
      "Execute server-side logic",
      "Process HTTP requests",
      "Integrate with external services",
    ],
  },
  {
    id: 9,
    name: "Supavisor",
    category: "Database",
    description: "Provides connection pooling for PostgreSQL.",
    technology: "Elixir",
    responsibilities: [
      "Pool database connections",
      "Manage connection resources",
      "Improve connection scalability",
    ],
  },
  {
    id: 10,
    name: "postgres-meta",
    category: "Database",
    description:
      "Provides APIs for inspecting and managing PostgreSQL metadata.",
    technology: "TypeScript",
    responsibilities: [
      "Inspect database schemas",
      "Manage database metadata",
      "Support administrative operations",
    ],
  },
];
