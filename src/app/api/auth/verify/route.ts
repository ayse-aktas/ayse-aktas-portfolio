import { NextResponse } from "next/server";
import { verify2FAChallenge } from "@/lib/auth-utils";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    // READ CHALLENGE FROM COOKIE
    const challengeToken = request.headers
      .get("cookie")
      ?.split("; ")
      .find((row) => row.startsWith("2fa_challenge="))
      ?.split("=")[1];

    if (!challengeToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Oturum süresi dolmuş, lütfen tekrar giriş yapın.",
        },
        { status: 401 },
      );
    }

    const { valid, message } = await verify2FAChallenge(
      challengeToken,
      email,
      code,
    );

    if (!valid) {
      // (Optional) Track failures via a separate cookie if needed,
      // but simple error response is enough for now.
      return NextResponse.json({ success: false, message }, { status: 401 });
    }

    // Success
    const response = NextResponse.json({ success: true });

    // Set admin token cookie
    response.cookies.set("admin_token", "secure_session_token_" + Date.now(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Clear challenge cookie
    response.cookies.set("2fa_challenge", "", { maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 },
    );
  }
}
