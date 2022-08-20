import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const slug = req.nextUrl.pathname.split("/").pop();
  if (slug != "shorten" && slug!="favicon.ico" && slug!="manifest.json") {
    const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
    if (slugFetch.status === 404) {
      return NextResponse.redirect(req.nextUrl.origin);
    }
    const data = await slugFetch.json();

    if (data?.url) {
      return NextResponse.redirect(data.url);
    }
  }
}

export const config = {
  matcher: "/:slug",
};
