"use client";

import React, { useState } from "react";
import "@/styles/components-css/address-modal.css";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: AddressData) => void;
}

export interface AddressData {
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<AddressData>({
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
  });

  const [errors, setErrors] = useState({
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
    };
    let valid = true;

    if (!formData.cep.trim()) {
      newErrors.cep = "Digite o CEP";
      valid = false;
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = "Digite o endereço";
      valid = false;
    }

    if (!formData.numero.trim()) {
      newErrors.numero = "Digite o número";
      valid = false;
    }

    if (!formData.bairro.trim()) {
      newErrors.bairro = "Digite o bairro";
      valid = false;
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = "Digite a cidade";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      // Reset form
      setFormData({
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
      });
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
    });
    setErrors({
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Criar endereço</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* CEP */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="cep">
              Cep
            </label>
            <input
              id="cep"
              type="text"
              placeholder="Digite o seu cep"
              className={`modal-input ${errors.cep ? "input-error" : ""}`}
              value={formData.cep}
              onChange={handleChange}
            />
            {errors.cep && <span className="modal-error">{errors.cep}</span>}
          </div>

          {/* Endereço */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="endereco">
              Endereço
            </label>
            <input
              id="endereco"
              type="text"
              placeholder="Digite o endereço"
              className={`modal-input ${errors.endereco ? "input-error" : ""}`}
              value={formData.endereco}
              onChange={handleChange}
            />
            {errors.endereco && (
              <span className="modal-error">{errors.endereco}</span>
            )}
          </div>

          {/* Número */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="numero">
              Número
            </label>
            <input
              id="numero"
              type="text"
              placeholder="N°"
              className={`modal-input ${errors.numero ? "input-error" : ""}`}
              value={formData.numero}
              onChange={handleChange}
            />
            {errors.numero && (
              <span className="modal-error">{errors.numero}</span>
            )}
          </div>

          {/* Complemento */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="complemento">
              Complemento
            </label>
            <input
              id="complemento"
              type="text"
              placeholder="Complemento"
              className={`modal-input ${
                errors.complemento ? "input-error" : ""
              }`}
              value={formData.complemento}
              onChange={handleChange}
            />
            {errors.complemento && (
              <span className="modal-error">{errors.complemento}</span>
            )}
          </div>

          {/* Bairro */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="bairro">
              Bairro
            </label>
            <input
              id="bairro"
              type="text"
              placeholder="Digite o Bairro"
              className={`modal-input ${errors.bairro ? "input-error" : ""}`}
              value={formData.bairro}
              onChange={handleChange}
            />
            {errors.bairro && (
              <span className="modal-error">{errors.bairro}</span>
            )}
          </div>

          {/* Cidade */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="cidade">
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              placeholder="Digite a cidade"
              className={`modal-input ${errors.cidade ? "input-error" : ""}`}
              value={formData.cidade}
              onChange={handleChange}
            />
            {errors.cidade && (
              <span className="modal-error">{errors.cidade}</span>
            )}
          </div>

          {/* Botões */}
          <div className="modal-buttons">
            <button type="submit" className="modal-btn-primary">
              Cadastrar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="modal-btn-secondary"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
