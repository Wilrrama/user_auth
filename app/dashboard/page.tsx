"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("@USER_data");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("@USER_data");
    localStorage.removeItem("@TOKEN_user");
    router.push("/");
  };

  return (
    <div className="min-h-[70vh] bg-gray-900 flex flex-col items-center p-6 mb-5">
      <section className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-md p-8 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Bem-vindo,
          {userData.name || "Usuário"}
        </h1>
        <p>
          <strong>Email:</strong> {userData.email || "N/A"}
        </p>
        <p>
          <strong>Tipo de usuário:</strong> {userData.userType || "N/A"}
        </p>
        <p>
          <strong>Função:</strong> {userData.role || "N/A"}
        </p>
        <p>
          <strong>ID do Usuário:</strong> {userData.id || "N/A"}
        </p>
        <p>
          <strong>Idade:</strong> {userData.age || "N/A"}
        </p>
      </section>

      <section className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-md p-8 mb-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Em construção</h2>
        <p>Esta seção será preenchida com mais funcionalidades em breve!</p>
      </section>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-500 transition-colors"
      >
        Sair
      </button>
    </div>
  );
};

export default Dashboard;
