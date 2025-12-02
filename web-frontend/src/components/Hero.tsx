"use client";

import React from "react";

export default function Hero() {
  const scrollToServices = () => {
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero-automotive">
      <div className="hero-content">
        <h1 className="hero-title">
          Lavagem Automotiva a domicílio,<br />
          Sem sair de casa.
        </h1>
        <p className="hero-subtitle">
          Somos Especialistas em lavagem de veículos em domicílio com<br />
          Qualidade, Segurança e Comodidade
        </p>
        <button className="hero-button" onClick={scrollToServices}>
          Agendar
        </button>
      </div>
    </section>
  );
}
