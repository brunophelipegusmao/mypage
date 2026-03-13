import { NextResponse } from "next/server";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
} as const;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    {
      headers: noStoreHeaders,
    },
  );
}
