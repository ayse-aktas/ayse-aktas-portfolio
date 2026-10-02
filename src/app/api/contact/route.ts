import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");
const ADMIN_EMAIL = "ce.ayseaktas@gmail.com";

export async function POST(request: Request) {
  try {
    const { fullName, email, subject, message } = await request.json();

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Lütfen tüm alanları doldurun." },
        { status: 400 },
      );
    }

    // Send direct email using Resend
    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[İletişim Formu] ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Yeni İletişim Mesajı</h2>
          <p><strong>Ad Soyad:</strong> ${fullName}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Mesaj:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: "E-posta gönderilemedi. Lütfen API anahtarınızı kontrol edin." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Sunucu hatası, lütfen sonra tekrar deneyin.",
      },
      { status: 500 },
    );
  }
}
