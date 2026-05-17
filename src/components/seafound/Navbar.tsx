import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/fishermen", label: "Nelayan" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "py-2" : "py-4"
    }`}>
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between rounded-2xl transition-all duration-300 px-4 md:px-6 py-3 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-lg shadow-soft"
            : "bg-navy/80 backdrop-blur-md"
        }`}>
          <Link to="/"><Logo light /></Link>
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-turquoise" : "text-white/80 hover:text-white"
                  }`}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/admin"
              className="px-4 py-2 rounded-full gradient-aqua text-navy font-semibold text-sm hover:opacity-90 transition shadow-glow flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Admin
            </Link>
          </div>
          <button className="md:hidden text-white" onClick={() => setOpen(o => !o)}>
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden mt-2 bg-navy/95 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-3 animate-fade-in">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg ${
                    isActive ? "text-turquoise bg-white/5" : "text-white/80"
                  }`}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/admin" className="px-3 py-2 rounded-lg gradient-aqua text-navy font-semibold text-sm text-center">Admin</Link>
          </div>
        )}
      </div>
    </header>
  );
};
