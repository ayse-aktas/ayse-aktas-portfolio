import { NextResponse } from "next/server";
import { trafficLogs } from "@/lib/auth-store";

export const runtime = "edge";

export async function GET() {
  // In a real app, protect this route!
  return NextResponse.json(trafficLogs);
}
