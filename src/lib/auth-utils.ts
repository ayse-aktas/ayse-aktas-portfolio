/**
 * Stateless 2FA implementation for serverless environments (like Cloudflare Edge).
 * Uses Web Crypto API for signing and verifying challenges without a database.
 */

const SECRET = process.env.JWT_SECRET || "semih-super-secret-key-12345";

export async function create2FAChallenge(email: string, code: string) {
  const expires = Date.now() + 2 * 60 * 1000; // 2 minutes
  const data = `${email}:${code}:${expires}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));

  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Return as a base64-like string: data.signature
  return btoa(`${data}|${signatureHex}`);
}

export async function verify2FAChallenge(
  token: string,
  userEmail: string,
  userCode: string,
) {
  try {
    const decoded = atob(token);
    const [data, signatureHex] = decoded.split("|");
    const [email, code, expires] = data.split(":");

    // 1. Basic checks
    if (email !== userEmail)
      return { valid: false, message: "Email uyuşmuyor" };
    if (code !== userCode.trim())
      return { valid: false, message: "Hatalı kod" };
    if (Date.now() > parseInt(expires))
      return { valid: false, message: "Kodun süresi dolmuş" };

    // 2. Verify Signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const sigBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
    );

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(data),
    );

    return { valid: isValid, message: isValid ? "Başarılı" : "Geçersiz imza" };
  } catch (e) {
    return { valid: false, message: "Sistem hatası" };
  }
}
