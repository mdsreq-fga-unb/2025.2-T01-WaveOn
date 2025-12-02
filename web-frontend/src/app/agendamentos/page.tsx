"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/api";
import "@/styles/app-css/agendamentos.css";

interface Agendamento {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  priceCents: number;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  payment?: {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    type: "PIX" | "CARD";
    qrCode?: string;
    qrCodeBase64?: string;
  };
  car: {
    name: string;
    plate: string;
    brand: string;
    model: string;
  };
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
  };
}

const AgendamentosPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loadingAgendamentos, setLoadingAgendamentos] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!loading && user) {
      fetchAgendamentos();
    }
  }, [loading, user]);

  const fetchAgendamentos = async () => {
    try {
      const response = await apiClient.get("/appointments/my");
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoadingAgendamentos(false);
    }
  };

  const handleCancelClick = (id: string) => {
    setAppointmentToCancel(id);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!appointmentToCancel) return;

    try {
      await apiClient.patch(`/appointments/${appointmentToCancel}/cancel`);
      alert("Agendamento cancelado com sucesso!");
      fetchAgendamentos();
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      alert("Erro ao cancelar agendamento");
    } finally {
      setShowCancelModal(false);
      setAppointmentToCancel(null);
    }
  };

  const handleRepeat = async (id: string) => {
    try {
      const response = await apiClient.get(`/appointments/${id}/repeat`);
      const { serviceType, vehicleCategory } = response.data;

      // Redireciona para página de agendamento com os dados pré-preenchidos
      window.location.href = `/agendamento?servico=${serviceType}&categoria=${vehicleCategory}`;
    } catch (error) {
      console.error("Erro ao repetir agendamento:", error);
      alert("Erro ao repetir agendamento");
    }
  };

  if (loading || loadingAgendamentos) {
    return (
      <div className="agendamentos-page">
        <div className="agendamentos-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const getStatusLabel = (agendamento: Agendamento) => {
    // Se o agendamento está cancelado, sempre exibir "Cancelado"
    if (agendamento.status === "CANCELLED") {
      return "Cancelado";
    }

    // Se o pagamento estiver pendente, exibir status de pagamento
    if (agendamento.payment?.status === "PENDING") {
      return "Aguardando pagamento";
    }

    const labels: { [key: string]: string } = {
      SCHEDULED: "Agendado",
      COMPLETED: "Concluído",
      CANCELLED: "Cancelado",
    };
    return labels[agendamento.status] || agendamento.status;
  };
  const getStatusClass = (agendamento: Agendamento) => {
    // Se o agendamento está cancelado, sempre usar classe de cancelado
    if (agendamento.status === "CANCELLED") {
      return "status-badge status-cancelado";
    }

    // Se o pagamento estiver pendente, usar classe de pagamento pendente
    if (agendamento.payment?.status === "PENDING") {
      return "status-badge status-pending-payment";
    }

    const statusMap: { [key: string]: string } = {
      SCHEDULED: "agendado",
      COMPLETED: "concluido",
      CANCELLED: "cancelado",
    };
    return `status-badge status-${
      statusMap[agendamento.status] || agendamento.status.toLowerCase()
    }`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatPrice = (priceCents: number) => {
    return (priceCents / 100).toFixed(2);
  };

  return (
    <div className="agendamentos-page">
      {/* Header */}
      <header className="agendamentos-header">
        <Link href="/" className="logo">
          <img
            src="/images/id-visual/logo_claro.svg?variant=light"
            alt="WaveOn Logo"
            width="150"
            height="60"
            loading="eager"
            className="logo-img"
            key="logo-agendamentos"
          />
        </Link>
        <div className="header-actions">
          <Link
            href="/perfil"
            className="icon-button"
            aria-label="Ir para perfil"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <button className="sair-button">Sair</button>
        </div>
      </header>

      <div className="agendamentos-container">
        <div className="page-header">
          <h1 className="page-title">Meus Agendamentos</h1>
          <p className="page-subtitle">
            Acompanhe todos os seus serviços agendados
          </p>
        </div>

        <div className="agendamentos-grid">
          {agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="agendamento-card">
              <div className="card-header">
                <h3 className="servico-titulo">{agendamento.serviceType}</h3>
                <span className={getStatusClass(agendamento)}>
                  {getStatusLabel(agendamento)}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <div className="info-item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="info-icon"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="#3A94E7"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        stroke="#3A94E7"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        stroke="#3A94E7"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        stroke="#3A94E7"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="info-content">
                      <span className="info-label">Data e Hora</span>
                      <span className="info-value">
                        {formatDate(agendamento.date)} às {agendamento.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="info-icon"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        stroke="#3A94E7"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        stroke="#3A94E7"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="info-content">
                      <span className="info-label">Endereço</span>
                      <span className="info-value">
                        {agendamento.address.street},{" "}
                        {agendamento.address.number} -{" "}
                        {agendamento.address.district},{" "}
                        {agendamento.address.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="info-icon"
                    >
                      <path
                        d="M5 17h14M5 17l1.5-5h11L19 17M5 17c-1.657 0-3-1.343-3-3v-1h20v1c0 1.657-1.343 3-3 3M8 12V7c0-2.209 1.791-4 4-4s4 1.791 4 4v5"
                        stroke="#3A94E7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="info-content">
                      <span className="info-label">Veículo</span>
                      <span className="info-value">
                        {agendamento.car.brand} {agendamento.car.model} -{" "}
                        {agendamento.car.plate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="valor-total">
                    <span className="valor-label">Valor:</span>
                    <span className="valor-value">
                      R$ {formatPrice(agendamento.priceCents)}
                    </span>
                  </div>

                  <div className="card-actions">
                    {agendamento.status === "SCHEDULED" && (
                      <>
                        <button
                          className="btn-danger"
                          onClick={() => handleCancelClick(agendamento.id)}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {agendamento.status === "COMPLETED" && (
                      <button
                        className="btn-primary"
                        onClick={() => handleRepeat(agendamento.id)}
                      >
                        Agendar Novamente
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {agendamentos.length === 0 && (
          <div className="empty-state">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="#CCCCCC"
                strokeWidth="2"
              />
              <line
                x1="16"
                y1="2"
                x2="16"
                y2="6"
                stroke="#CCCCCC"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="2"
                x2="8"
                y2="6"
                stroke="#CCCCCC"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="3"
                y1="10"
                x2="21"
                y2="10"
                stroke="#CCCCCC"
                strokeWidth="2"
              />
            </svg>
            <h2 className="empty-title">Nenhum agendamento encontrado</h2>
            <p className="empty-text">
              Você ainda não possui agendamentos. Que tal fazer o primeiro?
            </p>
            <Link href="/agendamento" className="btn-primary">
              Fazer Agendamento
            </Link>
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Cancelamento */}
      {showCancelModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCancelModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Cancelar Agendamento</h3>
            <p className="modal-message">
              Tem certeza que deseja cancelar este agendamento?
            </p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowCancelModal(false)}
              >
                Voltar
              </button>
              <button className="btn-danger" onClick={confirmCancel}>
                Sim, Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamentosPage;
