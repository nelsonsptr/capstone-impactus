
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-header">
      <Link
        to="/"
        className={`header-link ${isActive("/") ? "active" : ""}`}
      >
        Beranda
      </Link>

      <Link
        to="/Tugas"
        className={`header-link ${isActive("/Tugas") ? "active" : ""}`}
      >
        Tugas
      </Link>

      <Link
        to="/Timer"
        className={`header-link ${isActive("/Timer") ? "active" : ""}`}
      >
        Timer
      </Link>

      <div className="header-profile">
        <Link
          to="/Profil"
          title="Lihat Profil"
          className="header-profile-link"
        >
          <div className="header-avatar">I</div>
          <span className="header-brand">Impactus</span>
        </Link>
      </div>
    </header>
  );
}
