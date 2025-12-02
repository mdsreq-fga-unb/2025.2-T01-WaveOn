"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/components-css/admin-sidebar.css";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            stroke="currentColor"
            strokeWidth="2"
            rx="1"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            stroke="currentColor"
            strokeWidth="2"
            rx="1"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            stroke="currentColor"
            strokeWidth="2"
            rx="1"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            stroke="currentColor"
            strokeWidth="2"
            rx="1"
          />
        </svg>
      ),
    },
    {
      name: "Agendamentos",
      path: "/admin/agendamentos",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="2"
            x2="8"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      name: "Agenda",
      path: "/admin/agenda",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 2v4M8 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Clientes",
      path: "/admin/clientes",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Serviços",
      path: "/admin/servicos",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 1v6m0 6v6M23 12h-6m-6 0H1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Relatórios",
      path: "/admin/relatorios",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3v18h18M7 16l4-4 4 4 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link href="/">
          <img
            src="/images/id-visual/logo_claro.svg?variant=light"
            alt="WaveOn"
            className="sidebar-logo"
            loading="eager"
            width="150"
            height="60"
            key="logo-claro"
          />
        </Link>
        <h3 className="sidebar-title">Painel Admin</h3>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-item ${pathname === item.path ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link href="/" className="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="nav-label">Voltar ao Site</span>
        </Link>
      </div>
    </aside>
  );
}
