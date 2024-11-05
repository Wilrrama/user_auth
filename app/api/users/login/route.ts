import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await req.json();
    console.log("Login - Dados recebidos:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    console.log("Login - Validação de senha:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return NextResponse.json(
      {
        token,
        user: {
          id: user._id,
          email: user.email,
          userType: user.userType,
          name: user.name,
          role: user.role,
          age: user.age,
        },
        message: "Login realizado com sucesso!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro no login." }, { status: 500 });
  }
}
