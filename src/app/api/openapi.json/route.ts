import { NextResponse } from "next/server";

import { openApiContractScaffold } from "@/lib/openapi/openapi-contract";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(openApiContractScaffold);
}
