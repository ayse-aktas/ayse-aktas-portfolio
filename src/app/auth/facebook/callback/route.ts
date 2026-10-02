import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // 1. Error Handling
  if (error) {
    console.error("Facebook Auth Error:", error);
    return NextResponse.redirect(new URL("/?auth_error=" + error, request.url));
  }

  // 2. Capture and Validate
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // 3. State Validation (Optional but recommended)
  // For a production app, you'd compare this with a value stored in cookies/session
  if (state !== "random_123") {
    console.warn("State mismatch! Potential CSRF attack.");
    // return NextResponse.json({ error: "State mismatch" }, { status: 403 });
  }

  try {
    // Cloudflare Pages bazen process.env'yi direkt vermez, alternatifleri de deneyelim
    const clientId = process.env.FACEBOOK_CLIENT_ID || (process.env as any).NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
    const redirectUri = process.env.FACEBOOK_CALLBACK_URL;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json({ 
        error: "Server configuration error", 
        hint: "Cloudflare dashboard'da Production ortamına eklediğinden ve Redeploy yaptığından emin ol kanka."
      }, { status: 500 });
    }

    // 4. Exchange code for access token (GET request kanka)
    const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`;

    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("Token Exchange Error:", tokenData.error);
      return NextResponse.json({ error: tokenData.error.message }, { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // 5. Get User Profile (Another GET request)
    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );
    const userData = await userResponse.json();

    console.log("Facebook User Logged In:", userData);

    // 6. Yetki Kontrolü ve Giriş İşlemi kanka
    if (userData.email === "ce.ayseaktas@gmail.com") {
      const response = NextResponse.redirect(new URL("/admin", request.url));
      
      // Admin token'ı oluşturuyoruz
      response.cookies.set("admin_token", "secure_session_token_" + Date.now(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 gün
      });

      return response;
    }

    // Eğer yetkili değilse login sayfasına hata ile gönder
    return NextResponse.redirect(new URL("/admin/login?error=unauthorized", request.url));

  } catch (err) {
    console.error("Auth process error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
