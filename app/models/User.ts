// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age?: number;
  userType: "user" | "admin";
  role: "front-end" | "back-end" | "full-stack";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  userType: { type: String, enum: ["user", "admin"], required: true },
  role: {
    type: String,
    enum: ["front-end", "back-end", "full-stack"],
    required: true,
  },
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    console.log("Tentativa de login:", {
      candidatePassword,
      storedHash: this.password,
    });

    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log("Resultado da comparação:", isMatch);

    return isMatch;
  } catch (error) {
    console.error("Erro ao comparar as senhas:", error);
    return false;
  }
};

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
