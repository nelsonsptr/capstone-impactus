import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-slate-900 text-white flex justify-center items-center gap-6 sm:gap-10 p-4 sm:p-5 text-sm sm:text-base font-medium">
            <Link to="/" className="hover:text-rose-400 transition-colors">Beranda</Link>
            <Link to="/Tugas" className="hover:text-rose-400 transition-colors">Tugas</Link>
            <Link to="/Timer" className="hover:text-rose-400 transition-colors">Timer</Link>
        </header>
    )
}