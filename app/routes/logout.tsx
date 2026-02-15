import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../lib/supabase";

export async function action({ request }: ActionFunctionArgs) {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Logout error:", error.message);
  }

  return redirect("/");
}

// This handles someone accidentally visiting /logout in the URL bar
export async function loader() {
  return redirect("/");
}