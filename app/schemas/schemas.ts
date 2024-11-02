import * as yup from "yup";

// Esquema de validação Yup para o formulário de Registro
export const registerSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? undefined : value
    )
    .required("Idade é obrigatória")
    .positive()
    .integer(),
  userType: yup.string().required("Tipo de usuário é obrigatório"),
  role: yup.string().required("Função é obrigatória"),
});

// Esquema de validação Yup para o formulário de Login
export const loginSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});
