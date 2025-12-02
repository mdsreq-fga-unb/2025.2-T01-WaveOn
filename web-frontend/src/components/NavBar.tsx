"use client";

import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";

interface NavBarProps {
  showNavLinks?: boolean;
  logoVariant?: "dark" | "light";
}

export default function NavBar({
  showNavLinks = true,
  logoVariant = "dark",
}: NavBarProps) {
  const { isAuthenticated, logout, user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  const getHeaderClass = () => {
    let classes = "header";
    if (isAuthenticated) classes += " logged";
    if (!showNavLinks) classes += " logo-only";
    return classes;
  };

  const logoSrc =
    logoVariant === "light"
      ? "/images/id-visual/logo_claro.svg?variant=light"
      : "/images/id-visual/logo_escuro.svg?variant=dark";

  return (
    <header className={getHeaderClass()}>
      <Link href="/" aria-label="Ir para a Home.">
        <div className="logo">
          {!showNavLinks ? (
            <span className="logo-text">WaveOn</span>
          ) : (
            <img
              src={logoSrc}
              alt="Logo WaveOn"
              className="logo-img"
              loading="eager"
              width="150"
              height="60"
              key={logoSrc}
            />
          )}
        </div>
      </Link>

      {showNavLinks && (
        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="nav-link admin-link"
                  title="Painel Admin"
                >
                  <MdAdminPanelSettings />
                  <span>Painel Admin</span>
                </Link>
              )}
              <Link
                href="/agendamentos"
                className="nav-link"
                title="Meus Agendamentos"
              >
                <FaCalendarAlt />
                <span>Agendamentos</span>
              </Link>
              <Link href="/perfil" className="nav-link" title="Meu Perfil">
                <FaUser />
                <span>Perfil</span>
              </Link>
              <button
                onClick={handleLogout}
                className="logout-btn"
                title="Sair"
              >
                <RiLogoutBoxRLine />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="login-btn">
                Login
              </Link>
              <Link href="/cadastro" className="cadastro-btn">
                Cadastre-se
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
