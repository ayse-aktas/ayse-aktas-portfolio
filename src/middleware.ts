import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  addLog,
  getDeviceId,
  getCachedIpInfo,
  setCachedIpInfo,
} from "./lib/auth-store";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log ONLY public visitor pages
  // Exclude: Admin panel, Auth APIs, Next.js internal files, and static assets
  const isAdminPath = pathname.startsWith("/admin");
  const isAuthApi = pathname.startsWith("/api/auth");
  const isInternal =
    pathname.startsWith("/_next") || pathname.startsWith("/api/logs");
  const isStatic = pathname.includes(".");

  if (!isAdminPath && !isAuthApi && !isInternal && !isStatic) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const deviceId = await getDeviceId(ip, userAgent);

    // Try Cache First (Saves Quota)
    const cached = getCachedIpInfo(ip);
    let locationData: { city: string; country: string; isp: string };

    if (cached) {
      locationData = {
        city: cached.city,
        country: cached.country,
        isp: cached.isp,
      };
    } else if (ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const res = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,city,isp`,
        );
        const data = await res.json();
        if (data.status === "success") {
          locationData = {
            city: data.city,
            country: data.country,
            isp: data.isp,
          };
          setCachedIpInfo(ip, locationData); // Cache for 24h
        } else {
          locationData = {
            city: "Bilinmiyor",
            country: "Bilinmiyor",
            isp: "Bilinmiyor",
          };
        }
      } catch (err) {
        console.error("[MONITORING] IP IQ Fetch Error:", err);
        locationData = {
          city: "Bilinmiyor",
          country: "Bilinmiyor",
          isp: "Bilinmiyor",
        };
      }
    } else {
      locationData = {
        city: "Bilinmiyor",
        country: "Bilinmiyor",
        isp: "Bilinmiyor",
      };
    }

    const log = {
      timestamp: new Date().toISOString(),
      method: request.method,
      path: pathname,
      ip: ip,
      deviceId: deviceId,
      userAgent: userAgent,
      ...locationData,
    };

    addLog(log);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/logs|_next/static|_next/image/favicon.ico).*)"],
};
