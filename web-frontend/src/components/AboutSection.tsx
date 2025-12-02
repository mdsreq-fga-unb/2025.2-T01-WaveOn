import React from "react";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">Sobre a VBLavagens</h2>
        <p className="about-description">
          A VBLavagens surgiu para atender a crescente demanda por cuidados automotivos modernos, oferecendo lavagem de veículos diretamente no endereço do cliente. Nosso compromisso é entregar uma experiência eficiente, segura e pensada para quem busca um serviço confiável e adaptado ao dia a dia, sem depender de deslocamentos ou espera em lojas tradicionais de lavagem.
        </p>
        
        <div className="about-features">
          <div className="feature-item">
            <div className="feature-icon">
              <img src="/images/icons/Praticidade-Icon.svg" alt="Praticidade"/>
            </div>
            <h3 className="feature-title">Praticidade</h3>
            <p className="feature-description">
              Serviço realizado no endereço que você escolher, sem deslocamento ou perda de tempo.
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <img src="/images/icons/Qualidade-Icon.svg" alt="Qualidade" />
            </div>
            <h3 className="feature-title">Qualidade</h3>
            <p className="feature-description">
              Processos e produtos cuidadosamente selecionados para garantir um resultado superior.
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <img src="/images/icons/Comodidade-Icon.svg" alt="Comodidade" />
            </div>
            <h3 className="feature-title">Comodidade</h3>
            <p className="feature-description">
              Você agenda, e nós fazemos o resto, tudo pensado para facilitar sua rotina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}