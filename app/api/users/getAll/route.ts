import connectDB from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar usuários." },
      { status: 500 }
    );
  }
}
