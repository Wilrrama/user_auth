"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../fragments/Input";
import { Button } from "../fragments/Button";
import { Form } from "../fragments/Form";
import { loginSchema, registerSchema } from "../schemas/schemas";
import { FormData } from "../types/types";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Usar o esquema de validação adequado com base no modo (login ou registro)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    console.log("Form Data:", data);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleAuthMode = () => setIsLogin((prevMode) => !prevMode);

  return (
    <div className="min-h-[70vh] flex flex-col items-center p-4 bg-black text-gray-200">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          {isLogin ? "Login" : "Criar conta"}
        </h2>

        {/* Formulário */}
        <Form onSubmit={handleSubmit(onSubmit)} className="gap-4">
          {!isLogin && (
            <Input
              type="text"
              label="Nome"
              placeholder="Seu nome"
              {...register("name")}
              error={errors.name?.message}
            />
          )}

          <Input
            type="email"
            label="Email"
            placeholder="seu@email.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            type="password"
            label="Senha"
            placeholder="******"
            {...register("password")}
            error={errors.password?.message}
          />

          {!isLogin && (
            <>
              <Input
                type="password"
                label="Confirmar Senha"
                placeholder="******"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Input
                type="number"
                label="Idade"
                placeholder="Sua idade"
                {...register("age")}
                error={errors.age?.message}
              />

              <div className="flex flex-col gap-1">
                <label className="text-gray-300">Tipo de Usuário</label>
                <select
                  className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("userType")}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.userType && (
                  <p className="text-red-500">{errors.userType.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-300">Função</label>
                <select
                  className="bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("role")}
                >
                  <option value="front-end">Front-End</option>
                  <option value="back-end">Back-End</option>
                  <option value="full-stack">Full-Stack</option>
                </select>
                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>
            </>
          )}

          <Button
            type="submit"
            name={
              isLoading ? "Carregando..." : isLogin ? "Entrar" : "Registrar"
            }
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          />

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

export default AuthForm;
