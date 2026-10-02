import { NextResponse } from "next/server";
import { getCodeData, deleteCode } from "@/lib/auth-store";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();

    // Reverted to dynamic target
    const data = getCodeData(email);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Doğrulama oturumu bulunamadı." },
        { status: 401 },
      );
    }

    const isExpired = Date.now() > data.expires;
    const isCorrect = data.code === code?.trim();

    if (isCorrect && !isExpired) {
      console.log("[SECURITY] Password reset successful for", email);
      console.log("[SECURITY] New password would be:", newPassword);

      deleteCode(email);

      return NextResponse.json({
        success: true,
        message: "Şifre sıfırlama işlemi onaylandı.",
      });
    }

    return NextResponse.json(
      { success: false, message: "Geçersiz veya süresi dolmuş kod." },
      { status: 401 },
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 },
    );
  }
}
