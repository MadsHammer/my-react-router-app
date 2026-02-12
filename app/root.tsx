import { 
  Links, 
  Meta, 
  Outlet, 
  Scripts, 
  ScrollRestoration, 
  type LinksFunction,
  useLoaderData // Add this
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "./lib/supabase"; // Import your supabase client
import { Navbar } from "./components/NavBar"; // Import your Navbar
import "./app.css";

export const links: LinksFunction = () => [
  { 
    rel: "stylesheet", 
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
  }
];

// --- THE GLOBAL AUTH LOADER ---
export async function loader() {
  // This runs on the server every time a page is requested
  const { data: { user } } = await supabase.auth.getUser();
  return { user };
}

const queryClient = new QueryClient();

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="da">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-darkblue text-white"> {/* Applied your theme here */}
        <QueryClientProvider client={queryClient}>
          {/* Navbar stays at the top of every single route */}
          <Navbar /> 
          
          <main>
            <Outlet context={{ user }} />
          </main>
        </QueryClientProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}