import { NextResponse } from "next/server";
import { Resend } from "resend";
import { create2FAChallenge } from "@/lib/auth-utils";
import contentData from "@/data/content.json";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const storedPassword = contentData.security?.password || "password";

    if (email === "ce.ayseaktas@gmail.com" && password === storedPassword) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // CREATE STATELESS CHALLENGE
      const challengeToken = await create2FAChallenge(email, code);

      await resend.emails.send({
        from: "Admin <onboarding@resend.dev>",
        to: email,
        subject: "🚀 Admin Paneli Giriş Doğrulama Kodu",
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 700;">Giriş Doğrulaması</h1>
              <p style="color: #64748b; margin-top: 8px;">Islem yapmak için aşağıdaki kodu kullanın.</p>
            </div>
            
            <div style="background: #f8fafc; padding: 32px; border-radius: 12px; text-align: center; margin-bottom: 32px;">
              <span style="font-size: 48px; font-weight: 800; letter-spacing: 8px; color: #3b82f6;">${code}</span>
            </div>

            <div style="color: #64748b; font-size: 14px; line-height: 1.6;">
              <p>Bu kod <strong>2 dakika</strong> boyunca geçerlidir.</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="text-align: center; font-size: 12px;">© ${new Date().getFullYear()} My Website • Admin Security System</p>
            </div>
          </div>
        `,
      });

      const response = NextResponse.json({ success: true, requires2FA: true });

      // Store challenge in HttpOnly cookie
      response.cookies.set("2fa_challenge", challengeToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 120, // 2 minutes
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Geçersiz bilgiler" },
      { status: 401 },
    );
  } catch (error) {
    console.error("2FA error:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 },
    );
  }
}
