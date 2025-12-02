"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import apiClient from "@/services/api";

export default function PixPaymentPage() {
  const router = useRouter();
  const params = useParams();

  const paymentId = params.id as string;

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [status, setStatus] = useState("PENDING");

  // Buscar pagamento PIX
  useEffect(() => {
    const loadPixInfo = async () => {
      try {
        const resp = await apiClient.get(`/payments/${paymentId}`);
        setQrCode(resp.data.qrCode);
        setQrCodeBase64(resp.data.qrCodeBase64);
        setStatus(resp.data.status);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar QR Code");
      }
    };

    loadPixInfo();

    // Polling a cada 3s para verificar se aprovou
    const interval = setInterval(loadPixInfo, 3000);

    return () => clearInterval(interval);
  }, [paymentId]);

  // Se aprovado → voltar para home
  useEffect(() => {
    if (status === "APPROVED") {
      alert("Pagamento aprovado! Redirecionando...");
      router.push("/");
    }
  }, [status, router]);

  const copyCode = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode);
      alert("Código copiado!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>Pagamento via PIX</h1>

        {qrCodeBase64 ? (
          <img
            src={`data:image/png;base64,${qrCodeBase64}`}
            alt="QR Code PIX"
            style={{ width: "250px", margin: "auto" }}
          />
        ) : (
          <p>Carregando QR Code...</p>
        )}

        <div style={{ marginTop: "2rem" }}>
          <h3>Código Copia e Cola</h3>
          <textarea
            readOnly
            value={qrCode || ""}
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              height: "80px",
              resize: "none",
            }}
          ></textarea>

          <button
            onClick={copyCode}
            style={{
              marginTop: "10px",
              width: "100%",
              background: "#32BCAD",
              color: "white",
              padding: "0.8rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Copiar Código PIX
          </button>
        </div>

        <p style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
          Status:{" "}
          <b
            style={{
              color: status === "APPROVED" ? "green" : "#eab308",
            }}
          >
            {status}
          </b>
        </p>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "1.5rem",
            width: "100%",
            background: "#333",
            color: "white",
            padding: "0.8rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
