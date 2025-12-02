"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEdit } from "react-icons/fa";
import NavBar from "@/components/NavBar";
import CarModal from "@/components/CarModal";
import AddressModal from "@/components/AddressModal";
import { useAuthContext } from "@/contexts/AuthContext";
import apiClient from "@/services/api";
import "@/styles/app-css/perfil.css";

interface Car {
  id: string;
  marca: string;
  modelo: string;
  placa: string;
}

interface Address {
  id: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export default function PerfilPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuthContext();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [cars, setCars] = useState<Car[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [showCarModal, setShowCarModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCarsDropdown, setShowCarsDropdown] = useState(false);
  const [showAddressesDropdown, setShowAddressesDropdown] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");

      // Busca carros e endereços do backend
      fetchCarsAndAddresses();
    }
  }, [user]);

  const fetchCarsAndAddresses = async () => {
    try {
      const [carsResponse, addressesResponse] = await Promise.all([
        apiClient.get("/cars/my"),
        apiClient.get("/addresses/my"),
      ]);

      setCars(
        carsResponse.data.map(
          (car: {
            id: string;
            brand?: string;
            model?: string;
            plate?: string;
            licensePlate?: string;
          }) => ({
            id: car.id,
            marca: car.brand,
            modelo: car.model,
            placa: car.plate || car.licensePlate,
          })
        )
      );

      setAddresses(
        addressesResponse.data.map(
          (addr: {
            id: string;
            street?: string;
            number?: string;
            district?: string;
            neighborhood?: string;
            city?: string;
            state?: string;
            cep?: string;
          }) => ({
            id: addr.id,
            rua: addr.street,
            numero: addr.number,
            bairro: addr.district || addr.neighborhood,
            cidade: addr.city,
            estado: addr.state || "",
            cep: addr.cep,
          })
        )
      );
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleSaveName = () => {
    if (!fullName.trim()) {
      alert("Nome não pode estar vazio");
      return;
    }
    alert("Nome atualizado com sucesso!");
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    if (!email.trim() || !email.includes("@")) {
      alert("Email inválido");
      return;
    }
    alert("Email atualizado com sucesso!");
    setIsEditingEmail(false);
  };

  const handleSavePhone = () => {
    if (!phone.trim()) {
      alert("Telefone não pode estar vazio");
      return;
    }
    alert("Telefone atualizado com sucesso!");
    setIsEditingPhone(false);
  };

  const handleChangePassword = () => {
    alert("Funcionalidade em desenvolvimento");
  };

  const handleAddCar = async (carData: {
    brand?: string;
    model?: string;
    plate?: string;
    licensePlate?: string;
  }) => {
    try {
      const response = await apiClient.post("/cars", carData);

      const newCar: Car = {
        id: response.data.id,
        marca: response.data.brand,
        modelo: response.data.model,
        placa: response.data.plate || response.data.licensePlate,
      };

      setCars([...cars, newCar]);
      setShowCarModal(false);
      alert("Veículo adicionado com sucesso!");
    } catch (error: unknown) {
      console.error("Erro ao adicionar veículo:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Erro ao adicionar veículo");
    }
  };

  const handleAddAddress = async (addressData: {
    cep?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
  }) => {
    try {
      const response = await apiClient.post("/addresses", {
        cep: addressData.cep,
        street: addressData.rua,
        number: addressData.numero,
        complement: addressData.complemento,
        district: addressData.bairro,
        city: addressData.cidade,
      });

      const newAddress: Address = {
        id: response.data.id,
        rua: response.data.street,
        numero: response.data.number,
        bairro: response.data.district || response.data.neighborhood,
        cidade: response.data.city,
        estado: response.data.state || "",
        cep: response.data.cep,
      };

      setAddresses([...addresses, newAddress]);
      setShowAddressModal(false);
      alert("Endereço adicionado com sucesso!");
    } catch (error: unknown) {
      console.error("Erro ao adicionar endereço:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Erro ao adicionar endereço");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="perfil-page">
      <NavBar logoVariant="light" />

      <div className="perfil-container">
        <div className="perfil-card">
          <div className="perfil-header">
            <FaUser className="perfil-icon" />
            <h1 className="perfil-title">Seu Perfil</h1>
          </div>

          <div className="perfil-section">
            <div className="perfil-field">
              <label className="field-label">Nome*</label>
              <div className="field-content">
                {isEditingName ? (
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="field-input"
                  />
                ) : (
                  <span className="field-value">{fullName}</span>
                )}
                <button
                  className="edit-icon-btn"
                  onClick={() => {
                    if (isEditingName) {
                      handleSaveName();
                    } else {
                      setIsEditingName(true);
                    }
                  }}
                >
                  <FaEdit />
                </button>
              </div>
            </div>

            <div className="perfil-field">
              <label className="field-label">Email</label>
              <div className="field-content">
                {isEditingEmail ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-input"
                  />
                ) : (
                  <span className="field-value">{email}</span>
                )}
                <button
                  className="edit-icon-btn"
                  onClick={() => {
                    if (isEditingEmail) {
                      handleSaveEmail();
                    } else {
                      setIsEditingEmail(true);
                    }
                  }}
                >
                  <FaEdit />
                </button>
              </div>
            </div>

            <div className="perfil-field">
              <label className="field-label">Celular</label>
              <div className="field-content">
                {isEditingPhone ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field-input"
                    placeholder="(00)00000-0000"
                  />
                ) : (
                  <span className="field-value">
                    {phone || "Não informado"}
                  </span>
                )}
                <button
                  className="edit-icon-btn"
                  onClick={() => {
                    if (isEditingPhone) {
                      handleSavePhone();
                    } else {
                      setIsEditingPhone(true);
                    }
                  }}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>

          <div className="perfil-section">
            <div className="dropdown-section">
              <label className="field-label">Carros</label>
              <div className="dropdown-container">
                <select
                  className="dropdown-select"
                  value=""
                  onChange={(e) =>
                    setShowCarsDropdown(e.target.value === "show")
                  }
                  onClick={() => setShowCarsDropdown(!showCarsDropdown)}
                >
                  <option value="">Veículos</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.marca} {car.modelo} - {car.placa}
                    </option>
                  ))}
                </select>
                <button
                  className="add-icon-btn"
                  onClick={() => setShowCarModal(true)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="dropdown-section">
              <label className="field-label">Endereços</label>
              <div className="dropdown-container">
                <select
                  className="dropdown-select"
                  value=""
                  onChange={(e) =>
                    setShowAddressesDropdown(e.target.value === "show")
                  }
                  onClick={() =>
                    setShowAddressesDropdown(!showAddressesDropdown)
                  }
                >
                  <option value="">Endereços</option>
                  {addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.rua}, {address.numero} - {address.bairro}
                    </option>
                  ))}
                </select>
                <button
                  className="add-icon-btn"
                  onClick={() => setShowAddressModal(true)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="perfil-actions">
            <button
              className="btn-change-password"
              onClick={handleChangePassword}
            >
              Trocar Senha
            </button>
            <button className="btn-back" onClick={() => router.push("/")}>
              Voltar
            </button>
          </div>
        </div>
      </div>

      <CarModal
        isOpen={showCarModal}
        onClose={() => setShowCarModal(false)}
        onSave={handleAddCar}
      />

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={handleAddAddress}
      />
    </div>
  );
}
