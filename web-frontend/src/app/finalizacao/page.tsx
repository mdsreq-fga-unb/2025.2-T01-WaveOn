"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/api";
import AlertInfo from "@/components/AlertInfo";
import "@/styles/app-css/finalizacao.css";
import CardFormInline, { CardFormData } from "@/components/CardFormInline";

const FinalizacaoContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout, loading } = useAuth();

  const servico = searchParams.get("servico") || "";
  const data = searchParams.get("data") || "";
  const horario = searchParams.get("horario") || "";
  const categoria = searchParams.get("categoria") || "";
  const preco = searchParams.get("preco") || "";

  const [showPaymentCards, setShowPaymentCards] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [userCars, setUserCars] = useState<
    Array<{
      id: string;
      brand?: string;
      model?: string;
      plate?: string;
      category?: string;
      marca?: string;
      modelo?: string;
      placa?: string;
      licensePlate?: string;
    }>
  >([]);
  const [userAddresses, setUserAddresses] = useState<
    Array<{
      id: string;
      street?: string;
      number?: string;
      district?: string;
      neighborhood?: string;
      city?: string;
    }>
  >([]);
  const [torneira, setTorneira] = useState(false);
  const [tomada, setTomada] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardToken, setCardToken] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && !loading) {
        try {
          const [carsResponse, addressesResponse] = await Promise.all([
            apiClient.get("/cars/my"),
            apiClient.get("/addresses/my"),
          ]);
          setUserCars(carsResponse.data);
          setUserAddresses(addressesResponse.data);
        } catch (error: unknown) {
          const err = error as { response?: { status?: number } };
          // Só mostra erro se não for 401
          if (err.response?.status !== 401) {
            alert("Erro ao carregar dados. Tente novamente.");
          }
        }
      }
    };

    fetchUserData();
  }, [user, loading]);

  const handleContinueInfo = () => {
    if (!selectedAddress || !selectedVehicle) {
      alert("Por favor, selecione endereço e veículo");
      return;
    }
    setShowPaymentCards(true);
  };

  const handleFinalizar = async () => {
    if (!selectedPayment) {
      alert("Por favor, selecione um método de pagamento");
      return;
    }

    if (!torneira || !tomada) {
      alert("Por favor, confirme os itens necessários");
      return;
    }

    try {
      // ================================
      // 1️⃣ Criar o agendamento
      // ================================

      // Buscar a categoria do carro selecionado
      const selectedCar = userCars.find((car) => car.id === selectedVehicle);
      const vehicleCategory = selectedCar?.category || categoria;

      const appointmentData = {
        serviceType: servico,
        date: data,
        time: horario,
        carId: selectedVehicle,
        addressId: selectedAddress,
        vehicleCategory: vehicleCategory,
      };

      const appointmentResp = await apiClient.post(
        "/appointments",
        appointmentData
      );
      const appointmentId = appointmentResp.data.id;

      // ================================
      // 2️⃣ Pagamento PIX
      // ================================
      if (selectedPayment === "pix") {
        const paymentResp = await apiClient.post("/payments/pix", {
          appointmentId,
          userId: user?.id,
        });

        const paymentId = paymentResp.data.paymentId;

        // REDIRECIONAR PARA TELA DO QR CODE PIX
        router.push(`/finalizacao/pix/${paymentId}`);
        return;
      }

      // *** VALIDAR FORMULÁRIO DE CARTÃO ***
      if (selectedPayment === "cartao" && !cardToken) {
        alert("Preencha os dados do cartão antes de finalizar!");
        return;
      }

      // ================================
      // 3️⃣ Pagamento CARTÃO (mock)
      // ================================
      if (selectedPayment === "cartao") {
        await apiClient.post("/payments/card", {
          appointmentId,
          userId: user?.id,
          token: cardToken,
          installment: 1,
        });

        // REDIRECIONAR PARA HOME
        alert("Agendamento realizado com sucesso!");
        router.push("/");
        return;
      }
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string }; status?: number };
      };

      const errorMessage =
        err.response?.data?.message ||
        "Erro ao finalizar agendamento. Tente novamente.";
      alert(errorMessage);
    }
  };

  return (
    <div className="finalizacao-page">
      {/* Header */}
      <header className="finalizacao-header">
        <Link href="/" className="logo">
          <img
            src="/images/id-visual/logo_claro.svg"
            alt="WaveOn Logo"
            width="150"
            height="60"
            loading="eager"
            className="logo-img"
          />
        </Link>
        <div className="header-actions">
          <button className="icon-button">
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
          </button>
          <button className="sair-button" onClick={logout}>
            Sair
          </button>
        </div>
      </header>

      <div
        className={`finalizacao-container ${
          showPaymentCards ? "multiple-cards" : "single-card"
        }`}
      >
        {/* Card 1: Verificar Informações */}
        <div className={`card ${showPaymentCards ? "first-card" : ""}`}>
          <h2 className="card-title">Verificar Informações</h2>

          <div className="info-section">
            <label className="info-label">Endereços</label>
            <select
              className="info-select"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <option value="">Selecionar</option>
              {userAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.street}, {address.number} - {address.neighborhood}
                </option>
              ))}
            </select>
            {userAddresses.length === 0 && (
              <AlertInfo
                message="Nenhum endereço cadastrado."
                linkText="Cadastre aqui"
                linkHref="/perfil"
                icon="📍"
                color="#f59e0b"
              />
            )}
          </div>

          <div className="info-section">
            <label className="info-label">Veículo</label>
            <select
              className="info-select"
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            >
              <option value="">Selecionar</option>
              {userCars.map((car) => (
                <option key={car.id} value={car.id}>
                  {(car.marca || car.brand || "") +
                    " " +
                    (car.modelo || car.model || "") +
                    (car.placa
                      ? " - " + car.placa
                      : car.licensePlate
                      ? " - " + car.licensePlate
                      : "")}
                </option>
              ))}
            </select>
            {userCars.length === 0 && (
              <AlertInfo
                message="Nenhum veículo cadastrado."
                linkText="Cadastre aqui"
                linkHref="/perfil"
                icon="🚗"
                color="#3a94e7"
              />
            )}
          </div>

          <div className="info-row">
            <div className="info-section">
              <label className="info-label">Data</label>
              <input
                type="text"
                className="info-input"
                value={data ? data.split("-").reverse().join("/") : ""}
                readOnly
              />
            </div>
            <div className="info-section">
              <label className="info-label">Hora</label>
              <input
                type="text"
                className="info-input"
                value={horario}
                readOnly
              />
            </div>
          </div>

          <div className="info-section">
            <label className="info-label">Nome</label>
            <p className="info-text">{user?.name || "Não informado"}</p>
          </div>

          <div className="info-section">
            <label className="info-label">Email</label>
            <p className="info-text">{user?.email || "Não informado"}</p>
          </div>

          <div className="info-section">
            <label className="info-label">Celular</label>
            <p className="info-text">{user?.phone || "Não informado"}</p>
          </div>

          <button className="continuar-button" onClick={handleContinueInfo}>
            Continuar
          </button>
        </div>

        {/* Card 2: Selecionar método de pagamento */}
        {showPaymentCards && (
          <div className="card new-card">
            <h2 className="card-title">Selecionar método de pagamento</h2>

            <div
              className={`payment-option ${
                selectedPayment === "pix" ? "selected" : ""
              }`}
              onClick={() => setSelectedPayment("pix")}
            >
              <div className="payment-icon pix-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#32BCAD" />
                  <path
                    d="M28 16l-4 4 4 4M12 16l4 4-4 4M16 12l8 16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="payment-info">
                <h3 className="payment-title">PIX</h3>
                <p className="payment-subtitle">Pague com Pix</p>
                <p className="payment-description">
                  Pagamento Rápido por QRCODE
                </p>
              </div>
            </div>

            <div
              className={`payment-option ${
                selectedPayment === "cartao" ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedPayment("cartao");
                setShowCardForm(true);
              }}
            >
              <div className="payment-icon card-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#555555" />
                  <rect
                    x="8"
                    y="12"
                    width="24"
                    height="16"
                    rx="2"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <line
                    x1="8"
                    y1="16"
                    x2="32"
                    y2="16"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="payment-info">
                <h3 className="payment-title">Cartão</h3>
                <p className="payment-subtitle">Cartão de crédito</p>
                <p className="payment-description">Pague usando seu cartão</p>
              </div>
            </div>
            {selectedPayment === "cartao" && showCardForm && (
              <CardFormInline
                onSubmit={(data: CardFormData) => {
                  setCardToken(data.token);
                  setShowCardForm(false);
                  alert("Cartão validado!");
                }}
                onCancel={() => setShowCardForm(false)}
              />
            )}
            <button className="continuar-button">Continuar</button>
          </div>
        )}

        {/* Card 3: Finalizar Agendamento */}
        {showPaymentCards && (
          <div className="card new-card">
            <h2 className="card-title">Finalizar Agendamento</h2>

            <div className="summary-section">
              <p className="summary-label">{servico}</p>
              <p className="summary-quantity">1x</p>
            </div>

            <div className="total-section">
              <p className="total-label">Total</p>
              <p className="total-value">R${preco}</p>
            </div>

            <div className="checklist-section">
              <p className="checklist-text">
                Para melhor atendê-los, pedimos que confirme os seguintes itens:
              </p>
              <div className="checklist-item">
                <input
                  type="checkbox"
                  id="torneira"
                  checked={torneira}
                  onChange={(e) => setTorneira(e.target.checked)}
                />
                <label htmlFor="torneira">Torneira de fácil acesso</label>
              </div>
              <div className="checklist-item">
                <input
                  type="checkbox"
                  id="tomada"
                  checked={tomada}
                  onChange={(e) => setTomada(e.target.checked)}
                />
                <label htmlFor="tomada">Tomada de fácil acesso</label>
              </div>
            </div>

            <button className="continuar-button" onClick={handleFinalizar}>
              Finalizar Agendamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FinalizacaoPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FinalizacaoContent />
    </Suspense>
  );
};

export default FinalizacaoPage;
