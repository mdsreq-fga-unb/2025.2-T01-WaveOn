"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/api";
import "@/styles/app-css/admin.css";

interface Appointment {
  id: number;
  date: string;
  timeSlot: string;
  time: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  observations?: string;
  serviceType: string;
  vehicleCategory: string;
  totalPrice: number;
  priceCents: number;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  };
  car: {
    id: number;
    brand: string;
    model: string;
    licensePlate: string;
    plate: string;
    category?: string;
  };
  address: {
    id: number;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    cep: string;
  };
}

export default function AdminAgendamentos() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showObsModal, setShowObsModal] = useState(false);
  const [observacoes, setObservacoes] = useState("");

  // Verificação de permissão de admin
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // Buscar agendamentos do backend
  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/appointments/admin/all");
      setAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      alert("Erro ao carregar agendamentos");
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      SCHEDULED: "Agendado",
      COMPLETED: "Concluído",
      CANCELLED: "Cancelado",
    };
    return labels[status] || status;
  };

  const getStatusClass = (status: string) => {
    const classes: { [key: string]: string } = {
      SCHEDULED: "badge-scheduled",
      COMPLETED: "badge-completed",
      CANCELLED: "badge-cancelled",
    };
    return classes[status] || "";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatPrice = (priceCents: number | null | undefined) => {
    if (typeof priceCents !== "number" || isNaN(priceCents)) return "--";
    return (priceCents / 100).toFixed(2);
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleAddObservation = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setObservacoes(appointment.observations || "");
    setShowObsModal(true);
  };

  const handleSaveObservation = async () => {
    if (!selectedAppointment) return;

    try {
      await apiClient.patch(
        `/appointments/${selectedAppointment.id}/observations`,
        { observations: observacoes }
      );
      alert("Observação salva com sucesso!");
      setShowObsModal(false);
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao salvar observação:", error);
      alert("Erro ao salvar observação");
    }
  };

  const handleCancelAppointment = async (id: number) => {
    try {
      await apiClient.patch(`/appointments/${id}/cancel`);
      alert("🚫 Agendamento cancelado com sucesso!");
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      alert(
        "❌ Erro ao cancelar agendamento. Verifique permissões ou tente novamente."
      );
    }
  };

  const handleCompleteAppointment = async (id: number) => {
    try {
      await apiClient.patch(`/appointments/${id}/complete`);
      alert("✅ Agendamento concluído com sucesso!");
      fetchAppointments();
    } catch (error) {
      console.error("Erro ao concluir agendamento:", error);
      alert(
        "❌ Erro ao concluir agendamento. Verifique permissões ou tente novamente."
      );
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus !== "all" && apt.status !== filterStatus) return false;

    if (filterDate !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);

      if (filterDate === "today") {
        if (aptDate.getTime() !== today.getTime()) return false;
      } else if (filterDate === "tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (aptDate.getTime() !== tomorrow.getTime()) return false;
      } else if (filterDate === "week") {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        if (aptDate < today || aptDate > weekFromNow) return false;
      }
    }

    return true;
  });

  if (authLoading || (user?.role === "ADMIN" && loading)) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-content">
          <div className="admin-header">
            <h1 className="page-title">Carregando...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <div className="admin-header">
          <h1 className="page-title">Gerenciar Agendamentos</h1>
          <p className="page-subtitle">
            Visualize, edite e gerencie todos os agendamentos
          </p>
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label>Data:</label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos</option>
              <option value="today">Hoje</option>
              <option value="tomorrow">Amanhã</option>
              <option value="week">Esta Semana</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos</option>
              <option value="SCHEDULED">Agendado</option>
              <option value="COMPLETED">Concluído</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Data/Hora</th>
                  <th>Veículo</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      Nenhum agendamento encontrado
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <div>
                          <div className="client-name">
                            {appointment.user.name}
                          </div>
                          <div className="client-phone">
                            {appointment.user.phone || appointment.user.email}
                          </div>
                        </div>
                      </td>
                      <td>{appointment.serviceType}</td>
                      <td>
                        {formatDate(appointment.date)}
                        {appointment.timeSlot
                          ? ` às ${appointment.timeSlot}`
                          : appointment.time
                          ? ` às ${appointment.time}`
                          : ""}
                      </td>
                      <td>
                        {appointment.car
                          ? `${appointment.car.brand || ""} ${
                              appointment.car.model || ""
                            }`.trim() || "-"
                          : "-"}
                      </td>
                      <td className="price-cell">
                        R$ {formatPrice(appointment.priceCents)}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusClass(
                            appointment.status
                          )}`}
                        >
                          {getStatusLabel(appointment.status)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-action btn-view"
                            onClick={() => handleViewDetails(appointment)}
                            title="Ver detalhes"
                          >
                            👁️
                          </button>
                          <button
                            className="btn-action btn-obs"
                            onClick={() => handleAddObservation(appointment)}
                            title="Adicionar observação"
                          >
                            📝
                          </button>
                          {appointment.status === "SCHEDULED" && (
                            <>
                              <button
                                className="btn-action btn-complete"
                                onClick={() =>
                                  handleCompleteAppointment(appointment.id)
                                }
                                title="Marcar como concluído"
                              >
                                ✅
                              </button>
                              <button
                                className="btn-action btn-cancel"
                                onClick={() =>
                                  handleCancelAppointment(appointment.id)
                                }
                                title="Cancelar"
                              >
                                ❌
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Detalhes */}
        {showModal && selectedAppointment && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="modal-content modal-large"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">Detalhes do Agendamento</h3>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Cliente:</span>
                  <span className="detail-value">
                    {selectedAppointment.user.name}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    {selectedAppointment.user.email}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telefone:</span>
                  <span className="detail-value">
                    {selectedAppointment.user.phone || "Não informado"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Serviço:</span>
                  <span className="detail-value">
                    {selectedAppointment.serviceType}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Categoria do Veículo:</span>
                  <span className="detail-value">
                    {selectedAppointment.car?.category || "--"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Data/Hora:</span>
                  <span className="detail-value">
                    {formatDate(selectedAppointment.date)}
                    {selectedAppointment.time
                      ? ` às ${selectedAppointment.time}`
                      : ""}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Veículo:</span>
                  <span className="detail-value">
                    {selectedAppointment.car?.brand || ""}{" "}
                    {selectedAppointment.car?.model || ""}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Placa:</span>
                  <span className="detail-value">
                    {selectedAppointment.car?.plate || "--"}
                  </span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Endereço:</span>
                  <span className="detail-value">
                    {selectedAppointment.address?.street},{" "}
                    {selectedAppointment.address?.number}
                    {selectedAppointment.address?.complement &&
                      ` - ${selectedAppointment.address.complement}`}
                    <br />
                    {selectedAppointment.address?.neighborhood} -{" "}
                    {selectedAppointment.address?.city}/
                    {selectedAppointment.address?.state}
                    <br />
                    CEP: {selectedAppointment.address?.cep || "--"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Valor:</span>
                  <span className="detail-value">
                    R$ {formatPrice(selectedAppointment.priceCents)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`badge ${getStatusClass(
                      selectedAppointment.status
                    )}`}
                  >
                    {getStatusLabel(selectedAppointment.status)}
                  </span>
                </div>
                {selectedAppointment.observations && (
                  <div className="detail-item full-width">
                    <span className="detail-label">Observações:</span>
                    <span className="detail-value">
                      {selectedAppointment.observations}
                    </span>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Observações */}
        {showObsModal && selectedAppointment && (
          <div className="modal-overlay" onClick={() => setShowObsModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Adicionar Observação</h3>

              <div className="form-group">
                <label>Observações sobre o cliente ou agendamento:</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Digite suas observações aqui..."
                />
              </div>

              <div className="modal-actions">
                <button
                  className="btn-primary"
                  onClick={() => setShowObsModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn-primary" onClick={handleSaveObservation}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
