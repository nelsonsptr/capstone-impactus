import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-slate-900 text-white p-5 relative border-b border-slate-800">
            <div className="hidden md:flex justify-center items-center gap-10">
                <Link to="/" className="hover:text-slate-300 transition-colors">Beranda</Link>
                <Link to="/Tugas" className="hover:text-slate-300 transition-colors">Tugas</Link>
                <Link to="/Timer" className="hover:text-slate-300 transition-colors">Timer</Link>

                <div className="absolute right-6">
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

            <div className="flex md:hidden justify-between items-center">
                <Link to="/Profil" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-600 text-white font-bold text-xs rounded-full flex items-center justify-center border border-slate-700">
                        I
                    </div>
                    <span className="text-sm font-semibold text-slate-200">Impactus</span>
                </Link>

                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1.5 text-slate-300 hover:text-white focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <nav className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-slate-800 text-center">
                    <Link 
                        to="/" 
                        onClick={() => setIsMenuOpen(false)}
                        className="py-2 hover:bg-slate-800 rounded transition-colors"
                    >
                        Beranda
                    </Link>
                    <Link 
                        to="/Tugas" 
                        onClick={() => setIsMenuOpen(false)}
                        className="py-2 hover:bg-slate-800 rounded transition-colors"
                    >
                        Tugas
                    </Link>
                    <Link 
                        to="/Timer" 
                        onClick={() => setIsMenuOpen(false)}
                        className="py-2 hover:bg-slate-800 rounded transition-colors"
                    >
                        Timer
                    </Link>
                </nav>
            )}
        </header>
    );
}