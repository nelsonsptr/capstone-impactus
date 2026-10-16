import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative z-50 bg-slate-900 text-white">
      <div className="flex justify-between md:justify-center items-center p-4 sm:p-5 relative">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="md:hidden text-slate-200 hover:text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex gap-6 sm:gap-10 text-sm sm:text-base font-medium">
          <Link to="/" className="hover:text-rose-400 transition-colors">
            Beranda
          </Link>
          <Link to="/Tugas" className="hover:text-rose-400 transition-colors">
            Tugas
          </Link>
          <Link to="/Timer" className="hover:text-rose-400 transition-colors">
            Timer
          </Link>
        </nav>

        <div className="md:absolute md:right-6">
          <Link
            to="/Profil"
            title="Lihat Profil"
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity group"
          >
            <div className="w-8 h-8 bg-rose-600 group-hover:bg-rose-500 text-white font-bold text-xs rounded-full flex items-center justify-center transition-transform group-hover:scale-105 border border-slate-700 shadow-md">
              I
            </div>
            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
              Impactus
            </span>
          </Link>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-slate-900 border-t border-slate-800 flex flex-col text-sm font-medium">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-rose-400 hover:bg-slate-800/50 transition-colors px-5 py-3 border-b border-slate-800/80"
          >
            Beranda
          </Link>
          <Link
            to="/Tugas"
            onClick={() => setIsOpen(false)}
            className="hover:text-rose-400 hover:bg-slate-800/50 transition-colors px-5 py-3 border-b border-slate-800/80"
          >
            Tugas
          </Link>
          <Link
            to="/Timer"
            onClick={() => setIsOpen(false)}
            className="hover:text-rose-400 hover:bg-slate-800/50 transition-colors px-5 py-3"
          >
            Timer
          </Link>
        </nav>
      )}
    </header>
  );
}