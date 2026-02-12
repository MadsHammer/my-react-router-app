import { Form, useActionData, useNavigation, redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../lib/supabase";

// --- 1. THE ACTION (Server-side Logic) ---
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Attempt to sign in with Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Return the error to the UI
    return { error: "Ugyldig email eller adgangskode." };
  }

  // If successful, send the admin to the home page (or an admin dashboard)
  return redirect("/");
}

// --- 2. THE UI (The HTML) ---
export default function Login() {
  const actionData = useActionData() as { error?: string };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-5 col-lg-4">
        
        {/* The Login Card */}
        <div className="card bg-darkblue text-white border-secondary shadow-lg">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Admin Login</h2>
              <p className="text-secondary small">Indtast dine oplysninger for at administrere portfolien</p>
            </div>

            <Form method="post">
              {/* Email Input */}
              <div className="mb-3">
                <label className="form-label small text-uppercase tracking-wider opacity-75">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control bg-dark text-white border-secondary py-2" 
                  placeholder="din@email.dk"
                  required 
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="form-label small text-uppercase tracking-wider opacity-75">Adgangskode</label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-control bg-dark text-white border-secondary py-2" 
                  placeholder="••••••••"
                  required 
                />
              </div>

              {/* Error Message Display */}
              {actionData?.error && (
                <div className="alert alert-danger py-2 small border-0 text-center mb-4">
                  {actionData.error}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-2 fw-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logger ind...
                  </>
                ) : (
                  "Log ind"
                )}
              </button>
            </Form>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-4">
          <a href="/" className="text-secondary text-decoration-none small">
            ← Tilbage til forsiden
          </a>
        </div>
      </div>
    </div>
  );
}