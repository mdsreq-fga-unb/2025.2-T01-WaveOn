"use client";

import React, { useState } from "react";
import "@/styles/components-css/car-modal.css";

interface CarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (car: CarData) => void;
}

export interface CarData {
  name: string;
  plate: string;
  brand: string;
  model: string;
  category: string;
}

const CarModal: React.FC<CarModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<CarData>({
    name: "",
    plate: "",
    brand: "",
    model: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    plate: "",
    brand: "",
    model: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {
      name: "",
      plate: "",
      brand: "",
      model: "",
      category: "",
    };
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Digite o nome do carro";
      valid = false;
    }

    if (!formData.plate.trim()) {
      newErrors.plate = "Digite a placa";
      valid = false;
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Digite a marca";
      valid = false;
    }

    if (!formData.model.trim()) {
      newErrors.model = "Digite o modelo";
      valid = false;
    }

    if (!formData.category) {
      newErrors.category = "Selecione a categoria";
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
        name: "",
        plate: "",
        brand: "",
        model: "",
        category: "",
      });
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: "",
      plate: "",
      brand: "",
      model: "",
      category: "",
    });
    setErrors({
      name: "",
      plate: "",
      brand: "",
      model: "",
      category: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Criar carro</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Nome */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome do carro"
              className={`modal-input ${errors.name ? "input-error" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="modal-error">{errors.name}</span>}
          </div>

          {/* Placa */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="plate">
              Placa
            </label>
            <input
              id="plate"
              type="text"
              placeholder="Digite a placa do Carro"
              className={`modal-input ${errors.plate ? "input-error" : ""}`}
              value={formData.plate}
              onChange={handleChange}
            />
            {errors.plate && (
              <span className="modal-error">{errors.plate}</span>
            )}
          </div>

          {/* Marca */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="brand">
              Marca
            </label>
            <input
              id="brand"
              type="text"
              placeholder="Digite a Marca do Carro"
              className={`modal-input ${errors.brand ? "input-error" : ""}`}
              value={formData.brand}
              onChange={handleChange}
            />
            {errors.brand && (
              <span className="modal-error">{errors.brand}</span>
            )}
          </div>

          {/* Modelo */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="model">
              Modelo
            </label>
            <input
              id="model"
              type="text"
              placeholder="Digite o modelo do carro"
              className={`modal-input ${errors.model ? "input-error" : ""}`}
              value={formData.model}
              onChange={handleChange}
            />
            {errors.model && (
              <span className="modal-error">{errors.model}</span>
            )}
          </div>

          {/* Categoria */}
          <div className="modal-input-group">
            <label className="modal-label" htmlFor="category">
              Categoria
            </label>
            <select
              id="category"
              className={`modal-select ${errors.category ? "input-error" : ""}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Selecionar</option>
              <option value="Hatch">Hatch</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Caminhonete">Caminhonete</option>
            </select>
            {errors.category && (
              <span className="modal-error">{errors.category}</span>
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

export default CarModal;
