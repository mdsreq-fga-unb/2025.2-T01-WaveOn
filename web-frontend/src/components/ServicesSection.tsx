"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/services/api";

export default function ServicesSection() {
  const [minPrices, setMinPrices] = useState({
    "Lavagem simples": "80,00",
    "Lavagem completa": "100,00",
  });

  useEffect(() => {
    async function fetchMinPrices() {
      try {
        const response = await apiClient.get("/pricing");
        const pricings = response.data;

        // Calcula o menor preço para cada serviço
        const lavSimples = pricings
          .filter(
            (p: { serviceType?: string }) => p.serviceType === "Lavagem simples"
          )
          .map((p: { priceCents?: number }) => (p.priceCents || 0) / 100);
        const precosCompleta = pricings
          .filter(
            (p: { serviceType?: string }) =>
              p.serviceType === "Lavagem completa"
          )
          .map((p: { priceCents?: number }) => (p.priceCents || 0) / 100);

        if (lavSimples.length > 0) {
          const minSimples = Math.min(...lavSimples);
          setMinPrices((prev) => ({
            ...prev,
            "Lavagem simples": minSimples.toFixed(2).replace(".", ","),
          }));
        }

        if (precosCompleta.length > 0) {
          const minCompleta = Math.min(...precosCompleta);
          setMinPrices((prev) => ({
            ...prev,
            "Lavagem completa": minCompleta.toFixed(2).replace(".", ","),
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar preços:", error);
      }
    }
    fetchMinPrices();
  }, []);

  const handleAgendamento = (servico: string, preco: string) => {
    return `/agendamento?servico=${encodeURIComponent(
      servico
    )}&preco=${encodeURIComponent(preco)}`;
  };

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Serviços</h2>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-image">
              <img
                src="/images/services/detalhada1.PNG"
                alt="Lavagem simples"
              />
            </div>
            <div className="service-content">
              <h3 className="service-name">Lavagem simples</h3>
              <p className="service-description">
                • Externa
                <br /> • Interna <br /> • Aplicação Cera Líquida
              </p>
              <div className="service-price">
                A partir de R$ {minPrices["Lavagem simples"]}
              </div>
              <Link
                href={handleAgendamento(
                  "Lavagem simples",
                  minPrices["Lavagem simples"]
                )}
                className="service-button"
              >
                Agendar
              </Link>
            </div>
          </div>

          <div className="service-card">
            <div className="service-image">
              <img
                src="/images/services/detalhada2.png"
                alt="Lavagem completa"
              />
            </div>
            <div className="service-content">
              <h3 className="service-name">Lavagem completa</h3>
              <p className="service-description">
                • Externa Detalhada
                <br /> • Interna Detalhada <br /> • Limpeza Detalhada dos Bancos{" "}
                <br /> • Revitalização de Plásticos
              </p>
              <div className="service-price">
                A partir de R$ {minPrices["Lavagem completa"]}
              </div>
              <Link
                href={handleAgendamento(
                  "Lavagem completa",
                  minPrices["Lavagem completa"]
                )}
                className="service-button"
              >
                Agendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
