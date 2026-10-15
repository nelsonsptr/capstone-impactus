import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="relative bg-slate-900 text-white flex justify-center items-center gap-6 sm:gap-10 p-4 sm:p-5 text-sm sm:text-base font-medium">
            <Link to="/" className="hover:text-rose-400 transition-colors">Beranda</Link>
            <Link to="/Tugas" className="hover:text-rose-400 transition-colors">Tugas</Link>
            <Link to="/Timer" className="hover:text-rose-400 transition-colors">Timer</Link>
            <div className="absolute right-4 sm:right-6">
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
        </header>
    );
}