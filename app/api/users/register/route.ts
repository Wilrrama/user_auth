import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { name, email, password, age, userType, role } = await request.json();

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Register - Password Hash:", {
      original: password,
      hashed: hashedPassword,
    });

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      userType,
      role,
    });

    await user.save();

    return NextResponse.json(
      {
        message: "Usuário registrado com sucesso!",
        user: { id: user._id, name, email, age, userType, role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json({ error: "Erro ao registrar" }, { status: 500 });
  }
}
