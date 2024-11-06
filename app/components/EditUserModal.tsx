import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { Button } from "../fragments/Button";

interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number | string;
  role: string;
  userType?: string;
}

interface EditUserModalProps {
  user: IUser | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate: (id: string, updatedData: Partial<IUser>) => Promise<void>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onUserUpdate,
}) => {
  const [formData, setFormData] = useState<Partial<IUser>>({
    name: "",
    email: "",
    age: "",
    role: "",
  });

  // Atualiza os dados do formulário quando o usuário muda
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) {
      console.error("ID do usuário não encontrado");
      return;
    }

    try {
      const dadosLimpos = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      );

      const response = await api.patch(`/api/users/${user._id}`, dadosLimpos);

      if (response.status === 200) {
        const dadosUsuarioArmazenados = localStorage.getItem("@USER_data");
        if (dadosUsuarioArmazenados) {
          const usuarioAtual = JSON.parse(dadosUsuarioArmazenados);
          if (usuarioAtual.id === user._id) {
            const dadosAtualizados = { ...usuarioAtual, ...dadosLimpos };
            localStorage.setItem(
              "@USER_data",
              JSON.stringify(dadosAtualizados)
            );
          }
        }

        onUserUpdate(user._id, dadosLimpos);
        onClose();
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full text-white">
        <h2 className="text-2xl mb-4">Editar Usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm">
              Nome
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm">
              Idade
            </label>
            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm">
              Função
            </label>
            <input
              id="role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              name="Cancelar"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            />
            <Button
              type="submit"
              name="Salvar"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
