# Projeto de Autenticação e Gerenciamento de Usuários

Uma aplicação web robusta para autenticação e gerenciamento de usuários construída com Next.js, React, MongoDB e TypeScript. O projeto oferece uma interface intuitiva para login e registro, com validação de formulários avançada e suporte a rotas protegidas.

## ✨ Funcionalidades

- 🔐 Sistema completo de autenticação (login/registro)
- 📝 Validação de formulários com `react-hook-form` e `yup`
- 🗄️ Integração com MongoDB para persistência de dados
- 🛡️ Rotas protegidas para conteúdo autenticado
- 🎨 Interface responsiva e moderna
- 📱 Suporte completo a dispositivos móveis

## 🚀 Tecnologias Utilizadas

- Next.js
- React
- TypeScript
- MongoDB
- Mongoose
- react-hook-form
- yup
- Tailwind CSS

## 📋 Pré-requisitos

- Node.js (versão >= 14.x.x)
- Yarn ou npm
- Conta no MongoDB Atlas (ou MongoDB local)

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/seurepositorio.git
cd seurepositorio
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua URI do MongoDB:

```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/<seubanco>?retryWrites=true&w=majority
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Acesse `http://localhost:3000` no seu navegador

## 📁 Estrutura do Projeto

```
.
├── fragments/       # Componentes reutilizáveis
├── schemas/        # Schemas de validação Yup
├── services/       # Configuração da API e MongoDB
├── types/         # Definições de tipos TypeScript
├── pages/         # Páginas do Next.js
└── components/    # Componentes React
```

## 💡 Como Usar

### Componente AuthForm

O componente principal de autenticação pode ser implementado em qualquer página da seguinte forma:

```jsx
import AuthForm from "../components/AuthForm";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <AuthForm />
    </div>
  );
}
```

### Rotas Protegidas

Para criar uma rota protegida, utilize o componente de proteção:

```jsx
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Conteúdo protegido aqui</div>
    </ProtectedRoute>
  );
}
```

## 🔍 Notas Importantes

### Uso do "use client"

Para componentes que necessitam de funcionalidades do lado do cliente (como hooks do React), adicione `"use client"` no topo do arquivo:

```jsx
"use client";
import React, { useState } from "react";
```

### Validação de Formulários

O projeto utiliza `react-hook-form` em conjunto com `yup` para validação de formulários. Os schemas de validação estão localizados na pasta `schemas/`.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📫 Contato

Link do Projeto: [https://github.com/Wilrrama/user_auth](https://github.com/Wilrrama/user_auth)
