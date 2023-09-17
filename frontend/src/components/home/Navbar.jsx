import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/provider";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="flex h-20 bg-[#111] text-white">
      <div className="container mx-auto flex items-center justify-between px-2">
        <Link to="/">
          <h1 className="font-semibold">Task App</h1>
        </Link>
        <div>
          {user ? (
            <div className="flex items-center">
              <p className="mr-4">{user.username}</p>
              <button
                className="inline-block shrink-0 rounded-md border border-[#ffce45] bg-[#ffce45] px-10 py-2 text-sm font-medium text-black transition hover:bg-transparent hover:text-[#ffce45] focus:outline-none focus:ring active:text-blue-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/register"
                className="inline-block shrink-0 rounded-md border border-[#ffce45] bg-[#ffce45] px-10 py-2 text-sm font-medium text-black transition hover:bg-transparent hover:text-[#ffce45] focus:outline-none focus:ring active:text-blue-500"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="inline-block ml-4 text-sm font-medium text-white underline"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
