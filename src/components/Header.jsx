import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-slate-900 text-white flex justify-center gap-10 p-5">
            <Link to="/">Beranda</Link>
            <Link to="/Tugas">Tugas</Link>
            <Link to="/Timer">Timer</Link>
        </header>
    )
}