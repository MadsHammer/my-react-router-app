import { 
  Links, 
  Meta, 
  Outlet, 
  Scripts, 
  ScrollRestoration, 
  type LinksFunction  
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.css"; // Your Tailwind/Bootstrap styles


// app/root.tsx
export const links: LinksFunction = () => [
  { 
    rel: "stylesheet", 
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
  }
];

const queryClient = new QueryClient();

export default function App() {
  return (
    <html lang="da">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}