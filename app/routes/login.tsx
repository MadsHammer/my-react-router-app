import { Form, useActionData, useNavigation, redirect, Link } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../lib/supabase";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Ugyldig email eller adgangskode." };
  }

  return redirect("/");
}

export default function Login() {
  const actionData = useActionData() as { error?: string };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (

    <div className="flex items-center justify-center min-h-screen w-full bg-[#0c1121] px-4" style={{ minHeight: 'calc(100vh - 65px)' }}>
      <div className="w-full max-w-md animate-fade-in">
         {/* The Card starts here */}
         <div className="bg-[#121b33] rounded-2xl border border-white/10 shadow-2xl">
          <div className="p-8 md:p-12">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
              <p className="text-white/50 text-sm">Indtast dine oplysninger for at administrere portfolien</p>
            </div>

            <Form method="post" className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 ml-1">
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  className="w-full bg-[#0c1121] text-white border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/20" 
                  placeholder="din@email.dk"
                  required 
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 ml-1">
                  Adgangskode
                </label>
                <input 
                  type="password" 
                  name="password" 
                  className="w-full bg-[#0c1121] text-white border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-white/20" 
                  placeholder="••••••••"
                  required 
                />
              </div>

              {/* Error Message Display */}
              {actionData?.error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 py-3 px-4 rounded-xl text-sm text-center animate-shake">
                  {actionData.error}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
        <div className="text-center mt-8">
          <Link to="/" className="text-white/40 hover:text-white text-sm no-underline transition-colors">
            ← Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}