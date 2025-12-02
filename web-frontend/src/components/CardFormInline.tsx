"use client";

import React, { useState } from "react";
import "@/styles/components-css/CardFormInline.css";

// ========= TIPAGEM CORRETA ==========
export interface CardFormData {
  token: string;
  cardNumber: string;
  holder: string;
  expiry: string;
  cvv: string;
}

interface CardFormInlineProps {
  onSubmit: (data: CardFormData) => void;
  onCancel: () => void;
}
// ====================================

const CardFormInline: React.FC<CardFormInlineProps> = ({ onSubmit, onCancel }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Token MOCK
    const fakeToken = `TOKEN_${Date.now()}`;

    onSubmit({
      token: fakeToken,
      cardNumber,
      holder,
      expiry,
      cvv,
    });
  };

  return (
    <div className="cardform-inline-container">
      <h4 className="cardform-title">Informações do Cartão</h4>

      <form className="cardform-form" onSubmit={handleSubmit}>
        <div className="cardform-row">
          <label>Número do Cartão</label>
          <input
            type="text"
            placeholder="1234 5678 9123 4567"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>

        <div className="cardform-row">
          <label>Nome do Titular</label>
          <input
            type="text"
            placeholder="Nome impresso no cartão"
            value={holder}
            onChange={(e) => setHolder(e.target.value)}
            required
          />
        </div>

        <div className="cardform-row-two">
          <div>
            <label>Validade</label>
            <input
              type="text"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
          </div>

          <div>
            <label>CVV</label>
            <input
              type="text"
              placeholder="123"
              maxLength={4}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="cardform-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button type="submit" className="confirm-btn">
            Validar Cartão
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardFormInline;
