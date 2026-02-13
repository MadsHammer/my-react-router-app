import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 1. The Home Page (The Grid)
  index("index.tsx"), 

  // 2. The Project Template (The Details)
  // ":id" is a placeholder. It matches /projects/1, /projects/23, etc.
  route("projects/:id", "components/ProjectDetails.tsx"),
  route("login", "routes/login.tsx"),
  route("admin", "routes/admin.tsx"),
  route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;