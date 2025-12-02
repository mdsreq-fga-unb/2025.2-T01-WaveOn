"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginHeader from "@/components/LoginHeader";
import { useAuthContext } from "@/contexts/AuthContext";
import "@/styles/app-css/login.css";
import apiClient from "@/services/api";
import { LoginResponse } from "@/types/auth";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  function validate() {
    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!email) {
      newErrors.email = "Informe o e-mail.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "E-mail inválido.";
        valid = false;
      }
    }
    if (!password) {
      newErrors.password = "Informe a senha.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccess("");

    if (!validate()) return;

    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      login(response.data.access_token, response.data.user);
      setSuccess("Login realizado com sucesso! Redirecionando...");
      setTimeout(() => {
        const redirect = searchParams.get("redirect");
        if (redirect) {
          window.location.href = redirect;
        } else {
          window.location.href = "/";
        }
      }, 1000);
    } catch (error: unknown) {
      const err = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      const errorMessage =
        err.response?.data?.message || "Erro ao realizar login.";
      if (err.response?.status === 401) {
        setServerError("Email ou senha incorretos.");
      } else {
        setServerError(errorMessage);
      }
    }
  }

  return (
    <>
      <LoginHeader />
      <main className="login-root">
        <section className="login-illustration"></section>

        <section className="login-card" aria-labelledby="login-title">
          <form
            className="login-form"
            aria-describedby="login-description"
            onSubmit={handleSubmit}
            noValidate
          >
            <header className="login-header">
              <h1 id="login-title" className="login-title">
                Login
              </h1>
            </header>

            {serverError && <p className="form-error">{serverError}</p>}
            {success && <p className="form-success">{success}</p>}

            <div className="input-group">
              <label className="input-label" htmlFor="email">
                E-mail
              </label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  className={`login-input ${errors.email ? "input-error" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <span className="input-hint error">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
                Senha
              </label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className={`login-input ${
                    errors.password ? "input-error" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <span className="input-hint error">{errors.password}</span>
              )}
            </div>

            <div className="login-buttons">
              <button
                type="submit"
                className="login-button login-button-primary"
              >
                Entrar
              </button>
              <Link href="/" className="login-button login-button-secondary">
                Voltar
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
