import { Link, useLoaderData, Form } from "react-router";

export function Navbar() {
  // We get the 'user' from the Root loader (server-side)
  const { user } = useLoaderData() as { user: any };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-darkblue border-bottom border-secondary/20">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Mads Hammer</Link>
        
        <div className="d-flex align-items-center">
          {user ? (
            // IF LOGGED IN: Show Logout and Admin link
            <div className="d-flex align-items-center gap-3">
              <Link to="/admin" className="text-white text-decoration-none small">Admin Panel</Link>
              <Form method="post" action="/logout">
                <button type="submit" className="btn btn-sm btn-outline-danger">Log ud</button>
              </Form>
            </div>
          ) : (
            // IF GUEST: Show Login link
            <Link to="/login" className="btn btn-sm btn-primary px-4">Log ind</Link>
          )}
        </div>
      </div>
    </nav>
  );
}