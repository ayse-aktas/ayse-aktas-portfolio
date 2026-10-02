// Simple in-memory store for 2FA codes
const codes = new Map<
  string,
  { code: string; expires: number; failures: number }
>();

export function saveCode(email: string, code: string) {
  const expires = Date.now() + 2 * 60 * 1000; // 2 minutes
  codes.set(email, { code, expires, failures: 0 });
  console.log(`[AUTH] Code generated for ${email}: ${code}`);
}

export function getCodeData(email: string) {
  return codes.get(email);
}

export function incrementFailures(email: string) {
  const data = codes.get(email);
  if (data) {
    data.failures += 1;
    return data.failures;
  }
  return 0;
}

export function deleteCode(email: string) {
  codes.delete(email);
}

// Device Fingerprinting & IP Caching
const ipInfoCache = new Map<
  string,
  { city: string; country: string; isp: string; expires: number }
>();

export function getCachedIpInfo(ip: string) {
  const cached = ipInfoCache.get(ip);
  if (cached && Date.now() < cached.expires) {
    return cached;
  }
  return null;
}

export function setCachedIpInfo(
  ip: string,
  info: { city: string; country: string; isp: string },
) {
  // Cache for 24 hours to minimize API calls
  ipInfoCache.set(ip, { ...info, expires: Date.now() + 24 * 60 * 60 * 1000 });
}

export async function getDeviceId(ip: string, userAgent: string) {
  const str = ip + userAgent;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return "DEV-" + Math.abs(hash).toString(16).toUpperCase().slice(0, 8);
}

// Simple in-memory store for logs
export const trafficLogs: any[] = [];

export function addLog(log: any) {
  trafficLogs.unshift(log);
  if (trafficLogs.length > 500) trafficLogs.pop(); // Keep last 500
}
