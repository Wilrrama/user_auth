"use client";
import React, { useState } from "react";
import { Input } from "../fragments/Input";
import { Button } from "../fragments/Button";
import { Form } from "../fragments/Form";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Adicione sua lógica de autenticação aqui
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center p-4 bg-black text-gray-200">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            {isLogin ? "Login" : "Criar conta"}
          </h2>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit} className="gap-4">
          {/* Nome (apenas no modo de Registro) */}
          {!isLogin && (
            <Input
              type="text"
              label="Nome"
              placeholder="Seu nome"
              required
              className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Campos de Email e Senha */}
          <Input
            type="email"
            label="Email"
            placeholder="seu@email.com"
            required
            className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Input
            type="password"
            label="Senha"
            placeholder="******"
            required
            className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirmar Senha (apenas no modo de Registro) */}
          {!isLogin && (
            <Input
              type="password"
              label="Confirmar Senha"
              placeholder="******"
              required
              className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Idade (apenas no modo de Registro) */}
          {!isLogin && (
            <Input
              type="number"
              label="Idade"
              placeholder="Sua idade"
              required
              className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Tipo de Usuário (apenas no modo de Registro) */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-gray-300">Tipo de Usuário</label>
              <select className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}

          {/* Função (Role) (apenas no modo de Registro) */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-gray-300">Função</label>
              <select className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="front-end">Front-End</option>
                <option value="back-end">Back-End</option>
                <option value="full-stack">Full-Stack</option>
              </select>
            </div>
          )}

          {/* Botão de Submissão */}
          <Button
            type="submit"
            name={
              isLoading ? "Carregando..." : isLogin ? "Entrar" : "Registrar"
            }
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          />

          {/* Botão de Alternância entre Login e Registro */}
          <Button
            type="button"
            name={isLogin ? "Criar nova conta" : "Já possui uma conta? Entrar"}
            onClick={toggleAuthMode}
            className="mt-4 text-blue-400 hover:underline"
          />
        </Form>
      </div>
    </div>
  );
};
