"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/api";
import "@/styles/app-css/admin.css";

interface Car {
  id: number;
  brand: string;
  model: string;
  plate: string;
  year?: number;
}

interface Address {
  id: number;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  cep?: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  status: string;
  serviceType: string;
  priceCents: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  createdAt: string;
  cars?: Car[];
  addresses?: Address[];
  appointments?: Appointment[];
}

export default function AdminClientes() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchClients();
    }
  }, [user]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/users/admin/all");
      setClients(response.data);
    } catch (error: unknown) {
      console.error("Erro ao buscar clientes:", error);
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchClientDetails = async (clientId: string) => {
    try {
      const response = await apiClient.get(`/users/admin/${clientId}`);
      setSelectedClient(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes do cliente:", error);
      alert("Erro ao buscar detalhes do cliente");
    }
  };

  const filteredClients = clients.filter((client) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phone?.includes(searchTerm)
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatCurrency = (cents: number) => {
    return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
  };

  const formatPhone = (phone?: string) => {
    if (!phone) return "—";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    }
    return phone;
  };

  const formatCPF = (cpf?: string) => {
    if (!cpf) return "—";
    const cleaned = cpf.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(
        6,
        9
      )}-${cleaned.slice(9)}`;
    }
    return cpf;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; className: string } } = {
      SCHEDULED: { label: "AGENDADO", className: "badge-scheduled" },
      COMPLETED: { label: "CONCLUÍDO", className: "badge-completed" },
      CANCELLED: { label: "CANCELADO", className: "badge-cancelled" },
    };
    const mapped = statusMap[status] || {
      label: status,
      className: "badge-default",
    };
    return <span className={`badge ${mapped.className}`}>{mapped.label}</span>;
  };

  if (authLoading || loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-content">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <div>
            <h1>Gerenciar Clientes</h1>
            <p className="subtitle">
              Visualize e gerencie informações dos clientes
            </p>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="stats-cards">
            <div className="stat-card">
              <span className="stat-label">Total de Clientes</span>
              <span className="stat-value">{clients.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Resultados</span>
              <span className="stat-value">{filteredClients.length}</span>
            </div>
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "12%" }}>ID</th>
                <th style={{ width: "25%" }}>Nome</th>
                <th style={{ width: "30%" }}>Email</th>
                <th style={{ width: "15%" }}>Telefone</th>
                <th style={{ width: "13%" }}>Cadastro</th>
                <th style={{ width: "5%" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-results">
                    {searchTerm
                      ? "Nenhum cliente encontrado com os critérios de busca"
                      : "Nenhum cliente cadastrado"}
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <span className="id-short" title={client.id}>
                        {client.id.substring(0, 8)}...
                      </span>
                    </td>
                    <td className="client-name">{client.name}</td>
                    <td className="email-cell">{client.email}</td>
                    <td className="phone-cell">{formatPhone(client.phone)}</td>
                    <td className="center-text">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="center-text">
                      <button
                        className="btn-icon btn-view"
                        onClick={() => fetchClientDetails(client.id)}
                        title="Ver detalhes"
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal de Detalhes do Cliente */}
        {showDetailsModal && selectedClient && (
          <div className="modal-overlay">
            <div className="modal-content modal-large">
              <div className="modal-header">
                <h2>Detalhes do Cliente</h2>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedClient(null);
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                {/* Informações Pessoais */}
                <section className="detail-section">
                  <h3 className="section-title">📋 Informações Pessoais</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Nome:</span>
                      <span className="detail-value">
                        {selectedClient.name}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">
                        {selectedClient.email}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Telefone:</span>
                      <span className="detail-value">
                        {formatPhone(selectedClient.phone)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">CPF:</span>
                      <span className="detail-value">
                        {formatCPF(selectedClient.cpf)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Cadastro:</span>
                      <span className="detail-value">
                        {formatDate(selectedClient.createdAt)}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Veículos */}
                <section className="detail-section">
                  <h3 className="section-title">🚗 Veículos</h3>
                  {selectedClient.cars && selectedClient.cars.length > 0 ? (
                    <div className="cards-grid">
                      {selectedClient.cars.map((car) => (
                        <div key={car.id} className="info-card">
                          <div className="info-card-header">
                            <strong>
                              {car.brand} {car.model}
                            </strong>
                            {car.year && (
                              <span className="info-badge">{car.year}</span>
                            )}
                          </div>
                          <div className="info-card-body">
                            <span className="info-label">Placa:</span>
                            <span className="info-value">{car.plate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">Nenhum veículo cadastrado</p>
                  )}
                </section>

                {/* Endereços */}
                <section className="detail-section">
                  <h3 className="section-title">📍 Endereços</h3>
                  {selectedClient.addresses &&
                  selectedClient.addresses.length > 0 ? (
                    <div className="cards-grid">
                      {selectedClient.addresses.map((addr) => (
                        <div key={addr.id} className="info-card">
                          <div className="info-card-body">
                            <p>
                              {addr.street}, {addr.number}
                              {addr.complement && ` - ${addr.complement}`}
                            </p>
                            <p>
                              {addr.district}, {addr.city}
                            </p>
                            <p>
                              <strong>CEP:</strong>{" "}
                              {addr.cep || "Não informado"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">Nenhum endereço cadastrado</p>
                  )}
                </section>

                {/* Histórico de Agendamentos */}
                <section className="detail-section">
                  <h3 className="section-title">
                    📅 Histórico de Agendamentos
                  </h3>
                  {selectedClient.appointments &&
                  selectedClient.appointments.length > 0 ? (
                    <div className="table-container">
                      <table className="details-table">
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Serviço</th>
                            <th>Valor</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedClient.appointments.map((apt) => (
                            <tr key={apt.id}>
                              <td>{formatDate(apt.date)}</td>
                              <td>{apt.time}</td>
                              <td>{apt.serviceType}</td>
                              <td>{formatCurrency(apt.priceCents)}</td>
                              <td>{getStatusBadge(apt.status)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="no-data">Nenhum agendamento realizado</p>
                  )}
                </section>
              </div>

              <div className="modal-footer">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedClient(null);
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
