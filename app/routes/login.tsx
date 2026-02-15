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

  // Using 'secondary' for the card and 'primary' for the button
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-secondary/50 px-4 animate-fade-in">
      <div className="w-full max-w-md">
        
        {/* Main Login Card */}
        <div className="bg-secondary rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
          {/* Subtle top accent bar */}
          <div className="h-1.5 w-full bg-primary"></div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">
                Admin Login
              </h2>
              <p className="text-white/40 text-sm font-medium">
                Indtast dine oplysninger for at administrere portfolien
              </p>
            </div>

            <Form method="post" className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  className="w-full bg-secondary-hover text-white border border-white/10 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-white/10" 
                  placeholder="din@email.dk"
                  required 
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-1">
                  Adgangskode
                </label>
                <input 
                  type="password" 
                  name="password" 
                  className="w-full bg-secondary-hover text-white border border-white/10 rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-white/10" 
                  placeholder="••••••••"
                  required 
                />
              </div>

              {/* Error Message */}
              {actionData?.error && (
                <div className="bg-red-500/5 border border-red-500/20 text-red-400 py-3 px-4 rounded-xl text-xs font-bold text-center tracking-wide">
                  {actionData.error}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/20 disabled:text-white/20 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
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
          <Link to="/" className="text-white/30 hover:text-white text-xs font-bold uppercase tracking-[0.2em] no-underline transition-colors">
            ← Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}