import { Link, useLoaderData, Form } from "react-router";

export function Navbar() {
  const { user } = useLoaderData() as { user: any };

  return (
    // 'bg-darkblue' is from your CSS, 'border-b' is Tailwind for border-bottom
    <nav className="bg-[#0c1121] border-b border-white/10 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Brand */}
        <Link className="text-xl font-bold text-white no-underline" to="/">
          Mads Hammer
        </Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-white/70 hover:text-white text-sm no-underline transition-colors">
                Admin Panel
              </Link>
              <Form method="post" action="/logout">
                <button 
                  type="submit" 
                  className="px-4 py-1.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md text-sm transition-all"
                >
                  Log ud
                </button>
              </Form>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Log ind
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}