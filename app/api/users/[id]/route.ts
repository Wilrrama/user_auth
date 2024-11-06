import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string | number } }
) {
  await connectDB();

  const { id } = params;

  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuário excluído com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { error: "Erro ao excluir usuário." },
      { status: 500 }
    );
  }
}
