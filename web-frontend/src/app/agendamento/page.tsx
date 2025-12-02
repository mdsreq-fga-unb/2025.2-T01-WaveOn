"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Car } from "@/types/car";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/api";
import "@/styles/app-css/agendamento.css";
import "@/styles/components-css/login-modal.css";

function AgendamentoContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const servico = searchParams.get("servico") || "Lavagem simples";
  const preco = searchParams.get("preco") || "50,00";

  const servicoImage =
    servico === "Lavagem completa"
      ? "/images/services/detalhada2.png"
      : "/images/services/detalhada1.PNG";

  const descricaoServicos: { [key: string]: string } = {
    "Lavagem simples":
      "• Lavagem externa.<br /> • Limpeza Interna Simples.<br />• Limpeza Superficial de bancos.<br /> • Limpeza Simples de rodas, Pneus e Caixa de rodas. <br /> • Selante de Pneus.",
    "Lavagem completa":
      "• Lavagem Externa Detalhada. <br /> • Desincrustação de emblemas. <br /> • Limpeza Interna Detalhada.<br /> • Limpeza de Bancos detalhada. <br /> • Revitalização de Plasticos Internos <br/>e Externos 30 dias.<br /> • Selante de Pneus",
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [categoryError, setCategoryError] = useState<string>("");

  useEffect(() => {
    const fetchUserCars = async () => {
      if (!user) return;
      try {
        const response = await apiClient.get("/cars/my");

        const cars = Array.isArray(response.data)
          ? response.data.map(
              (car: {
                id: string;
                marca?: string;
                brand?: string;
                modelo?: string;
                model?: string;
                placa?: string;
                plate?: string;
                licensePlate?: string;
                categoria?: string;
                category?: string;
                tipo?: string;
              }) => ({
                id: car.id,
                marca: car.marca || car.brand || "",
                modelo: car.modelo || car.model || "",
                placa: car.placa || car.plate || car.licensePlate || "",
                categoria: car.categoria || car.category || car.tipo || "",
              })
            )
          : [];
        setUserCars(cars);
      } catch {
        setUserCars([]);
      }
    };
    fetchUserCars();
  }, [user]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentPrice, setCurrentPrice] = useState(preco);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const redirectPathRef = useRef<string | null>(null);

  const generateMonthCalendar = () => {
    const today = new Date();
    const year = currentYear;
    const month = currentMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const fullDate = date.toISOString().split("T")[0];
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const isPast =
        date.getFullYear() < today.getFullYear() ||
        (date.getFullYear() === today.getFullYear() &&
          date.getMonth() < today.getMonth()) ||
        (date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          day < today.getDate());

      const diffInDays = Math.ceil(
        (date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      );
      const isAvailable = !isPast && diffInDays >= 0 && diffInDays <= 7;

      days.push({
        day: day,
        month: month,
        year: year,
        fullDate: fullDate,
        isToday: isToday,
        isPast: isPast,
        isAvailable: isAvailable,
        dayName: date.toLocaleDateString("pt-BR", { weekday: "short" }),
      });
    }

    return {
      days,
      monthName: firstDay.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      }),
    };
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const today = new Date();
  const canGoPrevious =
    currentYear > today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
  const diffToNextMonth = Math.ceil(
    (nextMonthDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const canGoNext = diffToNextMonth <= 7;

  const getAvailableTimeSlots = async (date: string) => {
    const allSlots = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];

    try {
      const response = await apiClient.get(
        `/appointments/available-slots?date=${date}`
      );

      const bookedSlots = response.data.bookedSlots || [];

      const now = new Date();
      const selected = new Date(date + "T00:00:00");
      let filteredSlots = allSlots;
      if (
        selected.getDate() === now.getDate() &&
        selected.getMonth() === now.getMonth() &&
        selected.getFullYear() === now.getFullYear()
      ) {
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        filteredSlots = allSlots.filter((slot) => {
          const slotMinutes = parseTime(slot);

          return slotMinutes > nowMinutes;
        });
      }

      if (bookedSlots.length === 0) {
        return filteredSlots;
      }

      const availableSlots = filteredSlots.filter((slot) => {
        if (bookedSlots.includes(slot)) {
          return false;
        }

        const currentTime = parseTime(slot);

        for (const bookedSlot of bookedSlots) {
          const bookedTime = parseTime(bookedSlot);
          const timeDiff = Math.abs(currentTime - bookedTime);

          if (timeDiff < 240) {
            return false;
          }
        }

        return true;
      });

      return availableSlots;
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error);

      const now = new Date();
      const selected = new Date(date + "T00:00:00");
      if (
        selected.getDate() === now.getDate() &&
        selected.getMonth() === now.getMonth() &&
        selected.getFullYear() === now.getFullYear()
      ) {
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        return allSlots.filter((slot) => {
          const slotMinutes = parseTime(slot);
          return slotMinutes > nowMinutes;
        });
      }
      return allSlots;
    }
  };

  const parseTime = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  useEffect(() => {
    if (selectedDate) {
      getAvailableTimeSlots(selectedDate).then((available) => {
        setAvailableSlots(available);
        setSelectedTime("");
      });
    }
  }, [selectedDate]);

  const categories = ["Hatch", "Sedan", "SUV", "Caminhonete"];

  const fetchPriceByCategory = async (
    category: string,
    serviceType: string
  ) => {
    try {
      const url = `/pricing/${encodeURIComponent(
        serviceType
      )}/${encodeURIComponent(category)}`;

      const response = await apiClient.get(url);
      return response.data.price;
    } catch {
      return preco;
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setCategoryError("");

    if (!user) {
      setCategoryError(
        "Você precisa estar logado para agendar. Clique em Continuar para fazer login ou cadastro."
      );
      return;
    }

    if (category) {
      const newPrice = await fetchPriceByCategory(category, servico);
      setCurrentPrice(newPrice);

      const hasCar = userCars.some((car) => car.categoria === category);
      if (!hasCar) {
        setCategoryError(
          `Você não possui um carro cadastrado do tipo ${category}. Cadastre um novo carro ou selecione outra categoria.`
        );
      }
    } else {
      setCurrentPrice(preco);
      setCategoryError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      redirectPathRef.current =
        window.location.pathname + window.location.search;
      setShowLoginModal(true);
      return;
    }
    if (!selectedDate || !selectedTime || !selectedCategory) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const params = new URLSearchParams({
      servico,
      data: selectedDate,
      horario: selectedTime,
      categoria: selectedCategory,
      preco: currentPrice,
    });
    router.push(`/finalizacao?${params.toString()}`);
  };

  useEffect(() => {
    if (user && showLoginModal && redirectPathRef.current) {
      router.push(redirectPathRef.current);
      redirectPathRef.current = null;
      setShowLoginModal(false);
    }
  }, [user, showLoginModal, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <NavBar />

      <div className="agendamento-container">
        <div className="agendamento-content">
          <div className="service-info">
            <div className="service-image-container">
              <img src={servicoImage} alt={servico} className="service-image" />
            </div>
            <div className="service-details">
              <h2 className="service-title">{servico}</h2>
              <p
                className="service-description"
                style={{
                  margin: "8px 0",
                  color: "#444",
                  fontSize: "1rem",
                  textAlign: "justify",
                  lineHeight: 1.6,
                }}
                dangerouslySetInnerHTML={{ __html: descricaoServicos[servico] }}
              />
              <div className="price-container">
                {selectedCategory ? (
                  <p className="service-price-text">R$ {currentPrice}</p>
                ) : (
                  <p className="service-price-text">A Partir de R$ {preco}</p>
                )}
                <p className="service-note">
                  {selectedCategory
                    ? `Preço para veículo ${selectedCategory}`
                    : "*Preço varia com base na categoria do veículo selecionado*"}
                </p>
              </div>
            </div>
          </div>

          <div className="booking-form-container">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-section">
                <div className="calendar-navigation">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    disabled={!canGoPrevious}
                    className="nav-button"
                  >
                    ←
                  </button>
                  <h3 className="section-title">
                    {generateMonthCalendar().monthName}
                  </h3>
                  <button
                    type="button"
                    onClick={goToNextMonth}
                    disabled={!canGoNext}
                    className="nav-button"
                  >
                    →
                  </button>
                </div>
                <p className="calendar-subtitle">
                  Dias disponíveis nos próximos 7 dias
                </p>

                <div className="calendar-header">
                  <div className="day-header">Dom</div>
                  <div className="day-header">Seg</div>
                  <div className="day-header">Ter</div>
                  <div className="day-header">Qua</div>
                  <div className="day-header">Qui</div>
                  <div className="day-header">Sex</div>
                  <div className="day-header">Sáb</div>
                </div>

                <div className="calendar-month-grid">
                  {generateMonthCalendar().days.map((dateObj, index) => (
                    <div key={index} className="calendar-day-container">
                      {dateObj ? (
                        <button
                          type="button"
                          disabled={!dateObj.isAvailable}
                          className={`
                            calendar-month-day 
                            ${dateObj.isToday ? "today" : ""}
                            ${dateObj.isPast ? "past" : ""}
                            ${!dateObj.isAvailable ? "blocked" : "available"}
                            ${
                              selectedDate === dateObj.fullDate
                                ? "selected"
                                : ""
                            }
                          `}
                          onClick={() =>
                            dateObj.isAvailable
                              ? setSelectedDate(dateObj.fullDate)
                              : null
                          }
                        >
                          {dateObj.day}
                        </button>
                      ) : (
                        <div className="empty-day"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label className="section-label">Horário:</label>
                {!selectedDate ? (
                  <select disabled className="form-select disabled">
                    <option>Selecione uma data primeiro</option>
                  </select>
                ) : (
                  <>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Selecionar horário</option>
                      {availableSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>

                    {availableSlots.length === 0 && (
                      <p className="time-rule-info">
                        Nenhum horário disponível. Lembre-se: deve haver pelo
                        menos 4 horas entre lavagens.
                      </p>
                    )}
                    {availableSlots.length > 0 && availableSlots.length < 4 && (
                      <p className="time-rule-info">
                        Poucos horários disponíveis devido à regra de 4 horas
                        entre lavagens.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="form-section">
                <label className="section-label">Categoria:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-select"
                >
                  <option value="">Selecionar categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {categoryError && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    margin: "12px 0 0 0",
                    padding: "12px 18px",
                    background: categoryError.includes("logado")
                      ? "#fffbe6"
                      : "#fff6f6",
                    color: categoryError.includes("logado")
                      ? "#eab308"
                      : "#c62828",
                    border: categoryError.includes("logado")
                      ? "1px solid #fde68a"
                      : "1px solid #f5c2c7",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "0.75rem",
                    fontFamily: "Inter, sans-serif",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ flexShrink: 0 }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill={
                        categoryError.includes("logado") ? "#fde68a" : "#f5c2c7"
                      }
                    />
                    <path
                      d="M12 7v5"
                      stroke={
                        categoryError.includes("logado") ? "#eab308" : "#c62828"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="16"
                      r="1.2"
                      fill={
                        categoryError.includes("logado") ? "#eab308" : "#c62828"
                      }
                    />
                  </svg>
                  <span>{categoryError}</span>
                </div>
              )}
              <button
                type="submit"
                className="agendar-button"
                disabled={!!categoryError && !categoryError.includes("logado")}
                onClick={(e) => {
                  if (!user && categoryError.includes("logado")) {
                    e.preventDefault();
                    redirectPathRef.current =
                      window.location.pathname + window.location.search;
                    setShowLoginModal(true);
                  }
                }}
              >
                Continuar
              </button>
            </form>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default function AgendamentoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AgendamentoContent />
    </Suspense>
  );
}
