// Central API base URL config
// In production (Render), VITE_API_URL is empty, so requests go to /api (same server)
// In development, defaults to http://localhost:5000/api
export const API_BASE =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : import.meta.env.DEV
      ? "http://localhost:5000/api"
      : "/api";
