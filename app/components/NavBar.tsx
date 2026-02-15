import { Link, useLoaderData, Form } from "react-router";

export function Navbar() {
  // Accessing global user data from the root loader
  const { user } = useLoaderData() as { user: any };

  return (
    <nav className="bg-secondary/80 backdrop-blur-md border-b border-white/5 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Brand - Using Accent color for the name */}
        <Link className="text-xl font-bold text-white hover:text-accent no-underline transition-colors" to="/">
          Mads Hammer
        </Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              <Link 
                to="/admin" 
                className="text-white/60 hover:text-white text-sm no-underline transition-colors font-medium"
              >
                Admin Panel
              </Link>
              
              <Form method="post" action="/logout">
                <button 
                  type="submit" 
                  className="px-4 py-1.5 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm transition-all font-medium"
                >
                  Log ud
                </button>
              </Form>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-primary/20 no-underline"
            >
              Log ind
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}