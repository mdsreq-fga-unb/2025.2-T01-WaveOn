import React, { useEffect, useState } from "react";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [redirectUrl, setRedirectUrl] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(window.location.pathname + window.location.search);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <h2 className="modal-title">Você não está logado(a)</h2>
          <div className="modal-buttons">
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
              className="modal-btn modal-btn-login"
            >
              Login
            </Link>
            <Link
              href={`/cadastro?redirect=${encodeURIComponent(redirectUrl)}`}
              className="modal-btn modal-btn-register"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
