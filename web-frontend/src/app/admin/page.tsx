"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import apiClient from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/app-css/admin.css";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState([
    { title: "Agendamentos Hoje", value: "-", icon: "📅", color: "#3a94e7" },
    { title: "Pendentes", value: "-", icon: "⏰", color: "#f59e0b" },
    { title: "Concluídos (Mês)", value: "-", icon: "✅", color: "#10b981" },
    { title: "Receita (Mês)", value: "-", icon: "💰", color: "#8b5cf6" },
  ]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await apiClient.get("/appointments/admin/all");
        const appointments = res.data;

        // Calcula indicadores
        const today = new Date().toISOString().slice(0, 10);
        const agendamentosHoje = appointments.filter(
          (a: { date?: string }) => a.date?.slice(0, 10) === today
        );
        const pendentes = appointments.filter(
          (a: { status?: string }) => a.status === "SCHEDULED"
        );
        const concluidosMes = appointments.filter(
          (a: { status?: string; date?: string }) =>
            a.status === "COMPLETED" &&
            a.date?.slice(0, 7) === today.slice(0, 7)
        );

        const receitaMes = concluidosMes.reduce(
          (acc: number, a: { priceCents?: number }) =>
            acc + (a.priceCents || 0) / 100,
          0
        );

        setStats([
          {
            title: "Agendamentos Hoje",
            value: agendamentosHoje.length.toString(),
            icon: "📅",
            color: "#3a94e7",
          },
          {
            title: "Pendentes",
            value: pendentes.length.toString(),
            icon: "⏰",
            color: "#f59e0b",
          },
          {
            title: "Concluídos (Mês)",
            value: concluidosMes.length.toString(),
            icon: "✅",
            color: "#10b981",
          },
          {
            title: "Receita (Mês)",
            value: `R$ ${receitaMes.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            icon: "💰",
            color: "#8b5cf6",
          },
        ]);

        setRecentAppointments(agendamentosHoje);
      } catch {
        // Erro ao buscar dados do dashboard
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [user, logout]);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral do sistema</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card"
              style={{ borderTopColor: stat.color }}
            >
              <div
                className="stat-icon"
                style={{ background: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Agendamentos de Hoje</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Horário</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5}>Carregando...</td>
                  </tr>
                ) : recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5}>Nenhum agendamento hoje.</td>
                  </tr>
                ) : (
                  recentAppointments.map(
                    (appointment: {
                      id: string;
                      user?: { name?: string };
                      serviceType?: string;
                      serviceName?: string;
                      service?: string;
                      time?: string;
                      date?: string;
                      status?: string;
                    }) => (
                      <tr key={appointment.id}>
                        <td>{appointment.user?.name || "-"}</td>
                        <td>
                          {appointment.serviceType ||
                            appointment.serviceName ||
                            appointment.service ||
                            "-"}
                        </td>
                        <td>
                          {appointment.time ||
                            appointment.date?.slice(11, 16) ||
                            "-"}
                        </td>
                        <td>
                          <span
                            className={`badge badge-${appointment.status?.toLowerCase()}`}
                          >
                            {appointment.status === "SCHEDULED"
                              ? "Agendado"
                              : appointment.status === "COMPLETED"
                              ? "Concluído"
                              : appointment.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-icon">👁️</button>
                          <button className="btn-icon">✏️</button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
