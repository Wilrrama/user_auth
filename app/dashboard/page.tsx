"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../services/api";
import { Button } from "../fragments/Button";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("@USER_data");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const token = localStorage.getItem("@TOKEN_user");
    if (!token) {
      router.push("/");
    }

    // Carregar dados de usuários se o usuário logado for um administrador
    if (userData.userType === "admin") {
      fetchUsers();
    }
  }, [userData.userType]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users/getAll");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar os usuários:", error);
    }
  };

  const deleteUser = async (id: string | number) => {
    try {
      await api.delete(`/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      fetchUsers();
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("@USER_data");
    localStorage.removeItem("@TOKEN_user");
    router.push("/");
  };

  return (
    <div className="min-h-[70vh] bg-gray-900 flex flex-col items-center p-6 mb-5">
      <section className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-md p-8 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Bem-vindo, {userData.name || "Usuário"}
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
        <Button
          type={"button"}
          name={"Editar"}
          className="bg-orange-600 text-white rounded-lg px-4 py-2 mt-2 hover:bg-orange-500 transition-colors"
        />
      </section>

      {userData.userType === "admin" ? (
        <section className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-md p-8 mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">
            Lista de Usuários, Total = <span>{users.length}</span>
          </h2>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  className="mb-2 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p>
                      <strong>Nome:</strong> {user.name}{" "}
                      <strong>
                        <span>Idade: </span>
                      </strong>
                      <span>{user.age}</span>
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Função:</strong> {user.role}
                    </p>
                    <hr className="my-2 border-gray-600" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type={"button"}
                      name={"Excluir"}
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 text-white rounded-lg px-4 py-2 mt-2 hover:bg-red-500 transition-colors"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </section>
      ) : (
        <section className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-md p-8 mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Em construção</h2>
          <p>Esta seção será preenchida com mais funcionalidades em breve!</p>
        </section>
      )}

      <Button
        type="button"
        name="Sair"
        onClick={handleLogout}
        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-500 transition-colors"
      />
    </div>
  );
};

export default Dashboard;
