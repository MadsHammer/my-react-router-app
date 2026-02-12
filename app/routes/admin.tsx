import { redirect, type LoaderFunctionArgs } from "react-router";
import { supabase } from "../lib/supabase";

export async function loader({ request }: LoaderFunctionArgs) {
  // Check session on the server
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // If not logged in, they never even see the HTML
    return redirect("/login");
  }

  return { user: session.user };
}