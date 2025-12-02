"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/api";
import "@/styles/app-css/admin.css";

interface Pricing {
  id: string;
  serviceType: string;
  vehicleCategory: string;
  priceCents: number;
}

export default function AdminServicos() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [pricings, setPricings] = useState<Pricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPricing, setEditingPricing] = useState<Pricing | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [priceInput, setPriceInput] = useState("");

  const serviceTypes = ["Lavagem simples", "Lavagem completa"];
  const categories = ["Hatch", "Sedan", "SUV", "Caminhonete"];

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchPricings();
    }
  }, [user]);

  const fetchPricings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/pricing");
      setPricings(response.data);
    } catch (error) {
      console.error("Erro ao buscar preços:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPrice = (pricing: Pricing) => {
    setEditingPricing(pricing);
    setPriceInput((pricing.priceCents / 100).toFixed(2));
    setShowModal(true);
  };

  const handleSavePrice = async () => {
    if (!editingPricing) return;

    try {
      const priceCents = Math.round(parseFloat(priceInput) * 100);

      await apiClient.patch(`/pricing/${editingPricing.id}`, {
        priceCents,
      });

      fetchPricings();
      setShowModal(false);
      setEditingPricing(null);
      setPriceInput("");
    } catch (error) {
      console.error("Erro ao atualizar preço:", error);
      alert("Erro ao atualizar preço. Tente novamente.");
    }
  };

  const getPriceForService = (serviceType: string, category: string) => {
    const pricing = pricings.find(
      (p) => p.serviceType === serviceType && p.vehicleCategory === category
    );
    return pricing ? (pricing.priceCents / 100).toFixed(2) : "-";
  };

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
          <h1 className="page-title">Gerenciar Preços dos Serviços</h1>
          <p className="page-subtitle">
            Edite os preços das lavagens por categoria de veículo
          </p>
        </div>

        <div className="dashboard-section">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Hatch</th>
                  <th>Sedan</th>
                  <th>SUV</th>
                  <th>Caminhonete</th>
                </tr>
              </thead>
              <tbody>
                {serviceTypes.map((serviceType) => (
                  <tr key={serviceType}>
                    <td style={{ fontWeight: "600" }}>{serviceType}</td>
                    {categories.map((category) => {
                      const pricing = pricings.find(
                        (p) =>
                          p.serviceType === serviceType &&
                          p.vehicleCategory === category
                      );
                      return (
                        <td key={category}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <span>
                              R$ {getPriceForService(serviceType, category)}
                            </span>
                            {pricing && (
                              <button
                                className="btn-icon"
                                onClick={() => handleEditPrice(pricing)}
                                title="Editar preço"
                              >
                                ✏️
                              </button>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && editingPricing && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">Editar Preço</h3>

              <div className="form-group">
                <label>Serviço:</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingPricing.serviceType}
                  disabled
                  style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label>Categoria:</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingPricing.vehicleCategory}
                  disabled
                  style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label>Preço (R$):</label>
                <input
                  type="number"
                  className="form-input"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  autoFocus
                />
              </div>

              <div className="modal-actions">
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPricing(null);
                    setPriceInput("");
                  }}
                >
                  Cancelar
                </button>
                <button className="btn-primary" onClick={handleSavePrice}>
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
